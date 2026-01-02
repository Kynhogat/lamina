import React from 'react';

export const COLORS = {
  bg: '#070807',
  panel: '#0C0F0C',
  neon: '#15FF00',
  mint: '#F0FFF0',
  graphite: '#535353',
  line: 'rgba(240,255,240,0.1)',
};

export const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight text-[#F0FFF0] mb-8">
    {children}
  </h2>
);

export const MonoLabel = ({ children, color = 'text-[#F0FFF0]/60' }: { children: React.ReactNode, color?: string }) => (
  <span className={`font-mono text-xs tracking-wider uppercase ${color}`}>
    {children}
  </span>
);