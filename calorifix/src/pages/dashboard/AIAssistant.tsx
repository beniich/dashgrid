import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Send,
    Bot,
    User,
    Sparkles,
    Image as ImageIcon,
    FileText,
    Dumbbell,
    Utensils,
    Loader2,
    Paperclip,
    Mic
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    type: "text" | "image";
    timestamp: Date;
}

export default function AIAssistant() {
    const [messages, setMessages] = useState<Message[]>([]); // Start empty for "Lovable" feel
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const hasMessages = messages.length > 0;

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async (content: string) => {
        if (!content.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: content,
            type: "text",
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newMessage]);
        setInputValue("");
        setIsLoading(true);

        // Simulation de réponse IA
        setTimeout(() => {
            let aiResponseContent = "";
            let aiResponseType: "text" | "image" = "text";

            if (content.toLowerCase().includes("image") || content.toLowerCase().includes("visuel")) {
                aiResponseContent = "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop&q=60";
                aiResponseType = "image";
            } else if (content.toLowerCase().includes("programme")) {
                aiResponseContent = `Voici un programme suggéré :

**Jour 1 : Pectoraux / Triceps**
- Développé couché : 4x8-10
- Dips : 3xMax

**Jour 2 : Dos / Biceps**
- Tractions : 4xMax
- Curl barre : 3x12`;
            } else {
                aiResponseContent = "Je peux vous aider à optimiser votre entraînement. Avez-vous besoin d'un programme spécifique ?";
            }

            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: aiResponseContent,
                type: aiResponseType,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiResponse]);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="flex h-[calc(100vh-2rem)] flex-col relative bg-background">
            <div className="flex-1 flex flex-col items-center w-full max-w-4xl mx-auto px-4">

                {/* Empty State / Welcome Screen */}
                {!hasMessages && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 w-full max-w-2xl mt-[-10vh]">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4"
                        >
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                                Comment puis-je vous aider ?
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                Je suis votre assistant GymFlow.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="grid grid-cols-2 gap-4 w-full"
                        >
                            {[
                                { icon: Dumbbell, label: "Programme de prise de masse", action: "Crée un programme de musculation" },
                                { icon: Utensils, label: "Plan nutritionnel", action: "Génère un plan nutritionnel" },
                                { icon: ImageIcon, label: "Générer un visuel", action: "Génère une image de sport" },
                                { icon: FileText, label: "Analyser mes stats", action: "Analyse mes performances" },
                            ].map((item, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSendMessage(item.action)}
                                    className="flex flex-col items-start p-4 rounded-xl border bg-card/50 hover:bg-card/80 transition-all hover:scale-[1.02] text-left gap-3 group"
                                >
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm">{item.label}</div>
                                    </div>
                                </button>
                            ))}
                        </motion.div>
                    </div>
                )}

                {/* Messages Area */}
                {hasMessages && (
                    <ScrollArea className="flex-1 w-full px-4 py-6" ref={scrollAreaRef}>
                        <div className="space-y-8 pb-4">
                            {messages.map((m) => (
                                <motion.div
                                    key={m.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-4 max-w-3xl mx-auto ${m.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    {m.role === "assistant" && (
                                        <Avatar className="h-8 w-8 mt-1 border">
                                            <AvatarFallback><Bot size={16} /></AvatarFallback>
                                        </Avatar>
                                    )}

                                    <div className={`flex flex-col gap-1 max-w-[80%] ${m.role === "user" ? "items-end" : "items-start"}`}>
                                        <div
                                            className={`py-3 px-4 rounded-2xl text-base ${m.role === "user"
                                                    ? "bg-primary/10 text-foreground" // Minimalist user bubble
                                                    : "text-foreground" // No background for AI text, cleaner look
                                                }`}
                                        >
                                            {m.type === "image" ? (
                                                <img src={m.content} alt="AI generated" className="rounded-lg shadow-sm max-w-full h-auto mt-2" />
                                            ) : (
                                                <div className="whitespace-pre-wrap leading-7">{m.content}</div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex gap-4 max-w-3xl mx-auto">
                                    <Avatar className="h-8 w-8 border">
                                        <AvatarFallback><Bot size={16} /></AvatarFallback>
                                    </Avatar>
                                    <div className="flex items-center gap-2 text-muted-foreground text-sm py-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Thinking...
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                )}

                {/* Input Area - Fixed at bottom */}
                <div className={`w-full max-w-3xl mx-auto p-4 transition-all duration-500 ease-out ${!hasMessages ? "mb-[20vh]" : "mb-0"}`}>
                    <div className="relative flex items-center bg-muted/30 border rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                        <Button variant="ghost" size="icon" className="ml-2 text-muted-foreground hover:text-foreground">
                            <Paperclip size={20} />
                        </Button>
                        <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSendMessage(inputValue))}
                            placeholder="Message GymFlow AI..."
                            className="flex-1 border-none shadow-none focus-visible:ring-0 bg-transparent py-6 text-base"
                        />
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                            <Mic size={20} />
                        </Button>
                        <Button
                            onClick={() => handleSendMessage(inputValue)}
                            disabled={!inputValue.trim() || isLoading}
                            size="icon"
                            className={`mr-2 h-9 w-9 transition-all ${inputValue.trim() ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                        >
                            <Send size={18} />
                        </Button>
                    </div>

                    {!hasMessages && (
                        <div className="text-center mt-4 text-xs text-muted-foreground">
                            L'IA peut faire des erreurs. Vérifiez les informations importantes.
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
