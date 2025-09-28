# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Bubbles** is a playful, human-first way to send compliment badges (Bubbles) that carry real value. People meet IRL (scan NFC wristbands) or online, add each other, and later buy & send a compliment. Recipients see the badge/emote and receive funds in their preferred chain/token via automatic swap + routing using 1inch Fusion+.

### Core Features
- **IRL-first**: NFC wristbands (arx.org) can sign messages & expose public profile handles for quick adds
- **Cross-chain payments**: Recipients choose chain + token; senders pay in whatever; app auto-routes/swaps
- **Zero-fear crypto UX**: Dynamic Labs for auth + wallet with email/passkey default; power users can link existing wallets
- **Compliment system**: Visual badges/emotes (🌸 Kind, 🔥 Inspiring, 💡 Insightful, 🎸 Cool) with real monetary value
- **Privacy-focused**: Compliments visible to sender+recipient; tip amounts visible to recipient; public feed is opt-in

### Key User Personas
- **Ishita** (sender, new to crypto): Meets someone at hackathon, scans NFC, later sends 🌸 "Kind" Bubble with $ equivalent. Wants it to "just work."
- **Ravi** (recipient, power user): Prefers payouts in USDC on Base. Receives badges visually, value settles to chosen destination.
- **Event host**: Wants leaderboard and session recap (top complimented, total value sent).

## Project Structure

The repository contains a Next.js frontend application in the `bubbles-interface/` directory.

### Architecture

- **Frontend**: Next.js 15 with App Router and client-side components
- **Wallet Integration**: Dynamic Labs with multi-chain support (Bitcoin, Ethereum, Solana, Sui)
- **Styling**: Tailwind CSS v4 with shadcn/ui component library
- **Package Manager**: pnpm
- **TypeScript**: Strict configuration with path aliases (`@/*`)

### Key Directories

- `bubbles-interface/app/` - Next.js App Router pages and layouts
- `bubbles-interface/lib/` - Utility functions (includes `cn()` for class merging)
- `bubbles-interface/public/` - Static assets
- Component structure follows shadcn/ui conventions with aliases configured in `components.json`

## Development Commands

All commands should be run from the `bubbles-interface/` directory:

```bash
# Development server with Turbopack
pnpm dev

# Production build with Turbopack  
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

## Design System

The project uses shadcn/ui with the following configuration:
- Style: "new-york"
- Base color: slate
- CSS variables enabled
- Path aliases configured for components (`@/components`), utils (`@/lib/utils`), etc.
- Icon library: lucide-react

**Theme**: Soft, friendly, sticker-like aesthetic. Crypto functionality under the hood, social experience up front.

## Tech Stack

- **Framework**: Next.js 15 with React 19
- **Wallet Integration**: Dynamic Labs SDK with multi-chain connectors
- **Web3**: wagmi, viem for Ethereum interactions
- **State Management**: React Query (@tanstack/react-query)
- **Styling**: Tailwind CSS v4, tw-animate-css
- **Utilities**: class-variance-authority, clsx, tailwind-merge
- **Icons**: lucide-react
- **Fonts**: Geist Sans, Geist Mono, Borel (for playful elements)
- **TypeScript**: v5 with strict mode enabled
- **Development**: Turbopack for fast builds and dev server

## Key User Flows

### New User Onboarding (Dynamic)
1. Open app → "Get Started"
2. Dynamic modal: Continue with Email (passkey if available) / Continue with Wallet
3. After success, app creates User Profile with: ENS (.eth) handle (auto-suggested username), display name, avatar
4. Preferred Payout: chain (select), token (select)
5. "Connect NFC Wristband" (optional)
6. Finish → Home (Discover) with 1-card tutorial: "Scan someone's tag to add them."

### NFC Add Flow
1. Tap a stranger's NFC wristband
2. Scan using web-based mobile NFC APIs (check arx.org)
3. Request signature from stranger NFC Arx tag
4. Sender sees Mini Profile Card → "Add to my Circle"
5. Connection saved

### Send a Compliment Bubble
1. From Home or Connections, tap a person from recent list
2. Choose Bubble Badge: gallery (e.g., 🌸 Kind, 🔥 Inspiring, 💡 Insightful, 🎸 Cool)
3. Add note (optional) and Select tip amount (chips + custom)
4. Pay: app shows "You pay 100 X bubbles" Show $ worth of bubbles
5. Success screen: animation of Bubble floating → "Delivered."

## Key Integrations

- **Dynamic Labs**: Wallet authentication with environment ID `c5735bc8-84cc-4a26-a7d4-0cd948285a0e`
- **Multi-chain Support**: Bitcoin, Ethereum, Solana, Sui wallet connectors
- **NFC Integration**: Web-based NFC APIs for arx.org wristband interactions
- **Payment Routing**: 1inch Fusion+ for cross-chain swaps and routing
- **Storage**: Compliments, user profiles, payout preferences, connections, events, badges (store locally for temporary storage)
- **Notifications**: In-app + email notifications; service worker for push notifications

## Home Page Requirements

**Goals**: Explain in 5 seconds, zero-fear crypto UX

**Hero**: "Compliments that float to you." CTA: Make Someone Smile

**How it works (3 steps)**: Tap wristband → Pick a Bubble → Send (we swap under the hood)

**Demo carousel** of badges/emotes