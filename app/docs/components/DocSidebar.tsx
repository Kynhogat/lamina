'use client';

import React from 'react';
import { Book, Code, Box, Zap, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

const SECTIONS = [
  {
    title: "Getting Started",
    icon: Zap,
    items: [
      { name: "Introduction", href: "/docs" },
      { name: "Installation", href: "/docs/installation" },
      { name: "First Workflow", href: "/docs/tutorial" },
    ]
  },
  {
    title: "Core Concepts",
    icon: Box,
    items: [
      { name: "Nodes & Edges", href: "/docs/nodes" },
      { name: "Variables", href: "/docs/variables" },
      { name: "Logic Gates", href: "/docs/logic" },
    ]
  },
  {
    title: "API Reference",
    icon: Code,
    items: [
      { name: "REST API", href: "/docs/api" },
      { name: "Python SDK", href: "/docs/sdk" },
    ]
  }
];

export default function DocSidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-64 h-screen sticky top-0 border-r border-white/10 bg-[#070807]/50 backdrop-blur-sm p-6 hidden lg:block overflow-y-auto">
       <div className="mb-8 flex items-center gap-2 font-display font-bold text-xl tracking-tighter text-white">
          <Book className="text-[#15FF00]" size={20} />
          DOCS
       </div>

       <div className="space-y-8">
         {SECTIONS.map((section) => (
           <div key={section.title}>
             <h4 className="flex items-center gap-2 text-xs font-mono uppercase text-neutral-500 mb-4 font-bold tracking-wider">
               <section.icon size={12} />
               {section.title}
             </h4>
             <ul className="space-y-1 border-l border-white/5 pl-4">
               {section.items.map((item) => {
                 const isActive = pathname === item.href;
                 return (
                   <li key={item.name}>
                     <Link 
                       href={item.href}
                       className={`block text-sm transition-colors py-1 relative
                         ${isActive ? 'text-[#15FF00] font-bold' : 'text-neutral-400 hover:text-white'}
                       `}
                     >
                       {isActive && <motion.span layoutId="active-indicator" className="absolute -left-[21px] top-1.5 w-1 h-4 bg-[#15FF00] rounded-r-sm" />}
                       {item.name}
                     </Link>
                   </li>
                 )
               })}
             </ul>
           </div>
         ))}
       </div>
    </nav>
  );
}