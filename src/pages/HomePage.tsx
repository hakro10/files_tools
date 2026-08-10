import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { AdSlotHeader } from '../components/ads/AdSlotHeader';
import { AdSlotInline } from '../components/ads/AdSlotInline';
import { TOOLS } from '../data/toolsData';
import {
  Terminal,
  ShieldCheck,
  Zap,
  Lock,
  Braces,
  Database,
  Code,
  Binary,
  Layout,
  FileImage,
  FileText,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Cpu,
  Globe,
  FileCheck2
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Braces: <Braces className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
  Database: <Database className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
  Regex: <Code className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
  Binary: <Binary className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
  Layout: <Layout className="w-6 h-6 text-pink-600 dark:text-pink-400" />,
  FileImage: <FileImage className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />,
  FileText: <FileText className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
};

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* 1. Hero Title / Subtitle Section */}
        <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl overflow-hidden text-center space-y-6 transition-colors">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-0"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-0"></div>

          <div className="relative z-10 space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FilesTools.net • 100% Client-Side Micro-Tools Platform</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              Privacy-First File Tools & Utilities <br />
              <span className="bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 dark:from-cyan-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">
                Running 100% in Your Browser
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Convert JPG/PNG to PDF, extract PDF to JPG, compress images, decode JWTs, and format JSON/SQL directly inside your browser memory. Zero server uploads.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-xs font-mono text-slate-700 dark:text-slate-300">
              <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-2 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Zero Server Uploads</span>
              </div>
              <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-2 shadow-sm">
                <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>Instant In-Memory Speed</span>
              </div>
              <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-2 shadow-sm">
                <Lock className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span>Web Crypto & Wasm</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Top Header AdSlot (Positioned DIRECTLY BELOW Hero and ABOVE Tools Section per AdSense guidelines) */}
        <AdSlotHeader />

        {/* 3. Essential Tools Grid Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                File Processing & Micro-Tools Suite
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Select a tool to launch immediate client-side processing
              </p>
            </div>
            <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-semibold bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              10 Tools Ready
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOOLS.map((tool) => (
              <Link
                key={tool.id}
                to={`/tools/${tool.slug}`}
                className="group relative p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 hover:shadow-2xl transition-all duration-300 shadow-md flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 group-hover:scale-110 transition-transform">
                      {ICON_MAP[tool.iconName] || <Terminal className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />}
                    </div>
                    {tool.badge && (
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30">
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors mb-1.5">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                      {tool.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-semibold text-cyan-600 dark:text-cyan-400 group-hover:translate-x-1 transition-transform">
                  <span>Open Tool Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. Second Inline Article Ad Placeholder */}
        <AdSlotInline />

        {/* 5. Expanded SEO Explanation Section */}
        <section className="p-8 rounded-3xl bg-white/60 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 space-y-8 shadow-sm transition-colors">
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <Cpu className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Why FilesTools.net Client-Side Architecture Matters
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                Privacy-First Engineering Standards & High-Performance Execution
              </p>
            </div>
          </div>

          {/* Sub-Block 1: Security & Speed Core Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <div className="space-y-2 p-5 rounded-2xl bg-slate-100/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Zero Server Storage & Data Privacy Guarantee
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Traditional online converters upload your personal photos, scanned passports, confidential contracts, and API keys to remote cloud servers. This creates severe privacy risks and data leakage liabilities.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                FilesTools.net operates on a 100% client-side WebAssembly and HTML5 Canvas architecture. Your files are processed entirely in browser RAM session and never transmitted across the internet.
              </p>
            </div>

            <div className="space-y-2 p-5 rounded-2xl bg-slate-100/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                Sub-Second Local Execution Speed
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Because there are no network file uploads, cloud server queues, or backend render latency, FilesTools.net converts images and PDFs instantaneously.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Batch processing multi-file conversions, compressing high-resolution images, and formatting code occurs at local hardware speed.
              </p>
            </div>
          </div>

          {/* Sub-Block 2: Supported Web Standards & Infrastructure */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <div className="space-y-2 p-5 rounded-2xl bg-slate-100/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                Supported Web Standards (pdf-lib, JSZip & Web Crypto)
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Built with modern Web APIs: <code className="text-cyan-700 dark:text-cyan-300 font-mono">pdf-lib</code> for PDF generation, <code className="text-cyan-700 dark:text-cyan-300 font-mono">JSZip</code> for zip archiving, and native <code className="text-cyan-700 dark:text-cyan-300 font-mono">crypto.subtle</code> for HMAC SHA-256 JWT verifications.
              </p>
            </div>

            <div className="space-y-2 p-5 rounded-2xl bg-slate-100/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Cloudflare Pages & Apache Deployment Ready
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                FilesTools.net includes production static SPA configurations for Cloudflare Pages (<code className="text-cyan-700 dark:text-cyan-300 font-mono">wrangler.jsonc</code>), Netlify (<code className="text-cyan-700 dark:text-cyan-300 font-mono">_redirects</code>), and Apache (<code className="text-cyan-700 dark:text-cyan-300 font-mono">.htaccess</code>).
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
