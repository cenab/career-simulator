import { Button } from "@/components/ui/button";
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
import { Plus, Compass, ChevronLeft, Menu, Upload, Wand2, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

const genreTags = ["Mystery", "Sci-Fi", "Fantasy", "Slice-of-Life", "Romance", "Action/Thriller"];
const timePeriods = ["Prehistoric", "Ancient Times", "Middle Ages", "Renaissance", "Future", "1800s"];
const locations = ["Mansion", "Train", "Museum", "Space Station", "Starship", "City"];
const tones = ["Angst", "Cozy", "Tense", "Whimsical", "Dark", "Romantic", "Hopeful", "Comedic"];

const chatColors = [
  "bg-white", "bg-rose-400", "bg-red-500", "bg-orange-600", "bg-amber-600",
  "bg-yellow-400", "bg-green-500", "bg-teal-500", "bg-cyan-500", "bg-blue-500",
  "bg-indigo-600", "bg-purple-600", "bg-pink-500", "bg-gray-100", "bg-gray-500", "bg-gray-900"
];

export default function CreateScene() {
  const [, setLocation] = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedTones, setSelectedTones] = useState<string[]>([]);
  const [backstory, setBackstory] = useState("");
  const [goal, setGoal] = useState("");
  const [intro, setIntro] = useState("");
  const [characterGreeting, setCharacterGreeting] = useState("");
  const [sceneName, setSceneName] = useState("");
  const [selectedColor, setSelectedColor] = useState("bg-white");
  const [showExample1, setShowExample1] = useState(true);
  const [showExample2, setShowExample2] = useState(true);

  const toggleSelection = (item: string, list: string[], setter: (list: string[]) => void) => {
    if (list.includes(item)) {
      setter(list.filter(i => i !== item));
    } else {
      setter([...list, item]);
    }
  };

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
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => step > 1 ? setStep(step - 1) : setLocation('/create-scene-choice')} data-testid="button-back">
              <ChevronLeft className="w-4 h-4 mr-2" />
              {step > 1 ? `Step ${step - 1}` : 'Back'}
            </Button>
            <div className="flex gap-2">
              <Button variant={step === 1 ? "default" : "ghost"} size="sm" onClick={() => setStep(1)} data-testid="button-step-1">
                Step 1 - Scene setting
              </Button>
              <Button variant={step === 2 ? "default" : "ghost"} size="sm" onClick={() => setStep(2)} data-testid="button-step-2">
                Step 2 - Intro and greeting
              </Button>
              <Button variant={step === 3 ? "default" : "ghost"} size="sm" onClick={() => setStep(3)} data-testid="button-step-3">
                Step 3 - Name and cover
              </Button>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2" data-testid="heading-scene-setting">Define the setting of your Scene</h2>
                <Button variant="ghost" className="text-primary underline p-0" data-testid="link-tips">
                  Tips and best practices
                </Button>
              </div>

              <div>
                <Label>Scene genre</Label>
                <p className="text-sm text-muted-foreground mb-3">Select the genre. This guides the Character's style and tone.</p>
                <div className="flex flex-wrap gap-2">
                  {genreTags.map(genre => (
                    <Button
                      key={genre}
                      variant={selectedGenres.includes(genre) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleSelection(genre, selectedGenres, setSelectedGenres)}
                      data-testid={`tag-genre-${genre.toLowerCase().replace(/\//g, '-')}`}
                    >
                      {genre}
                    </Button>
                  ))}
                  <Button variant="outline" size="sm" data-testid="button-see-more-genres">See more</Button>
                </div>
              </div>

              <div>
                <Label>When is this Scene set?</Label>
                <p className="text-sm text-muted-foreground mb-3">Set the time. This guides the Character contextually when the Scene is taking place.</p>
                <div className="flex flex-wrap gap-2">
                  {timePeriods.map(period => (
                    <Button
                      key={period}
                      variant={selectedPeriods.includes(period) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleSelection(period, selectedPeriods, setSelectedPeriods)}
                      data-testid={`tag-period-${period.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {period}
                    </Button>
                  ))}
                  <Button variant="outline" size="sm" data-testid="button-see-more-periods">See more</Button>
                </div>
              </div>

              <div>
                <Label>Where does this Scene happen?</Label>
                <p className="text-sm text-muted-foreground mb-3">Select the location. This sets the specific environment where the Scene is taking place.</p>
                <div className="flex flex-wrap gap-2">
                  {locations.map(location => (
                    <Button
                      key={location}
                      variant={selectedLocations.includes(location) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleSelection(location, selectedLocations, setSelectedLocations)}
                      data-testid={`tag-location-${location.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {location}
                    </Button>
                  ))}
                  <Button variant="outline" size="sm" data-testid="button-see-more-locations">See more</Button>
                </div>
              </div>

              <div>
                <Label>Tone of this Scene</Label>
                <p className="text-sm text-muted-foreground mb-3">What's the mood of the Scene? This defines the atmosphere and emotional tone to help your audience immerse.</p>
                <div className="flex flex-wrap gap-2">
                  {tones.map(tone => (
                    <Button
                      key={tone}
                      variant={selectedTones.includes(tone) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleSelection(tone, selectedTones, setSelectedTones)}
                      data-testid={`tag-tone-${tone.toLowerCase()}`}
                    >
                      {tone}
                    </Button>
                  ))}
                  <Button variant="outline" size="sm" data-testid="button-see-more-tones">See more</Button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="backstory">What's the backstory of this Scene?</Label>
                  <span className="text-xs text-muted-foreground">{backstory.length}/500</span>
                </div>
                <Textarea
                  id="backstory"
                  placeholder="Describe what is happening in this Scene. Include relevant details about the situation and backstory. This will help shape how the Scene unfolds and how the Character responds."
                  value={backstory}
                  onChange={(e) => setBackstory(e.target.value)}
                  maxLength={500}
                  className="min-h-[150px] resize-none"
                  data-testid="input-backstory"
                />
                {showExample1 && (
                  <Card className="mt-3 p-4 bg-muted/50 relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 w-6 h-6"
                      onClick={() => setShowExample1(false)}
                      data-testid="button-close-example-1"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <p className="text-sm font-semibold mb-2">Example 1</p>
                    <p className="text-sm text-muted-foreground">
                      {`{{char}} is a wealthy railroad investor who discovered the theft was an inside job by the railway company's accountant. But now realizes they look like the thief. They need to find someone they can trust to help them reveal the truth even before they're arrested.`}
                    </p>
                  </Card>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="goal">What's the player's goal in this Scene?</Label>
                </div>
                <Textarea
                  id="goal"
                  placeholder="E.g. Dance with {{char}};{{user}}&{{char}} are at a grand ball together. {{user}} approaches {{char}} and {{char}} approaches with the intention of asking {{user}} for a dance."
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="min-h-[120px] resize-none"
                  data-testid="input-goal"
                />
                {showExample2 && (
                  <Card className="mt-3 p-4 bg-muted/50 relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 w-6 h-6"
                      onClick={() => setShowExample2(false)}
                      data-testid="button-close-example-2"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <p className="text-sm font-semibold mb-2">Example 1</p>
                    <p className="text-sm text-muted-foreground">
                      {`{{char}} and {{user}} are at a grand ball together. {{user}} has arrived alone, and {{char}} approaches with the intention of asking {{user}} for a dance.`}
                    </p>
                  </Card>
                )}
              </div>

              <div className="flex justify-end pt-4">
                <Button size="lg" onClick={() => setStep(2)} data-testid="button-next-step">
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground" data-testid="heading-intro-greeting">Welcome your audience with a strong opening</h2>

              <div>
                <Label htmlFor="intro">Introduce this Scene to your audience</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  This is the starting screen of your Scene. Your audience reads this intro before entering the Scene. Help them understand what's happening and get excited to start playing the Scene.
                </p>
                <Textarea
                  id="intro"
                  placeholder="It is the late 1800s in New York City, and the city's elite have gathered at the glittering Grand Ball held at the Elegance House..."
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                  className="min-h-[150px] resize-none"
                  data-testid="input-intro"
                />
              </div>

              <div>
                <Label htmlFor="character-greeting">Character greeting</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  This is the first Character message your audience will see after entering the Scene. Make it your best.
                </p>
                <Textarea
                  id="character-greeting"
                  placeholder="*The music swells as the orchestra begins a new waltz. Laughter and chatter echo beneath the glittering crystal chandeliers..."
                  value={characterGreeting}
                  onChange={(e) => setCharacterGreeting(e.target.value)}
                  className="min-h-[150px] resize-none"
                  data-testid="input-character-greeting"
                />
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(1)} data-testid="button-previous-step">
                  Previous Step
                </Button>
                <Button size="lg" onClick={() => setStep(3)} data-testid="button-next-step">
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground" data-testid="heading-name-cover">Make your Scene stand out</h2>

              <div className="flex flex-col items-center gap-4">
                <Card className="w-64 h-64 border-2 border-dashed border-border flex flex-col items-center justify-center gap-4 bg-muted/20">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">Preview</p>
                </Card>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="scene-name">Name</Label>
                  <span className="text-xs text-muted-foreground">{sceneName.length}/60</span>
                </div>
                <Input
                  id="scene-name"
                  placeholder="Give your Scene a memorable name, e.g. 'Her Last Secret'"
                  value={sceneName}
                  onChange={(e) => setSceneName(e.target.value)}
                  maxLength={60}
                  data-testid="input-scene-name"
                />
              </div>

              <div>
                <Label>Cover Image</Label>
                <p className="text-sm text-muted-foreground mb-3">This is the image for Scene thumbnail and chat background.</p>
                <div className="flex gap-3">
                  <Button variant="outline" data-testid="button-upload-image">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                  <Button variant="outline" data-testid="button-generate-image">
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Or drag an image here</p>
              </div>

              <div>
                <Label>Chat color</Label>
                <div className="flex gap-2 mt-3 flex-wrap">
                  {chatColors.map((color, idx) => (
                    <button
                      key={idx}
                      className={`w-10 h-10 rounded-full ${color} border-2 ${selectedColor === color ? 'border-foreground' : 'border-transparent'}`}
                      onClick={() => setSelectedColor(color)}
                      data-testid={`color-${idx}`}
                    />
                  ))}
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

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(2)} data-testid="button-previous-step">
                  Previous Step
                </Button>
                <Button size="lg" data-testid="button-create-scene">
                  Create Scene
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
