export default function WorkflowsPage() {
  return (
    <div className="space-y-12">
      <div>
        <div className="inline-block px-2 py-1 bg-green-100 dark:bg-[#15FF00]/10 border border-green-400 dark:border-[#15FF00]/30 rounded mb-4">
          <span className="text-green-600 dark:text-[#15FF00] text-xs font-mono font-bold uppercase tracking-wider">Core Concepts</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">Workflow Builder</h1>
        <p className="text-xl text-slate-500 dark:text-neutral-400 leading-relaxed max-w-2xl">
          The workflow builder is where you spend most of your time. It&apos;s a visual canvas where you drag, drop, and connect nodes to build AI pipelines.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-l-4 border-green-500 dark:border-[#15FF00] pl-4">The Explorer</h2>
        <p className="text-slate-500 dark:text-neutral-400">
          On the left side of the workflow builder is the <span className="text-slate-900 dark:text-white font-bold">Explorer</span>. It shows every file and folder in your project. This is your project&apos;s file tree.
        </p>
        <div className="space-y-3">
          <div className="border border-slate-200 dark:border-white/10 rounded-lg p-4">
            <div className="text-sm font-bold text-slate-900 dark:text-white mb-1">Create folders</div>
            <p className="text-xs text-slate-500 dark:text-neutral-400">Right-click in the explorer and select &quot;New Folder&quot; to organize your workflow files.</p>
          </div>
          <div className="border border-slate-200 dark:border-white/10 rounded-lg p-4">
            <div className="text-sm font-bold text-slate-900 dark:text-white mb-1">Create workflow files</div>
            <p className="text-xs text-slate-500 dark:text-neutral-400">Right-click inside a folder and select &quot;New File&quot; to create a new <code className="bg-slate-200 dark:bg-white/10 px-1 rounded">.json</code> workflow file.</p>
          </div>
          <div className="border border-slate-200 dark:border-white/10 rounded-lg p-4">
            <div className="text-sm font-bold text-slate-900 dark:text-white mb-1">Open files</div>
            <p className="text-xs text-slate-500 dark:text-neutral-400">Click any workflow file to open it on the canvas. Multiple files appear as tabs at the top of the editor.</p>
          </div>
        </div>
      </section>

      <section className="space-y-6 pt-8 border-t border-slate-100 dark:border-white/5">
        <h2 className="text-2xl font-bold border-l-4 border-green-500 dark:border-[#15FF00] pl-4">Creating Workflows</h2>
        <p className="text-slate-500 dark:text-neutral-400">
          A workflow is a <code className="bg-slate-200 dark:bg-white/10 px-1 rounded text-slate-900 dark:text-white">.json</code> file that contains a directed graph of nodes and edges. When you open a workflow file, the canvas renders its contents and you can start building.
        </p>
        <div className="bg-slate-50 dark:bg-[#050505] border border-slate-200 dark:border-white/10 rounded-lg p-6 relative">
          <div className="absolute top-4 right-4 text-xs font-mono text-slate-400 dark:text-neutral-600">example.json</div>
          <pre className="font-mono text-sm text-slate-600 dark:text-neutral-400 overflow-x-auto">
{`{
  "id": "workflow_01",
  "nodes": [
    {
      "id": "n1",
      "type": "webhook",
      "data": { "url": "/api/v2/ollama", "port": "8081" }
    },
    {
      "id": "n2",
      "type": "llama_local_node",
      "data": { "model": "llama3:8b", "temp": "0.7" }
    },
    {
      "id": "n3",
      "type": "res_aggr",
      "data": { "format": "json" }
    }
  ],
  "edges": [
    { "source": "n1", "target": "n2", "id": "e1-2" },
    { "source": "n2", "target": "n3", "id": "e2-3" }
  ]
}`}
          </pre>
        </div>
      </section>

      <section className="space-y-6 pt-8 border-t border-slate-100 dark:border-white/5">
        <h2 className="text-2xl font-bold border-l-4 border-green-500 dark:border-[#15FF00] pl-4">Building on the Canvas</h2>
        <p className="text-slate-500 dark:text-neutral-400">
          The canvas is a drag-and-drop workspace powered by React Flow. Data flows left to right through the nodes you place.
        </p>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="shrink-0 w-5 h-5 rounded bg-green-100 dark:bg-[#15FF00]/10 flex items-center justify-center text-green-600 dark:text-[#15FF00] text-xs font-bold mt-0.5">1</span>
            <span className="text-slate-500 dark:text-neutral-400">Press <kbd className="bg-slate-200 dark:bg-white/10 px-1.5 py-0.5 rounded text-slate-900 dark:text-white text-xs font-mono">Ctrl+K</kbd> to open the node picker and add a node to the canvas</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="shrink-0 w-5 h-5 rounded bg-green-100 dark:bg-[#15FF00]/10 flex items-center justify-center text-green-600 dark:text-[#15FF00] text-xs font-bold mt-0.5">2</span>
            <span className="text-slate-500 dark:text-neutral-400">Drag from an <span className="text-orange-500 font-bold">orange output handle</span> to a <span className="text-blue-500 font-bold">blue input handle</span> to connect nodes</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="shrink-0 w-5 h-5 rounded bg-green-100 dark:bg-[#15FF00]/10 flex items-center justify-center text-green-600 dark:text-[#15FF00] text-xs font-bold mt-0.5">3</span>
            <span className="text-slate-500 dark:text-neutral-400">Configure each node&apos;s fields by clicking on it and editing the values in the inspector</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="shrink-0 w-5 h-5 rounded bg-green-100 dark:bg-[#15FF00]/10 flex items-center justify-center text-green-600 dark:text-[#15FF00] text-xs font-bold mt-0.5">4</span>
            <span className="text-slate-500 dark:text-neutral-400">Hit <span className="text-slate-900 dark:text-white font-bold">Deploy</span> when your workflow is ready to go live</span>
          </div>
        </div>
      </section>

      <section className="space-y-6 pt-8 border-t border-slate-100 dark:border-white/5">
        <h2 className="text-2xl font-bold border-l-4 border-green-500 dark:border-[#15FF00] pl-4">Navigation</h2>
        <p className="text-slate-500 dark:text-neutral-400">
          The sidebar navigation inside the workflow builder gives you access to all sections of Lamina without leaving your project:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { label: "Home", desc: "Back to the home screen with the AI assistant" },
            { label: "Deployments", desc: "View active deployments and their status" },
            { label: "Templates", desc: "Browse and manage your locally installed nodes" },
            { label: "Projects", desc: "Quick-switch between all your projects" },
          ].map((item, i) => (
            <div key={i} className="border border-slate-200 dark:border-white/10 rounded-lg p-4 hover:border-green-500 dark:hover:border-[#15FF00] transition-colors">
              <div className="text-sm font-bold text-slate-900 dark:text-white mb-1">{item.label}</div>
              <p className="text-xs text-slate-500 dark:text-neutral-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
