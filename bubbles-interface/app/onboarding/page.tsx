"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the welcome step
    router.replace('/onboarding/welcome');
  }, [router]);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      <div className="text-center">
        <div className="text-3xl animate-bounce mb-4">🫧</div>
        <div className="text-sm text-muted-foreground">Redirecting...</div>
      </div>
    </div>
  );
}

