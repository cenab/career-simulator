import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SceneCard from "./SceneCard";

interface Scene {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  creator: {
    handle: string;
    avatar?: string;
  };
  difficulty: "easy" | "medium" | "hard";
  duration: number;
  mode: "solo" | "group";
  skills: string[];
  rating: number;
  plays: number;
}

interface SceneCarouselProps {
  title: string;
  scenes: Scene[];
  onViewAll?: () => void;
}

export default function SceneCarousel({ title, scenes, onViewAll }: SceneCarouselProps) {
  return (
    <div className="space-y-4" data-testid={`carousel-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground" data-testid="text-carousel-title">{title}</h2>
        {onViewAll && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewAll}
            className="text-muted-foreground hover:text-foreground"
            data-testid="button-view-all"
          >
            View all
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
      
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {scenes.map((scene) => (
            <div key={scene.id} className="snap-start flex-shrink-0">
              <SceneCard {...scene} size="medium" onStart={() => console.log(`Start ${scene.title}`)} />
            </div>
          ))}
        </div>
        
        <div className="absolute top-0 right-0 bottom-4 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
