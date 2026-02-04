import React from 'react';
import DocSidebar from './components/DocSidebar';
import { PaintSplash } from '@/components/ui/PaintSplash'; // Re-using your splash component

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#070807] text-[#F0FFF0] flex selection:bg-[#15FF00] selection:text-black">
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0"></div>
      <PaintSplash className="fixed top-0 right-0 w-[600px] h-[600px] opacity-20 pointer-events-none z-0" />
      
      {/* Sidebar */}
      <DocSidebar />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 max-w-4xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}