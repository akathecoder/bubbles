"use client";

import { Bubble } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { BUBBLE_TYPES, BubbleType } from "@/lib/bubbles";
import { useMutation } from "@tanstack/react-query";
import { Gift } from "lucide-react";
import { motion } from "motion/react";
import { memo, useState } from "react";
import { toast } from "sonner";
import { sendPayment } from "@/lib/oneInch";
import { send } from "process";
import { NetworkEnum, SupportedChain } from "@1inch/cross-chain-sdk";
import { Net } from "web3";
import useSessionKey from "@/lib/hooks/useSessionKey";
import { useEnsUser } from "@/lib/hooks/useEnsUser";
import { ArbitrumRpc } from "@/lib/utils";

interface SendBubbleSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  connectionAddress: `0x${string}` | null;
  onSendComplete?: (data: {
    connectionAddress: `0x${string}`;
    bubbleType: (typeof BUBBLE_TYPES)[0];
    amount: number;
    totalValue: number;
  }) => void;
}

export function SendBubbleSheet({ open, onOpenChange, connectionAddress, onSendComplete }: SendBubbleSheetProps) {
  const [selectedBubbleType, setSelectedBubbleType] = useState(BUBBLE_TYPES[0]);
  const [bubbleAmount, setBubbleAmount] = useState(1);
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { walletClient, sessionKey } = useSessionKey();

  // Get ENS data for the connection
  const connectionUser = useEnsUser(connectionAddress ?? undefined);

  const { mutate: sendBubble } = useMutation({
    mutationFn: async () => {
      // Simulate sending bubble process
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return { success: true };
    },
    onSuccess: () => {
      setIsSending(false);
      setShowSuccess(true);

      const sendData = {
        connectionAddress: connectionAddress!,
        bubbleType: selectedBubbleType,
        amount: bubbleAmount,
        totalValue: bubbleAmount * selectedBubbleType.value,
      };

      const sendPaymentArgs = {
        srcChainId: NetworkEnum.ARBITRUM,
        dstChainId: NetworkEnum.COINBASE,
        srcTokenAddress: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        dstTokenAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        makerAddress: walletClient?.address,
        makerPrivateKey: sessionKey!,
        destinationAddress: connectionAddress,
        amount: totalValue.toString(),
        enableEstimate: true,
      };
      sendPayment(ArbitrumRpc, sessionKey!, "nQDdo8Xoz0Dq3IoDp2tEMPW9h8ucwDHD", sendPaymentArgs as any);

      toast.success(
        `Sent ${bubbleAmount} ${selectedBubbleType.name} bubble${bubbleAmount > 1 ? "s" : ""} to ${connectionUser.displayName}!`,
      );

      // Call callback if provided
      onSendComplete?.(sendData);
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

  if (!connectionAddress) return null;

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent
        side="bottom"
        className="max-h-[90vh] min-h-[70vh]"
      >
        <SheetHeader>
          {!showSuccess && <SheetTitle>Send Bubbles to {connectionUser.displayName}</SheetTitle>}
        </SheetHeader>

        {!showSuccess ? (
          <div className="space-y-6 p-6 pt-2">
            {/* Bubble Type Selection */}
            <div>
              <div className="grid grid-cols-2 gap-3">
                {BUBBLE_TYPES.map((bubbleType) => (
                  <motion.button
                    key={bubbleType.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedBubbleType(bubbleType)}
                    className={`rounded-2xl border-2 p-4 transition-all duration-200 ${
                      selectedBubbleType.name === bubbleType.name
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Bubble
                        type={bubbleType}
                        size="md"
                        variant="default"
                      />
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
              <h3 className="mb-4 text-lg font-bold text-slate-800">Amount</h3>
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
                  <div className="text-sm text-slate-600">bubble{bubbleAmount > 1 ? "s" : ""}</div>
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
            <div className="skeu-card rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Total Value:</span>
                <span className="text-xl font-bold text-slate-800">${totalValue}</span>
              </div>
            </div>

            {/* Send Button */}
            <Button
              onClick={handleSend}
              disabled={isSending}
              className="skeu-button group relative h-16 w-full rounded-3xl"
            >
              <Gift className="mr-2 h-5 w-5" />
              <span className="text-lg font-medium">
                {isSending
                  ? "Sending..."
                  : `Send ${bubbleAmount} ${selectedBubbleType.name} Bubble${bubbleAmount > 1 ? "s" : ""}`}
              </span>
              <div className="absolute inset-0 -translate-x-full rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Button>
          </div>
        ) : (
          /* Success Animation */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-full space-y-6 p-6 pt-2 text-center"
          >
            {/* Floating Bubbles Animation */}
            <FloatingBubbles selectedBubbleType={selectedBubbleType} />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="mb-2 text-2xl font-bold text-slate-800">Bubbles Sent! 🎉</h2>
              <p className="text-lg text-slate-600">
                Sent {bubbleAmount} {selectedBubbleType.name} bubble{bubbleAmount > 1 ? "s" : ""} to{" "}
                {connectionUser.displayName}
              </p>
              <p className="mt-2 text-sm text-slate-500">They'll receive ${totalValue} in their preferred token</p>
            </motion.div>
          </motion.div>
        )}
      </SheetContent>
    </Sheet>
  );
}

const FloatingBubbles = memo(({ selectedBubbleType }: { selectedBubbleType: BubbleType }) => {
  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      {[...Array(15)].map((_, i) => {
        const randomX = Math.random() * 80 + 10; // 10% to 90%
        const randomDelay = Math.random() * 1.5; // 0 to 1.5s delay
        const randomDuration = 1.5 + Math.random() * 1; // 1.5s to 2.5s duration
        const randomScale = 0.8 + Math.random() * 0.4; // 0.8 to 1.2 scale

        return (
          <motion.div
            key={i}
            initial={{
              y: 300,
              opacity: 0,
              scale: 0,
              x: randomX + "%",
            }}
            animate={{
              y: -150,
              opacity: [0, 1, 1, 0],
              scale: [0, randomScale, randomScale, 0],
            }}
            transition={{
              duration: randomDuration,
              delay: randomDelay,
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: Math.random() * 2 + 1,
            }}
            className="absolute"
            style={{
              left: `${randomX}%`,
            }}
          >
            <Bubble
              type={selectedBubbleType}
              size="sm"
              variant="default"
            />
          </motion.div>
        );
      })}
    </div>
  );
});
