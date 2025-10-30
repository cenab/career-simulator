import ChatMessage from "../ChatMessage";

export default function ChatMessageExample() {
  return (
    <div className="p-8 bg-background space-y-4 max-w-3xl">
      <ChatMessage
        speaker="ai"
        text="Good morning. I understand there's been a security incident with one of our vendors. Can you walk me through what happened?"
        timestamp={new Date(Date.now() - 300000)}
        characterName="CEO Jennifer Martinez"
      />
      <ChatMessage
        speaker="user"
        text="Yes, we discovered this morning that our payment processor experienced a data breach. Approximately 10,000 customer records may have been exposed."
        timestamp={new Date(Date.now() - 240000)}
      />
      <ChatMessage
        speaker="event"
        text="💡 Key Moment: Crisis communication decision point"
        timestamp={new Date(Date.now() - 180000)}
      />
      <ChatMessage
        speaker="ai"
        text="This is serious. What's your recommended action plan?"
        timestamp={new Date(Date.now() - 120000)}
        characterName="CEO Jennifer Martinez"
      />
    </div>
  );
}
