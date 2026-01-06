// app/market/components/MarketShell.tsx
"use client";

import React from "react";

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight text-mint mb-8">
      {children}
    </h2>
  );
}

export function MonoLabel({
  children,
  color = "text-mint/60",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return <span className={`font-mono text-xs tracking-wider uppercase ${color}`}>{children}</span>;
}

export function MarketShell({
  title,
  subtitle,
  children,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#070807] text-[#F0FFF0] selection:bg-[#15FF00] selection:text-black">
      <main className="max-w-6xl mx-auto px-6 md:px-10 py-20">
        <div className="mb-10">
          <MonoLabel color="text-[#15FF00]">Marketplace</MonoLabel>
          <div className="mt-4">
            <h1 className="text-4xl md:text-6xl font-display font-bold leading-[0.95] tracking-tight">
              {title}
            </h1>
            {subtitle ? <p className="mt-4 text-neutral-400 max-w-2xl">{subtitle}</p> : null}
          </div>
        </div>

        <div className="border-t border-white/10 pt-10">{children}</div>
      </main>
    </div>
  );
}
