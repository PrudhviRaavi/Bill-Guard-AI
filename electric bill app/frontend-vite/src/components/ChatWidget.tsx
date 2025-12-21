import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: string, content: string }[]>([
        { role: 'assistant', content: 'Hi! I am BillGuard AI. Ask me anything about electricity bills or saving tips.' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const newMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, newMsg]);
        setInput('');
        setLoading(true);

        try {
            // Use environment variable for API URL (defaults to localhost for dev)
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const res = await fetch(`${API_URL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [...messages, newMsg] })
            });
            const data = await res.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            drag
            dragMomentum={false}
            whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
            className="fixed right-6 bottom-6 z-[100] flex flex-col items-end cursor-grab active:cursor-grabbing"
        >

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="absolute bottom-16 right-0 w-80 md:w-96 h-[500px] bg-white/95 backdrop-blur-xl border border-red-200 rounded-2xl flex flex-col shadow-2xl shadow-red-500/20 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-red-100 flex justify-between items-center bg-gradient-to-r from-red-50 to-orange-50">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center shadow-lg shadow-red-500/30">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <span className="font-bold text-gray-900 text-sm">BillGuard Assistant</span>
                                    <p className="text-[10px] text-green-600 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                        Online
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 rounded-lg hover:bg-red-100 flex items-center justify-center transition-colors text-gray-400 hover:text-red-600"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-gray-50/50" ref={scrollRef}>
                            {messages.map((m, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center shadow-sm ${m.role === 'user'
                                        ? 'bg-red-600 text-white'
                                        : 'bg-white border border-gray-100 text-red-600'
                                        }`}>
                                        {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                                    </div>
                                    <div className={`px-4 py-3 rounded-2xl max-w-[80%] text-sm shadow-sm ${m.role === 'user'
                                        ? 'bg-red-600 text-white rounded-tr-md'
                                        : 'bg-white text-gray-700 rounded-tl-md border border-gray-100'
                                        }`}>
                                        {m.content}
                                    </div>
                                </motion.div>
                            ))}

                            {loading && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-red-600 shadow-sm">
                                        <Bot size={14} />
                                    </div>
                                    <div className="px-4 py-3 bg-white rounded-2xl rounded-tl-md border border-gray-100 shadow-sm">
                                        <div className="flex gap-1.5">
                                            {[0, 150, 300].map(delay => (
                                                <span key={delay} className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-3 border-t border-gray-100 bg-white">
                            <div className="flex gap-2">
                                <input
                                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                                    placeholder="Type your question..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={loading || !input.trim()}
                                    className="p-2.5 bg-red-600 hover:bg-red-700 rounded-xl text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-red-500/20"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-all relative z-50 ${isOpen
                    ? 'bg-gray-800 rotate-90'
                    : 'bg-gradient-to-br from-red-600 to-red-500 shadow-red-500/40 animate-pulse-glow'
                    }`}
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                )}
            </motion.button>
        </motion.div>
    );
}
