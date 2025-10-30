import { Progress } from "@/components/ui/progress";

interface RubricMeterProps {
  dimension: string;
  score: number;
  maxScore?: number;
  description?: string;
}

const getScoreColor = (score: number, max: number) => {
  const percentage = (score / max) * 100;
  if (percentage >= 80) return "text-green-500";
  if (percentage >= 60) return "text-amber-500";
  return "text-red-500";
};

export default function RubricMeter({
  dimension,
  score,
  maxScore = 5,
  description,
}: RubricMeterProps) {
  const percentage = (score / maxScore) * 100;

  return (
    <div className="space-y-2" data-testid={`rubric-meter-${dimension.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-foreground" data-testid="text-dimension">
            {dimension}
          </h4>
          {description && (
            <p className="text-xs text-muted-foreground" data-testid="text-description">
              {description}
            </p>
          )}
        </div>
        <span
          className={`text-sm font-semibold tabular-nums ${getScoreColor(score, maxScore)}`}
          data-testid="text-score"
        >
          {score.toFixed(1)}/{maxScore}
        </span>
      </div>
      <Progress value={percentage} className="h-2" data-testid="progress-bar" />
    </div>
  );
}
