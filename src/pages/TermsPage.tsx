import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { FileText, CheckCircle2, ShieldAlert } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="border-b border-slate-800 pb-6 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <FileText className="w-4 h-4" />
            <span>Legal Disclaimer & Terms</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Terms of Service</h1>
          <p className="text-xs text-slate-400 font-mono">
            Last Updated: July 30, 2026
          </p>
        </div>

        <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-6">
          <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-cyan-400" />
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using DevSuite, you accept and agree to be bound by these Terms of Service. DevSuite provides developer micro-tools free of charge for personal and commercial usage.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              2. Disclaimer of Warranties & Limitation of Liability
            </h2>
            <p>
              All tools provided on DevSuite are offered "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied. While we strive to maintain 100% precision across JSON formatting, JWT decoding, SQL formatting, and regex evaluations, DevSuite shall not be liable for any indirect, incidental, or consequential damages resulting from tool usage.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. Acceptable Use Policy</h2>
            <p>
              You agree not to attempt to interfere with the static site's operation, reverse engineer client scripts, or flood automated bots against our static asset distribution network.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};
