"use client";

import { useState, useEffect } from "react";
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { TextAnimate } from "@/components/ui/text-animate";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useRouter } from "next/navigation";
import { Users, ArrowRight } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const { user, primaryWallet } = useDynamicContext();
  const isAuthenticated = !!user;

  // Auto-redirect when authentication succeeds
  useEffect(() => {
    if (isAuthenticated) {
      // Small delay to show success state
      const timer = setTimeout(() => {
        router.push('/onboarding/profile');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, router]);

  const handleNext = () => {
    router.push('/onboarding/profile');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Floating Bubbles Background */}
      <FloatingBubbles />

      {/* Mobile-First Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="pt-8 pb-4 px-6">
          <div className="flex items-center justify-between">
            <div className="text-3xl animate-gentle-bounce">🫧</div>
            <div className="text-sm text-muted-foreground font-medium">
              Step 2 of 4
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 shadow-lg"
                style={{ width: '50%' }}
              />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 px-6 pb-6">
          <div className="h-full flex flex-col justify-between min-h-[80vh] space-y-8">
            {/* Header */}
            <div className="text-center space-y-6 pt-8">
              <div className="text-5xl mb-4">🔐</div>

              <div className="space-y-3">
                <TextAnimate
                  animation="blurInUp"
                  className="text-2xl font-bold text-primary"
                >
                  Let's get you connected
                </TextAnimate>

                <TextAnimate
                  animation="slideUp"
                  delay={0.3}
                  className="text-base text-muted-foreground max-w-sm mx-auto leading-relaxed"
                >
                  Choose your preferred way to sign in. We make crypto simple!
                </TextAnimate>
              </div>
            </div>

            {/* Auth Widget */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="glass-card rounded-3xl p-6 shadow-xl">
                <div className="min-h-[240px] flex items-center justify-center">
                  <DynamicWidget />
                </div>
              </div>

              {/* Success State */}
              {isAuthenticated && (
                <div className="mt-6 text-center p-6 glass-card rounded-3xl">
                  <TextAnimate animation="scaleUp" className="text-4xl mb-3">
                    🎉
                  </TextAnimate>
                  <TextAnimate animation="blurInUp" delay={0.2} className="text-lg font-semibold text-primary mb-2">
                    You're connected!
                  </TextAnimate>
                  <TextAnimate animation="slideUp" delay={0.4} className="text-sm text-muted-foreground">
                    Redirecting to profile setup...
                  </TextAnimate>
                </div>
              )}
            </div>

            {/* Bottom Action */}
            <div className="pb-8 space-y-4">
              {isAuthenticated ? (
                <RainbowButton onClick={handleNext} size="lg" className="w-full h-14 text-lg font-semibold rounded-2xl">
                  <Users className="w-5 h-5 mr-2" />
                  Set Up Profile
                  <ArrowRight className="w-5 h-5 ml-2" />
                </RainbowButton>
              ) : (
                <div className="text-center space-y-3">
                  <div className="p-4 bg-muted/50 rounded-2xl border border-dashed border-muted-foreground/30">
                    <TextAnimate animation="fadeIn" className="text-sm text-muted-foreground">
                      ☝️ Choose an option above to continue
                    </TextAnimate>
                  </div>
                </div>
              )}

              <TextAnimate
                animation="fadeIn"
                delay={0.5}
                className="text-xs text-muted-foreground text-center"
              >
                Your wallet stays secure. We never store your private keys 🔒
              </TextAnimate>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Floating Bubbles Component
function FloatingBubbles() {
  const bubbles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    size: Math.random() * 50 + 25,
    left: Math.random() * 100,
    delay: Math.random() * 6,
    duration: Math.random() * 4 + 5,
    gradient: [
      'bubble-gradient-pink',
      'bubble-gradient-blue',
      'bubble-gradient-purple',
      'bubble-gradient-green',
      'bubble-gradient-yellow'
    ][Math.floor(Math.random() * 5)],
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className={`absolute rounded-full ${bubble.gradient} material-bubble animate-float animate-bubble-wobble opacity-25`}
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.left}%`,
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${bubble.duration}s`,
            bottom: '-80px',
          }}
        />
      ))}
    </div>
  );
}