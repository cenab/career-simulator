import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Compass, ChevronLeft, Menu, Settings, User, Edit } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Profile() {
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
              <Button variant="ghost" className="w-full justify-start gap-3 bg-accent" data-testid="button-user-profile">
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
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground" data-testid="heading-profile">Public Profile</h1>
            <Button variant="outline" data-testid="button-edit-profile">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>

          <Card className="p-6">
            <div className="flex items-start gap-6">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="text-2xl">DA</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Username</label>
                  <p className="text-lg font-semibold text-foreground" data-testid="text-username">DizzyingArredale3060</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Bio</label>
                  <p className="text-foreground" data-testid="text-bio">AI-powered career training enthusiast</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Member since</label>
                  <p className="text-foreground" data-testid="text-member-since">October 2024</p>
                </div>
              </div>
            </div>
          </Card>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Activity</h2>
            <Card className="p-6">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-3xl font-bold text-foreground" data-testid="text-chats-count">24</p>
                  <p className="text-sm text-muted-foreground">Chats</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground" data-testid="text-scenes-count">8</p>
                  <p className="text-sm text-muted-foreground">Scenes Created</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground" data-testid="text-hours-count">12</p>
                  <p className="text-sm text-muted-foreground">Hours Practiced</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
