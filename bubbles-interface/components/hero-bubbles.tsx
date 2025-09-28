import { memo } from "react";
import { motion } from "motion/react";
import { BUBBLE_TYPES } from "@/lib/bubbles";
import Bubble from "./ui/bubble";

export const HeroBubbles = memo(() => {
  return (
    <div className="relative mb-16">
      <motion.div
        className="relative mx-auto h-40 w-40"
        animate={{
          rotate: [0, 2, -2, 0],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        {/* Main hero bubble with premium skeumorphic treatment */}
        <div className="skeu-bubble absolute inset-0 overflow-hidden rounded-full">
          {/* Inner bubble with realistic depth */}
          <div className="absolute inset-3 rounded-full bg-gradient-to-br from-white/40 via-transparent to-black/5" />
          {/* Highlight spot */}
          <div className="absolute top-8 left-8 h-6 w-6 rounded-full bg-white/70 blur-sm" />
          {/* Secondary highlight */}
          <div className="absolute top-12 left-12 h-3 w-3 rounded-full bg-white/50 blur-sm" />
          {/* Shimmer effect */}
          <div className="animate-shimmer-premium absolute inset-0 rounded-full" />
        </div>

        <div className="relative h-full w-full p-8">
          {/* Orbiting premium bubbles */}
          {[
            { type: BUBBLE_TYPES[0], size: "w-12 h-12", angle: 0 },
            { type: BUBBLE_TYPES[1], size: "w-10 h-10", angle: 120 },
            { type: BUBBLE_TYPES[2], size: "w-8 h-8", angle: 240 },
            { type: BUBBLE_TYPES[3], size: "w-16 h-16", angle: 300 },
          ].map((bubble, i) => (
            <motion.div
              key={i}
              className={`absolute ${bubble.size} flex items-center justify-center rounded-full text-xl`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transformOrigin: "-50% -50%",
              }}
              animate={{
                rotate: [bubble.angle, bubble.angle + 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: {
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
                scale: {
                  duration: 3 + i,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
              }}
            >
              <Bubble type={bubble.type} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
});
