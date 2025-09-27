"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TextAnimate } from "@/components/ui/text-animate";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useRouter } from "next/navigation";
import { Zap, ArrowRight, CheckCircle, Wifi, Smartphone } from "lucide-react";

export default function NFCPage() {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [step, setStep] = useState(1); // 1: tutorial, 2: scanning, 3: connected

  const handleStartScanning = () => {
    setStep(2);
    setIsScanning(true);

    // Simulate NFC connection process
    setTimeout(() => {
      setIsScanning(false);
      setIsConnected(true);
      setStep(3);
    }, 3000);
  };

  const handleSkip = () => {
    router.push('/');
  };

  const handleDone = () => {
    router.push('/');
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
            <Button variant="ghost" onClick={handleSkip} className="text-sm">
              Skip for now
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 px-6 pb-6">
          {step === 1 && (
            <div className="h-full flex flex-col justify-between min-h-[80vh]">
              {/* Tutorial Content */}
              <div className="flex-1 flex flex-col justify-center text-center space-y-8 pt-8">
                <div className="space-y-6">
                  <TextAnimate
                    animation="scaleUp"
                    className="text-6xl"
                    startOnView={false}
                  >
                    📱
                  </TextAnimate>

                  <div className="space-y-4">
                    <TextAnimate
                      animation="blurInUp"
                      className="text-2xl font-bold text-primary"
                      delay={0.3}
                    >
                      Connect your NFC wristband
                    </TextAnimate>

                    <TextAnimate
                      animation="slideUp"
                      delay={0.6}
                      className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed"
                    >
                      Link your arx.org wristband to make instant connections IRL ✨
                    </TextAnimate>
                  </div>
                </div>

                {/* Instructions */}
                <div className="space-y-4">
                  <TextAnimate
                    animation="fadeIn"
                    className="text-sm font-medium text-primary"
                    delay={0.9}
                  >
                    Here's what you'll need:
                  </TextAnimate>

                  <div className="space-y-3">
                    <div className="flex items-center justify-start space-x-4 p-4 rounded-3xl glass-card">
                      <div className="text-3xl">📱</div>
                      <div className="text-left flex-1">
                        <TextAnimate animation="slideLeft" delay={1.2} className="font-semibold text-primary text-base">
                          NFC-enabled phone
                        </TextAnimate>
                        <TextAnimate animation="slideLeft" delay={1.3} className="text-sm text-muted-foreground">
                          Make sure NFC is turned on
                        </TextAnimate>
                      </div>
                      <Smartphone className="w-5 h-5 text-primary" />
                    </div>

                    <div className="flex items-center justify-start space-x-4 p-4 rounded-3xl glass-card">
                      <div className="text-3xl">⌚</div>
                      <div className="text-left flex-1">
                        <TextAnimate animation="slideLeft" delay={1.4} className="font-semibold text-primary text-base">
                          arx.org wristband
                        </TextAnimate>
                        <TextAnimate animation="slideLeft" delay={1.5} className="text-sm text-muted-foreground">
                          Your smart wristband device
                        </TextAnimate>
                      </div>
                      <Wifi className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pb-8 space-y-4">
                <RainbowButton onClick={handleStartScanning} size="lg" className="w-full h-14 text-lg font-semibold rounded-2xl">
                  <Zap className="w-5 h-5 mr-2" />
                  Start Connection
                  <ArrowRight className="w-5 h-5 ml-2" />
                </RainbowButton>

                <TextAnimate
                  animation="fadeIn"
                  delay={1.8}
                  className="text-xs text-muted-foreground text-center"
                >
                  This is optional - you can always connect later in settings
                </TextAnimate>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="h-full flex flex-col justify-center items-center space-y-8 min-h-[80vh]">
              {/* Scanning Animation */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-primary/20 flex items-center justify-center">
                  <div className="text-4xl animate-pulse">📱</div>
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-primary animate-ping opacity-20"></div>
                <div className="absolute inset-2 rounded-full border-4 border-accent animate-ping opacity-30 animation-delay-200"></div>
              </div>

              <div className="text-center space-y-4">
                <TextAnimate
                  animation="blurInUp"
                  className="text-2xl font-bold text-primary"
                >
                  Looking for your wristband...
                </TextAnimate>

                <TextAnimate
                  animation="slideUp"
                  delay={0.3}
                  className="text-base text-muted-foreground max-w-sm mx-auto"
                >
                  Hold your wristband close to the back of your phone
                </TextAnimate>
              </div>

              {/* Progress indicator */}
              <div className="w-full max-w-xs">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full animate-pulse w-3/4"></div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="h-full flex flex-col justify-between min-h-[80vh]">
              {/* Success Content */}
              <div className="flex-1 flex flex-col justify-center text-center space-y-8 pt-8">
                <div className="space-y-6">
                  <TextAnimate
                    animation="scaleUp"
                    className="text-6xl"
                    startOnView={false}
                  >
                    ✅
                  </TextAnimate>

                  <div className="space-y-4">
                    <TextAnimate
                      animation="blurInUp"
                      className="text-2xl font-bold text-primary"
                      delay={0.3}
                    >
                      Wristband connected!
                    </TextAnimate>

                    <TextAnimate
                      animation="slideUp"
                      delay={0.6}
                      className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed"
                    >
                      You're all set to make instant connections by tapping wristbands 🎉
                    </TextAnimate>
                  </div>
                </div>

                {/* Success Card */}
                <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 backdrop-blur-sm mx-4">
                  <CardHeader className="text-center pb-3">
                    <div className="text-3xl mb-2">🔗</div>
                    <CardTitle className="text-lg">Ready to Connect</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      Now when you meet someone with a Bubbles wristband, just tap them together to instantly connect!
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>

              {/* Bottom Actions */}
              <div className="pb-8 space-y-4">
                <RainbowButton onClick={handleDone} size="lg" className="w-full h-14 text-lg font-semibold rounded-2xl">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Start Using Bubbles
                  <ArrowRight className="w-5 h-5 ml-2" />
                </RainbowButton>

                <TextAnimate
                  animation="fadeIn"
                  delay={1}
                  className="text-xs text-muted-foreground text-center"
                >
                  Your wristband is now linked to your profile 🎯
                </TextAnimate>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Enhanced Floating Bubbles Component
function FloatingBubbles() {
  const bubbles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 40 + 20,
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
          className={`absolute rounded-full ${bubble.gradient} material-bubble animate-float animate-bubble-wobble opacity-20`}
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.left}%`,
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${bubble.duration}s`,
            bottom: '-60px',
          }}
        />
      ))}
    </div>
  );
}