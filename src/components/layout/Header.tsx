import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Terminal, Search, Shield, Zap } from 'lucide-react';
import { TOOLS } from '../../data/toolsData';

export const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const filteredTools = TOOLS.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSelectTool = (slug: string) => {
    setSearchQuery('');
    setIsSearchOpen(false);
    navigate(`/tools/${slug}`);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-slate-950 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Terminal className="w-5 h-5 font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                DevSuite
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                100% Client-Side
              </span>
            </div>
            <span className="text-[10px] text-slate-400 hidden sm:block">
              Privacy-First Developer Toolkit
            </span>
          </div>
        </Link>

        {/* Global Quick Search Bar */}
        <div className="relative flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search 6 developer tools (e.g. JWT, JSON, Regex, SQL)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-xs text-slate-200 placeholder-slate-500 transition-all outline-none"
            />
          </div>

          {/* Search Dropdown Results */}
          {isSearchOpen && searchQuery && (
            <div
              className="absolute left-0 right-0 top-full mt-2 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto"
              onMouseLeave={() => setIsSearchOpen(false)}
            >
              {filteredTools.length > 0 ? (
                filteredTools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => handleSelectTool(tool.slug)}
                    className="w-full text-left px-4 py-3 hover:bg-slate-800/80 border-b border-slate-800/50 last:border-0 transition flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-semibold text-xs text-slate-200 group-hover:text-cyan-300">
                        {tool.name}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate max-w-xs">
                        {tool.shortDescription}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400/80 bg-cyan-500/10 px-2 py-0.5 rounded">
                      Open Tool
                    </span>
                  </button>
                ))
              ) : (
                <div className="p-4 text-xs text-slate-400 text-center">
                  No matching tools found.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Header Right Status Badges */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-mono">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero Backend Server</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 font-mono">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px]">Sub-50ms</span>
          </div>
        </div>
      </div>
    </header>
  );
};
