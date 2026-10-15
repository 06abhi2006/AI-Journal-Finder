import React, { useState } from 'react';
import {
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  FileText,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';
import { CanonicalJournal, VerificationStatus } from '../types';

interface JournalCardProps {
  journal: CanonicalJournal;
  rank: number;
}

export const JournalCard: React.FC<JournalCardProps> = ({ journal, rank }) => {
  const [expanded, setExpanded] = useState(false);

  const getVerificationBadge = (status: VerificationStatus) => {
    switch (status) {
      case 'VERIFIED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED
          </span>
        );
      case 'REQUIRES_MANUAL_REVIEW':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <AlertTriangle className="w-3.5 h-3.5" /> REQUIRES MANUAL REVIEW
          </span>
        );
      case 'CONFLICTING_EVIDENCE':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/30">
            <AlertTriangle className="w-3.5 h-3.5" /> CONFLICTING EVIDENCE
          </span>
        );
      case 'NOT_VERIFIED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-500/10 text-slate-400 border border-slate-500/30">
            <Info className="w-3.5 h-3.5" /> NOT VERIFIED
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-500/10 text-slate-400 border border-slate-500/30">
            UNAVAILABLE
          </span>
        );
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (score >= 75) return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
    if (score >= 60) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition shadow-lg text-slate-200">
      {/* Top Header */}
      <div className="p-5 sm:p-6 border-b border-slate-800/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 font-bold text-sm shrink-0 border border-blue-500/30">
              #{rank}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">{journal.title}</h3>
                {journal.officialUrl && (
                  <a
                    href={journal.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition"
                    title="Visit official journal homepage"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 mt-1">
                <span><strong>Publisher:</strong> {journal.publisher}</span>
                <span>•</span>
                <span><strong>ISSN:</strong> {journal.issn} {journal.eissn ? `(eISSN: ${journal.eissn})` : ''}</span>
              </div>
            </div>
          </div>
          <div className="shrink-0">{getVerificationBadge(journal.verificationStatus)}</div>
        </div>

        {/* Decomposed Scores */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-2">
          <div className="p-2.5 sm:p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex flex-col items-center text-center">
            <span className="text-[11px] text-slate-400 font-medium">Relevance</span>
            <span className={`text-base sm:text-lg font-extrabold mt-0.5 px-2 py-0.5 rounded-lg border ${getScoreColor(journal.researchRelevanceScore)}`}>
              {journal.researchRelevanceScore}%
            </span>
            <span className="text-[10px] text-slate-400 mt-1">Topic & Method Fit</span>
          </div>
          <div className="p-2.5 sm:p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex flex-col items-center text-center">
            <span className="text-[11px] text-slate-400 font-medium">Suitability</span>
            <span className={`text-base sm:text-lg font-extrabold mt-0.5 px-2 py-0.5 rounded-lg border ${getScoreColor(journal.publicationSuitabilityScore)}`}>
              {journal.publicationSuitabilityScore}%
            </span>
            <span className="text-[10px] text-slate-400 mt-1">Access & Budget Fit</span>
          </div>
          <div className="p-2.5 sm:p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex flex-col items-center text-center">
            <span className="text-[11px] text-slate-400 font-medium">Completeness</span>
            <span className={`text-base sm:text-lg font-extrabold mt-0.5 px-2 py-0.5 rounded-lg border ${getScoreColor(journal.evidenceCompletenessScore)}`}>
              {journal.evidenceCompletenessScore}%
            </span>
            <span className="text-[10px] text-slate-400 mt-1">Verified Metadata</span>
          </div>
        </div>

        {/* Quick Attributes & Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded-md border border-slate-700/60">
            {journal.openAccessStatus}
          </span>
          <span className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded-md border border-slate-700/60 flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>APC: {journal.apcAmount !== undefined ? `$${journal.apcAmount} ${journal.apcCurrency || 'USD'}` : 'Unknown / Subscription'}</span>
          </span>
          {journal.peerReviewType && (
            <span className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded-md border border-slate-700/60">
              {journal.peerReviewType}
            </span>
          )}
        </div>

        {/* Grounded Recommendation Rationale */}
        <div className="p-3 bg-blue-950/30 border border-blue-500/20 rounded-xl text-xs text-blue-200">
          <p><strong>Recommendation Rationale:</strong> {journal.recommendationRationale}</p>
        </div>

        {/* Caveats and Warnings */}
        {journal.verificationWarnings && journal.verificationWarnings.length > 0 && (
          <div className="p-3 bg-amber-950/30 border border-amber-500/20 rounded-xl text-xs text-amber-200 space-y-1">
            <div className="font-semibold flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Caveats & Policy Warnings:
            </div>
            {journal.verificationWarnings.map((warn, i) => (
              <p key={i} className="text-amber-300/90">• {warn}</p>
            ))}
          </div>
        )}
      </div>

      {/* Expandable Section */}
      {expanded && (
        <div className="p-5 sm:p-6 bg-slate-950/70 border-t border-slate-800 space-y-4 text-xs">
          {/* Aims and Scope */}
          {journal.aimsAndScope && (
            <div>
              <h4 className="font-semibold text-slate-300 uppercase tracking-wider text-[11px] mb-1">Aims and Scope</h4>
              <p className="text-slate-400 leading-relaxed">{journal.aimsAndScope}</p>
            </div>
          )}

          {/* Subject Categories */}
          <div>
            <h4 className="font-semibold text-slate-300 uppercase tracking-wider text-[11px] mb-1.5">Subject Categories</h4>
            <div className="flex flex-wrap gap-1.5">
              {journal.subjectCategories.map((cat, i) => (
                <span key={i} className="px-2 py-0.5 bg-slate-800/80 text-slate-300 rounded text-[11px]">
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Representative Works */}
          {journal.representativeWorks && journal.representativeWorks.length > 0 && (
            <div>
              <h4 className="font-semibold text-slate-300 uppercase tracking-wider text-[11px] mb-1.5">Representative Publications in Venue</h4>
              <div className="space-y-1">
                {journal.representativeWorks.map((work, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-400">
                    <FileText className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{work}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verification Evidence List */}
          <div>
            <h4 className="font-semibold text-slate-300 uppercase tracking-wider text-[11px] mb-2">Registry Evidence Breakdown</h4>
            <div className="space-y-2">
              {journal.verificationChecks.map((check, i) => (
                <div key={i} className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium text-slate-200">{check.claim}</div>
                    <div className="text-slate-400 mt-0.5">{check.evidenceText}</div>
                    <div className="text-[10px] text-slate-400 mt-1">Source: {check.sourceName}</div>
                  </div>
                  <span className="shrink-0">{getVerificationBadge(check.status)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Card Toggle Footer */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full py-2.5 px-4 bg-slate-900/60 hover:bg-slate-800/80 text-xs text-slate-400 hover:text-slate-200 font-medium transition flex items-center justify-center gap-1.5 cursor-pointer border-t border-slate-800"
      >
        <span>{expanded ? 'Hide Detailed Evidence & Scope' : 'View Detailed Evidence & Scope'}</span>
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
    </div>
  );
};
