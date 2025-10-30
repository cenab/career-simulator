import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Compass, ChevronLeft, Menu } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Settings() {
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

            <div className="p-3">
              <Button variant="ghost" className="w-full justify-start gap-3" data-testid="button-user-profile">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>DA</AvatarFallback>
                </Avatar>
                <span className="text-sm truncate">DizzyingArredale3060</span>
              </Button>
            </div>
          </>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8 space-y-8">
          <h1 className="text-3xl font-bold text-foreground" data-testid="heading-settings">Settings</h1>

          <Card className="p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">Account</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="user@example.com" data-testid="input-email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="DizzyingArredale3060" data-testid="input-username" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Email notifications</p>
                    <p className="text-sm text-muted-foreground">Receive updates about your activity</p>
                  </div>
                  <Switch data-testid="switch-email-notifications" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">AI feedback</p>
                    <p className="text-sm text-muted-foreground">Get real-time coaching during chats</p>
                  </div>
                  <Switch defaultChecked data-testid="switch-ai-feedback" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Auto-save chats</p>
                    <p className="text-sm text-muted-foreground">Automatically save conversation history</p>
                  </div>
                  <Switch defaultChecked data-testid="switch-auto-save" />
                </div>
              </div>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button data-testid="button-save-settings">Save Changes</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
