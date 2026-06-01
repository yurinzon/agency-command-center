"use client";

import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from "recharts";
import { Wallet, TrendingUp, AlertCircle, ArrowUpRight } from "lucide-react";

const data = [
  { name: "Mon", usage: 4000 },
  { name: "Tue", usage: 3000 },
  { name: "Wed", usage: 2000 },
  { name: "Thu", usage: 2780 },
  { name: "Fri", usage: 1890 },
  { name: "Sat", usage: 2390 },
  { name: "Sun", usage: 3490 },
];

const pieData = [
  { name: "Gemini", value: 65, color: "#c5a059" },
  { name: "Flux", value: 20, color: "#3b82f6" },
  { name: "Kling", value: 15, color: "#a855f7" },
];

export const BudgetMeter = () => {
  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] text-white border border-white/5 rounded-3xl overflow-hidden p-8 gap-8">
      {/* Header Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <Wallet className="w-5 h-5 text-[#c5a059]" />
            <span className="text-[10px] bg-gold/20 text-gold px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">Active</span>
          </div>
          <p className="text-sm text-white/40 uppercase font-bold tracking-tighter">Current Balance</p>
          <h3 className="text-3xl font-mono font-bold">$142.50</h3>
        </div>
        
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-400 text-[10px] font-bold">+12% vs last week</span>
          </div>
          <p className="text-sm text-white/40 uppercase font-bold tracking-tighter">Monthly Burn</p>
          <h3 className="text-3xl font-mono font-bold">$42.12</h3>
        </div>

        <div className="p-6 bg-[#c5a059] rounded-2xl text-black flex flex-col justify-center cursor-pointer hover:scale-[1.02] transition-transform shadow-xl shadow-gold/10">
          <div className="flex items-center gap-2 mb-1">
             <ArrowUpRight className="w-5 h-5" />
             <span className="font-bold uppercase text-xs">One-Click Refill</span>
          </div>
          <p className="text-xs opacity-70">Instant Top-up via Stripe</p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-8 overflow-hidden">
        {/* Burn Chart */}
        <div className="col-span-8 bg-[#0d0d0f] border border-white/5 rounded-2xl p-6">
          <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-8">Daily Token Consumption</h4>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }} 
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                  contentStyle={{ backgroundColor: '#121214', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Bar dataKey="usage" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === data.length - 1 ? '#c5a059' : '#1e1e21'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Model Distribution */}
        <div className="col-span-4 bg-[#0d0d0f] border border-white/5 rounded-2xl p-6 flex flex-col">
          <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4">Model Distribution</h4>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-white/60">{item.name}</span>
                </div>
                <span className="text-xs font-mono">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Warning Footer */}
      <div className="mt-auto p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center gap-4">
        <AlertCircle className="w-5 h-5 text-orange-400" />
        <p className="text-sm text-orange-100/80 italic">
          Projected exhaustion in <span className="font-bold text-orange-400">4 days</span> based on current creative flow.
        </p>
      </div>
    </div>
  );
};
