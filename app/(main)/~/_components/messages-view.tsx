import AiInput from "@/components/ui/ai-input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { messages } from "@/constants/data";
import { MessageItem } from "./message-item";

export default function MessagesView() {
  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="h-[calc(100vh-200px)] sm:h-[calc(100vh-240px)] md:h-[calc(100vh-280px)]">
        <div className="space-y-2 md:space-y-4 p-2 md:p-4 pb-2 md:pb-4">
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
        </div>
      </ScrollArea>
      <div className="px-2 md:px-4 bg-background">
        <AiInput />
      </div>
    </div>
  );
}
