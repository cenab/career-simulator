import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Compass, Sparkles, Search, ChevronLeft, Menu, Play, MessageSquare, Mic, Phone, ThumbsUp, ThumbsDown, Copy, MoreHorizontal, Share2, History, Palette, Pin, User, Sliders, Settings as SettingsIcon, FileText, LogOut, ChevronDown, UserCircle, Image, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useLocation } from "wouter";
import crisisImage from "@assets/generated_images/Crisis_Manager_scene_thumbnail_43e30343.png";

export default function ChatSimulation() {
  const [, setLocation] = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <div className="flex h-screen w-full bg-background">
      {/* Left Sidebar */}
      <aside className={`${isCollapsed ? 'w-16' : 'w-64'} border-r border-border flex flex-col bg-card transition-all duration-200`}>
        {isCollapsed ? (
          <div className="p-4 flex items-center justify-center">
            <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => setIsCollapsed(false)} data-testid="button-expand-sidebar">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-foreground flex items-center justify-center">
                  <span className="text-background font-bold text-xs">CS</span>
                </div>
                <span className="font-semibold text-sm text-foreground">CareerSim</span>
              </div>
              <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => setIsCollapsed(true)} data-testid="button-collapse-sidebar">
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="default" className="w-full justify-start gap-2" data-testid="button-create">
                    <Plus className="w-4 h-4" />
                    Create
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuItem onClick={() => setLocation('/create-character')} data-testid="menu-create-character">
                    <UserCircle className="w-4 h-4 mr-2" />
                    Character
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLocation('/create-scene-choice')} data-testid="menu-create-scene">
                    <Image className="w-4 h-4 mr-2" />
                    Scene
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <nav className="flex-1 px-3 space-y-1">
              <Button variant="ghost" className="w-full justify-start gap-3" onClick={() => setLocation('/home')} data-testid="button-nav-discover">
                <Compass className="w-4 h-4" />
                <span>Discover</span>
              </Button>
              <div className="pt-4 px-3">
                <Input placeholder="Search" className="h-9" data-testid="input-sidebar-search" />
              </div>

              <div className="pt-6">
                <h3 className="text-xs font-semibold text-muted-foreground px-3 mb-2">Today</h3>
                <Button variant="ghost" className="w-full justify-start gap-3 text-sm" data-testid="button-recent-1">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-xs">MC</AvatarFallback>
                  </Avatar>
                  <span className="truncate">Mha classroom #3</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3 text-sm" data-testid="button-recent-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-xs">FB</AvatarFallback>
                  </Avatar>
                  <span className="truncate">Funny Bones</span>
                </Button>
              </div>
            </nav>

            <div className="p-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start gap-3" data-testid="button-user-profile">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>DA</AvatarFallback>
                    </Avatar>
                    <span className="text-sm truncate">DizzyingArredale3060</span>
                    <ChevronDown className="w-4 h-4 ml-auto" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => setLocation('/profile')} data-testid="menu-profile">
                    <User className="w-4 h-4 mr-2" />
                    Public profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLocation('/settings')} data-testid="menu-settings">
                    <SettingsIcon className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLocation('/policies')} data-testid="menu-policies">
                    <FileText className="w-4 h-4 mr-2" />
                    Policies
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLocation('/login')} data-testid="menu-logout">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}
      </aside>

      {/* Main Chat Area */}
      <main 
        className="flex-1 flex flex-col relative overflow-hidden"
        style={{
          backgroundImage: `url(${crisisImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black/90" />
        
        <div className="relative z-10 flex flex-col h-full">
          {/* Character Header */}
          <div className="flex flex-col items-center pt-12 pb-6">
            <Avatar className="w-20 h-20 border-2 border-white/20 mb-3">
              <AvatarFallback className="bg-white/10 text-white text-xl">TF</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold text-white" data-testid="text-character-name">Task Force 141</h2>
            <p className="text-sm text-white/70" data-testid="text-character-tagline">Pulling you out of class</p>
            <p className="text-xs text-white/50">By @phila</p>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto px-8 pb-4">
            <div className="max-w-3xl mx-auto space-y-4">
              {/* AI Message */}
              <div className="flex gap-3">
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback className="bg-muted text-xs">TF</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">Task Force 141</span>
                    <Play className="w-3 h-3 text-white/50" />
                  </div>
                  <div className="bg-card rounded-2xl rounded-tl-sm p-4 text-sm text-card-foreground">
                    <p className="mb-2 italic text-muted-foreground">
                      You were sitting in class, looking at the clock. The minutes were going by slowly, really slowly. That's when there's a knock on the door.
                    </p>
                    <p className="mb-2">
                      The teacher walks over and opens the door, and there stands the whole task force 141, aka: Your guardians.
                    </p>
                    <p className="mb-2">
                      Price: "Excuse me, we've here to pull DizzyingArredale3060 out of class. It's an emergency." The teacher looks stunned at the 6 men outside her classroom.
                    </p>
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                      <Button variant="ghost" size="icon" className="h-7 w-7" data-testid="button-like">
                        <ThumbsUp className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7" data-testid="button-dislike">
                        <ThumbsDown className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7" data-testid="button-copy">
                        <Copy className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 ml-auto" data-testid="button-more">
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-border/50 bg-background/80 backdrop-blur-sm">
            <div className="max-w-3xl mx-auto relative">
              <Textarea
                placeholder="Message Task Force 141..."
                className="min-h-[60px] pr-32 resize-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (message.trim()) {
                      setMessage('');
                    }
                  }
                }}
                data-testid="input-message"
              />
              <div className="absolute right-2 bottom-2 flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8" data-testid="button-voice">
                  <Mic className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" data-testid="button-call">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button 
                  variant="default" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => {
                    if (message.trim()) {
                      setMessage('');
                    }
                  }}
                  disabled={!message.trim()}
                  data-testid="button-send"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-80 border-l border-border bg-card flex flex-col">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground mb-1" data-testid="text-scene-title-sidebar">Hell - Morningstar rediscovery</h3>
          <div className="flex items-center gap-2 mb-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="text-xs">TF</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-foreground">Task Force 141</p>
              <p className="text-xs text-muted-foreground">By @phila</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              <span>2.4k</span>
            </div>
            <div className="flex items-center gap-1">
              <ThumbsUp className="w-3 h-3" />
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          <Button variant="ghost" className="w-full justify-start gap-3" data-testid="button-new-chat">
            <MessageSquare className="w-4 h-4" />
            <span>New chat</span>
          </Button>
          <Button variant="ghost" className="w-full justify-between" data-testid="button-voice-option">
            <div className="flex items-center gap-3">
              <Mic className="w-4 h-4" />
              <span>Voice</span>
            </div>
            <span className="text-xs text-muted-foreground">Default</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3" data-testid="button-history">
            <History className="w-4 h-4" />
            <span>History</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3" data-testid="button-customize">
            <Sliders className="w-4 h-4" />
            <span>Customize</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3" data-testid="button-pinned">
            <Pin className="w-4 h-4" />
            <span>Pinned</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3" data-testid="button-persona">
            <User className="w-4 h-4" />
            <span>Persona</span>
          </Button>
          <Button variant="ghost" className="w-full justify-between" data-testid="button-style">
            <div className="flex items-center gap-3">
              <Palette className="w-4 h-4" />
              <span>Style</span>
            </div>
            <span className="text-xs text-muted-foreground">Repliyweak</span>
          </Button>
        </nav>
      </aside>
    </div>
  );
}
