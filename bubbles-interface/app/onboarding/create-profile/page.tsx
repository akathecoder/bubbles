"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shuffle } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const avatarOptions = ["👼", "👨‍💻", "👩‍⚖️", "🦹‍♀️", "🤖", "🧸"];

const ensHandleSuggestions = [
  "bubble-friend",
  "kind-soul",
  "joy-spreader",
  "compliment-giver",
  "happy-vibes",
  "good-energy",
];

const paymentOptions = [
  {
    id: "usdc-base",
    token: "USDC",
    chain: "Base",
    icon: "🔵",
    description: "USD Coin on Base",
  },
  {
    id: "usdt-arbitrum",
    token: "USDT",
    chain: "Arbitrum",
    icon: "🔺",
    description: "Tether USD on Arbitrum",
  },
  {
    id: "pyusd-arbitrum",
    token: "PYUSD",
    chain: "Arbitrum",
    icon: "🔺",
    description: "PayPal USD on Arbitrum",
  },
];

export default function CreateProfilePage() {
  const router = useRouter();
  const [ensHandle, setEnsHandle] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0]);
  const [isGeneratingHandle, setIsGeneratingHandle] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(paymentOptions[0]);

  const generateRandomHandle = async () => {
    setIsGeneratingHandle(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const randomHandle = ensHandleSuggestions[Math.floor(Math.random() * ensHandleSuggestions.length)];
    const randomNumber = Math.floor(Math.random() * 999) + 1;
    setEnsHandle(`${randomHandle}-${randomNumber}`);
    setIsGeneratingHandle(false);
  };

  const handleContinue = () => {
    router.push("/onboarding/nfc");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-6 py-12"
    >
      {/* Premium background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />
      <div className="texture-noise absolute top-0 left-0 h-full w-full" />

      {/* Main content */}
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
          delay: 0.2,
        }}
        className="relative z-10 w-full max-w-md text-center"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-12"
        >
          <h1
            className="font-borel mb-4 text-4xl font-bold tracking-tight text-slate-800"
            style={{
              textShadow: "0 2px 4px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
            }}
          >
            Create Your Profile
          </h1>
          <p className="text-lg font-medium text-slate-600">Let's make you recognizable in the Bubble universe</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="skeu-card space-y-8 rounded-3xl p-8"
        >
          {/* Avatar Selection */}
          <div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {avatarOptions.map((avatar, i) => (
                <motion.button
                  key={i}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`relative h-12 w-12 overflow-hidden rounded-full text-3xl transition-all duration-200 ${
                    selectedAvatar === avatar
                      ? "scale-125 ring-4 ring-blue-500 ring-offset-2 ring-offset-white"
                      : "opacity-60 hover:scale-110 hover:opacity-100"
                  }`}
                >
                  {avatar}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Username */}
          <div>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Input
                  placeholder="your-handle"
                  value={ensHandle}
                  onChange={(e) => setEnsHandle(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                  className="h-12 rounded-xl border-slate-200 pr-12 text-base"
                />
                <span className="absolute top-1/2 right-3 -translate-y-1/2 text-sm font-medium text-slate-500">
                  .pay-bubbles.eth
                </span>
              </div>
              <Button
                onClick={generateRandomHandle}
                disabled={isGeneratingHandle}
                variant="outline"
                size="icon"
                className="h-12 w-12 shrink-0 rounded-xl border-slate-200 hover:bg-slate-50"
              >
                {isGeneratingHandle ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
                ) : (
                  <Shuffle className="h-4 w-4 text-slate-600" />
                )}
              </Button>
            </div>
          </div>

          {/* Payment Preferences */}
          <div>
            <h3 className="text-lg font-bold text-slate-800">Payment Preferences</h3>
            <p className="mb-6 text-sm text-slate-500">Choose how you'd like to receive Bubble payments</p>
            <Select
              value={selectedPayment.id}
              onValueChange={(value) => {
                const option = paymentOptions.find((opt) => opt.id === value)!;
                setSelectedPayment(option);
              }}
            >
              <SelectTrigger className="h-12 w-full rounded-xl border-slate-200">
                <SelectValue>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{selectedPayment.icon}</span>
                    <span className="font-medium">
                      {selectedPayment.token} on {selectedPayment.chain}
                    </span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {paymentOptions.map((option) => (
                  <SelectItem
                    key={option.id}
                    value={option.id}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{option.icon}</span>
                      <span className="font-medium">
                        {option.token} on {option.chain}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <Button
            onClick={handleContinue}
            size="lg"
            className="skeu-button font-borel h-16 w-full rounded-3xl"
            disabled={!ensHandle.trim()}
          >
            <span className="-mb-4 align-text-bottom text-xl leading-0">Continue ✨</span>
            {/* Button shimmer effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Button>
        </motion.div>

        {/* Progress dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-12 flex justify-center"
        >
          <div className="flex gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  i <= 1 ? "bg-blue-500" : "bg-slate-300"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
