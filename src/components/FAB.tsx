import { MessageSquare, Bot, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const FAB = () => {
  const handleWhatsAppClick = () => {
    // Placeholder: Will be implemented with actual WhatsApp link
    window.open("https://wa.me/528441234567", "_blank");
  };

  const handleChatbotClick = () => {
    // Placeholder: Will be implemented with chatbot functionality
    console.log("Open chatbot");
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
    </div>
  );
};

export default FAB;
