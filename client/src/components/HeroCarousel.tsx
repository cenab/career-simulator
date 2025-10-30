import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

interface HeroScene {
  id: string;
  title: string;
  tagline: string;
  thumbnail: string;
  difficulty: "easy" | "medium" | "hard";
  duration: number;
  skills: string[];
}

interface HeroCarouselProps {
  scenes: HeroScene[];
  autoAdvance?: boolean;
  interval?: number;
}

export default function HeroCarousel({ scenes, autoAdvance = true, interval = 8000 }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!autoAdvance || isPaused || scenes.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % scenes.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoAdvance, isPaused, interval, scenes.length]);

  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % scenes.length);
  const goToPrev = () => setCurrentIndex((prev) => (prev - 1 + scenes.length) % scenes.length);
  const goToSlide = (index: number) => setCurrentIndex(index);

  const currentScene = scenes[currentIndex];

  return (
    <div
      className="relative h-[400px] rounded-xl overflow-hidden group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      data-testid="hero-carousel"
    >
      <div className="absolute inset-0 transition-all duration-500">
        <img
          src={currentScene.thumbnail}
          alt={currentScene.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      <div className="relative h-full flex items-center px-12">
        <div className="max-w-2xl space-y-4">
          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-primary/20 text-primary-foreground border-primary/30" data-testid="badge-hero-difficulty">
              {currentScene.difficulty.charAt(0).toUpperCase() + currentScene.difficulty.slice(1)}
            </Badge>
            <Badge variant="secondary" className="bg-background/20 backdrop-blur-sm border-white/10 text-white" data-testid="badge-hero-duration">
              {currentScene.duration} minutes
            </Badge>
          </div>

          <h1 className="text-4xl font-bold text-white leading-tight" data-testid="text-hero-title">
            {currentScene.title}
          </h1>
          <p className="text-lg text-white/90" data-testid="text-hero-tagline">
            {currentScene.tagline}
          </p>

          <div className="flex flex-wrap gap-2">
            {currentScene.skills.map((skill, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white"
                data-testid={`badge-hero-skill-${i}`}
              >
                {skill}
              </Badge>
            ))}
          </div>

          <Button
            size="lg"
            className="mt-4"
            onClick={() => console.log(`Start ${currentScene.title}`)}
            data-testid="button-hero-start"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Simulation
          </Button>
        </div>
      </div>

      {scenes.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={goToPrev}
            data-testid="button-hero-prev"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={goToNext}
            data-testid="button-hero-next"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {scenes.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-white w-6" : "bg-white/50"
                }`}
                onClick={() => goToSlide(index)}
                data-testid={`button-hero-dot-${index}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
