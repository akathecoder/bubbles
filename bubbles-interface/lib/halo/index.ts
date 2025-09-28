// import * as haloWeb from "@arx-research/libhalo/api/web";
import { haloCheckWebNFCPermission, execHaloCmdWeb } from "@arx-research/libhalo/api/web";
import { type ExecHaloCmdWebOptions } from "@arx-research/libhalo/types";

export type CommandResponse = {
  input: {
    keyNo: number;
    digest: string;
  };
  signature: {
    raw: { r: string; s: string; v: 27 | 28 };
    der: string;
    ether: `0x${string}`;
  };
  publicKey: string;
  etherAddress: `0x${string}`;
};

export type KeyInfo = {
  publicKeys: Record<string, string>;
  compressedPublicKeys: Record<string, string>;
  etherAddresses: Record<string, `0x${string}`>;
};

const options: ExecHaloCmdWebOptions = {
  method: "webnfc",
};

export async function checkPermission() {
  return haloCheckWebNFCPermission();
}

export async function getKeys() {
  const command = {
    name: "get_pkeys",
  };

  return execHaloCmdWeb(command, options) as Promise<KeyInfo>;
}

// {"keyState":{"isPasswordProtected":false,"rawSignCommandNotUsed":false,"isImported":false,"isExported":false,"failedAuthCounter":0},"publicKey":"0452ca9b48403dc6f896b6015f138f7699e72cb2594545848ec6f72348ba66ab431dcc5402fe9c59fd344d5b5a9fdb07795c6b26591721a2566a3755c764b09237","attestSig":"02a13045022100c98b271dd6271ffc972ae51a1509e317c068c923e0d1a0ffb246656c98c5e5e9022035b75778751ff1250ff509372bf79d6dd2549cb00aa43155f4026b107b37240d"}
export type KeyInfo2 = {
  keyState: {
    isPasswordProtected: boolean;
    rawSignCommandNotUsed: boolean;
    isImported: boolean;
    isExported: boolean;
    failedAuthCounter: number;
  };
  publicKey: string;
  attestSig: string;
};

export async function getKeyInfo() {
  const command = {
    name: "get_key_info",
    keyNo: 1,
  };

  return execHaloCmdWeb(command, options) as Promise<KeyInfo>;
}

export async function getKey() {
  const keys = await getKeys();
  return keys.etherAddresses["1"];
}

export function signMessage(message: string) {
  const command = {
    name: "sign",
    keyNo: 1,
    message,
  };

  return execHaloCmdWeb(command, options) as Promise<CommandResponse>;
}

/// Sign a digest using the hardware wallet.
/// @param digest The digest to sign in hex without 0x prefix.
export function signDigest(digest: string) {
  if (digest.startsWith("0x")) {
    digest = digest.slice(2);
  }

  const command = {
    name: "sign",
    keyNo: 1,
    digest,
  };

  return execHaloCmdWeb(command, options) as Promise<CommandResponse>;
}
