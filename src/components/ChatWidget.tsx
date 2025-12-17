import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChatInterface } from "./ChatInterface";
import { useEffect, useState } from "react";

interface ChatWidgetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ChatWidget = ({ open, onOpenChange }: ChatWidgetProps) => {
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    let storedSessionId = localStorage.getItem("chat_session_id");
    if (storedSessionId) {
      setSessionId(storedSessionId);
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] h-[600px] flex flex-col p-0 gap-0 bg-gradient-to-b from-background to-muted/20">
        <DialogHeader className="px-8 py-6 border-b border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-foreground mb-1">
                Asistente Goviel
              </DialogTitle>
              <p className="text-sm text-muted-foreground">
                Conversación ID: {sessionId ? sessionId.slice(0, 8) : "..."}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-10 w-10 rounded-full hover:bg-destructive/10 hover:text-destructive transition-all"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <ChatInterface className="flex-1 overflow-hidden" />
      </DialogContent>
    </Dialog>
  );
};

export default ChatWidget;
