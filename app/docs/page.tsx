'use client';

import React from 'react';
import InteractiveLesson from './components/InteractiveLesson';
import { ArrowRight } from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="px-8 py-20 lg:px-16 space-y-12">
      
      {/* Header */}
      <div>
        <div className="inline-block px-2 py-1 bg-[#15FF00]/10 border border-[#15FF00]/30 rounded mb-4">
           <span className="text-[#15FF00] text-xs font-mono font-bold uppercase tracking-wider">Documentation v2.4</span>
        </div>
        <h1 className="text-5xl font-display font-bold mb-6 tracking-tight">Introduction to Lamina</h1>
        <p className="text-xl text-neutral-400 leading-relaxed max-w-2xl">
          Lamina is a node-based logic engine. Unlike traditional coding, you build workflows by connecting visual blocks. 
          The best way to learn is to try it.
        </p>
      </div>

      {/* Interactive Tutorial Block */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-l-4 border-[#15FF00] pl-4">Interactive Tutorial 01</h2>
        <p className="text-neutral-400">
          In Lamina, data flows from left to right. To start a process, you must connect an 
          <span className="text-white font-mono bg-white/10 px-1 mx-1 rounded">Output Handle</span> to an 
          <span className="text-white font-mono bg-white/10 px-1 mx-1 rounded">Input Handle</span>.
        </p>
        
        {/* THE INTERACTIVE COMPONENT */}
        <InteractiveLesson 
          title="Connecting Nodes" 
          challenge="Drag a line from the 'Input' node on the left to the 'Process' node on the right." 
        />
        
        <div className="bg-neutral-900/50 p-4 border-l-2 border-yellow-500/50 text-sm text-neutral-400">
          <strong>Note:</strong> Connections are strictly typed. You cannot connect a String output to a Number input.
        </div>
      </section>

      {/* Code Example Block */}
      <section className="space-y-6 pt-8 border-t border-white/5">
        <h2 className="text-2xl font-bold">The .flow Standard</h2>
        <p className="text-neutral-400">
          Every visual graph you build compiles down to a JSON object. You can copy/paste this directly into your IDE.
        </p>
        
        <div className="bg-[#050505] border border-white/10 rounded-lg p-6 relative group">
           <div className="absolute top-4 right-4 text-xs font-mono text-neutral-600">JSON</div>
<pre className="font-mono text-sm text-neutral-400 overflow-x-auto">
{`{
  "id": "workflow_01",
  "nodes": [
    { "id": "n1", "type": "input", "data": { "label": "User Input" } },
    { "id": "n2", "type": "process", "data": { "model": "gpt-4" } }
  ],
  "edges": [
    { "source": "n1", "target": "n2", "id": "e1-2" }
  ]
}`}
</pre>
        </div>
      </section>

      {/* Next Steps */}
      <div className="pt-12 flex justify-end">
        <button className="flex items-center gap-2 text-[#15FF00] hover:underline font-mono uppercase text-sm tracking-wider">
          Next: Installation <ArrowRight size={16} />
        </button>
      </div>

    </div>
  );
}