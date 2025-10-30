import TopBar from "../TopBar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function TopBarExample() {
  return (
    <SidebarProvider>
      <div className="bg-background">
        <TopBar onSearch={(query) => console.log("Search:", query)} />
      </div>
    </SidebarProvider>
  );
}
