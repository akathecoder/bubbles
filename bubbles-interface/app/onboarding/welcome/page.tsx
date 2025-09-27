"use client";

import { useState } from "react";
import { TextAnimate } from "@/components/ui/text-animate";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight } from "lucide-react";

export default function WelcomePage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/onboarding/auth');
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
              Step 1 of 4
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 shadow-lg"
                style={{ width: '25%' }}
              />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 px-6 pb-6">
          <div className="h-full flex flex-col justify-between min-h-[80vh]">
            {/* Hero Content */}
            <div className="flex-1 flex flex-col justify-center space-y-8 text-center pt-8">
              <div className="space-y-6">
                <TextAnimate
                  animation="scaleUp"
                  className="text-7xl"
                  startOnView={false}
                >
                  🫧
                </TextAnimate>

                <div className="space-y-4">
                  <TextAnimate
                    animation="blurInUp"
                    className="text-3xl font-bold text-primary"
                    delay={0.3}
                  >
                    Welcome to Bubbles!
                  </TextAnimate>

                  <TextAnimate
                    animation="slideUp"
                    className="text-lg text-muted-foreground max-w-sm mx-auto leading-relaxed"
                    delay={0.6}
                  >
                    Send compliments that float to people you care about 💝
                  </TextAnimate>
                </div>
              </div>

              {/* Features Preview */}
              <div className="space-y-4 mt-8">
                <TextAnimate
                  animation="fadeIn"
                  className="text-sm font-medium text-primary"
                  delay={0.9}
                >
                  Here's how it works:
                </TextAnimate>

                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-4 p-4 rounded-3xl glass-card">
                    <div className="text-3xl">📱</div>
                    <div className="text-left">
                      <TextAnimate animation="slideLeft" delay={1.2} className="font-semibold text-primary text-base">
                        Tap wristband
                      </TextAnimate>
                      <TextAnimate animation="slideLeft" delay={1.3} className="text-sm text-muted-foreground">
                        Connect instantly
                      </TextAnimate>
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-4 p-4 rounded-3xl glass-card">
                    <div className="text-3xl">🫧</div>
                    <div className="text-left">
                      <TextAnimate animation="slideLeft" delay={1.4} className="font-semibold text-primary text-base">
                        Pick a Bubble
                      </TextAnimate>
                      <TextAnimate animation="slideLeft" delay={1.5} className="text-sm text-muted-foreground">
                        Choose perfect vibes
                      </TextAnimate>
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-4 p-4 rounded-3xl glass-card">
                    <div className="text-3xl">✨</div>
                    <div className="text-left">
                      <TextAnimate animation="slideLeft" delay={1.6} className="font-semibold text-primary text-base">
                        Send magic
                      </TextAnimate>
                      <TextAnimate animation="slideLeft" delay={1.7} className="text-sm text-muted-foreground">
                        We handle the tech
                      </TextAnimate>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="pb-8 pt-6 space-y-4">
              <RainbowButton onClick={handleGetStarted} size="lg" className="w-full h-14 text-lg font-semibold rounded-2xl">
                <Sparkles className="w-5 h-5 mr-2" />
                Make Someone Smile
                <ArrowRight className="w-5 h-5 ml-2" />
              </RainbowButton>

              <TextAnimate
                animation="fadeIn"
                delay={2}
                className="text-xs text-muted-foreground text-center"
              >
                Takes less than 2 minutes to set up ⚡
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