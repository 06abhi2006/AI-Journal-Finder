import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Sparkles,
  Bot,
  Zap,
  ArrowRight,
  User,
  Radio,
  Minimize2,
  Maximize2
} from 'lucide-react';
import {
  voiceAgentService,
  VoiceAgentState,
  VoiceMessage,
  VOICE_PERSONAS,
  VoicePersona
} from '../services/voiceAgentService';
import { ResearchInput } from '../types';

interface VoiceAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerSearch: () => void;
  onApplyManuscriptPreset: (preset: Partial<ResearchInput>) => void;
  onApplyOaFilter?: (oaStatus: string) => void;
}

export const VoiceAgentModal: React.FC<VoiceAgentModalProps> = ({
  isOpen,
  onClose,
  onTriggerSearch,
  onApplyManuscriptPreset,
  onApplyOaFilter
}) => {
  const [agentState, setAgentState] = useState<VoiceAgentState>('idle');
  const [amplitude, setAmplitude] = useState<number>(0);
  const [userTranscript, setUserTranscript] = useState<string>('');
  const [isFinalTranscript, setIsFinalTranscript] = useState<boolean>(false);
  const [selectedPersona, setSelectedPersona] = useState<VoicePersona>(VOICE_PERSONAS[0]);
  const [messages, setMessages] = useState<VoiceMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'agent',
      timestamp: 'Just now',
      text: VOICE_PERSONAS[0].greeting
    }
  ]);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [customInputText, setCustomInputText] = useState<string>('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested Voice Prompts
  const suggestedPrompts = [
    'Recommend Diamond Open Access journals with $0 APC',
    'What are the publication fees for IEEE PAMI?',
    'Find journals for medical image segmentation',
    'Why do Scopus and Web of Science require manual review?'
  ];

  useEffect(() => {
    if (isOpen) {
      voiceAgentService.setCallbacks({
        onStateChange: state => setAgentState(state),
        onAmplitude: amp => setAmplitude(amp),
        onTranscript: (text, isFinal) => {
          setUserTranscript(text);
          setIsFinalTranscript(isFinal);
          if (isFinal) {
            setMessages(prev => [
              ...prev,
              {
                id: `usr-${Date.now()}`,
                sender: 'user',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                text
              }
            ]);
            setUserTranscript('');
          }
        },
        onAgentReply: reply => {
          setMessages(prev => [...prev, reply]);
        }
      });

      // Play start chime on open
      voiceAgentService.playChime('start');
    } else {
      voiceAgentService.stopListening();
      voiceAgentService.stopSpeaking();
    }

    return () => {
      voiceAgentService.disconnect();
    };
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, userTranscript]);

  if (!isOpen) return null;

  const handleToggleListening = async () => {
    if (agentState === 'listening') {
      voiceAgentService.stopListening();
    } else {
      setUserTranscript('');
      await voiceAgentService.startListening();
    }
  };

  const handleSelectPersona = (persona: VoicePersona) => {
    setSelectedPersona(persona);
    voiceAgentService.setPersona(persona.id);
    voiceAgentService.playChime('pop');
    setMessages(prev => [
      ...prev,
      {
        id: `persona-${Date.now()}`,
        sender: 'agent',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `Switched voice persona to ${persona.name} (${persona.role}). ${persona.greeting}`
      }
    ]);
    if (!isMuted) {
      voiceAgentService.speakText(persona.greeting);
    }
  };

  const handleSendCustomText = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [
      ...prev,
      {
        id: `usr-${Date.now()}`,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text
      }
    ]);
    setCustomInputText('');
    voiceAgentService.handleUserVoiceInput(text);
  };

  const handleExecuteAction = (msg: VoiceMessage) => {
    if (!msg.suggestedAction) return;

    if (msg.suggestedAction.type === 'SEARCH') {
      onTriggerSearch();
      onClose();
    } else if (msg.suggestedAction.type === 'APPLY_MANUSCRIPT' && msg.suggestedAction.payload) {
      onApplyManuscriptPreset(msg.suggestedAction.payload);
      onTriggerSearch();
      onClose();
    } else if (msg.suggestedAction.type === 'FILTER_OA' && onApplyOaFilter && msg.suggestedAction.payload) {
      onApplyOaFilter(msg.suggestedAction.payload);
      onClose();
    }
  };

  // Dynamic Scale and Glow calculation for Orb
  const orbScale = 1 + amplitude * 0.45;
  const outerRingScale = 1 + amplitude * 0.9;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div
        className={`bg-slate-950/95 border border-slate-800 rounded-3xl shadow-2xl flex flex-col text-slate-100 overflow-hidden transition-all duration-300 ${
          isMinimized
            ? 'w-full max-w-md h-[460px]'
            : 'w-full max-w-4xl h-[92vh] max-h-[850px]'
        }`}
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
                <Bot className="w-4 h-4" />
              </div>
              <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-slate-950 ${
                agentState === 'listening' ? 'bg-cyan-400 animate-ping' : agentState === 'speaking' ? 'bg-emerald-400' : 'bg-blue-400'
              }`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-tight text-white">{selectedPersona.name}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/30">
                  Voice Mode
                </span>
                <span className="text-[11px] text-slate-400 hidden sm:inline">• {selectedPersona.role}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                <span className="capitalize">{agentState === 'idle' ? 'Ready to listen' : agentState}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition"
              title={isMinimized ? 'Expand view' : 'Minimize view'}
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800/60 transition"
              title="Close Voice Mode"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Central Visualizer Area (The AI Agent Orb Core) */}
        <div className="relative flex-1 flex flex-col items-center justify-center p-6 overflow-hidden bg-radial from-blue-950/20 via-slate-950 to-slate-950">
          {/* Ambient Cosmic Background Ring */}
          <div className="absolute w-96 h-96 rounded-full bg-blue-600/5 blur-3xl pointer-events-none" />

          {/* THE HYPNOTIC AI AGENT ORB */}
          <div className="relative flex items-center justify-center my-auto">
            {/* Outer Frequency Shockwave Ring */}
            <div
              className={`absolute rounded-full border transition-all duration-100 pointer-events-none ${
                agentState === 'listening'
                  ? 'border-cyan-400/40 shadow-lg shadow-cyan-500/20'
                  : agentState === 'speaking'
                  ? 'border-emerald-400/40 shadow-lg shadow-emerald-500/20'
                  : 'border-blue-500/20'
              }`}
              style={{
                width: `${180 * outerRingScale}px`,
                height: `${180 * outerRingScale}px`
              }}
            />

            {/* Middle Chromatic Halo */}
            <div
              className={`absolute rounded-full filter blur-md transition-all duration-150 opacity-70 ${
                agentState === 'listening'
                  ? 'bg-gradient-to-tr from-cyan-500 via-sky-400 to-indigo-500 animate-pulse'
                  : agentState === 'speaking'
                  ? 'bg-gradient-to-tr from-emerald-400 via-teal-500 to-blue-500 animate-pulse'
                  : agentState === 'thinking'
                  ? 'bg-gradient-to-tr from-purple-500 via-pink-500 to-blue-500 animate-spin'
                  : 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-700'
              }`}
              style={{
                width: `${140 * orbScale}px`,
                height: `${140 * orbScale}px`
              }}
            />

            {/* Inner Fluid Orb Core */}
            <div
              className={`relative z-10 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-100 ${
                agentState === 'listening'
                  ? 'bg-gradient-to-br from-cyan-400 via-blue-600 to-indigo-900 shadow-cyan-500/50'
                  : agentState === 'speaking'
                  ? 'bg-gradient-to-br from-emerald-400 via-teal-600 to-blue-900 shadow-emerald-500/50'
                  : agentState === 'thinking'
                  ? 'bg-gradient-to-br from-purple-400 via-indigo-600 to-slate-900 shadow-purple-500/50'
                  : 'bg-gradient-to-br from-blue-500 via-indigo-700 to-slate-950 shadow-blue-600/40'
              }`}
              style={{
                width: `${110 * orbScale}px`,
                height: `${110 * orbScale}px`
              }}
            >
              {/* Internal Chromatic Flare */}
              <div className="w-12 h-12 rounded-full bg-white/20 filter blur-xs animate-ping" />
              <div className="absolute text-white/90">
                {agentState === 'listening' ? (
                  <Mic className="w-8 h-8 drop-shadow-md animate-bounce" />
                ) : agentState === 'speaking' ? (
                  <Volume2 className="w-8 h-8 drop-shadow-md animate-pulse" />
                ) : agentState === 'thinking' ? (
                  <Sparkles className="w-8 h-8 drop-shadow-md animate-spin" />
                ) : (
                  <Bot className="w-8 h-8 drop-shadow-md opacity-80" />
                )}
              </div>
            </div>
          </div>

          {/* Status Label Below Orb */}
          <div className="mt-4 text-center z-10 space-y-1">
            <span
              className={`text-xs font-mono font-bold tracking-widest uppercase ${
                agentState === 'listening'
                  ? 'text-cyan-400'
                  : agentState === 'speaking'
                  ? 'text-emerald-400'
                  : agentState === 'thinking'
                  ? 'text-purple-400'
                  : 'text-slate-400'
              }`}
            >
              {agentState === 'listening' && 'Listening to your voice...'}
              {agentState === 'thinking' && 'Analyzing scholarly reasoning...'}
              {agentState === 'speaking' && 'Speaking response...'}
              {agentState === 'idle' && 'Tap microphone to speak'}
            </span>

            {/* Live Partial Transcription Ribbon */}
            {userTranscript && (
              <p className="text-sm font-medium text-cyan-300 max-w-lg mx-auto bg-slate-900/80 px-4 py-1.5 rounded-full border border-cyan-500/30 animate-pulse">
                &ldquo;{userTranscript}&rdquo;
              </p>
            )}
          </div>
        </div>

        {/* Live Conversation Transcript History */}
        {!isMinimized && (
          <div className="h-44 border-t border-b border-slate-800/80 bg-slate-950/60 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-2.5 max-w-2xl ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-white text-[10px] font-bold ${
                    msg.sender === 'user' ? 'bg-blue-600' : 'bg-gradient-to-tr from-cyan-600 to-indigo-600'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>
                <div
                  className={`p-3 rounded-2xl space-y-1.5 ${
                    msg.sender === 'user'
                      ? 'bg-blue-600/30 border border-blue-500/30 text-blue-100 rounded-tr-none'
                      : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                  {msg.suggestedAction && (
                    <button
                      onClick={() => handleExecuteAction(msg)}
                      className="mt-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg flex items-center gap-1.5 text-[11px] shadow-sm transition cursor-pointer"
                    >
                      <Zap className="w-3 h-3 text-amber-300" />
                      <span>{msg.suggestedAction.label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Suggested Voice Prompt Chips */}
        {!isMinimized && (
          <div className="p-3 bg-slate-900/40 border-b border-slate-800/60 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
            <span className="text-[10px] uppercase font-bold text-slate-500 shrink-0">Try asking:</span>
            {suggestedPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendCustomText(prompt)}
                className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-full border border-slate-800 shrink-0 transition text-[11px] cursor-pointer"
              >
                &ldquo;{prompt}&rdquo;
              </button>
            ))}
          </div>
        )}

        {/* Bottom Control Dock */}
        <div className="p-4 sm:p-5 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Persona Switcher */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 text-[11px] mr-1">Persona:</span>
            {VOICE_PERSONAS.map(p => (
              <button
                key={p.id}
                onClick={() => handleSelectPersona(p)}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-medium transition cursor-pointer ${
                  selectedPersona.id === p.id
                    ? 'bg-blue-600/20 text-blue-300 border-blue-500/40'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>

          {/* Central Main Mic Action Button */}
          <div className="flex items-center gap-4">
            {agentState === 'speaking' && (
              <button
                onClick={() => voiceAgentService.stopSpeaking()}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 transition"
              >
                Interrupt AI
              </button>
            )}

            <button
              onClick={handleToggleListening}
              className={`p-4 rounded-full text-white shadow-xl transition-all duration-200 flex items-center justify-center cursor-pointer ${
                agentState === 'listening'
                  ? 'bg-rose-600 hover:bg-rose-500 ring-4 ring-rose-500/30 animate-pulse scale-105'
                  : 'bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 hover:brightness-110 shadow-blue-500/30'
              }`}
              title={agentState === 'listening' ? 'Stop listening' : 'Start voice mode'}
            >
              {agentState === 'listening' ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>
          </div>

          {/* Text Fallback Input */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={customInputText}
              onChange={e => setCustomInputText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleSendCustomText(customInputText);
              }}
              placeholder="Or type voice query..."
              className="w-full sm:w-48 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
            />
            <button
              onClick={() => handleSendCustomText(customInputText)}
              disabled={!customInputText.trim()}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold disabled:opacity-40 transition cursor-pointer"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
