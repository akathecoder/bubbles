"use client";

import { motion } from "motion/react";
import { Sparkles, Heart, Zap, Waves } from "lucide-react";
import { Button } from "../components/ui/button";
import { useDynamicContext, useSocialAccounts } from "@dynamic-labs/sdk-react-core";
import { ProviderEnum } from "@dynamic-labs/types";
import { redirect } from "next/navigation";
import { memo } from "react";
import { HeroBubbles } from "../components/hero-bubbles";

function WelcomeScreen() {
  const { error, isProcessing, signInWithSocialAccount } = useSocialAccounts();
  const { user } = useDynamicContext();

  const handleProceed = () => {
    signInWithSocialAccount(ProviderEnum.Google);
  };

  if (user) {
    redirect("/onboarding/create-profile");
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-6"
    >
      {/* Premium background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />
      <div className="texture-noise absolute top-0 left-0 h-full w-full" />

      {/* Floating ambient bubbles */}
      {/* {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className={`skeu-bubble absolute rounded-full ${
            i % 6 === 0
              ? "bubble-pink"
              : i % 6 === 1
                ? "bubble-blue"
                : i % 6 === 2
                  ? "bubble-green"
                  : i % 6 === 3
                    ? "bubble-orange"
                    : i % 6 === 4
                      ? "bubble-purple"
                      : "bubble-teal"
          }`}
          style={{
            width: `${20 + i * 8}px`,
            height: `${20 + i * 8}px`,
            top: `${10 + i * 15}%`,
            left: `${5 + i * 15}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 6 + i,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.8,
            ease: "easeInOut",
          }}
        />
      ))} */}

      {/* Main content */}
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
          delay: 0.2,
        }}
        className="relative z-10 mb-16 text-center"
      >
        {/* Hero bubble logo */}
        <HeroBubbles />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="font-borel my-24 align-text-bottom text-7xl leading-2 font-bold tracking-tight text-slate-800"
          style={{
            textShadow: "0 2px 4px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
          }}
        >
          Bubbles
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mx-auto max-w-lg text-xl leading-relaxed font-medium text-slate-600"
        >
          Send compliments that carry real value. <br /> Connect IRL, spread joy, and make meaningful moments count.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 1.4,
          duration: 0.6,
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        className="relative z-10"
      >
        <Button
          onClick={handleProceed}
          size="lg"
          className="skeu-button font-borel h-16 rounded-3xl"
        >
          <span className="-mb-2 align-text-bottom text-xl leading-0">Spread Some Joy! ✨</span>
          {/* Button shimmer effect */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </Button>
      </motion.div>
    </motion.div>
  );
}

export default WelcomeScreen;

// {
//   /* Premium feature cards */
// }
// <motion.div
//   initial={{ opacity: 0, y: 40 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ delay: 0.9, duration: 0.6 }}
//   className="relative z-10 mb-16 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3"
// >
//   {[
//     {
//       icon: Waves,
//       title: "NFC Magic",
//       desc: "Tap wristbands to connect instantly",
//       color: "bubble-blue",
//     },
//     {
//       icon: Heart,
//       title: "Real Value",
//       desc: "Compliments with crypto rewards",
//       color: "bubble-pink",
//     },
//     {
//       icon: Zap,
//       title: "Cross-Chain",
//       desc: "Pay and receive in any token",
//       color: "bubble-orange",
//     },
//   ].map((feature, i) => (
//     <motion.div
//       key={i}
//       initial={{ opacity: 0, y: 30, scale: 0.95 }}
//       animate={{ opacity: 1, y: 0, scale: 1 }}
//       transition={{
//         delay: 1.1 + i * 0.1,
//         duration: 0.6,
//         type: "spring",
//         stiffness: 200,
//         damping: 20,
//       }}
//       whileHover={{
//         y: -4,
//         transition: { duration: 0.2 },
//       }}
//       className="skeu-card group relative cursor-pointer overflow-hidden rounded-3xl p-8 text-center"
//     >
//       {/* Icon with premium treatment */}
//       <div
//         className={`mx-auto mb-6 h-16 w-16 ${feature.color} relative flex items-center justify-center overflow-hidden rounded-2xl`}
//       >
//         <feature.icon className="relative z-10 h-8 w-8 text-white" />
//         <div className="absolute inset-1 rounded-xl bg-white/20" />
//       </div>

//       <h3 className="mb-3 text-lg font-bold text-slate-800">{feature.title}</h3>
//       <p className="leading-relaxed text-slate-600">{feature.desc}</p>

//       {/* Hover shimmer effect */}
//       <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
//     </motion.div>
//   ))}
// </motion.div>;
