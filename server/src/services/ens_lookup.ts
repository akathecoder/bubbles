import { decodeFunctionData, hexToBytes, type Hex } from "viem";
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

const DB: Record<string, string> = {
  "sparsh.eth": "0x1234567890abcdef1234567890abcdef12345678",
};

export function getEnsAddressUsingLookup(
  resolver: string,
  data: string
): string {
  try {
    const decoded = decodeFunctionData({
      abi: RESOLVE_ABI,
      data: data as Hex,
    });

    // console.log(`Decoded function data: ${JSON.stringify(decoded)}`);
    // console.log("Arg0: " + bytesToPacket(hexToBytes(decoded.args![0] as Hex)));
    // console.log("Arg1: " + hexToString(decoded.args![1] as Hex));

    const ensName = bytesToPacket(hexToBytes(decoded.args![0] as Hex));
    const addr = DB[ensName];

    if (!addr) {
      throw new Error(`ENS name not found`);
    }

    return addr;
  } catch (error) {
    throw new Error(`invalid data`);
  }
}
