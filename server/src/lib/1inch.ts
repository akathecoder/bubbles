// use this when there is no `"type": "module"` in your package.json, i.e. you're using commonjs

import {
  SDK,
  HashLock,
  PrivateKeyProviderConnector,
  NetworkEnum,
  SupportedChains,
  type SupportedChain,
} from "@1inch/cross-chain-sdk";
import dotenv from "dotenv";
const process = dotenv.config().parsed;

import { Web3 } from "web3";
import {
  solidityPackedKeccak256,
  randomBytes,
  Contract,
  Wallet,
  JsonRpcProvider,
} from "ethers";

const approveABI = [
  {
    constant: false,
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

interface SwapArgs {
  srcChainId: SupportedChain;
  dstChainId: SupportedChain;
  srcTokenAddress: string;
  dstTokenAddress: string;
  makerAddress: string;
  makerPrivateKey: string;
  destinationAddress: string;
  amount: string; // in wei
  enableEstimate: boolean;
}

export class OneInch {
  rpc: string;
  sdk: SDK;

  constructor(args: { rpc: string; apiKey?: string; privateKey: string }) {
    this.rpc = args.rpc;
    const web3Instance = new Web3(args.rpc);
    const blockchainProvider = new PrivateKeyProviderConnector(
      args.privateKey,
      web3Instance as any
    );
    this.sdk = new SDK({
      url: "https://api.1inch.dev/fusion-plus",
      authKey: args.apiKey,
      blockchainProvider,
    });
  }

  static getRandomBytes32() {
    // for some reason the cross-chain-sdk expects a leading 0x and can't handle a 32 byte long hex string
    return "0x" + Buffer.from(randomBytes(32)).toString("hex");
  }

  async approve(token: string, makerPrivateKey: string) {
    const provider = new JsonRpcProvider(this.rpc);
    const tkn = new Contract(
      token,
      approveABI,
      new Wallet(makerPrivateKey, provider)
    );
    await tkn.approve(
      "0x111111125421ca6dc452d289314280a0f8842a65", // aggregation router v6
      2n ** 256n - 1n // unlimited allowance
    );
  }

  async swap(args: SwapArgs) {
    const params = {
      srcChainId: args.srcChainId,
      dstChainId: args.dstChainId,
      srcTokenAddress: args.srcTokenAddress,
      dstTokenAddress: args.dstTokenAddress,
      amount: args.amount,
      enableEstimate: args.enableEstimate,
      walletAddress: args.makerAddress,
    };

    try {
      const quote = await this.sdk.getQuote(params);
      console.log(`Received Fusion+ quote from 1inch API: ${quote.quoteId}`);

      const secretsCount = quote.getPreset().secretsCount;
      const secrets = Array.from({ length: secretsCount }).map(() =>
        OneInch.getRandomBytes32()
      );
      const secretHashes = secrets.map((x) => HashLock.hashSecret(x));

      const hashLock =
        secretsCount === 1
          ? HashLock.forSingleFill(secrets[0])
          : HashLock.forMultipleFills(
              secretHashes.map((secretHash, i) =>
                solidityPackedKeccak256(
                  ["uint64", "bytes32"],
                  [i, secretHash.toString()]
                )
              ) as any
            );

      console.log("Received Fusion+ quote from 1inch API");

      const quoteResponse = await this.sdk.placeOrder(quote, {
        walletAddress: args.makerAddress,
        hashLock,
        secretHashes,
      });
      const orderHash = quoteResponse.orderHash;
      console.log(`Order successfully placed`, orderHash);
      await this.submitSecrets(orderHash, secrets, secretHashes);
    } catch (error) {
      console.error("Error in main execution:", error);
    }
  }

  async getOrderStatus(orderHash: string) {
    return this.sdk.getOrderStatus(orderHash);
  }

  async submitSecret(orderHash: string, secret: string) {
    return this.sdk.submitSecret(orderHash, secret);
  }

  async submitSecrets(
    orderHash: string,
    secrets: string[],
    secretHashes: string[]
  ) {
    let flag = true;

    while (flag) {
      console.log(
        `Polling for fills until order status is set to "executed"...`
      );
      try {
        const order = await this.getOrderStatus(orderHash);
        if (order.status === "executed") {
          console.log(`Order is complete. Exiting.`);
          flag = false;
        }

        const fillsObject = await this.sdk.getReadyToAcceptSecretFills(
          orderHash
        );
        if (fillsObject.fills.length > 0) {
          for (const fill of fillsObject.fills) {
            await this.submitSecret(orderHash, secrets[fill.idx]);
            console.log(
              `Fill order found! Secret submitted: ${JSON.stringify(
                secretHashes[fill.idx],
                null,
                2
              )}`
            );
          }
        }
      } catch (error) {
        console.error(`Error: ${JSON.stringify(error, null, 2)}`);
      }
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
}
