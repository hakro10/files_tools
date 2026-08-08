import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { AdSlotHeader } from '../ads/AdSlotHeader';
import { SeoContent } from '../common/SeoContent';
import type { ToolMetadata } from '../../data/toolsData';
import { ChevronRight, Home, Shield } from 'lucide-react';

interface ToolLayoutProps {
  tool: ToolMetadata;
  children: React.ReactNode;
}

export const ToolLayout: React.FC<ToolLayoutProps> = ({ tool, children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb Header Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-4 font-mono">
          <Link to="/" className="hover:text-cyan-400 flex items-center gap-1 transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-slate-500">Tools</span>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-cyan-400 font-semibold truncate">{tool.name}</span>
        </nav>

        {/* Main Content Layout with Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8 items-start mt-6">
          {/* Main Tool Column */}
          <div className="flex-1 w-full min-w-0">
            {/* Tool Title & Badges Header (Page H1 Title) */}
            <div className="mb-4 pb-4 border-b border-slate-800/80">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  {tool.name}
                </h1>
                <div className="flex items-center gap-2">
                  {tool.badge && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      {tool.badge}
                    </span>
                  )}
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    100% Client-Side
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
                {tool.shortDescription}
              </p>
            </div>

            {/* Header Ad Slot (Positioned BELOW H1 Page Title and DIRECTLY ABOVE Tool Interface) */}
            <AdSlotHeader />

            {/* Interactive Tool Interface Component */}
            <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm shadow-2xl my-4">
              {children}
            </div>

            {/* Programmatic SEO Text Section (700+ words, Code snippets, Security FAQ, AdSlot Inline) */}
            <SeoContent tool={tool} />
          </div>

          {/* Responsive Sidebar Column */}
          <Sidebar />
        </div>
      </main>

      <Footer />
    </div>
  );
};
