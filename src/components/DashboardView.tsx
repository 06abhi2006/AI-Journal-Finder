import React from 'react';
import {
  Sparkles,
  Search,
  Database,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  GitBranch,
  Layers,
  Scale
} from 'lucide-react';
import { ResearchInput } from '../types';

interface DashboardViewProps {
  onSelectSample: (sample: Partial<ResearchInput>) => void;
  onNavigateToSearch: () => void;
  totalCandidates: number;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onSelectSample,
  onNavigateToSearch,
  totalCandidates
}) => {
  const samplePapers: { title: string; domain: string; abstract: string; keywords: string; methodology: string }[] = [
    {
      title: 'Deep Transfer Learning and Vision Transformers for Automated Multi-Organ CT Segmentation',
      domain: 'Computer Science / Artificial Intelligence / Health Informatics',
      abstract:
        'We propose a novel hybrid vision transformer (ViT) and residual U-Net architecture for multi-organ CT image segmentation. Evaluated on public benchmark clinical datasets demonstrating 94.2% mean Dice similarity coefficient with reduced latency.',
      keywords: 'deep learning, computer vision, medical image segmentation, vision transformer, CT scan',
      methodology: 'Empirical benchmark comparison against state-of-the-art baselines on public clinical repositories'
    },
    {
      title: 'Variational Quantum Eigensolver Acceleration for Macromolecular Ground State Calculations',
      domain: 'Physical Sciences / Quantum Computing / Computational Chemistry',
      abstract:
        'We investigate error-mitigated variational quantum eigensolvers (VQE) tailored to simulate ground-state energies of transition metal catalytic complexes on noisy intermediate-scale quantum (NISQ) processors.',
      keywords: 'quantum computing, VQE, quantum chemistry, NISQ algorithms, molecular simulation',
      methodology: 'Hardware-level quantum circuit simulation and noise mitigation error profiling'
    },
    {
      title: 'Techno-Economic and Life-Cycle Assessment of Green Hydrogen Integration into Industrial Grids',
      domain: 'Energy & Environmental Science / Sustainable Engineering',
      abstract:
        'A comprehensive life-cycle greenhouse gas emission and levelized cost of hydrogen (LCOH) analysis for off-grid polymer electrolyte membrane (PEM) electrolysis powered by offshore wind and solar photovoltaic hybrid arrays.',
      keywords: 'renewable energy, green hydrogen, PEM electrolysis, life cycle assessment, decarbonization',
      methodology: 'Techno-economic modeling, sensitivity analysis, and standardized ISO 14040 LCA frameworks'
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950/80 via-slate-900 to-indigo-950/80 border border-slate-800 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-xs font-semibold text-blue-300">
            <Sparkles className="w-3.5 h-3.5" /> Autonomous Scholarly Discovery Engine
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Evidence-Grounded Journal Recommendations for Researchers
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Eliminate submission rejections and opaque journal metrics. Analyze your manuscript, query open scholarly registries (OpenAlex, Crossref, DOAJ), verify indexing claims, and receive transparent recommendations with zero fabricated data.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={onNavigateToSearch}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition flex items-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Start Manuscript Discovery</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Registry Queries</span>
            <Database className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">OpenAlex & Crossref</div>
          <p className="text-xs text-slate-400">Polite pool live scholarly venue queries and publication matching</p>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Agent Workflow</span>
            <GitBranch className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">Bounded Loop</div>
          <p className="text-xs text-slate-400">15-step deterministic state machine with gap-filling query loops</p>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Independent Scoring</span>
            <Scale className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">3 Distinct Metrics</div>
          <p className="text-xs text-slate-400">Decomposed Relevance, Suitability, and Completeness scores</p>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Factual Verification</span>
            <ShieldCheck className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white">5 Explicit States</div>
          <p className="text-xs text-slate-400">Verified against DOAJ & ISSN Portal; flags Scopus/WoS manual checks</p>
        </div>
      </div>

      {/* Autonomous Agent Workflow Diagram */}
      <div className="p-6 sm:p-8 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Autonomous Agent Loop Architecture</h2>
            <p className="text-xs text-slate-400">LangGraph-compatible state machine orchestrator with adaptive query planning</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 text-xs font-mono">
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-center space-y-1">
            <span className="text-slate-500 block text-[10px]">STEP 1</span>
            <strong className="text-blue-400 block">VALIDATE_INPUT</strong>
            <span className="text-slate-400 text-[10px]">Title & Abstract</span>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-center space-y-1">
            <span className="text-slate-500 block text-[10px]">STEP 2</span>
            <strong className="text-blue-400 block">ANALYZE_PROFILE</strong>
            <span className="text-slate-400 text-[10px]">Concepts & Domain</span>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-center space-y-1">
            <span className="text-slate-500 block text-[10px]">STEP 3</span>
            <strong className="text-blue-400 block">SEARCH_SOURCES</strong>
            <span className="text-slate-400 text-[10px]">OpenAlex & Crossref</span>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-center space-y-1">
            <span className="text-slate-500 block text-[10px]">STEP 4</span>
            <strong className="text-blue-400 block">DEDUPLICATE</strong>
            <span className="text-slate-400 text-[10px]">Canonical ISSN</span>
          </div>
          <div className="p-3 bg-slate-950 border border-amber-500/30 rounded-xl text-center space-y-1 bg-amber-500/5">
            <span className="text-amber-400 block text-[10px]">AGENT LOOP</span>
            <strong className="text-amber-300 block">FILL_GAPS</strong>
            <span className="text-slate-400 text-[10px]">Iterative Research</span>
          </div>
          <div className="p-3 bg-slate-950 border border-emerald-500/30 rounded-xl text-center space-y-1 bg-emerald-500/5">
            <span className="text-emerald-400 block text-[10px]">TERMINATE</span>
            <strong className="text-emerald-300 block">VERIFY_&_RANK</strong>
            <span className="text-slate-400 text-[10px]">Grounded Report</span>
          </div>
        </div>
      </div>

      {/* Quick Start Benchmark Manuscripts */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Try Benchmark Manuscript Samples</h2>
            <p className="text-xs text-slate-400">Click any pre-configured research paper to automatically test the discovery engine</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {samplePapers.map((sample, idx) => (
            <div
              key={idx}
              className="p-5 bg-slate-900 border border-slate-800 rounded-2xl hover:border-blue-500/40 transition flex flex-col justify-between space-y-4 text-slate-300 group"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-semibold tracking-wider text-blue-400 uppercase bg-blue-500/10 px-2 py-0.5 rounded">
                  {sample.domain.split('/')[0]}
                </span>
                <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition line-clamp-2">
                  {sample.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {sample.abstract}
                </p>
              </div>

              <button
                onClick={() => {
                  onSelectSample(sample);
                  onNavigateToSearch();
                }}
                className="w-full py-2 px-3 bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Load This Manuscript</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
