'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LeftRail from '@/components/ui/layout/LeftRail';
import RightRail from '@/components/ui/layout/RightRail';
import Hero from '@/components/sections/Hero';
import Why from '@/components/sections/Why';
import Playground from '@/components/sections/Playground';
import Features from '@/components/sections/Features';
import Market from '@/components/sections/Market';
import { Trust, Pricing, Spec } from '@/components/sections/MiscSections';

export default function LaminaPage() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { threshold: 0.2 }); 

    document.querySelectorAll('section').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const sections = ['hero', 'why', 'playground', 'features', 'market', 'trust', 'pricing', 'spec'];

  return (
    // CRITICAL: bg-transparent allows the global body grid to show through
    <div className="min-h-screen font-sans selection:bg-green-500/30 selection:text-green-900 dark:selection:bg-[#15FF00]/30 dark:selection:text-white flex flex-col lg:flex-row relative bg-transparent transition-colors duration-500 overflow-x-hidden">

      {/* --- MOBILE HEADER --- */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 glass-panel z-[100] flex items-center justify-between px-6 border-b-0">
         <div className="flex items-center gap-2 font-display font-bold tracking-tight text-xl text-slate-900 dark:text-white">
             <Share2 className="text-green-500 dark:text-[#15FF00]" size={20} />
             LAMINA
         </div>
         <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-900 dark:text-[#F0FFF0]">
             {mobileMenuOpen ? <X /> : <Menu />}
         </button>
      </header>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-16 bg-white/95 dark:bg-[#070807]/95 backdrop-blur-xl z-[99] flex flex-col p-8 gap-6 lg:hidden"
          >
             {sections.map(sec => (
               <a 
                 key={sec} 
                 href={`#${sec}`} 
                 onClick={() => setMobileMenuOpen(false)}
                 className="text-3xl font-display font-bold uppercase tracking-tight text-slate-400 hover:text-slate-900 dark:text-neutral-500 dark:hover:text-[#15FF00] transition-colors"
               >
                 {sec}
               </a>
             ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* --- DESKTOP RAILS --- */}
      <LeftRail activeSection={activeSection} sections={sections} />

      {/* --- MAIN SCROLL AREA --- */}
      {/* CRITICAL: bg-transparent here too */}
      <main className="flex-1 lg:ml-64 xl:mr-80 relative z-[10] pt-20 lg:pt-0 bg-transparent">
        <Hero />
        <Why />
        <Playground />
        <Features />
        <Market />
        <Trust />
        <Pricing />
        <Spec />

        <footer className="py-20 px-8 lg:px-20 border-t border-slate-200 dark:border-white/5 text-slate-400 dark:text-neutral-600 text-xs font-mono uppercase tracking-widest flex flex-col md:flex-row justify-between gap-8 bg-slate-50/50 dark:bg-black/20 backdrop-blur-sm">
           <div>© 2026 LAMINA SYSTEMS INC.</div>
           <div className="flex gap-8">
             <a href="#" className="hover:text-green-600 dark:hover:text-[#15FF00] transition-colors">X / Twitter</a>
             <a href="#" className="hover:text-green-600 dark:hover:text-[#15FF00] transition-colors">GitHub</a>
             <a href="#" className="hover:text-green-600 dark:hover:text-[#15FF00] transition-colors">Discord</a>
           </div>
        </footer>
      </main>

      <RightRail activeSection={activeSection} />

    </div>
  );
}