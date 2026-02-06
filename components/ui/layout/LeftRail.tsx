'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Sun, Moon } from 'lucide-react';

export default function LeftRail({ activeSection, sections }: { activeSection: string, sections: string[] }) {
  const [isDark, setIsDark] = useState(true);

  // Initialize theme on mount
  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove('dark');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      setIsDark(true);
    }
  };

  return (
    <nav className="w-64 fixed left-0 top-0 bottom-0 border-r border-slate-200 dark:border-white/10 hidden lg:flex flex-col justify-between p-6 z-50 bg-white/90 dark:bg-[#070807]/90 backdrop-blur-sm transition-colors duration-300">
      
      {/* Header */}
      <div>
        <div className="text-3xl font-bold tracking-tighter mb-1 font-display flex items-center gap-2 text-slate-900 dark:text-white">
           <Share2 className="text-green-600 dark:text-[#15FF00]" size={24} />
           LAMINA
        </div>
        <div className="text-[10px] font-mono text-slate-500 dark:text-neutral-500 tracking-widest pl-9">FLOW_ENGINE v2.4</div>
      </div>
      
      {/* Nav Items */}
      <div className="space-y-1 relative pl-2">
        {/* Vertical Guide Line */}
        <div className="absolute left-[15px] top-2 bottom-2 w-[1px] bg-slate-200 dark:bg-white/5"></div>
        
        {sections.map((sec) => (
          <a 
            key={sec} 
            href={`#${sec}`}
            className={`group flex items-center gap-4 py-2 text-xs font-mono uppercase tracking-wider transition-all duration-300
              ${activeSection === sec ? 'text-green-600 dark:text-[#15FF00]' : 'text-slate-500 dark:text-neutral-500 hover:text-slate-900 dark:hover:text-[#F0FFF0]'}
            `}
          >
            <div className="relative z-10 w-2 h-2 flex items-center justify-center bg-white dark:bg-[#070807]">
                {activeSection === sec ? (
                    <motion.div layoutId="nav-dot" className="w-1.5 h-1.5 bg-green-600 dark:bg-[#15FF00] rounded-full" />
                ) : (
                    <div className="w-1 h-1 bg-slate-300 dark:bg-white/20 rounded-full group-hover:bg-slate-400 dark:group-hover:bg-white/50" />
                )}
            </div>
            {sec}
          </a>
        ))}
      </div>

      {/* Footer / System Status to fill space */}
      <div className="font-mono text-[10px] text-slate-500 dark:text-neutral-600 border-t border-slate-200 dark:border-white/5 pt-4 space-y-2">
        
        {/* ADDED: Theme Toggle Button */}
        <button 
          onClick={toggleTheme} 
          className="flex items-center gap-2 w-full p-2 bg-slate-100 dark:bg-white/5 rounded hover:bg-slate-200 dark:hover:bg-white/10 transition-colors mb-4 text-slate-700 dark:text-neutral-400"
        >
          {isDark ? <Sun size={12} /> : <Moon size={12} />}
          <span>{isDark ? "LIGHT_MODE" : "DARK_MODE"}</span>
        </button>

        <div className="flex justify-between">
            <span>REGION</span>
            <span className="text-slate-900 dark:text-white">US_EAST_1</span>
        </div>
        <div className="flex justify-between items-center">
            <span>STATUS</span>
            <span className="flex items-center gap-1 text-green-600 dark:text-[#15FF00]">
                <div className="w-1.5 h-1.5 bg-green-600 dark:bg-[#15FF00] rounded-full animate-pulse"></div>
                OPERATIONAL
            </span>
        </div>
        <div className="flex justify-between">
            <span>UPTIME</span>
            <span className="text-slate-900 dark:text-white">99.99%</span>
        </div>
      </div>
    </nav>
  );
}