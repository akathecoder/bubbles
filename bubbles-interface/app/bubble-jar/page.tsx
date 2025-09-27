"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TextAnimate } from "@/components/ui/text-animate";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Heart, 
  Sparkles, 
  Gift, 
  Clock,
  Filter,
  Star,
  Eye,
  Share
} from "lucide-react";

export default function BubbleJarPage() {
  const router = useRouter();
  const [filter, setFilter] = useState("all");
  const [selectedBubble, setSelectedBubble] = useState<any>(null);

  const bubbles = [
    {
      id: 1,
      type: "🌸",
      name: "Kind",
      from: "Alex",
      fromAvatar: "🦄",
      amount: 5,
      note: "Thanks for always being so supportive! You're amazing ✨",
      time: "2 hours ago",
      gradient: "bubble-gradient-pink",
      isNew: true
    },
    {
      id: 2,
      type: "🔥",
      name: "Inspiring",
      from: "Maya",
      fromAvatar: "🌟",
      amount: 8,
      note: "Your presentation today was incredible! Keep shining 🌟",
      time: "5 hours ago",
      gradient: "bubble-gradient-yellow",
      isNew: true
    },
    {
      id: 3,
      type: "💡",
      name: "Brilliant",
      from: "Sam",
      fromAvatar: "🎨",
      amount: 6,
      note: "That idea you shared saved our project. You're a genius!",
      time: "1 day ago",
      gradient: "bubble-gradient-blue",
      isNew: false
    },
    {
      id: 4,
      type: "✨",
      name: "Magical",
      from: "Riley",
      fromAvatar: "🚀",
      amount: 10,
      note: "You make everything better just by being there 💫",
      time: "2 days ago",
      gradient: "bubble-gradient-purple",
      isNew: false
    },
    {
      id: 5,
      type: "💖",
      name: "Loving",
      from: "Jordan",
      fromAvatar: "🌈",
      amount: 7,
      note: "Your kindness means the world to me. Thank you for being you!",
      time: "3 days ago",
      gradient: "bubble-gradient-pink",
      isNew: false
    },
    {
      id: 6,
      type: "🎯",
      name: "Focused",
      from: "Casey",
      fromAvatar: "⚡",
      amount: 6,
      note: "Your dedication is inspiring. Keep pushing forward!",
      time: "1 week ago",
      gradient: "bubble-gradient-green",
      isNew: false
    }
  ];

  const filters = [
    { id: "all", label: "All", count: bubbles.length },
    { id: "new", label: "New", count: bubbles.filter(b => b.isNew).length },
    { id: "week", label: "This Week", count: bubbles.filter(b => !b.time.includes("week")).length },
  ];

  const filteredBubbles = bubbles.filter(bubble => {
    if (filter === "new") return bubble.isNew;
    if (filter === "week") return !bubble.time.includes("week");
    return true;
  });

  const totalValue = bubbles.reduce((sum, bubble) => sum + bubble.amount, 0);
  const newBubbles = bubbles.filter(b => b.isNew).length;

  if (selectedBubble) {
    return <BubbleDetailView bubble={selectedBubble} onBack={() => setSelectedBubble(null)} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating Bubbles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className={`absolute rounded-full animate-float animate-bubble-wobble material-bubble opacity-15 ${
              ['bubble-gradient-pink', 'bubble-gradient-blue', 'bubble-gradient-purple'][i % 3]
            }`}
            style={{
              width: Math.random() * 50 + 30,
              height: Math.random() * 50 + 30,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${Math.random() * 3 + 5}s`,
              bottom: '-80px',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="p-6 space-y-6">
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/')}
              className="glass-card border-white/20"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            
            <div className="text-center">
              <TextAnimate
                animation="slideDown"
                className="text-lg font-bold text-primary"
              >
                Your Bubble Jar
              </TextAnimate>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              className="glass-card border-white/20"
            >
              <Share className="w-4 h-4" />
            </Button>
          </div>

          {/* Hero Section */}
          <div className="text-center space-y-4">
            <TextAnimate
              animation="scaleUp"
              className="text-6xl filter drop-shadow-lg"
            >
              🫙
            </TextAnimate>
            
            <div className="space-y-2">
              <TextAnimate
                animation="blurInUp"
                delay={0.3}
                className="text-2xl font-bold text-primary"
              >
                {bubbles.length} beautiful bubbles
              </TextAnimate>
              
              <TextAnimate
                animation="slideUp"
                delay={0.6}
                className="text-muted-foreground"
              >
                Compliments that floated your way ✨
              </TextAnimate>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="glass-card rounded-3xl p-4 text-center space-y-2">
              <div className="text-xl font-bold text-primary">${totalValue}</div>
              <div className="text-xs text-muted-foreground">Total Value</div>
            </div>
            <div className="glass-card rounded-3xl p-4 text-center space-y-2">
              <div className="text-xl font-bold text-accent">{newBubbles}</div>
              <div className="text-xs text-muted-foreground">New</div>
            </div>
            <div className="glass-card rounded-3xl p-4 text-center space-y-2">
              <div className="text-xl font-bold text-primary">{bubbles.length}</div>
              <div className="text-xs text-muted-foreground">Total</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex space-x-2">
            {filters.map((filterOption) => (
              <Button
                key={filterOption.id}
                variant={filter === filterOption.id ? "default" : "outline"}
                size="sm"
                className={`rounded-2xl ${
                  filter === filterOption.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'glass-card border-white/20'
                }`}
                onClick={() => setFilter(filterOption.id)}
              >
                <Filter className="w-3 h-3 mr-1" />
                {filterOption.label}
                {filterOption.count > 0 && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {filterOption.count}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Bubbles List */}
        <div className="flex-1 px-6 pb-6">
          {filteredBubbles.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="text-4xl opacity-50">🫧</div>
              <div className="text-muted-foreground">No bubbles in this view</div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBubbles.map((bubble, index) => (
                <div
                  key={bubble.id}
                  className="glass-card rounded-3xl p-4 cursor-pointer transition-all touch-feedback hover:scale-102"
                  onClick={() => setSelectedBubble(bubble)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-4">
                    {/* Bubble Icon */}
                    <div className="relative">
                      <div className={`w-14 h-14 rounded-full ${bubble.gradient} material-bubble flex items-center justify-center text-xl animate-gentle-bounce animate-bubble-wobble`}>
                        {bubble.type}
                      </div>
                      {bubble.isNew && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-semibold text-primary">
                          {bubble.name} from {bubble.from}
                        </div>
                        <div className="text-sm font-bold text-accent">
                          ${bubble.amount}
                        </div>
                      </div>
                      
                      <div className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {bubble.note}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <div className="text-lg">{bubble.fromAvatar}</div>
                          <Clock className="w-3 h-3" />
                          <span>{bubble.time}</span>
                        </div>
                        
                        <Button size="sm" variant="ghost" className="text-xs">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Action */}
        <div className="p-6">
          <Button
            onClick={() => router.push('/send')}
            variant="outline"
            size="lg"
            className="w-full h-14 rounded-3xl glass-card border-white/20"
          >
            <Heart className="w-5 h-5 mr-3" />
            Send a Bubble Back
            <Sparkles className="w-5 h-5 ml-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// Bubble Detail View Component
function BubbleDetailView({ bubble, onBack }: { bubble: any; onBack: () => void }) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating Bubbles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className={`absolute rounded-full animate-float animate-bubble-wobble material-bubble opacity-20 ${bubble.gradient}`}
            style={{
              width: Math.random() * 40 + 20,
              height: Math.random() * 40 + 20,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${Math.random() * 3 + 4}s`,
              bottom: '-50px',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="p-6 flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="glass-card border-white/20"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          
          <div className="text-center">
            <div className="text-sm font-medium text-primary">Bubble Detail</div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            className="glass-card border-white/20"
          >
            <Share className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center px-6 space-y-8">
          {/* Main Bubble */}
          <div className="text-center space-y-6">
            <div className={`w-32 h-32 mx-auto rounded-full ${bubble.gradient} material-bubble flex items-center justify-center text-6xl animate-gentle-bounce animate-bubble-wobble shadow-2xl`}>
              {bubble.type}
            </div>
            
            <div className="space-y-3">
              <TextAnimate
                animation="blurInUp"
                className="text-3xl font-bold text-primary"
              >
                {bubble.name} Bubble
              </TextAnimate>
              
              <TextAnimate
                animation="slideUp"
                delay={0.3}
                className="text-lg text-muted-foreground"
              >
                From {bubble.from} {bubble.fromAvatar}
              </TextAnimate>
            </div>
          </div>

          {/* Note */}
          <div className="glass-card rounded-3xl p-6 space-y-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-primary mb-3">
                Their message to you:
              </div>
              
              <div className="text-base leading-relaxed text-foreground italic">
                "{bubble.note}"
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="glass-card rounded-3xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Value</span>
              <span className="text-xl font-bold text-primary">${bubble.amount}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">Received</span>
              <span className="text-muted-foreground">{bubble.time}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">Status</span>
              <Badge variant={bubble.isNew ? "default" : "secondary"}>
                {bubble.isNew ? "New" : "Read"}
              </Badge>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-6 space-y-3">
          <Button
            size="lg"
            className="w-full h-14 rounded-3xl bg-primary text-primary-foreground"
          >
            <Heart className="w-5 h-5 mr-3" />
            Send a Bubble Back
            <Sparkles className="w-5 h-5 ml-3" />
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="w-full h-12 rounded-3xl glass-card border-white/20"
          >
            <Star className="w-4 h-4 mr-2" />
            Save to Favorites
          </Button>
        </div>
      </div>
    </div>
  );
}