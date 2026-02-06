'use client';

import React, { useState } from 'react';
import ReactFlow, { 
  Background, Controls, Handle, Position, useNodesState, 
  useEdgesState, NodeProps
} from 'reactflow';
import 'reactflow/dist/style.css'; 
import { Play, Webhook, Split, Database, Code2 } from 'lucide-react';

const AppNode = ({ data }: NodeProps) => {
  const Icon = data.icon;
  return (
    <div className={`
      min-w-[220px] rounded-lg overflow-hidden transition-all duration-300
      bg-white dark:bg-[#0C0F0C] 
      border border-slate-200 dark:border-white/10
      shadow-lg dark:shadow-[0_0_30px_rgba(0,0,0,0.5)]
      ${data.active ? 'ring-1 ring-green-500 dark:border-green-500' : 'hover:border-slate-300 dark:hover:border-white/30'}
    `}>
      {/* Mac-style Window Header */}
      <div className="bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5 px-3 py-2 flex items-center justify-between">
         <div className="flex items-center gap-2">
             <div className="flex gap-1">
                 <div className="w-2 h-2 rounded-full bg-red-400/80"></div>
                 <div className="w-2 h-2 rounded-full bg-yellow-400/80"></div>
                 <div className="w-2 h-2 rounded-full bg-green-400/80"></div>
             </div>
         </div>
         <span className="text-[10px] font-mono text-slate-400 dark:text-neutral-500 uppercase">{data.typeLabel}</span>
      </div>

      <div className="p-4 relative">
         <Handle type="target" position={Position.Left} className="!bg-slate-400 dark:!bg-neutral-600 !w-2 !h-4 !rounded-[2px] !border-none" />
         
         <div className="flex items-center gap-2 mb-3">
             <div className="p-1.5 rounded bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white">
                 {Icon && <Icon size={14} />}
             </div>
             <span className="text-sm font-bold text-slate-800 dark:text-[#F0FFF0]">{data.label}</span>
         </div>

         <div className="bg-slate-50 dark:bg-black/30 border border-slate-100 dark:border-white/5 p-2 rounded text-xs font-mono text-slate-600 dark:text-slate-400 break-all">
            {data.value}
         </div>

         <div className="flex flex-col items-end gap-2 mt-3">
            {['out'].map(label => (
               <div key={label} className="relative">
                 <Handle 
                    type="source" 
                    position={Position.Right} 
                    className="!w-2 !h-4 !bg-green-500 !rounded-[2px] !border-none !right-[-20px]" 
                 />
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};

const nodeTypes = { appNode: AppNode };

const initialNodes = [
  { id: '1', type: 'appNode', position: { x: 50, y: 50 }, data: { label: 'Webhook', typeLabel: 'Trigger', value: '/api/v1/stripe', icon: Webhook, active: false } },
  { id: '2', type: 'appNode', position: { x: 320, y: 120 }, data: { label: 'Logic', typeLabel: 'Filter', value: 'if amount > 100', icon: Split, active: false } },
  { id: '3', type: 'appNode', position: { x: 600, y: 50 }, data: { label: 'Postgres', typeLabel: 'Action', value: 'INSERT sales', icon: Database, active: false } },
];
const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#64748b' } },
    { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#64748b' } }
];

const PlaygroundSim = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    // This container has a solid background to look like a "window" floating over the grid
    <div className="rounded-xl overflow-hidden h-[500px] bg-slate-50/80 dark:bg-[#080808]/90 backdrop-blur-sm border border-slate-200 dark:border-white/10 shadow-sm relative">
      <div className="absolute top-4 left-4 z-10 bg-white dark:bg-[#0C0F0C] border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-md shadow-sm flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-slate-600 dark:text-neutral-400">Live Canvas</span>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        style={{ background: 'transparent' }} 
      >
        <Background color="currentColor" gap={32} size={1} className="text-slate-300 dark:text-white/5" />
      </ReactFlow>
    </div>
  );
};

export default function Playground() {
  return (
    // Section is transparent so the body grid shows around the "PlaygroundSim" window
    <section id="playground" className="py-32 px-6 md:px-20 border-b border-slate-200 dark:border-white/5 bg-transparent">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Build Graphically</h2>
            <p className="text-slate-500 dark:text-neutral-400">Drag, drop, connect. It compiles to code.</p>
        </div>
        <button className="flex items-center gap-2 text-sm font-bold text-green-600 dark:text-[#15FF00] hover:underline">
            <Code2 size={16} /> View JSON Output
        </button>
      </div>
      <PlaygroundSim />
    </section>
  );
}