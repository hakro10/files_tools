import React, { useState, useMemo } from 'react';
import { ErrorAlert } from '../../common/ErrorAlert';
import { AdSlotOutput } from '../../ads/AdSlotOutput';
import {
  Code,
  Sparkles,
  BookOpen,
  Zap,
  ListFilter
} from 'lucide-react';

const SAMPLE_REGEX = `(\\w+)@([a-zA-Z_\\-]+?\\.[a-zA-Z]{2,6})`;
const SAMPLE_TEXT = `Welcome to DevSuite! You can contact our support team at support@devsuite.io or reach out directly to security-team@subdomain.devsuite.org for security inquiries. Standard users can write to user123@example.com for general feedback.`;

interface MatchGroup {
  index: number;
  matchText: string;
  start: number;
  end: number;
  groups: string[];
}

const CHEAT_SHEET = [
  { label: 'Email Address', pattern: `[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}` },
  { label: 'HTTP/HTTPS URL', pattern: `https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)` },
  { label: 'IPv4 Address', pattern: `\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b` },
  { label: 'Hex Color Code', pattern: `#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})` },
  { label: 'YYYY-MM-DD Date', pattern: `\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])` }
];

export const RegexTester: React.FC = () => {
  const [pattern, setPattern] = useState<string>(SAMPLE_REGEX);
  const [flags, setFlags] = useState<{ g: boolean; i: boolean; m: boolean; s: boolean }>({
    g: true,
    i: true,
    m: false,
    s: false
  });
  const [testText, setTestText] = useState<string>(SAMPLE_TEXT);

  const flagStr = useMemo(() => {
    let f = '';
    if (flags.g) f += 'g';
    if (flags.i) f += 'i';
    if (flags.m) f += 'm';
    if (flags.s) f += 's';
    return f;
  }, [flags]);

  const { matches, error, highlightedElements } = useMemo(() => {
    if (!pattern.trim() || !testText) {
      return { matches: [], error: null, highlightedElements: testText };
    }

    try {
      const regex = new RegExp(pattern, flagStr);
      const matchResults: MatchGroup[] = [];

      if (flags.g) {
        let match: RegExpExecArray | null;
        let limit = 500;
        while ((match = regex.exec(testText)) !== null && limit-- > 0) {
          const groupArray = match.slice(1);
          matchResults.push({
            index: matchResults.length + 1,
            matchText: match[0],
            start: match.index,
            end: match.index + match[0].length,
            groups: groupArray
          });
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
        }
      } else {
        const match = regex.exec(testText);
        if (match) {
          matchResults.push({
            index: 1,
            matchText: match[0],
            start: match.index,
            end: match.index + match[0].length,
            groups: match.slice(1)
          });
        }
      }

      const elements: React.ReactNode[] = [];
      let currentPos = 0;

      matchResults.forEach((m, idx) => {
        if (m.start > currentPos) {
          elements.push(
            <span key={`text-${currentPos}`}>
              {testText.substring(currentPos, m.start)}
            </span>
          );
        }
        elements.push(
          <mark
            key={`match-${idx}`}
            className="bg-cyan-500/30 text-cyan-200 border-b-2 border-cyan-400 font-bold px-0.5 rounded transition hover:bg-cyan-400 hover:text-slate-950"
            title={`Match #${m.index}: ${m.matchText}`}
          >
            {m.matchText}
          </mark>
        );
        currentPos = m.end;
      });

      if (currentPos < testText.length) {
        elements.push(
          <span key={`text-end`}>{testText.substring(currentPos)}</span>
        );
      }

      return { matches: matchResults, error: null, highlightedElements: elements };
    } catch (err: any) {
      return { matches: [], error: err.message, highlightedElements: testText };
    }
  }, [pattern, flagStr, testText, flags.g]);

  return (
    <div className="space-y-6">
      {/* Pattern Input & Flags Toolbar */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
            <Code className="w-4 h-4 text-cyan-400" />
            Regular Expression Pattern
          </label>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">Flags:</span>
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 font-mono text-xs">
              <button
                onClick={() => setFlags((prev) => ({ ...prev, g: !prev.g }))}
                className={`px-2 py-0.5 rounded ${
                  flags.g ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-500 hover:text-slate-300'
                }`}
                title="Global search (g)"
              >
                g
              </button>
              <button
                onClick={() => setFlags((prev) => ({ ...prev, i: !prev.i }))}
                className={`px-2 py-0.5 rounded ${
                  flags.i ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-500 hover:text-slate-300'
                }`}
                title="Case-insensitive (i)"
              >
                i
              </button>
              <button
                onClick={() => setFlags((prev) => ({ ...prev, m: !prev.m }))}
                className={`px-2 py-0.5 rounded ${
                  flags.m ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-500 hover:text-slate-300'
                }`}
                title="Multiline (m)"
              >
                m
              </button>
              <button
                onClick={() => setFlags((prev) => ({ ...prev, s: !prev.s }))}
                className={`px-2 py-0.5 rounded ${
                  flags.s ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-500 hover:text-slate-300'
                }`}
                title="Dot matches all (s)"
              >
                s
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 focus-within:border-cyan-500">
          <span className="text-cyan-400 font-mono text-base font-bold">/</span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="Enter regex pattern e.g. ([a-z]+)@([a-z]+)"
            className="w-full bg-transparent text-xs font-mono text-cyan-300 placeholder-slate-600 outline-none"
          />
          <span className="text-cyan-400 font-mono text-base font-bold">/{flagStr}</span>
        </div>

        <ErrorAlert message={error} title="Regex Compilation Error" />
      </div>

      {/* Test Input & Token Highlight Preview Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
              Test Sample Text
            </label>
            <button
              onClick={() => {
                setPattern(SAMPLE_REGEX);
                setTestText(SAMPLE_TEXT);
              }}
              className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 font-mono"
            >
              <Sparkles className="w-3 h-3" />
              Reset Sample
            </button>
          </div>

          <textarea
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            placeholder="Type or paste test text here..."
            className="w-full h-64 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100 focus:border-cyan-500 outline-none resize-none leading-relaxed"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              Live Visual Match Tokens
            </label>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              {matches.length} {matches.length === 1 ? 'match' : 'matches'} found
            </span>
          </div>

          <div className="w-full h-64 p-4 rounded-xl bg-slate-950 border border-slate-800 overflow-auto text-xs font-mono text-slate-300 leading-relaxed whitespace-pre-wrap">
            {highlightedElements}
          </div>
        </div>
      </div>

      {/* AdSlot Output */}
      <AdSlotOutput />

      {/* Capture Groups Breakdown Table */}
      {matches.length > 0 && (
        <div className="space-y-3 p-4 rounded-xl bg-slate-950 border border-slate-800">
          <h3 className="text-xs font-bold text-slate-200 uppercase font-mono tracking-wider flex items-center gap-2">
            <ListFilter className="w-4 h-4 text-cyan-400" />
            Match Details & Capture Groups
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-3 py-2">#</th>
                  <th className="px-3 py-2">Index Range</th>
                  <th className="px-3 py-2">Full Match String</th>
                  <th className="px-3 py-2">Captured Groups</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900 text-slate-300">
                {matches.map((m) => (
                  <tr key={m.index} className="hover:bg-slate-900/50">
                    <td className="px-3 py-2 text-cyan-400 font-bold">#{m.index}</td>
                    <td className="px-3 py-2 text-slate-400">{m.start}–{m.end}</td>
                    <td className="px-3 py-2 text-emerald-300 font-semibold">{m.matchText}</td>
                    <td className="px-3 py-2">
                      {m.groups.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {m.groups.map((g, idx) => (
                            <span
                              key={idx}
                              className="px-1.5 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800 text-[11px]"
                            >
                              Group {idx + 1}: "{g}"
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-500 italic">None</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Embedded Regex Cheat Sheet */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-400" />
          Regex Cheat Sheet Quick Patterns
        </h4>
        <div className="flex flex-wrap gap-2">
          {CHEAT_SHEET.map((item, index) => (
            <button
              key={index}
              onClick={() => setPattern(item.pattern)}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-mono text-cyan-300 transition flex items-center gap-1.5"
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
