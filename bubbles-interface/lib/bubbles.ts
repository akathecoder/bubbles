export interface BubbleType {
  name: string;
  value: number; // Base value in USD
}

export const BUBBLE_TYPES: BubbleType[] = [
  {
    name: "Kind",
    value: 0.5, // 500 bubbles = $0.50
  },
  {
    name: "Inspiring",
    value: 1.0, // 1000 bubbles = $1.00
  },
  {
    name: "Insightful",
    value: 1.5, // 1500 bubbles = $1.50
  },
  {
    name: "Cool",
    value: 0.8, // 800 bubbles = $0.80
  },
];

export function getBubbleTypeByName(name: string): BubbleType | undefined {
  return BUBBLE_TYPES.find((bubble) => bubble.name.toLowerCase() === name.toLowerCase());
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
