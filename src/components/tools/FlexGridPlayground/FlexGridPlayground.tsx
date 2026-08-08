import React, { useState, useMemo } from 'react';
import { CopyButton } from '../../common/CopyButton';
import { AdSlotOutput } from '../../ads/AdSlotOutput';
import {
  Layout,
  Plus,
  Minus,
  Layers
} from 'lucide-react';

type LayoutMode = 'flex' | 'grid';

export const FlexGridPlayground: React.FC = () => {
  const [mode, setMode] = useState<LayoutMode>('flex');

  // Flexbox state
  const [flexDirection, setFlexDirection] = useState<string>('row');
  const [justifyContent, setJustifyContent] = useState<string>('space-between');
  const [alignItems, setAlignItems] = useState<string>('center');
  const [flexWrap, setFlexWrap] = useState<string>('wrap');
  const [gap, setGap] = useState<number>(4);

  // Grid state
  const [gridCols, setGridCols] = useState<number>(3);

  // Child items
  const [itemCount, setItemCount] = useState<number>(4);

  // Computed Pure CSS
  const pureCss = useMemo(() => {
    const gapPx = gap * 4;
    if (mode === 'flex') {
      return `.container {\n  display: flex;\n  flex-direction: ${flexDirection};\n  justify-content: ${justifyContent};\n  align-items: ${alignItems};\n  flex-wrap: ${flexWrap};\n  gap: ${gapPx}px;\n}`;
    }
    return `.container {\n  display: grid;\n  grid-template-columns: repeat(${gridCols}, 1fr);\n  gap: ${gapPx}px;\n  align-items: ${alignItems};\n}`;
  }, [mode, flexDirection, justifyContent, alignItems, flexWrap, gap, gridCols]);

  // Computed Tailwind CSS Classes
  const tailwindClasses = useMemo(() => {
    const gapClass = `gap-${gap}`;
    if (mode === 'flex') {
      const dirMap: Record<string, string> = {
        row: 'flex-row',
        'row-reverse': 'flex-row-reverse',
        column: 'flex-col',
        'column-reverse': 'flex-col-reverse'
      };
      const justifyMap: Record<string, string> = {
        'flex-start': 'justify-start',
        center: 'justify-center',
        'flex-end': 'justify-end',
        'space-between': 'justify-between',
        'space-around': 'justify-around',
        'space-evenly': 'justify-evenly'
      };
      const alignMap: Record<string, string> = {
        stretch: 'items-stretch',
        'flex-start': 'items-start',
        center: 'items-center',
        'flex-end': 'items-end',
        baseline: 'items-baseline'
      };
      const wrapMap: Record<string, string> = {
        nowrap: 'flex-nowrap',
        wrap: 'flex-wrap',
        'wrap-reverse': 'flex-wrap-reverse'
      };

      return `flex ${dirMap[flexDirection]} ${justifyMap[justifyContent]} ${alignMap[alignItems]} ${wrapMap[flexWrap]} ${gapClass}`;
    }

    return `grid grid-cols-${gridCols} ${gapClass}`;
  }, [mode, flexDirection, justifyContent, alignItems, flexWrap, gap, gridCols]);

  return (
    <div className="space-y-6">
      {/* Top Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800">
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setMode('flex')}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition ${
              mode === 'flex'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            CSS Flexbox Mode
          </button>
          <button
            onClick={() => setMode('grid')}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition ${
              mode === 'grid'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            CSS Grid Mode
          </button>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
          <span className="text-xs font-mono text-slate-400">Child Boxes:</span>
          <button
            onClick={() => setItemCount((prev) => Math.max(1, prev - 1))}
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="text-xs font-bold font-mono text-cyan-400 min-w-[20px] text-center">
            {itemCount}
          </span>
          <button
            onClick={() => setItemCount((prev) => Math.min(12, prev + 1))}
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Controls & Visual Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
          <h3 className="text-xs font-bold text-slate-200 uppercase font-mono tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            Container Properties
          </h3>

          {mode === 'flex' ? (
            <>
              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-mono">flex-direction:</label>
                <select
                  value={flexDirection}
                  onChange={(e) => setFlexDirection(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 font-mono outline-none focus:border-cyan-500"
                >
                  <option value="row">row</option>
                  <option value="row-reverse">row-reverse</option>
                  <option value="column">column</option>
                  <option value="column-reverse">column-reverse</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-mono">justify-content:</label>
                <select
                  value={justifyContent}
                  onChange={(e) => setJustifyContent(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 font-mono outline-none focus:border-cyan-500"
                >
                  <option value="flex-start">flex-start</option>
                  <option value="center">center</option>
                  <option value="flex-end">flex-end</option>
                  <option value="space-between">space-between</option>
                  <option value="space-around">space-around</option>
                  <option value="space-evenly">space-evenly</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-mono">align-items:</label>
                <select
                  value={alignItems}
                  onChange={(e) => setAlignItems(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 font-mono outline-none focus:border-cyan-500"
                >
                  <option value="stretch">stretch</option>
                  <option value="flex-start">flex-start</option>
                  <option value="center">center</option>
                  <option value="flex-end">flex-end</option>
                  <option value="baseline">baseline</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-mono">flex-wrap:</label>
                <select
                  value={flexWrap}
                  onChange={(e) => setFlexWrap(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 font-mono outline-none focus:border-cyan-500"
                >
                  <option value="wrap">wrap</option>
                  <option value="nowrap">nowrap</option>
                  <option value="wrap-reverse">wrap-reverse</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-mono">
                  grid-template-columns (1–6):
                </label>
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={gridCols}
                  onChange={(e) => setGridCols(Number(e.target.value))}
                  className="w-full accent-cyan-500"
                />
                <div className="text-[11px] font-mono text-cyan-400 text-right">
                  {gridCols} columns
                </div>
              </div>
            </>
          )}

          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-mono">gap spacing:</label>
            <input
              type="range"
              min="0"
              max="12"
              value={gap}
              onChange={(e) => setGap(Number(e.target.value))}
              className="w-full accent-cyan-500"
            />
            <div className="text-[11px] font-mono text-cyan-400 text-right">
              {gap * 4}px (gap-{gap})
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
            <Layout className="w-4 h-4 text-emerald-400" />
            Live Interactive Visual Canvas
          </label>

          <div className="w-full min-h-[360px] p-6 rounded-xl bg-slate-950 border border-slate-800 relative overflow-hidden flex flex-col justify-center">
            <div
              style={
                mode === 'flex'
                  ? {
                      display: 'flex',
                      flexDirection: flexDirection as any,
                      justifyContent: justifyContent,
                      alignItems: alignItems,
                      flexWrap: flexWrap as any,
                      gap: `${gap * 4}px`
                    }
                  : {
                      display: 'grid',
                      gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
                      gap: `${gap * 4}px`,
                      alignItems: alignItems
                    }
              }
              className="w-full min-h-[300px] border border-dashed border-cyan-500/40 p-4 rounded-xl bg-slate-900/40"
            >
              {Array.from({ length: itemCount }).map((_, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 shadow-lg text-center flex flex-col items-center justify-center min-w-[70px] min-h-[70px] transition-all hover:scale-105"
                >
                  <span className="font-bold text-sm text-cyan-400">Box #{idx + 1}</span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {mode === 'flex' ? `Flex Item` : `Grid Cell`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AdSlot Output directly below the live canvas */}
      <AdSlotOutput />

      {/* Generated Code Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
              Generated Pure CSS Code
            </span>
            <CopyButton textToCopy={pureCss} />
          </div>
          <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 leading-relaxed overflow-auto">
            <code>{pureCss}</code>
          </pre>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
              Generated Tailwind CSS Utility Classes
            </span>
            <CopyButton textToCopy={tailwindClasses} />
          </div>
          <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 leading-relaxed overflow-auto">
            <code>{tailwindClasses}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
