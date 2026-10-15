import React from 'react';
import {
  GraduationCap,
  Download,
  LayoutDashboard,
  Search,
  Activity,
  GitCompare,
  ShieldCheck,
  History,
  Settings,
  Sparkles
} from 'lucide-react';

export type ActiveTabType =
  | 'dashboard'
  | 'find_journals'
  | 'activity'
  | 'comparison'
  | 'verification'
  | 'history'
  | 'settings';

interface NavbarProps {
  activeTab: ActiveTabType;
  onTabChange: (tab: ActiveTabType) => void;
  onOpenDownloadModal: () => void;
  onOpenVoiceModal: () => void;
  isAgentRunning: boolean;
  currentIteration?: number;
  maxIterations?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  onOpenDownloadModal,
  onOpenVoiceModal,
  isAgentRunning,
  currentIteration = 1,
  maxIterations = 5
}) => {
  const navItems: { id: ActiveTabType; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'find_journals', label: 'Find Journals', icon: <Search className="w-4 h-4" /> },
    { id: 'activity', label: 'Agent Activity', icon: <Activity className="w-4 h-4" /> },
    { id: 'comparison', label: 'Comparison', icon: <GitCompare className="w-4 h-4" /> },
    { id: 'verification', label: 'Verification', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'history', label: 'History', icon: <History className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl shadow-md shadow-blue-500/20 text-white">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white">Research Journal Finder</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Evidence-Grounded Scholarly Venue Discovery</p>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5">
            {isAgentRunning && (
              <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs text-amber-300 animate-pulse">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Iteration {currentIteration}/{maxIterations}</span>
              </div>
            )}

            {/* Glowing Voice Mode Button */}
            <button
              onClick={onOpenVoiceModal}
              className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 hover:from-cyan-900 hover:to-blue-900 text-cyan-200 hover:text-white text-xs font-semibold rounded-lg border border-cyan-500/40 shadow-md shadow-cyan-500/10 transition cursor-pointer"
              title="Open Voice Agent Mode (ChatGPT / Gemini Live style)"
            >
              <div className="relative flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping absolute" />
                <span className="w-2 h-2 rounded-full bg-cyan-400 relative" />
              </div>
              <span>Voice Agent</span>
            </button>

            {/* Download Project Button */}
            <button
              onClick={onOpenDownloadModal}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-md shadow-blue-600/20 transition cursor-pointer"
              title="Download full project code (ZIP) or export to GitHub"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download Project</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex space-x-1 sm:space-x-3 overflow-x-auto py-1 border-t border-slate-800/60 no-scrollbar">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition shrink-0 cursor-pointer ${
                activeTab === item.id
                  ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};
