export interface BubbleType {
  emoji: string;
  name: string;
  color: string;
  description: string;
  value: number; // Base value in USD
}

export const BUBBLE_TYPES: BubbleType[] = [
  {
    emoji: "🌸",
    name: "Kind",
    color: "from-pink-400 to-rose-500",
    description: "For thoughtful gestures",
    value: 0.5 // 500 bubbles = $0.50
  },
  {
    emoji: "🔥",
    name: "Inspiring",
    color: "from-orange-400 to-red-500",
    description: "For motivational moments",
    value: 1.0 // 1000 bubbles = $1.00
  },
  {
    emoji: "💡",
    name: "Insightful",
    color: "from-yellow-400 to-amber-500",
    description: "For brilliant ideas",
    value: 1.5 // 1500 bubbles = $1.50
  },
  {
    emoji: "🎸",
    name: "Cool",
    color: "from-blue-400 to-indigo-500",
    description: "For awesome vibes",
    value: 0.8 // 800 bubbles = $0.80
  },
];


export function getBubbleTypeByName(name: string): BubbleType | undefined {
  return BUBBLE_TYPES.find(bubble => bubble.name.toLowerCase() === name.toLowerCase());
}

// Bubble conversion utilities (10 bubbles = 1 cent)
export const BUBBLES_PER_CENT = 10;
export const CENTS_PER_DOLLAR = 100;

export function bubblesToUSD(bubbles: number): number {
  return (bubbles / BUBBLES_PER_CENT) / CENTS_PER_DOLLAR;
}

export function usdToBubbles(usd: number): number {
  return Math.round(usd * CENTS_PER_DOLLAR * BUBBLES_PER_CENT);
}

export function getBubbleCount(bubbleType: BubbleType): number {
  return usdToBubbles(bubbleType.value);
}

export function formatBubbleAmount(bubbles: number): string {
  return `${bubbles.toLocaleString()} bubble${bubbles !== 1 ? 's' : ''}`;
}