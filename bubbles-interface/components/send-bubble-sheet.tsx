"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Gift, Plus } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Bubble } from "@/components/ui/bubble";
import { BUBBLE_TYPES } from "@/lib/bubbles";

interface Connection {
  id: string;
  name: string;
  avatar?: string;
  lastSeen?: string;
  bubblesSent?: number;
  bubblesReceived?: number;
}

interface SendBubbleSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  connection: Connection | null;
  onSendComplete?: (data: {
    connection: Connection;
    bubbleType: typeof BUBBLE_TYPES[0];
    amount: number;
    totalValue: number;
    note?: string;
  }) => void;
}

export function SendBubbleSheet({
  open,
  onOpenChange,
  connection,
  onSendComplete,
}: SendBubbleSheetProps) {
  const [selectedBubbleType, setSelectedBubbleType] = useState(BUBBLE_TYPES[0]);
  const [bubbleAmount, setBubbleAmount] = useState(1);
  const [note, setNote] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { mutate: sendBubble } = useMutation({
    mutationFn: async () => {
      // Simulate sending bubble process
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { success: true };
    },
    onSuccess: () => {
      setIsSending(false);
      setShowSuccess(true);

      const sendData = {
        connection: connection!,
        bubbleType: selectedBubbleType,
        amount: bubbleAmount,
        totalValue: bubbleAmount * selectedBubbleType.value,
        note: note || undefined,
      };

      toast.success(`Sent ${bubbleAmount} ${selectedBubbleType.name} bubble${bubbleAmount > 1 ? 's' : ''} to ${connection?.name}!`);

      // Call callback if provided
      onSendComplete?.(sendData);

      // Auto close after celebration
      setTimeout(() => {
        setShowSuccess(false);
        onOpenChange(false);
        // Reset form
        setBubbleAmount(1);
        setNote("");
        setSelectedBubbleType(BUBBLE_TYPES[0]);
      }, 3000);
    },
    onError: () => {
      setIsSending(false);
      toast.error("Failed to send bubble. Please try again.");
    },
  });

  const handleSend = () => {
    setIsSending(true);
    sendBubble();
  };

  const totalValue = bubbleAmount * selectedBubbleType.value;

  if (!connection) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[90vh]">
        <SheetHeader>
          <SheetTitle>Send Bubble to {connection.name}</SheetTitle>
          <SheetDescription>
            Choose a compliment bubble to send
          </SheetDescription>
        </SheetHeader>

        {!showSuccess ? (
          <div className="p-6 pt-2 space-y-6">
            {/* Bubble Type Selection */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4">Choose Bubble Type</h3>
              <div className="grid grid-cols-2 gap-3">
                {BUBBLE_TYPES.map((bubbleType) => (
                  <motion.button
                    key={bubbleType.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedBubbleType(bubbleType)}
                    className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                      selectedBubbleType.name === bubbleType.name
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Bubble type={bubbleType} size="md" variant="default" />
                      <div className="text-left">
                        <div className="font-bold text-slate-800">{bubbleType.name}</div>
                        <div className="text-sm text-slate-600">${bubbleType.value}</div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Amount Selection */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4">Amount</h3>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setBubbleAmount(Math.max(1, bubbleAmount - 1))}
                  disabled={bubbleAmount <= 1}
                  className="rounded-xl"
                >
                  -
                </Button>
                <div className="flex-1 text-center">
                  <div className="text-2xl font-bold text-slate-800">{bubbleAmount}</div>
                  <div className="text-sm text-slate-600">bubble{bubbleAmount > 1 ? 's' : ''}</div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setBubbleAmount(bubbleAmount + 1)}
                  className="rounded-xl"
                >
                  +
                </Button>
              </div>
            </div>

            {/* Total Value */}
            <div className="skeu-card rounded-2xl p-4 bg-slate-50">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Total Value:</span>
                <span className="text-xl font-bold text-slate-800">${totalValue}</span>
              </div>
            </div>

            {/* Optional Note */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-3">Add a note (optional)</h3>
              <input
                type="text"
                placeholder="e.g., Thanks for the help!"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 text-base"
              />
            </div>

            {/* Send Button */}
            <Button
              onClick={handleSend}
              disabled={isSending}
              className="skeu-button w-full h-16 rounded-3xl relative group"
            >
              <Gift className="mr-2 h-5 w-5" />
              <span className="text-lg font-medium">
                {isSending ? 'Sending...' : `Send ${bubbleAmount} ${selectedBubbleType.name} Bubble${bubbleAmount > 1 ? 's' : ''}`}
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full rounded-3xl" />
            </Button>
          </div>
        ) : (
          /* Success Animation */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 pt-2 text-center space-y-6"
          >
            {/* Floating Bubbles Animation */}
            <div className="relative h-32 overflow-hidden">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 100, opacity: 0, scale: 0 }}
                  animate={{
                    y: -100,
                    opacity: [0, 1, 1, 0],
                    scale: [0, 1, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                  className="absolute"
                  style={{
                    left: `${10 + (i % 8) * 10}%`,
                  }}
                >
                  <Bubble type={selectedBubbleType} size="sm" variant="default" />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Bubbles Sent! 🎉</h2>
              <p className="text-slate-600 text-lg">
                Sent {bubbleAmount} {selectedBubbleType.name} bubble{bubbleAmount > 1 ? 's' : ''} to {connection.name}
              </p>
              <p className="text-sm text-slate-500 mt-2">
                They'll receive ${totalValue} in their preferred token
              </p>
            </motion.div>
          </motion.div>
        )}
      </SheetContent>
    </Sheet>
  );
}