// app/market/components/MarketGrid.tsx
"use client";

import React from "react";
import type { SearchItem } from "../types";
import { MarketCard } from "./MarketCard";

export function MarketGrid({
  items,
  onOpen,
}: {
  items: SearchItem[];
  onOpen?: (item: SearchItem) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((it) => (
        <MarketCard key={`${it.username}:${it.title}:${it.type}`} item={it} onClick={onOpen} />
      ))}
    </div>
  );
}
