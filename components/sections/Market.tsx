'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';
import { SectionHeading, MonoLabel, COLORS } from '@/components/ui/theme';

const MarketCard = ({ title, nodes, price }: { title: string, nodes: number, price: string }) => (
  <motion.div 
    whileHover={{ y: -4, borderColor: COLORS.neon }}
    className="border border-white/10 bg-neutral-900/50 p-6 flex flex-col gap-4 group cursor-pointer"
  >
    <div className="flex justify-between items-start">
      <div className="p-2 bg-white/5 rounded-sm">
        <Layers size={16} className="text-[#F0FFF0]" />
      </div>
      <MonoLabel color="text-neutral-500">v1.0.4</MonoLabel>
    </div>
    <div>
      <h3 className="text-lg font-bold text-[#F0FFF0] group-hover:text-[#15FF00] transition-colors">{title}</h3>
      <p className="text-sm text-neutral-400 mt-1">Automated workflow for enterprise scale.</p>
    </div>
    <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center font-mono text-sm">
      <span className="text-neutral-400">{nodes} Nodes</span>
      <span className="text-[#F0FFF0]">{price}</span>
    </div>
  </motion.div>
);

export default function Market() {
  return (
    <section id="market" className="py-20 px-6 md:px-20 border-b border-white/5 bg-[#090909]">
      <SectionHeading>Marketplace</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MarketCard title="SEO Article Engine" nodes={14} price="$49" />
        <MarketCard title="Customer Support Triage" nodes={8} price="FREE" />
        <MarketCard title="Legal Doc Summarizer" nodes={22} price="$120" />
        <MarketCard title="Email Sentiment Analysis" nodes={5} price="$15" />
      </div>
    </section>
  );
}