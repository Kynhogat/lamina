import React from 'react';
import { Terminal, Box, GitBranch } from 'lucide-react';

export default function Features() {
  return (
    // bg-transparent ensures the dots are visible
    <section id="features" className="py-24 px-6 md:px-20 border-b border-slate-200/60 dark:border-white/5 bg-transparent transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { 
            icon: Box, 
            title: "Node Library", 
            desc: "Reusable blocks. No prompt spaghetti.", 
            spec: "API • PROMPT • TRANSFORM" 
          },
          { 
            icon: Terminal, 
            title: "Live Logs", 
            desc: "Watch execution in real-time.", 
            spec: "STDOUT • STDERR • TRACE" 
          },
          { 
            icon: GitBranch, 
            title: "Version Control", 
            desc: "Rollback to any previous state.", 
            spec: "GIT INTEGRATION • DIFFS" 
          }
        ].map((feature, idx) => (
          <div 
            key={idx} 
            className="glass-panel p-8 rounded-xl hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300 group"
          >
            <div className="mb-6 p-3 bg-slate-100 dark:bg-white/5 w-fit rounded-lg text-green-600 dark:text-[#15FF00] group-hover:scale-110 transition-transform">
               <feature.icon size={24} />
            </div>
            
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
              {feature.title}
            </h3>
            
            <p className="text-slate-500 dark:text-neutral-400 mb-8 h-auto min-h-[3rem] text-sm leading-relaxed">
              {feature.desc}
            </p>
            
            <div className="font-mono text-[10px] tracking-widest text-slate-400 dark:text-neutral-600 border-t border-slate-200 dark:border-white/5 pt-4 uppercase">
              {feature.spec}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}