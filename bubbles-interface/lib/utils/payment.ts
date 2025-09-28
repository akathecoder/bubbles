import { chains, getTokenById } from "@/lib/supported-tokens";

// Helper function to parse preferred payment format: ethereum:chainId:tokenId
export function parsePreferredPayment(preferredPayment: string) {
  const parts = preferredPayment.split(":");
  if (parts.length !== 3 || parts[0] !== "ethereum") {
    return null;
  }

  const chainId = parseInt(parts[1]);
  const tokenId = parts[2].toLowerCase();

  // Find chain by chainId
  const chain = chains.find((c) => c.chainId === chainId);
  if (!chain) return null;

  // Find token in chain
  const token = getTokenById(chain.id, tokenId);
  if (!token) {
    // Fallback to native currency if token not found
    return {
      chainId,
      chainName: chain.name,
      tokenAddress: undefined, // Native token
      symbol: chain.nativeCurrency.symbol,
      decimals: chain.nativeCurrency.decimals,
    };
  }

  return {
    chainId,
    chainName: chain.name,
    tokenAddress: token.address as `0x${string}`,
    symbol: token.symbol,
    decimals: token.decimals,
  };
}