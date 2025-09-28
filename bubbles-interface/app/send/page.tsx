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

export default function HomePage() {
  const [ensName, setEnsName] = useState("");
  const [amount, setAmount] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = () => {
    setIsSending(true);
    // Simulate send action
    setTimeout(() => {
      toast.success(`Sent ${amount} bubbles to ${ensName}.eth!`);
      setIsSending(false);
      setEnsName("");
      setAmount("");
    }, 1200);
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="texture-noise absolute top-0 left-0 h-full w-full" />
      <div className="fixed inset-0 z-10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="skeu-card mx-auto flex w-full max-w-md flex-col justify-center rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-xl backdrop-blur-lg"
          style={{
            boxSizing: "border-box",
            minHeight: "340px",
            maxHeight: "90vh",
            margin: "auto",
          }}
        >
          <div className="mb-8 flex items-center gap-3">
            <Bubble
              type={BUBBLE_TYPES[0]}
              size="lg"
              variant="default"
            />
            <h1 className="text-2xl font-bold text-slate-800">Send Bubbles</h1>
          </div>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">ENS Name</label>
              <input
                type="text"
                placeholder="e.g. vitalik.eth"
                value={ensName}
                onChange={(e) => setEnsName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 transition focus:ring-2 focus:ring-blue-200 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">Amount</label>
              <input
                type="number"
                min="1"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 transition focus:ring-2 focus:ring-blue-200 focus:outline-none"
              />
            </div>
            <Button
              className="skeu-button group relative h-14 w-full gap-2 rounded-2xl bg-blue-900 text-lg font-semibold text-white hover:bg-blue-950"
              onClick={handleSend}
              disabled={!ensName || !amount || isSending}
            >
              <Gift className="h-5 w-5" />
              {isSending ? "Sending..." : "Send"}
              <div className="absolute inset-0 -translate-x-full rounded-2xl bg-gradient-to-r from-transparent via-blue-100/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
