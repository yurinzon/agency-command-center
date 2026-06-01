"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Image as ImageIcon, 
  Video, 
  Mic2, 
  Wand2, 
  History, 
  Settings,
  ChevronRight,
  Sparkles,
  Zap
} from "lucide-react";

const tools = [
  { id: "image", name: "Image Studio", icon: ImageIcon, color: "text-blue-400", desc: "Flux, SDXL, Midjourney" },
  { id: "video", name: "Cinema Lab", icon: Video, color: "text-purple-400", desc: "Kling, Sora, Luma" },
  { id: "audio", name: "Vocal Forge", icon: Mic2, color: "text-orange-400", desc: "Lip-sync & TTS" },
  { id: "magic", name: "Magic Enhance", icon: Wand2, color: "text-emerald-400", desc: "Upscale & Edit" },
];

export const CreativeHub = () => {
  const [activeTool, setActiveTool] = useState("image");
  const [prompt, setPrompt] = useState("");

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] text-white font-sans overflow-hidden border border-white/5 rounded-3xl">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-[#0d0d0f]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-[#c5a059] to-[#8e6d3d] rounded-xl shadow-lg shadow-gold/20">
            <Sparkles className="w-6 h-6 text-black" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">Creative Hub</h2>
            <p className="text-xs text-white/40 uppercase tracking-widest">Powered by Muapi.ai</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
            <Zap className="w-4 h-4 text-[#c5a059]" />
            <span className="text-sm font-mono font-bold text-[#c5a059]">4,250 Credits</span>
          </div>
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <History className="w-5 h-5 text-white/60" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Tool Selection */}
        <aside className="w-72 border-r border-white/5 bg-[#0d0d0f]/50 p-4 space-y-2">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`w-full flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 ${
                activeTool === tool.id 
                  ? "bg-white/10 border border-white/10 shadow-xl" 
                  : "hover:bg-white/5 border border-transparent"
              }`}
            >
              <tool.icon className={`w-6 h-6 mt-1 ${tool.color}`} />
              <div className="text-left">
                <p className="font-bold text-sm">{tool.name}</p>
                <p className="text-[10px] text-white/40 uppercase tracking-tighter">{tool.desc}</p>
              </div>
              {activeTool === tool.id && (
                <motion.div layoutId="active-indicator" className="ml-auto mt-2">
                  <ChevronRight className="w-4 h-4 text-[#c5a059]" />
                </motion.div>
              )}
            </button>
          ))}
        </aside>

        {/* Main Interface */}
        <main className="flex-1 flex flex-col p-8 bg-gradient-to-br from-[#0a0a0a] to-[#121214]">
          <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full space-y-8"
            >
              <div className="space-y-4 text-center">
                <h3 className="text-4xl font-serif italic text-[#c5a059]">What shall we manifest?</h3>
                <p className="text-white/40 text-lg">Enter your vision below to begin the generation process.</p>
              </div>

              {/* Prompt Input Area */}
              <div className="relative group">
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your vision in detail..."
                  className="w-full h-48 bg-white/5 border border-white/10 rounded-3xl p-6 text-xl font-light focus:outline-none focus:border-[#c5a059]/50 transition-all placeholder:text-white/10 resize-none shadow-inner"
                />
                <div className="absolute bottom-6 right-6 flex gap-4">
                  <button className="px-8 py-4 bg-[#c5a059] text-black font-bold rounded-2xl shadow-2xl shadow-gold/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                    Generate
                    <Sparkles className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Settings Quick Bar */}
              <div className="grid grid-cols-3 gap-6">
                {["Aspect Ratio", "Model Tier", "Creative Flow"].map((label) => (
                  <div key={label} className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-colors">
                    <span className="text-sm text-white/60 font-medium">{label}</span>
                    <Settings className="w-4 h-4 text-white/20 group-hover:rotate-90 transition-transform" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Recent Creations Preview Strip */}
          <div className="mt-auto pt-8 border-t border-white/5">
            <div className="flex items-center justify-between mb-4 px-2">
              <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white/30">Recent Creations</h4>
              <button className="text-[10px] uppercase tracking-widest text-[#c5a059] hover:underline">View Gallery</button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="min-w-[140px] h-20 bg-white/5 border border-white/10 rounded-xl flex-shrink-0 grayscale hover:grayscale-0 transition-all cursor-pointer overflow-hidden relative group">
                  <img src={`https://images.unsplash.com/photo-${1500000000000 + i * 10000}?auto=format&fit=crop&q=80&w=300`} className="object-cover w-full h-full opacity-50 group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <History className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
