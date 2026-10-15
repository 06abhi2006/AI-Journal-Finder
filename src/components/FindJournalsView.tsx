import React, { useState, useRef } from 'react';
import {
  Search,
  Upload,
  FileText,
  DollarSign,
  Shield,
  Sliders,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  AlertCircle,
  Filter,
  CheckSquare,
  Square
} from 'lucide-react';
import {
  CanonicalJournal,
  OpenAccessPreference,
  ResearchInput,
  AgentExecutionState
} from '../types';
import { JournalCard } from './JournalCard';

interface FindJournalsViewProps {
  input: ResearchInput;
  setInput: React.Dispatch<React.SetStateAction<ResearchInput>>;
  onStartSearch: () => void;
  isSearching: boolean;
  searchState: AgentExecutionState | null;
  results: CanonicalJournal[];
}

export const FindJournalsView: React.FC<FindJournalsViewProps> = ({
  input,
  setInput,
  onStartSearch,
  isSearching,
  searchState,
  results
}) => {
  const [activeSort, setActiveSort] = useState<'relevance' | 'suitability' | 'apc' | 'completeness'>('relevance');
  const [filterOA, setFilterOA] = useState<string>('ALL');
  const [minRelevanceFilter, setMinRelevanceFilter] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 25 * 1024 * 1024) {
      alert('File size exceeds maximum 25MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      // Infer title and abstract from manuscript text
      const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      const inferredTitle = lines[0] || file.name.replace(/\.[^/.]+$/, '');
      const inferredAbstract = lines.slice(1, 10).join(' ') || 'Extracted manuscript content from uploaded research document.';

      setInput(prev => ({
        ...prev,
        title: prev.title.length > 10 ? prev.title : inferredTitle,
        abstract: prev.abstract.length > 30 ? prev.abstract : inferredAbstract.slice(0, 1000),
        fileName: file.name,
        fileSize: `${(file.size / 1024).toFixed(1)} KB`,
        fullText: text.slice(0, 5000)
      }));
    };
    reader.readAsText(file);
  };

  // Filter & Sort Results
  const filteredResults = results
    .filter(j => {
      if (filterOA !== 'ALL' && j.openAccessStatus !== filterOA) return false;
      if (j.researchRelevanceScore < minRelevanceFilter) return false;
      return true;
    })
    .sort((a, b) => {
      if (activeSort === 'relevance') return b.researchRelevanceScore - a.researchRelevanceScore;
      if (activeSort === 'suitability') return b.publicationSuitabilityScore - a.publicationSuitabilityScore;
      if (activeSort === 'completeness') return b.evidenceCompletenessScore - a.evidenceCompletenessScore;
      if (activeSort === 'apc') return (a.apcAmount || 0) - (b.apcAmount || 0);
      return 0;
    });

  const toggleIndexing = (index: string) => {
    setInput(prev => {
      const exists = prev.requestedIndexing.includes(index);
      return {
        ...prev,
        requestedIndexing: exists
          ? prev.requestedIndexing.filter(i => i !== index)
          : [...prev.requestedIndexing, index]
      };
    });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Search Submission Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Manuscript Details</h2>
            <p className="text-xs text-slate-400">Provide manuscript metadata or upload your research paper for text analysis</p>
          </div>
          {/* PDF Upload Button */}
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".pdf,.txt,.md"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl transition flex items-center gap-2 cursor-pointer"
            >
              <Upload className="w-4 h-4 text-blue-400" />
              <span>{input.fileName ? `Uploaded: ${input.fileName}` : 'Upload PDF / Text Manuscript'}</span>
            </button>
          </div>
        </div>

        {input.fileName && (
          <div className="p-3 bg-blue-950/30 border border-blue-500/20 rounded-xl flex items-center justify-between text-xs text-blue-300">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Manuscript file <strong>{input.fileName}</strong> ({input.fileSize}) loaded.</span>
            </div>
            <button
              onClick={() => setInput(prev => ({ ...prev, fileName: undefined, fileSize: undefined, fullText: undefined }))}
              className="text-slate-400 hover:text-white"
            >
              Clear
            </button>
          </div>
        )}

        {/* Text Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Research Manuscript Title <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={input.title}
              onChange={e => setInput(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g. Deep Transfer Learning and Vision Transformers for Automated Multi-Organ CT Segmentation"
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Abstract <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={4}
              value={input.abstract}
              onChange={e => setInput(prev => ({ ...prev, abstract: e.target.value }))}
              placeholder="Provide the complete research abstract including problem statement, methodology, evaluation, and benchmark results..."
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500 transition leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Research Domain
              </label>
              <input
                type="text"
                value={input.domain}
                onChange={e => setInput(prev => ({ ...prev, domain: e.target.value }))}
                placeholder="e.g. Computer Science, Artificial Intelligence"
                className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Keywords
              </label>
              <input
                type="text"
                value={input.keywords}
                onChange={e => setInput(prev => ({ ...prev, keywords: e.target.value }))}
                placeholder="e.g. deep learning, computer vision, transformers"
                className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Methodology
              </label>
              <input
                type="text"
                value={input.methodology}
                onChange={e => setInput(prev => ({ ...prev, methodology: e.target.value }))}
                placeholder="e.g. Empirical benchmark, Randomized trial"
                className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500 transition"
              />
            </div>
          </div>
        </div>

        {/* Publishing Preferences & Constraints */}
        <div className="p-5 bg-slate-950/60 border border-slate-800/80 rounded-2xl space-y-4">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-400" />
            <span>Publishing Preferences & Constraints</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Open Access Model */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Open Access Model Preference
              </label>
              <select
                value={input.preferredAccess}
                onChange={e => setInput(prev => ({ ...prev, preferredAccess: e.target.value as OpenAccessPreference }))}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-hidden focus:border-blue-500"
              >
                <option value="ANY">Any Model (Gold, Hybrid, Subscription)</option>
                <option value="GOLD_OA">Gold Open Access (Author/Funded OA)</option>
                <option value="DIAMOND_NO_FEE">Diamond OA Only ($0 Author Fee)</option>
                <option value="HYBRID_OR_CLOSED">Subscription / Free to Publish</option>
              </select>
            </div>

            {/* Max APC Budget */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Maximum APC Budget:</span>
                <span className="font-bold text-emerald-400">${input.maxApcBudget}</span>
              </label>
              <input
                type="range"
                min="0"
                max="6000"
                step="250"
                value={input.maxApcBudget}
                onChange={e => setInput(prev => ({ ...prev, maxApcBudget: Number(e.target.value) }))}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>$0 (Free only)</span>
                <span>$3,000</span>
                <span>$6,000+</span>
              </div>
            </div>

            {/* Max Loop Iterations */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Max Agent Iterations:</span>
                <span className="font-bold text-purple-400">{input.maxIterations} Loops</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={input.maxIterations}
                onChange={e => setInput(prev => ({ ...prev, maxIterations: Number(e.target.value) }))}
                className="w-full accent-purple-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>1 (Fast)</span>
                <span>5 (Standard)</span>
                <span>10 (Deep)</span>
              </div>
            </div>
          </div>

          {/* Requested Indexing Checks */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">
              Requested Indexing Verification Checks:
            </label>
            <div className="flex flex-wrap gap-3 text-xs">
              {['DOAJ', 'Scopus', 'Web of Science', 'PubMed'].map(index => {
                const isSelected = input.requestedIndexing.includes(index);
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => toggleIndexing(index)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600/20 border-blue-500/40 text-blue-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {isSelected ? <CheckSquare className="w-3.5 h-3.5 text-blue-400" /> : <Square className="w-3.5 h-3.5" />}
                    <span>{index}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Searches OpenAlex, Crossref, and DOAJ with zero fabricated impact metrics.
          </div>
          <button
            onClick={onStartSearch}
            disabled={isSearching}
            className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
          >
            {isSearching ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Autonomous Agent Running...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Discover & Verify Journals</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Live Agent Execution Progress Bar */}
      {isSearching && searchState && (
        <div className="p-6 bg-slate-900 border border-blue-500/30 rounded-2xl space-y-4 shadow-xl animate-in fade-in">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-blue-500/20 text-blue-400 rounded-lg animate-pulse">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <span className="text-sm font-bold text-white">Active Step: {searchState.currentStep}</span>
                <span className="text-xs text-slate-400 ml-2">Iteration {searchState.currentIteration} of {searchState.maxIterations}</span>
              </div>
            </div>
            <div className="text-xs font-mono text-blue-400">
              API Calls: {searchState.apiCallCount} / {searchState.maxApiCalls} | Elapsed: {searchState.elapsedTimeSec}s
            </div>
          </div>

          {searchState.logs[0] && (
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
              <span className="text-blue-400">[{searchState.logs[0].timestamp}]</span> {searchState.logs[0].message}
            </div>
          )}
        </div>
      )}

      {/* Results Section */}
      {results.length > 0 && (
        <div className="space-y-6">
          {/* Results Bar and Filters */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white">
                Ranked Journal Candidates ({filteredResults.length} of {results.length})
              </h3>
              <p className="text-xs text-slate-400">
                Sorted by {activeSort.toUpperCase()} • Grounded against verified scholarly repositories
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Sort:
              </span>
              {(['relevance', 'suitability', 'completeness', 'apc'] as const).map(sortKey => (
                <button
                  key={sortKey}
                  onClick={() => setActiveSort(sortKey)}
                  className={`px-3 py-1.5 rounded-lg border capitalize transition cursor-pointer ${
                    activeSort === sortKey
                      ? 'bg-blue-600/20 border-blue-500/40 text-blue-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {sortKey}
                </button>
              ))}
            </div>
          </div>

          {/* Cards List */}
          <div className="space-y-4">
            {filteredResults.map((journal, index) => (
              <JournalCard key={journal.id} journal={journal} rank={index + 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
