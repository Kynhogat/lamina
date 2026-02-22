'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { LayoutGroup } from 'framer-motion';
import DocSidebar from './components/DocSidebar';

// Define your flat list of links to calculate Prev/Next
const ALL_PAGES = [
  { name: "Introduction", href: "/docs" },
  { name: "Installation", href: "/docs/installation" },
  { name: "First Workflow", href: "/docs/tutorial" },
  { name: "Nodes & Edges", href: "/docs/nodes" },
  { name: "Variables", href: "/docs/variables" },
  { name: "Logic Gates", href: "/docs/logic" },
  { name: "REST API", href: "/docs/api" },
  { name: "Python SDK", href: "/docs/sdk" },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Find current, prev, and next page objects
  const currentIndex = ALL_PAGES.findIndex(page => page.href === pathname);
  const prevPage = ALL_PAGES[currentIndex - 1];
  const nextPage = ALL_PAGES[currentIndex + 1];

  return (
    <div className="min-h-screen bg-[#070807] text-[#F0FFF0] flex selection:bg-[#15FF00] selection:text-black">
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0"></div>
      
      <LayoutGroup id="sidebar-nav">
        <DocSidebar />
      </LayoutGroup>

      <main className="flex-1 relative z-10 flex flex-col">
        {/* Page Content */}
        <div className="flex-1 max-w-4xl mx-auto w-full">
          {children}
        </div>

        {/* Dynamic Footer Navigation */}
        <footer className="max-w-4xl mx-auto w-full px-8 lg:px-16 py-12 mt-auto border-t border-white/5">
          <div className="flex justify-between items-center gap-4">
            {prevPage ? (
              <Link 
                href={prevPage.href} 
                className="group flex flex-col items-start gap-1 text-neutral-400 hover:text-white transition-colors"
              >
                <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-600">
                  <ArrowLeft size={14} /> Previous
                </span>
                <span className="text-lg font-bold">{prevPage.name}</span>
              </Link>
            ) : <div />}

            {nextPage ? (
              <Link 
                href={nextPage.href} 
                className="group flex flex-col items-end gap-1 text-neutral-400 hover:text-[#15FF00] transition-colors text-right"
              >
                <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-600">
                  Next <ArrowRight size={14} />
                </span>
                <span className="text-lg font-bold">{nextPage.name}</span>
              </Link>
            ) : <div />}
          </div>
        </footer>
      </main>
    </div>
  );
}