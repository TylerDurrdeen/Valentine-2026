"use client";

import { useState } from "react";
import ImageCaptcha from "@/components/ImageCaptcha";
import QuizStepper from "@/components/QuizStepper";
import Conversation from "@/components/Conversation";
import FinalStage from "@/components/FinalStage";
import { WarpBackground } from "@/components/ui/warp-background";

export default function Home() {
  const [stage, setStage] = useState<"captcha" | "quiz" | "conversation" | "final">("captcha");

  return (
    <WarpBackground className="h-screen w-screen flex items-center justify-center border-0 bg-background" beamDuration={8} beamsPerSide={4} beamDelayMax={10} beamDelayMin={0} beamSize={10}>
      <main className="w-full h-full flex items-center justify-center">
        {stage === "captcha" && (
          <ImageCaptcha onComplete={() => setStage("quiz")} />
        )}
        {stage === "quiz" && (
          <QuizStepper onComplete={() => setStage("conversation")} />
        )}
        {stage === "conversation" && (
          <Conversation onComplete={() => setStage("final")} />
        )}
        {stage === "final" && (
          <FinalStage />
        )}
      </main>
    </WarpBackground>
  );
}
