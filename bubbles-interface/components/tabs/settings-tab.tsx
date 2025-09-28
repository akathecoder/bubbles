"use client";

import { motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAccount } from "wagmi";
import { useEnsUser } from "@/lib/hooks/useEnsUser";
import { parsePreferredPayment } from "@/lib/utils/payment";

export function SettingsTab() {
  const { address } = useAccount();

  // Get current user's ENS data
  const currentUser = useEnsUser(address);

  // Parse preferred payment from ENS data
  const paymentConfig = currentUser.preferredPayment ? parsePreferredPayment(currentUser.preferredPayment) : null;

  // Get display data from current user
  const displayName = currentUser.displayName;
  const ensHandle = currentUser.ensName || `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  const avatar = currentUser.avatar;
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
    </motion.div>
  );
}
