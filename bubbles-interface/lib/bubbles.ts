export interface BubbleType {
  emoji: string;
  name: string;
  color: string;
  description: string;
  value: number; // Base value in USD
}

export interface PayoutToken {
  symbol: string;
  name: string;
  address: string;
  chain: string;
  decimals: number;
  icon: string;
}

export interface BubbleTransaction {
  id: string;
  senderId: string;
  recipientId: string;
  bubbleType: BubbleType;
  amount: number; // in USD
  note?: string;
  timestamp: Date;
  txHash?: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface UserConnection {
  id: string;
  userId: string;
  connectedUserId: string;
  connectedAt: Date;
  lastInteraction?: Date;
  bubblesSent: number;
  bubblesReceived: number;
}

export const BUBBLE_TYPES: BubbleType[] = [
  {
    emoji: "🌸",
    name: "Kind",
    color: "from-pink-400 to-rose-500",
    description: "For thoughtful gestures",
    value: 5
  },
  {
    emoji: "🔥",
    name: "Inspiring",
    color: "from-orange-400 to-red-500",
    description: "For motivational moments",
    value: 10
  },
  {
    emoji: "💡",
    name: "Insightful",
    color: "from-yellow-400 to-amber-500",
    description: "For brilliant ideas",
    value: 15
  },
  {
    emoji: "🎸",
    name: "Cool",
    color: "from-blue-400 to-indigo-500",
    description: "For awesome vibes",
    value: 8
  },
];

export const SUPPORTED_PAYOUT_TOKENS: PayoutToken[] = [
  {
    symbol: "USDC",
    name: "USD Coin",
    address: "0xA0b86a33E6441c0c0DE81f700c1A42C03F02FF9B", // Base USDC
    chain: "base",
    decimals: 6,
    icon: "/tokens/usdc.svg"
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    address: "0x0000000000000000000000000000000000000000", // Native ETH
    chain: "ethereum",
    decimals: 18,
    icon: "/tokens/eth.svg"
  },
  {
    symbol: "SOL",
    name: "Solana",
    address: "11111111111111111111111111111111", // Native SOL
    chain: "solana",
    decimals: 9,
    icon: "/tokens/sol.svg"
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", // Native BTC
    chain: "bitcoin",
    decimals: 8,
    icon: "/tokens/btc.svg"
  }
];

export const BUBBLE_AMOUNTS = [5, 10, 25, 50, 100]; // USD amounts

export function getBubbleTypeByName(name: string): BubbleType | undefined {
  return BUBBLE_TYPES.find(bubble => bubble.name.toLowerCase() === name.toLowerCase());
}

export function getBubbleTypeByEmoji(emoji: string): BubbleType | undefined {
  return BUBBLE_TYPES.find(bubble => bubble.emoji === emoji);
}

export function getPayoutTokenBySymbol(symbol: string): PayoutToken | undefined {
  return SUPPORTED_PAYOUT_TOKENS.find(token => token.symbol.toLowerCase() === symbol.toLowerCase());
}