import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Shield, FileCheck } from 'lucide-react';
import { TOOLS } from '../../data/toolsData';

export const Footer: React.FC = () => {
  const devTools = TOOLS.filter((t) => t.category !== 'File Tools');
  const fileTools = TOOLS.filter((t) => t.category === 'File Tools');

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
              <span className="font-bold text-slate-900 dark:text-slate-100 text-base">
                FilesTools.net
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
              Privacy-first developer toolkit & client-side file conversion platform. 100% in-browser processing with zero server data retention.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold">
              <Shield className="w-3.5 h-3.5" />
              <span>Zero server data collection</span>
            </div>
          </div>

          {/* File Processing Tools */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider text-[11px] mb-3 font-mono">
              File Tools
            </h4>
            <ul className="space-y-2">
              {fileTools.map((tool) => (
                <li key={tool.id}>
                  <Link
                    to={`/tools/${tool.slug}`}
                    className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                  >
                    <FileCheck className="w-3 h-3 text-cyan-500" />
                    <span>{tool.name.split('(')[0]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Developer Micro-Tools */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider text-[11px] mb-3 font-mono">
              Developer Utilities
            </h4>
            <ul className="space-y-2">
              {devTools.map((tool) => (
                <li key={tool.id}>
                  <Link
                    to={`/tools/${tool.slug}`}
                    className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    {tool.name.split('(')[0].split('&')[0]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance & Mandatory Legal Pages */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider text-[11px] mb-3 font-mono">
              Compliance & Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            © {new Date().getFullYear()} FilesTools.net (DevSuite Platform). All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-slate-700 dark:hover:text-slate-300">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms-of-service" className="hover:text-slate-700 dark:hover:text-slate-300">Terms of Service</Link>
            <span>•</span>
            <Link to="/contact-us" className="hover:text-slate-700 dark:hover:text-slate-300">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
