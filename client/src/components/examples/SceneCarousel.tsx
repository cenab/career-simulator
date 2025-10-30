import SceneCarousel from "../SceneCarousel";
import crisisImage from "@assets/generated_images/Crisis_Manager_scene_thumbnail_43e30343.png";
import startupImage from "@assets/generated_images/Startup_Chaos_scene_thumbnail_97e7d32a.png";
import interviewImage from "@assets/generated_images/Interview_Practice_scene_thumbnail_ce7d07aa.png";
import politicsImage from "@assets/generated_images/Corporate_Politics_scene_thumbnail_587f87ca.png";

export default function SceneCarouselExample() {
  const mockScenes = [
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
      title: "Master the Interview",
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
  ];

  return (
    <div className="p-8 bg-background">
      <SceneCarousel
        title="Popular This Week"
        scenes={mockScenes}
        onViewAll={() => console.log("View all clicked")}
      />
    </div>
  );
}
