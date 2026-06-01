"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mic, 
  MicOff, 
  Send, 
  Bot, 
  User, 
  Volume2, 
  Eye, 
  Sparkles,
  ChevronDown,
  Activity
} from "lucide-react";

const mockMessages = [
  { id: 1, role: "assistant", text: "שלום! אני מקס, ה-Digital Kernel של הסוכנות. איך אוכל לעזור לך היום?", type: "text" },
];

export const OmniChat = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [input, setPrompt] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = { id: Date.now(), role: "user", text: input, type: "text" };
    setMessages([...messages, userMsg]);
    setPrompt("");
    setIsProcessing(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMsg = { 
        id: Date.now() + 1, 
        role: "assistant", 
        text: "הבקשה שלך התקבלה ומעובדת ברגעים אלו על ידי צוות הסוכנים. המערכת יציבה. 🛡️", 
        type: "text" 
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] text-white border border-white/5 rounded-3xl overflow-hidden relative">
      {/* Omni-Chat Header */}
      <header className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-[#0d0d0f] z-10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="p-2 bg-purple-500/20 rounded-xl">
              <Bot className="w-6 h-6 text-purple-400" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-[#0d0d0f] rounded-full animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">Omni-Chat</h2>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/40 uppercase tracking-widest">Max Digital Kernel</span>
              <Activity className="w-3 h-3 text-emerald-500/40" />
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors text-xs font-medium text-white/60">
             <Eye className="w-3.5 h-3.5" /> Visual Mode
           </button>
           <button className="p-2 hover:bg-white/5 rounded-full text-white/40">
             <ChevronDown className="w-5 h-5" />
           </button>
        </div>
      </header>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-thin scrollbar-thumb-white/10"
      >
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-4 max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === "user" ? "bg-white/10" : "bg-purple-500/10"
                }`}>
                  {msg.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5 text-purple-400" />}
                </div>
                <div className={`p-5 rounded-3xl ${
                  msg.role === "user" 
                    ? "bg-[#c5a059] text-black font-medium rounded-tr-none" 
                    : "bg-white/5 border border-white/10 text-white/90 rounded-tl-none"
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl animate-pulse flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-xs text-white/40">Max is thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <footer className="p-6 bg-[#0d0d0f] border-t border-white/5 z-10">
        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-[#c5a059]/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
          
          <div className="relative flex items-center gap-4 bg-white/5 border border-white/10 rounded-3xl p-2 pl-6 focus-within:border-white/20 transition-all">
            <input 
              value={input}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Send a message or use voice..."
              className="flex-1 bg-transparent border-none focus:outline-none text-sm placeholder:text-white/20"
            />
            
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setIsListening(!isListening)}
                className={`p-3 rounded-2xl transition-all ${
                  isListening ? "bg-red-500 text-white" : "hover:bg-white/5 text-white/40"
                }`}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              
              <button className="p-3 hover:bg-white/5 rounded-2xl text-white/40">
                <Volume2 className="w-5 h-5" />
              </button>
              
              <button 
                onClick={handleSend}
                className="p-3 bg-[#c5a059] text-black rounded-2xl hover:scale-105 active:scale-95 transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Background Visualizer (Animated) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-purple-500/10 to-transparent" />
      </div>
    </div>
  );
};
