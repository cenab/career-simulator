import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReactNode, RefObject } from "react";

interface ScrollableSectionProps {
  title: string;
  titleTestId: string;
  scrollContainerRef: RefObject<HTMLDivElement>;
  onScrollLeft: () => void;
  onScrollRight: () => void;
  scrollLeftTestId: string;
  scrollRightTestId: string;
  children: ReactNode;
}

export default function ScrollableSection({
  title,
  titleTestId,
  scrollContainerRef,
  onScrollLeft,
  onScrollRight,
  scrollLeftTestId,
  scrollRightTestId,
  children,
}: ScrollableSectionProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground" data-testid={titleTestId}>
          {title}
        </h2>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={onScrollLeft} data-testid={scrollLeftTestId}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onScrollRight} data-testid={scrollRightTestId}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div ref={scrollContainerRef} className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {children}
      </div>
    </section>
  );
}
