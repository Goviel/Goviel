import { useState } from "react";
import { MessageSquare, Bot, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ChatWidget from "./ChatWidget";
import { supabase } from "@/integrations/supabase/client";

const FAB = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const handleWhatsAppClick = async () => {
    // Track WhatsApp click
    try {
      await supabase
        .from("metrics")
        .insert([{ event_type: "whatsapp_click" }]);
    } catch (error) {
      console.error("Error tracking WhatsApp click:", error);
    }
    
    window.open("https://wa.me/528441234567", "_blank");
  };

  const handleChatbotClick = async () => {
    // Track chat open
    try {
      await supabase
        .from("metrics")
        .insert([{ event_type: "chat_open" }]);
    } catch (error) {
      console.error("Error tracking chat open:", error);
    }
    
    setIsChatOpen(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
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
            <MessageCircle className="mr-2 h-5 w-5 text-green-600" />
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
