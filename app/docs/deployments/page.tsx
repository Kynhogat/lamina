export default function DeploymentsPage() {
  return (
    <div className="space-y-12">
      <div>
        <div className="inline-block px-2 py-1 bg-green-100 dark:bg-[#15FF00]/10 border border-green-400 dark:border-[#15FF00]/30 rounded mb-4">
          <span className="text-green-600 dark:text-[#15FF00] text-xs font-mono font-bold uppercase tracking-wider">Core Concepts</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">Deployments</h1>
        <p className="text-xl text-slate-500 dark:text-neutral-400 leading-relaxed max-w-2xl">
          A deployment is a compiled workflow that&apos;s actively running and ready to receive requests. Deploy in one click and manage everything from the sidebar.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-l-4 border-green-500 dark:border-[#15FF00] pl-4">Deploying a Workflow</h2>
        <p className="text-slate-500 dark:text-neutral-400">
          When your workflow is ready, click the <span className="text-slate-900 dark:text-white font-mono bg-slate-200 dark:bg-white/10 px-1 mx-1 rounded">Deploy</span> button in the top-right corner of the workflow builder. Lamina compiles your visual graph into an executable pipeline and starts it.
        </p>
        <div className="bg-slate-50 dark:bg-[#050505] border border-slate-200 dark:border-white/10 rounded-lg p-6 font-mono text-sm space-y-2">
          <div className="flex gap-2">
            <span className="text-green-600 dark:text-[#15FF00]">✔</span>
            <span className="text-slate-600 dark:text-neutral-400">Validating node connections...</span>
          </div>
          <div className="flex gap-2">
            <span className="text-green-600 dark:text-[#15FF00]">✔</span>
            <span className="text-slate-600 dark:text-neutral-400">Compiling workflow graph...</span>
          </div>
          <div className="flex gap-2">
            <span className="text-green-600 dark:text-[#15FF00]">✔</span>
            <span className="text-slate-600 dark:text-neutral-400">Starting webhook listener on /api/v2/ollama:8081</span>
          </div>
          <div className="flex gap-2 pt-2 text-green-600 dark:text-[#15FF00] font-bold">
            <span>●</span>
            <span>Deployment active</span>
          </div>
        </div>
      </section>

      <section className="space-y-6 pt-8 border-t border-slate-100 dark:border-white/5">
        <h2 className="text-2xl font-bold border-l-4 border-green-500 dark:border-[#15FF00] pl-4">Viewing Active Deployments</h2>
        <p className="text-slate-500 dark:text-neutral-400">
          The <span className="text-slate-900 dark:text-white font-bold">Deployments</span> section in the sidebar shows every workflow that&apos;s currently compiled and running. For each deployment you can see:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Status", desc: "Whether the deployment is active, stopped, or errored" },
            { label: "Endpoint", desc: "The URL and port where the workflow is listening" },
            { label: "Uptime", desc: "How long the deployment has been running" },
            { label: "Logs", desc: "Real-time stdout, stderr, and trace output" },
          ].map((item, i) => (
            <div key={i} className="border border-slate-200 dark:border-white/10 rounded-lg p-4 hover:border-green-500 dark:hover:border-[#15FF00] transition-colors">
              <div className="text-sm font-bold text-slate-900 dark:text-white mb-1">{item.label}</div>
              <p className="text-xs text-slate-500 dark:text-neutral-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6 pt-8 border-t border-slate-100 dark:border-white/5">
        <h2 className="text-2xl font-bold border-l-4 border-green-500 dark:border-[#15FF00] pl-4">Deployment Lifecycle</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="shrink-0 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-[#15FF00]/10 flex items-center justify-center text-green-600 dark:text-[#15FF00] text-xs font-bold">1</div>
              <div className="w-px h-6 bg-slate-200 dark:bg-white/10"></div>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Build</div>
              <p className="text-xs text-slate-500 dark:text-neutral-400">Connect your nodes and configure all fields on the canvas.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="shrink-0 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-[#15FF00]/10 flex items-center justify-center text-green-600 dark:text-[#15FF00] text-xs font-bold">2</div>
              <div className="w-px h-6 bg-slate-200 dark:bg-white/10"></div>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Deploy</div>
              <p className="text-xs text-slate-500 dark:text-neutral-400">Click Deploy. Lamina validates connections, compiles the graph, and starts the runtime.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="shrink-0 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-[#15FF00]/10 flex items-center justify-center text-green-600 dark:text-[#15FF00] text-xs font-bold">3</div>
              <div className="w-px h-6 bg-slate-200 dark:bg-white/10"></div>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Monitor</div>
              <p className="text-xs text-slate-500 dark:text-neutral-400">Watch live logs, trace inputs to outputs, and inspect execution timing in the deployments panel.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="shrink-0">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-[#15FF00]/10 flex items-center justify-center text-green-600 dark:text-[#15FF00] text-xs font-bold">4</div>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Iterate</div>
              <p className="text-xs text-slate-500 dark:text-neutral-400">Edit the workflow and re-deploy. Lamina hot-swaps the running instance with zero downtime.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6 pt-8 border-t border-slate-100 dark:border-white/5">
        <h2 className="text-2xl font-bold border-l-4 border-green-500 dark:border-[#15FF00] pl-4">Stopping a Deployment</h2>
        <p className="text-slate-500 dark:text-neutral-400">
          Click the stop button next to any active deployment to shut it down. The workflow remains in your project and can be re-deployed at any time.
        </p>
        <div className="bg-yellow-50 dark:bg-neutral-900/50 p-4 border-l-2 border-yellow-500/50 text-sm text-slate-500 dark:text-neutral-400">
          <strong>Note:</strong> Deleting a project automatically stops all its active deployments.
        </div>
      </section>
    </div>
  );
}
