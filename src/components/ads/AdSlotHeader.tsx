import React from 'react';

export const AdSlotHeader: React.FC = () => {
  return (
    <div
      id="ad-slot-header"
      className="w-full my-4 p-3 rounded-xl bg-slate-900/60 border border-dashed border-slate-800 flex flex-col items-center justify-center min-h-[90px] text-center transition-all"
    >
      <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-semibold mb-1">
        ADVERTISEMENT
      </span>
      <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-cyan-500/60 animate-pulse"></span>
        <span>AdSlot Header Placeholder (728x90 / Leaderboard)</span>
      </div>
    </div>
  );
};
