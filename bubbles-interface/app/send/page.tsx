"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TextAnimate } from "@/components/ui/text-animate";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Confetti } from "@/components/ui/confetti";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Heart, 
  Sparkles, 
  Send, 
  Users, 
  DollarSign,
  Check,
  Plus,
  Minus
} from "lucide-react";

export default function SendBubblePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedRecipient, setSelectedRecipient] = useState<any>(null);
  const [selectedBubble, setSelectedBubble] = useState<any>(null);
  const [tipAmount, setTipAmount] = useState(5);
  const [note, setNote] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const connections = [
    { id: 1, name: "Alex", avatar: "🦄", status: "online", handle: "alex.eth" },
    { id: 2, name: "Maya", avatar: "🌟", status: "recently", handle: "maya.bubble" },
    { id: 3, name: "Sam", avatar: "🎨", status: "offline", handle: "samcreates.eth" },
    { id: 4, name: "Riley", avatar: "🚀", status: "online", handle: "riley.lens" },
  ];

  const bubbleTypes = [
    { 
      id: 1,
      emoji: "🌸", 
      name: "Kind", 
      description: "For gentle souls who spread warmth",
      gradient: "bubble-gradient-pink",
      basePrice: 5
    },
    { 
      id: 2,
      emoji: "🔥", 
      name: "Inspiring", 
      description: "For those who light up others",
      gradient: "bubble-gradient-yellow",
      basePrice: 8
    },
    { 
      id: 3,
      emoji: "💡", 
      name: "Brilliant", 
      description: "For sharp minds and great ideas",
      gradient: "bubble-gradient-blue",
      basePrice: 6
    },
    { 
      id: 4,
      emoji: "✨", 
      name: "Magical", 
      description: "For people who make everything special",
      gradient: "bubble-gradient-purple",
      basePrice: 10
    },
    { 
      id: 5,
      emoji: "💖", 
      name: "Loving", 
      description: "For hearts full of love",
      gradient: "bubble-gradient-pink",
      basePrice: 7
    },
    { 
      id: 6,
      emoji: "🎯", 
      name: "Focused", 
      description: "For determination and drive",
      gradient: "bubble-gradient-green",
      basePrice: 6
    },
  ];

  const tipOptions = [5, 10, 15, 25, 50];

  const handleSendBubble = () => {
    setShowConfetti(true);
    setStep(4);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <SelectRecipientStep />;
      case 2:
        return <SelectBubbleStep />;
      case 3:
        return <CustomizeStep />;
      case 4:
        return <SuccessStep />;
      default:
        return <SelectRecipientStep />;
    }
  };

  function SelectRecipientStep() {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <TextAnimate
            animation="scaleUp"
            className="text-6xl"
          >
            👥
          </TextAnimate>
          
          <div className="space-y-2">
            <TextAnimate
              animation="blurInUp"
              className="text-2xl font-bold text-primary"
            >
              Who deserves a bubble?
            </TextAnimate>
            
            <TextAnimate
              animation="slideUp"
              delay={0.3}
              className="text-muted-foreground"
            >
              Choose someone from your circle to brighten their day
            </TextAnimate>
          </div>
        </div>

        <div className="space-y-3">
          {connections.map((connection, index) => (
            <div
              key={connection.id}
              className={`glass-card rounded-3xl p-4 cursor-pointer transition-all touch-feedback ${
                selectedRecipient?.id === connection.id 
                  ? 'ring-2 ring-primary border-primary/50 bg-primary/5' 
                  : 'hover:bg-white/10'
              }`}
              onClick={() => setSelectedRecipient(connection)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-xl">
                    {connection.avatar}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    connection.status === 'online' ? 'bg-green-400' : 
                    connection.status === 'recently' ? 'bg-yellow-400' : 'bg-gray-400'
                  }`} />
                </div>
                
                <div className="flex-1">
                  <div className="font-semibold text-primary">{connection.name}</div>
                  <div className="text-sm text-muted-foreground">{connection.handle}</div>
                </div>
                
                {selectedRecipient?.id === connection.id && (
                  <div className="text-primary animate-bubble-pop">
                    <Check className="w-5 h-5" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <RainbowButton
          onClick={() => setStep(2)}
          disabled={!selectedRecipient}
          size="lg"
          className="w-full h-14 text-lg font-semibold rounded-3xl"
        >
          <Users className="w-5 h-5 mr-2" />
          Continue with {selectedRecipient?.name || 'Selection'}
          <Sparkles className="w-5 h-5 ml-2" />
        </RainbowButton>
      </div>
    );
  }

  function SelectBubbleStep() {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <TextAnimate
            animation="scaleUp"
            className="text-6xl"
          >
            🫧
          </TextAnimate>
          
          <div className="space-y-2">
            <TextAnimate
              animation="blurInUp"
              className="text-2xl font-bold text-primary"
            >
              Pick the perfect bubble
            </TextAnimate>
            
            <TextAnimate
              animation="slideUp"
              delay={0.3}
              className="text-muted-foreground"
            >
              For {selectedRecipient?.name} ✨
            </TextAnimate>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {bubbleTypes.map((bubble, index) => (
            <div
              key={bubble.id}
              className={`glass-card rounded-3xl p-4 cursor-pointer transition-all touch-feedback ${
                selectedBubble?.id === bubble.id 
                  ? 'ring-2 ring-primary border-primary/50 scale-105' 
                  : 'hover:scale-102'
              }`}
              onClick={() => {
                setSelectedBubble(bubble);
                setTipAmount(bubble.basePrice);
              }}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-center space-y-3">
                <div className={`w-16 h-16 mx-auto rounded-full ${bubble.gradient} material-bubble flex items-center justify-center text-2xl animate-bubble-pop animate-bubble-wobble`}>
                  {bubble.emoji}
                </div>
                
                <div className="space-y-1">
                  <div className="font-semibold text-primary">{bubble.name}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">
                    {bubble.description}
                  </div>
                  <div className="text-sm font-medium text-accent">
                    From ${bubble.basePrice}
                  </div>
                </div>
                
                {selectedBubble?.id === bubble.id && (
                  <div className="text-primary animate-bubble-pop">
                    <Check className="w-5 h-5 mx-auto" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <RainbowButton
          onClick={() => setStep(3)}
          disabled={!selectedBubble}
          size="lg"
          className="w-full h-14 text-lg font-semibold rounded-3xl"
        >
          <Heart className="w-5 h-5 mr-2" />
          Customize {selectedBubble?.name || 'Bubble'}
          <Sparkles className="w-5 h-5 ml-2" />
        </RainbowButton>
      </div>
    );
  }

  function CustomizeStep() {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className={`w-20 h-20 mx-auto rounded-3xl ${selectedBubble?.gradient} flex items-center justify-center text-3xl animate-gentle-bounce`}>
            {selectedBubble?.emoji}
          </div>
          
          <div className="space-y-2">
            <TextAnimate
              animation="blurInUp"
              className="text-2xl font-bold text-primary"
            >
              Customize your {selectedBubble?.name} bubble
            </TextAnimate>
            
            <TextAnimate
              animation="slideUp"
              delay={0.3}
              className="text-muted-foreground"
            >
              For {selectedRecipient?.name}
            </TextAnimate>
          </div>
        </div>

        {/* Tip Amount */}
        <div className="glass-card rounded-3xl p-6 space-y-4">
          <Label className="text-lg font-semibold text-primary">
            Tip Amount 💰
          </Label>
          
          <div className="grid grid-cols-3 gap-3">
            {tipOptions.map((amount) => (
              <Button
                key={amount}
                variant={tipAmount === amount ? "default" : "outline"}
                className={`h-12 rounded-2xl font-semibold ${
                  tipAmount === amount 
                    ? 'bg-primary text-primary-foreground' 
                    : 'glass-card border-white/20'
                }`}
                onClick={() => setTipAmount(amount)}
              >
                ${amount}
              </Button>
            ))}
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl glass-card border-white/20"
              onClick={() => setTipAmount(Math.max(1, tipAmount - 1))}
            >
              <Minus className="w-4 h-4" />
            </Button>
            
            <div className="flex-1 text-center">
              <div className="text-2xl font-bold text-primary">${tipAmount}</div>
              <div className="text-xs text-muted-foreground">Custom amount</div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl glass-card border-white/20"
              onClick={() => setTipAmount(tipAmount + 1)}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Optional Note */}
        <div className="glass-card rounded-3xl p-6 space-y-4">
          <Label htmlFor="note" className="text-lg font-semibold text-primary">
            Add a note (Optional) ✍️
          </Label>
          
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Say something nice..."
            className="w-full h-24 p-4 rounded-2xl bg-white/10 border border-white/20 placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            maxLength={100}
          />
          
          <div className="text-xs text-muted-foreground text-right">
            {note.length}/100
          </div>
        </div>

        {/* Summary */}
        <div className="glass-card rounded-3xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Bubble</span>
            <span className="text-primary">{selectedBubble?.name} {selectedBubble?.emoji}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-medium">To</span>
            <span className="text-primary">{selectedRecipient?.name}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-medium">Amount</span>
            <span className="text-primary font-bold">${tipAmount}</span>
          </div>
          
          <div className="border-t border-white/20 pt-3">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total</span>
              <span className="text-primary">${tipAmount}</span>
            </div>
          </div>
        </div>

        <RainbowButton
          onClick={handleSendBubble}
          size="lg"
          className="w-full h-14 text-lg font-semibold rounded-3xl"
        >
          <Send className="w-5 h-5 mr-2" />
          Send Bubble for ${tipAmount}
          <Sparkles className="w-5 h-5 ml-2" />
        </RainbowButton>
      </div>
    );
  }

  function SuccessStep() {
    return (
      <div className="space-y-8 text-center">
        {showConfetti && (
          <Confetti
            options={{
              particleCount: 150,
              spread: 90,
              origin: { y: 0.6 },
              colors: ['#ff9a9e', '#fecfef', '#a8edea', '#fed6e3', '#d299c2'],
            }}
            className="absolute inset-0 pointer-events-none"
          />
        )}

        <div className="space-y-6">
          <TextAnimate
            animation="scaleUp"
            className="text-8xl"
          >
            🎉
          </TextAnimate>
          
          <div className="space-y-4">
            <TextAnimate
              animation="blurInUp"
              className="text-3xl font-bold text-primary"
            >
              Bubble delivered!
            </TextAnimate>
            
            <TextAnimate
              animation="slideUp"
              delay={0.3}
              className="text-lg text-muted-foreground"
            >
              Your {selectedBubble?.name} bubble floated to {selectedRecipient?.name} ✨
            </TextAnimate>
          </div>

          <div className="glass-card rounded-3xl p-6 space-y-4">
            <div className={`w-16 h-16 mx-auto rounded-3xl ${selectedBubble?.gradient} flex items-center justify-center text-2xl animate-gentle-bounce`}>
              {selectedBubble?.emoji}
            </div>
            
            <div className="space-y-2">
              <div className="font-semibold text-primary">{selectedBubble?.name} bubble sent!</div>
              <div className="text-sm text-muted-foreground">
                {selectedRecipient?.name} will receive ${tipAmount} worth of joy
              </div>
              {note && (
                <div className="text-sm italic text-muted-foreground mt-2 p-3 bg-white/5 rounded-xl">
                  "{note}"
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <RainbowButton
            onClick={() => router.push('/')}
            size="lg"
            className="w-full h-14 text-lg font-semibold rounded-3xl"
          >
            <Heart className="w-5 h-5 mr-2" />
            Back to Home
            <Sparkles className="w-5 h-5 ml-2" />
          </RainbowButton>
          
          <Button
            variant="outline"
            onClick={() => {
              setStep(1);
              setSelectedRecipient(null);
              setSelectedBubble(null);
              setTipAmount(5);
              setNote("");
              setShowConfetti(false);
            }}
            className="w-full h-12 rounded-3xl glass-card border-white/20"
          >
            Send Another Bubble
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating Bubbles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className={`absolute rounded-full animate-float opacity-20 ${
              ['bubble-gradient-pink', 'bubble-gradient-blue', 'bubble-gradient-purple', 'bubble-gradient-green'][i % 4]
            } material-bubble animate-bubble-wobble`}
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
            onClick={() => step === 1 ? router.push('/') : setStep(step - 1)}
            className="glass-card border-white/20"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          
          <div className="text-center">
            <div className="text-sm font-medium text-primary">
              Step {step} of 4
            </div>
            <div className="text-xs text-muted-foreground">
              Send Bubble
            </div>
          </div>
          
          <div className="w-8" /> {/* Spacer */}
        </div>

        {/* Progress */}
        <div className="px-6 pb-6">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 pb-6">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}