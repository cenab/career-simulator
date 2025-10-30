import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Plus, Compass, ChevronLeft, Menu } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Policies() {
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
          <h1 className="text-3xl font-bold text-foreground" data-testid="heading-policies">Policies</h1>

          <Card className="p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your privacy is important to us. This privacy policy explains how CareerSim collects, uses, and protects your personal information when you use our platform.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">Terms of Service</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using CareerSim, you agree to be bound by these Terms of Service and all applicable laws and regulations.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">Data Collection</h2>
              <p className="text-muted-foreground leading-relaxed">
                We collect information you provide directly to us, including when you create an account, participate in simulations, and communicate with our AI characters.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">AI Usage</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our platform uses AI to power realistic career training scenarios. Your conversations may be analyzed to improve our AI models and provide better feedback.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">Cookie Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to improve your experience, analyze usage patterns, and personalize content.
              </p>
            </div>
          </Card>

          <p className="text-sm text-muted-foreground">
            Last updated: October 2024
          </p>
        </div>
      </main>
    </div>
  );
}
