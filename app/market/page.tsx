// app/market/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";
import { MarketShell, MonoLabel, SectionHeading } from "./components/MarketShell";
import { MarketSearchBar } from "./components/MarketSearchBar";
import { MarketGrid } from "./components/MarketGrid";
import type { MarketType, SearchItem } from "./types";
import { marketApi } from "./api";
import { authStore } from "./authStore";
import { AuthModal } from "./components/AuthModal";
import { DetailsDrawer } from "./components/DetailsDrawer";
import { UploadModal } from "./components/UploadModal";

export default function MarketPage() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<MarketType | "">("");
  const [items, setItems] = useState<SearchItem[]>([]);
  const [skip, setSkip] = useState(0);

  const [busy, setBusy] = useState(false);
  const [usedMock, setUsedMock] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [authOpen, setAuthOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selected, setSelected] = useState<SearchItem | null>(null);

  const take = 16;

  const headerSubtitle = useMemo(
    () => (
      <>
        Search and download reusable building blocks. If the backend is offline, the page will
        automatically load mock entries.
      </>
    ),
    []
  );

  async function runSearch(nextSkip = 0, mode: "replace" | "append" = "replace") {
    setBusy(true);
    setErr(null);

    const res = await marketApi.searchFiltered({
      searchTerm: q,
      type,
      skip: nextSkip,
      take,
    });

    setUsedMock(res.usedMock);
    if (res.error) setErr(res.error);

    setItems((prev) => (mode === "append" ? [...prev, ...res.items] : res.items));
    setSkip(nextSkip);

    setBusy(false);
  }

  useEffect(() => {
    runSearch(0, "replace");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authedLabel = authStore.displayname
    ? `${authStore.displayname} (@${authStore.username || "?"})`
    : "GUEST";

  return (
    <>
      <MarketShell title={<>MARKET</>} subtitle={headerSubtitle}>
        <div className="flex items-center justify-between mb-6 gap-4">
          <SectionHeading>
            Browse <span className="text-neutral-600">Objects</span>
          </SectionHeading>

          <div className="flex items-center gap-3 flex-wrap justify-end">
            {usedMock ? (
              <div className="flex items-center gap-2 border border-[#15FF00]/30 bg-[#15FF00]/5 px-3 py-2">
                <AlertCircle size={14} className="text-[#15FF00]" />
                <MonoLabel color="text-[#15FF00]">Mock data active</MonoLabel>
              </div>
            ) : (
              <MonoLabel color="text-neutral-500">Backend: online</MonoLabel>
            )}

            <div className="border border-white/10 bg-neutral-950/40 px-3 py-2">
              <MonoLabel color="text-neutral-500">USER</MonoLabel>
              <div className="text-xs font-mono text-mint mt-1">{authedLabel}</div>
            </div>

            {!authStore.accessToken ? (
              <button
                onClick={() => setAuthOpen(true)}
                className="px-4 py-3 border border-white/20 hover:border-white/50 transition-colors text-mint font-mono text-sm"
              >
                SIGN IN
              </button>
            ) : (
              <>
                <button
                  onClick={() => setUploadOpen(true)}
                  className="px-4 py-3 bg-[#15FF00] text-black font-bold text-sm font-mono hover:bg-[#12db00]"
                >
                  UPLOAD
                </button>
                <button
                  onClick={() => {
                    marketApi.logout();
                    // keep UI honest
                    setSelected(null);
                    setDetailsOpen(false);
                  }}
                  className="px-4 py-3 border border-white/20 hover:border-white/50 transition-colors text-mint font-mono text-sm"
                >
                  SIGN OUT
                </button>
              </>
            )}
          </div>
        </div>

        <MarketSearchBar
          value={q}
          onChange={setQ}
          type={type}
          onTypeChange={setType}
          onSubmit={() => runSearch(0, "replace")}
          busy={busy}
        />

        {err ? (
          <div className="mb-8 border border-white/10 bg-neutral-950/50 p-4">
            <MonoLabel color="text-neutral-500">Last error</MonoLabel>
            <div className="mt-2 text-sm text-neutral-400 font-mono break-words">{err}</div>
          </div>
        ) : null}

        <MarketGrid
          items={items}
          onOpen={(item) => {
            setSelected(item);
            setDetailsOpen(true);
          }}
        />

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => runSearch(skip + take, "append")}
            disabled={busy}
            className="px-8 py-3 border border-white/20 hover:border-white/50 transition-colors text-mint font-mono text-sm disabled:opacity-60"
          >
            {busy ? "LOADING…" : "LOAD MORE"}
          </button>
        </div>
      </MarketShell>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onAuthed={() => {
          // optional: refresh after login
          runSearch(0, "replace");
        }}
      />

      <UploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onUploaded={() => runSearch(0, "replace")}
      />

      <DetailsDrawer
        open={detailsOpen}
        item={selected}
        onClose={() => setDetailsOpen(false)}
        onDeleted={() => runSearch(0, "replace")}
      />
    </>
  );
}
