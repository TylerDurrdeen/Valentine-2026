"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";

interface QuizStepperProps {
  onComplete: () => void;
}

const questions = [
  {
    id: 1,
    question: "Mi a kedvenc étele az uradnak?",
    options: ["Carbonara", "Pizza", "Hamburger", "Saláta"],
    correctAnswer: "Carbonara",
  },
  {
    id: 2,
    question: "Kinek a Carbonaraja a legfinomabb?",
    options: ["Éttermi", "Amit a Bébi csinál", "Amit a macskák csinálnak", "szar az összes"],
    correctAnswer: "Amit a Bébi csinál",
  },
  {
    id: 3,
    question: "Mikor fog az uram legközelebb Carbonarat enni??",
    options: ["Valentin napon", "Soha többet", "Minden reggel fagyival", "most azonnal"],
    correctAnswer: "Valentin napon",
  },
];

export default function QuizStepper({ onComplete }: QuizStepperProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentQuestion = questions[currentStep];

  const handleNext = () => {
    if (selectedOption) {
      // Check if the selected answer is correct
      if (selectedOption !== currentQuestion.correctAnswer) {
        setError(true);
        setTimeout(() => setError(false), 2000);
        return;
      }

      setAnswers([...answers, selectedOption]);
      setSelectedOption(null);
      setError(false);

      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        onComplete();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setSelectedOption(answers[currentStep - 1] || null);
      setAnswers(answers.slice(0, -1));
    }
  };

  return (
    <Card className="w-[85vw] sm:w-[75vw] sm:max-w-[500px] mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <CardTitle>Kérdőív</CardTitle>
          <span className="text-sm text-muted-foreground">
            {currentStep + 1} / {questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>

      <CardContent className="space-y-4">
        <CardDescription className="text-base font-medium text-foreground">
          {currentQuestion.question}
        </CardDescription>

        {error && (
          <p className="text-red-600 text-sm text-center font-medium animate-pulse">
            Azért ettől tán csak jobban ismersz...
          </p>
        )}

        <div className="space-y-2">
          {currentQuestion.options.map((option) => (
            <Button
              key={option}
              variant={selectedOption === option ? "default" : "outline"}
              className="w-full justify-start text-left h-auto py-3"
              onClick={() => setSelectedOption(option)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedOption === option
                      ? "border-primary bg-primary"
                      : "border-muted-foreground"
                  }`}
                >
                  {selectedOption === option && (
                    <Check className="w-3 h-3 text-primary-foreground" />
                  )}
                </div>
                <span>{option}</span>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          Vissza
        </Button>
        <Button
          onClick={handleNext}
          disabled={!selectedOption}
          className="bg-pink-500 hover:bg-pink-600"
        >
          {currentStep === questions.length - 1 ? "Befejezés" : "Tovább"}
        </Button>
      </CardFooter>
    </Card>
  );
}
