'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Server, Cpu, GitCommit } from 'lucide-react';
import { MonoLabel } from '@/components/ui/theme';

export default function RightRail({ activeSection }: { activeSection: string }) {
  return (
    <aside className="w-80 fixed right-0 top-0 bottom-0 border-l border-slate-200 dark:border-white/10 hidden xl:flex flex-col bg-white/90 dark:bg-[#070807]/90 backdrop-blur-sm p-6 z-50 transition-colors duration-300">
      
      <div className="flex-1 flex flex-col gap-10">
        
        {/* --- SECTION 1: SYSTEM TELEMETRY (Always Visible) --- */}
        <section>
            <div className="flex items-center gap-2 mb-4 border-b border-green-200 dark:border-[#15FF00]/20 pb-2">
                <Activity size={14} className="text-green-600 dark:text-[#15FF00]" />
                <MonoLabel color="text-green-600 dark:text-[#15FF00]">Live Telemetry</MonoLabel>
            </div>
            <div className="space-y-3">
                {[
                    { label: "Active Nodes", val: "8,492", icon: Server },
                    { label: "Avg Latency", val: "24ms", icon: Activity },
                    { label: "Token Rate", val: "45k/s", icon: Cpu },
                ].map((stat, i) => (
                    <div key={i} className="flex justify-between items-center font-mono text-xs">
                        <span className="text-slate-500 dark:text-neutral-500 flex items-center gap-2">
                            <stat.icon size={10} /> {stat.label}
                        </span>
                        <span className="text-slate-900 dark:text-[#F0FFF0]">{stat.val}</span>
                    </div>
                ))}
            </div>
            {/* Visual graph placeholder */}
            <div className="mt-4 h-12 flex items-end gap-[2px] opacity-30">
                {[40, 60, 30, 80, 50, 90, 20, 40, 60, 70, 50, 30, 80, 40, 90].map((h, i) => (
                    <div key={i} className="bg-green-600 dark:bg-[#15FF00] w-full" style={{ height: `${h}%` }}></div>
                ))}
            </div>
        </section>

        {/* --- SECTION 2: CONTEXT AWARE (Dynamic) --- */}
        <section className="flex-1">
             <div className="flex items-center gap-2 mb-4 border-b border-slate-200 dark:border-white/10 pb-2">
                <GitCommit size={14} className="text-slate-400 dark:text-neutral-400" />
                <MonoLabel>Context: {activeSection}</MonoLabel>
            </div>
            
            <AnimatePresence mode="wait">
                <motion.div 
                    key={activeSection}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="glass-panel p-4 rounded-sm text-xs text-slate-500 dark:text-neutral-400 font-mono leading-relaxed"
                >
                    {/* Content remains the same, style handled by glass-panel utility */}
                    {activeSection === 'hero' && (
                        <p>Lamina Engine v2.4 initialized. Ready for visual orchestration. Scroll to explore the node architecture.</p>
                    )}
                    {/* ... other states ... */}
                     {!['hero'].includes(activeSection) && (
                        <p>Interacting with section: {activeSection.toUpperCase()}</p>
                    )}
                </motion.div>
            </AnimatePresence>
        </section>
      </div>

      {/* Footer CTA */}
      <div className="mt-auto pt-6 border-t border-slate-200 dark:border-white/10">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-neutral-500 mb-2">
            <span>SEATS REMAINING</span>
            <span>142/500</span>
        </div>
        <button className="w-full bg-green-600 dark:bg-[#15FF00] text-white dark:text-black font-bold py-3 text-xs font-mono tracking-tighter hover:bg-green-700 dark:hover:bg-[#12db00] rounded transition-colors">
          CLAIM_EARLY_ACCESS
        </button>
      </div>
    </aside>
  );
}