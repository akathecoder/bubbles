"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Heart, Sparkles, Zap, Users, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { NFCAnimation } from "@/components/ui/nfc-animation";
import { Bubble, BubbleListItem, FloatingBubble } from "@/components/ui/bubble";
import { BUBBLE_TYPES } from "@/lib/bubbles";
import { avatarOptions } from "../create-profile/page";

interface HomeTutorialProps {
  userData: any;
}

const mockConnections = [
  { name: "Alex Chen", avatar: avatarOptions[0], lastSeen: "2 min ago", bubbles: 12 },
  { name: "Sarah Kim", avatar: avatarOptions[1], lastSeen: "5 min ago", bubbles: 8 },
  { name: "Mike Johnson", avatar: avatarOptions[2], lastSeen: "1 hour ago", bubbles: 15 },
];

const tutorialSteps = [
  {
    title: "Welcome to Bubbles!",
    description: "Your home for meaningful connections and compliments",
    component: "welcome",
  },
  {
    title: "Tap to Connect",
    description: "Scan someone's NFC wristband to add them to your circle",
    component: "nfc-demo",
  },
  {
    title: "Send Bubble Compliments",
    description: "Choose from beautiful badges that carry real value",
    component: "bubble-types",
  },
  {
    title: "Your Circle",
    description: "See recent connections and send them Bubbles anytime",
    component: "connections",
  },
];

export default function HomeTutorial() {
  const router = useRouter();
  const [tutorialStep, setTutorialStep] = useState(0);
  const [showCompleteScreen, setShowCompleteScreen] = useState(false);

  const nextStep = () => {
    if (tutorialStep < tutorialSteps.length - 1) {
      setTutorialStep(tutorialStep + 1);
    } else {
      setShowCompleteScreen(true);
    }
  };

  const skipTutorial = () => {
    setShowCompleteScreen(true);
  };

  const handleFinish = () => {
    // Navigate to main app or home page
    router.push("/home");
  };

  if (showCompleteScreen) {
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
          {/* Success Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-12"
          >
            <div className="skeu-card mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-blue-100 text-6xl">
              ✨
            </div>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-12"
          >
            <h1
              className="font-borel mb-4 text-4xl font-bold tracking-tight text-slate-800"
              style={{
                textShadow: "0 2px 4px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
              }}
            >
              You're All Set!
            </h1>
            <p className="text-lg font-medium text-slate-600">
              Welcome to Bubbles! Start spreading joy and meaningful connections.
            </p>
          </motion.div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              onClick={handleFinish}
              size="lg"
              className="skeu-button font-borel h-16 w-full rounded-3xl"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              <span className="-mb-2 align-text-bottom text-xl leading-0">Start Using Bubbles ✨</span>
              <ArrowRight className="ml-2 h-5 w-5" />
              {/* Button shimmer effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Button>
          </motion.div>

          {/* Progress dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex justify-center"
          >
            <div className="flex gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-2 w-2 rounded-full bg-blue-500"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  const currentStep = tutorialSteps[tutorialStep];

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

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8 flex items-center justify-between"
        >
          <h1
            className="font-borel text-2xl font-bold tracking-tight text-slate-800"
            style={{
              textShadow: "0 2px 4px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
            }}
          >
            Tutorial
          </h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={skipTutorial}
            className="text-slate-600 hover:text-slate-800"
          >
            Skip
          </Button>
        </motion.div>

        {/* Tutorial Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="skeu-card mb-6 rounded-3xl p-8"
        >
          <div className="mb-6 flex items-center justify-between">
            <div className="flex gap-2">
              {tutorialSteps.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    i <= tutorialStep ? "bg-blue-500" : "bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <h3 className="mb-3 text-xl font-bold text-slate-800">{currentStep.title}</h3>
          <p className="mb-6 leading-relaxed text-slate-600">{currentStep.description}</p>

          <AnimatePresence mode="wait">
            {currentStep.component === "welcome" && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="py-8 text-center"
              >
                <Bubble
                  type={BUBBLE_TYPES[3]}
                  size="xl"
                  variant="premium"
                  animate
                  className="mx-auto mb-4"
                />
                <p className="leading-relaxed text-slate-600">
                  Bubbles is where compliments meet real value. Connect with people IRL and send meaningful appreciation
                  that matters.
                </p>
              </motion.div>
            )}

            {currentStep.component === "nfc-demo" && (
              <motion.div
                key="nfc-demo"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="py-8 text-center"
              >
                <div className="relative mb-6">
                  <NFCAnimation />
                </div>
              </motion.div>
            )}

            {currentStep.component === "bubble-types" && (
              <motion.div
                key="bubble-types"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative space-y-3"
              >
                {/* Background floating bubbles for atmosphere */}
                <FloatingBubble
                  type={BUBBLE_TYPES[0]}
                  size="sm"
                  delay={0.5}
                  duration={6}
                  className="absolute -top-4 -right-4 z-0 opacity-30"
                />
                <FloatingBubble
                  type={BUBBLE_TYPES[2]}
                  size="sm"
                  delay={1.5}
                  duration={5}
                  className="absolute -bottom-2 -left-2 z-0 opacity-30"
                />

                {/* Bubble list items */}
                <div className="relative z-10">
                  {BUBBLE_TYPES.map((bubble, i) => (
                    <motion.div
                      key={bubble.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="mb-3"
                    >
                      <BubbleListItem
                        type={bubble}
                        selected={false}
                        className="border-slate-200 bg-slate-50 transition-all duration-200 hover:scale-[1.02] hover:bg-slate-100"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Showcase animation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="mt-6 text-center"
                >
                  <div className="mb-2 flex justify-center gap-3">
                    {BUBBLE_TYPES.slice(0, 4).map((bubble, i) => (
                      <motion.div
                        key={bubble.name}
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeInOut",
                        }}
                      >
                        <Bubble
                          type={bubble}
                          size="md"
                          variant="premium"
                          animate
                        />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-xs font-medium text-slate-500">Each bubble carries real value ✨</p>
                </motion.div>
              </motion.div>
            )}

            {currentStep.component === "connections" && (
              <motion.div
                key="connections"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-3"
              >
                {mockConnections.map((connection, i) => (
                  <motion.div
                    key={connection.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <span className="text-xl">{connection.avatar}</span>
                    <div className="flex-1">
                      <div className="font-bold text-slate-800">{connection.name}</div>
                      <div className="text-sm text-slate-600">{connection.lastSeen}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-slate-800">{connection.bubbles} bubbles</div>
                      <div className="text-xs text-slate-600">sent</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            onClick={nextStep}
            size="lg"
            className="skeu-button font-borel mt-6 h-16 w-full rounded-3xl"
          >
            {tutorialStep < tutorialSteps.length - 1 ? (
              <>
                <span className="-mb-2 align-text-bottom text-xl leading-0">Next</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                <span className="-mb-2 align-text-bottom text-xl leading-0">Get Started ✨</span>
              </>
            )}
            {/* Button shimmer effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
