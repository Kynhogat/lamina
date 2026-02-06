import React from 'react';
import { Lock, FileJson, ShieldCheck, Server, Globe } from 'lucide-react';
import { SectionHeading } from '@/components/ui/theme';

export function Trust() {
  return (
    <section id="trust" className="py-32 px-6 md:px-20 border-b border-slate-200/60 dark:border-white/5 bg-transparent transition-colors duration-300">
      <SectionHeading>Enterprise Ready</SectionHeading>
      <div className="grid md:grid-cols-2 gap-12">
        
        {/* Security Card */}
        <div className="glass-panel p-8 rounded-xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <ShieldCheck size={120} className="text-slate-900 dark:text-white" />
           </div>
           
           <h3 className="font-mono text-green-600 dark:text-[#15FF00] mb-6 text-sm font-bold tracking-wider flex items-center gap-2">
             <ShieldCheck size={16}/> SECURITY_POSTURE
           </h3>
           
           <ul className="space-y-4 relative z-10">
             {[
               { text: 'SOC2 Type II Compliant', icon: Lock },
               { text: 'Zero-Data Retention Policy', icon: Server },
               { text: 'On-Premise Deployment Option', icon: Globe }
             ].map((item, i) => (
               <li key={i} className="flex items-center gap-3 text-sm text-slate-600 dark:text-neutral-400 font-medium">
                 <item.icon size={16} className="text-slate-400 dark:text-neutral-500" /> 
                 {item.text}
               </li>
             ))}
           </ul>
        </div>

        {/* Placeholder for second card or graphic if needed */}
        <div className="hidden md:flex items-center justify-center p-8 border border-dashed border-slate-300 dark:border-white/10 rounded-xl">
            <span className="text-sm font-mono text-slate-400 dark:text-neutral-600">
                [ Certifications & Compliance Logos ]
            </span>
        </div>

      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="py-32 px-6 md:px-20 border-b border-slate-200/60 dark:border-white/5 bg-transparent transition-colors duration-300">
      <SectionHeading>Pricing</SectionHeading>
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Free Plan */}
        <div className="flex-1 glass-panel p-8 rounded-xl hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300 hover:shadow-lg dark:hover:shadow-none">
          <div className="flex justify-between items-start mb-4">
             <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Builder</h3>
          </div>
          
          <div className="flex items-baseline gap-1 mb-2">
             <span className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">$0</span>
             <span className="text-slate-500 dark:text-neutral-500 font-mono text-sm">/ mo</span>
          </div>
          
          <p className="text-slate-500 dark:text-neutral-400 text-sm mb-8 leading-relaxed">
            For individuals and prototyping. Includes everything you need to build and run local flows.
          </p>
          
          <ul className="space-y-3 text-sm text-slate-600 dark:text-neutral-300 font-mono mb-8">
              <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Unlimited Local Flows</li>
              <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Community Access</li>
              <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> 3 Cloud Deploys / mo</li>
          </ul>
          
          <button className="w-full py-3 border border-slate-200 dark:border-white/20 text-sm font-bold font-mono hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg text-slate-700 dark:text-white transition-colors">
            START FREE
          </button>
        </div>
        
        {/* Pro Plan */}
        <div className="flex-1 border border-green-500/30 bg-green-50/50 dark:bg-[#15FF00]/5 p-8 relative rounded-xl backdrop-blur-sm shadow-xl shadow-green-500/5 dark:shadow-none hover:border-green-500/50 transition-all duration-300">
          <div className="absolute top-0 right-0 bg-green-500 dark:bg-[#15FF00] text-white dark:text-black text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl tracking-wider">
            MOST POPULAR
          </div>
          
          <div className="flex justify-between items-start mb-4">
             <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Team</h3>
          </div>

          <div className="flex items-baseline gap-1 mb-2">
             <span className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">$49</span>
             <span className="text-slate-500 dark:text-neutral-500 font-mono text-sm">/ mo</span>
          </div>

          <p className="text-slate-600 dark:text-neutral-400 text-sm mb-8 leading-relaxed">
            For startups and serious deployment. Collaborate with your team and scale your infrastructure.
          </p>
          
          <ul className="space-y-3 text-sm text-slate-700 dark:text-neutral-200 font-mono mb-8">
              <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-[#15FF00]"></span> Unlimited Deploys</li>
              <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-[#15FF00]"></span> Collaborative Canvas</li>
              <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-[#15FF00]"></span> Market Revenue Share</li>
          </ul>
          
          <button className="w-full py-3 bg-green-600 dark:bg-[#15FF00] text-white dark:text-black font-bold text-sm font-mono hover:bg-green-700 dark:hover:bg-[#12db00] rounded-lg transition-colors shadow-lg shadow-green-600/20 dark:shadow-none">
            GET TEAM
          </button>
        </div>

      </div>
    </section>
  );
}

export function Spec() {
  return (
    <section id="spec" className="py-32 px-6 md:px-20 bg-transparent transition-colors duration-300">
      <div className="flex items-center gap-4 mb-8">
         <div className="p-3 bg-slate-100 dark:bg-white/5 rounded-lg">
            <FileJson className="text-green-600 dark:text-[#15FF00]" size={24} />
         </div>
         <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">The Open .flow Standard</h2>
            <p className="text-sm text-slate-500 dark:text-neutral-500">Portable, version-controllable logic.</p>
         </div>
      </div>
      
      <div className="bg-slate-900 dark:bg-[#050505] border border-slate-800 dark:border-white/10 p-6 font-mono text-xs md:text-sm text-slate-400 dark:text-neutral-400 overflow-x-auto rounded-xl shadow-2xl relative">
        <div className="absolute top-4 right-4 text-[10px] text-slate-600 uppercase tracking-widest font-bold">JSON Spec v2.1</div>
<pre>{`{
  "version": "2.1.0",
  "meta": {
    "engine": "lamina-core",
    "hash": "8f9a2b..."
  },
  "nodes": [
    { "id": "n1", "type": "llm", "model": "gpt-4" },
    { "id": "n2", "type": "api", "endpoint": "/v1/webhook" }
  ],
  "edges": [
    { "source": "n1", "target": "n2", "condition": "score > 0.9" }
  ]
}`}</pre>
      </div>
      
      <p className="mt-6 text-slate-500 dark:text-neutral-500 text-sm max-w-2xl">
        We don't lock you in. Your logic is just JSON. Export it, version it in Git, or run it on your own infrastructure using the open-source runner.
      </p>
    </section>
  );
}