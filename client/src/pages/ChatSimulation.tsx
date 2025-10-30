import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ChatMessage from "@/components/ChatMessage";
import ChatComposer from "@/components/ChatComposer";
import CoachPanel from "@/components/CoachPanel";
import { MoreVertical, RotateCcw, Download, Flag, Timer, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function ChatSimulation() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  const [showCoachPanel, setShowCoachPanel] = useState(true);
  const [objectives, setObjectives] = useState([
    { id: "1", text: "Identify the scope of the breach", completed: true },
    { id: "2", text: "Communicate with affected stakeholders", completed: true },
    { id: "3", text: "Propose mitigation strategies", completed: false },
    { id: "4", text: "Address long-term prevention", completed: false },
  ]);
  const [notes, setNotes] = useState("");
  const [messages, setMessages] = useState([
    {
      speaker: "ai" as const,
      text: "Good morning. I understand there's been a security incident with one of our vendors. Can you walk me through what happened?",
      timestamp: new Date(Date.now() - 300000),
      characterName: "CEO Jennifer Martinez",
    },
    {
      speaker: "user" as const,
      text: "Yes, we discovered this morning that our payment processor experienced a data breach. Approximately 10,000 customer records may have been exposed.",
      timestamp: new Date(Date.now() - 240000),
    },
    {
      speaker: "event" as const,
      text: "💡 Key Moment: Crisis communication decision point",
      timestamp: new Date(Date.now() - 180000),
    },
    {
      speaker: "ai" as const,
      text: "This is serious. What's your recommended action plan?",
      timestamp: new Date(Date.now() - 120000),
      characterName: "CEO Jennifer Martinez",
    },
  ]);

  const rubricScores = [
    { dimension: "Clarity", score: 4.2, description: "Clear communication" },
    { dimension: "Empathy", score: 3.8, description: "Stakeholder consideration" },
    { dimension: "Decision Making", score: 4.5, description: "Effective solutions" },
  ];

  const handleSendMessage = (message: string) => {
    setMessages([
      ...messages,
      {
        speaker: "user" as const,
        text: message,
        timestamp: new Date(),
      },
    ]);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          speaker: "ai" as const,
          text: "I appreciate your thorough response. How do you plan to communicate this to our customers?",
          timestamp: new Date(),
          characterName: "CEO Jennifer Martinez",
        },
      ]);
    }, 1500);
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full bg-background">
        <AppSidebar currentPath="/chat" userHandle="johndoe" />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="border-b border-border bg-background px-4 py-3 flex items-center justify-between gap-4" data-testid="chat-header">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8 border border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">JM</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-sm font-semibold text-foreground" data-testid="text-scene-title">
                    Crisis Manager: Vendor Breach
                  </h1>
                  <p className="text-xs text-muted-foreground">CEO Jennifer Martinez</p>
                </div>
              </div>
              
              <Badge variant="secondary" className="bg-muted text-foreground" data-testid="badge-timer">
                <Timer className="w-3 h-3 mr-1" />
                12:45
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowCoachPanel(!showCoachPanel)}
                data-testid="button-toggle-coach-panel"
              >
                {showCoachPanel ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" data-testid="button-chat-menu">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => console.log("Restart")} data-testid="menu-restart">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Restart Simulation
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => console.log("Export")} data-testid="menu-export">
                    <Download className="w-4 h-4 mr-2" />
                    Export Transcript
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => console.log("Report")} data-testid="menu-report">
                    <Flag className="w-4 h-4 mr-2" />
                    Report Issue
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-6" data-testid="chat-messages">
                <div className="max-w-4xl mx-auto">
                  {messages.map((msg, i) => (
                    <ChatMessage key={i} {...msg} />
                  ))}
                </div>
              </div>

              <ChatComposer
                onSend={handleSendMessage}
                showToneHelper={true}
              />
            </div>

            {showCoachPanel && (
              <CoachPanel
                objectives={objectives}
                rubricScores={rubricScores}
                notes={notes}
                onObjectiveToggle={(id) => {
                  setObjectives(objectives.map(obj =>
                    obj.id === id ? { ...obj, completed: !obj.completed } : obj
                  ));
                }}
                onNotesChange={setNotes}
              />
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
