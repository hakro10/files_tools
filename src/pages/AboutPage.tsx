import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Terminal, Cpu, ShieldCheck, Zap } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="border-b border-slate-800 pb-6 space-y-2">
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <Terminal className="w-4 h-4" />
            <span>Platform Overview & Architecture</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">About DevSuite</h1>
          <p className="text-xs text-slate-400 font-mono">
            High-Performance, Privacy-First Client-Side Utility Platform
          </p>
        </div>

        <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-6">
          <p>
            DevSuite was engineered by principal frontend engineers who recognize a critical flaw in modern developer tool websites: <strong>unnecessary data leakage and latency</strong>.
          </p>

          <p>
            Most online JSON formatters, JWT decoders, and SQL beautifiers transmit your sensitive payloads across network requests to backend cloud servers. This introduces network delays and severe security vulnerabilities where proprietary tokens, database schemas, and customer data can be intercepted or logged.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-center">
              <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto" />
              <h3 className="font-bold text-white text-sm">100% Client-Side</h3>
              <p className="text-xs text-slate-400">Zero backend server API dispatches. Complete memory isolation.</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-center">
              <Zap className="w-6 h-6 text-amber-400 mx-auto" />
              <h3 className="font-bold text-white text-sm">Sub-50ms Speed</h3>
              <p className="text-xs text-slate-400">Local V8 execution engine delivers sub-50 millisecond performance.</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-center">
              <Cpu className="w-6 h-6 text-cyan-400 mx-auto" />
              <h3 className="font-bold text-white text-sm">Web Crypto Native</h3>
              <p className="text-xs text-slate-400">Native browser Web Crypto API (crypto.subtle) verification.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
