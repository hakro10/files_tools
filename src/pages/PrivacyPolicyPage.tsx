import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ShieldCheck, Lock, Eye, Server } from 'lucide-react';
import { useSeo } from '../hooks/useSeo';

export const PrivacyPolicyPage: React.FC = () => {
  useSeo({
    title: 'Privacy Policy | FilesTools.net',
    description: 'Privacy Policy for FilesTools.net. Learn about our 100% client-side data processing architecture, zero server logs, and Google AdSense cookie disclosures.',
    canonicalUrl: 'https://filestools.net/privacy-policy'
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-semibold border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero Backend Server Data Retention</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Last Updated: August 8, 2026 • DevSuite Client-Side Engineering Guidelines
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed space-y-6 text-slate-700 dark:text-slate-300">
          <section className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm transition-colors">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              1. 100% Client-Side Processing Architecture
            </h2>
            <p>
              At DevSuite, privacy is built directly into our technical core. All developer tools (including JSON formatting, JWT decoding, SQL formatting, Regex testing, Base64 encoding, and CSS layout building) process data entirely inside your web browser’s local JavaScript execution context.
            </p>
            <p>
              No JSON payloads, SQL query strings, JWT tokens, secret keys, or regular expressions are ever transmitted over the network or saved to any external database or cloud storage.
            </p>
          </section>

          <section className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm transition-colors">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              2. Cookies & Advertising (Google AdSense Disclosures)
            </h2>
            <p>
              DevSuite uses Google AdSense to serve non-intrusive advertisements on our website. Google AdSense uses cookies to serve ads based on user visits to this and other websites on the Internet.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
              <li>Third-party vendors, including Google, use cookies to serve ads based on prior visits.</li>
              <li>Google’s use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet.</li>
              <li>Users may opt out of personalized advertising by visiting Google Ads Settings (<a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" className="text-cyan-600 dark:text-cyan-400 underline">https://www.google.com/settings/ads</a>).</li>
            </ul>
          </section>

          <section className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm transition-colors">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              3. Analytics & Infrastructure Logging
            </h2>
            <p>
              Our application is hosted on Cloudflare Pages static edge network. Cloudflare collects standard anonymous HTTP server logs (IP address, user agent, requested static file paths) solely for DDoS protection, network performance routing, and infrastructure reliability.
            </p>
          </section>

          <section className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm transition-colors">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              4. Contact Privacy Officer
            </h2>
            <p>
              If you have questions regarding our privacy architecture or security practices, please contact us via our Contact Page or open an issue on our official GitHub repository.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};
