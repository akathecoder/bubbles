export interface BubbleType {
  name: string;
  description: string;
  value: number; // Base value in USD
  category?: string; // Optional category for grouping
  rarity?: "common" | "uncommon" | "rare" | "epic"; // Optional rarity system
}

export const BUBBLE_TYPES: BubbleType[] = [
  {
    name: "Kind",
    description: "For thoughtful gestures",
    value: 0.5, // 500 bubbles = $0.50
    category: "emotion",
    rarity: "common",
  },
  {
    name: "Inspiring",
    description: "For motivational moments",
    value: 1.0, // 1000 bubbles = $1.00
    category: "motivation",
    rarity: "uncommon",
  },
  {
    name: "Insightful",
    description: "For brilliant ideas",
    value: 1.5, // 1500 bubbles = $1.50
    category: "intellect",
    rarity: "rare",
  },
  {
    name: "Cool",
    description: "For awesome vibes",
    value: 0.8, // 800 bubbles = $0.80
    category: "style",
    rarity: "common",
  },
];

export function getBubbleTypeByName(name: string): BubbleType | undefined {
  return BUBBLE_TYPES.find((bubble) => bubble.name.toLowerCase() === name.toLowerCase());
}

export function getBubbleTypesByCategory(category: string): BubbleType[] {
  return BUBBLE_TYPES.filter((bubble) => bubble.category === category);
}

export function getBubbleTypesByRarity(rarity: "common" | "uncommon" | "rare" | "epic"): BubbleType[] {
  return BUBBLE_TYPES.filter((bubble) => bubble.rarity === rarity);
}

// Bubble conversion utilities (10 bubbles = 1 cent)
export const BUBBLES_PER_CENT = 10;
export const CENTS_PER_DOLLAR = 100;

export function bubblesToUSD(bubbles: number): number {
  return bubbles / BUBBLES_PER_CENT / CENTS_PER_DOLLAR;
}

export function usdToBubbles(usd: number): number {
  return Math.round(usd * CENTS_PER_DOLLAR * BUBBLES_PER_CENT);
}

export function getBubbleCount(bubbleType: BubbleType): number {
  return usdToBubbles(bubbleType.value);
}

export function formatBubbleAmount(bubbles: number): string {
  return `${bubbles.toLocaleString()} bubble${bubbles !== 1 ? "s" : ""}`;
}

// Asset mapping that matches the bubble component expectations
export const BUBBLE_ASSETS: Record<string, string> = {
  Kind: "/heart-transparent.png",
  Insightful: "/brain-transparent.png",
  Cool: "/hug-transparent.png",
  Inspiring: "/bicep-transparent.png", // fallback to heart for now
};

export function getBubbleAssetPath(bubbleType: BubbleType): string | undefined {
  return BUBBLE_ASSETS[bubbleType.name];
}

export function hasBubbleAsset(bubbleType: BubbleType): boolean {
  return bubbleType.name in BUBBLE_ASSETS;
}
