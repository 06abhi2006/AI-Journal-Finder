import React, { useState } from 'react';
import {
  Download,
  FileSpreadsheet,
  FileCode,
  FileText,
  Filter,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Info
} from 'lucide-react';
import { CanonicalJournal, ResearchInput } from '../types';

interface JournalComparisonViewProps {
  journals: CanonicalJournal[];
  input: ResearchInput;
}

export const JournalComparisonView: React.FC<JournalComparisonViewProps> = ({ journals, input }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [minRelevance, setMinRelevance] = useState(0);
  const [oaFilter, setOaFilter] = useState('ALL');

  if (journals.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <h3 className="text-lg font-bold text-white">No Journals to Compare</h3>
        <p className="text-xs text-slate-400">
          Run a manuscript search first to populate candidate journals for side-by-side comparison.
        </p>
      </div>
    );
  }

  const filtered = journals.filter(j => {
    if (minRelevance > 0 && j.researchRelevanceScore < minRelevance) return false;
    if (oaFilter !== 'ALL' && j.openAccessStatus !== oaFilter) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const match =
        j.title.toLowerCase().includes(term) ||
        j.publisher.toLowerCase().includes(term) ||
        j.subjectCategories.some(c => c.toLowerCase().includes(term));
      if (!match) return false;
    }
    return true;
  });

  // Export handlers
  const exportCsv = () => {
    const headers = [
      'Rank',
      'Journal Title',
      'Publisher',
      'ISSN',
      'eISSN',
      'Relevance Score',
      'Suitability Score',
      'Completeness Score',
      'Open Access Status',
      'APC Amount USD',
      'Verification Status',
      'Official URL'
    ];
    const rows = filtered.map((j, i) => [
      i + 1,
      `"${j.title.replace(/"/g, '""')}"`,
      `"${j.publisher.replace(/"/g, '""')}"`,
      j.issn,
      j.eissn || '',
      j.researchRelevanceScore,
      j.publicationSuitabilityScore,
      j.evidenceCompletenessScore,
      `"${j.openAccessStatus}"`,
      j.apcAmount ?? 0,
      j.verificationStatus,
      j.officialUrl || ''
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    downloadFile(csvContent, 'research_journal_comparison.csv', 'text/csv');
  };

  const exportJson = () => {
    const data = {
      manuscript: {
        title: input.title,
        abstract: input.abstract,
        domain: input.domain
      },
      exportDate: new Date().toISOString(),
      candidateCount: filtered.length,
      journals: filtered
    };
    downloadFile(JSON.stringify(data, null, 2), 'research_journal_recommendations.json', 'application/json');
  };

  const exportMarkdown = () => {
    let md = `# Research Journal Recommendation Report\n\n`;
    md += `**Manuscript Title:** ${input.title}\n`;
    md += `**Domain:** ${input.domain}\n`;
    md += `**Report Generated:** ${new Date().toLocaleString()}\n\n`;
    md += `## Candidate Comparison Matrix\n\n`;
    md += `| Rank | Journal | Publisher | ISSN | Relevance | Suitability | OA Model | APC (USD) | Verification |\n`;
    md += `| --- | --- | --- | --- | --- | --- | --- | --- | --- |\n`;
    filtered.forEach((j, i) => {
      md += `| ${i + 1} | [${j.title}](${j.officialUrl || '#'}) | ${j.publisher} | ${j.issn} | ${j.researchRelevanceScore}% | ${j.publicationSuitabilityScore}% | ${j.openAccessStatus} | $${j.apcAmount ?? 0} | ${j.verificationStatus} |\n`;
    });
    md += `\n\n## Grounded Recommendation Findings\n\n`;
    filtered.forEach((j, i) => {
      md += `### #${i + 1} ${j.title}\n`;
      md += `- **Publisher:** ${j.publisher} (ISSN: ${j.issn})\n`;
      md += `- **Rationale:** ${j.recommendationRationale}\n`;
      if (j.verificationWarnings.length > 0) {
        md += `- **Warnings:** ${j.verificationWarnings.join('; ')}\n`;
      }
      md += `\n`;
    });
    downloadFile(md, 'journal_recommendation_report.md', 'text/markdown');
  };

  const exportHtml = () => {
    let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Research Journal Recommendation Dossier</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.5; color: #1e293b; padding: 40px; max-width: 1000px; margin: 0 auto; }
    h1 { color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; }
    table { width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 13px; }
    th, td { padding: 10px 12px; border: 1px solid #cbd5e1; text-align: left; }
    th { background: #f8fafc; font-weight: 600; }
    .badge { display: inline-block; padding: 2px 8px; border-radius: 9999px; font-size: 11px; font-weight: 600; background: #e0f2fe; color: #0369a1; }
  </style>
</head>
<body>
  <h1>Research Journal Recommendation Dossier</h1>
  <p><strong>Manuscript:</strong> ${input.title}</p>
  <p><strong>Domain:</strong> ${input.domain}</p>
  <p><strong>Export Date:</strong> ${new Date().toLocaleString()}</p>
  <h2>Shortlisted Candidate Journals</h2>
  <table>
    <thead>
      <tr>
        <th>Rank</th>
        <th>Journal Title</th>
        <th>Publisher</th>
        <th>ISSN</th>
        <th>Relevance</th>
        <th>Suitability</th>
        <th>OA Model</th>
        <th>APC</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      ${filtered
        .map(
          (j, i) => `<tr>
        <td><strong>#${i + 1}</strong></td>
        <td><a href="${j.officialUrl || '#'}" target="_blank">${j.title}</a></td>
        <td>${j.publisher}</td>
        <td>${j.issn}</td>
        <td><strong>${j.researchRelevanceScore}%</strong></td>
        <td><strong>${j.publicationSuitabilityScore}%</strong></td>
        <td>${j.openAccessStatus}</td>
        <td>$${j.apcAmount ?? 0}</td>
        <td><span class="badge">${j.verificationStatus}</span></td>
      </tr>`
        )
        .join('')}
    </tbody>
  </table>
</body>
</html>`;
    downloadFile(html, 'journal_recommendation_dossier.html', 'text/html');
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 text-slate-200">
      {/* Header and Export Actions */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Journal Comparison Matrix</h2>
          <p className="text-xs text-slate-400">
            Compare shortlisted candidates across independent scores, fees, and verification
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={exportCsv}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5 transition cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>CSV</span>
          </button>
          <button
            onClick={exportJson}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5 transition cursor-pointer"
          >
            <FileCode className="w-3.5 h-3.5 text-purple-400" />
            <span>JSON</span>
          </button>
          <button
            onClick={exportMarkdown}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5 transition cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>Markdown</span>
          </button>
          <button
            onClick={exportHtml}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>HTML Dossier</span>
          </button>
        </div>
      </div>

      {/* Interactive Filters Bar */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div>
          <label className="block text-slate-400 mb-1">Search Candidates</label>
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Filter by title, publisher, or subject..."
            className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-1">
            Min Relevance Score: <span className="font-bold text-blue-400">{minRelevance}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="95"
            step="5"
            value={minRelevance}
            onChange={e => setMinRelevance(Number(e.target.value))}
            className="w-full accent-blue-500 cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-1">Open Access Filter</label>
          <select
            value={oaFilter}
            onChange={e => setOaFilter(e.target.value)}
            className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-hidden focus:border-blue-500"
          >
            <option value="ALL">All Models</option>
            <option value="Gold OA">Gold OA Only</option>
            <option value="Diamond OA (No Fee)">Diamond OA ($0 Fee)</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/70 text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Journal Title & Publisher</th>
                <th className="py-3 px-4 text-center">Relevance</th>
                <th className="py-3 px-4 text-center">Suitability</th>
                <th className="py-3 px-4 text-center">Completeness</th>
                <th className="py-3 px-4">Access Model</th>
                <th className="py-3 px-4 text-right">APC Fee</th>
                <th className="py-3 px-4">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filtered.map((j, idx) => (
                <tr key={j.id} className="hover:bg-slate-950/40 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-400">#{idx + 1}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <span>{j.title}</span>
                      {j.officialUrl && (
                        <a href={j.officialUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {j.publisher} • ISSN: {j.issn}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                      {j.researchRelevanceScore}%
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {j.publicationSuitabilityScore}%
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                      {j.evidenceCompletenessScore}%
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">{j.openAccessStatus}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-semibold text-white">
                    {j.apcAmount !== undefined ? `$${j.apcAmount}` : 'Subscription'}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                      j.verificationStatus === 'VERIFIED'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}>
                      {j.verificationStatus === 'VERIFIED' ? <ShieldCheck className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                      <span>{j.verificationStatus}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
