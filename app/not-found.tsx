import Link from 'next/link';
import { AlertTriangle, ArrowLeft, Terminal, Activity } from 'lucide-react';

const COLORS = {
  bg: '#070807',
  panel: '#0C0F0C',
  neon: '#15FF00',
  mint: '#F0FFF0',
  line: 'rgba(240,255,240,0.1)',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#070807] text-[#F0FFF0] font-sans selection:bg-[#15FF00] selection:text-black flex flex-col md:flex-row overflow-hidden">
      
      {/* --- LEFT RAIL (Static Anchor) --- */}
      <aside className="w-full md:w-64 border-r border-white/10 p-8 flex flex-col justify-between z-10 bg-[#070807]">
        <div>
           <Link href="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-3 h-3 bg-[#15FF00]" />
            LAMINA
          </Link>
          <div className="mt-12 font-mono text-xs text-neutral-500 uppercase tracking-widest">
            Error Context
          </div>
          <div className="mt-4 pl-4 border-l border-white/10 text-sm text-neutral-400 space-y-2 font-mono">
            <p>ERR_CODE: 404</p>
            <p>TYPE: ROUTE_MISSING</p>
            <p>PRIORITY: LOW</p>
          </div>
        </div>

        <div className="hidden md:block font-mono text-xs text-neutral-600">
           <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
            SYSTEM: EXCEPTION
          </div>
        </div>
      </aside>

      {/* --- CENTER (The Glitch) --- */}
      <main className="flex-1 flex flex-col items-center justify-center relative p-8 border-r border-white/10">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ 
               backgroundImage: `linear-gradient(${COLORS.line} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.line} 1px, transparent 1px)`, 
               backgroundSize: '40px 40px' 
             }}>
        </div>

        <div className="relative z-10 max-w-lg w-full">
          {/* The "Ghost Node" Visual */}
          <div className="mb-12 relative h-40 border border-dashed border-white/20 bg-white/5 rounded-sm p-6 flex flex-col justify-between items-center opacity-50">
             <div className="absolute -top-3 -left-3 text-neutral-600 font-mono text-xs">INPUT: UNKNOWN</div>
             <AlertTriangle size={32} className="text-neutral-500" />
             <div className="font-mono text-sm text-neutral-500 text-center">
                This node has been detached<br/>or does not exist.
             </div>
             {/* Broken connection line */}
             <div className="absolute -right-12 top-1/2 w-12 border-t border-dashed border-red-500/30"></div>
             <div className="absolute -right-3 top-[calc(50%-4px)] w-2 h-2 rounded-full bg-red-500/50"></div>
          </div>

          <h1 className="text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-700 tracking-tighter mb-4">
            404
          </h1>
          
          <div className="bg-[#050505] border border-white/10 p-4 rounded-sm font-mono text-xs md:text-sm text-neutral-400 mb-8 font-light">
            <div className="flex gap-2 border-b border-white/5 pb-2 mb-2 text-neutral-600">
              <Terminal size={14} />
              <span>STACK_TRACE</span>
            </div>
            <p className="text-red-400/80">{`> Error: Destination path unreachable.`}</p>
            <p className="opacity-50 mt-1">{`  at Router.resolve (core/router.ts:420)`}</p>
            <p className="opacity-50">{`  at Navigation.dispatch (ui/nav.tsx:69)`}</p>
            <p className="text-[#15FF00] mt-4 animate-pulse">{`> _`}</p>
          </div>

          <Link href="/" className="group inline-flex items-center gap-3 px-6 py-3 bg-[#15FF00] text-black font-bold font-mono text-sm hover:bg-[#12db00] transition-colors">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/>
            RETURN TO CONSOLE
          </Link>
        </div>
      </main>

      {/* --- RIGHT RAIL (Debug Info) --- */}
      <aside className="hidden xl:block w-80 bg-[#0C0F0C] p-8 z-10">
        <div className="border border-white/10 p-4 space-y-6 opacity-70">
          <div className="flex items-center gap-2 text-neutral-500 text-xs font-mono uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
            <Activity size={12} />
            Diagnostic Report
          </div>
          
          <div className="space-y-1">
             <div className="text-xs text-neutral-500 font-mono">Heap Usage</div>
             <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
               <div className="h-full w-[40%] bg-neutral-600"></div>
             </div>
          </div>

          <div className="space-y-1">
             <div className="text-xs text-neutral-500 font-mono">Active Nodes</div>
             <div className="text-sm font-bold text-neutral-300">0/0</div>
          </div>

          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-200 text-xs font-mono">
            CRITICAL_FAILURE: The requested resource could not be found on this server.
          </div>
        </div>
      </aside>

    </div>
  );
}