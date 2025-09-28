"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Zap, Plus, Scan } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web";

import { Button } from "@/components/ui/button";
import { NFCAnimation } from "@/components/ui/nfc-animation";

interface ScannedUser {
  address: string;
  ensName?: string;
  avatar?: string;
}

interface NFCScannerProps {
  onScanSuccess?: (user: ScannedUser) => void;
  onScanError?: (error: string) => void;
  buttonText?: string;
  buttonIcon?: React.ReactNode;
  buttonVariant?: "default" | "outline" | "ghost";
  buttonSize?: "sm" | "md" | "lg";
  buttonClassName?: string;
  showAnimation?: boolean;
  disabled?: boolean;
}

export function NFCScanner({
  onScanSuccess,
  onScanError,
  buttonText = "Scan NFC",
  buttonIcon = <Scan className="h-4 w-4" />,
  buttonVariant = "default",
  buttonSize = "md",
  buttonClassName = "skeu-button rounded-2xl relative group",
  showAnimation = false,
  disabled = false,
}: NFCScannerProps) {
  const {
    data: nfcData,
    isPending: isScanning,
    error: nfcError,
    mutateAsync: getNfcAddress,
  } = useMutation({
    mutationKey: ["nfc-scan"],
    mutationFn: async () => {
      const nfcAddress = (await execHaloCmdWeb({
        name: "get_pkeys",
      })) as Promise<{ etherAddresses: Record<string, `0x${string}`> }>;
      return (await nfcAddress).etherAddresses["1"];
    },
    onSuccess: async (address) => {
      toast.success("NFC scan successful!");

      // Mock ENS lookup - in real app, you'd call ENS resolver
      const mockEnsName = `user-${address.slice(-4)}.eth`;
      const mockAvatar = ["👼", "👨‍💻", "👩‍⚖️", "🦹‍♀️", "🤖", "🧸"][Math.floor(Math.random() * 6)];

      const scannedUser: ScannedUser = {
        address,
        ensName: mockEnsName,
        avatar: mockAvatar,
      };

      onScanSuccess?.(scannedUser);
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : String(error);
      toast.error(`Scan failed: ${errorMessage}`);
      onScanError?.(errorMessage);
    },
  });

  const handleScan = () => {
    getNfcAddress();
  };

  const buttonSizeClasses = {
    sm: "h-10 px-4 text-sm",
    md: "h-12 px-6",
    lg: "h-16 px-8 text-lg",
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Scanning Animation (optional) */}
      {showAnimation && isScanning && <NFCAnimation size="md" />}

      {/* Scan Button */}
      <Button
        onClick={handleScan}
        disabled={isScanning || disabled}
        variant={buttonVariant}
        className={`${buttonSizeClasses[buttonSize]} ${buttonClassName}`}
      >
        {buttonIcon}
        <span className={buttonSize === "lg" ? "font-borel -mb-4 ml-2 align-text-bottom" : "ml-2"}>
          {isScanning ? "Scanning..." : buttonText}
        </span>

        {/* Shimmer effect for skeu-button */}
        {buttonClassName.includes("skeu-button") && (
          <div className="absolute inset-0 -translate-x-full rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        )}
      </Button>

      {/* Scanning Status Text */}
      {isScanning && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-slate-600"
        >
          Hold your NFC device close to the back of your phone
        </motion.p>
      )}
    </div>
  );
}
