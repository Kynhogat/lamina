'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';
import { MonoLabel } from '@/components/ui/theme';

export default function RightRail({ activeSection }: { activeSection: string }) {
  return (
    <aside className="w-80 fixed right-0 top-0 bottom-0 border-l border-white/10 hidden xl:block bg-[#0C0F0C] p-8 z-50">
      <AnimatePresence mode="wait">
        
        {/* HERO CONTEXT */}
        {activeSection === 'hero' && (
          <motion.div 
            key="hero-panel"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            <div className="bg-neutral-900 border border-white/10 p-4 rounded-sm">
              <MonoLabel>Live Snapshot</MonoLabel>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Flow</span>
                  <span className="text-white">Daily Blog Engine</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Runs Today</span>
                  <span className="text-[#15FF00]">42</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Success</span>
                  <span className="text-white">99.1%</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 font-mono text-[10px] text-neutral-600">
                LAST DEPLOY: 14m ago
              </div>
            </div>
            <div className="p-4 bg-white/5 text-center">
               <p className="text-xs text-neutral-400 mb-2">Read the documentation</p>
               <a href="#" className="text-[#F0FFF0] underline decoration-[#F0FFF0]/30 hover:decoration-[#F0FFF0]">docs.lamina.dev</a>
            </div>
          </motion.div>
        )}

        {/* PLAYGROUND CONTEXT */}
        {activeSection === 'playground' && (
           <motion.div 
             key="play-panel"
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: 20 }}
           >
              <MonoLabel>Try this in 10s</MonoLabel>
              <ul className="mt-4 space-y-4">
                {['Drag "Input" Node', 'Connect to "Transform"', 'Hit Run Demo'].map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-neutral-300">
                    <div className="w-5 h-5 rounded-full border border-[#F0FFF0]/20 flex items-center justify-center text-[10px] text-[#F0FFF0]">{i+1}</div>
                    {step}
                  </li>
                ))}
              </ul>
           </motion.div>
        )}

        {/* MARKET CONTEXT */}
        {activeSection === 'market' && (
          <motion.div 
            key="market-panel"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <MonoLabel>Trending Tags</MonoLabel>
            <div className="flex flex-wrap gap-2 mt-4">
              {['#SEO', '#Email', '#Notion', '#Shopify', '#Research'].map(tag => (
                <span key={tag} className="px-2 py-1 bg-white/5 text-xs text-neutral-400 hover:text-[#F0FFF0] hover:bg-white/10 cursor-pointer transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* DEFAULT CONTEXT */}
        {!['hero', 'playground', 'market'].includes(activeSection) && (
           <motion.div 
             key="default-panel"
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: 20 }}
             className="h-full flex flex-col justify-end pb-8"
           >
              <div className="border border-[#15FF00]/30 p-4">
                <div className="flex items-center gap-2 text-[#15FF00] text-sm font-bold mb-2">
                  <Zap size={14} />
                  EARLY ACCESS
                </div>
                <p className="text-xs text-neutral-400 mb-4">
                  Join the waiting list for the beta release.
                </p>
                <button className="w-full bg-white/10 py-2 text-xs font-mono hover:bg-white/20">JOIN LIST</button>
              </div>
           </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}