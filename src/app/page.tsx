"use client";

import { CreativeHub } from "@/components/creative-hub";
import { motion } from "framer-motion";
import { LayoutDashboard, BrainCircuit, Wallet, MessageSquare, Terminal } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-[#08080a] text-white overflow-hidden p-4 gap-4">
      {/* Universal Navigation Sidebar */}
      <nav className="w-20 bg-[#0d0d0f] border border-white/5 rounded-3xl flex flex-col items-center py-8 gap-8">
        <div className="w-10 h-10 bg-[#c5a059] rounded-xl flex items-center justify-center shadow-lg shadow-gold/20">
          <Terminal className="w-6 h-6 text-black" />
        </div>
        
        <div className="flex-1 flex flex-col gap-6">
          <NavItem icon={LayoutDashboard} active />
          <NavItem icon={BrainCircuit} />
          <NavItem icon={MessageSquare} />
          <NavItem icon={Wallet} />
        </div>
        
        <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Max" alt="Max" />
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Top Status Bar */}
        <div className="h-16 bg-[#0d0d0f] border border-white/5 rounded-[2rem] px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              System Stable
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div className="text-xs font-mono text-white/40">AGENCY_OS_V1.0.4</div>
          </div>
          
          <div className="text-sm font-medium text-[#c5a059]">
            Max Digital Kernel <span className="text-white/20 ml-2">/ Lead Orchestrator</span>
          </div>
        </div>

        {/* Dynamic Section Container */}
        <div className="flex-1 overflow-hidden">
          <CreativeHub />
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon: Icon, active = false }: { icon: any, active?: boolean }) {
  return (
    <button className={`p-3 rounded-2xl transition-all duration-300 group relative ${active ? "bg-[#c5a059] text-black" : "text-white/40 hover:bg-white/5 hover:text-white"}`}>
      <Icon className="w-6 h-6" />
      {active && (
        <motion.div layoutId="nav-glow" className="absolute -inset-1 bg-[#c5a059]/20 blur-lg rounded-2xl -z-10" />
      )}
    </button>
  );
}
