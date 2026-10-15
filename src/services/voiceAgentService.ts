/**
 * Research Journal Finder AI - Voice Agent Service
 * Provides Speech Recognition (STT), Speech Synthesis (TTS), Web Audio API analysis,
 * procedural agent sound effects, and academic domain conversational reasoning.
 */

import { CanonicalJournal, ResearchInput } from '../types';
import { BENCHMARK_JOURNALS } from '../data/benchmarkJournals';

export type VoiceAgentState = 'idle' | 'listening' | 'thinking' | 'speaking';

export interface VoiceMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  suggestedAction?: {
    type: 'SEARCH' | 'FILTER_OA' | 'APPLY_MANUSCRIPT';
    label: string;
    payload?: any;
  };
}

export interface VoicePersona {
  id: string;
  name: string;
  role: string;
  voiceGender: 'female' | 'male';
  pitch: number;
  rate: number;
  greeting: string;
}

export const VOICE_PERSONAS: VoicePersona[] = [
  {
    id: 'athena',
    name: 'Athena',
    role: 'Principal Academic Publishing Advisor',
    voiceGender: 'female',
    pitch: 1.05,
    rate: 1.0,
    greeting:
      "Hello! I am Athena, your AI academic publishing advisor. You can speak to me about your manuscript, ask for journal recommendations, check publication fees, or explore indexing criteria. What paper are you working on?"
  },
  {
    id: 'marcus',
    name: 'Marcus',
    role: 'Peer Review & Rigor Specialist',
    voiceGender: 'male',
    pitch: 0.9,
    rate: 1.02,
    greeting:
      "Greetings. I'm Marcus. I focus on scope alignment, peer-review timelines, and avoiding predatory or unverified indexing claims. Tell me about your research methodology."
  },
  {
    id: 'aria',
    name: 'Aria',
    role: 'Open Access & Policy Strategist',
    voiceGender: 'female',
    pitch: 1.15,
    rate: 1.05,
    greeting:
      "Hi there! I'm Aria. I specialize in Plan S compliance, DOAJ-verified Gold Open Access, and zero-fee Diamond journals. How can I help maximize your paper's accessibility today?"
  }
];

export class VoiceAgentService {
  private static instance: VoiceAgentService;

  private recognition: any = null;
  private isRecognitionActive: boolean = false;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private micStream: MediaStream | null = null;
  private animFrameId: number | null = null;

  private state: VoiceAgentState = 'idle';
  private activePersona: VoicePersona = VOICE_PERSONAS[0];
  private selectedSpeechVoice: SpeechSynthesisVoice | null = null;
  private onStateChangeCallback: ((state: VoiceAgentState) => void) | null = null;
  private onAmplitudeCallback: ((amplitude: number) => void) | null = null;
  private onTranscriptCallback: ((transcript: string, isFinal: boolean) => void) | null = null;
  private onAgentReplyCallback: ((message: VoiceMessage) => void) | null = null;

  public static getInstance(): VoiceAgentService {
    if (!VoiceAgentService.instance) {
      VoiceAgentService.instance = new VoiceAgentService();
    }
    return VoiceAgentService.instance;
  }

  constructor() {
    this.initSpeechSynthesis();
  }

  private initSpeechSynthesis() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          this.updateSelectedVoice(voices);
        }
      };

      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }

  private updateSelectedVoice(voices: SpeechSynthesisVoice[]) {
    // Look for natural English voices (Google, Samantha, Daniel, Natural, etc.)
    const preferredNames = ['Google UK English', 'Google US English', 'Natural', 'Samantha', 'Karen', 'Daniel', 'Alex', 'en-US', 'en-GB'];
    
    let matchedVoice = voices.find(v => 
      preferredNames.some(pref => v.name.includes(pref)) && v.lang.startsWith('en')
    );

    if (!matchedVoice) {
      matchedVoice = voices.find(v => v.lang.startsWith('en')) || voices[0];
    }

    this.selectedSpeechVoice = matchedVoice || null;
  }

  public setPersona(personaId: string) {
    const found = VOICE_PERSONAS.find(p => p.id === personaId);
    if (found) {
      this.activePersona = found;
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const voices = window.speechSynthesis.getVoices();
        this.updateSelectedVoice(voices);
      }
    }
  }

  public getPersona(): VoicePersona {
    return this.activePersona;
  }

  public setCallbacks(callbacks: {
    onStateChange: (state: VoiceAgentState) => void;
    onAmplitude: (amplitude: number) => void;
    onTranscript: (transcript: string, isFinal: boolean) => void;
    onAgentReply: (message: VoiceMessage) => void;
  }) {
    this.onStateChangeCallback = callbacks.onStateChange;
    this.onAmplitudeCallback = callbacks.onAmplitude;
    this.onTranscriptCallback = callbacks.onTranscript;
    this.onAgentReplyCallback = callbacks.onAgentReply;
  }

  private setState(newState: VoiceAgentState) {
    this.state = newState;
    if (this.onStateChangeCallback) {
      this.onStateChangeCallback(newState);
    }
  }

  public getState(): VoiceAgentState {
    return this.state;
  }

  /**
   * Procedural Audio Chime using Web Audio API
   */
  public playChime(type: 'start' | 'listen' | 'finish' | 'pop') {
    try {
      const ctx = this.getAudioContext();
      if (!ctx || ctx.state === 'suspended') {
        ctx?.resume();
      }
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'start') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'listen') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'finish') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.18);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      }
    } catch (e) {
      // AudioContext might be blocked until user gesture
    }
  }

  private getAudioContext(): AudioContext | null {
    if (!this.audioContext && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
      }
    }
    return this.audioContext;
  }

  /**
   * Starts listening to user's voice via Microphone & SpeechRecognition
   */
  public async startListening(): Promise<boolean> {
    if (this.state === 'speaking') {
      this.stopSpeaking();
    }

    this.playChime('listen');
    this.setState('listening');

    // 1. Initialize Web Audio API Analyser for live frequency visualization
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        if (!this.micStream) {
          this.micStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        }
        const ctx = this.getAudioContext();
        if (ctx) {
          if (ctx.state === 'suspended') {
            await ctx.resume();
          }
          if (!this.analyser) {
            this.analyser = ctx.createAnalyser();
            this.analyser.fftSize = 64;
            const source = ctx.createMediaStreamSource(this.micStream);
            source.connect(this.analyser);
          }
          this.startAmplitudeLoop();
        }
      }
    } catch (err) {
      console.warn('Microphone stream access not granted for waveform analysis; falling back to simulated orb reactivity.', err);
      this.startSimulatedAmplitudeLoop();
    }

    // 2. Initialize Speech Recognition
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      console.warn('SpeechRecognition API not supported in this browser. Voice text input can be simulated.');
      return false;
    }

    try {
      if (!this.recognition) {
        this.recognition = new SpeechRec();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';

        this.recognition.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }

          const currentText = finalTranscript || interimTranscript;
          if (this.onTranscriptCallback && currentText) {
            this.onTranscriptCallback(currentText, Boolean(finalTranscript));
          }

          if (finalTranscript) {
            this.handleUserVoiceInput(finalTranscript.trim());
          }
        };

        this.recognition.onerror = (event: any) => {
          console.warn('Speech recognition error:', event.error);
          if (event.error !== 'no-speech') {
            this.setState('idle');
          }
        };

        this.recognition.onend = () => {
          this.isRecognitionActive = false;
          if (this.state === 'listening') {
            this.setState('idle');
          }
        };
      }

      this.recognition.start();
      this.isRecognitionActive = true;
      return true;
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      this.setState('idle');
      return false;
    }
  }

  public stopListening() {
    if (this.recognition && this.isRecognitionActive) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
      this.isRecognitionActive = false;
    }
    this.stopAmplitudeLoop();
    if (this.state === 'listening') {
      this.setState('idle');
    }
  }

  private startAmplitudeLoop() {
    this.stopAmplitudeLoop();
    const dataArray = new Uint8Array(this.analyser ? this.analyser.frequencyBinCount : 32);

    const update = () => {
      if (this.analyser && this.state === 'listening') {
        this.analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length;
        const normalized = Math.min(1, avg / 128);
        if (this.onAmplitudeCallback) {
          this.onAmplitudeCallback(normalized);
        }
      }
      this.animFrameId = requestAnimationFrame(update);
    };

    this.animFrameId = requestAnimationFrame(update);
  }

  private startSimulatedAmplitudeLoop() {
    this.stopAmplitudeLoop();
    let phase = 0;
    const update = () => {
      phase += 0.08;
      const wave = (Math.sin(phase) + 1) / 2 * 0.4 + 0.2;
      if (this.onAmplitudeCallback) {
        this.onAmplitudeCallback(wave);
      }
      this.animFrameId = requestAnimationFrame(update);
    };
    this.animFrameId = requestAnimationFrame(update);
  }

  private stopAmplitudeLoop() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  /**
   * Processes user voice query and generates reasoned academic response
   */
  public async handleUserVoiceInput(userText: string) {
    if (!userText || userText.length < 2) return;

    this.stopListening();
    this.setState('thinking');

    // Simulate short thinking latency for agentic feel
    await new Promise(r => setTimeout(r, 650));

    const reply = this.generateAgentReply(userText);
    this.setState('speaking');

    if (this.onAgentReplyCallback) {
      this.onAgentReplyCallback(reply);
    }

    this.speakText(reply.text);
  }

  /**
   * Academic Domain Natural Language Reasoning Engine
   */
  private generateAgentReply(query: string): VoiceMessage {
    const q = query.toLowerCase();
    const id = `msg-${Date.now()}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Zero Fee / Diamond Open Access
    if (q.includes('diamond') || q.includes('free') || q.includes('zero') || q.includes('no fee') || q.includes('no apc')) {
      return {
        id,
        sender: 'agent',
        timestamp,
        text:
          "If you want zero author publishing fees, I highly recommend the Journal of Machine Learning Research (JMLR). It is a prestigious Diamond Open Access venue funded by community foundations, meaning neither authors nor readers pay anything. Would you like me to filter the recommendations for Diamond Open Access?",
        suggestedAction: {
          type: 'FILTER_OA',
          label: 'Filter by Diamond OA ($0 Fee)',
          payload: 'Diamond OA (No Fee)'
        }
      };
    }

    // 2. High Impact / IEEE PAMI / Nature
    if (q.includes('pami') || q.includes('ieee') || q.includes('computer vision') || q.includes('pattern recognition')) {
      return {
        id,
        sender: 'agent',
        timestamp,
        text:
          "IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI) is currently ranked number one for computer vision and deep learning. It operates as a Hybrid journal, meaning subscription publishing is completely free, or you can optionally pay an APC of 2,495 dollars for Gold Open Access.",
        suggestedAction: {
          type: 'SEARCH',
          label: 'View IEEE TPAMI Record'
        }
      };
    }

    // 3. Medical Imaging / Healthcare AI
    if (q.includes('medical') || q.includes('healthcare') || q.includes('clinical') || q.includes('segmentation') || q.includes('ct scan') || q.includes('tumor')) {
      return {
        id,
        sender: 'agent',
        timestamp,
        text:
          "For medical image segmentation and clinical AI, both 'Artificial Intelligence in Medicine' by Elsevier and 'Medical Image Analysis' are premier targets. They require clinical interpretability and validation on benchmark cohorts. Shall I configure your manuscript search for clinical AI venues?",
        suggestedAction: {
          type: 'APPLY_MANUSCRIPT',
          label: 'Configure Clinical AI Search',
          payload: {
            domain: 'Health Informatics / Computer Vision / Medical AI',
            keywords: 'deep learning, medical image segmentation, clinical CT, healthcare AI'
          }
        }
      };
    }

    // 4. Scopus / Web of Science Indexing verification questions
    if (q.includes('scopus') || q.includes('web of science') || q.includes('indexing') || q.includes('verified') || q.includes('predatory')) {
      return {
        id,
        sender: 'agent',
        timestamp,
        text:
          "Our system enforces strict anti-hallucination rules. We confirm DOAJ and Crossref records directly, but because Elsevier Scopus and Clarivate Web of Science require institutional subscriptions, we mark them as 'Requires Manual Review' and provide official verification links so you never rely on unverified claims."
      };
    }

    // 5. Bioinformatics / Computational Biology
    if (q.includes('bioinformatics') || q.includes('genomics') || q.includes('biology') || q.includes('dna') || q.includes('rna') || q.includes('protein')) {
      return {
        id,
        sender: 'agent',
        timestamp,
        text:
          "For computational genomics and algorithm pipelines, 'Bioinformatics' by Oxford University Press and 'PLOS Computational Biology' are gold standards. Keep in mind that software papers require public GitHub or Zenodo repositories with reproducible benchmarks."
      };
    }

    // 6. Publication fees / APC budgets
    if (q.includes('cost') || q.includes('apc') || q.includes('fee') || q.includes('budget') || q.includes('expensive')) {
      return {
        id,
        sender: 'agent',
        timestamp,
        text:
          "Article Processing Charges vary widely: Diamond journals like JMLR are completely free, society journals like IEEE Access charge around 1,950 dollars, while high-prestige portfolios like Nature Machine Intelligence can exceed 11,000 dollars. You can set an exact APC budget in our search controls."
      };
    }

    // 7. General search initiation or recommendation
    return {
      id,
      sender: 'agent',
      timestamp,
      text:
        `I understand. Based on your interest in ${query.slice(0, 45)}, I can launch an autonomous multi-source scholarly search across OpenAlex, Crossref, and DOAJ to identify verified journals tailored to your scope and budget. Would you like to run the discovery workflow now?`,
      suggestedAction: {
        type: 'SEARCH',
        label: 'Run Discovery Workflow Now'
      }
    };
  }

  /**
   * Natural Speech Synthesis (TTS)
   */
  public speakText(text: string) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      this.setState('idle');
      return;
    }

    window.speechSynthesis.cancel();

    // Clean markdown/symbols for natural pronunciation
    const cleanText = text
      .replace(/[*_#`~[\]()]/g, '')
      .replace(/\$([0-9,]+)/g, '$1 dollars')
      .replace(/APC/g, 'A P C')
      .replace(/DOAJ/g, 'D O A J')
      .replace(/IEEE/g, 'I triple E')
      .replace(/JMLR/g, 'J M L R')
      .replace(/e\.g\./g, 'for example');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    if (this.selectedSpeechVoice) {
      utterance.voice = this.selectedSpeechVoice;
    }

    utterance.pitch = this.activePersona.pitch;
    utterance.rate = this.activePersona.rate;

    // Simulate pulsing amplitude while speaking
    let speakPhase = 0;
    const interval = setInterval(() => {
      speakPhase += 0.25;
      const amp = (Math.sin(speakPhase) + 1) / 2 * 0.7 + 0.3;
      if (this.onAmplitudeCallback && this.state === 'speaking') {
        this.onAmplitudeCallback(amp);
      }
    }, 50);

    utterance.onend = () => {
      clearInterval(interval);
      if (this.onAmplitudeCallback) {
        this.onAmplitudeCallback(0);
      }
      this.setState('idle');
    };

    utterance.onerror = () => {
      clearInterval(interval);
      this.setState('idle');
    };

    this.setState('speaking');
    window.speechSynthesis.speak(utterance);
  }

  public stopSpeaking() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.setState('idle');
  }

  public disconnect() {
    this.stopListening();
    this.stopSpeaking();
    if (this.micStream) {
      this.micStream.getTracks().forEach(t => t.stop());
      this.micStream = null;
    }
  }
}

export const voiceAgentService = VoiceAgentService.getInstance();
