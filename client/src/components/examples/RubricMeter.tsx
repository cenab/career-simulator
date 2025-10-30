import RubricMeter from "../RubricMeter";

export default function RubricMeterExample() {
  return (
    <div className="p-8 bg-background space-y-4 max-w-md">
      <RubricMeter
        dimension="Clarity"
        score={4.2}
        description="Clear and concise communication"
      />
      <RubricMeter
        dimension="Empathy"
        score={3.8}
        description="Understanding and consideration"
      />
      <RubricMeter
        dimension="Decision Making"
        score={4.5}
        description="Effective problem resolution"
      />
    </div>
  );
}
