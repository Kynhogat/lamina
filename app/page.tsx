'use client';

import React, { useState, useEffect } from 'react';
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
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.4 });

    document.querySelectorAll('section').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const sections = ['hero', 'why', 'playground', 'features', 'market', 'trust', 'pricing', 'spec'];

  return (
    <div className="min-h-screen bg-[#070807] text-[#F0FFF0] font-sans selection:bg-[#15FF00] selection:text-black flex">
      
      <LeftRail activeSection={activeSection} sections={sections} />

      <main className="flex-1 lg:ml-64 lg:mr-80 relative z-10">
        <Hero />
        <Why />
        <Playground />
        <Features />
        <Market />
        <Trust />
        <Pricing />
        <Spec />

        <footer className="py-20 px-8 md:px-20 border-t border-white/10 text-neutral-600 text-sm flex justify-between">
           <div>© 2026 LAMINA SYSTEMS INC. MWAHAHAHAHA</div>
           <div className="flex gap-6">
             <a href="#" className="hover:text-[#15FF00]">X (Former Twitter)</a>
             <a href="#" className="hover:text-[#15FF00]">GitHub</a>
             <a href="#" className="hover:text-[#15FF00]">Discord</a>
           </div>
        </footer>
      </main>

      <RightRail activeSection={activeSection} />

    </div>
  );
}