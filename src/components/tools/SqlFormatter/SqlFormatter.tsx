import React, { useState, useMemo } from 'react';
import { format } from 'sql-formatter';
import { CopyButton } from '../../common/CopyButton';
import { ErrorAlert } from '../../common/ErrorAlert';
import { AdSlotOutput } from '../../ads/AdSlotOutput';
import {
  Database,
  Sparkles,
  Trash2,
  FileText,
  Minimize2
} from 'lucide-react';

const SAMPLE_SQL = `SELECT u.id, u.username, u.email, count(o.id) as total_orders, sum(o.total_amount) as lifetime_value FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE u.status = 'active' AND u.created_at >= '2026-01-01' GROUP BY u.id, u.username, u.email HAVING count(o.id) > 2 ORDER BY lifetime_value DESC LIMIT 50;`;

type KeywordCase = 'upper' | 'lower' | 'preserve';

export const SqlFormatter: React.FC = () => {
  const [inputSql, setInputSql] = useState<string>(SAMPLE_SQL);
  const [dialect, setDialect] = useState<string>('postgresql');
  const [keywordCase, setKeywordCase] = useState<KeywordCase>('upper');
  const [tabWidth] = useState<number>(2);
  const [isMinified, setIsMinified] = useState<boolean>(false);

  const { outputSql, error } = useMemo(() => {
    if (!inputSql.trim()) return { outputSql: '', error: null };

    if (isMinified) {
      try {
        const minified = inputSql
          .replace(/--.*$/gm, '')
          .replace(/\/\*[\s\S]*?\*\//g, '')
          .replace(/\s+/g, ' ')
          .trim();
        return { outputSql: minified, error: null };
      } catch (err: any) {
        return { outputSql: '', error: err.message };
      }
    }

    try {
      const formatted = format(inputSql, {
        language: dialect as any,
        keywordCase: keywordCase as any,
        tabWidth: tabWidth
      });
      return { outputSql: formatted, error: null };
    } catch (err: any) {
      return { outputSql: '', error: `SQL Formatting Exception: ${err.message}` };
    }
  }, [inputSql, dialect, keywordCase, tabWidth, isMinified]);

  return (
    <div className="space-y-6">
      {/* Configuration Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setInputSql(SAMPLE_SQL)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Load Sample Query
          </button>
          <button
            onClick={() => setInputSql('')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-red-400 border border-slate-700 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>

        {/* Options */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Dialect selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 font-mono">Dialect:</span>
            <select
              value={dialect}
              onChange={(e) => setDialect(e.target.value)}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 font-mono outline-none focus:border-cyan-500"
            >
              <option value="sql">Standard ANSI SQL</option>
              <option value="postgresql">PostgreSQL</option>
              <option value="mysql">MySQL</option>
              <option value="mariadb">MariaDB</option>
              <option value="sqlite">SQLite</option>
              <option value="tsql">T-SQL (SQL Server)</option>
            </select>
          </div>

          {/* Keyword Casing */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 font-mono">Casing:</span>
            <select
              value={keywordCase}
              onChange={(e) => setKeywordCase(e.target.value as KeywordCase)}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 font-mono outline-none focus:border-cyan-500"
            >
              <option value="upper">UPPERCASE</option>
              <option value="lower">lowercase</option>
              <option value="preserve">Preserve</option>
            </select>
          </div>

          {/* Mode Toggle */}
          <button
            onClick={() => setIsMinified(!isMinified)}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition ${
              isMinified
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
            }`}
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>{isMinified ? 'Minified Mode' : 'Beautified Mode'}</span>
          </button>
        </div>
      </div>

      {/* Editor Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SQL Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              Raw SQL Query Input
            </label>
            <span className="text-[11px] font-mono text-slate-500">
              {inputSql.length} chars
            </span>
          </div>

          <textarea
            value={inputSql}
            onChange={(e) => setInputSql(e.target.value)}
            placeholder="Paste your raw database SQL query here..."
            className="w-full h-[400px] p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100 placeholder-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none resize-none leading-relaxed"
          />
          <ErrorAlert message={error} />
        </div>

        {/* Formatted Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              {isMinified ? 'Minified SQL Query' : 'Formatted SQL Query'}
            </label>
            <CopyButton textToCopy={outputSql} />
          </div>

          <pre className="w-full h-[400px] p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-auto leading-relaxed">
            <code>{outputSql || '-- Formatted SQL query will appear here'}</code>
          </pre>
        </div>
      </div>

      {/* AdSlot Output */}
      <AdSlotOutput />
    </div>
  );
};
