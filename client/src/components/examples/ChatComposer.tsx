import ChatComposer from "../ChatComposer";

export default function ChatComposerExample() {
  return (
    <div className="bg-background">
      <ChatComposer
        onSend={(msg) => console.log("Sent:", msg)}
        showToneHelper={true}
      />
    </div>
  );
}
