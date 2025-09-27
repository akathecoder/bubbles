import { memo } from "react";
import { motion } from "motion/react";

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
            { color: "bubble-pink", size: "w-12 h-12", angle: 0, emote: "💝" },
            { color: "bubble-blue", size: "w-10 h-10", angle: 120, emote: "🧠" },
            { color: "bubble-green", size: "w-8 h-8", angle: 240, emote: "🌱" },
            { color: "bubble-yellow", size: "w-16 h-16", angle: 300, emote: "💪" },
          ].map((bubble, i) => (
            <motion.div
              key={i}
              className={`absolute ${bubble.size} ${bubble.color} flex items-center justify-center rounded-full text-xl`}
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
              <span>{bubble.emote}</span>
              <div className="absolute inset-1 rounded-full bg-white/30" />
              <div className="absolute top-2 left-2 h-1 w-1 rounded-full bg-white/60 blur-sm" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
});
