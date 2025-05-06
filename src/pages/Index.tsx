
import ChatContainer from "@/components/ChatContainer";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="w-full max-w-4xl mx-auto flex flex-col bg-card rounded-lg shadow-lg overflow-hidden sm:my-8 my-0 sm:h-[calc(100vh-4rem)] h-screen">
        <ChatContainer />
      </div>
    </div>
  );
};

export default Index;
