import React, { useState, useMemo } from 'react';
import { CopyButton } from '../../common/CopyButton';
import { ErrorAlert } from '../../common/ErrorAlert';
import { AdSlotOutput } from '../../ads/AdSlotOutput';
import {
  Binary,
  ArrowRightLeft,
  Upload,
  Sparkles,
  Link2
} from 'lucide-react';

type Mode = 'encode' | 'decode';
type TypeVariant = 'base64' | 'url';

export const Base64Encoder: React.FC = () => {
  const [inputText, setInputText] = useState<string>('Hello DevSuite! 🚀 Privacy-first developer tools running 100% in browser runtime.');
  const [mode, setMode] = useState<Mode>('encode');
  const [variant, setVariant] = useState<TypeVariant>('base64');
  const [urlSafe, setUrlSafe] = useState<boolean>(false);
  const [filePreview, setFilePreview] = useState<{ name: string; size: number; mime: string; dataUrl: string } | null>(null);

  const { outputText, error } = useMemo(() => {
    if (!inputText.trim()) return { outputText: '', error: null };

    try {
      if (variant === 'url') {
        if (mode === 'encode') {
          return { outputText: encodeURIComponent(inputText), error: null };
        } else {
          return { outputText: decodeURIComponent(inputText), error: null };
        }
      } else {
        // Base64 Text Handling with UTF-8 support
        if (mode === 'encode') {
          const utf8Bytes = new TextEncoder().encode(inputText);
          let binary = '';
          utf8Bytes.forEach((b) => (binary += String.fromCharCode(b)));
          let b64 = btoa(binary);
          if (urlSafe) {
            b64 = b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
          }
          return { outputText: b64, error: null };
        } else {
          let b64 = inputText.trim();
          if (urlSafe) {
            b64 = b64.replace(/-/g, '+').replace(/_/g, '/');
            while (b64.length % 4) b64 += '=';
          }
          const binary = atob(b64);
          const bytes = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
          }
          const decoded = new TextDecoder().decode(bytes);
          return { outputText: decoded, error: null };
        }
      }
    } catch (err: any) {
      return { outputText: '', error: `Base64/URL ${mode} error: ${err.message}` };
    }
  }, [inputText, mode, variant, urlSafe]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setFilePreview({
        name: file.name,
        size: file.size,
        mime: file.type || 'application/octet-stream',
        dataUrl
      });
      setInputText(dataUrl);
      setMode('encode');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 transition-colors">
        {/* Encoding Variant Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-200 dark:bg-slate-900 p-1 rounded-lg border border-slate-300 dark:border-slate-800">
            <button
              onClick={() => setVariant('base64')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                variant === 'base64'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Base64 Format
            </button>
            <button
              onClick={() => setVariant('url')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                variant === 'url'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              URL Percent-Encoding
            </button>
          </div>

          {variant === 'base64' && (
            <label className="flex items-center gap-1.5 text-xs font-mono text-slate-700 dark:text-slate-300 cursor-pointer ml-2">
              <input
                type="checkbox"
                checked={urlSafe}
                onChange={(e) => setUrlSafe(e.target.checked)}
                className="accent-amber-500 rounded"
              />
              <span>URL-Safe Variant (+ / → - _)</span>
            </label>
          )}
        </div>

        {/* Encode / Decode Action Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode(mode === 'encode' ? 'decode' : 'encode')}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 transition"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Mode: {mode.toUpperCase()}</span>
          </button>
        </div>
      </div>

      {/* Input / Output Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Column */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
              <Binary className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              Input Text String
            </label>
            <label className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer">
              <Upload className="w-3 h-3" />
              <span>Convert File to Base64</span>
              <input type="file" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              setFilePreview(null);
            }}
            placeholder={`Paste text or Base64 string to ${mode}...`}
            className="w-full h-72 p-4 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-mono text-amber-900 dark:text-amber-300 placeholder-slate-400 dark:placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none resize-none leading-relaxed shadow-inner transition-colors"
          />

          <ErrorAlert message={error} />
        </div>

        {/* Output Column */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider font-mono flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              Result ({mode.toUpperCase()})
            </label>
            <CopyButton textToCopy={outputText} />
          </div>

          <pre className="w-full h-72 p-4 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 overflow-auto text-xs font-mono text-amber-900 dark:text-slate-200 leading-relaxed shadow-inner transition-colors">
            <code>{outputText || '// Result will appear here'}</code>
          </pre>
        </div>
      </div>

      {/* File Preview Card */}
      {filePreview && (
        <div className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shadow-sm transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Link2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-slate-200">{filePreview.name}</div>
              <div className="text-[11px] text-slate-500 font-mono">
                {filePreview.mime} • {(filePreview.size / 1024).toFixed(1)} KB
              </div>
            </div>
          </div>
          {filePreview.mime.startsWith('image/') && (
            <img
              src={filePreview.dataUrl}
              alt="Uploaded Preview"
              className="w-12 h-12 rounded border border-slate-300 dark:border-slate-800 object-cover"
            />
          )}
        </div>
      )}

      {/* AdSlot Output */}
      <AdSlotOutput />
    </div>
  );
};
