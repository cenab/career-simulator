import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import RubricMeter from "./RubricMeter";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Objective {
  id: string;
  text: string;
  completed: boolean;
}

interface RubricScore {
  dimension: string;
  score: number;
  description: string;
}

interface CoachPanelProps {
  objectives: Objective[];
  rubricScores: RubricScore[];
  notes: string;
  onObjectiveToggle: (id: string) => void;
  onNotesChange: (notes: string) => void;
}

export default function CoachPanel({
  objectives,
  rubricScores,
  notes,
  onObjectiveToggle,
  onNotesChange,
}: CoachPanelProps) {
  const [isBranchMapOpen, setIsBranchMapOpen] = useState(false);

  return (
    <div className="w-[360px] border-l border-border bg-background overflow-y-auto" data-testid="coach-panel">
      <div className="p-4 space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3" data-testid="heading-objectives">
            Objectives
          </h3>
          <div className="space-y-2">
            {objectives.map((obj) => (
              <div key={obj.id} className="flex items-start gap-2" data-testid={`objective-${obj.id}`}>
                <Checkbox
                  id={obj.id}
                  checked={obj.completed}
                  onCheckedChange={() => onObjectiveToggle(obj.id)}
                  className="mt-0.5"
                  data-testid={`checkbox-objective-${obj.id}`}
                />
                <label
                  htmlFor={obj.id}
                  className={`text-sm cursor-pointer ${
                    obj.completed ? "line-through text-muted-foreground" : "text-foreground"
                  }`}
                  data-testid={`label-objective-${obj.id}`}
                >
                  {obj.text}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3" data-testid="heading-performance">
            Performance Metrics
          </h3>
          <div className="space-y-4">
            {rubricScores.map((metric) => (
              <RubricMeter key={metric.dimension} {...metric} />
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3" data-testid="heading-notes">
            Private Notes
          </h3>
          <Textarea
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder="Add your thoughts and observations..."
            className="min-h-[100px] text-sm"
            data-testid="textarea-notes"
          />
        </div>

        <Separator />

        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsBranchMapOpen(!isBranchMapOpen)}
            className="w-full justify-between p-0 h-auto"
            data-testid="button-toggle-branch-map"
          >
            <h3 className="text-sm font-semibold text-foreground">Branch Map</h3>
            {isBranchMapOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
          
          {isBranchMapOpen && (
            <Card className="mt-3 p-3 bg-muted/50" data-testid="branch-map-content">
              <p className="text-xs text-muted-foreground text-center">
                Decision flow visualization
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
