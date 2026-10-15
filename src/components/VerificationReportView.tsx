import React from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  Info,
  CheckCircle2,
  ExternalLink,
  HelpCircle,
  Lock
} from 'lucide-react';
import { CanonicalJournal } from '../types';

interface VerificationReportViewProps {
  journals: CanonicalJournal[];
}

export const VerificationReportView: React.FC<VerificationReportViewProps> = ({ journals }) => {
  if (journals.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <h3 className="text-lg font-bold text-white">No Verification Reports Yet</h3>
        <p className="text-xs text-slate-400">
          Run a manuscript search first to generate detailed registry verification audit reports.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16 text-slate-200">
      {/* Verification Policy Banner */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Factual Registry Verification Audit</h2>
            <p className="text-xs text-slate-400">Strict anti-hallucination rules applied to all candidate journals</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
            <span className="font-bold text-emerald-400">VERIFIED</span>
            <p className="text-slate-400">Directly matched against open authoritative registries (ISSN Portal, Crossref, DOAJ).</p>
          </div>
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
            <span className="font-bold text-amber-400">REQUIRES MANUAL REVIEW</span>
            <p className="text-slate-400">
              Proprietary index claims (Scopus, Web of Science) require institutional subscription access and are never fabricated.
            </p>
          </div>
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
            <span className="font-bold text-blue-400">ANTI-PREDATORY DISCIPLINE</span>
            <p className="text-slate-400">
              Absence from an index does not automatically prove a journal is predatory; warnings indicate missing evidence only.
            </p>
          </div>
        </div>
      </div>

      {/* Individual Journal Audit Cards */}
      <div className="space-y-6">
        {journals.map((journal, idx) => (
          <div key={journal.id} className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-blue-400">#{idx + 1}</span>
                  <h3 className="text-lg font-bold text-white">{journal.title}</h3>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Publisher: {journal.publisher} • ISSN: {journal.issn} {journal.eissn ? `(eISSN: ${journal.eissn})` : ''}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  journal.verificationStatus === 'VERIFIED'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                }`}>
                  {journal.verificationStatus}
                </span>
              </div>
            </div>

            {/* Verification Checks Grid */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Authoritative Verification Checks</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {journal.verificationChecks.map((check, i) => (
                  <div key={i} className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 space-y-2 text-xs">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-slate-200">{check.claim}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        check.status === 'VERIFIED'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : check.status === 'REQUIRES_MANUAL_REVIEW'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        {check.status}
                      </span>
                    </div>
                    <p className="text-slate-400">{check.evidenceText}</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-900">
                      <span>Source: {check.sourceName}</span>
                      {check.sourceUrl && (
                        <a href={check.sourceUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
                          <span>Registry Link</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
