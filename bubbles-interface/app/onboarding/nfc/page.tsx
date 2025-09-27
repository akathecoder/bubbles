"use client";

import * as halo from "@/lib/halo";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TextAnimate } from "@/components/ui/text-animate";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useRouter } from "next/navigation";
import { Zap, ArrowRight, CheckCircle, Wifi, Smartphone } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function NFCPage() {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const {
    data: nfcData,
    isPending,
    error: nfcError,
    mutate,
  } = useMutation({
    mutationKey: ["tap nfc"],
    mutationFn: async () => {
      const nfcAddress = await halo.getKey();
      if (!nfcAddress) {
        throw new Error("Could not scan the NFC");
      }

      toast.info(nfcAddress);

      // const res = await fetch("/api/deployer", {
      //   body: JSON.stringify({
      //     chain: "4801",
      //     owner: ownerAddr,
      //     signers: [nfcAddress],
      //   }),
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      // const data = await res.json();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      // return data.account;
      return nfcAddress;
    },
  });

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Enhanced Floating Bubbles Background */}
      <FloatingBubbles />

      {/* Mobile-First Container */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header */}
        <div className="px-6 pt-8 pb-4">
          <div className="flex items-center justify-between">
            <div className="animate-gentle-bounce text-3xl">🫧</div>
            <Button
              variant="ghost"
              // onClick={handleSkip}
              className="text-sm"
            >
              Skip for now
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 px-6 pb-6">
          {!nfcData && (
            <div className="flex h-full min-h-[80vh] flex-col justify-between">
              {/* Tutorial Content */}
              <div className="flex flex-1 flex-col justify-center space-y-8 pt-8 text-center">
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
                      className="text-primary text-2xl font-bold"
                      delay={0.3}
                    >
                      Connect your NFC wristband
                    </TextAnimate>

                    <TextAnimate
                      animation="slideUp"
                      delay={0.6}
                      className="text-muted-foreground mx-auto max-w-md text-lg leading-relaxed"
                    >
                      Link your arx.org wristband to make instant connections IRL ✨
                    </TextAnimate>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="space-y-4 pb-8">
                <RainbowButton
                  onClick={() => mutate()}
                  size="lg"
                  className="h-14 w-full rounded-2xl text-lg font-semibold"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Start Connection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </RainbowButton>

                <TextAnimate
                  animation="fadeIn"
                  delay={1.8}
                  className="text-muted-foreground text-center text-xs"
                >
                  This is optional - you can always connect later in settings
                </TextAnimate>
              </div>
            </div>
          )}

          {isPending && (
            <div className="flex h-full min-h-[80vh] flex-col items-center justify-center space-y-8">
              {/* Scanning Animation */}
              <div className="relative">
                <div className="border-primary/20 flex h-32 w-32 items-center justify-center rounded-full border-4">
                  <div className="animate-pulse text-4xl">📱</div>
                </div>
                <div className="border-primary absolute inset-0 animate-ping rounded-full border-4 opacity-20"></div>
                <div className="border-accent animation-delay-200 absolute inset-2 animate-ping rounded-full border-4 opacity-30"></div>
              </div>

              <div className="space-y-4 text-center">
                <TextAnimate
                  animation="blurInUp"
                  className="text-primary text-2xl font-bold"
                >
                  Looking for your wristband...
                </TextAnimate>

                <TextAnimate
                  animation="slideUp"
                  delay={0.3}
                  className="text-muted-foreground mx-auto max-w-sm text-base"
                >
                  Hold your wristband close to the back of your phone
                </TextAnimate>
              </div>

              {/* Progress indicator */}
              <div className="w-full max-w-xs">
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="from-primary to-accent h-full w-3/4 animate-pulse rounded-full bg-gradient-to-r"></div>
                </div>
              </div>
            </div>
          )}

          {!!nfcData && (
            <div className="flex h-full min-h-[80vh] flex-col justify-between">
              {/* Success Content */}
              <div className="flex flex-1 flex-col justify-center space-y-8 pt-8 text-center">
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
                      className="text-primary text-2xl font-bold"
                      delay={0.3}
                    >
                      Wristband connected!
                    </TextAnimate>

                    {nfcData}

                    <TextAnimate
                      animation="slideUp"
                      delay={0.6}
                      className="text-muted-foreground mx-auto max-w-md text-lg leading-relaxed"
                    >
                      You're all set to make instant connections by tapping wristbands 🎉
                    </TextAnimate>
                  </div>
                </div>

                {/* Success Card */}
                <Card className="from-primary/10 via-accent/10 to-primary/10 border-primary/20 mx-4 border bg-gradient-to-r backdrop-blur-sm">
                  <CardHeader className="pb-3 text-center">
                    <div className="mb-2 text-3xl">🔗</div>
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
              <div className="space-y-4 pb-8">
                <RainbowButton
                  // onClick={handleDone}
                  size="lg"
                  className="h-14 w-full rounded-2xl text-lg font-semibold"
                >
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Start Using Bubbles
                  <ArrowRight className="ml-2 h-5 w-5" />
                </RainbowButton>

                <TextAnimate
                  animation="fadeIn"
                  delay={1}
                  className="text-muted-foreground text-center text-xs"
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
      "bubble-gradient-pink",
      "bubble-gradient-blue",
      "bubble-gradient-purple",
      "bubble-gradient-green",
      "bubble-gradient-yellow",
    ][Math.floor(Math.random() * 5)],
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
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
            bottom: "-60px",
          }}
        />
      ))}
    </div>
  );
}
