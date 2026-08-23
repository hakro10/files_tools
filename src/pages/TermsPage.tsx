import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { FileText, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useSeo } from '../hooks/useSeo';

export const TermsPage: React.FC = () => {
  useSeo({
    title: 'Terms of Service | FilesTools.net',
    description: 'Terms of Service and Acceptable Use Policy for FilesTools.net client-side file conversion and developer utility platform.',
    canonicalUrl: 'https://filestools.net/terms-of-service'
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 text-xs font-mono font-semibold border border-cyan-500/20">
            <FileText className="w-3.5 h-3.5" />
            <span>Developer Suite Terms & Conditions</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Terms of Service
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Last Updated: August 8, 2026 • Acceptable Use & Service Guidelines
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed space-y-6 text-slate-700 dark:text-slate-300">
          <section className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm transition-colors">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using DevSuite (the "Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please discontinue using the platform.
            </p>
          </section>

          <section className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm transition-colors">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              2. Disclaimer of Warranties
            </h2>
            <p>
              DevSuite provides client-side utility tools "as is" and "as available" without warranties of any kind, express or implied. While we take extreme care to ensure accuracy in JSON formatting, JWT parsing, SQL formatting, and Regex testing, developers are responsible for verifying code before deploying to mission-critical production environments.
            </p>
          </section>

          <section className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm transition-colors">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              3. Permitted & Acceptable Use
            </h2>
            <p>
              You may use DevSuite for personal, academic, and commercial software engineering projects. Automated scraping or attempt to overload our static Cloudflare Pages CDN distribution is prohibited.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};
