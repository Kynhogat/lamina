"use client";

import React, { useEffect, useMemo, useState } from "react";
import { X, Download, Trash2, AlertCircle, FileJson, FileCode2, ArrowRight } from "lucide-react";
import type { SearchItem } from "../types";
import { marketApi } from "../api";
import { authStore } from "../authStore";
import { MonoLabel } from "./MarketShell";

const NODE_GRAPHS: Record<string, { nodes: { id: string; label: string; type: string }[]; edges: [string, string][] }> = {
  "node-c": {
    nodes: [
      { id: "n1", label: "Input", type: "input" },
      { id: "n2", label: "LLM", type: "llm" },
      { id: "n3", label: "Parser", type: "transform" },
      { id: "n4", label: "Output", type: "output" },
    ],
    edges: [["n1", "n2"], ["n2", "n3"], ["n3", "n4"]],
  },
  "node-g": {
    nodes: [
      { id: "n1", label: "Trigger", type: "input" },
      { id: "n2", label: "Router", type: "transform" },
      { id: "n3", label: "LLM-A", type: "llm" },
      { id: "n4", label: "LLM-B", type: "llm" },
      { id: "n5", label: "Merge", type: "transform" },
      { id: "n6", label: "Output", type: "output" },
    ],
    edges: [["n1", "n2"], ["n2", "n3"], ["n2", "n4"], ["n3", "n5"], ["n4", "n5"], ["n5", "n6"]],
  },
  wrktmp: {
    nodes: [
      { id: "n1", label: "API In", type: "input" },
      { id: "n2", label: "Validate", type: "transform" },
      { id: "n3", label: "Process", type: "llm" },
      { id: "n4", label: "Cache", type: "transform" },
      { id: "n5", label: "Respond", type: "output" },
    ],
    edges: [["n1", "n2"], ["n2", "n3"], ["n3", "n4"], ["n4", "n5"]],
  },
};

const NODE_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  input:     { bg: "bg-blue-50 dark:bg-blue-500/10", border: "border-blue-200 dark:border-blue-500/30", text: "text-blue-600 dark:text-blue-400" },
  llm:       { bg: "bg-green-50 dark:bg-[#15FF00]/10", border: "border-green-200 dark:border-[#15FF00]/30", text: "text-green-600 dark:text-[#15FF00]" },
  transform: { bg: "bg-amber-50 dark:bg-amber-500/10", border: "border-amber-200 dark:border-amber-500/30", text: "text-amber-600 dark:text-amber-400" },
  output:    { bg: "bg-purple-50 dark:bg-purple-500/10", border: "border-purple-200 dark:border-purple-500/30", text: "text-purple-600 dark:text-purple-400" },
};

function NodeFlowViz({ type }: { type: string }) {
  const graph = NODE_GRAPHS[type] ?? NODE_GRAPHS["wrktmp"];

  const isBranching = type === "node-g";

  if (isBranching) {
    return (
      <div className="flex flex-col gap-3 items-center">
        <div className="flex items-center gap-2">
          <NodePill node={graph.nodes[0]} />
          <ArrowRight size={14} className="text-slate-300 dark:text-neutral-600" />
          <NodePill node={graph.nodes[1]} />
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-px bg-slate-300 dark:bg-neutral-600" />
            <NodePill node={graph.nodes[2]} />
            <div className="w-6 h-px bg-slate-300 dark:bg-neutral-600" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-px bg-slate-300 dark:bg-neutral-600" />
            <NodePill node={graph.nodes[3]} />
            <div className="w-6 h-px bg-slate-300 dark:bg-neutral-600" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <NodePill node={graph.nodes[4]} />
          <ArrowRight size={14} className="text-slate-300 dark:text-neutral-600" />
          <NodePill node={graph.nodes[5]} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 flex-wrap justify-center">
      {graph.nodes.map((node, i) => (
        <React.Fragment key={node.id}>
          <NodePill node={node} />
          {i < graph.nodes.length - 1 && (
            <ArrowRight size={14} className="text-slate-300 dark:text-neutral-600 shrink-0" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function NodePill({ node }: { node: { id: string; label: string; type: string } }) {
  const colors = NODE_COLORS[node.type] ?? NODE_COLORS.transform;
  return (
    <div className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold ${colors.bg} ${colors.border} ${colors.text} whitespace-nowrap`}>
      {node.label}
    </div>
  );
}

function fakeDownload(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function generateFakePython(item: SearchItem) {
  const slug = item.title.toLowerCase().replace(/\s+/g, "_");
  return `# ${item.title}
# Auto-generated node definition for Lamina
# Author: @${item.username}

from lamina import Node, Input, Output

class ${item.title.replace(/\s+/g, "")}(Node):
    """${item.shortDescription}"""

    class Inputs:
        text = Input(type="str", description="Input text to process")

    class Outputs:
        result = Output(type="str", description="Processed output")

    def execute(self, text: str) -> str:
        # TODO: implement node logic
        return f"Processed: {text}"


if __name__ == "__main__":
    node = ${item.title.replace(/\s+/g, "")}()
    print(node.execute("Hello, Lamina!"))
`;
}

function generateFakeJson(item: SearchItem) {
  const graph = NODE_GRAPHS[item.type] ?? NODE_GRAPHS["wrktmp"];
  return JSON.stringify(
    {
      version: "2.1.0",
      meta: {
        title: item.title,
        author: `@${item.username}`,
        engine: "lamina-core",
        type: item.type,
      },
      nodes: graph.nodes.map((n) => ({ id: n.id, type: n.type, label: n.label })),
      edges: graph.edges.map(([s, t]) => ({ source: s, target: t })),
    },
    null,
    2
  );
}

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

  useEffect(() => {
    setErr(null);
    setBusy(false);
  }, [open, item?.title, item?.username, item?.type]);

  if (!open || !item) return null;

  async function download() {
    if (!item) return;
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

  const slug = item.title.toLowerCase().replace(/\s+/g, "_");

  return (
    <div className="fixed inset-0 z-[180]">
      <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <aside className="absolute right-0 top-0 bottom-0 w-full max-w-xl border-l border-slate-200 dark:border-white/10 bg-white dark:bg-[#0C0F0C] p-6 overflow-y-auto">
        <div className="flex items-start justify-between">
          <div>
            <MonoLabel color="text-green-600 dark:text-[#15FF00]">{item.type}</MonoLabel>
            <div className="mt-2 text-2xl font-display font-bold text-slate-900 dark:text-white">{item.title}</div>
            <div className="mt-2 text-sm text-slate-500 dark:text-neutral-400 font-mono">@{item.username}</div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg">
            <X size={16} className="text-slate-400 dark:text-neutral-400" />
          </button>
        </div>

        {err ? (
          <div className="mt-6 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-neutral-950/50 p-3 flex gap-2 items-start rounded-lg">
            <AlertCircle size={14} className="text-green-600 dark:text-[#15FF00] mt-0.5" />
            <div className="text-xs font-mono text-slate-500 dark:text-neutral-400 break-words">{err}</div>
          </div>
        ) : null}

        <div className="mt-6 border-t border-slate-200 dark:border-white/10 pt-6 space-y-6">

          <div>
            <MonoLabel color="text-slate-400 dark:text-neutral-500">FLOW GRAPH</MonoLabel>
            <div className="mt-3 border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-neutral-950/40 rounded-xl p-6 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-30 dark:opacity-20"
                style={{
                  backgroundImage: `radial-gradient(circle, rgb(148 163 184 / 0.3) 1px, transparent 1px)`,
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="relative z-10">
                <NodeFlowViz type={item.type} />
              </div>
              <div className="mt-4 flex items-center justify-center gap-4 text-[10px] font-mono text-slate-400 dark:text-neutral-600 uppercase tracking-wider relative z-10">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400 dark:bg-blue-500 inline-block" /> Input</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 dark:bg-[#15FF00] inline-block" /> LLM</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 dark:bg-amber-500 inline-block" /> Transform</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-400 dark:bg-purple-500 inline-block" /> Output</span>
              </div>
            </div>
          </div>

          <div>
            <MonoLabel color="text-slate-400 dark:text-neutral-500">SHORT</MonoLabel>
            <div className="mt-2 text-sm text-slate-600 dark:text-neutral-300">{item.shortDescription}</div>
          </div>

          <div>
            <MonoLabel color="text-slate-400 dark:text-neutral-500">LONG</MonoLabel>
            <div className="mt-2 text-sm text-slate-500 dark:text-neutral-400 whitespace-pre-wrap">
              {item.longDescription || "—"}
            </div>
          </div>

          <div>
            <MonoLabel color="text-slate-400 dark:text-neutral-500">EXAMPLE FILES</MonoLabel>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <button
                onClick={() => fakeDownload(`${slug}.py`, generateFakePython(item))}
                className="group flex items-center gap-3 p-3 border border-slate-200 dark:border-white/10 rounded-lg bg-slate-50/50 dark:bg-neutral-950/40 hover:border-green-500 dark:hover:border-[#15FF00]/50 hover:bg-green-50/50 dark:hover:bg-[#15FF00]/5 transition-all"
              >
                <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                  <FileCode2 size={18} className="text-blue-500 dark:text-blue-400" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-mono font-bold text-slate-700 dark:text-neutral-300 group-hover:text-green-600 dark:group-hover:text-[#15FF00] transition-colors">{slug}.py</div>
                  <div className="text-[10px] font-mono text-slate-400 dark:text-neutral-600">Python node</div>
                </div>
              </button>

              <button
                onClick={() => fakeDownload(`${slug}.flow.json`, generateFakeJson(item))}
                className="group flex items-center gap-3 p-3 border border-slate-200 dark:border-white/10 rounded-lg bg-slate-50/50 dark:bg-neutral-950/40 hover:border-green-500 dark:hover:border-[#15FF00]/50 hover:bg-green-50/50 dark:hover:bg-[#15FF00]/5 transition-all"
              >
                <div className="p-2 bg-amber-50 dark:bg-amber-500/10 rounded-lg">
                  <FileJson size={18} className="text-amber-500 dark:text-amber-400" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-mono font-bold text-slate-700 dark:text-neutral-300 group-hover:text-green-600 dark:group-hover:text-[#15FF00] transition-colors">{slug}.flow.json</div>
                  <div className="text-[10px] font-mono text-slate-400 dark:text-neutral-600">Flow definition</div>
                </div>
              </button>
            </div>
          </div>

          <div className="border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-neutral-950/40 p-4 rounded-lg">
            <MonoLabel color="text-slate-400 dark:text-neutral-500">IMPLEMENTATION HINT</MonoLabel>
            <div className="mt-2 text-xs text-slate-500 dark:text-neutral-400 font-mono leading-relaxed">
              {item.type === "node-c" ? (
                <>
                  This is a <span className="text-slate-900 dark:text-white">Python node</span>. Download the .py file, place it in your
                  nodes folder, and register it in your node loader.
                </>
              ) : (
                <>
                  This is a <span className="text-slate-900 dark:text-white">JSON flow</span>. Import the .flow.json into your builder
                  or use the CLI: <span className="text-green-600 dark:text-[#15FF00]">lamina import {slug}.flow.json</span>
                </>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={download}
              disabled={busy || !authStore.accessToken}
              className="flex-1 px-4 py-3 bg-green-600 dark:bg-[#15FF00] text-white dark:text-black font-bold text-sm font-mono hover:bg-green-700 dark:hover:bg-[#12db00] disabled:opacity-60 inline-flex items-center justify-center gap-2 rounded-lg transition-colors"
              title={!authStore.accessToken ? "Sign in required to download" : "Download"}
            >
              <Download size={16} />
              {busy ? "WORKING..." : "DOWNLOAD"}
            </button>

            <button
              onClick={del}
              disabled={busy || !authStore.accessToken}
              className="px-4 py-3 border border-slate-300 dark:border-white/20 hover:border-red-400 dark:hover:border-red-500/50 hover:text-red-600 dark:hover:text-red-400 transition-colors text-slate-900 dark:text-white font-mono text-sm disabled:opacity-60 inline-flex items-center justify-center gap-2 rounded-lg"
              title={!authStore.accessToken ? "Sign in required to delete" : "Delete"}
            >
              <Trash2 size={16} />
              DELETE
            </button>
          </div>

          {!authStore.accessToken ? (
            <div className="text-xs text-slate-400 dark:text-neutral-600 font-mono">
              AUTH REQUIRED for download/delete (JWT).
            </div>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
