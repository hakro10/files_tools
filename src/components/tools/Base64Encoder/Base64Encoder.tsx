import React, { useState, useMemo } from 'react';
import { CopyButton } from '../../common/CopyButton';
import { ErrorAlert } from '../../common/ErrorAlert';
import { AdSlotOutput } from '../../ads/AdSlotOutput';
import {
  Upload,
  ArrowRightLeft,
  FileCode,
  CheckCircle
} from 'lucide-react';

type Mode = 'base64-encode' | 'base64-decode' | 'url-encode' | 'url-decode';

export const Base64Encoder: React.FC = () => {
  const [inputText, setInputText] = useState<string>('DevSuite High-Performance Tools 🚀');
  const [mode, setMode] = useState<Mode>('base64-encode');
  const [urlSafe, setUrlSafe] = useState<boolean>(false);
  const [fileDataUrl, setFileDataUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const { outputText, error } = useMemo(() => {
    if (!inputText) return { outputText: '', error: null };

    try {
      if (mode === 'base64-encode') {
        let encoded = btoa(unescape(encodeURIComponent(inputText)));
        if (urlSafe) {
          encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        }
        return { outputText: encoded, error: null };
      }

      if (mode === 'base64-decode') {
        let str = inputText.trim();
        if (urlSafe) {
          str = str.replace(/-/g, '+').replace(/_/g, '/');
          while (str.length % 4) {
            str += '=';
          }
        }
        const decoded = decodeURIComponent(escape(atob(str)));
        return { outputText: decoded, error: null };
      }

      if (mode === 'url-encode') {
        return { outputText: encodeURIComponent(inputText), error: null };
      }

      if (mode === 'url-decode') {
        return { outputText: decodeURIComponent(inputText), error: null };
      }

      return { outputText: '', error: null };
    } catch (err: any) {
      return { outputText: '', error: `Encoding Transformation Error: ${err.message}` };
    }
  }, [inputText, mode, urlSafe]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setFileDataUrl(result);
      setInputText(result);
      setMode('base64-encode');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {/* Mode Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800">
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 flex-wrap">
          <button
            onClick={() => setMode('base64-encode')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition ${
              mode === 'base64-encode'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Base64 Encode
          </button>
          <button
            onClick={() => setMode('base64-decode')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition ${
              mode === 'base64-decode'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Base64 Decode
          </button>
          <button
            onClick={() => setMode('url-encode')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition ${
              mode === 'url-encode'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            URL Encode
          </button>
          <button
            onClick={() => setMode('url-decode')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition ${
              mode === 'url-decode'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            URL Decode
          </button>
        </div>

        {mode.startsWith('base64') && (
          <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-300">
            <input
              type="checkbox"
              checked={urlSafe}
              onChange={(e) => setUrlSafe(e.target.checked)}
              className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-cyan-500"
            />
            <span>URL-Safe Variant (- _)</span>
          </label>
        )}
      </div>

      {/* Editor Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
              <FileCode className="w-4 h-4 text-cyan-400" />
              Input Text / Source String
            </label>
            <span className="text-[11px] font-mono text-slate-500">
              {inputText.length} chars
            </span>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              setFileDataUrl(null);
            }}
            placeholder="Type or paste text string here..."
            className="w-full h-72 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100 placeholder-slate-600 focus:border-cyan-500 outline-none resize-none leading-relaxed"
          />

          <ErrorAlert message={error} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4 text-emerald-400" />
              Converted Result Output
            </label>
            <CopyButton textToCopy={outputText} />
          </div>

          <pre className="w-full h-72 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-auto leading-relaxed whitespace-pre-wrap break-all">
            <code>{outputText || '// Encoded/Decoded string will appear here'}</code>
          </pre>
        </div>
      </div>

      {/* AdSlot Output */}
      <AdSlotOutput />

      {/* Drag and Drop Binary File to Base64 Converter */}
      <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-indigo-400" />
            <h3 className="text-xs font-bold text-slate-200 uppercase font-mono tracking-wider">
              File to Base64 Converter with Live Preview
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-500">100% Browser FileReader</span>
        </div>

        <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-800 hover:border-cyan-500/60 rounded-xl cursor-pointer bg-slate-900/40 hover:bg-slate-900/80 transition group">
          <Upload className="w-8 h-8 text-slate-500 group-hover:text-cyan-400 transition mb-2" />
          <span className="text-xs font-semibold text-slate-300 group-hover:text-cyan-300">
            Click or drag a file to convert to Base64 Data URL
          </span>
          <span className="text-[10px] text-slate-500 mt-1">
            (Images, PNG, JPG, WebP, SVG, Documents)
          </span>
          <input
            type="file"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>

        {fileDataUrl && (
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center gap-4">
            {fileDataUrl.startsWith('data:image/') && (
              <img
                src={fileDataUrl}
                alt="File Preview"
                className="w-24 h-24 object-contain rounded-lg border border-slate-800 bg-slate-950"
              />
            )}
            <div className="flex-1 space-y-1">
              <div className="text-xs font-semibold text-slate-200">{fileName}</div>
              <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                Converted to Base64 Data URL
              </div>
            </div>
            <CopyButton textToCopy={fileDataUrl} label="Copy Data URL" />
          </div>
        )}
      </div>
    </div>
  );
};
