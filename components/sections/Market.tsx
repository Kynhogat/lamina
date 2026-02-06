'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Layers, ArrowUpRight } from 'lucide-react';
import { MonoLabel } from '@/components/ui/theme';

const MarketCard = ({ title, nodes, price }: { title: string, nodes: number, price: string }) => (
  <motion.div 
    whileHover={{ y: -4 }}
    className="group relative cursor-pointer"
  >
    {/* Card Content - Glass Panel sits atop grid */}
    <div className="glass-panel h-full p-6 flex flex-col gap-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-green-900/10 dark:hover:border-[#15FF00]/50 relative z-10">
        
        <div className="flex justify-between items-start">
          <div className="p-2 bg-slate-100 dark:bg-white/5 rounded-lg text-slate-600 dark:text-[#F0FFF0] group-hover:text-green-600 dark:group-hover:text-[#15FF00] transition-colors">
            <Layers size={18} />
          </div>
          <MonoLabel color="text-slate-400 dark:text-neutral-500">v1.0.4</MonoLabel>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 pr-4 leading-tight group-hover:text-green-600 dark:group-hover:text-[#15FF00] transition-colors">
            {title}
          </h3>
          <p className="text-sm text-slate-500 dark:text-neutral-400 leading-relaxed">
            Production-ready workflow. Includes pre-configured nodes and error handling.
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5 flex justify-between items-center font-mono text-xs">
          <span className="text-slate-400 dark:text-neutral-500 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-neutral-600"></div>
            {nodes} Nodes
          </span>
          <span className={`font-bold px-2 py-1 rounded ${price === 'FREE' ? 'bg-green-100 text-green-700 dark:bg-[#15FF00]/20 dark:text-[#15FF00]' : 'text-slate-900 dark:text-white bg-slate-100 dark:bg-white/10'}`}>
            {price}
          </span>
        </div>

        {/* Hover Arrow Icon */}
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 group-hover:-translate-y-1">
            <ArrowUpRight size={16} className="text-green-600 dark:text-[#15FF00]" />
        </div>
    </div>
  </motion.div>
);

export default function Market() {
  return (
    // bg-transparent ensures the dots are visible
    <section id="market" className="py-32 px-6 md:px-20 border-b border-slate-200/60 dark:border-white/5 bg-transparent transition-colors duration-300">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
            <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight text-slate-900 dark:text-white mb-4">
              Community <br/> <span className="text-slate-400 dark:text-neutral-600">Marketplace</span>
            </h2>
            <p className="text-slate-500 dark:text-neutral-400 max-w-lg text-lg">
              Don't start from scratch. Clone verified workflows built by the Lamina engineering team.
            </p>
        </div>
        <button className="px-6 py-3 rounded-lg border border-slate-200 dark:border-white/10 text-slate-600 dark:text-neutral-300 font-mono text-xs font-bold hover:bg-slate-50 dark:hover:bg-white/5 transition-colors uppercase tracking-wider">
            View All Templates
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MarketCard title="SEO Article Engine" nodes={14} price="$49" />
        <MarketCard title="Customer Support Triage" nodes={8} price="FREE" />
        <MarketCard title="Legal Doc Summarizer" nodes={22} price="$120" />
        <MarketCard title="Email Sentiment Analysis" nodes={5} price="$15" />
      </div>
    </section>
  );
}