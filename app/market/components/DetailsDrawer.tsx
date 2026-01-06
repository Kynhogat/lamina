// app/market/components/DetailsDrawer.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { X, Download, Trash2, AlertCircle } from "lucide-react";
import type { SearchItem } from "../types";
import { marketApi } from "../api";
import { authStore } from "../authStore";
import { MonoLabel } from "./MarketShell";

export function DetailsDrawer({
  open,
  item,
  onClose,
  onDeleted,
}: {
  open: boolean;
  item: SearchItem | null;
  onClose: () => void;
  onDeleted: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const canAuth = useMemo(() => !!authStore.accessToken, []);

  useEffect(() => {
    setErr(null);
    setBusy(false);
  }, [open, item?.title, item?.username, item?.type]);

  if (!open || !item) return null;

  async function download() {
    setBusy(true);
    setErr(null);
    try {
      const { blob, filename } = await marketApi.downloadObject({
        type: item.type,
        username: item.username,
        title: item.title,
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e: any) {
      setErr(e?.message || "Download failed");
    } finally {
      setBusy(false);
    }
  }

  async function del() {
    if (!item) return;
    const ok = window.confirm(`Delete "${item.title}" by @${item.username}?`);
    if (!ok) return;

    setBusy(true);
    setErr(null);
    try {
      await marketApi.deleteObject({
        type: item.type,
        username: item.username,
        title: item.title,
      });
      onDeleted();
      onClose();
    } catch (e: any) {
      setErr(e?.message || "Delete failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[180]">
      <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <aside className="absolute right-0 top-0 bottom-0 w-full max-w-xl border-l border-white/10 bg-[#0C0F0C] p-6 overflow-y-auto">
        <div className="flex items-start justify-between">
          <div>
            <MonoLabel color="text-[#15FF00]">{item.type}</MonoLabel>
            <div className="mt-2 text-2xl font-display font-bold text-mint">{item.title}</div>
            <div className="mt-2 text-sm text-neutral-400 font-mono">@{item.username}</div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5">
            <X size={16} className="text-neutral-400" />
          </button>
        </div>

        {err ? (
          <div className="mt-6 border border-white/10 bg-neutral-950/50 p-3 flex gap-2 items-start">
            <AlertCircle size={14} className="text-[#15FF00] mt-0.5" />
            <div className="text-xs font-mono text-neutral-400 break-words">{err}</div>
          </div>
        ) : null}

        <div className="mt-6 border-t border-white/10 pt-6 space-y-4">
          <div>
            <MonoLabel color="text-neutral-500">SHORT</MonoLabel>
            <div className="mt-2 text-sm text-neutral-300">{item.shortDescription}</div>
          </div>

          <div>
            <MonoLabel color="text-neutral-500">LONG</MonoLabel>
            <div className="mt-2 text-sm text-neutral-400 whitespace-pre-wrap">
              {item.longDescription || "—"}
            </div>
          </div>

          <div className="border border-white/10 bg-neutral-950/40 p-4">
            <MonoLabel color="text-neutral-500">IMPLEMENTATION HINT</MonoLabel>
            <div className="mt-2 text-xs text-neutral-400 font-mono leading-relaxed">
              {item.type === "node-c" ? (
                <>
                  This is a <span className="text-mint">Python node</span>. Download it, place it in your
                  nodes folder, and register it in your node loader.
                </>
              ) : (
                <>
                  This is a <span className="text-mint">JSON</span> object. Import it into your builder /
                  template loader.
                </>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={download}
              disabled={busy || !authStore.accessToken}
              className="flex-1 px-4 py-3 bg-[#15FF00] text-black font-bold text-sm font-mono hover:bg-[#12db00] disabled:opacity-60 inline-flex items-center justify-center gap-2"
              title={!authStore.accessToken ? "Sign in required to download" : "Download"}
            >
              <Download size={16} />
              {busy ? "WORKING…" : "DOWNLOAD"}
            </button>

            <button
              onClick={del}
              disabled={busy || !authStore.accessToken}
              className="px-4 py-3 border border-white/20 hover:border-white/50 transition-colors text-mint font-mono text-sm disabled:opacity-60 inline-flex items-center justify-center gap-2"
              title={!authStore.accessToken ? "Sign in required to delete" : "Delete"}
            >
              <Trash2 size={16} />
              DELETE
            </button>
          </div>

          {!authStore.accessToken ? (
            <div className="text-xs text-neutral-600 font-mono">
              AUTH REQUIRED for download/delete (JWT).
            </div>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
