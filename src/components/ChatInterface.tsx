import { useEffect, useState, useRef } from "react";
import { Send, Paperclip, Mic, Square, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { chatwootService } from "@/services/chatwoot";

export interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
    files?: Array<{
        name: string;
        url: string;
        type: string;
    }>;
}

interface ChatInterfaceProps {
    className?: string;
}

export const ChatInterface = ({ className }: ChatInterfaceProps) => {
    const { toast } = useToast();
    const [sessionId, setSessionId] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [showUploadHint, setShowUploadHint] = useState(false);
    const [chatwootSourceId, setChatwootSourceId] = useState<string | null>(null);
    const [chatwootConversationId, setChatwootConversationId] = useState<number | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Check localStorage for chat_session_id
        let storedSessionId = localStorage.getItem("chat_session_id");

        if (!storedSessionId) {
            // Generate UUID v4 and store it
            storedSessionId = crypto.randomUUID();
            localStorage.setItem("chat_session_id", storedSessionId);
        }

        setSessionId(storedSessionId);

        // Restore Chatwoot session
        const storedSourceId = localStorage.getItem("chatwoot_source_id");
        const storedConversationId = localStorage.getItem("chatwoot_conversation_id");

        if (storedSourceId) setChatwootSourceId(storedSourceId);
        if (storedConversationId) setChatwootConversationId(Number(storedConversationId));

        // Initial load if session exists
        if (storedSourceId && storedConversationId) {
            fetchMessages(storedSourceId, Number(storedConversationId));
        }

        // Check for upload hint
        const hasSeenHint = localStorage.getItem("has_seen_upload_hint");
        if (!hasSeenHint) {
            // Show hint after a short delay to be less intrusive
            setTimeout(() => setShowUploadHint(true), 1500);
        }
    }, []);

    const dismissUploadHint = () => {
        setShowUploadHint(false);
        localStorage.setItem("has_seen_upload_hint", "true");
    };

    // Polling for new messages
    useEffect(() => {
        if (!chatwootSourceId || !chatwootConversationId) return;

        const intervalId = setInterval(() => {
            fetchMessages(chatwootSourceId, chatwootConversationId);
        }, 3000); // Poll every 3 seconds

        return () => clearInterval(intervalId);
    }, [chatwootSourceId, chatwootConversationId]);

    const fetchMessages = async (sourceId: string, conversationId: number) => {
        try {
            const messagesData = await chatwootService.getMessages(sourceId, conversationId);

            const formattedMessages: Message[] = messagesData.map((msg: any) => ({
                id: msg.id.toString(),
                role: msg.message_type === 0 ? 'user' : 'assistant',
                content: msg.content || (msg.attachments && msg.attachments.length > 0 ? "Archivo adjunto" : ""),
                timestamp: new Date(msg.created_at * 1000),
                files: msg.attachments?.map((att: any) => ({
                    name: "Archivo adjunto",
                    url: att.data_url,
                    type: att.file_type || "application/octet-stream"
                }))
            }));

            setMessages(formattedMessages);
        } catch (error: any) {
            console.error("Error fetching messages:", error);
            if (error.status === 404) {
                setChatwootConversationId(null);
                setChatwootSourceId(null);
                localStorage.removeItem("chatwoot_conversation_id");
                localStorage.removeItem("chatwoot_source_id");
            }
        }
    };

    const handleSend = async () => {
        if (!inputValue.trim() && selectedFiles.length === 0) return;

        const currentInput = inputValue;
        const currentFiles = [...selectedFiles];

        // Optimistic update
        const tempFiles = currentFiles.map(file => ({
            name: file.name,
            url: URL.createObjectURL(file),
            type: file.type
        }));

        const newMessage: Message = {
            id: crypto.randomUUID(),
            role: "user",
            content: currentInput,
            timestamp: new Date(),
            files: tempFiles.length > 0 ? tempFiles : undefined
        };

        setMessages((prev) => [...prev, newMessage]);
        setInputValue("");
        setSelectedFiles([]);
        setIsUploading(true);

        try {
            let sourceId = chatwootSourceId;

            // 1. Register contact if needed
            if (!sourceId) {
                const contact = await chatwootService.registerContact(sessionId);
                sourceId = contact.source_id;
                setChatwootSourceId(sourceId);
                localStorage.setItem("chatwoot_source_id", sourceId);
            }

            // 2. Create conversation if needed
            let conversationId = chatwootConversationId;
            if (!conversationId) {
                const conversation = await chatwootService.createConversation(sourceId);
                conversationId = conversation.id;
                setChatwootConversationId(conversationId);
                localStorage.setItem("chatwoot_conversation_id", String(conversationId));
            }

            // 3. Send message to Chatwoot
            await chatwootService.sendMessage(sourceId, conversationId, currentInput, currentFiles);

        } catch (error: any) {
            console.error("Error sending message to Chatwoot:", error);
            if (error.status === 404) {
                setChatwootConversationId(null);
                setChatwootSourceId(null);
                localStorage.removeItem("chatwoot_conversation_id");
                localStorage.removeItem("chatwoot_source_id");
            }
            toast({
                title: "Error",
                description: "No se pudo enviar el mensaje al soporte.",
                variant: "destructive",
            });
        } finally {
            setIsUploading(false);
        }
    };

    const handleFileAttach = () => {
        fileInputRef.current?.click();
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const newFiles = Array.from(files);
        setSelectedFiles((prev) => [...prev, ...newFiles]);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const removeFile = (indexToRemove: number) => {
        setSelectedFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
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
        setIsUploading(true);

        const audioFile = new File([audioBlob], `voice_message_${Date.now()}.webm`, {
            type: "audio/webm"
        });

        const audioMessage: Message = {
            id: crypto.randomUUID(),
            role: "user",
            content: "[Audio mensaje]",
            timestamp: new Date(),
            files: [{
                name: audioFile.name,
                url: URL.createObjectURL(audioBlob),
                type: audioFile.type
            }]
        };

        setMessages((prev) => [...prev, audioMessage]);

        try {
            let sourceId = chatwootSourceId;

            if (!sourceId) {
                const contact = await chatwootService.registerContact(sessionId);
                sourceId = contact.source_id;
                setChatwootSourceId(sourceId);
                localStorage.setItem("chatwoot_source_id", sourceId);
            }

            let conversationId = chatwootConversationId;
            if (!conversationId) {
                const conversation = await chatwootService.createConversation(sourceId);
                conversationId = conversation.id;
                setChatwootConversationId(conversationId);
                localStorage.setItem("chatwoot_conversation_id", String(conversationId));
            }

            await chatwootService.sendMessage(sourceId, conversationId, "", [audioFile]);

            toast({
                title: "Audio enviado",
                description: "Tu mensaje de audio se ha enviado correctamente.",
            });

        } catch (error: any) {
            console.error("Error sending audio to Chatwoot:", error);
            if (error.status === 404) {
                setChatwootConversationId(null);
                setChatwootSourceId(null);
                localStorage.removeItem("chatwoot_conversation_id");
                localStorage.removeItem("chatwoot_source_id");
            }
            toast({
                title: "Error",
                description: "No se pudo enviar el audio.",
                variant: "destructive",
            });
        } finally {
            setIsUploading(false);
        }
    };

    const toggleRecording = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        // Only set to false if leaving the main container
        if (e.currentTarget.contains(e.relatedTarget as Node)) return;
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (!files || files.length === 0) return;

        // Filter accepted file types matches input accept: image/*,.pdf,.doc,.docx,.txt
        const acceptedTypes = ['image/', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];

        const validFiles = Array.from(files).filter(file =>
            acceptedTypes.some(type => file.type.startsWith(type.replace('*', '')) || file.type.match(type))
        );

        if (validFiles.length > 0) {
            setSelectedFiles((prev) => [...prev, ...validFiles]);
        } else {
            toast({
                title: "Formato no válido",
                description: "Solo se aceptan imágenes y documentos (PDF, DOC, TXT).",
                variant: "destructive",
            });
        }
    };

    return (
        <div
            className={`flex flex-col h-full bg-gradient-to-b from-background to-muted/20 relative ${className}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {isDragging && (
                <div className="absolute inset-0 z-50 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center border-2 border-dashed border-primary m-4 rounded-xl animate-in fade-in duration-200">
                    <div className="p-4 bg-primary/10 rounded-full mb-4">
                        <Paperclip className="h-10 w-10 text-primary" />
                    </div>
                    <p className="text-xl font-bold text-primary">Suelta tus archivos aquí</p>
                    <p className="text-sm text-muted-foreground mt-2">Imágenes, PDF, Word o Texto</p>
                </div>
            )}
            <ScrollArea className="flex-1 w-full bg-background/50">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full px-4 text-center space-y-4 py-8">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <Mic className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <p className="text-lg font-medium">¡Hola! ¿En qué puedo ayudarte?</p>
                            <p className="text-sm text-muted-foreground">Escribe o graba un audio</p>
                        </div>
                        {sessionId && (
                            <p className="text-xs text-muted-foreground mt-4">
                                ID: {sessionId.slice(0, 8)}
                            </p>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col gap-3 px-4 py-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex w-full ${message.role === "user" ? "justify-end" : "justify-start"
                                    } animate-in fade-in slide-in-from-bottom-1 duration-200`}
                            >
                                <div
                                    className={`flex flex-col max-w-[80%] px-4 py-2 shadow-sm ${message.role === "user"
                                        ? "bg-primary text-primary-foreground rounded-2xl rounded-tr-sm"
                                        : "bg-muted text-foreground rounded-2xl rounded-tl-sm"
                                        }`}
                                >
                                    <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
                                        {message.content}
                                    </p>

                                    {message.files && message.files.length > 0 && (
                                        <div className="mt-2 space-y-1">
                                            {message.files.map((file, idx) => (
                                                <a
                                                    key={idx}
                                                    href={file.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`flex items-center gap-2 text-xs p-2 rounded-md transition-colors border ${message.role === "user"
                                                        ? "bg-primary-foreground/10 border-primary-foreground/20"
                                                        : "bg-background border-border"
                                                        }`}
                                                >
                                                    <Paperclip className="h-3 w-3 shrink-0" />
                                                    <span className="truncate max-w-[140px]">{file.name}</span>
                                                </a>
                                            ))}
                                        </div>
                                    )}

                                    <span
                                        className={`text-[10px] mt-1 opacity-70 ${message.role === "user" ? "text-right" : "text-left"
                                            }`}
                                    >
                                        {message.timestamp.toLocaleTimeString("es-ES", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <div className="h-1" />
                    </div>
                )}
            </ScrollArea>

            <div className="px-4 py-4 border-t border-border/50 bg-background/80 backdrop-blur-sm">
                {selectedFiles.length > 0 && (
                    <div className="flex gap-2 mb-3 overflow-x-auto py-2">
                        {selectedFiles.map((file, index) => (
                            <div key={index} className="relative flex-shrink-0 group">
                                <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg border border-border/50 pr-8">
                                    <div className="w-8 h-8 rounded bg-background flex items-center justify-center">
                                        {file.type.startsWith('image/') ? (
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt={file.name}
                                                className="w-full h-full object-cover rounded"
                                            />
                                        ) : (
                                            <Paperclip className="h-4 w-4 text-muted-foreground" />
                                        )}
                                    </div>
                                    <span className="text-xs max-w-[100px] truncate">{file.name}</span>
                                </div>
                                <button
                                    onClick={() => removeFile(index)}
                                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <div className="flex gap-2">
                    <div className="flex-1 relative">
                        {showUploadHint && (
                            <div className="absolute bottom-full mb-3 left-0 bg-blue-600 text-white text-xs px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom-2 fade-in duration-300 z-10 max-w-[250px]">
                                <span>💡 Tip: Puedes subir fotos de referencia del producto que necesitas.</span>
                                <button onClick={dismissUploadHint} className="hover:bg-blue-700 rounded-full p-0.5 transition-colors">
                                    <X className="h-3 w-3" />
                                </button>
                                <div className="absolute -bottom-1 left-4 w-2 h-2 bg-blue-600 rotate-45"></div>
                            </div>
                        )}
                        <Textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Escribe tu mensaje..."
                            className="min-h-[50px] max-h-[100px] resize-none pr-3 text-base rounded-xl border-2 focus:border-primary transition-all"
                            rows={1}
                            disabled={isRecording}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button
                            size="icon"
                            onClick={toggleRecording}
                            variant={isRecording ? "destructive" : "outline"}
                            className={`h-[50px] w-12 rounded-xl transition-all ${isRecording
                                ? "animate-pulse shadow-lg shadow-destructive/50"
                                : "hover:border-accent hover:text-accent"
                                }`}
                        >
                            {isRecording ? (
                                <Square className="h-5 w-5" />
                            ) : (
                                <Mic className="h-5 w-5" />
                            )}
                        </Button>

                        <div className="relative">
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                onChange={handleFileSelect}
                                className="hidden"
                                accept="image/*,.pdf,.doc,.docx,.txt"
                            />
                            <Button
                                size="icon"
                                onClick={handleFileAttach}
                                variant="outline"
                                className="h-[50px] w-12 rounded-xl hover:border-secondary hover:text-secondary transition-all"
                                disabled={isUploading || isRecording}
                            >
                                <Paperclip className="h-5 w-5" />
                            </Button>
                        </div>

                        <Button
                            size="icon"
                            onClick={handleSend}
                            className="h-[50px] w-12 rounded-xl bg-gradient-to-br from-accent to-accent/90 hover:from-accent/90 hover:to-accent shadow-lg shadow-accent/30 transition-all"
                            disabled={(!inputValue.trim() && selectedFiles.length === 0) || isRecording || isUploading}
                        >
                            <Send className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
