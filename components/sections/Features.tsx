import React from 'react';
import { Terminal, Box, GitBranch } from 'lucide-react';

export default function Features() {
  return (
    <section id="features" className="py-32 px-8 md:px-20 border-b border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Box, title: "Node Library", desc: "Reusable blocks. No prompt spaghetti.", spec: "API • PROMPT • TRANSFORM" },
          { icon: Terminal, title: "Live Logs", desc: "Watch execution in real-time.", spec: "STDOUT • STDERR • TRACE" },
          { icon: GitBranch, title: "Version Control", desc: "Rollback to any previous state.", spec: "GIT INTEGRATION • DIFFS" }
        ].map((feature, idx) => (
          <div key={idx} className="bg-neutral-900/30 p-8 border border-white/5 hover:border-white/10 transition-colors">
            <feature.icon className="text-[#15FF00] mb-6" size={24} />
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-neutral-400 mb-8 h-12">{feature.desc}</p>
            <div className="font-mono text-[10px] tracking-widest text-neutral-600 border-t border-white/5 pt-4">
              {feature.spec}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}