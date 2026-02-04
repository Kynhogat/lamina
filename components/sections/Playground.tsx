'use client';
import React, { useState, useCallback } from 'react';
import ReactFlow, { 
  Background, Controls, Handle, Position, useNodesState, 
  useEdgesState, Connection, addEdge, MarkerType, NodeProps
} from 'reactflow';
import 'reactflow/dist/style.css'; 
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Terminal, Activity, Webhook, Split, Database } from 'lucide-react';
import { SectionHeading, MonoLabel } from '@/components/ui/theme';

// --- Custom Node (Responsive) ---
const CyberNode = ({ data, isConnectable }: NodeProps) => {
  const Icon = data.icon;
  return (
    <div className={`
        bg-[#0C0F0C] border p-0 min-w-[160px] md:min-w-[200px] shadow-2xl transition-all duration-300 rounded-sm overflow-hidden
        ${data.active ? 'border-[#15FF00] shadow-[0_0_20px_rgba(21,255,0,0.2)]' : 'border-white/10 hover:border-white/30'}
      `}>
      <div className={`px-3 py-2 border-b border-white/5 flex items-center gap-2 ${data.active ? 'bg-[#15FF00]/10' : 'bg-white/5'}`}>
         {Icon && <Icon size={12} className={data.active ? "text-[#15FF00]" : "text-neutral-400"} />}
         <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-wider text-[#F0FFF0]">{data.label}</span>
      </div>
      <div className="p-3 space-y-2 relative">
         <Handle type="target" position={Position.Left} isConnectable={isConnectable} className="!bg-[#15FF00] !w-2 !h-2 !-left-[5px]" />
         <div className="font-mono text-[8px] md:text-[10px] text-neutral-500 uppercase mb-1">{data.typeLabel}</div>
         <div className="bg-black/40 border border-white/5 p-1.5 rounded text-[10px] md:text-xs font-mono text-[#F0FFF0] truncate">
            {data.value}
         </div>
         <Handle type="source" position={Position.Right} isConnectable={isConnectable} className="!bg-[#15FF00] !w-2 !h-2 !-right-[5px]" />
      </div>
    </div>
  );
};
const nodeTypes = { cyber: CyberNode };

// --- Initial Data (Compact for Mobile) ---
const initialNodes = [
  { id: '1', type: 'cyber', position: { x: 50, y: 50 }, data: { label: 'Webhook', typeLabel: 'Path', value: '/api/v1/user', icon: Webhook, active: false } },
  { id: '2', type: 'cyber', position: { x: 250, y: 150 }, data: { label: 'Logic', typeLabel: 'Rule', value: 'plan == "PRO"', icon: Split, active: false } },
  { id: '3', type: 'cyber', position: { x: 50, y: 250 }, data: { label: 'DB', typeLabel: 'Action', value: 'INSERT', icon: Database, active: false } },
];
const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#333' } },
    { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#333' } }
];

const PlaygroundSim = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#15FF00' } }, eds));
  }, [setEdges]);

  const runFlow = () => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs([]);
    const steps = [
      { nodeId: '1', log: 'WEBHOOK: /api/v1/user received' },
      { nodeId: '2', log: 'LOGIC: plan == "PRO" -> TRUE' },
      { nodeId: '3', log: 'DB: INSERT success' },
      { nodeId: null, log: 'DONE: 42ms' }
    ];
    setNodes((nds) => nds.map(n => ({ ...n, data: { ...n.data, active: false } })));
    setEdges((eds) => eds.map(e => ({ ...e, style: { stroke: '#333' } })));
    let delay = 0;
    steps.forEach((step, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, step.log]);
        if (step.nodeId) {
            setNodes((nds) => nds.map((node) => ({ ...node, data: { ...node.data, active: node.id === step.nodeId } })));
            if(index > 0) {
                 const prevNodeId = steps[index-1].nodeId;
                 setEdges((eds) => eds.map(e => {
                     if(e.source === prevNodeId && e.target === step.nodeId) return { ...e, style: { stroke: '#15FF00', strokeWidth: 2 } };
                     return e;
                 }));
            }
        }
        if (index === steps.length - 1) {
          setTimeout(() => { setIsRunning(false); setNodes((nds) => nds.map(n => ({ ...n, data: { ...n.data, active: false } }))); setEdges((eds) => eds.map(e => ({ ...e, style: { stroke: '#333' } }))); }, 1500);
        }
      }, delay);
      delay += 800;
    });
  };

  return (
    <div className="border border-white/10 bg-[#0A0A0A] rounded-sm overflow-hidden relative h-[450px] md:h-[600px] group flex flex-col">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#15FF00] via-transparent to-transparent opacity-20 z-10"></div>
      
      <div className="flex-grow h-full relative bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-90">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          panOnScroll={false} // Important for mobile
          style={{ background: 'transparent' }} 
        >
          <Background color="#222" gap={20} size={1} />
          <Controls className="hidden md:block !bg-black !border-white/10 [&>button]:!fill-white" />
        </ReactFlow>
      </div>

      <div className="bg-[#050505] border-t border-white/10 p-0 h-40 md:h-48 flex flex-col z-20 font-mono text-xs">
        <div className="flex justify-between items-center px-4 py-2 bg-white/5 border-b border-white/5">
          <div className="flex items-center gap-2 text-neutral-400">
             <Terminal size={12} />
             <span>LOGS</span>
          </div>
          <button 
            onClick={runFlow}
            disabled={isRunning}
            className="flex items-center gap-2 px-3 py-1 bg-[#15FF00] text-black font-bold uppercase hover:bg-[#12db00] transition-colors disabled:opacity-50 disabled:grayscale text-[10px] md:text-xs"
          >
            {isRunning ? <Activity size={12} className="animate-spin"/> : <Play size={12} fill="black" />}
            {isRunning ? 'Running' : 'RUN'}
          </button>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto space-y-1">
          <AnimatePresence>
            {logs.map((log, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                className="text-neutral-300 font-mono flex gap-2"
              >
                <span className="text-neutral-600 hidden sm:inline">
                  {new Date().toISOString().split('T')[1].slice(0,8)}
                </span>
                <span className={log.includes('DONE') ? 'text-[#15FF00]' : ''}>{log}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default function Playground() {
  return (
    <section id="playground" className="py-20 px-6 md:px-20 border-b border-white/5 relative z-10">
      <div className="flex justify-between items-end mb-8 md:mb-12">
        <SectionHeading>Interactive Canvas</SectionHeading>
        <div className="hidden md:block"><MonoLabel>Drag nodes to connect</MonoLabel></div>
      </div>
      <PlaygroundSim />
    </section>
  );
}