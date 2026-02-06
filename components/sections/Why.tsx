import React from 'react';
import { SectionHeading } from '@/components/ui/theme';
import { Database, Zap, ArrowRight, Share2 } from 'lucide-react';

export default function Why() {
  return (
    // bg-transparent ensures the dots are visible
    <section id="why" className="py-32 px-6 md:px-20 border-b border-slate-200/60 dark:border-white/5 bg-transparent transition-colors duration-300">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        
        {/* LEFT COLUMN: Copy */}
        <div>
          <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight text-slate-900 dark:text-white mb-8">
            Systems over <span className="text-slate-400 dark:text-neutral-600">Chats</span>
          </h2>
          
          <div className="space-y-8">
            {[
              { 
                title: "Auditability over Vibes", 
                desc: "Every decision node is logged. Trace inputs to outputs with millisecond precision." 
              },
              { 
                title: "Deployable", 
                desc: "Don't trap value in a chat window. Export as an API endpoint in one click." 
              },
              { 
                title: "Agnostic", 
                desc: "Mix OpenAI, Anthropic, and local Llama models in the same pipeline." 
              }
            ].map((item, idx) => (
              <div key={idx} className="group pl-6 border-l-2 border-slate-200 dark:border-white/10 hover:border-green-500 dark:hover:border-[#15FF00] transition-colors duration-300">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-[#15FF00] transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-500 dark:text-neutral-400 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* RIGHT COLUMN: Visual Flow Diagram */}
        <div className="relative h-80 w-full flex items-center justify-center">
           {/* Background Glow */}
           <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

           <div className="relative z-10 flex flex-col gap-6 items-center w-full max-w-sm">
             
             {/* Node 1: Input */}
             <div className="w-full flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-[#0C0F0C] border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-2xl">
                 <div className="p-2 bg-slate-100 dark:bg-white/5 rounded-md text-slate-600 dark:text-white">
                    <Database size={18} />
                 </div>
                 <div className="flex-1">
                    <div className="text-xs font-mono text-slate-400 dark:text-neutral-500 mb-1">INPUT</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">User Context</div>
                 </div>
             </div>

             {/* Connector Arrow */}
             <div className="h-8 w-[2px] bg-slate-200 dark:bg-white/10 relative">
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 border-b-2 border-r-2 border-slate-200 dark:border-white/10 rotate-45 transform"></div>
             </div>

             {/* Node 2: Transform (Active) */}
             <div className="w-full flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-[#0C0F0C] border border-green-500 dark:border-[#15FF00] shadow-lg shadow-green-500/10 relative overflow-hidden">
                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 dark:bg-[#15FF00]"></div>
                 <div className="p-2 bg-green-50 dark:bg-[#15FF00]/10 rounded-md text-green-600 dark:text-[#15FF00]">
                    <Zap size={18} />
                 </div>
                 <div className="flex-1">
                    <div className="text-xs font-mono text-green-600 dark:text-[#15FF00] mb-1">TRANSFORM</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">LLM Reasoning</div>
                 </div>
                 <div className="text-xs font-mono text-slate-400 dark:text-neutral-500">24ms</div>
             </div>

             {/* Connector Arrow */}
             <div className="h-8 w-[2px] bg-slate-200 dark:bg-white/10 relative">
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 border-b-2 border-r-2 border-slate-200 dark:border-white/10 rotate-45 transform"></div>
             </div>

             {/* Node 3: Output */}
             <div className="w-full flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-[#0C0F0C] border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-2xl opacity-60">
                 <div className="p-2 bg-slate-100 dark:bg-white/5 rounded-md text-slate-600 dark:text-white">
                    <Share2 size={18} />
                 </div>
                 <div className="flex-1">
                    <div className="text-xs font-mono text-slate-400 dark:text-neutral-500 mb-1">OUTPUT</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">JSON Payload</div>
                 </div>
             </div>

           </div>
        </div>

      </div>
    </section>
  );
}