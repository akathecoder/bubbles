"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Wallet, History, Users, Settings, Zap, Plus, Coins, Gift, Scan, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Bubble } from "@/components/ui/bubble";
import { BUBBLE_TYPES } from "@/lib/bubbles";
import { SendBubbleSheet } from "@/components/send-bubble-sheet";
import { NFCScanner } from "@/components/nfc-scanner";
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useProfileData } from "@/lib/hooks/useProfileData";
import { useBalance, useAccount, useEnsName } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { base } from "viem/chains";
import { useBubblesProfile } from "@/lib/hooks/useEnsTexts";
import { chains, tokens, getChainById, getTokenById } from "@/lib/supported-tokens";
import { MOCK_BUBBLE_HISTORY, MOCK_CONNECTIONS } from "@/lib/mock-data";

// Using bubble types from lib/bubbles.ts

// Helper function to parse preferred payment format: ethereum:chainId:tokenId
function parsePreferredPayment(preferredPayment: string) {
  const parts = preferredPayment.split(":");
  if (parts.length !== 3 || parts[0] !== "ethereum") {
    return null;
  }

  const chainId = parseInt(parts[1]);
  const tokenId = parts[2].toLowerCase();

  // Find chain by chainId
  const chain = chains.find((c) => c.chainId === chainId);
  if (!chain) return null;

  // Find token in chain
  const token = getTokenById(chain.id, tokenId);
  if (!token) {
    // Fallback to native currency if token not found
    return {
      chainId,
      chainName: chain.name,
      tokenAddress: undefined, // Native token
      symbol: chain.nativeCurrency.symbol,
      decimals: chain.nativeCurrency.decimals,
    };
  }

  return {
    chainId,
    chainName: chain.name,
    tokenAddress: token.address as `0x${string}`,
    symbol: token.symbol,
    decimals: token.decimals,
  };
}


export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="texture-noise absolute top-0 left-0 h-full w-full" />
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="relative z-10 flex h-screen flex-col"
      >
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <TabsContent
            value="home"
            className="mt-0 p-6"
          >
            <HomeTab />
          </TabsContent>

          <TabsContent
            value="scan"
            className="mt-0 p-6"
          >
            <ScanTab />
          </TabsContent>

          <TabsContent
            value="connections"
            className="mt-0 p-6"
          >
            <ConnectionsTab />
          </TabsContent>

          <TabsContent
            value="settings"
            className="mt-0 p-6"
          >
            <SettingsTab />
          </TabsContent>
        </div>

        {/* Bottom Navigation */}
        <TabsList className="grid h-20 w-full grid-cols-4 rounded-none border-t border-slate-200 bg-white/95 backdrop-blur-sm">
          <TabsTrigger
            value="home"
            className="flex flex-col gap-1 py-2 text-slate-600 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-800"
          >
            <Wallet className="h-5 w-5" />
            <span className="text-xs font-medium">Home</span>
          </TabsTrigger>
          <TabsTrigger
            value="scan"
            className="flex flex-col gap-1 py-2 text-slate-600 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-800"
          >
            <Scan className="h-5 w-5" />
            <span className="text-xs font-medium">Scan</span>
          </TabsTrigger>
          <TabsTrigger
            value="connections"
            className="flex flex-col gap-1 py-2 text-slate-600 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-800"
          >
            <Users className="h-5 w-5" />
            <span className="text-xs font-medium">Connections</span>
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="flex flex-col gap-1 py-2 text-slate-600 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-800"
          >
            <Settings className="h-5 w-5" />
            <span className="text-xs font-medium">Settings</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}

function HomeTab() {
  const { address } = useAccount();

  // Get ENS name from address
  const { data: ensName } = useEnsName({
    address,
  });

  // Get ENS profile data using the simplified hook
  const { profileData: ensProfile, isLoading: isProfileLoading } = useBubblesProfile(ensName || "");

  // Parse preferred payment from ENS data
  const paymentConfig = ensProfile?.preferredPayment ? parsePreferredPayment(ensProfile.preferredPayment) : null;

  // Get token balance using wagmi
  const { data: tokenBalance, isLoading: isBalanceLoading } = useBalance({
    address,
    token: paymentConfig?.tokenAddress,
    chainId: paymentConfig?.chainId || base.id,
    query: {
      enabled: !!address && !!paymentConfig,
    },
  });

  // Format balance for display
  const formattedBalance = tokenBalance
    ? parseFloat(formatUnits(tokenBalance.value, tokenBalance.decimals)).toFixed(2)
    : "0.00";

  // Get display data
  const displayName = ensName?.replace(".eth", "") || address?.slice(0, 6) || "User";
  const ensHandle = ensName || `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  const avatar = ensProfile?.avatar || "/placeholder-avatar.jpg";
  const preferredSymbol = paymentConfig?.symbol || "USDC";
  const chainName = paymentConfig?.chainName || "Base";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border-2 border-slate-200">
            <AvatarImage src={avatar} />
            <AvatarFallback>{displayName[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Hi, {displayName}!</h1>
            <p className="text-sm text-slate-600">{ensHandle}.eth</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-600 hover:text-slate-800"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </motion.div>

      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="skeu-card rounded-3xl p-6"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Balance</h2>
          <Badge
            variant="secondary"
            className="gap-1 rounded-full border-blue-200 bg-blue-100 text-blue-700"
          >
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            {chainName}
          </Badge>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2">
            {isBalanceLoading ? (
              <div className="h-8 w-32 animate-pulse rounded bg-slate-200"></div>
            ) : (
              <>
                <span className="text-3xl font-bold text-slate-800">{formattedBalance}</span>
                <span className="text-lg text-slate-600">{preferredSymbol}</span>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Bubble Balance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="skeu-card rounded-3xl p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-100 to-orange-100">
              <Coins className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="font-bold text-slate-800">Bubble Balance</p>
              <p className="text-sm text-slate-600">0 bubbles available</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-slate-500" />
        </div>
      </motion.div>

      {/* Bubble History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="skeu-card rounded-3xl p-6"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Recent Bubbles</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-600 hover:text-slate-800"
          >
            <History className="mr-2 h-4 w-4" />
            View All
          </Button>
        </div>

        <div className="space-y-4">
          {MOCK_BUBBLE_HISTORY.slice(0, 3).map((bubble, i) => (
            <motion.div
              key={bubble.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:bg-slate-100"
            >
              <Bubble
                type={bubble.type}
                size="md"
                variant="default"
              />

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800">
                    {bubble.status === "received" ? "From" : "To"}{" "}
                    {bubble.status === "received" ? bubble.from : bubble.to}
                  </span>
                  <Badge
                    variant={bubble.status === "received" ? "default" : "secondary"}
                    className={`rounded-full text-xs ${bubble.status === "received" ? "border-green-200 bg-green-100 text-green-700" : "border-blue-200 bg-blue-100 text-blue-700"}`}
                  >
                    {bubble.status === "received" ? "+" : "-"}${bubble.amount}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600">{bubble.note}</p>
                <p className="text-xs text-slate-500">{bubble.timestamp}</p>
              </div>

              <Avatar className="h-8 w-8">
                <AvatarImage src={bubble.status === "received" ? bubble.fromAvatar : bubble.toAvatar} />
                <AvatarFallback>{bubble.status === "received" ? bubble.from?.[0] : bubble.to?.[0]}</AvatarFallback>
              </Avatar>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Connections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="skeu-card rounded-3xl p-6"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Recent Connections</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-600 hover:text-slate-800"
          >
            <Users className="mr-2 h-4 w-4" />
            View All
          </Button>
        </div>

        <div className="space-y-3">
          {MOCK_CONNECTIONS.slice(0, 3).map((connection, i) => (
            <motion.div
              key={connection.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex cursor-pointer items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:bg-slate-100"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={connection.avatar} />
                <AvatarFallback>{connection.name[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="font-bold text-slate-800">{connection.name}</div>
                <div className="text-sm text-slate-600">{connection.lastSeen}</div>
              </div>

              <div className="text-right">
                <div className="text-sm font-bold text-slate-800">{connection.bubblesReceived} received</div>
                <div className="text-xs text-slate-500">{connection.bubblesSent} sent</div>
              </div>

              <Button
                size="sm"
                variant="outline"
                className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800"
              >
                <Gift className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ScanTab() {
  const [scannedUser, setScannedUser] = useState<{
    address: string;
    ensName?: string;
    avatar?: string;
  } | null>(null);
  const [isSendSheetOpen, setIsSendSheetOpen] = useState(false);

  const handleScanSuccess = (user: { address: string; ensName?: string; avatar?: string }) => {
    setScannedUser(user);
    setIsSendSheetOpen(true);
  };

  const handleSendComplete = (data: any) => {
    console.log("Bubble sent via scan:", data);
    // You could add the user to connections here
    toast.success(`Added ${data.connection.ensName} to your connections!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex h-full items-center justify-center p-6"
    >
      <div className="skeu-card w-full max-w-md space-y-8 rounded-3xl p-8 text-center">
        {/* Header */}
        <div>
          <h2
            className="mb-4 text-2xl font-bold text-slate-800"
            style={{
              textShadow: "0 2px 4px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
            }}
          >
            Scan NFC Tag
          </h2>
          <p className="leading-relaxed text-slate-600">
            Tap your phone against someone&apos;s NFC wristband to connect and send bubbles.
          </p>
        </div>

        {/* NFC Scanner Component */}
        <NFCScanner
          onScanSuccess={handleScanSuccess}
          buttonText="Start Scanning"
          buttonIcon={<Zap className="h-5 w-5" />}
          buttonSize="lg"
          buttonClassName="skeu-button w-full h-16 rounded-3xl relative group"
          showAnimation={true}
        />

        {/* Send Bubble Sheet */}
        <SendBubbleSheet
          open={isSendSheetOpen}
          onOpenChange={setIsSendSheetOpen}
          connection={
            scannedUser
              ? {
                  id: scannedUser.address,
                  name: scannedUser.ensName || "Unknown User",
                  avatar: scannedUser.avatar,
                }
              : null
          }
          onSendComplete={handleSendComplete}
        />
      </div>
    </motion.div>
  );
}

function ConnectionsTab() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSendSheetOpen, setIsSendSheetOpen] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState<(typeof MOCK_CONNECTIONS)[0] | null>(null);
  const [scannedUser, setScannedUser] = useState<{
    address: string;
    ensName?: string;
    avatar?: string;
  } | null>(null);

  const handleScanSuccess = (user: { address: string; ensName?: string; avatar?: string }) => {
    setScannedUser(user);
    setIsSheetOpen(true);
  };

  const handleAddConnection = () => {
    if (scannedUser) {
      // Add to connections list (in real app, this would be an API call)
      toast.success(`Added ${scannedUser.ensName} to your connections!`);
      setIsSheetOpen(false);
      setScannedUser(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between"
      >
        <h1
          className="text-2xl font-bold text-slate-800"
          style={{
            textShadow: "0 2px 4px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
          }}
        >
          My Connections
        </h1>
        <NFCScanner
          onScanSuccess={handleScanSuccess}
          buttonText="Add Connection"
          buttonIcon={<Plus className="h-4 w-4" />}
          buttonSize="sm"
          buttonClassName="skeu-button rounded-2xl relative group"
        />
      </motion.div>

      <div className="space-y-4">
        {MOCK_CONNECTIONS.map((connection, i) => (
          <motion.div
            key={connection.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="skeu-card rounded-3xl p-6"
          >
            <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-[auto_1fr_auto_auto] sm:items-center sm:gap-6">
              {/* Avatar and Name Section */}
              <div className="flex items-center gap-3 sm:contents">
                <Avatar className="h-12 w-12 flex-shrink-0">
                  <AvatarImage src={connection.avatar} />
                  <AvatarFallback className="text-lg font-bold text-slate-800">{connection.name[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1 sm:flex-none">
                  <div className="text-lg leading-tight font-bold text-slate-800">{connection.name}</div>
                  <div className="text-sm text-slate-600">Last seen {connection.lastSeen}</div>
                </div>
              </div>

              {/* Stats Section - Hidden on mobile in favor of inline layout */}
              <div className="hidden text-center sm:block">
                <div className="text-lg font-bold text-green-600">{connection.bubblesReceived}</div>
                <div className="mb-1 text-xs text-green-600">received</div>
                <div className="text-sm text-slate-500">{connection.bubblesSent} sent</div>
              </div>

              {/* Mobile Stats and Action Section */}
              <div className="flex items-center justify-between sm:hidden">
                <div className="flex items-center gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-green-600">{connection.bubblesReceived}</div>
                    <div className="text-xs text-green-600">received</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-slate-600">{connection.bubblesSent}</div>
                    <div className="text-xs text-slate-500">sent</div>
                  </div>
                </div>

                <Button
                  className="skeu-button group relative gap-2 rounded-2xl"
                  onClick={() => {
                    setSelectedConnection(connection);
                    setIsSendSheetOpen(true);
                  }}
                >
                  <Gift className="h-4 w-4" />
                  Send Bubble
                  <div className="absolute inset-0 -translate-x-full rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </Button>
              </div>

              {/* Desktop Action Button */}
              <Button
                className="skeu-button group relative hidden gap-2 rounded-2xl sm:flex"
                onClick={() => {
                  setSelectedConnection(connection);
                  setIsSendSheetOpen(true);
                }}
              >
                <Gift className="h-4 w-4" />
                Send Bubble
                <div className="absolute inset-0 -translate-x-full rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* NFC Scan Result Sheet */}
      <Sheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      >
        <SheetContent
          side="bottom"
          className="max-h-[80vh]"
        >
          <SheetHeader>
            <SheetTitle>New Connection Found!</SheetTitle>
            <SheetDescription>Would you like to add this person to your connections?</SheetDescription>
          </SheetHeader>

          {scannedUser && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 pt-2"
            >
              {/* User Profile Preview */}
              <div className="skeu-card mb-6 rounded-3xl p-6">
                <div className="flex items-center gap-4">
                  <div className="skeu-card flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100 text-3xl">
                    {scannedUser.avatar}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-800">{scannedUser.ensName}</h3>
                    <p className="font-mono text-sm text-slate-600">
                      {scannedUser.address.slice(0, 6)}...{scannedUser.address.slice(-4)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 rounded-2xl border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                  onClick={() => setIsSheetOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="skeu-button group relative flex-1 rounded-2xl"
                  onClick={handleAddConnection}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Connection
                  <div className="absolute inset-0 -translate-x-full rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </Button>
              </div>
            </motion.div>
          )}
        </SheetContent>
      </Sheet>

      {/* Send Bubble Sheet */}
      <SendBubbleSheet
        open={isSendSheetOpen}
        onOpenChange={setIsSendSheetOpen}
        connection={selectedConnection}
      />
    </motion.div>
  );
}

function SettingsTab() {
  const { address } = useAccount();

  // Get ENS name from address
  const { data: ensName } = useEnsName({
    address,
  });

  // Get ENS profile data using the simplified hook
  const { profileData: ensProfile, isLoading: isProfileLoading } = useBubblesProfile(ensName || "");

  // Parse preferred payment from ENS data
  const paymentConfig = ensProfile?.preferredPayment ? parsePreferredPayment(ensProfile.preferredPayment) : null;

  // Get display data
  const displayName = ensName?.replace(".eth", "") || address?.slice(0, 6) || "User";
  const ensHandle = ensName || `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  const avatar = ensProfile?.avatar || "/placeholder-avatar.jpg";
  const preferredSymbol = paymentConfig?.symbol || "USDC";
  const chainName = paymentConfig?.chainName || "Base";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 p-6"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl font-bold text-slate-800"
        style={{
          textShadow: "0 2px 4px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
        }}
      >
        Settings
      </motion.h1>

      {/* Payout Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="skeu-card rounded-3xl p-6"
      >
        <h2 className="mb-6 text-xl font-bold text-slate-800">Payout Preferences</h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-bold text-slate-800">Preferred Token</label>
            <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="h-8 w-8 rounded-full bg-blue-500"></div>
              <div className="flex-1">
                <div className="font-bold text-slate-800">{preferredSymbol}</div>
                <div className="text-sm text-slate-600">
                  {preferredSymbol} on {chainName}
                </div>
              </div>
              <Badge
                variant="secondary"
                className="text-xs text-slate-500"
              >
                Configured via ENS
              </Badge>
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-slate-800">Wallet Address</label>
            <div className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <code className="text-sm text-slate-600">
                {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Not connected"}
              </code>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Profile Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="skeu-card rounded-3xl p-6"
      >
        <h2 className="mb-6 text-xl font-bold text-slate-800">Profile</h2>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={avatar} />
              <AvatarFallback>{displayName[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-bold text-slate-800">{displayName}</div>
              <div className="text-sm text-slate-600">{ensHandle}</div>
              {ensProfile?.description && <div className="mt-1 text-xs text-slate-500">{ensProfile.description}</div>}
            </div>
            <Badge
              variant="secondary"
              className="text-xs text-slate-500"
            >
              ENS Profile
            </Badge>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
