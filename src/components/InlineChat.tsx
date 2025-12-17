import { ChatInterface } from "./ChatInterface";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Bot } from "lucide-react";

export const InlineChat = () => {
    return (
        <Card className="w-full h-[600px] flex flex-col border-2 shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 border-b py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Bot className="h-6 w-6" />
                    </div>
                    <div>
                        <CardTitle className="text-xl">Asistente Virtual</CardTitle>
                        <p className="text-sm text-muted-foreground">Estamos en línea para ayudarte</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden">
                <ChatInterface className="h-full" />
            </CardContent>
        </Card>
    );
};
