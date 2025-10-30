import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import TopBar from "@/components/TopBar";
import HeroCarousel from "@/components/HeroCarousel";
import SceneCarousel from "@/components/SceneCarousel";
import crisisImage from "@assets/generated_images/Crisis_Manager_scene_thumbnail_43e30343.png";
import startupImage from "@assets/generated_images/Startup_Chaos_scene_thumbnail_97e7d32a.png";
import interviewImage from "@assets/generated_images/Interview_Practice_scene_thumbnail_ce7d07aa.png";
import politicsImage from "@assets/generated_images/Corporate_Politics_scene_thumbnail_587f87ca.png";
import stakeholderImage from "@assets/generated_images/Stakeholder_Management_scene_thumbnail_94691d95.png";

export default function Discover() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  const heroScenes = [
    {
      id: "1",
      title: "Crisis Manager: Vendor Breach",
      tagline: "Navigate a critical security incident with executive stakeholders",
      thumbnail: crisisImage,
      difficulty: "hard" as const,
      duration: 20,
      skills: ["Crisis Management", "Communication", "Decision Making"],
    },
    {
      id: "2",
      title: "Startup Chaos Mode",
      tagline: "Thrive in the fast-paced environment of a growing startup",
      thumbnail: startupImage,
      difficulty: "medium" as const,
      duration: 15,
      skills: ["Adaptability", "Problem Solving", "Team Collaboration"],
    },
    {
      id: "3",
      title: "Master the Interview",
      tagline: "Perfect your interview skills with AI-powered practice sessions",
      thumbnail: interviewImage,
      difficulty: "easy" as const,
      duration: 10,
      skills: ["Communication", "Confidence", "Professional Presence"],
    },
  ];

  const popularScenes = [
    {
      id: "1",
      title: "Crisis Manager: Vendor Breach",
      slug: "crisis-manager",
      thumbnail: crisisImage,
      creator: { handle: "careersim" },
      difficulty: "hard" as const,
      duration: 20,
      mode: "solo" as const,
      skills: ["Crisis Management", "Communication"],
      rating: 4.8,
      plays: 12453,
    },
    {
      id: "2",
      title: "Startup Chaos Mode",
      slug: "startup-chaos",
      thumbnail: startupImage,
      creator: { handle: "hrpro" },
      difficulty: "medium" as const,
      duration: 15,
      mode: "solo" as const,
      skills: ["Adaptability", "Problem Solving"],
      rating: 4.6,
      plays: 8921,
    },
    {
      id: "3",
      title: "Interview Practice Pro",
      slug: "interview-practice",
      thumbnail: interviewImage,
      creator: { handle: "careers101" },
      difficulty: "easy" as const,
      duration: 10,
      mode: "solo" as const,
      skills: ["Communication", "Confidence"],
      rating: 4.9,
      plays: 25678,
    },
    {
      id: "4",
      title: "Corporate Politics 101",
      slug: "corporate-politics",
      thumbnail: politicsImage,
      creator: { handle: "leadership" },
      difficulty: "medium" as const,
      duration: 25,
      mode: "solo" as const,
      skills: ["Stakeholder Mgmt", "Negotiation"],
      rating: 4.7,
      plays: 6543,
    },
    {
      id: "5",
      title: "Stakeholder Management",
      slug: "stakeholder-mgmt",
      thumbnail: stakeholderImage,
      creator: { handle: "businesspro" },
      difficulty: "medium" as const,
      duration: 18,
      mode: "solo" as const,
      skills: ["Presentation", "Persuasion"],
      rating: 4.5,
      plays: 5234,
    },
  ];

  const newScenes = popularScenes.slice(0, 4);
  const featuredScenes = [...popularScenes].reverse().slice(0, 4);

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full bg-background">
        <AppSidebar currentPath="/home" userHandle="johndoe" />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <TopBar />
          
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto p-6 space-y-12">
              <HeroCarousel scenes={heroScenes} />
              
              <SceneCarousel
                title="Popular This Week"
                scenes={popularScenes}
                onViewAll={() => console.log("View all popular")}
              />
              
              <SceneCarousel
                title="New Releases"
                scenes={newScenes}
                onViewAll={() => console.log("View all new")}
              />
              
              <SceneCarousel
                title="Featured"
                scenes={featuredScenes}
                onViewAll={() => console.log("View all featured")}
              />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
