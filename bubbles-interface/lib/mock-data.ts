import { BUBBLE_TYPES } from "@/lib/bubbles";

// Mock bubble history data for demo purposes
export const MOCK_BUBBLE_HISTORY = [
  {
    id: "1",
    type: BUBBLE_TYPES[0],
    amount: 5,
    from: "friend.eth",
    fromAvatar: "/placeholder-avatar-2.jpg",
    note: "Thanks for the great advice!",
    timestamp: "2 hours ago",
    status: "received" as const,
  },
  {
    id: "2",
    type: BUBBLE_TYPES[1],
    amount: 10,
    to: "colleague.eth",
    toAvatar: "/placeholder-avatar-3.jpg",
    note: "Amazing presentation!",
    timestamp: "1 day ago",
    status: "sent" as const,
  },
  {
    id: "3",
    type: BUBBLE_TYPES[2],
    amount: 15,
    from: "mentor.eth",
    fromAvatar: "/placeholder-avatar-4.jpg",
    note: "Love your insights on DeFi",
    timestamp: "2 days ago",
    status: "received" as const,
  },
];

// Mock connections data for demo purposes
export const MOCK_CONNECTIONS = [
  {
    id: "1",
    name: "friend.eth",
    avatar: "/placeholder-avatar-2.jpg",
    lastSeen: "2 min ago",
    bubblesSent: 3,
    bubblesReceived: 5,
  },
  {
    id: "2",
    name: "colleague.eth",
    avatar: "/placeholder-avatar-3.jpg",
    lastSeen: "1 hour ago",
    bubblesSent: 8,
    bubblesReceived: 2,
  },
  {
    id: "3",
    name: "mentor.eth",
    avatar: "/placeholder-avatar-4.jpg",
    lastSeen: "2 hours ago",
    bubblesSent: 1,
    bubblesReceived: 7,
  },
  {
    id: "4",
    name: "collaborator.eth",
    avatar: "/placeholder-avatar-5.jpg",
    lastSeen: "1 day ago",
    bubblesSent: 0,
    bubblesReceived: 3,
  },
];

// Types for the mock data
export interface MockBubbleHistory {
  id: string;
  type: typeof BUBBLE_TYPES[number];
  amount: number;
  from?: string;
  to?: string;
  fromAvatar?: string;
  toAvatar?: string;
  note: string;
  timestamp: string;
  status: "received" | "sent";
}

export interface MockConnection {
  id: string;
  name: string;
  avatar: string;
  lastSeen: string;
  bubblesSent: number;
  bubblesReceived: number;
}