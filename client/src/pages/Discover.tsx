import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Compass, Sparkles, Search, ChevronLeft, MessageSquare, Menu, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { useState, useRef } from "react";
import crisisImage from "@assets/generated_images/Crisis_Manager_scene_thumbnail_43e30343.png";
import startupImage from "@assets/generated_images/Startup_Chaos_scene_thumbnail_97e7d32a.png";
import interviewImage from "@assets/generated_images/Interview_Practice_scene_thumbnail_ce7d07aa.png";
import politicsImage from "@assets/generated_images/Corporate_Politics_scene_thumbnail_587f87ca.png";
import stakeholderImage from "@assets/generated_images/Stakeholder_Management_scene_thumbnail_94691d95.png";

interface CharacterCardProps {
  title: string;
  creator: string;
  tagline: string;
  thumbnail: string;
  messageCount: string;
}

function CharacterCard({ title, creator, tagline, thumbnail, messageCount }: CharacterCardProps) {
  return (
    <Card className="flex-shrink-0 w-[280px] hover-elevate cursor-pointer overflow-hidden border-card-border bg-card" data-testid={`card-character-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex gap-3 p-4">
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground line-clamp-1" data-testid="text-character-title">{title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-1">By {creator}</p>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{tagline}</p>
          <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
            <MessageSquare className="w-3 h-3" />
            <span data-testid="text-message-count">{messageCount}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

interface SceneCardProps {
  title: string;
  subtitle: string;
  creator: string;
  thumbnail: string;
}

function SceneCard({ title, subtitle, creator, thumbnail }: SceneCardProps) {
  return (
    <Card className="flex-shrink-0 w-[240px] h-[320px] hover-elevate cursor-pointer overflow-hidden border-card-border bg-card relative group" data-testid={`card-scene-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="relative w-full h-full">
        <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1">
          <h3 className="text-white font-semibold line-clamp-2" data-testid="text-scene-title">{title}</h3>
          <p className="text-sm text-white/80 line-clamp-1">{subtitle}</p>
          <div className="flex items-center gap-2 mt-2">
            <Avatar className="w-5 h-5 border border-white/20">
              <AvatarFallback className="text-[10px]">{creator.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-white/70" data-testid="text-scene-creator">@{creator}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function Discover() {
  const [, setLocation] = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
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
              <Button variant="default" size="icon" className="w-10 h-10" data-testid="button-create-collapsed">
                <Plus className="w-4 h-4" />
              </Button>
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
                className="w-full h-10"
                data-testid="button-nav-avatarsfx-collapsed"
              >
                <Sparkles className="w-4 h-4" />
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
              <Button variant="default" className="w-full justify-start gap-2" data-testid="button-create">
                <Plus className="w-4 h-4" />
                Create
              </Button>
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
              <Button
                variant="ghost"
                className="w-full justify-start gap-3"
                data-testid="button-nav-avatarsfx"
              >
                <Sparkles className="w-4 h-4" />
                <span>AvatarsFX</span>
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

      <main className="flex-1 overflow-y-auto flex flex-col">
        <header className="p-4 flex items-center justify-end">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-9 h-9"
              data-testid="input-top-search"
            />
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

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground" data-testid="heading-for-you">For you</h2>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => scroll(forYouRef, 'left')}
                  data-testid="button-scroll-left-for-you"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => scroll(forYouRef, 'right')}
                  data-testid="button-scroll-right-for-you"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div ref={forYouRef} className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {forYouCharacters.map((char, i) => (
                <CharacterCard key={i} {...char} />
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground" data-testid="heading-scenes">Scenes</h2>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => scroll(scenesRef, 'left')}
                  data-testid="button-scroll-left-scenes"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => scroll(scenesRef, 'right')}
                  data-testid="button-scroll-right-scenes"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div ref={scenesRef} className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {scenes.map((scene, i) => (
                <SceneCard key={i} {...scene} />
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground" data-testid="heading-featured">Featured</h2>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => scroll(featuredRef, 'left')}
                  data-testid="button-scroll-left-featured"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => scroll(featuredRef, 'right')}
                  data-testid="button-scroll-right-featured"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div ref={featuredRef} className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {featured.map((char, i) => (
                <CharacterCard key={i} {...char} />
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground" data-testid="heading-popular">Popular</h2>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => scroll(popularRef, 'left')}
                  data-testid="button-scroll-left-popular"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => scroll(popularRef, 'right')}
                  data-testid="button-scroll-right-popular"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div ref={popularRef} className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {forYouCharacters.slice(0, 3).map((char, i) => (
                <CharacterCard key={i} {...char} />
              ))}
            </div>
          </section>
          </div>
        </div>
      </main>
    </div>
  );
}
