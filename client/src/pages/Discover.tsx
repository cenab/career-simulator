import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Compass,
  Sparkles,
  Search,
  ChevronLeft,
  Menu,
  User,
  Settings as SettingsIcon,
  FileText,
  LogOut,
  ChevronDown,
  UserCircle,
  Image,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { useState, useRef } from "react";
import CharacterCard from "@/components/discover/CharacterCard";
import SceneCard from "@/components/discover/SceneCard";
import ScrollableSection from "@/components/discover/ScrollableSection";
import crisisImage from "@assets/generated_images/Crisis_Manager_scene_thumbnail_43e30343.png";
import startupImage from "@assets/generated_images/Startup_Chaos_scene_thumbnail_97e7d32a.png";
import interviewImage from "@assets/generated_images/Interview_Practice_scene_thumbnail_ce7d07aa.png";
import politicsImage from "@assets/generated_images/Corporate_Politics_scene_thumbnail_587f87ca.png";
import stakeholderImage from "@assets/generated_images/Stakeholder_Management_scene_thumbnail_94691d95.png";

export default function Discover() {
  const [, setLocation] = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const forYouRef = useRef<HTMLDivElement>(null);
  const scenesRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const popularRef = useRef<HTMLDivElement>(null);

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 300;
      ref.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const forYouCharacters = [
    {
      title: "Task Force 141",
      creator: "Military_Ops",
      tagline: "Putting your unit of elites through tactical scenarios",
      thumbnail: crisisImage,
      messageCount: "2.4m",
    },
    {
      title: "Carl Grimes #3",
      creator: "The Walking Dead",
      tagline: "951 likes total, girlfriend hunting, 30% jerk",
      thumbnail: startupImage,
      messageCount: "236.4k",
    },
    {
      title: "Adrian",
      creator: "SugarNSpice",
      tagline: "🏀 Your poor yet sweet basketball player roommate!",
      thumbnail: interviewImage,
      messageCount: "107.9k",
    },
    {
      title: "Missing Children",
      creator: "MilkshakesSMP",
      tagline: "I AM SO William Afton, I SWEAR HE WOULD SAY THIS!!",
      thumbnail: politicsImage,
      messageCount: "1.5m",
    },
  ];

  const scenes = [
    {
      title: "Hell - Morningstar Rediscovery",
      subtitle: "Return to the underworld",
      creator: "MidnightMoonlite66",
      thumbnail: crisisImage,
    },
    {
      title: "The Silence At Willow Point",
      subtitle: "Mystery thriller",
      creator: "River3456",
      thumbnail: startupImage,
    },
    {
      title: "Neighbor Romance",
      subtitle: "Sweet love story",
      creator: "Bryceri090",
      thumbnail: interviewImage,
    },
    {
      title: "Cozy Halloween Evening",
      subtitle: "Seasonal adventure",
      creator: "imaginaryAuthor",
      thumbnail: politicsImage,
    },
    {
      title: "Halloween Magic Academy",
      subtitle: "Fantasy school",
      creator: "imaginaryAuthor",
      thumbnail: stakeholderImage,
    },
  ];

  const featured = forYouCharacters.slice(0, 3);

  return (
    <div className="flex h-screen w-full bg-background">
      <aside className={`${isCollapsed ? 'w-16' : 'w-64'} border-r border-border flex flex-col bg-card transition-all duration-200`}>
        {isCollapsed ? (
          <>
            <div className="p-4 flex items-center justify-center">
              <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => setIsCollapsed(false)} data-testid="button-expand-sidebar">
                <Menu className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-3 flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="default" size="icon" className="w-10 h-10" data-testid="button-create-collapsed">
                    <Plus className="w-4 h-4" />
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
              <Button
                variant="ghost"
                size="icon"
                className="w-full h-10 bg-accent"
                data-testid="button-nav-discover-collapsed"
              >
                <Compass className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-full h-10 mt-4"
                data-testid="button-search-collapsed"
              >
                <Search className="w-4 h-4" />
              </Button>
            </nav>

            <div className="p-3 flex justify-center">
              <Avatar className="w-8 h-8">
                <AvatarFallback>DA</AvatarFallback>
              </Avatar>
            </div>
          </>
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
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 bg-accent"
                data-testid="button-nav-discover"
              >
                <Compass className="w-4 h-4" />
                <span>Discover</span>
              </Button>
              <div className="pt-4 px-3">
                <Input
                  placeholder="Search"
                  className="h-9"
                  data-testid="input-sidebar-search"
                />
              </div>

              <div className="pt-6">
                <h3 className="text-xs font-semibold text-muted-foreground px-3 mb-2">Today</h3>
                <Button variant="ghost" className="w-full justify-start gap-3 text-sm" data-testid="button-recent-1">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-xs">VC</AvatarFallback>
                  </Avatar>
                  <span className="truncate">vika classroom #3</span>
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

      <main className="flex-1 overflow-y-auto flex flex-col">
        <header className="p-4 flex items-center justify-end">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-9 h-9 bg-muted/50 border-border"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              data-testid="input-top-search"
            />
            {searchFocused && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-card border border-border rounded-lg shadow-lg z-50 max-h-[500px] overflow-y-auto">
                <div className="p-3 border-b border-border">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Sparkles className="w-3 h-3" />
                    <span>Top</span>
                  </div>
                </div>
                <div className="p-2 space-y-1">
                  {['Mha', 'Kpop Demon Hunters', 'Mafia', 'Husband', 'Forsaken'].map((item, i) => (
                    <button
                      key={i}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover-elevate text-left"
                      data-testid={`search-result-${i}`}
                    >
                      <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm text-foreground">{item}</span>
                    </button>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Sparkles className="w-3 h-3" />
                    <span>Trending</span>
                  </div>
                  <div className="space-y-1">
                    {['Dispatch', 'Robert Robertson', 'Rerir', 'Dainsleif', 'Malevola'].map((item, i) => (
                      <button
                        key={i}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover-elevate text-left"
                        data-testid={`trending-result-${i}`}
                      >
                        <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm text-foreground">{item}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1440px] mx-auto p-8 space-y-8">
            <div>
              <h1 className="text-2xl font-semibold text-foreground mb-1">Welcome back,</h1>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <h2 className="text-2xl font-semibold text-foreground">DizzyingArredale3060</h2>
              </div>
            </div>

          <ScrollableSection
            title="For you"
            titleTestId="heading-for-you"
            scrollContainerRef={forYouRef}
            onScrollLeft={() => scroll(forYouRef, "left")}
            onScrollRight={() => scroll(forYouRef, "right")}
            scrollLeftTestId="button-scroll-left-for-you"
            scrollRightTestId="button-scroll-right-for-you"
          >
            {forYouCharacters.map((char, i) => (
              <CharacterCard key={i} {...char} />
            ))}
          </ScrollableSection>

          <ScrollableSection
            title="Scenes"
            titleTestId="heading-scenes"
            scrollContainerRef={scenesRef}
            onScrollLeft={() => scroll(scenesRef, "left")}
            onScrollRight={() => scroll(scenesRef, "right")}
            scrollLeftTestId="button-scroll-left-scenes"
            scrollRightTestId="button-scroll-right-scenes"
          >
            {scenes.map((scene, i) => (
              <SceneCard key={i} {...scene} />
            ))}
          </ScrollableSection>

          <ScrollableSection
            title="Featured"
            titleTestId="heading-featured"
            scrollContainerRef={featuredRef}
            onScrollLeft={() => scroll(featuredRef, "left")}
            onScrollRight={() => scroll(featuredRef, "right")}
            scrollLeftTestId="button-scroll-left-featured"
            scrollRightTestId="button-scroll-right-featured"
          >
            {featured.map((char, i) => (
              <CharacterCard key={i} {...char} />
            ))}
          </ScrollableSection>

          <ScrollableSection
            title="Popular"
            titleTestId="heading-popular"
            scrollContainerRef={popularRef}
            onScrollLeft={() => scroll(popularRef, "left")}
            onScrollRight={() => scroll(popularRef, "right")}
            scrollLeftTestId="button-scroll-left-popular"
            scrollRightTestId="button-scroll-right-popular"
          >
            {forYouCharacters.slice(0, 3).map((char, i) => (
              <CharacterCard key={i} {...char} />
            ))}
          </ScrollableSection>
          </div>
        </div>
      </main>
    </div>
  );
}
