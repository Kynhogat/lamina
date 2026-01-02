import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { MonoLabel } from '@/components/ui/theme';

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center px-8 md:px-20 border-b border-white/5 relative overflow-hidden">
       {/* Subtle Noise Texture Overlay */}
       <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

       <div className="max-w-3xl pt-20">
         <MonoLabel color="text-[#15FF00]">Node-Based Orchestration</MonoLabel>
         <h1 className="text-6xl md:text-8xl font-display font-bold leading-[0.9] tracking-tight mt-6 mb-8">
           BUILD WORKFLOWS<br/>YOU CAN <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F0FFF0] to-neutral-500">OWN.</span>
         </h1>
         <p className="text-xl text-neutral-400 max-w-xl leading-relaxed mb-10">
           Lamina turns prompts, APIs, and logic into deployable systems. 
           Stop chatting. Start engineering.
         </p>
         
         <div className="flex gap-4 items-center">
           <button className="bg-[#15FF00] text-black px-8 py-4 font-bold font-mono text-sm hover:bg-[#12db00] transition-colors flex items-center gap-2 group">
             OPEN PLAYGROUND
             <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
           </button>
           <button className="px-8 py-4 font-mono text-sm border border-white/20 hover:border-white/50 transition-colors text-[#F0FFF0]">
             REQUEST ACCESS
           </button>
         </div>

         <div className="mt-20 flex gap-8 border-t border-white/10 pt-8">
           {['Versioned .flow files', 'Audit Logs', 'Deterministic'].map((item) => (
             <div key={item} className="flex items-center gap-2 font-mono text-xs text-neutral-500 uppercase">
               <CheckCircle2 size={12} className="text-[#15FF00]" />
               {item}
             </div>
           ))}
         </div>
       </div>
    </section>
  );
}