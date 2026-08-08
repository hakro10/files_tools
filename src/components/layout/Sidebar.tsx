import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Braces,
  ShieldCheck,
  Database,
  Code,
  Binary,
  Layout,
  Wrench,
  ChevronRight
} from 'lucide-react';
import { TOOLS } from '../../data/toolsData';
import { AdSlotSidebar } from '../ads/AdSlotSidebar';

const ICON_MAP: Record<string, React.ReactNode> = {
  Braces: <Braces className="w-4 h-4" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4" />,
  Database: <Database className="w-4 h-4" />,
  Regex: <Code className="w-4 h-4" />,
  Binary: <Binary className="w-4 h-4" />,
  Layout: <Layout className="w-4 h-4" />
};

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-6">
      <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur-md transition-colors">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
          <Wrench className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase">
            All Developer Tools
          </h3>
        </div>

        <nav className="space-y-1.5">
          {TOOLS.map((tool) => (
            <NavLink
              key={tool.id}
              to={`/tools/${tool.slug}`}
              className={({ isActive }: { isActive: boolean }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-transparent'
                }`
              }
            >
              <div className="flex items-center gap-2.5 truncate">
                <span className="text-slate-500 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  {ICON_MAP[tool.iconName] || <Wrench className="w-4 h-4" />}
                </span>
                <span className="truncate">{tool.name.split('&')[0]}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </NavLink>
          ))}
        </nav>
      </div>

      {/* AdSlot Sidebar Placeholder */}
      <AdSlotSidebar />
    </aside>
  );
};
