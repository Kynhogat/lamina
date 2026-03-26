'use client';

import React from 'react';
import Link from 'next/link';
import InteractiveLesson from './components/InteractiveLesson';
import { ArrowRight } from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="px-8 py-20 lg:px-16 space-y-12">
      
      <div>
        <div className="inline-block px-2 py-1 bg-green-100 dark:bg-[#15FF00]/10 border border-green-400 dark:border-[#15FF00]/30 rounded mb-4">
           <span className="text-green-600 dark:text-[#15FF00] text-xs font-mono font-bold uppercase tracking-wider">Documentation v2.4</span>
        </div>
        <h1 className="text-5xl font-display font-bold mb-6 tracking-tight">Introduction to Lamina</h1>
        <p className="text-xl text-slate-500 dark:text-neutral-400 leading-relaxed max-w-2xl">
          Lamina is the first text-to-text AI Nodebuilder. Move from prompt engineering to flow architecture &mdash; build, audit, and deploy
          AI pipelines with a drag-and-drop canvas. Open source and self-hostable.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-l-4 border-green-500 dark:border-[#15FF00] pl-4">Interactive Tutorial 01</h2>
        <p className="text-slate-500 dark:text-neutral-400">
          Lamina replaces prompt engineering with <span className="text-slate-900 dark:text-white font-bold">flow architecture</span>. Instead of writing ad-hoc prompts in a chat window,
          you build reusable AI pipelines by connecting nodes on a visual canvas. Data flows left to right &mdash; connect an
          <span className="text-slate-900 dark:text-white font-mono bg-slate-200 dark:bg-white/10 px-1 mx-1 rounded">Output Handle</span> to an
          <span className="text-slate-900 dark:text-white font-mono bg-slate-200 dark:bg-white/10 px-1 mx-1 rounded">Input Handle</span> to wire your pipeline.
        </p>
        <p className="text-slate-500 dark:text-neutral-400 text-sm">
          Below is a minimal Lamina flow: a user prompt feeds into an LLM node, which sends its result to an API endpoint.
          Mix any model &mdash; OpenAI, Anthropic, or local Llama &mdash; in the same pipeline. Every flow is auditable, version-controlled, and deployable as an API in one click.
        </p>

        <InteractiveLesson
          title="Build Your First AI Pipeline"
          challenge="Wire the nodes: API Entry → LLM Controller → Result Aggregator."
        />

        <div className="bg-yellow-50 dark:bg-neutral-900/50 p-4 border-l-2 border-yellow-500/50 text-sm text-slate-500 dark:text-neutral-400">
          <strong>Note:</strong> Connections are strictly typed. You cannot connect a String output to a Number input. Each node logs every input and output with millisecond precision for full auditability.
        </div>
      </section>

      <section className="space-y-6 pt-8 border-t border-slate-100 dark:border-white/5">
        <h2 className="text-2xl font-bold">The .flow Standard</h2>
        <p className="text-slate-500 dark:text-neutral-400">
          Every visual graph you build compiles down to a JSON object. You can copy/paste this directly into your IDE.
        </p>

        <div className="bg-slate-50 dark:bg-[#050505] border border-slate-200 dark:border-white/10 rounded-lg p-6 relative group">
           <div className="absolute top-4 right-4 text-xs font-mono text-slate-400 dark:text-neutral-600">JSON</div>
<pre className="font-mono text-sm text-slate-600 dark:text-neutral-400 overflow-x-auto">
{`{
  "id": "workflow_01",
  "nodes": [
    { "id": "n1", "type": "input", "data": { "label": "User Prompt" } },
    { "id": "n2", "type": "llm", "data": { "model": "claude-sonnet", "provider": "anthropic" } },
    { "id": "n3", "type": "output", "data": { "endpoint": "/v1/result" } }
  ],
  "edges": [
    { "source": "n1", "target": "n2", "id": "e1-2" },
    { "source": "n2", "target": "n3", "id": "e2-3" }
  ]
}`}
</pre>
        </div>
      </section>
    </div>
  );
}