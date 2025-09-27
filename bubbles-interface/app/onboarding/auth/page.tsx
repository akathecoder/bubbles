"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail, Wallet, ArrowLeft, Sparkles } from "lucide-react";

interface AuthModalProps {
  onNext: () => void;
  onUpdateUser: (data: any) => void;
}

export function AuthModal({ onNext, onUpdateUser }: AuthModalProps) {
  const [authMethod, setAuthMethod] = useState<"email" | "wallet" | null>(null);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailAuth = async () => {
    if (!email) return;
    setIsLoading(true);

    // Simulate auth process
    await new Promise((resolve) => setTimeout(resolve, 1500));

    onUpdateUser({ email });
    setIsLoading(false);
    onNext();
  };

  const handleWalletAuth = async () => {
    setIsLoading(true);

    // Simulate wallet connection
    await new Promise((resolve) => setTimeout(resolve, 1000));

    onUpdateUser({
      email: "wallet@user.eth",
      walletConnected: true,
    });
    setIsLoading(false);
    onNext();
  };

  if (!authMethod) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="flex min-h-screen items-center justify-center p-6"
      >
        <Card className="glass-effect bubble-shadow w-full max-w-md p-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-8 text-center"
          >
            <div className="from-primary to-secondary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h2 className="mb-2 text-2xl font-bold">Welcome to Bubbles!</h2>
            <p className="text-muted-foreground">Choose how you'd like to get started</p>
          </motion.div>

          <div className="space-y-4">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                onClick={() => setAuthMethod("email")}
                variant="outline"
                size="lg"
                className="hover:bg-primary/5 hover:border-primary/30 w-full justify-start gap-4 rounded-2xl p-6 transition-all duration-300"
              >
                <div className="from-primary to-secondary flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Continue with Email</div>
                  <div className="text-muted-foreground text-sm">Quick and secure with passkey</div>
                </div>
              </Button>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                onClick={() => setAuthMethod("wallet")}
                variant="outline"
                size="lg"
                className="hover:bg-secondary/5 hover:border-secondary/30 w-full justify-start gap-4 rounded-2xl p-6 transition-all duration-300"
              >
                <div className="from-secondary to-accent flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br">
                  <Wallet className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Continue with Wallet</div>
                  <div className="text-muted-foreground text-sm">Connect your existing wallet</div>
                </div>
              </Button>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground mt-6 text-center text-xs"
          >
            By continuing, you agree to our Terms of Service and Privacy Policy
          </motion.p>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex min-h-screen items-center justify-center p-6"
    >
      <Card className="glass-effect bubble-shadow w-full max-w-md p-8">
        <div className="mb-6 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setAuthMethod(null)}
            className="mr-2 p-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">{authMethod === "email" ? "Sign in with Email" : "Connect Wallet"}</h2>
        </div>

        {authMethod === "email" ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="mb-2 block text-sm font-medium">Email Address</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl"
              />
            </div>

            <Button
              onClick={handleEmailAuth}
              disabled={!email || isLoading}
              className="from-primary to-secondary w-full rounded-xl bg-gradient-to-r transition-all duration-300 hover:shadow-lg"
              size="lg"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Creating account...
                </div>
              ) : (
                "Continue with Email"
              )}
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="py-8 text-center">
              <div className="from-secondary to-accent mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br">
                <Wallet className="h-8 w-8 text-white" />
              </div>
              <p className="text-muted-foreground">Connect your wallet to get started with Bubbles</p>
            </div>

            <Button
              onClick={handleWalletAuth}
              disabled={isLoading}
              className="from-secondary to-accent w-full rounded-xl bg-gradient-to-r transition-all duration-300 hover:shadow-lg"
              size="lg"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Connecting...
                </div>
              ) : (
                "Connect Wallet"
              )}
            </Button>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}
