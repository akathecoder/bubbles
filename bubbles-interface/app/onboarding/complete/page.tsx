"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Heart, Sparkles, Zap, Users, Gift, ArrowRight, CheckCircle } from "lucide-react";

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

  if (showCompleteScreen) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-screen items-center justify-center p-6"
      >
        <Card className="glass-effect bubble-shadow w-full max-w-lg p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="from-primary via-secondary to-accent mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br"
          >
            <CheckCircle className="h-10 w-10 text-white" />
          </motion.div>

          <h2 className="mb-4 text-2xl font-bold">You're all set!</h2>
          <p className="text-muted-foreground mb-8">
            Welcome to Bubbles, {"anon"}! Start spreading joy and meaningful connections.
          </p>

          <Button
            className="from-primary via-secondary to-accent w-full rounded-xl bg-gradient-to-r transition-all duration-300 hover:shadow-lg"
            size="lg"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Start Using Bubbles
          </Button>
        </Card>
      </motion.div>
    );
  }

  const currentStep = tutorialSteps[tutorialStep];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="from-background via-muted/30 to-secondary/20 min-h-screen bg-gradient-to-br p-6"
    >
      {/* Header */}
      <div className="mb-8 flex items-center justify-between pt-4">
        <div className="flex items-center gap-3">
          {/* <Avatar className="border-primary/20 h-10 w-10 border-2">
            <AvatarImage src={userData.avatar || "/cute-bubble-character-pink.jpg"} />
            <AvatarFallback>{userData.displayName?.[0] || "U"}</AvatarFallback>
          </Avatar> */}
          <div>
            {/* <h1 className="font-semibold">Hi, {userData.displayName}!</h1>
            <p className="text-muted-foreground text-sm">{userData.ensHandle}.eth</p> */}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={skipTutorial}
        >
          Skip
        </Button>
      </div>

      {/* Tutorial Card */}
      <Card className="glass-effect bubble-shadow mb-6 p-6">
        <div className="mb-4 flex items-center justify-between">
          <Badge
            variant="secondary"
            className="rounded-full"
          >
            Tutorial {tutorialStep + 1}/4
          </Badge>
          <div className="flex gap-1">
            {tutorialSteps.map((_, i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  i <= tutorialStep ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        <h3 className="mb-2 text-lg font-semibold">{currentStep.title}</h3>
        <p className="text-muted-foreground mb-6">{currentStep.description}</p>

        <AnimatePresence mode="wait">
          {currentStep.component === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-8 text-center"
            >
              <div className="from-primary to-secondary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <p className="text-muted-foreground">
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
                  className="from-chart-4 to-secondary mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Smartphone className="h-8 w-8 text-white" />
                </motion.div>

                {/* NFC waves animation */}
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="border-primary/30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
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
              <p className="text-muted-foreground">
                {/* {userData.nfcConnected
                  ? "Your wristband is ready! Just tap it against someone else's to connect instantly."
                  : "When you get an NFC wristband, you'll be able to connect with a simple tap!"} */}
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
                  className="bg-muted/50 hover:bg-muted/70 flex items-center gap-4 rounded-2xl p-3 transition-colors"
                >
                  <div
                    className={`h-12 w-12 rounded-xl bg-gradient-to-br ${bubble.color} flex items-center justify-center text-xl`}
                  >
                    {bubble.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{bubble.name}</div>
                    <div className="text-muted-foreground text-sm">{bubble.description}</div>
                  </div>
                  <Gift className="text-muted-foreground h-4 w-4" />
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
                  className="bg-muted/50 flex items-center gap-4 rounded-2xl p-3"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={connection.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{connection.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{connection.name}</div>
                    <div className="text-muted-foreground text-sm">{connection.lastSeen}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{connection.bubbles} bubbles</div>
                    <div className="text-muted-foreground text-xs">sent</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          onClick={nextStep}
          className="from-primary to-secondary mt-6 w-full rounded-xl bg-gradient-to-r transition-all duration-300 hover:shadow-lg"
          size="lg"
        >
          {tutorialStep < tutorialSteps.length - 1 ? (
            <>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Get Started <Sparkles className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </Card>

      {/* Quick Actions Preview */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="glass-effect bubble-shadow p-4 text-center opacity-50">
          <Users className="text-muted-foreground mx-auto mb-2 h-6 w-6" />
          <p className="text-sm font-medium">My Circle</p>
          <p className="text-muted-foreground text-xs">0 connections</p>
        </Card>
        <Card className="glass-effect bubble-shadow p-4 text-center opacity-50">
          <Zap className="text-muted-foreground mx-auto mb-2 h-6 w-6" />
          <p className="text-sm font-medium">Scan to Connect</p>
          <p className="text-muted-foreground text-xs">Tap wristbands</p>
        </Card>
      </div>
    </motion.div>
  );
}
