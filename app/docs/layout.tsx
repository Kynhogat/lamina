'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Menu, Book } from 'lucide-react';
import { LayoutGroup } from 'framer-motion';
import DocSidebar from './components/DocSidebar';
import { ALL_PAGES } from './constants';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const currentIndex = ALL_PAGES.findIndex(page => page.href === pathname);
  const prevPage = ALL_PAGES[currentIndex - 1];
  const nextPage = ALL_PAGES[currentIndex + 1];

  return (
    <LayoutGroup id="docs-framework">
      <div className="min-h-screen bg-white dark:bg-[#070807] text-slate-900 dark:text-[#F0FFF0] flex selection:bg-[#15FF00] selection:text-black">
        <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0"></div>

        <header className="fixed top-0 left-0 right-0 h-14 bg-white/80 dark:bg-[#070807]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 z-30 flex items-center justify-between px-4 lg:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-neutral-400 transition-colors"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2 font-display font-bold text-lg tracking-tighter text-slate-900 dark:text-white">
            <Book className="text-green-600 dark:text-[#15FF00]" size={18} />
            DOCS
          </div>
          <div className="w-9" />
        </header>

        <DocSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

        <main className="flex-1 relative z-10 flex flex-col pt-14 lg:pt-0">
          <div className="flex-1 max-w-4xl mx-auto w-full px-6 lg:px-16 py-12 lg:py-20">
            {children}

            <footer className="mt-20 pt-12 border-t border-slate-100 dark:border-white/5">
              <div className="flex justify-between items-center gap-4">
                {prevPage ? (
                  <Link
                    href={prevPage.href}
                    className="group flex flex-col items-start gap-1 text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-all"
                  >
                    <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-neutral-600 group-hover:text-green-600 dark:group-hover:text-[#15FF00]">
                      <ArrowLeft size={14} /> Previous
                    </span>
                    <span className="text-lg font-bold">{prevPage.name}</span>
                  </Link>
                ) : <div />}

                {nextPage ? (
                  <Link
                    href={nextPage.href}
                    className="group flex flex-col items-end gap-1 text-slate-500 dark:text-neutral-400 hover:text-green-600 dark:hover:text-[#15FF00] transition-all text-right"
                  >
                    <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-neutral-600 group-hover:text-green-600 dark:group-hover:text-[#15FF00]">
                      Next <ArrowRight size={14} />
                    </span>
                    <span className="text-lg font-bold">{nextPage.name}</span>
                  </Link>
                ) : <div />}
              </div>
            </footer>
          </div>
        </main>
      </div>
    </LayoutGroup>
  );
}
