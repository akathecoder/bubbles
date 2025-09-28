// use this when there is no `"type": "module"` in your package.json, i.e. you're using commonjs

import { SDK, HashLock, PrivateKeyProviderConnector, NetworkEnum, Quote } from "@1inch/cross-chain-sdk";

import { Web3 } from "web3";
import { Contract, Wallet, JsonRpcProvider } from "ethers";
import { approveABI } from "@/lib/oneInch/constants";
import { type SwapArgs } from "@/lib/oneInch/types";
import { getSecretsAndHashLock } from "@/lib/oneInch/utils";
import { ERC20Abi } from "@/lib/oneInch/ERC20Abi";
import { ethers } from "ethers";

const ONEINCH_API_URL = "https://api.1inch.dev/fusion-plus";
const ONEINCH_AGGREGATION_ROUTER_V6 = "0x111111125421ca6dc452d289314280a0f8842a65";
const UINT256_MAX = "115792089237316195423570985008687907853269984665640564039457584007913129639935";

export class OneInch {
  rpc: string;
  sdk: SDK;

  constructor(args: { rpc: string; apiKey?: string; privateKey: string }) {
    this.rpc = args.rpc;
    const web3Instance = new Web3(args.rpc);
    const blockchainProvider = new PrivateKeyProviderConnector(args.privateKey, web3Instance as any);
    this.sdk = new SDK({
      url: ONEINCH_API_URL,
      authKey: args.apiKey,
      blockchainProvider,
    });
  }

  async approve(token: string, makerPrivateKey: string) {
    const provider = new JsonRpcProvider(this.rpc);
    const sender = new Wallet(makerPrivateKey, provider);
    const tkn = new Contract(token, ERC20Abi, sender);
    const allowance = await tkn.allowance(
      sender.address, // maker address
      ONEINCH_AGGREGATION_ROUTER_V6,
    );
    if (allowance < BigInt(1000_000_000_000)) {
      console.log(`Current allowance is ${allowance.toString()}. Approving token...`);
      const tx = await tkn.approve(
        ONEINCH_AGGREGATION_ROUTER_V6,
        UINT256_MAX, // unlimited allowance
      );
      await tx.wait();
    }
  }

  async getPermit(privateKey: string, tokenAddress: string, tokenReceiver: string, value: string, deadline: number) {
    const provider = new JsonRpcProvider(this.rpc);

    const chainId = (await provider.getNetwork()).chainId;
    const myToken = new ethers.Contract(tokenAddress, ERC20Abi, provider);

    const domain = {
      name: await myToken.name(),
      version: (await myToken.version()) || "1",
      chainId: chainId,
      verifyingContract: tokenAddress,
    };

    const types = {
      Permit: [
        {
          name: "owner",
          type: "address",
        },
        {
          name: "spender",
          type: "address",
        },
        {
          name: "value",
          type: "uint256",
        },
        {
          name: "nonce",
          type: "uint256",
        },
        {
          name: "deadline",
          type: "uint256",
        },
      ],
    };

    const tokenOwner = new ethers.Wallet(privateKey, provider);
    const nonces = await myToken.nonces(tokenOwner.address);

    const values = {
      owner: tokenOwner.address,
      spender: tokenReceiver,
      value: value,
      nonce: nonces,
      deadline: deadline,
    };

    const permitSig = await tokenOwner.signTypedData(domain, types, {
      owner: tokenOwner.address,
      spender: tokenReceiver,
      value: value,
      nonce: await myToken.nonces(tokenOwner.address),
      deadline: deadline,
    });

    return myToken.interface.encodeFunctionData("permit", [
      tokenOwner.address,
      tokenReceiver,
      value,
      deadline,
      permitSig,
    ]);
  }

  async getQuote(args: SwapArgs) {
    const permitPayload = await this.getPermit(
      args.makerPrivateKey,
      args.srcTokenAddress,
      ONEINCH_AGGREGATION_ROUTER_V6,
      args.amount,
      Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
    );

    const params = {
      srcChainId: args.srcChainId,
      dstChainId: args.dstChainId,
      srcTokenAddress: args.srcTokenAddress,
      dstTokenAddress: args.dstTokenAddress,
      amount: args.amount,
      enableEstimate: args.enableEstimate,
      walletAddress: args.makerAddress,
      // permit: permitPayload,
    };

    try {
      const quote = await this.sdk.getQuote(params);
      console.log(`Received Fusion+ quote from 1inch API: ${quote.quoteId}`);
      return quote;
    } catch (error) {
      console.error("Error in getting quote:", error);
      throw error;
    }
  }

  async swap(quote: Quote) {
    try {
      const secretsCount = quote.getPreset().secretsCount;
      const { secrets, secretHashes, hashLock } = getSecretsAndHashLock(secretsCount);
      console.log("Received Fusion+ quote from 1inch API");

      const quoteResponse = await this.sdk.placeOrder(quote, {
        walletAddress: quote.params.walletAddress as any,
        hashLock,
        secretHashes,
        // permit: quote.params.permit,
      });
      const orderHash = quoteResponse.orderHash;
      console.log(`Order successfully placed`, orderHash);
      await this.submitSecrets(orderHash, secrets, secretHashes);
    } catch (error) {
      console.error("Error in main execution:", error);
    }
  }

  async submitSecrets(orderHash: string, secrets: string[], secretHashes: string[]) {
    let flag = true;

    while (flag) {
      console.log(`Polling for fills until order status is set to "executed"...`);
      try {
        const order = await this.sdk.getOrderStatus(orderHash);
        if (order.status === "executed") {
          console.log(`Order is complete. Exiting.`);
          flag = false;
        }

        const fillsObject = await this.sdk.getReadyToAcceptSecretFills(orderHash);
        if (fillsObject.fills.length > 0) {
          for (const fill of fillsObject.fills) {
            await this.sdk.submitSecret(orderHash, secrets[fill.idx]);
            console.log(`Fill order found! Secret submitted: ${JSON.stringify(secretHashes[fill.idx], null, 2)}`);
          }
        }
      } catch (error) {
        console.error(`Error: ${JSON.stringify(error, null, 2)}`);
      }
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
}

export const sendPayment = async (rpc: string, privateKey: string, apiKey: string, args: SwapArgs) => {
  const oneInch = new OneInch({
    rpc: rpc,
    privateKey: privateKey,
    apiKey: apiKey,
  });
  oneInch.approve(
    args.srcTokenAddress, // WETH on Arbitrum
    privateKey,
  );
  const quote = await oneInch.getQuote(args);
  await oneInch.swap(quote);
};
