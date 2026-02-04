import React from 'react';
import { ArrowRight, Terminal } from 'lucide-react';
import { MonoLabel } from '@/components/ui/theme';

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center px-6 md:px-20 border-b border-white/5 relative overflow-hidden py-20 md:py-0">
       
       <div className="max-w-4xl relative z-10">
         {/* Technical Badge */}
         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#15FF00]/30 bg-[#15FF00]/5 mb-6 md:mb-8 backdrop-blur-md">
            <div className="w-2 h-2 bg-[#15FF00] rounded-full animate-pulse" />
            <MonoLabel color="text-[#15FF00]">Public Beta Live</MonoLabel>
         </div>

         {/* Responsive Headline */}
         <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] tracking-tighter mb-6 md:mb-8 uppercase text-white break-words">
           Graphically <br/>
           <span className="text-[#15FF00] selection:text-white">Engineered</span> <br/>
           Intelligence.
         </h1>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
             <p className="text-base md:text-lg text-neutral-400 leading-relaxed font-mono pl-4 border-l-2 border-[#15FF00]">
                Lamina is the first text-to-text AI Nodebuilder. 
                Move from "prompt engineering" to "flow architecture" with a drag-and-drop canvas.
             </p>
             
             <div className="flex flex-col gap-4 w-full md:w-auto">
               <button className="w-full md:w-auto bg-[#F0FFF0] text-black px-6 md:px-8 py-3 md:py-4 font-bold font-mono text-sm hover:bg-[#15FF00] transition-all flex items-center justify-between md:justify-center gap-4 group">
                 INITIALIZE PLAYGROUND
                 <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
               </button>
               
               <div className="flex justify-center md:justify-start gap-6 text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                  <span className="flex items-center gap-1 hover:text-[#15FF00] cursor-help"><Terminal size={12}/> Open_Source</span>
                  <span className="flex items-center gap-1 hover:text-[#15FF00] cursor-help"><Terminal size={12}/> Self_Hostable</span>
               </div>
             </div>
         </div>
       </div>
    </section>
  );
}