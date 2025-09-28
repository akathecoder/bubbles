import { BUBBLE_TYPES } from "@/lib/bubbles";

// Real addresses for demo purposes - will show actual ENS data when available
export const DEMO_ADDRESSES = {
  VITALIK: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" as const, // vitalik.eth
  ENS_FOUNDER: "0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7" as const, // example ENS user
  DEMO_USER_1: "0x225f137127d9067788314bc7fcc1f36746a3c3B5" as const, // demo user
  DEMO_USER_2: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC" as const, // demo user
} as const;

// Mock bubble history data using real addresses
export const MOCK_BUBBLE_HISTORY = [
  {
    id: "1",
    type: BUBBLE_TYPES[0],
    amount: 5,
    fromAddress: DEMO_ADDRESSES.VITALIK,
    timestamp: "2 hours ago",
    status: "received" as const,
  },
  {
    id: "2",
    type: BUBBLE_TYPES[1],
    amount: 10,
    toAddress: DEMO_ADDRESSES.ENS_FOUNDER,
    timestamp: "1 day ago",
    status: "sent" as const,
  },
  {
    id: "3",
    type: BUBBLE_TYPES[2],
    amount: 15,
    fromAddress: DEMO_ADDRESSES.DEMO_USER_1,
    timestamp: "2 days ago",
    status: "received" as const,
  },
];

// Mock connections data using real addresses
export const MOCK_CONNECTIONS = [
  {
    id: "1",
    address: DEMO_ADDRESSES.VITALIK,
    bubblesSent: 3,
    bubblesReceived: 5,
  },
  {
    id: "2",
    address: DEMO_ADDRESSES.ENS_FOUNDER,
    bubblesSent: 8,
    bubblesReceived: 2,
  },
  {
    id: "3",
    address: DEMO_ADDRESSES.DEMO_USER_1,
    bubblesSent: 1,
    bubblesReceived: 7,
  },
  {
    id: "4",
    address: DEMO_ADDRESSES.DEMO_USER_2,
    bubblesSent: 0,
    bubblesReceived: 3,
  },
];

// Types for the mock data
export interface MockBubbleHistory {
  id: string;
  type: (typeof BUBBLE_TYPES)[number];
  amount: number;
  fromAddress?: `0x${string}`;
  toAddress?: `0x${string}`;
  timestamp: string;
  status: "received" | "sent";
}

export interface MockConnection {
  id: string;
  address: `0x${string}`;
  bubblesSent: number;
  bubblesReceived: number;
}

// Type for connections stored in localStorage
export interface StoredConnection {
  id: string;
  address: `0x${string}`;
  ensName?: string;
  avatar?: string;
  addedAt: string; // ISO date string
  bubblesSent: number;
  bubblesReceived: number;
}
