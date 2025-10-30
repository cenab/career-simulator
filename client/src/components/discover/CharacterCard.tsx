import { Card } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { useLocation } from "wouter";

interface CharacterCardProps {
  title: string;
  creator: string;
  tagline: string;
  thumbnail: string;
  messageCount: string;
}

export default function CharacterCard({
  title,
  creator,
  tagline,
  thumbnail,
  messageCount,
}: CharacterCardProps) {
  const [, setLocation] = useLocation();

  return (
    <Card
      className="flex-shrink-0 w-[280px] hover-elevate cursor-pointer overflow-hidden border-card-border bg-card"
      onClick={() => setLocation("/chat/1")}
      data-testid={`card-character-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="flex gap-3 p-4">
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground line-clamp-1" data-testid="text-character-title">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-1">By {creator}</p>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{tagline}</p>
          <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
            <MessageSquare className="w-3 h-3" />
            <span data-testid="text-message-count">{messageCount}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
