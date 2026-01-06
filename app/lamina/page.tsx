'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Terminal, Layers, Zap, Cpu, Lock, GitBranch, 
  Play, Box, ArrowRight, CheckCircle2, AlertCircle, FileJson 
} from 'lucide-react';

// --- THEME CONSTANTS ---
const COLORS = {
  bg: '#070807',
  panel: '#0C0F0C',
  neon: '#15FF00',
  mint: '#F0FFF0',
  graphite: '#535353',
  line: 'rgba(240,255,240,0.1)',
};

// --- TYPOGRAPHY UTILS ---
// Assuming usage of Tailwind. Add these font families to your config for best results.
// font-display -> IBM Plex Sans Condensed / Neue Machina
// font-body -> IBM Plex Sans
// font-mono -> JetBrains Mono

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight text-mint mb-8">
    {children}
  </h2>
);

const MonoLabel = ({ children, color = 'text-mint/60' }: { children: React.ReactNode, color?: string }) => (
  <span className={`font-mono text-xs tracking-wider uppercase ${color}`}>
    {children}
  </span>
);

// --- MOCK COMPONENTS ---

const PlaygroundSim = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const runFlow = () => {
    setIsRunning(true);
    setLogs([]);
    const sequence = [
      'INIT_FLOW: "blog_pipeline_v2"',
      'NODE_01: Fetching context...',
      'NODE_02: Transform [OpenAI gpt-4]',
      'NODE_03: Decision > Score 0.98',
      'OUTPUT: Generated successfully',
      'STATUS: 200 OK'
    ];
    
    sequence.forEach((log, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, log]);
        if(i === sequence.length -1) setIsRunning(false);
      }, i * 600);
    });
  };

  return (
    <div className="border border-white/10 bg-[#0A0A0A] rounded-sm overflow-hidden relative h-[500px] group">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: `linear-gradient(${COLORS.line} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.line} 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>

      {/* Nodes */}
      <motion.div 
        className="absolute top-20 left-20 bg-neutral-900 border border-mint/20 p-4 w-48 shadow-xl z-10"
        drag
        whileHover={{ borderColor: COLORS.neon }}
      >
        <div className="flex justify-between items-center mb-2">
          <MonoLabel>Input</MonoLabel>
          <div className="w-2 h-2 rounded-full bg-mint"></div>
        </div>
        <div className="text-sm text-mint">Topic: "Neural Networks"</div>
      </motion.div>

      <motion.div 
        className="absolute top-40 left-80 bg-neutral-900 border border-mint/20 p-4 w-48 shadow-xl z-10"
        drag
        whileHover={{ borderColor: COLORS.neon }}
      >
        <div className="flex justify-between items-center mb-2">
          <div className="w-2 h-2 rounded-full bg-blue-400"></div>
          <MonoLabel>Transform</MonoLabel>
          <div className="w-2 h-2 rounded-full bg-mint"></div>
        </div>
        <div className="text-sm text-mint">LLM Synthesis</div>
      </motion.div>

      {/* Connection Lines (SVG) */}
      <svg className="absolute inset-0 pointer-events-none stroke-mint/30">
        <path d="M 220 60 C 280 60, 280 140, 320 140" fill="none" strokeWidth="2" />
      </svg>

      {/* Console Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-neutral-950 border-t border-white/10 p-4 font-mono text-xs h-40 overflow-y-auto">
        <div className="flex justify-between items-center mb-2 sticky top-0">
          <span className="text-neutral-500">CONSOLE OUT</span>
          <button 
            onClick={runFlow}
            disabled={isRunning}
            className="flex items-center gap-2 px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-mint border border-white/10 transition-colors"
          >
            <Play size={10} className={isRunning ? 'text-neon animate-pulse' : ''} />
            RUN DEMO
          </button>
        </div>
        <div className="space-y-1">
          {logs.map((log, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }}
              className="text-mint/80"
            >
              <span className="text-neutral-600 mr-2">
                {new Date().toLocaleTimeString().split(' ')[0]}
              </span>
              {log}
            </motion.div>
          ))}
          {!isRunning && logs.length === 0 && <span className="text-neutral-700 italic">// Ready to execute...</span>}
        </div>
      </div>
    </div>
  );
};

const MarketCard = ({ title, nodes, price }: { title: string, nodes: number, price: string }) => (
  <motion.div 
    whileHover={{ y: -4, borderColor: COLORS.neon }}
    className="border border-white/10 bg-neutral-900/50 p-6 flex flex-col gap-4 group cursor-pointer"
  >
    <div className="flex justify-between items-start">
      <div className="p-2 bg-white/5 rounded-sm">
        <Layers size={16} className="text-mint" />
      </div>
      <MonoLabel color="text-neutral-500">v1.0.4</MonoLabel>
    </div>
    <div>
      <h3 className="text-lg font-bold text-mint group-hover:text-neon transition-colors">{title}</h3>
      <p className="text-sm text-neutral-400 mt-1">Automated workflow for enterprise scale.</p>
    </div>
    <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center font-mono text-sm">
      <span className="text-neutral-400">{nodes} Nodes</span>
      <span className="text-mint">{price}</span>
    </div>
  </motion.div>
);

// --- MAIN PAGE COMPONENT ---

export default function LaminaPage() {
  const [activeSection, setActiveSection] = useState('hero');
  
  // Setup intersection observer for sections
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.4 });

    document.querySelectorAll('section').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const sections = ['hero', 'why', 'playground', 'features', 'market', 'trust', 'pricing', 'spec'];

  return (
    <div className="min-h-screen bg-[#070807] text-[#F0FFF0] font-sans selection:bg-[#15FF00] selection:text-black flex">
      
      {/* --- LEFT RAIL (NAVIGATION) --- */}
      <nav className="w-64 fixed left-0 top-0 bottom-0 border-r border-white/10 hidden lg:flex flex-col justify-between p-8 z-50 bg-[#070807]">
        <div>
          <div className="text-2xl font-bold tracking-tighter mb-12 flex items-center gap-2">
            <div className="w-3 h-3 bg-[#15FF00]" />
            LAMINA
          </div>
          
          <div className="space-y-1 relative">
             {/* Progress Line */}
             <div className="absolute left-[3px] top-2 bottom-2 w-[1px] bg-white/10"></div>
             
             {sections.map((sec) => (
               <a 
                 key={sec} 
                 href={`#${sec}`}
                 className={`block pl-6 py-2 text-sm font-mono uppercase tracking-wider transition-all duration-300 relative
                   ${activeSection === sec ? 'text-[#15FF00]' : 'text-neutral-500 hover:text-mint'}
                 `}
               >
                 {activeSection === sec && (
                   <motion.div 
                     layoutId="nav-dot"
                     className="absolute left-0 top-1/2 -translate-y-1/2 w-[7px] h-[7px] bg-[#15FF00] rounded-full"
                   />
                 )}
                 {sec}
               </a>
             ))}
          </div>
        </div>

        <div className="font-mono text-xs text-neutral-600">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 bg-[#15FF00] rounded-full animate-pulse"></div>
            SYSTEM: ONLINE
          </div>
          <p>BUILD: v2.4.0-RC</p>
        </div>
      </nav>

      {/* --- CENTER (SCROLLABLE CONTENT) --- */}
      <main className="flex-1 lg:ml-64 lg:mr-80 relative z-10">
        
        {/* SECTION: HERO */}
        <section id="hero" className="min-h-screen flex flex-col justify-center px-8 md:px-20 border-b border-white/5 relative overflow-hidden">
           {/* Subtle Noise Texture Overlay */}
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

           <div className="max-w-3xl pt-20">
             <MonoLabel color="text-[#15FF00]">Node-Based Orchestration</MonoLabel>
             <h1 className="text-6xl md:text-8xl font-display font-bold leading-[0.9] tracking-tight mt-6 mb-8">
               BUILD WORKFLOWS<br/>YOU CAN <span className="text-transparent bg-clip-text bg-gradient-to-r from-mint to-neutral-500">OWN.</span>
             </h1>
             <p className="text-xl text-neutral-400 max-w-xl leading-relaxed mb-10">
               Lamina turns prompts, APIs, and logic into deployable systems. 
               Stop chatting. Start engineering.
             </p>
             
             <div className="flex gap-4 items-center">
               <button className="bg-[#15FF00] text-black px-8 py-4 font-bold font-mono text-sm hover:bg-[#12db00] transition-colors flex items-center gap-2 group">
                 OPEN PLAYGROUND
                 <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
               </button>
               <button className="px-8 py-4 font-mono text-sm border border-white/20 hover:border-white/50 transition-colors text-mint">
                 REQUEST ACCESS
               </button>
             </div>

             <div className="mt-20 flex gap-8 border-t border-white/10 pt-8">
               {['Versioned .flow files', 'Audit Logs', 'Deterministic'].map((item) => (
                 <div key={item} className="flex items-center gap-2 font-mono text-xs text-neutral-500 uppercase">
                   <CheckCircle2 size={12} className="text-[#15FF00]" />
                   {item}
                 </div>
               ))}
             </div>
           </div>
        </section>

        {/* SECTION: WHY */}
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
                    <h3 className="text-lg font-bold text-mint mb-1">{item.title}</h3>
                    <p className="text-neutral-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Abstract Diagram */}
            <div className="relative h-64 border border-dashed border-white/10 flex items-center justify-center font-mono text-xs text-neutral-500">
               [ SYSTEM DIAGRAM PLACEHOLDER ]
               <br/> 
               Input → Transform → Output
            </div>
          </div>
        </section>

        {/* SECTION: PLAYGROUND */}
        <section id="playground" className="py-32 px-8 md:px-20 border-b border-white/5">
          <div className="flex justify-between items-end mb-12">
            <SectionHeading>The Workbench</SectionHeading>
            <MonoLabel>Interact to test</MonoLabel>
          </div>
          <PlaygroundSim />
        </section>

        {/* SECTION: FEATURES */}
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

        {/* SECTION: MARKET */}
        <section id="market" className="py-32 px-8 md:px-20 border-b border-white/5 bg-[#090909]">
          <SectionHeading>Marketplace</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MarketCard title="SEO Article Engine" nodes={14} price="$49" />
            <MarketCard title="Customer Support Triage" nodes={8} price="FREE" />
            <MarketCard title="Legal Doc Summarizer" nodes={22} price="$120" />
            <MarketCard title="Email Sentiment Analysis" nodes={5} price="$15" />
          </div>
        </section>

        {/* SECTION: TRUST */}
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

         {/* SECTION: PRICING */}
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

        {/* SECTION: SPEC (THE TWIST) */}
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

        <footer className="py-20 px-8 md:px-20 border-t border-white/10 text-neutral-600 text-sm flex justify-between">
           <div>© 2024 LAMINA SYSTEMS INC.</div>
           <div className="flex gap-6">
             <a href="#" className="hover:text-[#15FF00]">Twitter</a>
             <a href="#" className="hover:text-[#15FF00]">GitHub</a>
             <a href="#" className="hover:text-[#15FF00]">Discord</a>
           </div>
        </footer>
      </main>

      {/* --- RIGHT RAIL (CONTEXT PANEL) --- */}
      <aside className="w-80 fixed right-0 top-0 bottom-0 border-l border-white/10 hidden xl:block bg-[#0C0F0C] p-8 z-50">
        <AnimatePresence mode="wait">
          {activeSection === 'hero' && (
            <motion.div 
              key="hero-panel"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              <div className="bg-neutral-900 border border-white/10 p-4 rounded-sm">
                <MonoLabel>Live Snapshot</MonoLabel>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Flow</span>
                    <span className="text-white">Daily Blog Engine</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Runs Today</span>
                    <span className="text-[#15FF00]">42</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Success</span>
                    <span className="text-white">99.1%</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 font-mono text-[10px] text-neutral-600">
                  LAST DEPLOY: 14m ago
                </div>
              </div>
              <div className="p-4 bg-white/5 text-center">
                 <p className="text-xs text-neutral-400 mb-2">Read the documentation</p>
                 <a href="#" className="text-mint underline decoration-mint/30 hover:decoration-mint">docs.lamina.dev</a>
              </div>
            </motion.div>
          )}

          {activeSection === 'playground' && (
             <motion.div 
               key="play-panel"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: 20 }}
             >
                <MonoLabel>Try this in 10s</MonoLabel>
                <ul className="mt-4 space-y-4">
                  {['Drag "Input" Node', 'Connect to "Transform"', 'Hit Run Demo'].map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-neutral-300">
                      <div className="w-5 h-5 rounded-full border border-mint/20 flex items-center justify-center text-[10px] text-mint">{i+1}</div>
                      {step}
                    </li>
                  ))}
                </ul>
             </motion.div>
          )}

          {activeSection === 'market' && (
            <motion.div 
              key="market-panel"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <MonoLabel>Trending Tags</MonoLabel>
              <div className="flex flex-wrap gap-2 mt-4">
                {['#SEO', '#Email', '#Notion', '#Shopify', '#Research'].map(tag => (
                  <span key={tag} className="px-2 py-1 bg-white/5 text-xs text-neutral-400 hover:text-mint hover:bg-white/10 cursor-pointer transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Fallback for other sections */}
          {!['hero', 'playground', 'market'].includes(activeSection) && (
             <motion.div 
               key="default-panel"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: 20 }}
               className="h-full flex flex-col justify-end pb-8"
             >
                <div className="border border-[#15FF00]/30 p-4">
                  <div className="flex items-center gap-2 text-[#15FF00] text-sm font-bold mb-2">
                    <Zap size={14} />
                    EARLY ACCESS
                  </div>
                  <p className="text-xs text-neutral-400 mb-4">
                    Join the waiting list for the beta release.
                  </p>
                  <button className="w-full bg-white/10 py-2 text-xs font-mono hover:bg-white/20">JOIN LIST</button>
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </aside>

    </div>
  );
}