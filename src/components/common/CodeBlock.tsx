import React from 'react';
import { CopyButton } from './CopyButton';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'text',
  title
}) => {
  return (
    <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden my-4 shadow-xl">
      <div className="px-4 py-2 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-slate-700"></span>
          <span className="text-xs font-mono text-slate-400 font-semibold">{title || language}</span>
        </div>
        <CopyButton textToCopy={code} />
      </div>
      <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
};
