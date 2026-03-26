export default function HomeScreenPage() {
  return (
    <div className="space-y-12">
      <div>
        <div className="inline-block px-2 py-1 bg-green-100 dark:bg-[#15FF00]/10 border border-green-400 dark:border-[#15FF00]/30 rounded mb-4">
          <span className="text-green-600 dark:text-[#15FF00] text-xs font-mono font-bold uppercase tracking-wider">Getting Started</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">Home Screen</h1>
        <p className="text-xl text-slate-500 dark:text-neutral-400 leading-relaxed max-w-2xl">
          The home screen is the first thing you see when Lamina starts on <code className="bg-slate-200 dark:bg-white/10 px-1 rounded text-slate-900 dark:text-white">localhost:3000</code>. It&apos;s your command center for managing projects and interacting with the AI assistant.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-l-4 border-green-500 dark:border-[#15FF00] pl-4">AI Assistant</h2>
        <p className="text-slate-500 dark:text-neutral-400">
          At the center of the home screen is the <span className="text-slate-900 dark:text-white font-bold">AI Chatbot</span>. You can attach a project context to it and ask it to analyze your workflows, debug issues, or answer questions about your project structure.
        </p>
        <div className="bg-slate-50 dark:bg-[#050505] border border-slate-200 dark:border-white/10 rounded-lg p-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-[#15FF00]/10 flex items-center justify-center text-green-600 dark:text-[#15FF00] text-xs font-bold">U</div>
              <div className="bg-slate-100 dark:bg-white/5 rounded-lg px-4 py-2 text-sm text-slate-700 dark:text-neutral-300 font-mono">
                Analyze the webhook node in my delivery pipeline
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-6 h-6 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-neutral-400 text-xs font-bold">L</div>
              <div className="bg-slate-100 dark:bg-white/5 rounded-lg px-4 py-2 text-sm text-slate-700 dark:text-neutral-300 font-mono">
                Your webhook node listens on /api/v2/ollama:8081. It triggers the LLM Controller with a PAYLOAD output...
              </div>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 dark:bg-neutral-900/50 p-4 border-l-2 border-yellow-500/50 text-sm text-slate-500 dark:text-neutral-400">
          <strong>Tip:</strong> The AI has full access to your project context. The more specific your question, the better the response. Try asking about individual nodes, connections, or deployment configs.
        </div>
      </section>

      <section className="space-y-6 pt-8 border-t border-slate-100 dark:border-white/5">
        <h2 className="text-2xl font-bold border-l-4 border-green-500 dark:border-[#15FF00] pl-4">Quick Actions</h2>
        <p className="text-slate-500 dark:text-neutral-400">
          Below the AI chatbot, you&apos;ll find two primary actions:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-slate-200 dark:border-white/10 rounded-lg p-5 hover:border-green-500 dark:hover:border-[#15FF00] transition-colors">
            <div className="text-sm font-bold text-slate-900 dark:text-white mb-2">Create New Project</div>
            <p className="text-xs text-slate-500 dark:text-neutral-400">
              Starts a blank project with an empty explorer. You&apos;ll be taken straight into the workflow builder.
            </p>
          </div>
          <div className="border border-slate-200 dark:border-white/10 rounded-lg p-5 hover:border-green-500 dark:hover:border-[#15FF00] transition-colors">
            <div className="text-sm font-bold text-slate-900 dark:text-white mb-2">View All Projects</div>
            <p className="text-xs text-slate-500 dark:text-neutral-400">
              Opens the project overview where you can select, open, or delete existing projects.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6 pt-8 border-t border-slate-100 dark:border-white/5">
        <h2 className="text-2xl font-bold border-l-4 border-green-500 dark:border-[#15FF00] pl-4">Recents</h2>
        <p className="text-slate-500 dark:text-neutral-400">
          The home screen also surfaces your <span className="text-slate-900 dark:text-white font-bold">recently opened projects and workflows</span> for quick access. This includes the last files you edited, recent deployments, and any starred items.
        </p>
      </section>
    </div>
  );
}
