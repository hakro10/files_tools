import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Shield, Lock, Cpu } from 'lucide-react';
import { TOOLS } from '../../data/toolsData';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 mt-16 text-slate-600 dark:text-slate-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-cyan-500 text-slate-950">
                <Terminal className="w-4 h-4 font-bold text-slate-950" />
              </div>
              <span className="font-bold text-slate-900 dark:text-slate-100 text-base">DevSuite</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
              High-performance, privacy-first developer utility web platform built with 100% client-side Web Crypto and JavaScript engines.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-mono">
              <Shield className="w-3.5 h-3.5" />
              <span>Zero server data collection</span>
            </div>
          </div>

          {/* Core Tools Column */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider text-[11px] mb-3 font-mono">
              Developer Tools
            </h4>
            <ul className="space-y-2">
              {TOOLS.map((tool) => (
                <li key={tool.id}>
                  <Link
                    to={`/tools/${tool.slug}`}
                    className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    {tool.name.split('&')[0]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Compliance Essential Pages */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider text-[11px] mb-3 font-mono">
              Compliance & Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Cloudflare Pages & Privacy Column */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider text-[11px] mb-3 font-mono">
              Architecture & Hosting
            </h4>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Cpu className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Cloudflare Pages Static SPA</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Lock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Web Crypto API (subtle.crypto)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            © {new Date().getFullYear()} DevSuite Platform. Built for developers with maximum privacy.
          </div>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-slate-700 dark:hover:text-slate-300">Privacy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-slate-700 dark:hover:text-slate-300">Terms</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-slate-700 dark:hover:text-slate-300">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
