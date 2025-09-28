"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Zap } from "lucide-react";
import { NFCScanner } from "@/components/nfc-scanner";
import { SendBubbleSheet } from "@/components/send-bubble-sheet";
import { toast } from "sonner";

export function ScanTab() {
  const [scannedUser, setScannedUser] = useState<{
    address: string;
    ensName?: string;
    avatar?: string;
  } | null>(null);
  const [isSendSheetOpen, setIsSendSheetOpen] = useState(false);

  const handleScanSuccess = (user: { address: string; ensName?: string; avatar?: string }) => {
    setScannedUser(user);
    setIsSendSheetOpen(true);
  };

  const handleSendComplete = (data: any) => {
    console.log("Bubble sent via scan:", data);
    // You could add the user to connections here
    toast.success(`Bubble sent successfully!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex h-full items-center justify-center p-6"
    >
      <div className="skeu-card w-full max-w-md space-y-8 rounded-3xl p-8 text-center">
        {/* Header */}
        <div>
          <h2
            className="mb-4 text-2xl font-bold text-slate-800"
            style={{
              textShadow: "0 2px 4px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
            }}
          >
            Scan NFC Tag
          </h2>
          <p className="leading-relaxed text-slate-600">
            Tap your phone against someone&apos;s NFC wristband to connect and send bubbles.
          </p>
        </div>

        {/* NFC Scanner Component */}
        <NFCScanner
          onScanSuccess={handleScanSuccess}
          buttonText="Start Scanning"
          buttonIcon={<Zap className="h-5 w-5" />}
          buttonSize="lg"
          buttonClassName="skeu-button w-full h-16 rounded-3xl relative group"
          showAnimation={true}
        />

        {/* Send Bubble Sheet */}
        <SendBubbleSheet
          open={isSendSheetOpen}
          onOpenChange={setIsSendSheetOpen}
          connectionAddress={scannedUser?.address as `0x${string}` || null}
          onSendComplete={handleSendComplete}
        />
      </div>
    </motion.div>
  );
}