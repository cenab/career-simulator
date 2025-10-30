import CoachPanel from "../CoachPanel";
import { useState } from "react";

export default function CoachPanelExample() {
  const [objectives, setObjectives] = useState([
    { id: "1", text: "Identify the scope of the breach", completed: true },
    { id: "2", text: "Communicate with affected stakeholders", completed: true },
    { id: "3", text: "Propose mitigation strategies", completed: false },
    { id: "4", text: "Address long-term prevention", completed: false },
  ]);

  const [notes, setNotes] = useState("");

  const rubricScores = [
    { dimension: "Clarity", score: 4.2, description: "Clear communication" },
    { dimension: "Empathy", score: 3.8, description: "Stakeholder consideration" },
    { dimension: "Decision Making", score: 4.5, description: "Effective solutions" },
  ];

  const handleObjectiveToggle = (id: string) => {
    setObjectives(objectives.map(obj =>
      obj.id === id ? { ...obj, completed: !obj.completed } : obj
    ));
  };

  return (
    <div className="h-screen bg-background">
      <CoachPanel
        objectives={objectives}
        rubricScores={rubricScores}
        notes={notes}
        onObjectiveToggle={handleObjectiveToggle}
        onNotesChange={setNotes}
      />
    </div>
  );
}
