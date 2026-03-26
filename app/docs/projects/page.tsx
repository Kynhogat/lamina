export default function ProjectsPage() {
  return (
    <div className="space-y-12">
      <div>
        <div className="inline-block px-2 py-1 bg-green-100 dark:bg-[#15FF00]/10 border border-green-400 dark:border-[#15FF00]/30 rounded mb-4">
          <span className="text-green-600 dark:text-[#15FF00] text-xs font-mono font-bold uppercase tracking-wider">Core Concepts</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">Projects</h1>
        <p className="text-xl text-slate-500 dark:text-neutral-400 leading-relaxed max-w-2xl">
          A project is the top-level container for everything in Lamina. It holds your workflows, node templates, deployment configs, and file assets.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-l-4 border-green-500 dark:border-[#15FF00] pl-4">Creating a Project</h2>
        <p className="text-slate-500 dark:text-neutral-400">
          From the home screen, click <span className="text-slate-900 dark:text-white font-mono bg-slate-200 dark:bg-white/10 px-1 mx-1 rounded">Create New Project</span>. Give it a name and you&apos;ll land directly in the workflow builder with an empty explorer.
        </p>
        <p className="text-slate-500 dark:text-neutral-400">
          Every project gets its own isolated file system. Nothing is shared between projects unless you explicitly export and import nodes or workflows.
        </p>
      </section>

      <section className="space-y-6 pt-8 border-t border-slate-100 dark:border-white/5">
        <h2 className="text-2xl font-bold border-l-4 border-green-500 dark:border-[#15FF00] pl-4">Project File System</h2>
        <p className="text-slate-500 dark:text-neutral-400">
          On the left side of the workflow builder, the <span className="text-slate-900 dark:text-white font-bold">Explorer</span> panel shows everything inside your project. This is your project&apos;s file system.
        </p>
        <div className="bg-slate-50 dark:bg-[#050505] border border-slate-200 dark:border-white/10 rounded-lg p-6 font-mono text-sm">
          <div className="space-y-1 text-slate-600 dark:text-neutral-400">
            <div className="text-slate-900 dark:text-white font-bold">📁 AI Delivery Processing</div>
            <div className="pl-4">📄 api entry.json</div>
            <div className="pl-4">📄 example.json</div>
            <div className="pl-4">📄 root.json</div>
            <div className="pl-4">
              <span className="text-slate-900 dark:text-white">📁 jahresbericht</span>
              <div className="pl-4">📄 delivery_master.json</div>
            </div>
          </div>
        </div>
        <p className="text-slate-500 dark:text-neutral-400">
          Right-click in the explorer to create new folders or workflow files. Each <code className="bg-slate-200 dark:bg-white/10 px-1 rounded text-slate-900 dark:text-white">.json</code> file is a workflow that you can open in the canvas editor.
        </p>
      </section>

      <section className="space-y-6 pt-8 border-t border-slate-100 dark:border-white/5">
        <h2 className="text-2xl font-bold border-l-4 border-green-500 dark:border-[#15FF00] pl-4">Viewing All Projects</h2>
        <p className="text-slate-500 dark:text-neutral-400">
          Click <span className="text-slate-900 dark:text-white font-mono bg-slate-200 dark:bg-white/10 px-1 mx-1 rounded">View All Projects</span> from the home screen to see every project you&apos;ve created. From here you can:
        </p>
        <ul className="space-y-3 text-slate-500 dark:text-neutral-400">
          <li className="flex items-start gap-3">
            <span className="shrink-0 w-5 h-5 rounded bg-green-100 dark:bg-[#15FF00]/10 flex items-center justify-center text-green-600 dark:text-[#15FF00] text-xs font-bold mt-0.5">1</span>
            <span><span className="text-slate-900 dark:text-white font-bold">Select</span> a project to open it in the workflow builder</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="shrink-0 w-5 h-5 rounded bg-green-100 dark:bg-[#15FF00]/10 flex items-center justify-center text-green-600 dark:text-[#15FF00] text-xs font-bold mt-0.5">2</span>
            <span><span className="text-slate-900 dark:text-white font-bold">Delete</span> projects you no longer need</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="shrink-0 w-5 h-5 rounded bg-green-100 dark:bg-[#15FF00]/10 flex items-center justify-center text-green-600 dark:text-[#15FF00] text-xs font-bold mt-0.5">3</span>
            <span><span className="text-slate-900 dark:text-white font-bold">Quick-access</span> projects from the sidebar navigation without returning to the home screen</span>
          </li>
        </ul>
      </section>

      <section className="space-y-6 pt-8 border-t border-slate-100 dark:border-white/5">
        <h2 className="text-2xl font-bold border-l-4 border-green-500 dark:border-[#15FF00] pl-4">Deleting Projects</h2>
        <p className="text-slate-500 dark:text-neutral-400">
          Select one or more projects from the project overview and delete them. This removes all workflows, node configurations, and deployment history associated with the project.
        </p>
        <div className="bg-red-50 dark:bg-red-900/10 p-4 border-l-2 border-red-500/50 text-sm text-slate-500 dark:text-neutral-400">
          <strong className="text-red-600 dark:text-red-400">Warning:</strong> Deleting a project is permanent. Any active deployments tied to that project will be stopped.
        </div>
      </section>
    </div>
  );
}
