'use client';

import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Background, Handle, Position, useNodesState, useEdgesState,
  addEdge, Connection, NodeProps
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Play, RefreshCcw, Info, ChevronUp, GripHorizontal, Link, Link2Off } from 'lucide-react';

type NodeField = { label: string; value: string; hasInput: boolean; linked: boolean; canConnect: boolean };
type NodeData = {
  label: string; typeId: string; fields: NodeField[];
  outputs: string[]; completed: boolean;
};

const field = (label: string, value: string, canConnect = false, linked = false): NodeField => ({
  label, value, hasInput: canConnect, linked, canConnect,
});

const DocNode = ({ data }: NodeProps) => (
  <div
    className={`
      w-[280px] rounded-lg border bg-white text-slate-800 shadow-xl
      transition-shadow duration-200 select-none overflow-visible
      ${data.completed
        ? 'border-green-500 ring-2 ring-green-500/20'
        : 'border-slate-200'}
    `}
  >
    <Handle
      type="target"
      position={Position.Top}
      id="activation"
      className="!w-8 !h-[6px] !bg-gray-500 !border-none !rounded-none !z-50 !-top-px"
    />

    <div className="flex items-center justify-between px-3 py-2 bg-slate-50/60 rounded-t-lg border-b border-slate-100 relative">
      <div className="flex items-center gap-2">
        <div className="p-0.5 hover:bg-slate-100 rounded transition-colors">
          <Info size={12} className="text-slate-400" />
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[11px] font-semibold text-slate-800 tracking-tight max-w-[140px] truncate">
            {data.label}
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500">
            [{data.typeId}]
          </span>
        </div>
      </div>
      <div className="p-1 hover:bg-slate-100 rounded text-slate-400 transition-colors">
        <ChevronUp size={12} />
      </div>
    </div>

    <div className="py-1">
      {data.fields?.map((f: NodeField, i: number) => (
        <div key={i} className="relative flex flex-col px-3 py-2 group hover:bg-slate-50/60 transition-colors">
          {f.canConnect && (
            <Handle
              type="target"
              position={Position.Left}
              id={`in-${i}`}
              style={{ left: '-1px' }}
              className={`!w-[6px] !h-3 !bg-blue-500 !border-none !rounded-none !z-50 transition-all ${
                !f.linked ? '!opacity-20 hover:!opacity-100' : ''
              }`}
            />
          )}

          <div className="flex items-center justify-between mb-1">
            <label className="text-[10px] font-medium text-slate-500">{f.label}</label>
            {f.canConnect && (
              <div className={`h-4 w-4 flex items-center justify-center ${f.linked ? 'text-blue-500' : 'text-slate-400'}`}>
                {f.linked ? <Link size={10} /> : <Link2Off size={10} />}
              </div>
            )}
          </div>

          {f.linked ? (
            <div className="h-7 flex items-center px-2 text-[9px] text-blue-500 font-mono bg-blue-500/5 border border-blue-500/20 rounded uppercase">
              linked
            </div>
          ) : f.value ? (
            <div className="h-7 flex items-center px-2 text-[12px] font-mono text-slate-700 bg-white border border-slate-200 rounded shadow-none">
              {f.value}
            </div>
          ) : (
            <div className="h-7 flex items-center px-2 text-[10px] text-slate-400 italic bg-slate-50 border border-dashed border-slate-200 rounded">
              Default
            </div>
          )}
        </div>
      ))}
    </div>

    <div className="mt-1 border-t border-slate-100 bg-slate-50/30">
      {data.outputs?.map((output: string, i: number) => (
        <div key={i} className="relative flex items-center justify-end h-9 px-3 hover:bg-slate-50/60 transition-colors">
          <span className="text-[10px] font-bold text-slate-800/80 uppercase mr-1">{output}</span>
          <Handle
            type="source"
            position={Position.Right}
            id={`out-${i}`}
            style={{ right: '-1px' }}
            className="!w-[6px] !h-3 !bg-orange-500 !border-none !rounded-none !z-50 hover:!scale-110 !transition-transform"
          />
        </div>
      ))}
    </div>

    <div className="h-[6px] w-full border-t border-slate-100 bg-slate-50/40 rounded-b-lg flex items-center justify-center">
      <GripHorizontal size={10} className="text-slate-300/40" />
    </div>
  </div>
);

const nodeTypes = { docNode: DocNode };

export default function InteractiveLesson({ title, challenge }: { title: string; challenge: string }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: '1', type: 'docNode', position: { x: 0, y: 0 },
      data: {
        label: 'API Entry', typeId: 'webhook',
        fields: [
          field('URL', '/api/v2/ollama'),
          field('Port', '8081'),
        ],
        outputs: ['PAYLOAD', 'TRIGGER'],
        completed: false,
      } as NodeData,
    },
    {
      id: '2', type: 'docNode', position: { x: 340, y: 160 },
      data: {
        label: 'Local LLM Controller', typeId: 'llama_local_node',
        fields: [
          field('Model Name', 'llama3:8b'),
          field('System Instructions', '', true, false),
          field('Creativity (Temp)', '0.7'),
        ],
        outputs: ['GENERATED TEXT', 'TOKEN USAGE'],
        completed: false,
      } as NodeData,
    },
    {
      id: '3', type: 'docNode', position: { x: 680, y: 20 },
      data: {
        label: 'Result Aggregator', typeId: 'res_aggr',
        fields: [
          field('JSON Input', '', true, false),
        ],
        outputs: ['TRIGGER'],
        completed: false,
      } as NodeData,
    },
  ]);

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(0);

  const edgeStyle = { stroke: '#94a3b8', strokeWidth: 1.5 };
  const edgeDash = '8 4';

  const onConnect = useCallback((params: Connection) => {
    if (params.source === '1' && params.target === '2' && step === 0) {
      setStep(1);
      setNodes((nds) => nds.map((n) => {
        if (n.id === '2') {
          return { ...n, data: { ...n.data, completed: true, fields: n.data.fields.map((f: NodeField) => f.label === 'System Instructions' ? { ...f, linked: true } : f) } };
        }
        return n.id === '1' ? { ...n, data: { ...n.data, completed: true } } : n;
      }));
      setEdges((eds) => addEdge({ ...params, animated: true, style: { ...edgeStyle, strokeDasharray: edgeDash } }, eds));
    } else if (params.source === '2' && params.target === '3' && step === 1) {
      setStep(2);
      setSuccess(true);
      setNodes((nds) => nds.map((n) => {
        if (n.id === '3') {
          return { ...n, data: { ...n.data, completed: true, fields: n.data.fields.map((f: NodeField) => f.label === 'JSON Input' ? { ...f, linked: true } : f) } };
        }
        return { ...n, data: { ...n.data, completed: true } };
      }));
      setEdges((eds) => addEdge({ ...params, animated: true, style: { ...edgeStyle, strokeDasharray: edgeDash } }, eds));
    } else {
      setEdges((eds) => addEdge(params, eds));
    }
  }, [step, setNodes, setEdges]);

  const reset = () => {
    setSuccess(false);
    setStep(0);
    setEdges([]);
    setNodes((nds) => nds.map((n) => ({
      ...n,
      data: {
        ...n.data,
        completed: false,
        fields: n.data.fields.map((f: NodeField) => f.hasInput ? { ...f, linked: false } : f),
      },
    })));
  };

  const hint = step === 0
    ? "Step 1 / 2 — Drag from API Entry's TRIGGER → LLM Controller's System Instructions."
    : step === 1
      ? "Step 2 / 2 — Drag from LLM Controller's GENERATED TEXT → Result Aggregator's JSON Input."
      : null;

  return (
    <div className="my-8 rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden bg-white dark:bg-[#050505] shadow-sm">
      <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-5 py-4">
        <div className="space-y-1.5">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-[#F0FFF0]">
            <Play size={14} className="text-green-600 dark:text-[#15FF00]" />
            {title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono leading-relaxed">{challenge}</p>
          {hint && (
            <p className="text-xs text-green-600 dark:text-[#15FF00] font-mono">{hint}</p>
          )}
        </div>
        {success ? (
          <button onClick={reset} className="shrink-0 flex items-center gap-1.5 rounded-md border border-slate-200 dark:border-white/10 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-white transition-colors">
            <RefreshCcw size={12} /> Reset
          </button>
        ) : (
          <span className="shrink-0 rounded-full bg-green-100 dark:bg-[#15FF00]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-green-700 dark:text-[#15FF00]">
            {step}/2
          </span>
        )}
      </div>

      <div className="h-[520px] relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          defaultViewport={{ x: 20, y: 15, zoom: 0.7 }}
          minZoom={0.5}
          maxZoom={1}
          proOptions={{ hideAttribution: true }}
          className="bg-white dark:bg-[#050505]"
        >
          <Background color="#94a3b8" gap={20} size={2} className="dark:!text-white/10" />
        </ReactFlow>

        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 rounded-lg bg-[#15FF00] px-8 py-5 font-bold font-mono text-black shadow-[0_0_40px_rgba(21,255,0,0.35)]">
                <CheckCircle2 size={22} />
                LESSON_COMPLETE
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
