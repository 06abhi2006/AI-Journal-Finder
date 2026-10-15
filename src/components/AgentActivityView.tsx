import React, { useState } from 'react';
import {
  Activity,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Info,
  Clock,
  Database,
  ArrowRight,
  Filter,
  Search,
  Zap
} from 'lucide-react';
import { AgentExecutionState, AgentStepName } from '../types';

interface AgentActivityViewProps {
  state: AgentExecutionState | null;
}

const AGENT_WORKFLOW_STEPS: { id: AgentStepName; label: string; desc: string }[] = [
  { id: 'VALIDATE_INPUT', label: 'Validate Input', desc: 'Verify manuscript title, abstract, and constraints' },
  { id: 'ANALYZE_RESEARCH', label: 'Analyze Research', desc: 'Decompose core concepts, domain, and methodology' },
  { id: 'CREATE_SEARCH_PLAN', label: 'Create Search Plan', desc: 'Formulate query expansion across registries' },
  { id: 'SEARCH_SCHOLARLY_SOURCES', label: 'Search Sources', desc: 'Query OpenAlex, Crossref, and DOAJ' },
  { id: 'NORMALIZE_AND_DEDUPLICATE', label: 'Deduplicate', desc: 'Canonical ISSN normalization' },
  { id: 'EVALUATE_CANDIDATES', label: 'Evaluate Candidates', desc: 'Assess topic and methodology alignment' },
  { id: 'CHECK_EVIDENCE_GAPS', label: 'Check Gaps', desc: 'Inspect missing metadata or verification' },
  { id: 'CREATE_FOLLOW_UP_QUERIES', label: 'Targeted Gaps', desc: 'Adaptive loop for missing facts' },
  { id: 'VERIFY_JOURNALS', label: 'Verify Registries', desc: 'Cross-check official ISSN and DOAJ seals' },
  { id: 'RANK_AND_EXPLAIN', label: 'Rank & Explain', desc: 'Synthesize decomposed scores and rationales' },
  { id: 'GENERATE_EVIDENCE_BACKED_REPORT', label: 'Generate Report', desc: 'Compile reproducible audit dossier' },
  { id: 'SAVE_RESULTS_AND_END', label: 'Complete & End', desc: 'Persist session to local SQLite database' }
];

export const AgentActivityView: React.FC<AgentActivityViewProps> = ({ state }) => {
  const [logFilter, setLogFilter] = useState<'ALL' | 'info' | 'success' | 'warning' | 'error'>('ALL');

  if (!state || state.logs.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
          <Activity className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-white">No Agent Activity Logged Yet</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Start a manuscript discovery search from the &quot;Find Journals&quot; tab to inspect real-time agent state loops, queries, and audit logs.
        </p>
      </div>
    );
  }

  const filteredLogs = state.logs.filter(log => {
    if (logFilter === 'ALL') return true;
    return log.type === logFilter;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Top Status Header */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-tight">Agent Execution Audit</h2>
              <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                state.isRunning ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}>
                {state.isRunning ? 'RUNNING' : 'COMPLETED'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Session ID: <code className="text-blue-400 font-mono">{state.sessionId}</code> • Stop Reason: {state.stopReason || 'In progress'}
            </p>
          </div>
          <div className="text-xs font-mono text-slate-300">
            Elapsed Time: <strong>{state.elapsedTimeSec}s</strong>
          </div>
        </div>

        {/* Vital Gauges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Iteration</span>
            <div className="text-lg font-bold text-purple-400">{state.currentIteration} / {state.maxIterations}</div>
            <span className="text-[10px] text-slate-400">Autonomous Loops</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">API Requests</span>
            <div className="text-lg font-bold text-blue-400">{state.apiCallCount} / {state.maxApiCalls}</div>
            <span className="text-[10px] text-slate-400">Scholarly Queries</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Candidates</span>
            <div className="text-lg font-bold text-emerald-400">{state.candidatesFound}</div>
            <span className="text-[10px] text-slate-400">Unique Venues</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Deduplication</span>
            <div className="text-lg font-bold text-amber-400">+{state.duplicatesRemoved}</div>
            <span className="text-[10px] text-slate-400">Duplicates Filtered</span>
          </div>
        </div>
      </div>

      {/* Visual State Flowchart */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-purple-400" />
          <span>LangGraph State Machine Flow</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {AGENT_WORKFLOW_STEPS.map((step, idx) => {
            const isCurrent = state.currentStep === step.id;
            return (
              <div
                key={step.id}
                className={`p-3 rounded-xl border text-xs transition ${
                  isCurrent
                    ? 'bg-blue-600/20 border-blue-500 text-blue-300 ring-2 ring-blue-500/30'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-slate-400">#{idx + 1}</span>
                  {isCurrent && <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />}
                </div>
                <div className="font-bold text-white truncate">{step.label}</div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">{step.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Remaining Evidence Gaps */}
      {state.evidenceGaps.length > 0 && (
        <div className="p-6 bg-amber-950/20 border border-amber-500/30 rounded-3xl space-y-3">
          <div className="flex items-center gap-2 text-amber-400 text-sm font-bold">
            <AlertTriangle className="w-4 h-4" />
            <span>Targeted Evidence Gaps ({state.evidenceGaps.length})</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-amber-200/90">
            {state.evidenceGaps.map((gap, i) => (
              <div key={i} className="p-2.5 bg-slate-900/80 border border-amber-500/20 rounded-lg">
                • {gap}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Executed Queries Inspector */}
      {state.completedQueries.length > 0 && (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Search className="w-4 h-4 text-blue-400" />
            <span>Executed Scholarly Queries ({state.completedQueries.length})</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                  <th className="py-2.5 px-3">Query</th>
                  <th className="py-2.5 px-3">Target Registry</th>
                  <th className="py-2.5 px-3">Rationale</th>
                  <th className="py-2.5 px-3">Latency</th>
                  <th className="py-2.5 px-3">Results</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {state.completedQueries.map(q => (
                  <tr key={q.id} className="hover:bg-slate-950/40">
                    <td className="py-2.5 px-3 font-semibold text-white">{q.query}</td>
                    <td className="py-2.5 px-3 uppercase text-blue-400">{q.targetSource}</td>
                    <td className="py-2.5 px-3 text-slate-400 font-sans">{q.rationale}</td>
                    <td className="py-2.5 px-3 text-slate-400">{q.executionTimeMs}ms</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">{q.resultsCount} works</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Live Activity Stream */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Detailed Event Stream ({filteredLogs.length})</span>
          </h3>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            {(['ALL', 'info', 'success', 'warning', 'error'] as const).map(f => (
              <button
                key={f}
                onClick={() => setLogFilter(f)}
                className={`px-2.5 py-1 rounded-md border text-[11px] capitalize transition cursor-pointer ${
                  logFilter === f
                    ? 'bg-blue-600/20 border-blue-500/40 text-blue-300 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
          {filteredLogs.map(log => {
            const badgeClass =
              log.type === 'success'
                ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                : log.type === 'warning'
                ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
                : log.type === 'error'
                ? 'text-rose-400 bg-rose-500/10 border-rose-500/30'
                : 'text-blue-400 bg-blue-500/10 border-blue-500/30';

            return (
              <div
                key={log.id}
                className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl flex items-start gap-3 text-xs font-mono"
              >
                <span className="text-slate-400 shrink-0">[{log.timestamp}]</span>
                <span className={`px-2 py-0.5 rounded text-[10px] border shrink-0 uppercase font-semibold ${badgeClass}`}>
                  {log.step}
                </span>
                <span className="text-slate-200 flex-1 font-sans">{log.message}</span>
                <span className="text-[10px] text-slate-400 shrink-0">Iter {log.iteration}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
