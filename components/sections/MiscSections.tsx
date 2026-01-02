import React from 'react';
import { Lock, FileJson } from 'lucide-react';
import { SectionHeading } from '@/components/ui/theme';

export function Trust() {
  return (
    <section id="trust" className="py-32 px-8 md:px-20 border-b border-white/5">
      <SectionHeading>Enterprise Ready</SectionHeading>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-neutral-900 border border-white/10 p-8">
           <h3 className="font-mono text-[#15FF00] mb-4 text-sm">SECURITY_POSTURE</h3>
           <ul className="space-y-4">
             {['SOC2 Compliant', 'Zero-Data Retention', 'On-Premise Option'].map(i => (
               <li key={i} className="flex items-center gap-3 text-sm">
                 <Lock size={14} className="text-neutral-500" /> {i}
               </li>
             ))}
           </ul>
        </div>
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="py-32 px-8 md:px-20 border-b border-white/5">
      <SectionHeading>Pricing</SectionHeading>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 border border-white/10 p-8">
          <h3 className="text-2xl font-bold">Builder</h3>
          <div className="text-4xl mt-4 mb-2">$0</div>
          <p className="text-neutral-500 text-sm mb-8">For individuals and prototyping.</p>
          <ul className="space-y-2 text-sm text-neutral-300 font-mono mb-8">
             <li>- Unlimited Local Flows</li>
             <li>- Community Access</li>
             <li>- 3 Deploys / mo</li>
          </ul>
          <button className="w-full py-3 border border-white/20 text-sm font-mono hover:bg-white/5">START FREE</button>
        </div>
        <div className="flex-1 border border-[#15FF00] bg-[#15FF00]/5 p-8 relative">
          <div className="absolute top-0 right-0 bg-[#15FF00] text-black text-xs font-bold px-2 py-1">PRO</div>
          <h3 className="text-2xl font-bold">Team</h3>
          <div className="text-4xl mt-4 mb-2">$49</div>
          <p className="text-neutral-500 text-sm mb-8">For serious deployment.</p>
          <ul className="space-y-2 text-sm text-neutral-300 font-mono mb-8">
             <li>- Unlimited Deploys</li>
             <li>- Collab Canvas</li>
             <li>- Market Revenue Share</li>
          </ul>
          <button className="w-full py-3 bg-[#15FF00] text-black font-bold text-sm font-mono hover:bg-[#12db00]">GET TEAM</button>
        </div>
      </div>
    </section>
  );
}

export function Spec() {
  return (
    <section id="spec" className="py-32 px-8 md:px-20">
      <div className="flex items-center gap-4 mb-8">
         <FileJson className="text-[#15FF00]" />
         <h2 className="text-2xl font-bold">The Open .flow Standard</h2>
      </div>
      <div className="bg-[#050505] border border-white/10 p-6 font-mono text-xs md:text-sm text-neutral-400 overflow-x-auto">
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
      <p className="mt-4 text-neutral-500 text-sm">
        We don't lock you in. Your logic is just JSON. Export it, version it, own it.
      </p>
    </section>
  );
}