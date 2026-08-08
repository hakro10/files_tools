import React, { useState, useMemo } from 'react';
import { ErrorAlert } from '../../common/ErrorAlert';
import { AdSlotOutput } from '../../ads/AdSlotOutput';
import {
  Code,
  Sparkles,
  Layers,
  HelpCircle
} from 'lucide-react';

const SAMPLE_REGEX = `[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}`;
const SAMPLE_TEXT = `Welcome to DevSuite Platform!
Contact our lead engineering team at dev@devsuite.app or security-audits@cloud.devsuite.org.
For billing, email accounting-2026@corporate.net. Invalid test emails: user@domain, admin@site.`;

interface MatchResult {
  index: number;
  matchText: string;
  groups: string[];
}

export const RegexTester: React.FC = () => {
  const [pattern, setPattern] = useState<string>(SAMPLE_REGEX);
  const [testText, setTestText] = useState<string>(SAMPLE_TEXT);
  const [flagGlobal, setFlagGlobal] = useState<boolean>(true);
  const [flagIgnoreCase, setFlagIgnoreCase] = useState<boolean>(true);
  const [flagMultiline, setFlagMultiline] = useState<boolean>(false);

  const flags = useMemo(() => {
    let f = '';
    if (flagGlobal) f += 'g';
    if (flagIgnoreCase) f += 'i';
    if (flagMultiline) f += 'm';
    return f;
  }, [flagGlobal, flagIgnoreCase, flagMultiline]);

  const { matches, regexError } = useMemo(() => {
    if (!pattern) return { matches: [], regexError: null };

    try {
      const regex = new RegExp(pattern, flags);
      const results: MatchResult[] = [];

      if (flagGlobal) {
        let match;
        let guard = 0;
        while ((match = regex.exec(testText)) !== null && guard < 500) {
          guard++;
          results.push({
            index: match.index,
            matchText: match[0],
            groups: match.slice(1)
          });
          if (match.index === regex.lastIndex) regex.lastIndex++;
        }
      } else {
        const match = regex.exec(testText);
        if (match) {
          results.push({
            index: match.index,
            matchText: match[0],
            groups: match.slice(1)
          });
        }
      }

      return { matches: results, regexError: null };
    } catch (err: any) {
      return { matches: [], regexError: err.message || 'Invalid Regular Expression' };
    }
  }, [pattern, flags, testText]);

  // Render Highlighted Token HTML
  const highlightedHtml = useMemo(() => {
    if (!pattern || regexError || matches.length === 0) {
      return testText;
    }

    try {
      const regex = new RegExp(pattern, flags);
      return testText.replace(regex, (m) => `<mark class="bg-purple-500/30 text-purple-900 dark:text-purple-200 border border-purple-500/50 px-1 py-0.5 rounded">${m}</mark>`);
    } catch {
      return testText;
    }
  }, [pattern, flags, testText, matches, regexError]);

  return (
    <div className="space-y-6">
      {/* Top Regex Control Toolbar */}
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3 transition-colors">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex-1 relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-purple-600 dark:text-purple-400 font-bold text-sm select-none">
              /
            </div>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter regex pattern (e.g. [a-z]+)..."
              className="w-full pl-7 pr-12 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 focus:border-purple-500 text-xs font-mono text-slate-900 dark:text-purple-300 outline-none"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-purple-600 dark:text-purple-400 font-bold text-xs select-none">
              /{flags}
            </div>
          </div>

          {/* Flags Toggles */}
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-xl border border-slate-300 dark:border-slate-800 text-xs font-mono">
            <label className="flex items-center gap-1.5 cursor-pointer px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
              <input
                type="checkbox"
                checked={flagGlobal}
                onChange={(e) => setFlagGlobal(e.target.checked)}
                className="accent-purple-500 rounded"
              />
              <span className="text-slate-800 dark:text-slate-200">Global (g)</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
              <input
                type="checkbox"
                checked={flagIgnoreCase}
                onChange={(e) => setFlagIgnoreCase(e.target.checked)}
                className="accent-purple-500 rounded"
              />
              <span className="text-slate-800 dark:text-slate-200">Ignore Case (i)</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
              <input
                type="checkbox"
                checked={flagMultiline}
                onChange={(e) => setFlagMultiline(e.target.checked)}
                className="accent-purple-500 rounded"
              />
              <span className="text-slate-800 dark:text-slate-200">Multiline (m)</span>
            </label>
          </div>
        </div>

        <ErrorAlert message={regexError} title="Regex Syntax Error" />
      </div>

      {/* Inputs & Visual Highlighting Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Test Text Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
              <Code className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              Test Text String
            </label>
            <span className="text-[11px] font-mono text-slate-500">
              {testText.length.toLocaleString()} chars
            </span>
          </div>

          <textarea
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            placeholder="Paste text sample to evaluate against regular expression..."
            className="w-full h-64 p-4 rounded-xl bg-slate-900 dark:bg-slate-950 border border-slate-700 dark:border-slate-800 text-xs font-mono text-purple-300 placeholder-slate-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none resize-none leading-relaxed shadow-inner"
          />
        </div>

        {/* Live Token Match Highlighter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider font-mono flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                Live Highlighted Tokens
              </label>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                {matches.length} {matches.length === 1 ? 'Match' : 'Matches'}
              </span>
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            className="w-full h-64 p-4 rounded-xl bg-slate-900 dark:bg-slate-950 border border-slate-700 dark:border-slate-800 text-xs font-mono text-slate-200 overflow-auto whitespace-pre-wrap leading-relaxed shadow-inner"
          />
        </div>
      </div>

      {/* Match Results Breakdown Table */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm transition-colors">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200 uppercase font-mono tracking-wider">
            Match Index & Capture Groups Breakdown
          </h3>
        </div>

        {matches.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                  <th className="p-2">#</th>
                  <th className="p-2">Index Range</th>
                  <th className="p-2">Full Match String</th>
                  <th className="p-2">Capture Groups</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {matches.map((m, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                    <td className="p-2 text-slate-400 font-semibold">{idx + 1}</td>
                    <td className="p-2 text-slate-500">
                      [{m.index}..{m.index + m.matchText.length}]
                    </td>
                    <td className="p-2 text-purple-600 dark:text-purple-300 font-bold max-w-xs truncate">
                      "{m.matchText}"
                    </td>
                    <td className="p-2 text-slate-600 dark:text-slate-400">
                      {m.groups.length > 0
                        ? m.groups.map((g, gIdx) => `$${gIdx + 1}: "${g}"`).join(', ')
                        : 'None'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-xs text-slate-500 italic p-3 text-center">
            No matches found for pattern /{pattern}/{flags}.
          </div>
        )}
      </div>

      {/* Regex Quick Cheat Sheet */}
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 space-y-3 transition-colors">
        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-300 uppercase font-mono tracking-wider flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          Common Regex Patterns Cheat Sheet
        </h4>
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => setPattern(`[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}`)}
            className="px-2.5 py-1 rounded bg-white dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-purple-300 border border-slate-300 dark:border-slate-800 font-mono transition"
          >
            Email Address
          </button>
          <button
            onClick={() => setPattern(`https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)`)}
            className="px-2.5 py-1 rounded bg-white dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-purple-300 border border-slate-300 dark:border-slate-800 font-mono transition"
          >
            URL Matching
          </button>
          <button
            onClick={() => setPattern(`\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b`)}
            className="px-2.5 py-1 rounded bg-white dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-purple-300 border border-slate-300 dark:border-slate-800 font-mono transition"
          >
            IPv4 Address
          </button>
          <button
            onClick={() => setPattern(`#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})`)}
            className="px-2.5 py-1 rounded bg-white dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-purple-300 border border-slate-300 dark:border-slate-800 font-mono transition"
          >
            Hex Color Code
          </button>
        </div>
      </div>

      {/* AdSlot Output */}
      <AdSlotOutput />
    </div>
  );
};
