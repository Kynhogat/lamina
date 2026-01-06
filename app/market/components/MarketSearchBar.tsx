// app/market/components/MarketSearchBar.tsx
"use client";

import React from "react";
import { Search } from "lucide-react";
import { MARKET_TYPES } from "../config";
import type { MarketType } from "../types";

export function MarketSearchBar({
  value,
  onChange,
  type,
  onTypeChange,
  onSubmit,
  busy,
}: {
  value: string;
  onChange: (v: string) => void;
  type: MarketType | "";
  onTypeChange: (t: MarketType | "") => void;
  onSubmit: () => void;
  busy: boolean;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-center mb-8">
      <div className="flex-1 flex items-center gap-3 border border-white/10 bg-neutral-950/60 px-4 py-3">
        <Search size={16} className="text-neutral-500" />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSubmit();
          }}
          placeholder='Search "nodes", "templates", users...'
          className="w-full bg-transparent outline-none text-sm text-mint placeholder:text-neutral-600 font-mono"
        />
      </div>

      <select
        value={type}
        onChange={(e) => onTypeChange(e.target.value as MarketType | "")}
        className="border border-white/10 bg-neutral-950/60 px-4 py-3 text-sm font-mono text-mint outline-none"
      >
        {MARKET_TYPES.map((t) => (
          <option key={t.label} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>

      <button
        onClick={onSubmit}
        disabled={busy}
        className="px-6 py-3 bg-[#15FF00] text-black font-bold text-sm font-mono hover:bg-[#12db00] disabled:opacity-60"
      >
        {busy ? "LOADING…" : "SEARCH"}
      </button>
    </div>
  );
}
