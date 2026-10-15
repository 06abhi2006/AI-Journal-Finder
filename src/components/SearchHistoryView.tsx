import React from 'react';
import { History, Trash2, ArrowRight, BookOpen, Clock } from 'lucide-react';
import { SearchSessionRecord } from '../types';

interface SearchHistoryViewProps {
  sessions: SearchSessionRecord[];
  onRestoreSession: (session: SearchSessionRecord) => void;
  onDeleteSession: (id: string) => void;
  onClearAll: () => void;
}

export const SearchHistoryView: React.FC<SearchHistoryViewProps> = ({
  sessions,
  onRestoreSession,
  onDeleteSession,
  onClearAll
}) => {
  if (sessions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
          <History className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-white">No Previous Search Sessions</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Completed research discovery runs are stored locally for reproducible citation and comparison.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 text-slate-200">
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-between shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Search History & Reproducibility</h2>
          <p className="text-xs text-slate-400">
            Stored in local SQLite database (<code className="text-blue-400">data/journal_finder.db</code>)
          </p>
        </div>
        <button
          onClick={onClearAll}
          className="px-3.5 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear All History</span>
        </button>
      </div>

      <div className="space-y-3">
        {sessions.map(session => (
          <div
            key={session.id}
            className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-700 transition"
          >
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-3 h-3" />
                <span>{session.timestamp}</span>
                <span>•</span>
                <span className="text-blue-400 font-semibold">{session.domain}</span>
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">{session.title}</h3>
              <p className="text-xs text-slate-400">
                Top Recommendation: <strong className="text-slate-200">{session.topJournal}</strong> ({session.candidateCount} candidates found)
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onRestoreSession(session)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>Load Results</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onDeleteSession(session.id)}
                className="p-2 text-slate-400 hover:text-rose-400 transition"
                title="Delete session"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
