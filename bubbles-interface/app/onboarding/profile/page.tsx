"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TextAnimate } from "@/components/ui/text-animate";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useRouter } from "next/navigation";
import { Heart, ArrowRight } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [profileData, setProfileData] = useState({
    displayName: "",
    ensHandle: "",
    preferredChain: "",
    preferredToken: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = profileData.displayName && profileData.preferredChain && profileData.preferredToken;

  const handleNext = () => {
    if (isFormValid) {
      // Store profile data (you might want to use a context or store here)
      localStorage.setItem('bubbles-profile', JSON.stringify(profileData));
      router.push('/onboarding/complete');
    }
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
              Step 3 of 4
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 shadow-lg"
                style={{ width: '75%' }}
              />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 px-6 pb-6">
          <div className="h-full flex flex-col min-h-[80vh] space-y-6">
            {/* Header */}
            <div className="text-center space-y-4 pt-8">
              <div className="text-5xl mb-4">👤</div>

              <div className="space-y-3">
                <TextAnimate
                  animation="blurInUp"
                  className="text-2xl font-bold text-primary"
                >
                  Create your profile
                </TextAnimate>

                <TextAnimate
                  animation="slideUp"
                  delay={0.3}
                  className="text-base text-muted-foreground max-w-sm mx-auto leading-relaxed"
                >
                  Tell us a bit about yourself and how you'd like to receive compliments ✨
                </TextAnimate>
              </div>
            </div>

            {/* Form */}
            <div className="flex-1 space-y-6">
              <div className="bg-card/50 backdrop-blur-sm rounded-3xl border border-primary/20 p-6 space-y-6">
                {/* Display Name */}
                <div className="space-y-3">
                  <Label htmlFor="displayName" className="text-base font-semibold text-primary">
                    What should we call you? 😊
                  </Label>
                  <Input
                    id="displayName"
                    type="text"
                    placeholder="Enter your display name"
                    value={profileData.displayName}
                    onChange={(e) => handleInputChange("displayName", e.target.value)}
                    className="h-12 text-base rounded-2xl border-2 border-input/50 focus:border-primary transition-colors"
                  />
                </div>

                {/* ENS Handle */}
                <div className="space-y-3">
                  <Label htmlFor="ensHandle" className="text-base font-semibold text-primary">
                    ENS Handle (Optional) 🌐
                  </Label>
                  <Input
                    id="ensHandle"
                    type="text"
                    placeholder="yourname.eth"
                    value={profileData.ensHandle}
                    onChange={(e) => handleInputChange("ensHandle", e.target.value)}
                    className="h-12 text-base rounded-2xl border-2 border-input/50 focus:border-primary transition-colors"
                  />
                  <p className="text-xs text-muted-foreground">
                    Your unique web3 identity (we can suggest one if you skip this)
                  </p>
                </div>
              </div>

              {/* Preferences */}
              <div className="bg-card/50 backdrop-blur-sm rounded-3xl border border-primary/20 p-6 space-y-6">
                <div className="text-center">
                  <TextAnimate animation="fadeIn" className="text-lg font-semibold text-primary mb-2">
                    Payment Preferences 💰
                  </TextAnimate>
                  <TextAnimate animation="slideUp" delay={0.2} className="text-sm text-muted-foreground">
                    Choose how you'd like to receive value from compliments
                  </TextAnimate>
                </div>

                <div className="space-y-4">
                  <div className="space-y-3">
                    <Label className="text-base font-medium">Preferred Chain</Label>
                    <Select onValueChange={(value) => handleInputChange("preferredChain", value)}>
                      <SelectTrigger className="h-12 text-base rounded-2xl border-2 border-input/50">
                        <SelectValue placeholder="Choose your favorite chain" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ethereum">
                          <div className="flex items-center space-x-2">
                            <span>🔷</span>
                            <span>Ethereum</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="base">
                          <div className="flex items-center space-x-2">
                            <span>🔵</span>
                            <span>Base</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="polygon">
                          <div className="flex items-center space-x-2">
                            <span>🟣</span>
                            <span>Polygon</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="optimism">
                          <div className="flex items-center space-x-2">
                            <span>🔴</span>
                            <span>Optimism</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base font-medium">Preferred Token</Label>
                    <Select onValueChange={(value) => handleInputChange("preferredToken", value)}>
                      <SelectTrigger className="h-12 text-base rounded-2xl border-2 border-input/50">
                        <SelectValue placeholder="Pick your token" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usdc">
                          <div className="flex items-center space-x-2">
                            <span>💵</span>
                            <span>USDC</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="eth">
                          <div className="flex items-center space-x-2">
                            <span>💎</span>
                            <span>ETH</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="usdt">
                          <div className="flex items-center space-x-2">
                            <span>💰</span>
                            <span>USDT</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="dai">
                          <div className="flex items-center space-x-2">
                            <span>🟡</span>
                            <span>DAI</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="pb-8 space-y-4">
              <RainbowButton
                onClick={handleNext}
                size="lg"
                className="w-full h-14 text-lg font-semibold rounded-2xl"
                disabled={!isFormValid}
              >
                <Heart className="w-5 h-5 mr-2" />
                {isFormValid ? "Almost Done!" : "Fill required fields"}
                {isFormValid && <ArrowRight className="w-5 h-5 ml-2" />}
              </RainbowButton>

              <TextAnimate
                animation="fadeIn"
                delay={0.5}
                className="text-xs text-muted-foreground text-center"
              >
                You can always change these settings later 🔧
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