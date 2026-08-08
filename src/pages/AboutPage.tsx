import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Terminal, Shield, Zap, Lock, Code2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 text-xs font-mono font-semibold border border-indigo-500/20">
            <Terminal className="w-3.5 h-3.5" />
            <span>Built by Senior Principal Frontend Engineers</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            About DevSuite
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            High-Performance • 100% Client-Side • Privacy-First Developer Tools
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed space-y-6 text-slate-700 dark:text-slate-300">
          <section className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm transition-colors">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Our Core Mission
            </h2>
            <p>
              Most online developer utility websites send sensitive JSON payloads, database SQL statements, and JWT secret tokens to remote REST servers. This introduces unacceptable security risks, telemetry tracking, and slow network latency.
            </p>
            <p>
              DevSuite was built from the ground up to solve this problem. Every tool on our platform runs <strong>100% inside your local web browser memory session</strong> using native Web Crypto API (<code className="text-cyan-700 dark:text-cyan-300 font-mono">crypto.subtle</code>), WebAssembly, and optimized JavaScript V8 execution pipelines.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm transition-colors">
              <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">Sub-50ms Speed</div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                Zero network latency, CORS preflights, or server queue delays.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm transition-colors">
              <Lock className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">Zero Server Data</div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                No database or cloud backend handles your secret keys or credentials.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm transition-colors">
              <Code2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">Cloudflare Edge</div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                Served from Cloudflare Pages static edge network for sub-second TTFB.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
