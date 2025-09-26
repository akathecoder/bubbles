# Bubbles

A playful, human-first way to send compliment badges (Bubbles) that carry real value. People meet IRL (scan NFC wristbands) or online, add each other, and later buy & send a compliment. Recipients see the badge/emote and receive funds in their preferred chain/token via automatic swap + routing using 1inch Fusion+.

### Home Page (pre-login)

Goals: explain in 5 seconds, zero-fear crypto UX.

Hero: “Compliments that float to you.” CTA: Make Someone Smile.

How it works (3 steps): Tap wristband → Pick a Bubble → Send (we swap under the hood).

Demo carousel of badges/emotes.

### Pillars & Constraints

Tone: soft, friendly, sticker-like; crypto under the hood, social up front.

Frictionless Web3 onboarding: use Dynamic for auth + wallet. Default to email/passkey; power users can link existing wallets.

Cross-chain payout preference: recipients choose chain + token; senders pay in whatever; app auto-routes/swap.

IRL-first: NFC wristbands can sign messages & expose a public profile handle for quick adds.

Privacy: compliments are visible to sender+recipient; tip amounts are visible to recipient; public feed is opt-in.

### Personas & Scenarios

Ishita (sender, new to crypto): Meets someone at a hackathon, scans NFC, later sends a 🌸 “Kind” Bubble with $ equivalent. Wants it to “just work.”

Ravi (recipient, power user): Prefers payouts in USDC on Base. He receives badges visually, value settles to his chosen destination.

Event host: Wants a leaderboard and session recap (top complimented, total value sent).

### Platforms & Scope (MVP)

Web based app.

NFC wristband: https://arx.org/

### System Architecture (high level)

Auth & Wallet: Dynamic (hosted modal, email/passkey onboarding).

Compliment Catalog: managed in app DB (id, emoji, label, price tiers).

Payment & Routing: abstract “Pay” intent → quote → route → settle. Use a route provider (swapper/bridge) behind an internal /quotes service. (Exact provider can be swapped without UX change.) Use 1inch Fusion+.

NFC: read-only for discoverability + challenge-sign flow to verify wristband ownership.

Storage: compliments, user profiles, payout preferences, connections, events, badges. Store locally for temporary storage.

Notifications: in-app + email. Use service worker for push notifications.

### Key User Flows

#### A New user onboarding (Dynamic)

Open app → “Get Started”

Dynamic modal: Continue with Email (passkey if available) / Continue with Wallet.

After success, app creates User Profile with: ENS (.eth) handle (auto-suggested username), display name, avatar

Preferred Payout: chain (select), token (select)

“Connect NFC Wristband” (optional)

Finish → Home (Discover) with a 1-card tutorial: “Scan someone’s tag to add them.”

#### NFC add flow

Tap a stranger’s NFC wristband.

Scan using web based mobile NFC apis, check arx.org.

Request signature from stranger NFC Arx tag.

Sender sees Mini Profile Card → “Add to my Circle.”

Connection saved.

#### Send a compliment Bubble

From Home or Connections, tap a person from recent list.

Choose Bubble Badge: gallery (e.g., 🌸 Kind, 🔥 Inspiring, 💡 Insightful, 🎸 Cool).

Add note (optional) and Select tip amount (chips + custom).

Pay: app shows “You pay 100 X bubbles” Show $ worth of bubbles.

Success screen: animation of Bubble floating → “Delivered.”
