'use client';

import React from 'react';
import { Book, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { SECTIONS } from './../constants';

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <div className="mb-8 flex items-center gap-2 font-display font-bold text-xl tracking-tighter text-slate-900 dark:text-white">
        <Book className="text-green-600 dark:text-[#15FF00]" size={20} />
        DOCS
      </div>

      <div className="space-y-8">
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <h4 className="flex items-center gap-2 text-xs font-mono uppercase text-slate-400 dark:text-neutral-500 mb-4 font-bold tracking-wider">
              <section.icon size={12} />
              {section.title}
            </h4>
            <ul className="relative space-y-1 border-l border-slate-100 dark:border-white/5 pl-4">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href} className="relative">
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className={`block text-sm py-2 relative z-10 transition-colors
                        ${isActive ? 'text-green-600 dark:text-[#15FF00]' : 'text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'}
                      `}
                    >
                      {item.name}
                      {isActive && (
                        <motion.div
                          layoutId="active-pill"
                          className="absolute -left-[17px] top-2 bottom-2 w-[2px] bg-green-500 dark:bg-[#15FF00]"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                          }}
                          style={{ boxShadow: "0 0 15px #15FF00" }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

export default function DocSidebar({ mobileOpen, onClose }: { mobileOpen: boolean; onClose: () => void }) {
  return (
    <>
      <nav className="w-64 h-screen sticky top-0 border-r border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#070807]/50 backdrop-blur-sm p-6 hidden lg:block overflow-y-auto">
        <SidebarContent />
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
              onClick={onClose}
            />
            <motion.nav
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-white dark:bg-[#070807] border-r border-slate-200 dark:border-white/10 p-6 z-50 overflow-y-auto lg:hidden"
              data-mobile-nav
            >
              <div className="flex items-center justify-between mb-2">
                <span />
                <button onClick={onClose} className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 dark:text-neutral-400 transition-colors">
                  <X size={18} />
                </button>
              </div>
              <SidebarContent onNavigate={onClose} />
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
