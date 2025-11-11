import { useEffect, useState } from "react";
import { X, Send, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ChatWidgetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const ChatWidget = ({ open, onOpenChange }: ChatWidgetProps) => {
  const [sessionId, setSessionId] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // Check localStorage for chat_session_id
    let storedSessionId = localStorage.getItem("chat_session_id");
    
    if (!storedSessionId) {
      // Generate UUID v4 and store it
      storedSessionId = crypto.randomUUID();
      localStorage.setItem("chat_session_id", storedSessionId);
    }
    
    setSessionId(storedSessionId);
  }, []);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    // TODO: Implement AI response logic
  };

  const handleFileAttach = () => {
    // TODO: Implement file attachment logic
    console.log("Attach file clicked");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-foreground">
              Asistente Virtual
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 py-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p className="text-sm">
                Envía un mensaje para comenzar la conversación
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="px-6 py-4 border-t border-border">
          <div className="flex gap-2">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu mensaje..."
              className="min-h-[60px] max-h-[120px] resize-none"
              rows={2}
            />
            <div className="flex flex-col gap-2">
              <Button
                size="icon"
                onClick={handleFileAttach}
                variant="outline"
                className="h-10 w-10"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                onClick={handleSend}
                className="h-10 w-10 bg-accent hover:bg-accent/90"
                disabled={!inputValue.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatWidget;
