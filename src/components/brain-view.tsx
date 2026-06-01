"use client";

import React, { useEffect, useRef, useState } from "react";
import Cytoscape from "cytoscape";
import { BrainCircuit, Maximize2, RefreshCcw } from "lucide-react";

const initialNodes = [
  { data: { id: "vault", label: "Agency Brain", type: "root" } },
  { data: { id: "tarot", label: "Tarot Codex", type: "folder" } },
  { data: { id: "zodiac", label: "Zodiac Map", type: "folder" } },
  { data: { id: "projects", label: "Projects", type: "folder" } },
  { data: { id: "fool", label: "The Fool", type: "note" } },
  { data: { id: "magician", label: "The Magician", type: "note" } },
  { data: { id: "kassi", label: "Kassi Tarot Web", type: "project" } },
];

const initialEdges = [
  { data: { source: "vault", target: "tarot" } },
  { data: { source: "vault", target: "zodiac" } },
  { data: { source: "vault", target: "projects" } },
  { data: { source: "tarot", target: "fool" } },
  { data: { source: "tarot", target: "magician" } },
  { data: { source: "projects", target: "kassi" } },
  { data: { source: "kassi", target: "tarot" } },
];

export const BrainView = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<any>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cy = Cytoscape({
      container: containerRef.current,
      elements: [...initialNodes, ...initialEdges],
      style: [
        {
          selector: "node",
          style: {
            "background-color": "#c5a059",
            "label": "data(label)",
            "color": "#fff",
            "font-size": "12px",
            "text-valign": "center",
            "text-halign": "center",
            "width": "40px",
            "height": "40px",
            "border-width": "2px",
            "border-color": "#000",
            "text-margin-y": 30,
          } as any,
        },
        {
          selector: 'node[type="root"]',
          style: {
            "width": "60px",
            "height": "60px",
            "background-color": "#fff",
            "color": "#c5a059",
          },
        },
        {
          selector: 'node[type="folder"]',
          style: {
            "background-color": "#3b82f6",
          },
        },
        {
          selector: "edge",
          style: {
            "width": 2,
            "line-color": "rgba(255,255,255,0.1)",
            "curve-style": "bezier",
            "target-arrow-shape": "triangle",
            "target-arrow-color": "rgba(255,255,255,0.1)",
          } as any,
        },
      ],
      layout: {
        name: "cose",
        animate: true,
      } as any,
    });

    cy.on("tap", "node", (evt) => {
      setSelectedNode(evt.target.data("label"));
    });

    cyRef.current = cy;

    return () => {
      cy.destroy();
    };
  }, []);

  const handleReset = () => {
    cyRef.current.layout({ name: "cose", animate: true }).run();
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] text-white border border-white/5 rounded-3xl overflow-hidden">
      <header className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-[#0d0d0f]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-xl">
            <BrainCircuit className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">The Brain View</h2>
            <p className="text-xs text-white/40 uppercase tracking-widest">Obsidian Knowledge Graph</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={handleReset} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <RefreshCcw className="w-5 h-5 text-white/40" />
          </button>
          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <Maximize2 className="w-5 h-5 text-white/40" />
          </button>
        </div>
      </header>

      <div className="flex-1 relative">
        <div ref={containerRef} className="absolute inset-0" />
        
        {/* Overlay Info */}
        {selectedNode && (
          <div className="absolute bottom-8 right-8 p-6 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl w-64 shadow-2xl animate-in fade-in slide-in-from-bottom-4">
            <h4 className="text-sm font-bold text-[#c5a059] mb-1">Selected Node</h4>
            <p className="text-xl font-serif italic">{selectedNode}</p>
            <div className="mt-4 pt-4 border-t border-white/5">
              <button className="text-xs text-blue-400 hover:underline">Open in Obsidian →</button>
            </div>
          </div>
        )}

        <div className="absolute top-8 left-8 p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-[10px] uppercase font-bold text-white/40">Knowledge Node</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#c5a059]" />
            <span className="text-[10px] uppercase font-bold text-white/40">Entity Link</span>
          </div>
        </div>
      </div>
    </div>
  );
};
