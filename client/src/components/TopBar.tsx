import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Bell, HelpCircle, Settings } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface TopBarProps {
  onSearch?: (query: string) => void;
}

export default function TopBar({ onSearch }: TopBarProps) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-4 border-b border-border bg-background px-4 py-2" data-testid="top-bar">
      <div className="flex items-center gap-2">
        <SidebarTrigger data-testid="button-sidebar-toggle" />
        
        <div className="relative flex-1 max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search scenes, creators, skills..."
            className="pl-10 bg-muted/50 border-0 focus-visible:bg-muted"
            onChange={(e) => onSearch?.(e.target.value)}
            data-testid="input-search"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => console.log("Notifications clicked")}
          data-testid="button-notifications"
        >
          <Bell className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => console.log("Help clicked")}
          data-testid="button-help"
        >
          <HelpCircle className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => console.log("Settings clicked")}
          data-testid="button-settings"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}
