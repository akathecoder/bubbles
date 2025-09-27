"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Camera, Sparkles, Shuffle } from "lucide-react";
import { HeroBubbles } from "../../../components/hero-bubbles";

interface ProfileCreationProps {
  onNext: () => void;
  userData: any;
  onUpdateUser: (data: any) => void;
}

const avatarOptions = ["👼", "👨‍💻", "👩‍⚖️", "🦹‍♀️", "🤖", "🧸"];

const ensHandleSuggestions = [
  "bubble-friend",
  "kind-soul",
  "joy-spreader",
  "compliment-giver",
  "happy-vibes",
  "good-energy",
];

function ProfileCreation({ onNext, userData, onUpdateUser }: ProfileCreationProps) {
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
    onUpdateUser({
      displayName,
      ensHandle: ensHandle || `user-${Math.floor(Math.random() * 9999)}`,
      avatar: selectedAvatar,
    });
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex min-h-screen flex-col items-center justify-center p-6"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-8 text-center"
      >
        <h2 className="mb-2 text-2xl font-bold">Create Your Profile</h2>
      </motion.div>

      <div className="space-y-16">
        {/* Avatar Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-center gap-4">
            {avatarOptions.map((avatar, i) => (
              <motion.button
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                onClick={() => setSelectedAvatar(avatar)}
                className={`relative h-8 w-8 overflow-hidden rounded-full text-3xl transition-all duration-200 ${
                  selectedAvatar === avatar
                    ? "ring-primary mx-4 scale-150 ring-2 ring-offset-2"
                    : "opacity-70 hover:scale-105 hover:opacity-100"
                }`}
              >
                {avatar}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Yousername */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label className="mb-2 block text-sm font-medium">yo(U)sername</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                placeholder="your-handle"
                value={ensHandle}
                onChange={(e) => setEnsHandle(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                className="rounded-xl pr-12"
              />
              <span className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 text-sm">.eth</span>
            </div>
            <Button
              onClick={generateRandomHandle}
              disabled={isGeneratingHandle}
              variant="outline"
              size="icon"
              className="shrink-0 rounded-xl bg-transparent"
            >
              {isGeneratingHandle ? (
                <div className="border-primary/30 border-t-primary h-4 w-4 animate-spin rounded-full border-2" />
              ) : (
                <Shuffle className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-muted-foreground mt-1 text-xs">This will be your unique Bubbles identifier</p>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            onClick={handleContinue}
            size="lg"
            className="skeu-button font-borel h-12 w-full rounded-3xl"
          >
            <span className="-mb-2 align-text-bottom text-base leading-0">Continue</span>
            {/* Button shimmer effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Button>
        </motion.div>
      </div>

      {/* Progress indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-8 flex justify-center"
      >
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${i <= 1 ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProfileCreation;
