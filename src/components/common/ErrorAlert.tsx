import React from 'react';
import { AlertTriangle, XCircle } from 'lucide-react';

interface ErrorAlertProps {
  message: string | null;
  title?: string;
  onClear?: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  message,
  title = 'Syntax Error',
  onClear
}) => {
  if (!message) return null;

  return (
    <div className="w-full my-3 p-3.5 rounded-xl bg-red-950/40 border border-red-800/60 text-red-200 text-sm flex items-start gap-3 shadow-lg shadow-red-950/20 animate-fadeIn">
      <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
      <div className="flex-1">
        <h4 className="font-semibold text-red-300 text-xs uppercase tracking-wider mb-0.5">{title}</h4>
        <p className="font-mono text-xs whitespace-pre-wrap leading-relaxed">{message}</p>
      </div>
      {onClear && (
        <button
          onClick={onClear}
          className="text-red-400 hover:text-red-200 transition p-1"
          title="Dismiss alert"
        >
          <XCircle className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
