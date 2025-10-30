import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, Play, Bookmark, Share2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

interface SceneCardProps {
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
  size?: "small" | "medium" | "large";
  onStart?: () => void;
}

const difficultyColors = {
  easy: "bg-green-500/10 text-green-500 border-green-500/20",
  medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  hard: "bg-red-500/10 text-red-500 border-red-500/20",
};

const sizeClasses = {
  small: "w-56 h-36",
  medium: "w-[312px] h-[200px]",
  large: "w-[420px] h-[260px]",
};

export default function SceneCard({
  title,
  thumbnail,
  creator,
  difficulty,
  duration,
  mode,
  skills,
  rating,
  plays,
  size = "medium",
  onStart,
}: SceneCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <Card
      className={`${sizeClasses[size]} relative overflow-hidden group cursor-pointer hover-elevate transition-all duration-200 border-card-border`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-scene-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="relative w-full h-full">
        <img
          src={thumbnail}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        <div className="absolute inset-0 p-4 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="secondary" className={`${difficultyColors[difficulty]} border text-xs`} data-testid={`badge-difficulty-${difficulty}`}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </Badge>
              <Badge variant="secondary" className="bg-background/20 backdrop-blur-sm border-white/10 text-white text-xs" data-testid="badge-duration">
                <Clock className="w-3 h-3 mr-1" />
                {duration}m
              </Badge>
              <Badge variant="secondary" className="bg-background/20 backdrop-blur-sm border-white/10 text-white text-xs" data-testid="badge-mode">
                <Users className="w-3 h-3 mr-1" />
                {mode}
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            {isHovered && (
              <div className="flex gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <Button
                  size="sm"
                  variant="default"
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    onStart?.();
                  }}
                  data-testid="button-start-scene"
                >
                  <Play className="w-3 h-3 mr-1.5" />
                  Start
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="bg-background/20 backdrop-blur-sm border-white/10 text-white hover:bg-background/30"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSaved(!isSaved);
                  }}
                  data-testid="button-save-scene"
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="bg-background/20 backdrop-blur-sm border-white/10 text-white hover:bg-background/30"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Share clicked");
                  }}
                  data-testid="button-share-scene"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            )}

            <div>
              <h3 className="text-white font-semibold text-base line-clamp-2 mb-1.5" data-testid="text-scene-title">
                {title}
              </h3>
              
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Avatar className="w-5 h-5 border border-white/20" data-testid="avatar-creator">
                    <AvatarImage src={creator.avatar} />
                    <AvatarFallback className="text-[10px]">
                      {creator.handle.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-white/80" data-testid="text-creator-handle">@{creator.handle}</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-white/70">
                  <div className="flex items-center gap-1" data-testid="rating-display">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{rating.toFixed(1)}</span>
                  </div>
                  <span data-testid="text-plays">{plays.toLocaleString()} plays</span>
                </div>
              </div>

              {skills.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {skills.slice(0, 3).map((skill, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="bg-primary/20 text-primary-foreground border-primary/30 text-[10px] px-1.5 py-0"
                      data-testid={`badge-skill-${i}`}
                    >
                      {skill}
                    </Badge>
                  ))}
                  {skills.length > 3 && (
                    <Badge
                      variant="secondary"
                      className="bg-primary/20 text-primary-foreground border-primary/30 text-[10px] px-1.5 py-0"
                      data-testid="badge-skill-more"
                    >
                      +{skills.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
