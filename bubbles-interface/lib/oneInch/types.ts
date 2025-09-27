import { type SupportedChain } from "@1inch/cross-chain-sdk";

export interface SwapArgs {
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
