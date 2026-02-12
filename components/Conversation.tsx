"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: number;
  speaker: "man" | "woman";
  text: string;
}

function TypewriterText({ text, speed = 50 }: { text: string; speed?: number }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    setDisplayedText("");

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText((prev) => prev + text[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText ? <p className="text-lg font-medium">{displayedText}</p> : null;
}

const messages: Message[] = [
  { id: 1, speaker: "man", text: "Na látod, megy ez.." },
  { id: 2, speaker: "woman", text: "Most akkor valentin napon főzzek neked carbonarat???" },
  { id: 3, speaker: "man", text: "Mert nem akarsz nekem főzni valami finomat este?" },
  { id: 4, speaker: "woman", text: "Dehogynem, neked bármit gazdám." },
  { id: 5, speaker: "man", text: "Nagyon helyes!" },
  { id: 6, speaker: "woman", text: "de ez most komoly?" },
  { id: 7, speaker: "man", text: "Chill Bébi.. Foglaltam asztalt." },
  { id: 8, speaker: "woman", text: "Úúúúú.. Elviszel randizni?" },
];

interface ConversationProps {
  onComplete: () => void;
}

export default function Conversation({ onComplete }: ConversationProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    if (currentMessageIndex >= messages.length) {
      // Wait 2 seconds after last message before completing
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 2000);
      return () => clearTimeout(completeTimer);
    }

    const timer = setTimeout(() => {
      setCurrentMessageIndex((prev) => prev + 1);
    }, currentMessageIndex === 0 ? 2000 : 3500);

    return () => clearTimeout(timer);
  }, [currentMessageIndex, onComplete]);

  const displayedMessages = messages.slice(0, currentMessageIndex);
  const currentSpeaker = currentMessageIndex > 0 ? messages[currentMessageIndex - 1].speaker : "man";

  return (
    <div className="w-full h-screen relative">
      {/* Chat bubbles */}
      <div className="fixed left-1/2 -translate-x-1/2 bottom-[50vh] flex flex-col justify-end gap-4 z-[60] w-full max-w-2xl px-8 max-h-[50vh]">
        <AnimatePresence>
          {displayedMessages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: "backOut" }}
              className={`w-fit max-w-md ${
                message.speaker === "man" ? "self-start" : "self-end"
              }`}
            >
              <div
                className={`px-6 py-4 rounded-2xl shadow-xl ${
                  message.speaker === "man"
                    ? "bg-pink-500 text-white rounded-bl-none"
                    : "bg-card text-foreground rounded-br-none border-2 border-border"
                }`}
              >
                <p className="text-lg font-medium">{message.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Man sticker - left bottom edge */}
      <AnimatePresence mode="wait">
        {currentSpeaker === "man" && (
          <motion.div
            key="man"
            initial={{ y: 400, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 400, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed -bottom-12 -left-12 z-50"
          >
            <Image
              src="/man.12"
              alt="Man"
              width={400}
              height={400}
              className="object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Woman sticker - right bottom edge */}
      <AnimatePresence mode="wait">
        {currentSpeaker === "woman" && (
          <motion.div
            key="woman"
            initial={{ y: 400, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 400, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed -bottom-12 -right-12 z-50"
          >
            <Image
              src="/woman.26"
              alt="Woman"
              width={400}
              height={400}
              className="object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
