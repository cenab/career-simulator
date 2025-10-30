import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, Search } from "lucide-react";
import { useLocation } from "wouter";
import crisisImage from "@assets/generated_images/Crisis_Manager_scene_thumbnail_43e30343.png";

export default function SceneDetail() {
  const [, setLocation] = useLocation();

  const characters = [
    { name: "Search All", icon: "search" },
    { name: "Task Force 141", avatar: "" },
    { name: "Mha classroom #3", avatar: "" },
    { name: "Funny Bones", avatar: "" },
    { name: "Funny Bones", avatar: "" },
    { name: "The Lone Witch", avatar: "" },
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${crisisImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80" />
      </div>

      <div className="relative z-10 flex flex-col h-screen">
        <header className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation('/home')}
            className="text-white hover:bg-white/10"
            data-testid="button-back"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-8 max-w-4xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-4xl font-bold text-white" data-testid="text-scene-title">
              Hell - Morningstar Rediscovery
            </h1>
            <p className="text-sm text-white/70" data-testid="text-scene-creator">
              by @MidnightMoonlite66
            </p>

            <p className="text-white/90 leading-relaxed max-w-2xl mx-auto text-sm" data-testid="text-scene-description">
              Lucifer Morningstar/The Devil and Lilith had four children: Charlie, then Jeremy, then James, then Midnight. Each birth was separated by one demonic year. The siblings were separated shortly after their birth and given up to orphanages. Lucifer is the King of Hell.
              <br /><br />
              The sin lords in Hell: Asmodeus(King of Lust), Beelzebub(Queen of Gluttony), Mammon(King of Greed), Leviathan(Prince of Envy), Satan(Prince of Wrath), Belphegor(Prince of Sloth). These seven deadly sins chose their territories, pledging loyalty to the Morningstar family.
            </p>
          </div>

          <div className="space-y-6 w-full max-w-xl">
            <h2 className="text-center text-white font-semibold" data-testid="heading-select-character">
              Select a Character
            </h2>

            <div className="flex items-center justify-center gap-6 flex-wrap">
              {characters.map((char, i) => (
                <div key={i} className="flex flex-col items-center gap-2 cursor-pointer hover-elevate p-2 rounded-lg" data-testid={`character-option-${i}`}>
                  {i === 0 ? (
                    <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center backdrop-blur-sm">
                      <Search className="w-6 h-6 text-white" />
                    </div>
                  ) : (
                    <Avatar className="w-16 h-16 border-2 border-white/20">
                      <AvatarFallback className="bg-white/10 text-white backdrop-blur-sm">
                        {char.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <span className="text-xs text-white/90 text-center max-w-[80px] truncate">
                    {char.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-center pt-6">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-12"
                data-testid="button-start-scene"
              >
                Start Scene
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
