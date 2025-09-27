"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TextAnimate } from "@/components/ui/text-animate";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Confetti } from "@/components/ui/confetti";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Zap } from "lucide-react";

export default function CompletePage() {
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Trigger confetti after component mounts
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleGoHome = () => {
    router.push('/');
  };

  const handleConnectNFC = () => {
    router.push('/onboarding/nfc');
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
              Step 4 of 4
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 shadow-lg"
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 px-6 pb-6">
          <div className="h-full flex flex-col justify-between min-h-[80vh] relative">
            {/* Confetti */}
            {showConfetti && (
              <Confetti
                options={{
                  particleCount: 100,
                  spread: 70,
                  origin: { y: 0.6 },
                  colors: ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'],
                }}
                className="absolute inset-0 pointer-events-none"
              />
            )}

            {/* Celebration Content */}
            <div className="flex-1 flex flex-col justify-center text-center space-y-8 pt-8">
              <div className="space-y-6">
                <TextAnimate
                  animation="scaleUp"
                  className="text-8xl"
                  startOnView={false}
                >
                  🎉
                </TextAnimate>

                <div className="space-y-4">
                  <TextAnimate
                    animation="blurInUp"
                    className="text-3xl font-bold text-primary"
                    delay={0.3}
                  >
                    You're all set!
                  </TextAnimate>

                  <TextAnimate
                    animation="slideUp"
                    delay={0.6}
                    className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed"
                  >
                    Welcome to the Bubbles community! Ready to spread some joy? ✨
                  </TextAnimate>
                </div>
              </div>

              {/* Achievement Badge */}
              <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl border border-primary/20 backdrop-blur-sm p-6 mx-4">
                <TextAnimate animation="scaleUp" delay={0.9} className="text-4xl mb-3">
                  🏆
                </TextAnimate>
                <TextAnimate animation="blurInUp" delay={1.1} className="text-lg font-semibold text-primary mb-2">
                  Bubble Creator Unlocked!
                </TextAnimate>
                <TextAnimate animation="slideUp" delay={1.3} className="text-sm text-muted-foreground">
                  You can now send and receive compliments with real value
                </TextAnimate>
              </div>

              {/* Pro Tip */}
              <div className="mx-4 p-6 bg-card/50 backdrop-blur-sm rounded-3xl border border-accent/20">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">💡</div>
                  <div className="text-left flex-1">
                    <TextAnimate animation="slideLeft" delay={1.5} className="font-semibold text-primary text-base mb-2">
                      Pro Tip
                    </TextAnimate>
                    <TextAnimate animation="slideLeft" delay={1.7} className="text-sm text-muted-foreground leading-relaxed">
                      Scan someone's NFC wristband to instantly add them to your circle and start sending magical compliments! 🪄
                    </TextAnimate>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pb-8 px-4 space-y-4">
              <RainbowButton onClick={handleGoHome} size="lg" className="w-full h-14 text-lg font-semibold rounded-2xl">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Spreading Joy
                <ArrowRight className="w-5 h-5 ml-2" />
              </RainbowButton>

              <Button
                onClick={handleConnectNFC}
                variant="outline"
                size="lg"
                className="w-full h-12 text-base rounded-2xl border-2 border-primary/20 hover:bg-primary/5"
              >
                <Zap className="w-4 h-4 mr-2" />
                Connect NFC Wristband
              </Button>

              <TextAnimate
                animation="fadeIn"
                delay={2}
                className="text-xs text-muted-foreground text-center"
              >
                You can connect your NFC wristband anytime in settings 🔧
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