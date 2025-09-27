"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Camera, Sparkles, Shuffle } from "lucide-react";
import { HeroBubbles } from "../../../components/hero-bubbles";
import { useRouter } from "next/navigation";

const avatarOptions = ["👼", "👨‍💻", "👩‍⚖️", "🦹‍♀️", "🤖", "🧸"];

const ensHandleSuggestions = [
  "bubble-friend",
  "kind-soul",
  "joy-spreader",
  "compliment-giver",
  "happy-vibes",
  "good-energy",
];

export default function CreateProfilePage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [ensHandle, setEnsHandle] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0]);
  const [isGeneratingHandle, setIsGeneratingHandle] = useState(false);

  const generateRandomHandle = async () => {
    setIsGeneratingHandle(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const randomHandle = ensHandleSuggestions[Math.floor(Math.random() * ensHandleSuggestions.length)];
    const randomNumber = Math.floor(Math.random() * 999) + 1;
    setEnsHandle(`${randomHandle}-${randomNumber}`);
    setIsGeneratingHandle(false);
  };

  const handleContinue = () => {
    // Store user data (would integrate with actual user state management)
    console.log({
      displayName,
      ensHandle: ensHandle || `user-${Math.floor(Math.random() * 9999)}`,
      avatar: selectedAvatar,
    });
    router.push('/onboarding/nfc');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-6"
    >
      {/* Premium background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />
      <div className="texture-noise absolute top-0 left-0 h-full w-full" />

      {/* Progress indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="absolute top-8 right-8 z-10 text-sm text-slate-600 font-medium"
      >
        Step 2 of 4
      </motion.div>

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
          <h1 className="font-borel text-4xl font-bold tracking-tight text-slate-800 mb-4"
              style={{
                textShadow: "0 2px 4px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
              }}>
            Create Your Profile
          </h1>
          <p className="text-lg text-slate-600 font-medium">
            Let's make you recognizable in the Bubble universe
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Avatar Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="skeu-card p-8 rounded-3xl"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-6">Pick your avatar</h3>
            <div className="flex items-center justify-center gap-3">
              {avatarOptions.map((avatar, i) => (
                <motion.button
                  key={i}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`relative h-12 w-12 overflow-hidden rounded-full text-3xl transition-all duration-200 ${
                    selectedAvatar === avatar
                      ? "ring-blue-500 scale-125 ring-4 ring-offset-2 ring-offset-white"
                      : "opacity-60 hover:scale-110 hover:opacity-100"
                  }`}
                >
                  {avatar}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Display Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="skeu-card p-8 rounded-3xl"
          >
            <label className="block text-lg font-bold text-slate-800 mb-4">Display name (optional)</label>
            <Input
              placeholder="How should people see you?"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="h-12 rounded-xl border-slate-200 text-base"
            />
          </motion.div>

          {/* Username */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="skeu-card p-8 rounded-3xl"
          >
            <label className="block text-lg font-bold text-slate-800 mb-4">yo(U)sername</label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Input
                  placeholder="your-handle"
                  value={ensHandle}
                  onChange={(e) => setEnsHandle(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                  className="h-12 rounded-xl border-slate-200 pr-12 text-base"
                />
                <span className="absolute top-1/2 right-3 -translate-y-1/2 text-sm text-slate-500 font-medium">.eth</span>
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
            <p className="mt-3 text-sm text-slate-500">This will be your unique Bubbles identifier</p>
          </motion.div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Button
              onClick={handleContinue}
              size="lg"
              className="skeu-button font-borel h-16 w-full rounded-3xl"
              disabled={!ensHandle.trim()}
            >
              <span className="-mb-2 align-text-bottom text-xl leading-0">Continue ✨</span>
              {/* Button shimmer effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Button>
          </motion.div>
        </div>

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
