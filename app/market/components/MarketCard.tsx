// app/market/components/MarketCard.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import type { SearchItem } from "../types";
import { MonoLabel } from "./MarketShell";

export function MarketCard({
  item,
  onClick,
}: {
  item: SearchItem;
  onClick?: (item: SearchItem) => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onClick?.(item)}
      whileHover={{ y: -4, borderColor: "#15FF00" }}
      className="text-left border border-white/10 bg-neutral-900/50 p-6 flex flex-col gap-4 group cursor-pointer w-full"
    >
      <div className="flex justify-between items-start">
        <div className="p-2 bg-white/5 rounded-sm">
          <Layers size={16} className="text-mint" />
        </div>
        <MonoLabel color="text-neutral-500">{item.type}</MonoLabel>
      </div>

      <div>
        <h3 className="text-lg font-bold text-mint group-hover:text-[#15FF00] transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-neutral-400 mt-1">{item.shortDescription}</p>
      </div>

      <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center font-mono text-sm">
        <span className="text-neutral-400">@{item.username}</span>
        <span className="text-mint">OPEN</span>
      </div>
    </motion.button>
  );
}
