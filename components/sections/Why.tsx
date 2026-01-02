import React from 'react';
import { SectionHeading } from '@/components/ui/theme';

export default function Why() {
  return (
    <section id="why" className="py-32 px-8 md:px-20 border-b border-white/5 bg-[#0A0A0A]">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <SectionHeading>Systems over <span className="text-neutral-600">Chats</span></SectionHeading>
          <div className="space-y-8">
            {[
              { title: "Auditability over Vibes", desc: "Every decision node is logged. Trace inputs to outputs with millisecond precision." },
              { title: "Deployable", desc: "Don't trap value in a chat window. Export as an API endpoint in one click." },
              { title: "Agnostic", desc: "Mix OpenAI, Anthropic, and local Llama models in the same pipeline." }
            ].map((item, idx) => (
              <div key={idx} className="pl-6 border-l border-white/10">
                <h3 className="text-lg font-bold text-[#F0FFF0] mb-1">{item.title}</h3>
                <p className="text-neutral-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Abstract Diagram */}
        <div className="relative h-64 border border-dashed border-white/10 flex items-center justify-center font-mono text-xs text-neutral-500">
           [ SYSTEM DIAGRAM PLACEHOLDER  BEN I NEED A PICTURE FROM YOU THAT LIKE SHOWS THE SYSTEM DIAGRAM OF HOW YOU IMAGINE IT?]
           <br/> 
           Input → Transform → Output
        </div>
      </div>
    </section>
  );
}