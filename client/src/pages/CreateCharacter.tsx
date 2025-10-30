import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Compass, ChevronLeft, Menu, Edit, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function CreateCharacter() {
  const [, setLocation] = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [characterName, setCharacterName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [greeting, setGreeting] = useState("");
  const [showMoreOptions, setShowMoreOptions] = useState(false);

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
              <Button variant="default" className="w-full justify-start gap-2" data-testid="button-create">
                <Plus className="w-4 h-4" />
                Create
              </Button>
            </div>

            <nav className="flex-1 px-3 space-y-1">
              <Button variant="ghost" className="w-full justify-start gap-3" onClick={() => setLocation('/home')} data-testid="button-nav-discover">
                <Compass className="w-4 h-4" />
                <span>Discover</span>
              </Button>
            </nav>
          </>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto p-8 space-y-6">
          <div>
            <Button variant="ghost" onClick={() => setLocation('/home')} data-testid="button-back">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar className="w-24 h-24 bg-muted">
                <AvatarFallback className="text-2xl bg-orange-500 text-white">?</AvatarFallback>
              </Avatar>
              <Button size="icon" variant="ghost" className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-card border border-border" data-testid="button-edit-avatar">
                <Edit className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">Character name</p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="name">Character name</Label>
                <span className="text-xs text-muted-foreground">{characterName.length}/50</span>
              </div>
              <Input
                id="name"
                placeholder="e.g. Albert Einstein"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                maxLength={50}
                data-testid="input-character-name"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="tagline">Tagline</Label>
                <span className="text-xs text-muted-foreground">{tagline.length}/50</span>
              </div>
              <Input
                id="tagline"
                placeholder="Add a short tagline of your Character"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                maxLength={50}
                data-testid="input-tagline"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="description">Description</Label>
                <span className="text-xs text-muted-foreground">{description.length}/500</span>
              </div>
              <Textarea
                id="description"
                placeholder="How would your Character describe themselves?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={500}
                className="min-h-[120px] resize-none"
                data-testid="input-description"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="greeting">Greeting</Label>
                <span className="text-xs text-muted-foreground">{greeting.length}/4096</span>
              </div>
              <Textarea
                id="greeting"
                placeholder="Your neighbor just knocked. He says his power's out... but why won't he leave?"
                value={greeting}
                onChange={(e) => setGreeting(e.target.value)}
                maxLength={4096}
                className="min-h-[150px] resize-none"
                data-testid="input-greeting"
              />
              <div className="mt-4">
                <Button variant="ghost" className="w-full justify-start gap-2" data-testid="button-add-greeting">
                  <Plus className="w-4 h-4" />
                  Add additional greeting
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  You can add up to 5 custom greetings. They'll appear in the order you set and people swipe to pick one before chatting. Once your list ends, we'll suggest ai-generated greetings based on your character.
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <Checkbox id="ai-greeting" data-testid="checkbox-ai-greeting" />
                  <Label htmlFor="ai-greeting" className="text-sm font-normal cursor-pointer">
                    AI Greeting for New Chats
                  </Label>
                </div>
              </div>
            </div>

            <div>
              <Label>Tags</Label>
              <Input
                placeholder="Search tags"
                className="mt-2"
                data-testid="input-tags"
              />
            </div>

            <div>
              <Button
                variant="ghost"
                className="w-full justify-between"
                onClick={() => setShowMoreOptions(!showMoreOptions)}
                data-testid="button-more-options"
              >
                <span>More options</span>
                {showMoreOptions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </div>

            <div>
              <Label>Visibility</Label>
              <Select defaultValue="public">
                <SelectTrigger className="mt-2" data-testid="select-visibility">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="unlisted">Unlisted</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end pt-4">
              <Button size="lg" data-testid="button-create-character">
                Create Character
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
