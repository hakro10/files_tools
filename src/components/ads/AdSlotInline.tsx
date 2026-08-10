import React from 'react';

export const AdSlotInline: React.FC = () => {
  return (
    <div
      id="ad-slot-inline"
      className="w-full my-6 p-4 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-dashed border-slate-300 dark:border-slate-800 flex flex-col items-center justify-center min-h-[120px] text-center transition-all"
    >
      <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 dark:text-slate-500 font-semibold mb-2">
        ADVERTISEMENT
      </span>
      <div className="text-xs text-slate-500 dark:text-slate-400 font-mono flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-cyan-500/60 animate-pulse"></span>
        <span>AdSlot Inline Article Placeholder (Responsive In-Feed)</span>
      </div>
    </div>
  );
};
