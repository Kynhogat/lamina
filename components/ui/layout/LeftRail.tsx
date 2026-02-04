'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';

export default function LeftRail({ activeSection, sections }: { activeSection: string, sections: string[] }) {
  return (
    <nav className="w-64 fixed left-0 top-0 bottom-0 border-r border-white/10 hidden lg:flex flex-col justify-between p-6 z-50 bg-[#070807]/90 backdrop-blur-sm">
      
      {/* Header */}
      <div>
        <div className="text-3xl font-bold tracking-tighter mb-1 font-display flex items-center gap-2">
           <Share2 className="text-[#15FF00]" size={24} />
           LAMINA
        </div>
        <div className="text-[10px] font-mono text-neutral-500 tracking-widest pl-9">FLOW_ENGINE v2.4</div>
      </div>
      
      {/* Nav Items */}
      <div className="space-y-1 relative pl-2">
        {/* Vertical Guide Line */}
        <div className="absolute left-[15px] top-2 bottom-2 w-[1px] bg-white/5"></div>
        
        {sections.map((sec) => (
          <a 
            key={sec} 
            href={`#${sec}`}
            className={`group flex items-center gap-4 py-2 text-xs font-mono uppercase tracking-wider transition-all duration-300
              ${activeSection === sec ? 'text-[#15FF00]' : 'text-neutral-500 hover:text-[#F0FFF0]'}
            `}
          >
            <div className="relative z-10 w-2 h-2 flex items-center justify-center bg-[#070807]">
                {activeSection === sec ? (
                    <motion.div layoutId="nav-dot" className="w-1.5 h-1.5 bg-[#15FF00] rounded-full" />
                ) : (
                    <div className="w-1 h-1 bg-white/20 rounded-full group-hover:bg-white/50" />
                )}
            </div>
            {sec}
          </a>
        ))}
      </div>

      {/* Footer / System Status to fill space */}
      <div className="font-mono text-[10px] text-neutral-600 border-t border-white/5 pt-4 space-y-2">
        <div className="flex justify-between">
            <span>REGION</span>
            <span className="text-white">US_EAST_1</span>
        </div>
        <div className="flex justify-between items-center">
            <span>STATUS</span>
            <span className="flex items-center gap-1 text-[#15FF00]">
                <div className="w-1.5 h-1.5 bg-[#15FF00] rounded-full animate-pulse"></div>
                OPERATIONAL
            </span>
        </div>
        <div className="flex justify-between">
            <span>UPTIME</span>
            <span className="text-white">99.99%</span>
        </div>
      </div>
    </nav>
  );
}