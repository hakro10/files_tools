import React from 'react';
import type { ToolMetadata } from '../../data/toolsData';
import { AdSlotInline } from '../ads/AdSlotInline';
import { CodeBlock } from './CodeBlock';
import { ShieldCheck, HelpCircle, Code2, BookOpen, CheckCircle2 } from 'lucide-react';

interface SeoContentProps {
  tool: ToolMetadata;
}

export const SeoContent: React.FC<SeoContentProps> = ({ tool }) => {
  return (
    <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80 space-y-10">
      {/* AdSlot Inline directly above bottom text */}
      <AdSlotInline />

      {/* Overview & How it works */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5 text-cyan-600 dark:text-cyan-400">
          <BookOpen className="w-5 h-5" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            How the {tool.name} Works
          </h2>
        </div>
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line bg-white dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm transition-colors">
          {tool.howItWorks.trim()}
        </div>
      </section>

      {/* Key Features List */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          Key Features & Capabilities
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {tool.features.map((feature, index) => (
            <div
              key={index}
              className="p-3.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 flex items-start gap-3 shadow-sm transition-colors"
            >
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 text-xs font-bold shrink-0 mt-0.5">
                {index + 1}
              </span>
              <span className="text-xs text-slate-700 dark:text-slate-300 leading-normal">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Code Snippets */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400">
          <Code2 className="w-5 h-5" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Developer Code Examples & Snippets
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Learn how to perform these operations programmatically in your applications using JavaScript, Python, or command-line utilities.
        </p>
        <div className="grid grid-cols-1 gap-4">
          {tool.codeSnippets.map((snippet, idx) => (
            <CodeBlock
              key={idx}
              code={snippet.code}
              language={snippet.language}
              title={`${snippet.title} (${snippet.language})`}
            />
          ))}
        </div>
      </section>

      {/* Security & Privacy FAQ */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400">
          <ShieldCheck className="w-5 h-5" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Security, Data Isolation & Privacy FAQ
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {tool.privacyFaq.map((faq, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 space-y-2 shadow-sm transition-colors"
            >
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                {faq.question}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-6">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
