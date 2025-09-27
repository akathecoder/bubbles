"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TextAnimate } from "@/components/ui/text-animate";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useRouter } from "next/navigation";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { 
  Heart, 
  Sparkles, 
  Send, 
  Users, 
  Gift, 
  Scan,
  Plus,
  Star,
  Zap
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const { user, primaryWallet } = useDynamicContext();
  const isAuthenticated = !!user;

  const bubbleTypes = [
    { 
      emoji: "🌸", 
      name: "Kind", 
      description: "For gentle souls who spread warmth",
      gradient: "bubble-gradient-pink",
      price: "$5"
    },
    { 
      emoji: "🔥", 
      name: "Inspiring", 
      description: "For those who light up others",
      gradient: "bubble-gradient-yellow",
      price: "$8"
    },
    { 
      emoji: "💡", 
      name: "Brilliant", 
      description: "For sharp minds and great ideas",
      gradient: "bubble-gradient-blue",
      price: "$6"
    },
    { 
      emoji: "✨", 
      name: "Magical", 
      description: "For people who make everything special",
      gradient: "bubble-gradient-purple",
      price: "$10"
    },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Enhanced Floating Bubbles */}
        <FloatingBubblesBackground />
        
        {/* Hero Section */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Navigation */}
          <nav className="p-6 flex justify-between items-center">
            <div className="text-3xl animate-gentle-bounce">🫧</div>
            <Button 
              variant="outline" 
              onClick={() => router.push('/onboarding')}
              className="glass-card border-white/20 text-sm font-medium"
            >
              Sign In
            </Button>
          </nav>

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-center px-6 pb-16">
            <div className="text-center space-y-8 max-w-md mx-auto">
              {/* Hero Bubble */}
              <div className="relative">
                <TextAnimate
                  animation="scaleUp"
                  className="text-8xl filter drop-shadow-lg"
                  startOnView={false}
                >
                  🫧
                </TextAnimate>
                <div className="absolute inset-0 animate-pulse-glow rounded-full"></div>
              </div>
              
              {/* Hero Text */}
              <div className="space-y-6">
                <TextAnimate
                  animation="blurInUp"
                  className="text-4xl font-bold text-primary leading-tight"
                  delay={0.3}
                >
                  Compliments that float to you
                </TextAnimate>
                
                <TextAnimate
                  animation="slideUp"
                  delay={0.6}
                  className="text-lg text-muted-foreground leading-relaxed"
                >
                  Send meaningful compliments with real value. Connect IRL, choose a bubble, spread joy! ✨
                </TextAnimate>
              </div>

              {/* CTA */}
              <div className="space-y-4 pt-4">
                <RainbowButton 
                  onClick={() => router.push('/onboarding')} 
                  size="lg" 
                  className="w-full h-14 text-lg font-semibold rounded-3xl touch-feedback"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Make Someone Smile
                  <Heart className="w-5 h-5 ml-2" />
                </RainbowButton>
                
                <TextAnimate
                  animation="fadeIn"
                  delay={1.2}
                  className="text-sm text-muted-foreground"
                >
                  Free to join • 2 minutes setup ⚡
                </TextAnimate>
              </div>
            </div>
          </div>

          {/* Quick Preview */}
          <div className="px-6 pb-8">
            <div className="glass-card rounded-3xl p-6 space-y-4">
              <TextAnimate
                animation="slideUp"
                className="text-center text-sm font-semibold text-primary"
              >
                Popular Bubbles
              </TextAnimate>
              
              <div className="flex justify-center space-x-3">
                {bubbleTypes.slice(0, 4).map((bubble, index) => (
                  <div
                    key={index}
                    className={`w-12 h-12 rounded-full ${bubble.gradient} material-bubble flex items-center justify-center text-lg animate-bubble-pop animate-bubble-wobble touch-feedback`}
                    style={{ animationDelay: `${1.5 + index * 0.1}s` }}
                  >
                    {bubble.emoji}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthenticatedHome user={user} router={router} />
  );
}

// Authenticated user dashboard
function AuthenticatedHome({ user, router }: { user: any; router: any }) {
  const recentConnections = [
    { name: "Alex", avatar: "🦄", lastSeen: "2m ago" },
    { name: "Maya", avatar: "🌟", lastSeen: "1h ago" },
    { name: "Sam", avatar: "🎨", lastSeen: "3h ago" },
  ];

  const recentBubbles = [
    { type: "🌸", from: "Alex", amount: "$5", time: "5m ago" },
    { type: "🔥", from: "Maya", amount: "$8", time: "2h ago" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingBubblesBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="p-6 space-y-6">
          {/* Top Bar */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="text-3xl animate-gentle-bounce">🫧</div>
              <div>
                <TextAnimate
                  animation="slideLeft"
                  className="font-semibold text-primary"
                >
                  Hey there! 👋
                </TextAnimate>
                <TextAnimate
                  animation="slideLeft"
                  delay={0.2}
                  className="text-sm text-muted-foreground"
                >
                  {user?.email?.split('@')[0] || 'Bubble Creator'}
                </TextAnimate>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              className="glass-card border-white/20"
              onClick={() => router.push('/bubble-jar')}
            >
              <Gift className="w-4 h-4" />
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card rounded-3xl p-4 text-center space-y-2">
              <div className="text-2xl font-bold text-primary">12</div>
              <div className="text-xs text-muted-foreground">Bubbles Sent</div>
            </div>
            <div className="glass-card rounded-3xl p-4 text-center space-y-2">
              <div className="text-2xl font-bold text-accent">8</div>
              <div className="text-xs text-muted-foreground">Received</div>
            </div>
          </div>
        </div>

        {/* Main Actions */}
        <div className="flex-1 px-6 space-y-6">
          {/* Primary Actions */}
          <div className="space-y-4">
            <RainbowButton
              onClick={() => router.push('/send')}
              size="lg"
              className="w-full h-16 text-lg font-semibold rounded-3xl touch-feedback"
            >
              <Send className="w-5 h-5 mr-3" />
              Send a Bubble
              <Sparkles className="w-5 h-5 ml-3" />
            </RainbowButton>
            
            <Button
              variant="outline"
              size="lg"
              className="w-full h-14 rounded-3xl glass-card border-white/20 touch-feedback"
            >
              <Scan className="w-5 h-5 mr-3" />
              Scan NFC Tag
            </Button>
          </div>

          {/* Recent Connections */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-primary">Recent Connections</h3>
              <Button variant="ghost" size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-3">
              {recentConnections.map((connection, index) => (
                <div
                  key={index}
                  className="glass-card rounded-2xl p-4 flex items-center justify-between touch-feedback"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-lg">
                      {connection.avatar}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{connection.name}</div>
                      <div className="text-xs text-muted-foreground">{connection.lastSeen}</div>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="rounded-xl">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Bubbles */}
          <div className="space-y-4">
            <h3 className="font-semibold text-primary">Recent Bubbles</h3>
            
            <div className="space-y-3">
              {recentBubbles.map((bubble, index) => (
                <div
                  key={index}
                  className="glass-card rounded-2xl p-4 flex items-center space-x-3"
                >
                  <div className="w-10 h-10 rounded-2xl bubble-gradient-pink flex items-center justify-center text-lg">
                    {bubble.type}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">From {bubble.from}</div>
                    <div className="text-xs text-muted-foreground">{bubble.time}</div>
                  </div>
                  <div className="text-sm font-semibold text-primary">{bubble.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Navigation Placeholder */}
        <div className="p-6">
          <div className="glass-card rounded-3xl p-4 flex justify-around items-center">
            <Button variant="ghost" size="sm" className="flex-1 flex flex-col items-center space-y-1">
              <Heart className="w-5 h-5" />
              <span className="text-xs">Home</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex-1 flex flex-col items-center space-y-1">
              <Users className="w-5 h-5" />
              <span className="text-xs">Circle</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex-1 flex flex-col items-center space-y-1">
              <Gift className="w-5 h-5" />
              <span className="text-xs">Jar</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex-1 flex flex-col items-center space-y-1">
              <Star className="w-5 h-5" />
              <span className="text-xs">Profile</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced floating bubbles with different types
function FloatingBubblesBackground() {
  const bubbles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 60 + 30,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: Math.random() * 4 + 6,
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
          className={`absolute rounded-full ${bubble.gradient} material-bubble animate-float animate-bubble-wobble opacity-30`}
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.left}%`,
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${bubble.duration}s`,
            bottom: '-100px',
          }}
        />
      ))}
    </div>
  );
}
