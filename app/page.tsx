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
import { PaintSplash } from '@/components/ui/PaintSplash'; // Import the new component

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
    <div className="min-h-screen font-sans selection:bg-[#15FF00] selection:text-black flex flex-col lg:flex-row relative bg-[#070807] overflow-hidden">
      
      {/* --- REAL TEXTURED SPLASHES (Z-Index 1) --- */}
      {/* Top Left - Large Green Texture */}
      <PaintSplash 
        className="top-[-300px] left-[-300px] w-[800px] h-[800px] z-[1]" 
      />
      
      {/* Bottom Right - Large Green Texture */}
      <PaintSplash 
        className="bottom-[-200px] right-[-200px] w-[900px] h-[900px] z-[1] opacity-80" 
      />

      {/* Middle Right - Subtle Accent */}
      <PaintSplash 
        className="top-[30%] right-[-10%] w-[500px] h-[500px] z-[1] opacity-40 mix-blend-screen" 
      />


      {/* --- MOBILE HEADER (Visible < lg) --- */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#070807]/90 backdrop-blur-xl border-b border-white/10 z-[100] flex items-center justify-between px-6">
         <div className="flex items-center gap-2 font-display font-bold tracking-tighter text-xl text-white">
             <Share2 className="text-[#15FF00]" size={20} />
             LAMINA
         </div>
         <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-[#F0FFF0]">
             {mobileMenuOpen ? <X /> : <Menu />}
         </button>
      </header>

      {/* --- MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-16 bg-[#070807] z-[99] flex flex-col p-8 gap-6 lg:hidden overflow-y-auto"
          >
             {sections.map(sec => (
               <a 
                 key={sec} 
                 href={`#${sec}`} 
                 onClick={() => setMobileMenuOpen(false)}
                 className="text-2xl font-display uppercase tracking-widest text-neutral-400 hover:text-[#15FF00] border-b border-white/5 pb-4"
               >
                 {sec}
               </a>
             ))}
             <div className="mt-auto pt-8">
                <button className="w-full bg-[#15FF00] text-black py-4 font-bold font-mono uppercase">
                  Launch Console
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* --- RAILS (Desktop Only, Z-Index 50) --- */}
      <LeftRail activeSection={activeSection} sections={sections} />

      {/* --- MAIN CONTENT (Z-Index 10) --- */}
      <main className="flex-1 lg:ml-64 xl:mr-80 relative z-[10] border-x border-white/5 bg-transparent pt-16 lg:pt-0">
        <Hero />
        <Why />
        <Playground />
        <Features />
        <Market />
        <Trust />
        <Pricing />
        <Spec />

        <footer className="py-12 md:py-20 px-6 md:px-20 border-t border-white/10 text-neutral-600 text-[10px] font-mono uppercase tracking-widest flex flex-col md:flex-row justify-between gap-8 text-center md:text-left bg-[#070807]/80 backdrop-blur-sm">
           <div>© 2026 LAMINA SYSTEMS INC // END_OF_LINE</div>
           <div className="flex justify-center md:justify-start gap-6">
             <a href="#" className="hover:text-[#15FF00] transition-colors">X_CORP</a>
             <a href="#" className="hover:text-[#15FF00] transition-colors">GITHUB</a>
             <a href="#" className="hover:text-[#15FF00] transition-colors">DISCORD</a>
           </div>
        </footer>
      </main>

      <RightRail activeSection={activeSection} />

    </div>
  );
}