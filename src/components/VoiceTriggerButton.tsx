import React from 'react';
import { Mic, Sparkles } from 'lucide-react';

interface VoiceTriggerButtonProps {
  onClick: () => void;
  isAgentRunning?: boolean;
}

export const VoiceTriggerButton: React.FC<VoiceTriggerButtonProps> = ({ onClick, isAgentRunning }) => {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={onClick}
        className="group relative flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 hover:from-blue-900 hover:to-indigo-900 text-white rounded-full border border-blue-500/40 shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-200 cursor-pointer"
        title="Start Voice Agent Mode (ChatGPT / Gemini Live style)"
      >
        {/* Animated Orb Badge */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-8 h-8 rounded-full bg-cyan-400/20 filter blur-xs animate-ping" />
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
            <Mic className="w-3.5 h-3.5 text-white" />
          </div>
        </div>

        {/* Text Label */}
        <div className="text-left hidden sm:block">
          <div className="flex items-center gap-1.5 text-xs font-bold tracking-tight text-white group-hover:text-cyan-200 transition">
            <span>Voice Mode</span>
            <Sparkles className="w-3 h-3 text-cyan-400" />
          </div>
          <p className="text-[10px] text-slate-400 group-hover:text-slate-300">Talk with AI Research Agent</p>
        </div>
      </button>
    </div>
  );
};
