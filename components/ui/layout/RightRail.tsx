'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Server, Cpu, GitCommit } from 'lucide-react';
import { MonoLabel } from '@/components/ui/theme';

export default function RightRail({ activeSection }: { activeSection: string }) {
  return (
    <aside className="w-80 fixed right-0 top-0 bottom-0 border-l border-white/10 hidden xl:flex flex-col bg-[#070807]/90 backdrop-blur-sm p-6 z-50">
      
      <div className="flex-1 flex flex-col gap-10">
        
        {/* --- SECTION 1: SYSTEM TELEMETRY (Always Visible) --- */}
        <section>
            <div className="flex items-center gap-2 mb-4 border-b border-[#15FF00]/20 pb-2">
                <Activity size={14} className="text-[#15FF00]" />
                <MonoLabel color="text-[#15FF00]">Live Telemetry</MonoLabel>
            </div>
            <div className="space-y-3">
                {[
                    { label: "Active Nodes", val: "8,492", icon: Server },
                    { label: "Avg Latency", val: "24ms", icon: Activity },
                    { label: "Token Rate", val: "45k/s", icon: Cpu },
                ].map((stat, i) => (
                    <div key={i} className="flex justify-between items-center font-mono text-xs">
                        <span className="text-neutral-500 flex items-center gap-2">
                            <stat.icon size={10} /> {stat.label}
                        </span>
                        <span className="text-[#F0FFF0]">{stat.val}</span>
                    </div>
                ))}
            </div>
            {/* Visual graph placeholder */}
            <div className="mt-4 h-12 flex items-end gap-[2px] opacity-30">
                {[40, 60, 30, 80, 50, 90, 20, 40, 60, 70, 50, 30, 80, 40, 90].map((h, i) => (
                    <div key={i} className="bg-[#15FF00] w-full" style={{ height: `${h}%` }}></div>
                ))}
            </div>
        </section>

        {/* --- SECTION 2: CONTEXT AWARE (Dynamic) --- */}
        <section className="flex-1">
             <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                <GitCommit size={14} className="text-neutral-400" />
                <MonoLabel>Context: {activeSection}</MonoLabel>
            </div>
            
            <AnimatePresence mode="wait">
                <motion.div 
                    key={activeSection}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="glass-panel p-4 rounded-sm text-xs text-neutral-400 font-mono leading-relaxed"
                >
                    {activeSection === 'hero' && (
                        <p>Lamina Engine v2.4 initialized. Ready for visual orchestration. Scroll to explore the node architecture.</p>
                    )}
                    {activeSection === 'playground' && (
                        <div>
                            <p className="mb-2 text-[#F0FFF0]">INTERACTIVE_MODE</p>
                            <p>Simulation active. This canvas represents a standard Webhook → Logic → Database pipeline.</p>
                        </div>
                    )}
                    {activeSection === 'market' && (
                        <p>Community modules are pre-verified for security. Import strictly typed JSON definitions directly into your canvas.</p>
                    )}
                    {!['hero', 'playground', 'market'].includes(activeSection) && (
                        <p>Reading documentation specs... <br/><br/> All workflows export to standard .flow JSON format for version control.</p>
                    )}
                </motion.div>
            </AnimatePresence>
        </section>
      </div>

      {/* Footer CTA */}
      <div className="mt-auto pt-6 border-t border-white/10">
        <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 mb-2">
            <span>SEATS REMAINING</span>
            <span>142/500</span>
        </div>
        <button className="w-full bg-[#15FF00] text-black font-bold py-3 text-xs font-mono tracking-tighter hover:bg-[#12db00] transition-colors">
          CLAIM_EARLY_ACCESS
        </button>
      </div>
    </aside>
  );
}