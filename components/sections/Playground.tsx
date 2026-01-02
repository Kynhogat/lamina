'use client';

import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  Handle, 
  Position, 
  useNodesState, 
  useEdgesState, 
  Connection, 
  addEdge,
  MarkerType,
  NodeProps
} from 'reactflow';
import 'reactflow/dist/style.css'; // Mandatory CSS import

import { motion, AnimatePresence } from 'framer-motion';
import { Play, Terminal, Activity } from 'lucide-react';
import { SectionHeading, MonoLabel, COLORS } from '@/components/ui/theme';

// --- Custom Node Component ---
// This replaces your motion.div to work inside React Flow
const CyberNode = ({ data, isConnectable }: NodeProps) => {
  return (
    <div 
      className={`
        bg-neutral-900 border p-4 w-48 shadow-xl transition-all duration-300
        ${data.active ? 'border-[#15FF00] shadow-[0_0_15px_rgba(21,255,0,0.3)]' : 'border-[#F0FFF0]/20 hover:border-[#15FF00]/50'}
      `}
    >
      {/* Handles are the connection dots */}
      <Handle 
        type="target" 
        position={Position.Top} 
        isConnectable={isConnectable} 
        className="!bg-[#F0FFF0] !w-2 !h-2" 
      />
      
      <div className="flex justify-between items-center mb-2">
        <MonoLabel color={data.active ? '#15FF00' : undefined}>{data.label}</MonoLabel>
        <div className={`w-2 h-2 rounded-full transition-colors ${data.active ? 'bg-[#15FF00]' : 'bg-[#F0FFF0]/20'}`}></div>
      </div>
      <div className="text-sm text-[#F0FFF0]/80 font-mono text-xs">{data.subtext}</div>

      <Handle 
        type="source" 
        position={Position.Bottom} 
        isConnectable={isConnectable} 
        className="!bg-[#F0FFF0] !w-2 !h-2" 
      />
    </div>
  );
};

const nodeTypes = { cyber: CyberNode };

// --- Initial Data ---
const initialNodes = [
  { 
    id: '1', 
    type: 'cyber', 
    position: { x: 100, y: 50 }, 
    data: { label: 'Input', subtext: 'Topic: "Neural Networks"', active: false } 
  },
  { 
    id: '2', 
    type: 'cyber', 
    position: { x: 300, y: 180 }, 
    data: { label: 'Transform', subtext: 'LLM Synthesis [GPT-4]', active: false } 
  },
  { 
    id: '3', 
    type: 'cyber', 
    position: { x: 100, y: 300 }, 
    data: { label: 'Output', subtext: 'JSON / Markdown', active: false } 
  },
];

const initialEdges = [
  { 
    id: 'e1-2', 
    source: '1', 
    target: '2', 
    animated: true, 
    style: { stroke: '#F0FFF0', opacity: 0.3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#F0FFF0' },
  },
  { 
    id: 'e2-3', 
    source: '2', 
    target: '3', 
    animated: true, 
    style: { stroke: '#F0FFF0', opacity: 0.3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#F0FFF0' },
  }
];

const PlaygroundSim = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  // Handle manual connections
  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#F0FFF0' } }, eds));
  }, [setEdges]);

  const runFlow = () => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs([]);

    const steps = [
      { nodeId: '1', log: 'INIT_FLOW: Fetching context...' },
      { nodeId: '2', log: 'NODE_02: Transform [OpenAI gpt-4]' },
      { nodeId: '3', log: 'NODE_03: Formatting Output...' },
      { nodeId: null, log: 'STATUS: 200 OK - Pipeline Complete' }
    ];

    // Reset nodes first
    setNodes((nds) => nds.map(n => ({ ...n, data: { ...n.data, active: false } })));

    let delay = 0;

    steps.forEach((step, index) => {
      setTimeout(() => {
        // Update Logs
        setLogs(prev => [...prev, step.log]);

        // Update Active Node Visuals
        setNodes((nds) => nds.map((node) => {
          if (node.id === step.nodeId) return { ...node, data: { ...node.data, active: true } };
          if (step.nodeId && node.id !== step.nodeId) return { ...node, data: { ...node.data, active: false } }; // Turn off others
          return node;
        }));

        // Finish
        if (index === steps.length - 1) {
          setTimeout(() => {
            setIsRunning(false);
            setNodes((nds) => nds.map(n => ({ ...n, data: { ...n.data, active: false } })));
          }, 800);
        }
      }, delay);
      
      delay += 1200; // Time between steps
    });
  };

  return (
    <div className="border border-white/10 bg-[#0A0A0A] rounded-sm overflow-hidden relative h-[600px] group flex flex-col">
      
      {/* React Flow Canvas */}
      <div className="flex-grow h-full relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          // Style overrides to force dark theme compatibility
          style={{ background: 'transparent' }} 
        >
          <Background color={COLORS.line || '#333'} gap={40} size={1} className="opacity-10" />
          <Controls className="bg-neutral-900 border border-white/10 [&>button]:fill-white [&>button]:text-white" />
        </ReactFlow>
      </div>

      {/* Console Overlay */}
      <div className="bg-neutral-950 border-t border-white/10 p-4 font-mono text-xs h-48 overflow-y-auto shrink-0 z-20 relative">
        <div className="flex justify-between items-center mb-2 sticky top-0 bg-neutral-950 pb-2 z-10">
          <div className="flex items-center gap-2 text-neutral-500">
             <Terminal size={12} />
             <span>SYSTEM CONSOLE</span>
          </div>
          <button 
            onClick={runFlow}
            disabled={isRunning}
            className="flex items-center gap-2 px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-[#F0FFF0] border border-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? (
              <Activity size={12} className="text-[#15FF00] animate-spin" />
            ) : (
              <Play size={12} className="text-[#15FF00]" />
            )}
            {isRunning ? 'EXECUTING...' : 'RUN PIPELINE'}
          </button>
        </div>
        
        <div className="space-y-1 font-mono">
          <AnimatePresence>
            {logs.map((log, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                className="text-[#F0FFF0]/80 border-l-2 border-transparent pl-2 hover:border-[#15FF00]/50 transition-colors"
              >
                <span className="text-neutral-600 mr-3">
                  [{new Date().toLocaleTimeString().split(' ')[0]}]
                </span>
                {log}
              </motion.div>
            ))}
          </AnimatePresence>
          {!isRunning && logs.length === 0 && (
            <span className="text-neutral-700 italic flex items-center gap-2">
               // Ready to synthesize nodes...
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Playground() {
  return (
    <section id="playground" className="py-32 px-8 md:px-20 border-b border-white/5">
      <div className="flex justify-between items-end mb-12">
        <SectionHeading>The Workbench</SectionHeading>
        <MonoLabel>Interactive Flow</MonoLabel>
      </div>
      <PlaygroundSim />
    </section>
  );
}