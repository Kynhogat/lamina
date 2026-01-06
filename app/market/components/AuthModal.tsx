// app/market/components/AuthModal.tsx
"use client";

import React, { useMemo, useState } from "react";
import { X, AlertCircle } from "lucide-react";
import { marketApi } from "../api";
import { authStore } from "../authStore";
import { MonoLabel } from "./MarketShell";

type Mode = "login" | "register";

export function AuthModal({
  open,
  onClose,
  onAuthed,
}: {
  open: boolean;
  onClose: () => void;
  onAuthed: () => void;
}) {
  const [mode, setMode] = useState<Mode>("login");
  const [username, setUsername] = useState("");
  const [displayname, setDisplayname] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const title = useMemo(() => (mode === "login" ? "SIGN IN" : "CREATE ACCOUNT"), [mode]);

  if (!open) return null;

  async function submit() {
    setBusy(true);
    setErr(null);
    try {
      if (mode === "login") {
        await marketApi.login(username.trim(), password);
      } else {
        await marketApi.register(username.trim(), password, displayname.trim());
      }
      onAuthed();
      onClose();
    } catch (e: any) {
      setErr(e?.message || "Authentication failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-lg border border-white/10 bg-[#0C0F0C]">
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div>
            <MonoLabel color="text-[#15FF00]">AUTH</MonoLabel>
            <div className="text-xl font-display font-bold text-mint mt-1">{title}</div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5">
            <X size={16} className="text-neutral-400" />
          </button>
        </div>

        <div className="p-5">
          <div className="flex gap-2 mb-5">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2 font-mono text-xs border ${
                mode === "login" ? "border-[#15FF00] bg-[#15FF00]/5 text-mint" : "border-white/10 text-neutral-400 hover:text-mint"
              }`}
            >
              LOGIN
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 py-2 font-mono text-xs border ${
                mode === "register" ? "border-[#15FF00] bg-[#15FF00]/5 text-mint" : "border-white/10 text-neutral-400 hover:text-mint"
              }`}
            >
              REGISTER
            </button>
          </div>

          {err ? (
            <div className="mb-4 border border-white/10 bg-neutral-950/50 p-3 flex gap-2 items-start">
              <AlertCircle size={14} className="text-[#15FF00] mt-0.5" />
              <div className="text-xs font-mono text-neutral-400 break-words">{err}</div>
            </div>
          ) : null}

          <div className="space-y-3">
            <div className="border border-white/10 bg-neutral-950/60 px-4 py-3">
              <MonoLabel color="text-neutral-500">USERNAME</MonoLabel>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-2 w-full bg-transparent outline-none text-sm text-mint font-mono"
                placeholder="kyn"
              />
            </div>

            {mode === "register" ? (
              <div className="border border-white/10 bg-neutral-950/60 px-4 py-3">
                <MonoLabel color="text-neutral-500">DISPLAYNAME</MonoLabel>
                <input
                  value={displayname}
                  onChange={(e) => setDisplayname(e.target.value)}
                  className="mt-2 w-full bg-transparent outline-none text-sm text-mint font-mono"
                  placeholder="Kyn"
                />
              </div>
            ) : null}

            <div className="border border-white/10 bg-neutral-950/60 px-4 py-3">
              <MonoLabel color="text-neutral-500">PASSWORD</MonoLabel>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="mt-2 w-full bg-transparent outline-none text-sm text-mint font-mono"
                placeholder="••••••••"
                onKeyDown={(e) => {
                  if (e.key === "Enter") submit();
                }}
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-xs text-neutral-500 font-mono">
              CURRENT: {authStore.displayname ? `${authStore.displayname} (@${authStore.username})` : "GUEST"}
            </div>

            <button
              onClick={submit}
              disabled={busy || !username.trim() || !password}
              className="px-6 py-3 bg-[#15FF00] text-black font-bold text-sm font-mono hover:bg-[#12db00] disabled:opacity-60"
            >
              {busy ? "WORKING…" : mode === "login" ? "SIGN IN" : "CREATE"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
