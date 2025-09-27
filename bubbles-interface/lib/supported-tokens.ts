export interface Token {
  id: string;
  name: string;
  symbol: string;
  decimals: number;
  address?: string;
  icon: string;
  coingeckoId?: string;
}

export interface Chain {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  chainId: number;
  rpcUrls: string[];
  blockExplorerUrls: string[];
  nativeCurrency: Token;
}

export const chains: Chain[] = [
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    icon: '🔷',
    chainId: 1,
    rpcUrls: ['https://mainnet.infura.io/v3/', 'https://rpc.ankr.com/eth'],
    blockExplorerUrls: ['https://etherscan.io'],
    nativeCurrency: {
      id: 'eth',
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      icon: 'Ξ',
      coingeckoId: 'ethereum',
    },
  },
  {
    id: 'base',
    name: 'Base',
    symbol: 'ETH',
    icon: '🔵',
    chainId: 8453,
    rpcUrls: ['https://mainnet.base.org', 'https://base.llamarpc.com'],
    blockExplorerUrls: ['https://basescan.org'],
    nativeCurrency: {
      id: 'eth',
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      icon: 'Ξ',
      coingeckoId: 'ethereum',
    },
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum One',
    symbol: 'ETH',
    icon: '🔺',
    chainId: 42161,
    rpcUrls: ['https://arb1.arbitrum.io/rpc', 'https://arbitrum.llamarpc.com'],
    blockExplorerUrls: ['https://arbiscan.io'],
    nativeCurrency: {
      id: 'eth',
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      icon: 'Ξ',
      coingeckoId: 'ethereum',
    },
  },
  {
    id: 'optimism',
    name: 'Optimism',
    symbol: 'ETH',
    icon: '🔴',
    chainId: 10,
    rpcUrls: ['https://mainnet.optimism.io', 'https://optimism.llamarpc.com'],
    blockExplorerUrls: ['https://optimistic.etherscan.io'],
    nativeCurrency: {
      id: 'eth',
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      icon: 'Ξ',
      coingeckoId: 'ethereum',
    },
  },
  {
    id: 'polygon',
    name: 'Polygon',
    symbol: 'MATIC',
    icon: '🟣',
    chainId: 137,
    rpcUrls: ['https://polygon-rpc.com', 'https://rpc.ankr.com/polygon'],
    blockExplorerUrls: ['https://polygonscan.com'],
    nativeCurrency: {
      id: 'matic',
      name: 'Polygon',
      symbol: 'MATIC',
      decimals: 18,
      icon: '🟣',
      coingeckoId: 'matic-network',
    },
  },
];

export const tokens: Record<string, Token[]> = {
  ethereum: [
    {
      id: 'eth',
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      icon: 'Ξ',
      coingeckoId: 'ethereum',
    },
    {
      id: 'usdc',
      name: 'USD Coin',
      symbol: 'USDC',
      decimals: 6,
      address: '0xA0b86a33E6417fa68d30D964c60E39a69e8e7a37',
      icon: '$',
      coingeckoId: 'usd-coin',
    },
    {
      id: 'usdt',
      name: 'Tether USD',
      symbol: 'USDT',
      decimals: 6,
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      icon: '$',
      coingeckoId: 'tether',
    },
    {
      id: 'dai',
      name: 'Dai Stablecoin',
      symbol: 'DAI',
      decimals: 18,
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      icon: '$',
      coingeckoId: 'dai',
    },
  ],
  base: [
    {
      id: 'eth',
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      icon: 'Ξ',
      coingeckoId: 'ethereum',
    },
    {
      id: 'usdc',
      name: 'USD Coin',
      symbol: 'USDC',
      decimals: 6,
      address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
      icon: '$',
      coingeckoId: 'usd-coin',
    },
    {
      id: 'dai',
      name: 'Dai Stablecoin',
      symbol: 'DAI',
      decimals: 18,
      address: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
      icon: '$',
      coingeckoId: 'dai',
    },
  ],
  arbitrum: [
    {
      id: 'eth',
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      icon: 'Ξ',
      coingeckoId: 'ethereum',
    },
    {
      id: 'usdc',
      name: 'USD Coin',
      symbol: 'USDC',
      decimals: 6,
      address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
      icon: '$',
      coingeckoId: 'usd-coin',
    },
    {
      id: 'usdt',
      name: 'Tether USD',
      symbol: 'USDT',
      decimals: 6,
      address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
      icon: '$',
      coingeckoId: 'tether',
    },
    {
      id: 'pyusd',
      name: 'PayPal USD',
      symbol: 'PYUSD',
      decimals: 6,
      address: '0x52A8845DF664D76C69d2EEa607CD793565aF42B8',
      icon: '$',
      coingeckoId: 'paypal-usd',
    },
    {
      id: 'arb',
      name: 'Arbitrum',
      symbol: 'ARB',
      decimals: 18,
      address: '0x912CE59144191C1204E64559FE8253a0e49E6548',
      icon: '🔺',
      coingeckoId: 'arbitrum',
    },
  ],
  optimism: [
    {
      id: 'eth',
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      icon: 'Ξ',
      coingeckoId: 'ethereum',
    },
    {
      id: 'usdc',
      name: 'USD Coin',
      symbol: 'USDC',
      decimals: 6,
      address: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
      icon: '$',
      coingeckoId: 'usd-coin',
    },
    {
      id: 'usdt',
      name: 'Tether USD',
      symbol: 'USDT',
      decimals: 6,
      address: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
      icon: '$',
      coingeckoId: 'tether',
    },
    {
      id: 'op',
      name: 'Optimism',
      symbol: 'OP',
      decimals: 18,
      address: '0x4200000000000000000000000000000000000042',
      icon: '🔴',
      coingeckoId: 'optimism',
    },
  ],
  polygon: [
    {
      id: 'matic',
      name: 'Polygon',
      symbol: 'MATIC',
      decimals: 18,
      icon: '🟣',
      coingeckoId: 'matic-network',
    },
    {
      id: 'usdc',
      name: 'USD Coin',
      symbol: 'USDC',
      decimals: 6,
      address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      icon: '$',
      coingeckoId: 'usd-coin',
    },
    {
      id: 'usdt',
      name: 'Tether USD',
      symbol: 'USDT',
      decimals: 6,
      address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
      icon: '$',
      coingeckoId: 'tether',
    },
    {
      id: 'dai',
      name: 'Dai Stablecoin',
      symbol: 'DAI',
      decimals: 18,
      address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      icon: '$',
      coingeckoId: 'dai',
    },
  ],
};

// Helper functions
export function getChainById(chainId: string): Chain | undefined {
  return chains.find(chain => chain.id === chainId);
}

export function getTokensByChain(chainId: string): Token[] {
  return tokens[chainId] || [];
}

export function getTokenById(chainId: string, tokenId: string): Token | undefined {
  const chainTokens = tokens[chainId] || [];
  return chainTokens.find(token => token.id === tokenId);
}

export function getSupportedChains(): Chain[] {
  return chains;
}

export function getAllTokens(): Token[] {
  return Object.values(tokens).flat();
}

// Default preferences
export const DEFAULT_CHAIN = 'base';
export const DEFAULT_TOKEN = 'usdc';