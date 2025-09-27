import {
  decodeFunctionData,
  encodeAbiParameters,
  encodePacked,
  hexToBytes,
  HttpRequestError,
  keccak256,
  parseAbiParameters,
  serializeSignature,
  type Hex,
} from "viem";
import { sign } from "viem/accounts";
import {
  decodeEnsOffchainRequest,
  encodeEnsOffchainResponse,
} from "../utils/ccip.js";
import { bytesToPacket } from "../utils/ens.js";

const RESOLVE_ABI = [
  {
    inputs: [
      { internalType: "bytes", name: "name", type: "bytes" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "resolve",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "view",
    type: "function",
  },
];

const DB: Record<string, Hex> = {
  "sparsh.eth": "0x1fE1F85EE8941BE5F93A2d5175a6B412Fb1e7AEE",
  "0xsparsh.eth": "0x1fE1F85EE8941BE5F93A2d5175a6B412Fb1e7AEE",
  "0xsparsh.base.eth": "0x1fE1F85EE8941BE5F93A2d5175a6B412Fb1e7AEE",
};

export async function getEnsAddressUsingLookup(
  resolver: Hex,
  data: Hex
): Promise<string> {
  try {
    const decoded = decodeFunctionData({
      abi: RESOLVE_ABI,
      data: data as Hex,
    });

    const ensName = bytesToPacket(hexToBytes(decoded.args![0] as Hex));

    const addr = DB[ensName];
    if (!addr) {
      throw new Error(`ENS name not found`);
    }

    const expires = BigInt(Math.floor(Date.now() / 1000) + 3000);

    const sig_obj = await sign({
      hash: keccak256(
        encodePacked(
          ["bytes", "address", "uint64", "bytes32", "bytes32"],
          ["0x1900", resolver, expires, keccak256(data), keccak256(addr as Hex)]
        )
      ),
      privateKey: process.env.ENS_LOOKUP_PRIVATE_KEY as Hex,
    });

    const sig = serializeSignature({
      r: sig_obj.r,
      s: sig_obj.s,
      v: sig_obj.v,
      yParity: sig_obj.yParity!,
    });

    const result = encodeAbiParameters(
      parseAbiParameters("bytes, uint64, bytes"),
      [addr, expires, sig]
    );

    return result;
  } catch (error) {
    console.error(error);
    throw new Error(`invalid data`);
  }
}

export async function getEnsAddressUsingCCIPLookup(
  sender: Hex,
  data: Hex
): Promise<string> {
  try {
    const { name, query } = decodeEnsOffchainRequest({
      sender,
      data,
    });
    // const result = await getRecord(name, query, env);
    const result = DB[name];
    if (!result) {
      throw new Error("ENS name not found");
    }

    const encodedResponse = await encodeEnsOffchainResponse(
      {
        sender,
        data,
      },
      result,
      process.env.ENS_LOOKUP_PRIVATE_KEY as Hex
    );

    return encodedResponse;
  } catch (error) {
    console.error(error);

    const isHttpRequestError = error instanceof HttpRequestError;
    const errMessage = isHttpRequestError ? error.message : "Unable to resolve";
    throw new Error(errMessage);
  }
}
