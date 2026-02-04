'use client';

import React, { useState, useCallback } from 'react';
import ReactFlow, { 
  Background, Handle, Position, useNodesState, useEdgesState, 
  addEdge, Connection, NodeProps, MarkerType 
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Play, RefreshCcw } from 'lucide-react';

// Simplified Doc Node
const DocNode = ({ data }: NodeProps) => (
  <div className={`px-4 py-2 rounded-sm border transition-all duration-300 min-w-[120px] text-center
    ${data.completed ? 'bg-[#15FF00]/10 border-[#15FF00] shadow-[0_0_15px_rgba(21,255,0,0.3)]' : 'bg-[#0C0F0C] border-white/20'}
  `}>
    <Handle type="target" position={Position.Left} className="!w-2 !h-2 !bg-[#15FF00]" />
    <div className="text-xs font-mono font-bold text-[#F0FFF0] uppercase tracking-wider">{data.label}</div>
    <Handle type="source" position={Position.Right} className="!w-2 !h-2 !bg-[#15FF00]" />
  </div>
);
const nodeTypes = { docNode: DocNode };

export default function InteractiveLesson({ title, challenge }: { title: string, challenge: string }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    { id: '1', type: 'docNode', position: { x: 50, y: 50 }, data: { label: 'Input' } },
    { id: '2', type: 'docNode', position: { x: 250, y: 120 }, data: { label: 'Process' } },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [success, setSuccess] = useState(false);

  const onConnect = useCallback((params: Connection) => {
    // Check if the connection matches the tutorial goal (Source 1 -> Target 2)
    if (params.source === '1' && params.target === '2') {
      setSuccess(true);
      setNodes((nds) => nds.map(n => ({ ...n, data: { ...n.data, completed: true } })));
      setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#15FF00', strokeWidth: 2 } }, eds));
    } else {
      setEdges((eds) => addEdge(params, eds));
    }
  }, [setNodes, setEdges]);

  const reset = () => {
    setSuccess(false);
    setEdges([]);
    setNodes((nds) => nds.map(n => ({ ...n, data: { ...n.data, completed: false } })));
  };

  return (
    <div className="my-8 border border-white/10 rounded-lg overflow-hidden bg-[#050505]">
      <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
        <div>
          <h3 className="text-sm font-bold text-[#F0FFF0] flex items-center gap-2">
            <Play size={14} className="text-[#15FF00]" /> {title}
          </h3>
          <p className="text-xs text-neutral-400 mt-1 font-mono">{challenge}</p>
        </div>
        {success && (
           <button onClick={reset} className="text-xs text-neutral-500 hover:text-white flex items-center gap-1">
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