import { useState, useEffect } from "react";
import { MessageSquare, Bot, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import ChatWidget from "./ChatWidget";
// import { supabase } from "@/integrations/supabase/client";

const FAB = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showWelcomeNote, setShowWelcomeNote] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const dismissed = localStorage.getItem("welcome_note_dismissed");
      if (dismissed) return;

      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = scrollTop / scrollHeight;

      if (scrollPercentage > 0.5) {
        setShowWelcomeNote(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCloseNote = () => {
    setShowWelcomeNote(false);
    localStorage.setItem("welcome_note_dismissed", "true");
  };

  const handleWhatsAppClick = async () => {
    // Track WhatsApp click
    /*
    try {
      await supabase
        .from("metrics")
        .insert([{ event_type: "whatsapp_click" }]);
    } catch (error) {
      console.error("Error tracking WhatsApp click:", error);
    }
    */

    window.open("https://wa.me/528441010286?text=Hola", "_blank");
    handleCloseNote();
  };

  const handleChatbotClick = async () => {
    // Track chat open
    /*
    try {
      await supabase
        .from("metrics")
        .insert([{ event_type: "chat_open" }]);
    } catch (error) {
      console.error("Error tracking chat open:", error);
    }
    */

    setIsChatOpen(true);
    handleCloseNote();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {showWelcomeNote && (
        <Card className="w-72 p-4 shadow-xl border-2 animate-in fade-in slide-in-from-bottom-4 duration-500 relative bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1 right-1 h-6 w-6 text-muted-foreground hover:text-foreground"
            onClick={handleCloseNote}
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="mb-3">
            <h3 className="font-semibold text-lg mb-1">¡Hola! 👋</h3>
            <p className="text-sm text-muted-foreground">¿Buscas equipo industrial? Puedo cotizarte ahora mismo.</p>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="w-full justify-start gap-2 hover:bg-accent/10 hover:text-accent hover:border-accent/20 transition-colors"
              onClick={handleWhatsAppClick}
            >
              <MessageCircle className="h-4 w-4 text-accent" />
              WhatsApp
            </Button>
            <Button
              variant="default"
              className="w-full justify-start gap-2"
              onClick={handleChatbotClick}
            >
              <Bot className="h-4 w-4" />
              Asistente Virtual
            </Button>
          </div>
        </Card>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="lg"
            className="h-14 w-14 rounded-full bg-accent hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all"
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 bg-background border-2 z-50"
        >
          <DropdownMenuItem
            onClick={handleWhatsAppClick}
            className="cursor-pointer py-3"
          >
            <MessageCircle className="mr-2 h-5 w-5 text-accent" />
            <span className="text-base font-medium">Chatea por WhatsApp</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleChatbotClick}
            className="cursor-pointer py-3"
          >
            <Bot className="mr-2 h-5 w-5 text-primary" />
            <span className="text-base font-medium">Asistente Virtual</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ChatWidget open={isChatOpen} onOpenChange={setIsChatOpen} />
    </div>
  );
};

export default FAB;
