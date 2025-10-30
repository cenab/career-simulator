import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, PlusCircle, Library, Briefcase, Search, Settings, LogOut, Crown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface AppSidebarProps {
  currentPath?: string;
  userHandle?: string;
  userAvatar?: string;
  isPro?: boolean;
}

const menuItems = [
  { title: "Discover", icon: Home, path: "/home" },
  { title: "Create", icon: PlusCircle, path: "/create" },
  { title: "Library", icon: Library, path: "/library" },
  { title: "Workspace", icon: Briefcase, path: "/workspace" },
  { title: "Search", icon: Search, path: "/search" },
];

export default function AppSidebar({
  currentPath = "/home",
  userHandle = "user",
  userAvatar,
  isPro = false,
}: AppSidebarProps) {
  return (
    <Sidebar data-testid="app-sidebar">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">CS</span>
          </div>
          <span className="font-semibold text-lg text-foreground">CareerSim</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={currentPath === item.path}
                    data-testid={`nav-${item.title.toLowerCase()}`}
                  >
                    <a href={item.path} onClick={(e) => {
                      e.preventDefault();
                      console.log(`Navigate to ${item.path}`);
                    }}>
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 space-y-3">
        {!isPro && (
          <Button
            variant="default"
            size="sm"
            className="w-full justify-start gap-2"
            onClick={() => console.log("Upgrade clicked")}
            data-testid="button-upgrade"
          >
            <Crown className="w-4 h-4" />
            Upgrade to Pro
          </Button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 px-2 hover-elevate"
              data-testid="button-user-menu"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={userAvatar} />
                <AvatarFallback className="text-xs">
                  {userHandle.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left overflow-hidden">
                <p className="text-sm font-medium truncate">@{userHandle}</p>
                <p className="text-xs text-muted-foreground">
                  {isPro ? "Pro Member" : "Free"}
                </p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => console.log("Settings clicked")} data-testid="menu-settings">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Logout clicked")} data-testid="menu-logout">
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
