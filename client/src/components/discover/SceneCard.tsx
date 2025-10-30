import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLocation } from "wouter";

interface SceneCardProps {
  title: string;
  subtitle: string;
  creator: string;
  thumbnail: string;
}

export default function SceneCard({ title, subtitle, creator, thumbnail }: SceneCardProps) {
  const [, setLocation] = useLocation();

  return (
    <Card
      className="flex-shrink-0 w-[240px] h-[320px] hover-elevate cursor-pointer overflow-hidden border-card-border bg-card relative group"
      onClick={() => setLocation("/scene/1")}
      data-testid={`card-scene-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="relative w-full h-full">
        <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1">
          <h3 className="text-white font-semibold line-clamp-2" data-testid="text-scene-title">
            {title}
          </h3>
          <p className="text-sm text-white/80 line-clamp-1">{subtitle}</p>
          <div className="flex items-center gap-2 mt-2">
            <Avatar className="w-5 h-5 border border-white/20">
              <AvatarFallback className="text-[10px]">{creator.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-white/70" data-testid="text-scene-creator">
              @{creator}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
