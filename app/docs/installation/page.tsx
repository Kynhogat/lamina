'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Terminal, Check, Copy, ChevronRight, AlertCircle, Cpu, ArrowLeft, ArrowRight } from 'lucide-react';

// --- Reusable Code Snippet Component ---
const CodeBlock = ({ command, label }: { command: string, label?: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-6">
      {label && <div className="text-[10px] font-mono text-neutral-500 mb-1 uppercase tracking-wider pl-1">{label}</div>}
      <div className="bg-[#0C0F0C] border border-white/10 rounded-md p-4 flex justify-between items-center hover:border-white/20 transition-colors">
        <div className="font-mono text-sm text-[#F0FFF0] flex items-center gap-3">
          <ChevronRight size={14} className="text-[#15FF00]" />
          {command}
        </div>
        <button 
          onClick={copyToClipboard}
          className="text-neutral-500 hover:text-white transition-colors p-2"
        >
          {copied ? <Check size={14} className="text-[#15FF00]" /> : <Copy size={14} />}
        </button>
      </div>
    </div>
  );
};

export default function InstallationPage() {
  return (
    <div className="px-8 py-20 lg:px-16 space-y-12">
      
      {/* --- PAGE HEADER --- */}
      <div>
        <div className="inline-block px-2 py-1 bg-[#15FF00]/10 border border-[#15FF00]/30 rounded mb-4">
           <div className="flex items-center gap-2">
             <Terminal className="text-[#15FF00]" size={14} />
             <span className="text-[#15FF00] text-xs font-mono font-bold uppercase tracking-wider">Setup Guide</span>
           </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Initialize Environment</h1>
        <p className="text-xl text-neutral-400 leading-relaxed max-w-2xl">
          Lamina runs as a local daemon or a Docker container. 
          Install the CLI tool to manage your local workflow engine.
        </p>
      </div>

      {/* --- PREREQUISITES --- */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <Cpu size={20} /> System Requirements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {[
             { label: "Node.js", val: "v18.0.0 or higher" },
             { label: "Python", val: "v3.10+ (for local LLMs)" },
             { label: "Memory", val: "8GB RAM (16GB recommended)" },
             { label: "OS", val: "macOS, Linux, or WSL2" },
           ].map((req, i) => (
             <div key={i} className="border border-white/5 bg-white/[0.02] p-4 flex justify-between items-center">
                <span className="text-neutral-400 font-mono text-sm">{req.label}</span>
                <span className="text-[#F0FFF0] font-mono text-sm border-b border-[#15FF00]/30 pb-1">{req.val}</span>
             </div>
           ))}
        </div>
      </section>

      {/* --- CLI INSTALLATION --- */}
      <section>
        <h2 className="text-2xl font-bold mb-6 border-l-4 border-[#15FF00] pl-4">1. Install CLI</h2>
        <p className="text-neutral-400 mb-4">
          Install the global binary using npm or yarn. This grants you access to the <code className="bg-white/10 px-1 rounded text-white">lamina</code> command.
        </p>
        
        <CodeBlock label="NPM" command="npm install -g @lamina/cli" />
        <CodeBlock label="YARN" command="yarn global add @lamina/cli" />
      </section>

      {/* --- INITIALIZATION --- */}
      <section>
        <h2 className="text-2xl font-bold mb-6 border-l-4 border-[#15FF00] pl-4">2. Spin Up Engine</h2>
        <p className="text-neutral-400 mb-6">
          Navigate to your desired project folder and initialize the flow config. This will create a <code className="text-white">lamina.config.json</code> file.
        </p>

        <div className="bg-[#050505] border border-white/10 rounded-lg overflow-hidden font-mono text-xs md:text-sm shadow-2xl">
          <div className="bg-white/5 px-4 py-2 border-b border-white/5 text-neutral-500 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
            <span className="ml-2">bash — lamina-init</span>
          </div>
          <div className="p-6 space-y-2">
             <div className="flex gap-2">
               <span className="text-[#15FF00]">➜</span>
               <span className="text-white">mkdir my-ai-workflow && cd my-ai-workflow</span>
             </div>
             <div className="flex gap-2">
               <span className="text-[#15FF00]">➜</span>
               <span className="text-white">lamina init</span>
             </div>
             <div className="text-neutral-500 pt-2 animate-pulse">
               Detected environment: Next.js<br/>
               Installing local dependencies...<br/>
               <span className="text-[#15FF00]">✔ Core Engine Ready</span>
             </div>
             <div className="flex gap-2 pt-2">
               <span className="text-[#15FF00]">➜</span>
               <span className="text-white blinking-cursor">_</span>
             </div>
          </div>
        </div>
      </section>

      {/* --- NAVIGATION FOOTER --- */}
      <div className="pt-12 flex justify-between border-t border-white/5">
        <Link href="/docs" className="flex items-center gap-2 text-neutral-400 hover:text-white font-mono uppercase text-sm tracking-wider">
          <ArrowLeft size={16} /> Back: Intro
        </Link>
        
        <Link href="/docs/tutorial" className="flex items-center gap-2 text-[#15FF00] hover:underline font-mono uppercase text-sm tracking-wider">
          Next: First Workflow <ArrowRight size={16} />
        </Link>
      </div>

    </div>
  );
}