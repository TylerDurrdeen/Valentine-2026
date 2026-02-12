"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface LampHeadingProps {
  text: string;
  textSize?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  className?: string;
  direction?: "above" | "below";
  showLightRays?: boolean;
  showParticles?: boolean;
  gradientColors?: {
    from: string;
    via?: string;
    to: string;
  };
  lineHeight?: number;
  lampHeight?: number;
  glowIntensity?: number;
  glowSize?: number;
  animationSpeed?: number;
  interactive?: boolean;
  pulseEffect?: boolean;
}

const TEXT_SIZE_CLASSES = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
} as const;

export function LampHeading({
  text,
  textSize = "4xl",
  className,
  direction = "below",
  showLightRays = false,
  showParticles = true,
  gradientColors = { from: "#FF33C7", via: "#CD35FF", to: "#4533F7" },
  lineHeight = 4,
  lampHeight = 80,
  glowIntensity = 1.0,
  glowSize = 30,
  animationSpeed = 4,
  interactive = true,
  pulseEffect = true,
}: LampHeadingProps) {
  const gradientString = useMemo(
    () =>
      gradientColors.via
        ? `linear-gradient(90deg, ${gradientColors.from}, ${gradientColors.via}, ${gradientColors.to})`
        : `linear-gradient(90deg, ${gradientColors.from}, ${gradientColors.to})`,
    [gradientColors]
  );

  const flowAnimation = {
    backgroundPosition: ["0% 50%", "200% 50%"],
  };

  const pulseAnimation = pulseEffect
    ? {
        scale: [1, 1.02, 1],
        opacity: [0.95, 1, 0.95],
      }
    : {};

  return (
    <motion.div className={cn("flex flex-col items-start relative overflow-visible", className)}>
      <h2 className={cn("font-bold tracking-wide relative z-20 mb-3", TEXT_SIZE_CLASSES[textSize])}>
        {text}
      </h2>

      <div className="w-full relative">
        {/* Main gradient underline */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 50%", "200% 50%"],
            ...pulseAnimation,
          }}
          transition={{
            backgroundPosition: {
              duration: animationSpeed,
              ease: "linear",
              repeat: Infinity,
            },
            scale: {
              duration: animationSpeed * 0.6,
              ease: "easeInOut",
              repeat: Infinity,
            },
            opacity: {
              duration: animationSpeed * 0.6,
              ease: "easeInOut",
              repeat: Infinity,
            },
          }}
          className="w-full"
          style={{
            height: `${lineHeight}px`,
            background: gradientString,
            backgroundSize: "200% 100%",
            borderRadius: "50px",
            boxShadow: `0 0 ${glowSize}px ${gradientColors.from}80, 0 0 ${glowSize * 2}px ${gradientColors.to}40, 0 0 ${glowSize * 3}px ${gradientColors.from}20`,
            position: "relative",
            zIndex: 10,
          }}
        />

        {/* Inner highlight */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 50%", "200% 50%"],
          }}
          transition={{
            duration: animationSpeed * 0.8,
            ease: "linear",
            repeat: Infinity,
          }}
          className="bg-gradient-to-b from-white via-white/50 to-transparent"
          style={{
            height: `${Math.max(1, lineHeight * 0.1)}px`,
            width: "98%",
            position: "absolute",
            top: "0px",
            left: "1%",
            zIndex: 15,
            borderRadius: "100px",
            backgroundSize: "200% 100%",
          }}
        />
      </div>
    </motion.div>
  );
}
