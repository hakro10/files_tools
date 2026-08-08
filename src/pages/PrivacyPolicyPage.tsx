import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ShieldCheck, Lock, Eye, Server, Cookie } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="border-b border-slate-800 pb-6 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>AdSense & GDPR Compliant</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Privacy Policy</h1>
          <p className="text-xs text-slate-400 font-mono">
            Last Updated: July 30, 2026 | Effective Date: Immediately
          </p>
        </div>

        <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-6">
          <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-cyan-400" />
              1. 100% Client-Side Memory Processing (Zero Data Storage)
            </h2>
            <p>
              DevSuite is built from the ground up as a privacy-first web utility platform. All data transformations—including JSON validation, JWT claim decoding, SQL formatting, regular expression evaluations, Base64 encodings, and CSS generation—occur 100% in your local web browser memory.
            </p>
            <p>
              We do <strong>NOT</strong> transmit, store, log, or record any raw text inputs, secret cryptographic keys, database queries, or files on any external backend server or database. Your input data never leaves your device session.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Cookie className="w-5 h-5 text-amber-400" />
              2. Cookies & Advertising (Google AdSense)
            </h2>
            <p>
              DevSuite uses Google AdSense to serve advertisements when you visit our website. Google and its partner advertising networks may use cookies (such as the DoubleClick cookie) to serve ads based on your visit to our site or other websites on the Internet.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-xs text-slate-400">
              <li>
                Third-party vendors, including Google, use cookies to serve ads based on prior visits to our website.
              </li>
              <li>
                Google's use of advertising cookies enables it and its partners to serve ads based on visits to our sites and/or other sites on the Internet.
              </li>
              <li>
                Users may opt out of personalized advertising by visiting{' '}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:underline font-mono"
                >
                  Google Ads Settings
                </a>.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-indigo-400" />
              3. Analytics & Technical Logs
            </h2>
            <p>
              To monitor uptime and static website availability via Cloudflare Pages static edge network, basic anonymous technical request headers (such as user-agent, country code, and HTTP response codes) are processed by Cloudflare at the CDN edge. No user content or data payloads are analyzed or logged.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-emerald-400" />
              4. Contact Privacy Requests
            </h2>
            <p>
              If you have questions regarding this Privacy Policy or privacy practices, you can contact us via our{' '}
              <a href="/contact" className="text-cyan-400 hover:underline font-mono">
                Contact Page
              </a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};
