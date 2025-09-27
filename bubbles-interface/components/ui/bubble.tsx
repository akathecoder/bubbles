import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { BubbleType } from "@/lib/bubbles";
import Image from "next/image";

export interface BubbleProps {
  type: BubbleType;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "premium" | "flat";
  animate?: boolean;
  interactive?: boolean;
  showValue?: boolean;
  className?: string;
  onClick?: () => void;
}

const sizeClasses = {
  sm: "h-8 w-8 text-sm",
  md: "h-12 w-12 text-xl",
  lg: "h-16 w-16 text-2xl",
  xl: "h-20 w-20 text-3xl",
};

// Mapping of bubble types to transparent sticker assets
const bubbleAssets: Record<string, string> = {
  "Kind": "/heart-transparent.png",
  "Insightful": "/brain-transparent.png",
  "Cool": "/hug-transparent.png",
  "Inspiring": "/heart-transparent.png", // fallback to heart for now
};

const Bubble = ({
  type,
  size = "md",
  variant = "default",
  animate = false,
  interactive = false,
  showValue = false,
  className,
  onClick,
}: BubbleProps) => {
  const bubbleContent = (
    <>
      {/* Main bubble */}
      <div
        className={cn(
          "relative flex items-center justify-center rounded-full",
          `bg-gradient-to-br ${type.color}`,
          sizeClasses[size],
          interactive && "cursor-pointer transition-transform hover:scale-105",
          className
        )}
        onClick={onClick}
      >
        {/* Layered bubble background */}
        <div className="absolute inset-0 rounded-full">
          {/* Base bubble texture */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-transparent to-black/10" />

          {/* Premium variant effects */}
          {variant === "premium" && (
            <>
              {/* Inner bubble with realistic depth */}
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/40 via-transparent to-black/5" />
              {/* Primary highlight spot */}
              <div className={cn(
                "absolute rounded-full bg-white/80 blur-sm",
                size === "sm" ? "top-1 left-1 h-1 w-1" :
                size === "md" ? "top-2 left-2 h-2 w-2" :
                size === "lg" ? "top-3 left-3 h-3 w-3" :
                "top-4 left-4 h-4 w-4"
              )} />
              {/* Secondary highlight */}
              <div className={cn(
                "absolute rounded-full bg-white/60 blur-sm",
                size === "sm" ? "top-1.5 left-1.5 h-0.5 w-0.5" :
                size === "md" ? "top-3 left-3 h-1 w-1" :
                size === "lg" ? "top-4 left-4 h-1.5 w-1.5" :
                "top-5 left-5 h-2 w-2"
              )} />
              {/* Rim lighting */}
              <div className="absolute inset-0 rounded-full ring-1 ring-white/20 ring-inset" />
            </>
          )}
        </div>

        {/* Default variant inner glow */}
        {variant === "default" && (
          <div className="absolute inset-1 rounded-full bg-white/20" />
        )}

        {/* Sticker overlay (if available) or emoji fallback */}
        {bubbleAssets[type.name] ? (
          <div className="relative z-10 flex items-center justify-center">
            <Image
              src={bubbleAssets[type.name]}
              alt={type.name}
              width={size === "sm" ? 20 : size === "md" ? 28 : size === "lg" ? 36 : 44}
              height={size === "sm" ? 20 : size === "md" ? 28 : size === "lg" ? 36 : 44}
              className="drop-shadow-sm"
            />
          </div>
        ) : (
          <span className="relative z-10 select-none">{type.emoji}</span>
        )}

        {/* Value badge */}
        {showValue && (
          <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-800 shadow-sm">
            ${type.value}
          </div>
        )}
      </div>
    </>
  );

  // Animated wrapper
  if (animate) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={interactive ? { scale: 1.1 } : undefined}
        whileTap={interactive ? { scale: 0.95 } : undefined}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
      >
        {bubbleContent}
      </motion.div>
    );
  }

  return bubbleContent;
};

// Floating animated bubble variant
export const FloatingBubble = ({
  type,
  size = "md",
  delay = 0,
  duration = 6,
  className,
}: Omit<BubbleProps, "animate" | "variant"> & {
  delay?: number;
  duration?: number;
}) => {
  return (
    <motion.div
      className={cn("absolute", className)}
      animate={{
        y: [0, -20, 0],
        x: [0, 10, 0],
        scale: [1, 1.05, 1],
        rotate: [0, 2, -2, 0],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        delay,
        ease: "easeInOut",
      }}
    >
      <Bubble type={type} size={size} variant="premium" />
    </motion.div>
  );
};

// Orbiting bubble variant
export const OrbitingBubble = ({
  type,
  size = "md",
  angle = 0,
  radius = 50,
  duration = 20,
  className,
}: Omit<BubbleProps, "animate" | "variant"> & {
  angle?: number;
  radius?: number;
  duration?: number;
}) => {
  return (
    <motion.div
      className={cn("absolute", className)}
      style={{
        transformOrigin: `${radius}px ${radius}px`,
      }}
      animate={{
        rotate: [angle, angle + 360],
        scale: [1, 1.1, 1],
      }}
      transition={{
        rotate: {
          duration,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        },
        scale: {
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        },
      }}
    >
      <Bubble type={type} size={size} variant="premium" />
    </motion.div>
  );
};

// Bubble list item component
export const BubbleListItem = ({
  type,
  title,
  subtitle,
  selected = false,
  onClick,
  className,
}: {
  type: BubbleType;
  title?: string;
  subtitle?: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "bg-slate-50 hover:bg-slate-100 flex items-center gap-4 rounded-2xl p-4 transition-colors border cursor-pointer",
        selected ? "border-blue-300 bg-blue-50" : "border-slate-200",
        className
      )}
      onClick={onClick}
    >
      <Bubble type={type} size="md" interactive={false} />

      <div className="flex-1">
        <div className="font-bold text-slate-800">{title || type.name}</div>
        <div className="text-slate-600 text-sm">{subtitle || type.description}</div>
      </div>

      <div className="text-right">
        <div className="text-sm font-bold text-slate-800">${type.value}</div>
        <div className="text-xs text-slate-500">value</div>
      </div>
    </motion.div>
  );
};

export { Bubble };
export default Bubble;