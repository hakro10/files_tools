import React, { useState, useMemo } from 'react';
import { CopyButton } from '../../common/CopyButton';
import { ErrorAlert } from '../../common/ErrorAlert';
import { AdSlotOutput } from '../../ads/AdSlotOutput';
import {
  Braces,
  FileCode,
  Download,
  Trash2,
  Search,
  ChevronDown,
  ChevronRight,
  Sparkles
} from 'lucide-react';

const SAMPLE_JSON = {
  appName: "DevSuite",
  version: "1.0.0",
  privacy: {
    clientSide: true,
    dataLogging: false,
    executionTimeMs: 12
  },
  supportedTools: [
    "JSON Formatter & Tree Visualizer",
    "JWT Decoder (Web Crypto API)",
    "SQL Query Formatter",
    "Regex Tester & Matcher",
    "Base64 & URL Encoder",
    "CSS Flexbox & Grid Playground"
  ],
  metadata: {
    tags: ["developer-tools", "cloudflare-pages", "react", "tailwind"],
    author: {
      name: "Senior Principal Frontend Engineer",
      role: "Architect"
    }
  }
};

type ViewMode = 'formatted' | 'tree' | 'minified';

interface JsonTreeNodeProps {
  data: any;
  name?: string;
  isLast?: boolean;
  searchTerm: string;
}

const JsonTreeNode: React.FC<JsonTreeNodeProps> = ({ data, name, isLast = true, searchTerm }) => {
  const [collapsed, setCollapsed] = useState(false);
  const isObject = data !== null && typeof data === 'object';
  const isArray = Array.isArray(data);

  const getTypeColor = (val: any) => {
    if (val === null) return 'text-amber-600 dark:text-amber-400 font-semibold';
    if (typeof val === 'boolean') return 'text-purple-600 dark:text-purple-400 font-semibold';
    if (typeof val === 'number') return 'text-cyan-600 dark:text-cyan-400 font-mono';
    if (typeof val === 'string') return 'text-emerald-600 dark:text-emerald-400';
    return 'text-slate-800 dark:text-slate-200';
  };

  const matchesSearch = (key?: string, val?: any): boolean => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    if (key && key.toLowerCase().includes(term)) return true;
    if (typeof val === 'string' && val.toLowerCase().includes(term)) return true;
    if (typeof val === 'number' && val.toString().includes(term)) return true;
    return false;
  };

  if (!isObject) {
    if (!matchesSearch(name, data)) return null;
    return (
      <div className="py-0.5 font-mono text-xs flex items-center gap-1.5 hover:bg-slate-200/50 dark:hover:bg-slate-800/40 px-1.5 rounded">
        {name && <span className="text-slate-500 dark:text-slate-400 font-medium">"{name}":</span>}
        <span className={getTypeColor(data)}>
          {typeof data === 'string' ? `"${data}"` : String(data)}
        </span>
        {!isLast && <span className="text-slate-400 dark:text-slate-500">,</span>}
      </div>
    );
  }

  const keys = Object.keys(data);
  const itemCount = keys.length;

  return (
    <div className="py-0.5 font-mono text-xs">
      <div
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center gap-1 cursor-pointer hover:bg-slate-200/60 dark:hover:bg-slate-800/60 px-1.5 py-0.5 rounded select-none group"
      >
        <span className="text-slate-400 dark:text-slate-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </span>
        {name && <span className="text-slate-800 dark:text-slate-300 font-semibold">"{name}": </span>}
        <span className="text-slate-500 font-bold">{isArray ? '[' : '{'}</span>
        {collapsed && (
          <span className="text-slate-500 dark:text-slate-400 text-[11px] px-1.5 py-0.2 bg-slate-200 dark:bg-slate-800 rounded font-sans">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </span>
        )}
        {collapsed && <span className="text-slate-500 font-bold">{isArray ? ']' : '}'}</span>}
        {!isLast && collapsed && <span className="text-slate-500">,</span>}
      </div>

      {!collapsed && (
        <div className="pl-4 border-l border-slate-300 dark:border-slate-800 ml-2 space-y-0.5 my-0.5">
          {keys.map((key, idx) => (
            <JsonTreeNode
              key={key}
              name={isArray ? undefined : key}
              data={data[key]}
              isLast={idx === keys.length - 1}
              searchTerm={searchTerm}
            />
          ))}
        </div>
      )}

      {!collapsed && (
        <div className="pl-1.5 font-mono text-slate-500 font-bold">
          {isArray ? ']' : '}'}
          {!isLast && ','}
        </div>
      )}
    </div>
  );
};

export const JsonFormatter: React.FC = () => {
  const [inputJson, setInputJson] = useState<string>(JSON.stringify(SAMPLE_JSON, null, 2));
  const [indentSize, setIndentSize] = useState<number>(2);
  const [viewMode, setViewMode] = useState<ViewMode>('formatted');
  const [treeSearch, setTreeSearch] = useState<string>('');

  const { parsedJson, error, stats } = useMemo(() => {
    if (!inputJson.trim()) {
      return { parsedJson: null, error: null, stats: { size: 0, keys: 0 } };
    }
    try {
      const parsed = JSON.parse(inputJson);
      const str = JSON.stringify(parsed);
      const keysCount = typeof parsed === 'object' && parsed !== null ? Object.keys(parsed).length : 1;
      return {
        parsedJson: parsed,
        error: null,
        stats: { size: new Blob([str]).size, keys: keysCount }
      };
    } catch (err: any) {
      return {
        parsedJson: null,
        error: err.message || 'Invalid JSON syntax',
        stats: { size: 0, keys: 0 }
      };
    }
  }, [inputJson]);

  const outputFormatted = useMemo(() => {
    if (error || parsedJson === null) return '';
    if (viewMode === 'minified') return JSON.stringify(parsedJson);
    return JSON.stringify(parsedJson, null, indentSize);
  }, [parsedJson, error, viewMode, indentSize]);

  const handleLoadSample = () => {
    setInputJson(JSON.stringify(SAMPLE_JSON, null, indentSize));
  };

  const handleDownload = () => {
    if (!outputFormatted) return;
    const blob = new Blob([outputFormatted], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 transition-colors">
        <div className="flex items-center gap-2">
          <button
            onClick={handleLoadSample}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-cyan-700 dark:text-cyan-300 border border-slate-300 dark:border-slate-700 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            Load Sample
          </button>
          <button
            onClick={() => setInputJson('')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 border border-slate-300 dark:border-slate-700 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>

        {/* Format Options & Tabs */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-200 dark:bg-slate-900 p-1 rounded-lg border border-slate-300 dark:border-slate-800">
            <button
              onClick={() => setViewMode('formatted')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                viewMode === 'formatted'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Formatted Code
            </button>
            <button
              onClick={() => setViewMode('tree')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                viewMode === 'tree'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Tree View
            </button>
            <button
              onClick={() => setViewMode('minified')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                viewMode === 'minified'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Minified
            </button>
          </div>

          {viewMode === 'formatted' && (
            <select
              value={indentSize}
              onChange={(e) => setIndentSize(Number(e.target.value))}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-200 font-mono outline-none focus:border-cyan-500"
            >
              <option value={2}>2 Spaces</option>
              <option value={4}>4 Spaces</option>
            </select>
          )}
        </div>
      </div>

      {/* Input / Output Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Input Column */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 uppercase font-mono tracking-wider">
              <FileCode className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              Raw Input JSON
            </label>
            <span className="text-[11px] font-mono text-slate-500">
              {inputJson.length.toLocaleString()} chars
            </span>
          </div>

          <textarea
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            placeholder="Paste your raw JSON data here..."
            className="w-full h-[420px] p-4 rounded-xl bg-slate-900 dark:bg-slate-950 border border-slate-700 dark:border-slate-800 text-xs font-mono text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none resize-none leading-relaxed shadow-inner"
          />

          <ErrorAlert message={error} />
        </div>

        {/* Output Column */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 uppercase font-mono tracking-wider">
                <Braces className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                {viewMode === 'tree' ? 'Interactive Tree Visualizer' : 'Output Result'}
              </label>
              {!error && parsedJson !== null && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                  Valid JSON ({stats.size} B)
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <CopyButton textToCopy={outputFormatted} />
              <button
                onClick={handleDownload}
                disabled={!outputFormatted}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 disabled:opacity-50 transition"
                title="Download JSON file"
              >
                <Download className="w-3.5 h-3.5" />
                Export
              </button>
            </div>
          </div>

          <div className="w-full h-[420px] rounded-xl bg-slate-900 dark:bg-slate-950 border border-slate-700 dark:border-slate-800 overflow-hidden flex flex-col shadow-inner">
            {viewMode === 'tree' ? (
              <div className="flex flex-col h-full">
                <div className="p-2.5 border-b border-slate-800 bg-slate-950/60 flex items-center gap-2">
                  <Search className="w-3.5 h-3.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search tree nodes or values..."
                    value={treeSearch}
                    onChange={(e) => setTreeSearch(e.target.value)}
                    className="bg-transparent text-xs text-slate-200 placeholder-slate-500 outline-none w-full font-mono"
                  />
                </div>
                <div className="p-4 overflow-auto flex-1 font-mono text-slate-200">
                  {parsedJson !== null ? (
                    <JsonTreeNode data={parsedJson} searchTerm={treeSearch} />
                  ) : (
                    <div className="text-slate-500 text-xs italic">
                      Provide valid JSON to view interactive tree.
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <pre className="p-4 overflow-auto text-xs font-mono text-cyan-300 dark:text-slate-200 h-full leading-relaxed">
                <code>{outputFormatted || '// Result will appear here'}</code>
              </pre>
            )}
          </div>
        </div>
      </div>

      {/* AdSlot Output directly below the tool output */}
      <AdSlotOutput />
    </div>
  );
};
