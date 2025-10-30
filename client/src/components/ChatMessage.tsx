import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

interface ChatMessageProps {
  speaker: "user" | "ai" | "event";
  text: string;
  timestamp: Date;
  characterName?: string;
  characterAvatar?: string;
}

export default function ChatMessage({
  speaker,
  text,
  timestamp,
  characterName,
  characterAvatar,
}: ChatMessageProps) {
  if (speaker === "event") {
    return (
      <div className="flex justify-center my-6" data-testid="message-event">
        <div className="bg-card border border-card-border rounded-lg px-4 py-2 max-w-md text-center">
          <p className="text-sm text-muted-foreground">{text}</p>
        </div>
      </div>
    );
  }

  const isUser = speaker === "user";

  return (
    <div
      className={`flex gap-3 mb-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}
      data-testid={`message-${speaker}`}
    >
      {!isUser && (
        <Avatar className="w-8 h-8 flex-shrink-0 border border-primary/20" data-testid="avatar-ai">
          <AvatarImage src={characterAvatar} />
          <AvatarFallback className="bg-primary/10 text-primary text-xs">
            {characterName?.substring(0, 2).toUpperCase() || "AI"}
          </AvatarFallback>
        </Avatar>
      )}

      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-[70%]`}>
        <div
          className={`rounded-xl px-4 py-2.5 ${
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-card border border-card-border text-card-foreground"
          }`}
          data-testid="message-bubble"
        >
          {!isUser && characterName && (
            <p className="text-xs font-medium text-primary mb-1" data-testid="text-character-name">
              {characterName}
            </p>
          )}
          <p className="text-[15px] leading-relaxed whitespace-pre-wrap" data-testid="text-message-content">
            {text}
          </p>
        </div>
        <span className="text-xs text-muted-foreground mt-1" data-testid="text-timestamp">
          {format(timestamp, "h:mm a")}
        </span>
      </div>
    </div>
  );
}
