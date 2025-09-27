"use client";

import { useEffect, useState } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useRouter, useSearchParams } from "next/navigation";
import { TextAnimate } from "@/components/ui/text-animate";
import { Loader2 } from "lucide-react";

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, primaryWallet, isAuthenticated } = useDynamicContext();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    // Handle Dynamic auth callback
    const handleCallback = async () => {
      try {
        // Check if user is authenticated
        if (isAuthenticated && user) {
          setStatus('success');

          // Small delay to show success state
          setTimeout(() => {
            // Check if user has completed profile setup
            const savedProfile = localStorage.getItem('bubbles-profile');

            if (savedProfile) {
              // Profile exists, go to home
              router.push('/');
            } else {
              // No profile, continue to profile setup
              router.push('/onboarding/profile');
            }
          }, 1500);
        } else {
          // Check for any error parameters
          const error = searchParams.get('error');
          const errorDescription = searchParams.get('error_description');

          if (error) {
            console.error('Auth error:', error, errorDescription);
            setStatus('error');

            // Redirect back to auth page after delay
            setTimeout(() => {
              router.push('/onboarding/auth');
            }, 3000);
          } else {
            // Still loading or waiting for auth to complete
            setTimeout(() => {
              if (!isAuthenticated) {
                // Timeout, redirect back to auth
                router.push('/onboarding/auth');
              }
            }, 5000);
          }
        }
      } catch (error) {
        console.error('Callback handling error:', error);
        setStatus('error');

        setTimeout(() => {
          router.push('/onboarding/auth');
        }, 3000);
      }
    };

    handleCallback();
  }, [isAuthenticated, user, router, searchParams]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Floating Bubbles Background */}
      <FloatingBubbles />

      {/* Mobile-First Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="pt-8 pb-4 px-6">
          <div className="flex items-center justify-center">
            <div className="text-3xl animate-gentle-bounce">🫧</div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 px-6 pb-6 flex items-center justify-center">
          <div className="text-center space-y-8 max-w-md mx-auto">
            {status === 'loading' && (
              <>
                <div className="relative">
                  <TextAnimate
                    animation="scaleUp"
                    className="text-6xl"
                    startOnView={false}
                  >
                    🔄
                  </TextAnimate>
                  <div className="absolute inset-0 animate-spin">
                    <Loader2 className="w-16 h-16 text-primary mx-auto opacity-30" />
                  </div>
                </div>

                <div className="space-y-4">
                  <TextAnimate
                    animation="blurInUp"
                    className="text-2xl font-bold text-primary"
                    delay={0.3}
                  >
                    Setting up your account...
                  </TextAnimate>

                  <TextAnimate
                    animation="slideUp"
                    delay={0.6}
                    className="text-base text-muted-foreground leading-relaxed"
                  >
                    Just a moment while we get everything ready for you ✨
                  </TextAnimate>
                </div>
              </>
            )}

            {status === 'success' && (
              <>
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
                    Welcome to Bubbles!
                  </TextAnimate>

                  <TextAnimate
                    animation="slideUp"
                    delay={0.6}
                    className="text-base text-muted-foreground leading-relaxed"
                  >
                    Authentication successful. Redirecting you now...
                  </TextAnimate>
                </div>
              </>
            )}

            {status === 'error' && (
              <>
                <TextAnimate
                  animation="scaleUp"
                  className="text-6xl"
                  startOnView={false}
                >
                  ⚠️
                </TextAnimate>

                <div className="space-y-4">
                  <TextAnimate
                    animation="blurInUp"
                    className="text-2xl font-bold text-destructive"
                    delay={0.3}
                  >
                    Something went wrong
                  </TextAnimate>

                  <TextAnimate
                    animation="slideUp"
                    delay={0.6}
                    className="text-base text-muted-foreground leading-relaxed"
                  >
                    We encountered an issue during sign-in. Taking you back to try again...
                  </TextAnimate>
                </div>
              </>
            )}

            {/* Loading indicator */}
            <div className="w-full max-w-xs mx-auto">
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ${
                  status === 'loading' ? 'w-3/4 animate-pulse' :
                  status === 'success' ? 'w-full' :
                  'w-1/4'
                }`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Floating Bubbles Component
function FloatingBubbles() {
  const bubbles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 40 + 20,
    left: Math.random() * 100,
    delay: Math.random() * 4,
    duration: Math.random() * 3 + 4,
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