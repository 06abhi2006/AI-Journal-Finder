import React, { useState } from 'react';
import { Settings, Save, ShieldCheck, Mail, Cpu, Database, Check } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [openalexEmail, setOpenalexEmail] = useState('researcher@university.edu');
  const [crossrefMailto, setCrossrefMailto] = useState('researcher@university.edu');
  const [llmProvider, setLlmProvider] = useState('mock');
  const [embeddingModel, setEmbeddingModel] = useState('all-MiniLM-L6-v2');
  const [maxApiCalls, setMaxApiCalls] = useState(35);
  const [cacheTtlDays, setCacheTtlDays] = useState(7);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16 text-slate-200">
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-2 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/30">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">System & Provider Configuration</h2>
            <p className="text-xs text-slate-400">Configure polite pool access, AI model adapters, and runtime limits</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Scholarly API Polite Pool */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 shadow-lg">
          <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
            <Mail className="w-4 h-4 text-emerald-400" />
            <span>Scholarly Polite Pool Credentials</span>
          </div>
          <p className="text-xs text-slate-400">
            OpenAlex and Crossref provide dedicated high-speed &ldquo;polite pools&rdquo; when your email address is included in request headers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">OpenAlex Polite Email</label>
              <input
                type="email"
                value={openalexEmail}
                onChange={e => setOpenalexEmail(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-hidden focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Crossref Polite Mailto</label>
              <input
                type="email"
                value={crossrefMailto}
                onChange={e => setCrossrefMailto(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-hidden focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* AI Model Adapters */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 shadow-lg">
          <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
            <Cpu className="w-4 h-4 text-purple-400" />
            <span>AI Model & Embeddings Provider</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">LLM Planning Adapter</label>
              <select
                value={llmProvider}
                onChange={e => setLlmProvider(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-hidden focus:border-blue-500"
              >
                <option value="mock">Offline Heuristic NLP (Zero API Cost)</option>
                <option value="gemini">Google Gemini (Gemini 1.5 Flash)</option>
                <option value="openai">OpenAI (GPT-4o-mini)</option>
                <option value="anthropic">Anthropic (Claude 3.5 Sonnet)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Semantic Similarity Engine</label>
              <select
                value={embeddingModel}
                onChange={e => setEmbeddingModel(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-hidden focus:border-blue-500"
              >
                <option value="all-MiniLM-L6-v2">SentenceTransformers (all-MiniLM-L6-v2)</option>
                <option value="tfidf">Scikit-Learn TF-IDF Cosine Vectorizer</option>
                <option value="pure_python">Pure Python Jaccard & Cosine Vectorizer</option>
              </select>
            </div>
          </div>
        </div>

        {/* Storage and Budgets */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 shadow-lg">
          <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
            <Database className="w-4 h-4 text-blue-400" />
            <span>Storage & Runtime Budgets</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Max API Calls Per Search</label>
              <input
                type="number"
                min="10"
                max="100"
                value={maxApiCalls}
                onChange={e => setMaxApiCalls(Number(e.target.value))}
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-hidden focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Local Response Cache Expiry (Days)</label>
              <input
                type="number"
                min="1"
                max="30"
                value={cacheTtlDays}
                onChange={e => setCacheTtlDays(Number(e.target.value))}
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-hidden focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
          >
            {saved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
            <span>{saved ? 'Configuration Saved' : 'Save Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
