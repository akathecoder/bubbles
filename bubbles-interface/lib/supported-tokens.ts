export interface Token {
  id: string;
  name: string;
  symbol: string;
  decimals: number;
  address?: string;
  icon: string;
}

export interface Chain {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  chainId: number;
  nativeCurrency: Token;
}

export const chains: Chain[] = [
  {
    id: "base",
    name: "Base",
    symbol: "ETH",
    icon: "🔵",
    chainId: 8453,
    nativeCurrency: {
      id: "eth",
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
      icon: "Ξ",
    },
  },
  {
    id: "arbitrum",
    name: "Arbitrum One",
    symbol: "ETH",
    icon: "🔺",
    chainId: 42161,
    nativeCurrency: {
      id: "eth",
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
      icon: "Ξ",
    },
  },
];

export const tokens: Record<string, Token[]> = {
  base: [
    {
      id: "usdc",
      name: "USD Coin",
      symbol: "USDC",
      decimals: 6,
      address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      icon: "$",
    },
    {
      id: "dai",
      name: "Dai Stablecoin",
      symbol: "DAI",
      decimals: 18,
      address: "0x50c5725949a6f0c72e6c4a641f24049a917db0cb",
      icon: "$",
    },
  ],
  arbitrum: [
    {
      id: "usdc",
      name: "USD Coin",
      symbol: "USDC",
      decimals: 6,
      address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      icon: "$",
    },
    {
      id: "usdt",
      name: "Tether USD",
      symbol: "USDT",
      decimals: 6,
      address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
      icon: "$",
    },
    {
      id: "pyusd",
      name: "PayPal USD",
      symbol: "PYUSD",
      decimals: 6,
      address: "0x46850aD61C2B7d64d08c9C754F45254596696984",
      icon: "$",
    },
  ],
};

// Helper functions
export function getChainById(chainId: string): Chain | undefined {
  return chains.find((chain) => chain.id === chainId);
}

export function getTokensByChain(chainId: string): Token[] {
  return tokens[chainId] || [];
}

export function getTokenById(chainId: string, tokenId: string): Token | undefined {
  const chainTokens = tokens[chainId] || [];
  return chainTokens.find((token) => token.id === tokenId);
}

// Default preferences
export const DEFAULT_CHAIN = "base";
export const DEFAULT_TOKEN = "usdc";
