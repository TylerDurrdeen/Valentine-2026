"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, RefreshCw } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

interface ImageCaptchaProps {
  onComplete: () => void;
}

export default function ImageCaptcha({ onComplete }: ImageCaptchaProps) {
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [error, setError] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [password, setPassword] = useState("");

  const imageOrder = useMemo(() => {
    const images = [
      { index: 0, type: 'good', number: 1 },
      { index: 1, type: 'good', number: 2 },
      { index: 2, type: 'good', number: 3 },
      { index: 3, type: 'good', number: 4 },
      { index: 4, type: 'good', number: 5 },
      { index: 5, type: 'bad', number: 1 },
      { index: 6, type: 'bad', number: 2 },
      { index: 7, type: 'bad', number: 3 },
      { index: 8, type: 'bad', number: 4 },
    ];
    return images.sort(() => Math.random() - 0.5);
  }, []);

  const correctImages = imageOrder.filter(img => img.type === 'good').map(img => img.index);

  const passwordCriteria = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
  };

  const toggleImage = (index: number) => {
    setError(false);
    if (selectedImages.includes(index)) {
      setSelectedImages(selectedImages.filter((i) => i !== index));
    } else {
      setSelectedImages([...selectedImages, index]);
    }
  };

  const handleVerify = () => {
    const isCorrect =
      selectedImages.length === correctImages.length &&
      selectedImages.every((img) => correctImages.includes(img));

    if (isCorrect) {
      onComplete();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  if (!showCaptcha) {
    return (
      <Card className="w-[85vw] sm:w-[75vw] sm:max-w-[500px] mx-auto">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-pink-500/20 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="min-w-[130%] min-h-[130%] object-cover scale-110"
            >
              <source src="/WhatsApp Video 2026-02-11 at 23.57.33.mp4" type="video/mp4" />
            </video>
          </div>
          <CardTitle>Valentin nap</CardTitle>
          <CardDescription>Hozd létre a fiókod</CardDescription>
        </CardHeader>
        <CardContent>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Teljes név</label>
            <Input type="text" placeholder="Mondjuk Dorka" className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email</label>
            <Input type="email" placeholder="gádzsi@example.com" className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Jelszó</label>
            <Input 
              type="password" 
              placeholder="••••••••" 
              className="w-full" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="mt-2 text-xs space-y-1">
              <p className={`flex items-center gap-1 transition-colors ${passwordCriteria.minLength ? 'text-green-600' : 'text-muted-foreground'}`}>
                <span>{passwordCriteria.minLength ? '✓' : '•'}</span> Legalább 8 karakter
              </p>
              <p className={`flex items-center gap-1 transition-colors ${passwordCriteria.hasUppercase ? 'text-green-600' : 'text-muted-foreground'}`}>
                <span>{passwordCriteria.hasUppercase ? '✓' : '•'}</span> Hogy mennyire szereted az uradat
              </p>
              <p className={`flex items-center gap-1 transition-colors ${passwordCriteria.hasNumber ? 'text-green-600' : 'text-muted-foreground'}`}>
                <span>{passwordCriteria.hasNumber ? '✓' : '•'}</span> Egy szám
              </p>
            </div>
          </div>

          <div className="border border-border rounded bg-muted p-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div 
                    className={`w-7 h-7 border-2 rounded cursor-pointer transition-all ${
                      isChecked ? 'bg-[#1a73e8] border-[#1a73e8]' : 'bg-card border-border hover:border-muted-foreground'
                    }`}
                    onClick={() => {
                      if (!isChecked && !isLoading) {
                        setIsLoading(true);
                        setTimeout(() => {
                          setIsLoading(false);
                          setIsChecked(true);
                          setTimeout(() => setShowCaptcha(true), 300);
                        }, 1000);
                      }
                    }}
                  >
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Spinner className="w-4 h-4 text-[#1a73e8]" />
                      </div>
                    )}
                    {isChecked && !isLoading && (
                      <svg 
                        className="w-full h-full text-white animate-checkmark" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="3"
                      >
                        <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </div>
                <label className="text-sm text-foreground cursor-pointer select-none font-normal">
                  Nem vagyok robot
                </label>
              </div>
              <div className="flex items-center gap-1.5">
                <Image
                  src="/ReCAPTCHA_icon.svg"
                  alt="reCAPTCHA"
                  width={32}
                  height={32}
                />
                <div className="text-[9px] text-muted-foreground leading-tight">
                  <div>reCAPTCHA</div>
                  <div className="flex gap-1">
                    <a href="#" className="hover:underline">Privacy</a>
                    <span>-</span>
                    <a href="#" className="hover:underline">Terms</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Button className="w-full bg-pink-500 hover:bg-pink-600" disabled>
            Regisztráció
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Van már fiókod? <span className="text-pink-500 cursor-pointer">Bejelentkezés</span>
        </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-xl mx-auto overflow-hidden p-0 gap-0">
      <div className="bg-pink-500 text-white p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
            <Check className="w-4 h-4 text-pink-500" />
          </div>
          <span className="font-medium text-sm">Igazold, hogy asszony vagy</span>
        </div>
        <button onClick={() => window.location.reload()} className="hover:bg-pink-600 p-1 rounded">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <CardContent className="p-4">
        <p className="text-sm font-medium text-foreground mb-3">
          Válaszd ki az összes négyzetet, amelyiken <strong>a legkomolyabb bika</strong> van
        </p>
        <p className="text-xs text-muted-foreground mb-4">
          Ha nincs ilyen, kattints a kihagyásra
        </p>

        <div className="grid grid-cols-3 gap-1 mb-4 bg-muted p-1 rounded">
          {imageOrder.map((img) => {
            const imageSrc = img.type === 'good' 
              ? `/good-${img.number}.jpeg`
              : `/bad-${img.number}.jpeg`;
            
            return (
              <button
                key={img.index}
                onClick={() => toggleImage(img.index)}
                className={`aspect-square relative overflow-hidden bg-white transition-all ${
                  selectedImages.includes(img.index) ? "ring-2 ring-inset ring-pink-500" : ""
                } ${error && selectedImages.includes(img.index) && !correctImages.includes(img.index) ? "animate-shake ring-inset ring-red-500" : ""}`}
              >
                <Image
                  src={imageSrc}
                  alt={`Image ${img.index + 1}`}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = 'w-full h-full bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center text-4xl';
                      fallback.textContent = img.type === 'good' ? '😍' : '🌹';
                      parent.appendChild(fallback);
                    }
                  }}
                />
                {selectedImages.includes(img.index) && (
                  <div className="absolute inset-0 bg-pink-500/20 flex items-center justify-center">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {error && (
          <p className="text-red-600 text-sm text-center mb-3 font-medium animate-pulse">
            Próbáld újra. Válaszd ki az összes négyzetet a falu bikájával.
          </p>
        )}

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setSelectedImages([])}
          >
            Kihagyás
          </Button>
          <Button
            onClick={handleVerify}
            className="flex-1 bg-pink-500 hover:bg-pink-600"
            disabled={selectedImages.length === 0}
          >
            Ellenőrzés
          </Button>
        </div>

        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Image
              src="/ReCAPTCHA_icon.svg"
              alt="reCAPTCHA"
              width={35}
              height={35}
            />
          </div>
          <div className="flex gap-3">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
