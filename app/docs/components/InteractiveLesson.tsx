'use client';

import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Background, Handle, Position, useNodesState, useEdgesState,
  addEdge, Connection, NodeProps, MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Play, RefreshCcw, MessageSquare, Cpu, Send } from 'lucide-react';

// Lamina-style Doc Node with icon and type label
const DocNode = ({ data }: NodeProps) => {
  const Icon = data.icon;
  return (
    <div className={`rounded-lg border transition-all duration-300 min-w-[160px] overflow-hidden
      ${data.completed
        ? 'bg-green-50 dark:bg-[#15FF00]/10 border-green-500 dark:border-[#15FF00] shadow-[0_0_15px_rgba(21,255,0,0.3)]'
        : 'bg-white dark:bg-[#0C0F0C] border-slate-300 dark:border-white/20'}
    `}>
      <div className="px-3 py-1.5 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {Icon && <Icon size={10} className="text-green-600 dark:text-[#15FF00]" />}
          <span className="text-[9px] font-mono text-slate-400 dark:text-neutral-500 uppercase tracking-wider">{data.typeLabel}</span>
        </div>
      </div>
      <div className="px-3 py-2.5 relative">
        <Handle type="target" position={Position.Left} className="!w-2 !h-2 !bg-green-500 dark:!bg-[#15FF00]" />
        <div className="text-xs font-mono font-bold text-slate-900 dark:text-[#F0FFF0] tracking-wide">{data.label}</div>
        <div className="text-[10px] font-mono text-slate-400 dark:text-neutral-600 mt-0.5">{data.detail}</div>
        <Handle type="source" position={Position.Right} className="!w-2 !h-2 !bg-green-500 dark:!bg-[#15FF00]" />
      </div>
    </div>
  );
};
const nodeTypes = { docNode: DocNode };

export default function InteractiveLesson({ title, challenge }: { title: string, challenge: string }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    { id: '1', type: 'docNode', position: { x: 30, y: 30 }, data: { label: 'User Prompt', typeLabel: 'Input', detail: '"Summarize this..."', icon: MessageSquare } },
    { id: '2', type: 'docNode', position: { x: 250, y: 80 }, data: { label: 'Claude 3.5', typeLabel: 'LLM', detail: 'model: claude-sonnet', icon: Cpu } },
    { id: '3', type: 'docNode', position: { x: 470, y: 30 }, data: { label: 'API Response', typeLabel: 'Output', detail: 'POST /v1/result', icon: Send } },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(0);

  const onConnect = useCallback((params: Connection) => {
    if (params.source === '1' && params.target === '2' && step === 0) {
      setStep(1);
      setNodes((nds) => nds.map(n =>
        n.id === '1' || n.id === '2' ? { ...n, data: { ...n.data, completed: true } } : n
      ));
      setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#15FF00', strokeWidth: 2 } }, eds));
    } else if (params.source === '2' && params.target === '3' && step === 1) {
      setStep(2);
      setSuccess(true);
      setNodes((nds) => nds.map(n => ({ ...n, data: { ...n.data, completed: true } })));
      setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#15FF00', strokeWidth: 2 } }, eds));
    } else {
      setEdges((eds) => addEdge(params, eds));
    }
  }, [step, setNodes, setEdges]);

  const reset = () => {
    setSuccess(false);
    setStep(0);
    setEdges([]);
    setNodes((nds) => nds.map(n => ({ ...n, data: { ...n.data, completed: false } })));
  };

  return (
    <div className="my-8 border border-slate-200 dark:border-white/10 rounded-lg overflow-hidden bg-slate-50 dark:bg-[#050505]">
      <div className="p-4 border-b border-slate-200 dark:border-white/10 flex justify-between items-center bg-slate-100 dark:bg-white/5">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-[#F0FFF0] flex items-center gap-2">
            <Play size={14} className="text-green-600 dark:text-[#15FF00]" /> {title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1 font-mono">{challenge}</p>
        </div>
        {success && (
           <button onClick={reset} className="text-xs text-slate-400 dark:text-neutral-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1">
             <RefreshCcw size={12}/> Reset
           </button>
        )}
      </div>

      <div className="h-64 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-90"
        >
          <Background color="#222" gap={20} size={1} />
        </ReactFlow>

        <AnimatePresence>
          {success && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 z-10 bg-black/60 backdrop-blur-sm flex items-center justify-center"
            >
              <div className="bg-[#15FF00] text-black px-6 py-4 rounded font-bold font-mono flex items-center gap-3 shadow-[0_0_30px_rgba(21,255,0,0.4)]">
                 <CheckCircle2 size={24} />
                 LESSON_COMPLETE
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}