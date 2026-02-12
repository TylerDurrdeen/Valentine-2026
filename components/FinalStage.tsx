"use client";

import { useState, useRef } from "react";
import { motion } from "motion/react";
import { ScratchToReveal } from "@/components/magicui/scratch-to-reveal";
import { LampHeading } from "@/components/ui/lamp-heading";
import confetti from "canvas-confetti";

export default function FinalStage() {
  const [nemPosition, setNemPosition] = useState({ x: 0, y: 0 });
  const [moveCount, setMoveCount] = useState(0);
  const [igenScratched, setIgenScratched] = useState(false);

  const handleNemInteraction = () => {
    // Move the NEM card to a random position far away
    const randomX = (Math.random() - 0.5) * 800;
    const randomY = (Math.random() - 0.5) * 600;
    setNemPosition({ x: randomX, y: randomY });
    setMoveCount((prev) => prev + 1);
  };

  const handleIgenComplete = () => {
    if (!igenScratched) {
      setIgenScratched(true);
      // Fire confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF0080', '#FF4080', '#8000FF', '#FF69B4', '#DA70D6'],
      });
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4 md:gap-8 px-4 md:px-8 py-8">
      <div className="text-center mb-4 md:mb-8">
        <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 via-pink-300 to-purple-500 bg-clip-text text-transparent mb-4">
          Elviszlek randizni vajon?
        </h1>
        <div className="w-full max-w-md mx-auto h-1 bg-gradient-to-r from-pink-500 via-pink-300 to-purple-500 rounded-full shadow-lg shadow-pink-500/50" />
      </div>
      
      <p className="text-muted-foreground text-base md:text-lg text-center -mt-2 md:-mt-4 px-4">
        Ha lekaparod a jó megoldást elviszlek Bébi
      </p>

      <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center w-full max-w-4xl">
        {/* IGEN Card */}
        <div className="relative">
          <ScratchToReveal
            width={140}
            height={200}
            minScratchPercentage={50}
            className="flex items-center justify-center overflow-hidden rounded-2xl border-2 border-border"
            gradientColors={["#A97CF8", "#F38CB8", "#FDCC92"]}
            onComplete={handleIgenComplete}
          >
            <div className="flex h-full w-full items-center justify-center bg-pink-500 text-white">
              <p className="text-4xl font-bold">IGEN</p>
            </div>
          </ScratchToReveal>
        </div>

        {/* NEM Card - moves away on hover/click (desktop only) */}
        <motion.div
          className="relative"
          animate={{
            x: nemPosition.x,
            y: nemPosition.y,
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 25,
            duration: 0.8,
          }}
          onMouseEnter={handleNemInteraction}
          onTouchStart={(e) => {
            e.preventDefault();
            handleNemInteraction();
          }}
        >
          <ScratchToReveal
            width={140}
            height={200}
            minScratchPercentage={50}
            className="flex items-center justify-center overflow-hidden rounded-2xl border-2 border-border cursor-pointer"
            gradientColors={["#A97CF8", "#F38CB8", "#FDCC92"]}
          >
            <div className="flex h-full w-full items-center justify-center bg-gray-500 text-white">
              <p className="text-4xl font-bold">NEM</p>
            </div>
          </ScratchToReveal>
        </motion.div>
      </div>

    </div>
  );
}
