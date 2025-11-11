import { useEffect, useState, useRef } from "react";
import { X, Send, Paperclip, Mic, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const [sessionId, setSessionId] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

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

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        handleAudioSend(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      
      toast({
        title: "Grabando audio",
        description: "Haz clic nuevamente para detener la grabación",
      });
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast({
        title: "Error",
        description: "No se pudo acceder al micrófono",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleAudioSend = async (audioBlob: Blob) => {
    const audioMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: "[Audio mensaje]",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, audioMessage]);

    // TODO: Implement audio transcription and AI response
    toast({
      title: "Audio enviado",
      description: "Procesando tu mensaje de audio...",
    });
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] h-[750px] flex flex-col p-0 gap-0 bg-gradient-to-b from-background to-muted/20">
        <DialogHeader className="px-8 py-6 border-b border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-foreground mb-1">
                Asistente Virtual
              </DialogTitle>
              <p className="text-sm text-muted-foreground">
                Conversación ID: {sessionId.slice(0, 8)}...
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

        <ScrollArea className="flex-1 px-8 py-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Mic className="h-10 w-10 text-primary" />
              </div>
              <div>
                <p className="text-lg font-medium text-foreground mb-2">
                  ¡Hola! ¿En qué puedo ayudarte?
                </p>
                <p className="text-sm text-muted-foreground">
                  Escribe un mensaje o graba un audio para comenzar
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  } animate-in fade-in slide-in-from-bottom-2 duration-300`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-5 py-3 shadow-sm ${
                      message.role === "user"
                        ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground"
                        : "bg-gradient-to-br from-muted to-muted/80 text-foreground border border-border/50"
                    }`}
                  >
                    <p className="text-base leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-2 ${
                      message.role === "user" 
                        ? "text-primary-foreground/70" 
                        : "text-muted-foreground"
                    }`}>
                      {message.timestamp.toLocaleTimeString('es-ES', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="px-8 py-6 border-t border-border/50 bg-background/80 backdrop-blur-sm">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu mensaje..."
                className="min-h-[70px] max-h-[140px] resize-none pr-3 text-base rounded-xl border-2 focus:border-primary transition-all"
                rows={2}
                disabled={isRecording}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Button
                size="icon"
                onClick={toggleRecording}
                variant={isRecording ? "destructive" : "outline"}
                className={`h-[70px] w-14 rounded-xl transition-all ${
                  isRecording 
                    ? "animate-pulse shadow-lg shadow-destructive/50" 
                    : "hover:border-accent hover:text-accent"
                }`}
              >
                {isRecording ? (
                  <Square className="h-6 w-6" />
                ) : (
                  <Mic className="h-6 w-6" />
                )}
              </Button>
            </div>
            <div className="flex flex-col gap-3">
              <Button
                size="icon"
                onClick={handleFileAttach}
                variant="outline"
                className="h-[70px] w-14 rounded-xl hover:border-secondary hover:text-secondary transition-all"
              >
                <Paperclip className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex flex-col gap-3">
              <Button
                size="icon"
                onClick={handleSend}
                className="h-[70px] w-14 rounded-xl bg-gradient-to-br from-accent to-accent/90 hover:from-accent/90 hover:to-accent shadow-lg shadow-accent/30 transition-all"
                disabled={!inputValue.trim() || isRecording}
              >
                <Send className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatWidget;
