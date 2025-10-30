import HeroCarousel from "../HeroCarousel";
import crisisImage from "@assets/generated_images/Crisis_Manager_scene_thumbnail_43e30343.png";
import startupImage from "@assets/generated_images/Startup_Chaos_scene_thumbnail_97e7d32a.png";
import interviewImage from "@assets/generated_images/Interview_Practice_scene_thumbnail_ce7d07aa.png";

export default function HeroCarouselExample() {
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

  return (
    <div className="p-8 bg-background">
      <HeroCarousel scenes={heroScenes} />
    </div>
  );
}
