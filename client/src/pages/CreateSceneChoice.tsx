import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Compass, ChevronLeft, Menu, Users, User } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function CreateSceneChoice() {
  const [, setLocation] = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

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
      <main className="flex-1 overflow-y-auto flex items-center justify-center">
        <div className="max-w-4xl mx-auto p-8 space-y-8 text-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-4" data-testid="heading-scene-create">
              Welcome to Scenes. Ready to create?
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Scenes are instant roleplay settings you create, where anyone can drop into a specific setting with their favorite Character. They are like side stories branching from the core chat, perfect for anyone to start roleplaying right away. Create a Scene to bring your story to life.
            </p>
          </div>

          <Button variant="ghost" className="text-primary underline" data-testid="link-tips">
            Tips and best practices
          </Button>

          <div className="grid grid-cols-2 gap-6 mt-8">
            <Card
              className="p-6 hover-elevate cursor-pointer text-left"
              onClick={() => setLocation('/create-scene/any-character')}
              data-testid="card-any-character-scene"
            >
              <Users className="w-8 h-8 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Any Character Scene</h3>
              <p className="text-sm text-muted-foreground">
                A Scene that works with any Character. Perfect for general scenarios where any Character can jump in and interact.
              </p>
            </Card>

            <Card
              className="p-6 hover-elevate cursor-pointer text-left"
              onClick={() => setLocation('/create-scene/main-character')}
              data-testid="card-main-character-scene"
            >
              <User className="w-8 h-8 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Main Character Scene</h3>
              <p className="text-sm text-muted-foreground">
                A Scene designed for a specific Character you have in mind, tailored to their personality and backstory.
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
