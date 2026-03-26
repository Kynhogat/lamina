export default function NodesPage() {
  return (
    <div className="space-y-12">
      <div>
        <div className="inline-block px-2 py-1 bg-green-100 dark:bg-[#15FF00]/10 border border-green-400 dark:border-[#15FF00]/30 rounded mb-4">
          <span className="text-green-600 dark:text-[#15FF00] text-xs font-mono font-bold uppercase tracking-wider">Core Concepts</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">Nodes &amp; Templates</h1>
        <p className="text-xl text-slate-500 dark:text-neutral-400 leading-relaxed max-w-2xl">
          Nodes are the building blocks of every workflow. Each node is a self-contained unit with typed inputs, configurable fields, and typed outputs.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-l-4 border-green-500 dark:border-[#15FF00] pl-4">Anatomy of a Node</h2>
        <p className="text-slate-500 dark:text-neutral-400">
          Every node in Lamina follows the same structure:
        </p>
        <div className="bg-slate-50 dark:bg-[#050505] border border-slate-200 dark:border-white/10 rounded-lg p-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-3 h-[6px] bg-gray-400 rounded-none mt-2"></div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Activation Handle</div>
              <p className="text-xs text-slate-500 dark:text-neutral-400">Gray bar at the top. Receives a TRIGGER signal from another node to start execution.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-[6px] h-3 bg-blue-500 rounded-none mt-1.5"></div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Input Handles</div>
              <p className="text-xs text-slate-500 dark:text-neutral-400">Blue bars on the left. Receive data from other nodes. When connected, the field shows &quot;LINKED&quot;.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-[6px] h-3 bg-orange-500 rounded-none mt-1.5"></div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Output Handles</div>
              <p className="text-xs text-slate-500 dark:text-neutral-400">Orange bars on the right. Emit data to connected downstream nodes. Labeled in caps (PAYLOAD, GENERATED TEXT, etc).</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-4 h-4 border border-slate-300 dark:border-white/20 rounded mt-1"></div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Fields</div>
              <p className="text-xs text-slate-500 dark:text-neutral-400">Configurable parameters in the node body. Each field has a data type (String, Number, JSON, etc).</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6 pt-8 border-t border-slate-100 dark:border-white/5">
        <h2 className="text-2xl font-bold border-l-4 border-green-500 dark:border-[#15FF00] pl-4">The Template Page</h2>
        <p className="text-slate-500 dark:text-neutral-400">
          The <span className="text-slate-900 dark:text-white font-bold">Templates</span> section in the sidebar shows all your locally installed node types. This is the node library &mdash; every node type available to you is listed here.
        </p>
        <p className="text-slate-500 dark:text-neutral-400">
          Before you can use a node in a project, you need to <span className="text-slate-900 dark:text-white font-bold">push it into the project</span> from the template page. This keeps projects lightweight by only including the node types they actually need.
        </p>
        <div className="bg-slate-50 dark:bg-[#050505] border border-slate-200 dark:border-white/10 rounded-lg p-6 font-mono text-sm space-y-2 text-slate-600 dark:text-neutral-400">
          <div className="text-xs text-slate-400 dark:text-neutral-600 uppercase tracking-wider mb-3">Templates &gt; Designer</div>
          <div className="flex items-center gap-4">
            <span className="text-slate-900 dark:text-white font-bold">Label</span>
            <span className="bg-slate-200 dark:bg-white/10 px-2 py-0.5 rounded text-xs">New Node Template</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-900 dark:text-white font-bold">Type ID</span>
            <span className="bg-slate-200 dark:bg-white/10 px-2 py-0.5 rounded text-xs">custom_node</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-900 dark:text-white font-bold">Category</span>
            <span className="bg-slate-200 dark:bg-white/10 px-2 py-0.5 rounded text-xs">Test</span>
          </div>
          <div className="pt-2 border-t border-slate-200 dark:border-white/10 mt-2">
            <div className="flex gap-3">
              <span className="bg-green-100 dark:bg-[#15FF00]/10 text-green-600 dark:text-[#15FF00] px-3 py-1 rounded text-xs font-bold">Save Library</span>
              <span className="bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-neutral-400 px-3 py-1 rounded text-xs font-bold">To Project</span>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6 pt-8 border-t border-slate-100 dark:border-white/5">
        <h2 className="text-2xl font-bold border-l-4 border-green-500 dark:border-[#15FF00] pl-4">Creating Custom Nodes</h2>
        <p className="text-slate-500 dark:text-neutral-400">
          In the template designer, you can create your own node types from scratch. Define:
        </p>
        <ul className="space-y-2 text-slate-500 dark:text-neutral-400 text-sm">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 dark:bg-[#15FF00] rounded-full shrink-0"></span>
            <strong className="text-slate-900 dark:text-white">Label &amp; Type ID</strong> &mdash; the display name and unique identifier
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 dark:bg-[#15FF00] rounded-full shrink-0"></span>
            <strong className="text-slate-900 dark:text-white">Category</strong> &mdash; for organizing nodes in the picker
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 dark:bg-[#15FF00] rounded-full shrink-0"></span>
            <strong className="text-slate-900 dark:text-white">Inputs</strong> &mdash; named fields with a slug ID, data type, and optional connection toggle
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 dark:bg-[#15FF00] rounded-full shrink-0"></span>
            <strong className="text-slate-900 dark:text-white">Outputs</strong> &mdash; named output ports that downstream nodes can connect to
          </li>
        </ul>
        <p className="text-slate-500 dark:text-neutral-400">
          Save it to your library, then push it to any project that needs it.
        </p>
      </section>

      <section className="space-y-6 pt-8 border-t border-slate-100 dark:border-white/5">
        <h2 className="text-2xl font-bold border-l-4 border-green-500 dark:border-[#15FF00] pl-4">Adding Nodes to a Workflow</h2>
        <p className="text-slate-500 dark:text-neutral-400">
          Once a node type has been pushed into your project, you can add instances of it to any workflow:
        </p>
        <div className="bg-slate-50 dark:bg-[#050505] border border-slate-200 dark:border-white/10 rounded-lg p-5">
          <div className="flex items-center gap-3 mb-3">
            <kbd className="bg-slate-200 dark:bg-white/10 px-2 py-1 rounded text-slate-900 dark:text-white text-sm font-mono">Ctrl+K</kbd>
            <span className="text-sm text-slate-500 dark:text-neutral-400">Open the node picker</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-neutral-400">
            The picker shows every node type available in the current project. Search by name or category, then click to place it on the canvas.
          </p>
        </div>
      </section>
    </div>
  );
}
