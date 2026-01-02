'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function LeftRail({ activeSection, sections }: { activeSection: string, sections: string[] }) {
  return (
    <nav className="w-64 fixed left-0 top-0 bottom-0 border-r border-white/10 hidden lg:flex flex-col justify-between p-8 z-50 bg-[#070807]">
      <div>
        <div className="text-2xl font-bold tracking-tighter mb-12 flex items-center gap-2">
          <div className="w-3 h-3 bg-[#15FF00]" />
          LAMINA
        </div>
        
        <div className="space-y-1 relative">
           {/* Progress Line */}
           <div className="absolute left-[3px] top-2 bottom-2 w-[1px] bg-white/10"></div>
           
           {sections.map((sec) => (
             <a 
               key={sec} 
               href={`#${sec}`}
               className={`block pl-6 py-2 text-sm font-mono uppercase tracking-wider transition-all duration-300 relative
                 ${activeSection === sec ? 'text-[#15FF00]' : 'text-neutral-500 hover:text-[#F0FFF0]'}
               `}
             >
               {activeSection === sec && (
                 <motion.div 
                   layoutId="nav-dot"
                   className="absolute left-0 top-1/2 -translate-y-1/2 w-[7px] h-[7px] bg-[#15FF00] rounded-full"
                 />
               )}
               {sec}
             </a>
           ))}
        </div>
      </div>

      <div className="font-mono text-xs text-neutral-600">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 bg-[#15FF00] rounded-full animate-pulse"></div>
          SYSTEM: ONLINE
        </div>
        <p>BUILD: v2.4.0-RC</p>
      </div>
    </nav>
  );
}