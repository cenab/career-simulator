import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Send, Mic, HelpCircle } from "lucide-react";
import { useState } from "react";

interface ChatComposerProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  showToneHelper?: boolean;
}

const toneOptions = ["Neutral", "Empathetic", "Concise"];

const quickReplies = [
  "Tell me more",
  "I understand",
  "What are my options?",
  "Let's discuss alternatives",
];

export default function ChatComposer({ onSend, disabled, showToneHelper }: ChatComposerProps) {
  const [message, setMessage] = useState("");
  const [selectedTone, setSelectedTone] = useState("Neutral");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  const handleQuickReply = (reply: string) => {
    onSend(reply);
  };

  return (
    <div className="border-t border-border bg-card p-4 space-y-3" data-testid="chat-composer">
      {showToneHelper && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Tone:</span>
          <div className="flex gap-2">
            {toneOptions.map((tone) => (
              <Badge
                key={tone}
                variant={selectedTone === tone ? "default" : "secondary"}
                className="cursor-pointer text-xs"
                onClick={() => setSelectedTone(tone)}
                data-testid={`badge-tone-${tone.toLowerCase()}`}
              >
                {tone}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2 overflow-x-auto pb-1">
        {quickReplies.map((reply, i) => (
          <Button
            key={i}
            variant="outline"
            size="sm"
            onClick={() => handleQuickReply(reply)}
            disabled={disabled}
            className="whitespace-nowrap text-xs"
            data-testid={`button-quick-reply-${i}`}
          >
            {reply}
          </Button>
        ))}
      </div>

      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message..."
            disabled={disabled}
            className="min-h-[44px] max-h-32 resize-none pr-10"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            data-testid="input-message"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            disabled={disabled}
            data-testid="button-mic"
            onClick={() => console.log("Voice input clicked")}
          >
            <Mic className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            disabled={disabled}
            data-testid="button-ask-coach"
            onClick={() => console.log("Ask coach clicked")}
          >
            <HelpCircle className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            onClick={handleSend}
            disabled={disabled || !message.trim()}
            data-testid="button-send"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
