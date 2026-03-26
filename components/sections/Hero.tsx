import React from 'react';
import Link from 'next/link';
import { ArrowRight, Terminal, BookOpen } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center px-6 md:px-20 border-b border-slate-200 dark:border-white/5 relative overflow-hidden py-20 md:py-0 transition-colors duration-300 bg-transparent">
       
       <div className="max-w-4xl relative z-10">
         
         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100/80 dark:bg-[#15FF00]/5 border border-slate-200 dark:border-[#15FF00]/30 mb-6 md:mb-8 backdrop-blur-md">
            <div className="w-2 h-2 bg-green-500 dark:bg-[#15FF00] rounded-full animate-pulse" />
            <span className="font-mono text-xs tracking-wider uppercase text-slate-600 dark:text-[#15FF00]">
              Public Beta Live
            </span>
         </div>

         <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] tracking-tighter mb-6 md:mb-8 uppercase text-slate-900 dark:text-white break-words transition-colors">
           Graphically <br/>
           <span className="text-green-600 dark:text-[#15FF00] selection:text-white">Engineered</span> <br/>
           Intelligence.
         </h1>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
             <p className="text-base md:text-lg text-slate-600 dark:text-neutral-400 leading-relaxed font-mono pl-4 border-l-2 border-green-500 dark:border-[#15FF00] transition-colors">
               Lamina is the first text-to-text AI Nodebuilder. 
               Move from "prompt engineering" to "flow architecture" with a drag-and-drop canvas.
             </p>
             
             <div className="flex flex-col gap-4 w-full md:w-auto">
               <div className="flex flex-col sm:flex-row gap-3">
                 <button className="w-full md:w-auto bg-slate-900 dark:bg-[#F0FFF0] text-white dark:text-black px-6 md:px-8 py-3 md:py-4 font-bold font-mono text-sm hover:bg-slate-800 dark:hover:bg-[#15FF00] transition-all flex items-center justify-between md:justify-center gap-4 group shadow-xl shadow-slate-900/10 dark:shadow-none rounded-sm">
                   INITIALIZE PLAYGROUND
                   <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                 </button>
                 <Link href="/docs" className="w-full md:w-auto px-6 md:px-8 py-3 md:py-4 font-bold font-mono text-sm border border-slate-200 dark:border-white/10 text-slate-700 dark:text-neutral-300 hover:border-green-500 dark:hover:border-[#15FF00] hover:text-green-600 dark:hover:text-[#15FF00] transition-all flex items-center justify-between md:justify-center gap-4 group rounded-sm">
                   <BookOpen size={16} />
                   READ THE DOCS
                 </Link>
               </div>

               <div className="flex justify-center md:justify-start gap-6 text-[10px] font-mono text-slate-500 dark:text-neutral-500 uppercase tracking-wider">
                  <span className="flex items-center gap-1 hover:text-green-600 dark:hover:text-[#15FF00] cursor-help transition-colors"><Terminal size={12}/> Open_Source</span>
                  <span className="flex items-center gap-1 hover:text-green-600 dark:hover:text-[#15FF00] cursor-help transition-colors"><Terminal size={12}/> Self_Hostable</span>
               </div>
             </div>
         </div>
       </div>
    </section>
  );
}