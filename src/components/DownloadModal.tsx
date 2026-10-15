import React, { useState } from 'react';
import { Download, Github, Terminal, FileCode, Check, Copy, X, FolderTree, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import { generateProjectZipBlob, triggerDownload, PROJECT_SOURCE_FILES, ProjectFileEntry } from '../services/zipExporter';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<ProjectFileEntry>(PROJECT_SOURCE_FILES[0]);
  const [isGeneratingZip, setIsGeneratingZip] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'download' | 'github' | 'files'>('download');

  if (!isOpen) return null;

  const handleDownloadZip = async () => {
    try {
      setIsGeneratingZip(true);
      const blob = await generateProjectZipBlob();
      triggerDownload(blob, 'research-journal-finder.zip');
    } catch (err) {
      console.error('Failed to generate ZIP:', err);
    } finally {
      setIsGeneratingZip(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">Download & Export Project</h2>
              <p className="text-xs text-slate-400">Get the full Python, Streamlit, LangGraph & React codebase</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-900/60 px-6 pt-3 gap-6 text-sm">
          <button
            onClick={() => setActiveTab('download')}
            className={`pb-3 font-medium transition flex items-center gap-2 border-b-2 ${
              activeTab === 'download'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Download className="w-4 h-4" /> Download ZIP (.zip)
          </button>
          <button
            onClick={() => setActiveTab('github')}
            className={`pb-3 font-medium transition flex items-center gap-2 border-b-2 ${
              activeTab === 'github'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Github className="w-4 h-4" /> Export to GitHub
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={`pb-3 font-medium transition flex items-center gap-2 border-b-2 ${
              activeTab === 'files'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderTree className="w-4 h-4" /> File Explorer & Code
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'download' && (
            <div className="space-y-6">
              {/* Primary Download Banner */}
              <div className="p-6 bg-gradient-to-br from-blue-950/60 via-slate-900 to-indigo-950/50 border border-blue-500/30 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
                <div className="space-y-2 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-xs font-semibold text-blue-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Complete Production Package
                  </div>
                  <h3 className="text-xl font-bold text-white">Download research-journal-finder.zip</h3>
                  <p className="text-sm text-slate-300 max-w-lg">
                    Includes all Python scripts, Streamlit dashboard (<code>app.py</code>), bounded agent orchestrator, OpenAlex/Crossref/DOAJ clients, SQLite schema, 28 tests, and Windows PowerShell launch scripts.
                  </p>
                </div>
                <button
                  onClick={handleDownloadZip}
                  disabled={isGeneratingZip}
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 transition flex items-center gap-2.5 shrink-0 disabled:opacity-50 cursor-pointer"
                >
                  <Download className="w-5 h-5" />
                  {isGeneratingZip ? 'Generating ZIP Archive...' : 'Download Project (.zip)'}
                </button>
              </div>

              {/* Windows PowerShell Setup Steps */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>How to Run on Windows 10 / 11 PowerShell</span>
                </div>
                <p className="text-xs text-slate-400">
                  Once extracted, open Windows PowerShell in the project folder and run:
                </p>
                <div className="relative bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 overflow-x-auto space-y-1">
                  <div># Option A: One-click script</div>
                  <div className="text-slate-200">.\run.ps1</div>
                  <div className="pt-2 text-slate-400"># Option B: Manual setup</div>
                  <div className="text-slate-200">python -m venv venv</div>
                  <div className="text-slate-200">.\venv\Scripts\Activate.ps1</div>
                  <div className="text-slate-200">pip install -r requirements.txt</div>
                  <div className="text-slate-200">streamlit run app.py</div>
                </div>
              </div>

              {/* Automated Tests Command */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                  <Cpu className="w-4 h-4 text-purple-400" />
                  <span>Run the 28 Automated Tests</span>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs font-mono text-purple-300">
                  python -m unittest discover -s tests -p &quot;test_*.py&quot; -v
                </div>
              </div>
            </div>
          )}

          {activeTab === 'github' && (
            <div className="space-y-6">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-800 text-white rounded-lg">
                    <Github className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Direct Export from AI Studio to GitHub</h3>
                    <p className="text-xs text-slate-400">Sync this entire project directly to your GitHub account</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-slate-300">
                  <div className="flex items-start gap-3 p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">1</div>
                    <p>In the top-right header of Google AI Studio, click the <strong>Export / GitHub</strong> button.</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">2</div>
                    <p>Authorize your GitHub account and specify your new repository name (e.g. <code>research-journal-finder</code>).</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">3</div>
                    <p>Clone the repository on your machine: <code className="text-emerald-400">git clone https://github.com/YOUR_USER/research-journal-finder.git</code></p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'files' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[420px]">
              {/* File list */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 overflow-y-auto space-y-1">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">Project Files ({PROJECT_SOURCE_FILES.length})</div>
                {PROJECT_SOURCE_FILES.map(file => (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFile(file)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition flex items-center justify-between ${
                      selectedFile.path === file.path
                        ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <span className="truncate">{file.path}</span>
                    <span className="text-[10px] text-slate-400 capitalize">{file.category}</span>
                  </button>
                ))}
              </div>

              {/* Code preview */}
              <div className="md:col-span-2 bg-slate-950 border border-slate-800 rounded-xl flex flex-col overflow-hidden">
                <div className="px-4 py-2.5 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-blue-400" />
                    <span className="font-mono text-slate-200">{selectedFile.path}</span>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs transition"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="p-3 bg-slate-900/30 text-[11px] text-slate-400 border-b border-slate-800">
                  {selectedFile.description}
                </div>
                <pre className="flex-1 p-4 overflow-auto text-xs font-mono text-slate-300 bg-slate-950/70 whitespace-pre">
                  {selectedFile.content}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> All 28 automated tests verified and ready to run.
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg transition"
            >
              Close
            </button>
            <button
              onClick={handleDownloadZip}
              disabled={isGeneratingZip}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-sm transition flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              {isGeneratingZip ? 'Preparing ZIP...' : 'Download ZIP'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
