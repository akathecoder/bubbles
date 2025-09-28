"use client";

import { motion } from "motion/react";

interface NFCAnimationProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showDelay?: boolean;
}

export function NFCAnimation({
  className = "mb-8",
  size = "md",
  showDelay = true
}: NFCAnimationProps) {
  const sizeClasses = {
    sm: "h-24 w-24",
    md: "h-32 w-32",
    lg: "h-40 w-40"
  };

  const iconSizes = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-5xl"
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: showDelay ? 0.2 : 0, duration: 0.6 }}
      className={className}
    >
      <div className={`relative mx-auto ${sizeClasses[size]}`}>
        <div className={`skeu-card flex ${sizeClasses[size]} items-center justify-center rounded-full border-4 border-blue-200`}>
          <div className={`animate-pulse ${iconSizes[size]}`}>📱</div>
        </div>
        <div className="absolute inset-0 animate-ping rounded-full border-4 border-blue-500 opacity-20"></div>
        <div className="absolute inset-2 animate-ping rounded-full border-4 border-purple-500 opacity-30" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </motion.div>
  );
}