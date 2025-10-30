import SceneCard from "../SceneCard";
import crisisImage from "@assets/generated_images/Crisis_Manager_scene_thumbnail_43e30343.png";

export default function SceneCardExample() {
  return (
    <div className="p-8 bg-background">
      <SceneCard
        id="crisis-manager"
        title="Crisis Manager: Vendor Breach"
        slug="crisis-manager-vendor-breach"
        thumbnail={crisisImage}
        creator={{
          handle: "careersim",
          avatar: undefined,
        }}
        difficulty="hard"
        duration={20}
        mode="solo"
        skills={["Crisis Management", "Communication", "Decision Making"]}
        rating={4.8}
        plays={12453}
        size="medium"
        onStart={() => console.log("Start scene clicked")}
      />
    </div>
  );
}
