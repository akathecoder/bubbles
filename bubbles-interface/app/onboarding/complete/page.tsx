"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Heart, Sparkles, Zap, Users, Gift, ArrowRight, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface HomeTutorialProps {
  userData: any;
}

const bubbleTypes = [
  { emoji: "🌸", name: "Kind", color: "from-pink-400 to-rose-500", description: "For thoughtful gestures" },
  { emoji: "🔥", name: "Inspiring", color: "from-orange-400 to-red-500", description: "For motivational moments" },
  { emoji: "💡", name: "Insightful", color: "from-yellow-400 to-amber-500", description: "For brilliant ideas" },
  { emoji: "🎸", name: "Cool", color: "from-blue-400 to-indigo-500", description: "For awesome vibes" },
];

const mockConnections = [
  { name: "Alex Chen", avatar: "/cute-bubble-character-pink.jpg", lastSeen: "2 min ago", bubbles: 12 },
  { name: "Sarah Kim", avatar: "/friendly-bubble-character-blue.jpg", lastSeen: "5 min ago", bubbles: 8 },
  { name: "Mike Johnson", avatar: "/happy-bubble-character-green.jpg", lastSeen: "1 hour ago", bubbles: 15 },
];

export default function HomeTutorial() {
  const router = useRouter();
  const [tutorialStep, setTutorialStep] = useState(0);
  const [showCompleteScreen, setShowCompleteScreen] = useState(false);

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
    router.push("/");
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
            <div className="mx-auto h-32 w-32 rounded-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center text-6xl skeu-card">
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
          className="skeu-card rounded-3xl p-8 mb-6"
        >
          <div className="mb-6 flex items-center justify-between">
            <Badge
              variant="secondary"
              className="rounded-full bg-blue-100 text-blue-700 border-blue-200"
            >
              Step {tutorialStep + 1} of 4
            </Badge>
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
          <p className="text-slate-600 mb-6 leading-relaxed">{currentStep.description}</p>

        <AnimatePresence mode="wait">
          {currentStep.component === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-8 text-center"
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-pink-100 to-rose-100 skeu-card">
                <Heart className="h-10 w-10 text-rose-600" />
              </div>
              <p className="text-slate-600 leading-relaxed">
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
                <motion.div
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-100 to-indigo-100 skeu-card"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Smartphone className="h-10 w-10 text-blue-600" />
                </motion.div>

                {/* NFC waves animation */}
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="border-blue-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
                    style={{
                      width: `${80 + i * 20}px`,
                      height: `${80 + i * 20}px`,
                    }}
                    animate={{
                      scale: [0.8, 1.2],
                      opacity: [0.6, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed">
                When you get an NFC wristband, you'll be able to connect with a simple tap!
              </p>
            </motion.div>
          )}

          {currentStep.component === "bubble-types" && (
            <motion.div
              key="bubble-types"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-3"
            >
              {bubbleTypes.map((bubble, i) => (
                <motion.div
                  key={bubble.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-50 hover:bg-slate-100 flex items-center gap-4 rounded-2xl p-4 transition-colors border border-slate-200"
                >
                  <div
                    className={`h-12 w-12 rounded-xl bg-gradient-to-br ${bubble.color} flex items-center justify-center text-xl`}
                  >
                    {bubble.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-slate-800">{bubble.name}</div>
                    <div className="text-slate-600 text-sm">{bubble.description}</div>
                  </div>
                  <Gift className="text-slate-500 h-5 w-5" />
                </motion.div>
              ))}
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
                  className="bg-slate-50 flex items-center gap-4 rounded-2xl p-4 border border-slate-200"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={connection.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{connection.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-bold text-slate-800">{connection.name}</div>
                    <div className="text-slate-600 text-sm">{connection.lastSeen}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-slate-800">{connection.bubbles} bubbles</div>
                    <div className="text-slate-600 text-xs">sent</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

          <Button
            onClick={nextStep}
            size="lg"
            className="skeu-button font-borel h-16 w-full rounded-3xl mt-6"
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

        {/* Quick Actions Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="skeu-card rounded-3xl p-6 text-center opacity-60">
            <Users className="mx-auto mb-3 h-8 w-8 text-slate-500" />
            <p className="text-sm font-bold text-slate-700 mb-1">My Circle</p>
            <p className="text-xs text-slate-500">0 connections</p>
          </div>
          <div className="skeu-card rounded-3xl p-6 text-center opacity-60">
            <Zap className="mx-auto mb-3 h-8 w-8 text-slate-500" />
            <p className="text-sm font-bold text-slate-700 mb-1">Scan to Connect</p>
            <p className="text-xs text-slate-500">Tap wristbands</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
