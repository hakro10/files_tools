import React, { useState, useMemo } from 'react';
import { format as formatSql } from 'sql-formatter';
import { CopyButton } from '../../common/CopyButton';
import { ErrorAlert } from '../../common/ErrorAlert';
import { AdSlotOutput } from '../../ads/AdSlotOutput';
import {
  Database,
  Sparkles,
  Trash2,
  Download,
  Settings2
} from 'lucide-react';

const SAMPLE_SQL = `SELECT u.id, u.username, u.email, COUNT(o.id) as total_orders, SUM(o.total_amount) as lifetime_value FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE u.status = 'active' AND u.created_at >= '2026-01-01' GROUP BY u.id, u.username, u.email HAVING COUNT(o.id) > 2 ORDER BY lifetime_value DESC LIMIT 50;`;

type SqlDialect = 'sql' | 'postgresql' | 'mysql' | 'mariadb' | 'sqlite' | 'tsql';
type KeywordCase = 'upper' | 'lower' | 'preserve';

export const SqlFormatter: React.FC = () => {
  const [sqlInput, setSqlInput] = useState<string>(SAMPLE_SQL);
  const [dialect, setDialect] = useState<SqlDialect>('sql');
  const [keywordCase, setKeywordCase] = useState<KeywordCase>('upper');
  const [tabWidth] = useState<number>(2);
  const [isMinified, setIsMinified] = useState<boolean>(false);

  const { formattedSql, error } = useMemo(() => {
    if (!sqlInput.trim()) {
      return { formattedSql: '', error: null };
    }

    try {
      if (isMinified) {
        // Strip SQL single-line comments (--), multi-line comments (/* */), and collapse whitespace
        const minified = sqlInput
          .replace(/--.*$/gm, '')
          .replace(/\/\*[\s\S]*?\*\//g, '')
          .replace(/\s+/g, ' ')
          .trim();
        return { formattedSql: minified, error: null };
      }

      const formatted = formatSql(sqlInput, {
        language: dialect,
        keywordCase: keywordCase,
        tabWidth: tabWidth
      });

      return { formattedSql: formatted, error: null };
    } catch (err: any) {
      return { formattedSql: '', error: err.message || 'Failed to format SQL query' };
    }
  }, [sqlInput, dialect, keywordCase, tabWidth, isMinified]);

  const handleDownload = () => {
    if (!formattedSql) return;
    const blob = new Blob([formattedSql], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `query_${dialect}.sql`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Toolbar & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 transition-colors">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSqlInput(SAMPLE_SQL)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-indigo-700 dark:text-indigo-300 border border-slate-300 dark:border-slate-700 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            Load Sample Query
          </button>
          <button
            onClick={() => setSqlInput('')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 border border-slate-300 dark:border-slate-700 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>

        {/* Dialect and Formatting Options */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 font-mono">
            <Settings2 className="w-3.5 h-3.5 text-slate-400" />
            <span>Dialect:</span>
            <select
              value={dialect}
              onChange={(e) => setDialect(e.target.value as SqlDialect)}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-200 font-mono outline-none focus:border-indigo-500"
            >
              <option value="sql">Standard SQL</option>
              <option value="postgresql">PostgreSQL</option>
              <option value="mysql">MySQL</option>
              <option value="mariadb">MariaDB</option>
              <option value="sqlite">SQLite</option>
              <option value="tsql">T-SQL (SQL Server)</option>
            </select>
          </div>

          <div className="flex items-center gap-1 bg-slate-200 dark:bg-slate-900 p-1 rounded-lg border border-slate-300 dark:border-slate-800">
            <button
              onClick={() => setIsMinified(false)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                !isMinified
                  ? 'bg-indigo-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Beautify
            </button>
            <button
              onClick={() => setIsMinified(true)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                isMinified
                  ? 'bg-indigo-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Minify Query
            </button>
          </div>

          {!isMinified && (
            <select
              value={keywordCase}
              onChange={(e) => setKeywordCase(e.target.value as KeywordCase)}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-200 font-mono outline-none focus:border-indigo-500"
            >
              <option value="upper">UPPERCASE</option>
              <option value="lower">lowercase</option>
              <option value="preserve">Preserve Case</option>
            </select>
          )}
        </div>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Column */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Raw SQL Query Input
            </label>
            <span className="text-[11px] font-mono text-slate-500">
              {sqlInput.length.toLocaleString()} chars
            </span>
          </div>

          <textarea
            value={sqlInput}
            onChange={(e) => setSqlInput(e.target.value)}
            placeholder="Paste your SQL SELECT, INSERT, UPDATE, or CREATE query here..."
            className="w-full h-96 p-4 rounded-xl bg-slate-900 dark:bg-slate-950 border border-slate-700 dark:border-slate-800 text-xs font-mono text-indigo-300 dark:text-indigo-300 placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none resize-none leading-relaxed shadow-inner"
          />

          <ErrorAlert message={error} title="SQL Parsing Warning" />
        </div>

        {/* Formatted Output Column */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider font-mono flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              {isMinified ? 'Minified SQL Query' : 'Beautified SQL Result'}
            </label>

            <div className="flex items-center gap-2">
              <CopyButton textToCopy={formattedSql} />
              <button
                onClick={handleDownload}
                disabled={!formattedSql}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 disabled:opacity-50 transition"
              >
                <Download className="w-3.5 h-3.5" />
                Export .sql
              </button>
            </div>
          </div>

          <pre className="w-full h-96 p-4 rounded-xl bg-slate-900 dark:bg-slate-950 border border-slate-700 dark:border-slate-800 overflow-auto text-xs font-mono text-indigo-300 dark:text-slate-200 leading-relaxed shadow-inner">
            <code>{formattedSql || '// Formatted SQL will appear here'}</code>
          </pre>
        </div>
      </div>

      {/* AdSlot Output */}
      <AdSlotOutput />
    </div>
  );
};
