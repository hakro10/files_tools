import React, { useState, useMemo } from 'react';
import { CopyButton } from '../../common/CopyButton';
import { AdSlotOutput } from '../../ads/AdSlotOutput';
import {
  Layout,
  Plus,
  Minus,
  Sparkles
} from 'lucide-react';

type DisplayMode = 'flex' | 'grid';

export const FlexGridPlayground: React.FC = () => {
  const [displayMode, setDisplayMode] = useState<DisplayMode>('flex');
  const [itemCount, setItemCount] = useState<number>(4);
  const [gap, setGap] = useState<number>(16);

  // Flexbox Controls
  const [flexDirection, setFlexDirection] = useState<'row' | 'row-reverse' | 'column' | 'column-reverse'>('row');
  const [justifyContent, setJustifyContent] = useState<'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'>('space-between');
  const [alignItems, setAlignItems] = useState<'stretch' | 'flex-start' | 'center' | 'flex-end'>('center');
  const [flexWrap, setFlexWrap] = useState<'nowrap' | 'wrap' | 'wrap-reverse'>('wrap');

  // Grid Controls
  const [gridColumns, setGridColumns] = useState<number>(3);

  // Generate Pure CSS Code
  const generatedCss = useMemo(() => {
    if (displayMode === 'flex') {
      return `.container {\n  display: flex;\n  flex-direction: ${flexDirection};\n  justify-content: ${justifyContent};\n  align-items: ${alignItems};\n  flex-wrap: ${flexWrap};\n  gap: ${gap}px;\n}`;
    } else {
      return `.container {\n  display: grid;\n  grid-template-columns: repeat(${gridColumns}, minmax(0, 1fr));\n  gap: ${gap}px;\n}`;
    }
  }, [displayMode, flexDirection, justifyContent, alignItems, flexWrap, gridColumns, gap]);

  // Generate Tailwind CSS Utility Classes
  const generatedTailwind = useMemo(() => {
    if (displayMode === 'flex') {
      const dirMap: Record<string, string> = {
        row: 'flex-row',
        'row-reverse': 'flex-row-reverse',
        column: 'flex-col',
        'column-reverse': 'flex-col-reverse'
      };
      const justMap: Record<string, string> = {
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
        'flex-end': 'items-end'
      };
      const wrapMap: Record<string, string> = {
        nowrap: 'flex-nowrap',
        wrap: 'flex-wrap',
        'wrap-reverse': 'flex-wrap-reverse'
      };

      return `flex ${dirMap[flexDirection]} ${justMap[justifyContent]} ${alignMap[alignItems]} ${wrapMap[flexWrap]} gap-[${gap}px]`;
    } else {
      return `grid grid-cols-${gridColumns} gap-[${gap}px]`;
    }
  }, [displayMode, flexDirection, justifyContent, alignItems, flexWrap, gridColumns, gap]);

  return (
    <div className="space-y-6">
      {/* Top Controls Toolbar */}
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-4 transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-200 dark:bg-slate-900 p-1 rounded-lg border border-slate-300 dark:border-slate-800">
              <button
                onClick={() => setDisplayMode('flex')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition ${
                  displayMode === 'flex'
                    ? 'bg-pink-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                CSS Flexbox
              </button>
              <button
                onClick={() => setDisplayMode('grid')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition ${
                  displayMode === 'grid'
                    ? 'bg-pink-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                CSS Grid
              </button>
            </div>
          </div>

          {/* Child Boxes Counter */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-700 dark:text-slate-300">Child Boxes:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setItemCount(Math.max(1, itemCount - 1))}
                className="p-1 rounded bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 transition"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-xs font-mono font-bold text-slate-900 dark:text-slate-200">
                {itemCount}
              </span>
              <button
                onClick={() => setItemCount(Math.min(12, itemCount + 1))}
                className="p-1 rounded bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 transition"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Controls Grid */}
        {displayMode === 'flex' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs font-mono">
            <div>
              <label className="block text-slate-500 mb-1">Flex Direction</label>
              <select
                value={flexDirection}
                onChange={(e: any) => setFlexDirection(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-200 outline-none"
              >
                <option value="row">row</option>
                <option value="row-reverse">row-reverse</option>
                <option value="column">column</option>
                <option value="column-reverse">column-reverse</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-500 mb-1">Justify Content</label>
              <select
                value={justifyContent}
                onChange={(e: any) => setJustifyContent(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-200 outline-none"
              >
                <option value="flex-start">flex-start</option>
                <option value="center">center</option>
                <option value="flex-end">flex-end</option>
                <option value="space-between">space-between</option>
                <option value="space-around">space-around</option>
                <option value="space-evenly">space-evenly</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-500 mb-1">Align Items</label>
              <select
                value={alignItems}
                onChange={(e: any) => setAlignItems(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-200 outline-none"
              >
                <option value="stretch">stretch</option>
                <option value="flex-start">flex-start</option>
                <option value="center">center</option>
                <option value="flex-end">flex-end</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-500 mb-1">Flex Wrap</label>
              <select
                value={flexWrap}
                onChange={(e: any) => setFlexWrap(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-200 outline-none"
              >
                <option value="nowrap">nowrap</option>
                <option value="wrap">wrap</option>
                <option value="wrap-reverse">wrap-reverse</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-500 mb-1">Gap: {gap}px</label>
              <input
                type="range"
                min={0}
                max={48}
                step={4}
                value={gap}
                onChange={(e) => setGap(Number(e.target.value))}
                className="w-full mt-2 accent-pink-500"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono max-w-md">
            <div>
              <label className="block text-slate-500 mb-1">Grid Columns: {gridColumns}</label>
              <input
                type="range"
                min={1}
                max={6}
                value={gridColumns}
                onChange={(e) => setGridColumns(Number(e.target.value))}
                className="w-full mt-2 accent-pink-500"
              />
            </div>

            <div>
              <label className="block text-slate-500 mb-1">Gap: {gap}px</label>
              <input
                type="range"
                min={0}
                max={48}
                step={4}
                value={gap}
                onChange={(e) => setGap(Number(e.target.value))}
                className="w-full mt-2 accent-pink-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Visual Canvas Playground */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
          <Layout className="w-4 h-4 text-pink-600 dark:text-pink-400" />
          Interactive Visual Canvas
        </label>

        <div className="w-full min-h-[300px] p-6 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 shadow-inner overflow-auto transition-colors">
          <div
            style={
              displayMode === 'flex'
                ? {
                    display: 'flex',
                    flexDirection,
                    justifyContent,
                    alignItems,
                    flexWrap,
                    gap: `${gap}px`
                  }
                : {
                    display: 'grid',
                    gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
                    gap: `${gap}px`
                  }
            }
            className="w-full min-h-[250px] p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700"
          >
            {Array.from({ length: itemCount }).map((_, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-400 dark:border-pink-500/40 text-pink-900 dark:text-pink-300 font-mono font-bold text-sm flex items-center justify-center shadow-lg min-w-[70px] min-h-[70px] transition-transform hover:scale-105"
              >
                Box {idx + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generated Code Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pure CSS Code Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-pink-600 dark:text-pink-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Generated Pure CSS
            </span>
            <CopyButton textToCopy={generatedCss} />
          </div>
          <pre className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-mono text-pink-900 dark:text-slate-200 overflow-auto leading-relaxed shadow-inner transition-colors">
            <code>{generatedCss}</code>
          </pre>
        </div>

        {/* Tailwind CSS Code Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Tailwind Utility Classes
            </span>
            <CopyButton textToCopy={generatedTailwind} />
          </div>
          <pre className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-mono text-cyan-900 dark:text-slate-200 overflow-auto leading-relaxed shadow-inner transition-colors">
            <code>{generatedTailwind}</code>
          </pre>
        </div>
      </div>

      {/* AdSlot Output */}
      <AdSlotOutput />
    </div>
  );
};
