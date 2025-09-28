"use client";

import { motion } from "motion/react";
import { History, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BubbleHistoryItem, ConnectionItem } from "@/components/tabs/tab-components";
import { useBalance, useAccount } from "wagmi";
import { formatUnits } from "viem";
import { base } from "viem/chains";
import { useEnsUser } from "@/lib/hooks/useEnsUser";
import { parsePreferredPayment } from "@/lib/utils/payment";
import { MOCK_BUBBLE_HISTORY, MOCK_CONNECTIONS } from "@/lib/mock-data";
import useSessionKey from "@/lib/hooks/useSessionKey";

export function HomeTab() {
  // Get current user's ENS data
  const { walletClient } = useSessionKey();

  const address = walletClient?.address;

  const currentUser = useEnsUser(address);

  // Parse preferred payment from ENS data
  const paymentConfig = currentUser.preferredPayment ? parsePreferredPayment(currentUser.preferredPayment) : null;

  // Get token balance using wagmi
  const { data: tokenBalance, isLoading: isBalanceLoading } = useBalance({
    address:,
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

  // Get display data from current user
  const displayName = currentUser.displayName;
  const ensHandle = currentUser.ensName;
  const avatar = currentUser.avatar;
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
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-200 bg-white text-2xl">
            {avatar || displayName[0]?.toUpperCase()}
          </div>
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
          {MOCK_BUBBLE_HISTORY.slice(0, 3).map((bubble, i) => {
            // Get the relevant address for this bubble
            const userAddress = bubble.status === "received" ? bubble.fromAddress : bubble.toAddress;

            return (
              <BubbleHistoryItem
                key={bubble.id}
                bubble={bubble}
                userAddress={userAddress}
                index={i}
              />
            );
          })}
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
            <ConnectionItem
              key={connection.id}
              connection={connection}
              index={i}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
