import { SDK, HashLock, PrivateKeyProviderConnector, NetworkEnum } from "@1inch/cross-chain-sdk";
import { solidityPackedKeccak256, randomBytes, Contract, Wallet, JsonRpcProvider } from "ethers";

export function getRandomBytes32() {
  return "0x" + Buffer.from(randomBytes(32)).toString("hex");
}

export function getHashLock(secrets: string[], secretHashes: string[]) {
  if (secrets.length !== secretHashes.length) {
    throw new Error("secrets and secretHashes must have the same length");
  }
  const hashLock =
    secrets.length === 1
      ? HashLock.forSingleFill(secrets[0])
      : HashLock.forMultipleFills(
          secretHashes.map((secretHash, i) =>
            solidityPackedKeccak256(["uint64", "bytes32"], [i, secretHash.toString()]),
          ) as any,
        );
  return hashLock;
}

export function getSecretsAndHashLock(count: number) {
  const secrets = Array.from({ length: count }).map(() => getRandomBytes32());
  const secretHashes = secrets.map((x) => HashLock.hashSecret(x));
  const hashLock = getHashLock(secrets, secretHashes);
  return { secrets, secretHashes, hashLock };
}
