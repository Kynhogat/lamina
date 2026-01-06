// app/market/components/UploadModal.tsx
"use client";

import React, { useMemo, useState } from "react";
import { X, Upload, AlertCircle } from "lucide-react";
import { MonoLabel } from "./MarketShell";
import { MARKET_TYPES } from "../config";
import type { MarketType } from "../types";
import { marketApi } from "../api";
import { authStore } from "../authStore";

export function UploadModal({
  open,
  onClose,
  onUploaded,
}: {
  open: boolean;
  onClose: () => void;
  onUploaded: () => void;
}) {
  const [type, setType] = useState<MarketType>("wrktmp");
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [username, setUsername] = useState(authStore.username || "");
  const [file, setFile] = useState<File | null>(null);

  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const allowedExt = useMemo(() => (type === "node-c" ? ".py" : ".json"), [type]);

  if (!open) return null;

  async function submit() {
    if (!authStore.accessToken) {
      setErr("Sign in required.");
      return;
    }
    if (!file) {
      setErr("File required.");
      return;
    }

    // cheap validation
    if (type === "node-c" && !file.name.toLowerCase().endsWith(".py")) {
      setErr("node-c expects a .py file.");
      return;
    }
    if ((type === "node-g" || type === "wrktmp") && !file.name.toLowerCase().endsWith(".json")) {
      setErr("node-g / wrktmp expects a .json file.");
      return;
    }

    setBusy(true);
    setErr(null);
    try {
      await marketApi.createObject({
        type,
        title: title.trim(),
        username: username.trim(),
        shortDescription: shortDescription.trim(),
        longDescription: longDescription.trim(),
        file,
      });

      onUploaded();
      onClose();

      // reset minimal
      setTitle("");
      setShortDescription("");
      setLongDescription("");
      setFile(null);
    } catch (e: any) {
      setErr(e?.message || "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[190] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-2xl border border-white/10 bg-[#0C0F0C]">
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div>
            <MonoLabel color="text-[#15FF00]">PUBLISH</MonoLabel>
            <div className="text-xl font-display font-bold text-mint mt-1">UPLOAD OBJECT</div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5">
            <X size={16} className="text-neutral-400" />
          </button>
        </div>

        <div className="p-5">
          {!authStore.accessToken ? (
            <div className="mb-4 border border-white/10 bg-neutral-950/50 p-3 flex gap-2 items-start">
              <AlertCircle size={14} className="text-[#15FF00] mt-0.5" />
              <div className="text-xs font-mono text-neutral-400 break-words">
                You must sign in before you can upload.
              </div>
            </div>
          ) : null}

          {err ? (
            <div className="mb-4 border border-white/10 bg-neutral-950/50 p-3 flex gap-2 items-start">
              <AlertCircle size={14} className="text-[#15FF00] mt-0.5" />
              <div className="text-xs font-mono text-neutral-400 break-words">{err}</div>
            </div>
          ) : null}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="border border-white/10 bg-neutral-950/60 px-4 py-3">
              <MonoLabel color="text-neutral-500">TYPE</MonoLabel>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as MarketType)}
                className="mt-2 w-full bg-transparent outline-none text-sm text-mint font-mono"
              >
                {MARKET_TYPES.filter((x) => x.value).map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label} ({t.value})
                  </option>
                ))}
              </select>
            </div>

            <div className="border border-white/10 bg-neutral-950/60 px-4 py-3">
              <MonoLabel color="text-neutral-500">USERNAME (owner)</MonoLabel>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-2 w-full bg-transparent outline-none text-sm text-mint font-mono"
                placeholder="owner username"
              />
              <div className="mt-2 text-[10px] font-mono text-neutral-600">
                If later you derive username from token, you can remove this field.
              </div>
            </div>

            <div className="md:col-span-2 border border-white/10 bg-neutral-950/60 px-4 py-3">
              <MonoLabel color="text-neutral-500">TITLE</MonoLabel>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 w-full bg-transparent outline-none text-sm text-mint font-mono"
                placeholder="Unique title (per user)"
              />
            </div>

            <div className="md:col-span-2 border border-white/10 bg-neutral-950/60 px-4 py-3">
              <MonoLabel color="text-neutral-500">SHORT DESCRIPTION</MonoLabel>
              <input
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="mt-2 w-full bg-transparent outline-none text-sm text-mint font-mono"
                placeholder="One-liner"
              />
            </div>

            <div className="md:col-span-2 border border-white/10 bg-neutral-950/60 px-4 py-3">
              <MonoLabel color="text-neutral-500">LONG DESCRIPTION</MonoLabel>
              <textarea
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                className="mt-2 w-full bg-transparent outline-none text-sm text-mint font-mono min-h-[120px]"
                placeholder="Full details, install steps, expected inputs/outputs…"
              />
            </div>

            <div className="md:col-span-2 border border-white/10 bg-neutral-950/60 px-4 py-3">
              <MonoLabel color="text-neutral-500">FILE ({allowedExt})</MonoLabel>
              <input
                type="file"
                accept={allowedExt}
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="mt-3 block w-full text-sm font-mono text-neutral-300"
              />
              <div className="mt-2 text-[10px] font-mono text-neutral-600">
                node-c → .py | node-g / wrktmp → .json
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-xs text-neutral-600 font-mono">
              JWT: {authStore.accessToken ? "SET" : "NOT SET"}
            </div>

            <button
              onClick={submit}
              disabled={
                busy ||
                !authStore.accessToken ||
                !username.trim() ||
                !title.trim() ||
                !shortDescription.trim() ||
                !file
              }
              className="px-6 py-3 bg-[#15FF00] text-black font-bold text-sm font-mono hover:bg-[#12db00] disabled:opacity-60 inline-flex items-center gap-2"
            >
              <Upload size={16} />
              {busy ? "UPLOADING…" : "UPLOAD"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
