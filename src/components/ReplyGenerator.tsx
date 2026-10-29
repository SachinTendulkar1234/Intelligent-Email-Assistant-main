import React, { useState } from 'react';
import { Bot, Copy, Check, Bookmark, Sparkles, RefreshCw } from 'lucide-react';
import { EmailTone } from '../types';

interface ReplyGeneratorProps {
  generatedReply: string;
  isGenerating: boolean;
  isRewriting: boolean;
  currentTone: EmailTone;
  latencySec?: number;
  modelUsed: string;
  onReplyChange: (val: string) => void;
  onToneSelect: (tone: EmailTone) => void;
  onSaveReply: () => void;
  hasSaved: boolean;
}

const TONES: { key: EmailTone; label: string; desc: string }[] = [
  { key: 'Formal', label: 'Formal', desc: 'Executive, polished & enterprise' },
  { key: 'Friendly', label: 'Friendly', desc: 'Warm, polite & conversational' },
  { key: 'Empathetic', label: 'Empathetic', desc: 'Compassionate & reassuring' },
  { key: 'Concise', label: 'Concise', desc: 'Direct, brief bulleted update' },
  { key: 'Urgent', label: 'Urgent', desc: 'Priority escalation statement' },
];

export const ReplyGenerator: React.FC<ReplyGeneratorProps> = ({
  generatedReply,
  isGenerating,
  isRewriting,
  currentTone,
  latencySec,
  modelUsed,
  onReplyChange,
  onToneSelect,
  onSaveReply,
  hasSaved
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!generatedReply) return;
    navigator.clipboard.writeText(generatedReply);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="glass-burgundy rounded-2xl p-5 mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-rose-500/20">
        <div className="flex items-center gap-2 text-white">
          <div className="p-1.5 rounded-lg bg-rose-950/80 border border-rose-500/30 text-rose-400">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Grounded AI Reply</h3>
            <p className="text-[11px] text-rose-200/70">Lab Feature 5 &bull; Ollama llama3.2 + Precedent Context</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-black/40 border border-rose-500/20 text-rose-200">
            {modelUsed || 'llama3.2'}
          </span>
          <button
            onClick={handleCopy}
            disabled={!generatedReply}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-950/70 hover:bg-rose-900/80 border border-rose-500/30 text-xs text-rose-200 transition-all disabled:opacity-40"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Feature 6: Tone Selector Toolbar */}
      <div className="mb-3.5 p-2 rounded-xl bg-black/30 border border-rose-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-[11px] font-semibold text-rose-300 uppercase tracking-wider pl-1">
            Lab Feature 6: Tone Rewriter
          </span>
          {isRewriting && (
            <span className="text-[11px] text-rose-400 flex items-center gap-1 font-mono">
              <RefreshCw className="w-3 h-3 animate-spin" />
              Rewriting in {currentTone} tone...
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 mt-2">
          {TONES.map((t) => {
            const isActive = currentTone === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => onToneSelect(t.key)}
                disabled={!generatedReply || isGenerating || isRewriting}
                title={t.desc}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all text-center flex flex-col items-center justify-center ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-600 to-rose-700 text-white font-semibold border border-rose-400/40 shadow-[0_0_12px_rgba(225,29,72,0.4)]'
                    : 'bg-rose-950/40 hover:bg-rose-900/40 text-rose-200 border border-rose-500/20'
                } disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Reply Textarea */}
      <div className="relative mb-3">
        {isGenerating ? (
          <div className="h-56 flex flex-col items-center justify-center gap-3 rounded-xl bg-black/50 border border-rose-500/20 text-xs text-rose-300 animate-pulse">
            <span className="w-6 h-6 border-2 border-rose-500/40 border-t-rose-400 rounded-full animate-spin" />
            <span>Prompting local Ollama model (llama3.2) with retrieved historical precedent context...</span>
          </div>
        ) : (
          <textarea
            rows={8}
            value={generatedReply}
            onChange={(e) => onReplyChange(e.target.value)}
            placeholder="The grounded AI reply generated by Ollama with retrieved precedent will appear here..."
            className="w-full bg-black/45 border border-rose-500/25 rounded-xl p-4 text-xs md:text-sm text-rose-50 font-sans leading-relaxed focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 resize-y"
          />
        )}
      </div>

      {/* Footer controls: Save Reply Locally (Feature 8) */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-3 text-xs text-rose-300/70 font-mono">
          {latencySec !== undefined && (
            <span>Inference Latency: {latencySec}s</span>
          )}
          {generatedReply && (
            <span>&bull; {generatedReply.length} chars</span>
          )}
        </div>

        <button
          type="button"
          onClick={onSaveReply}
          disabled={!generatedReply || isGenerating || isRewriting}
          id="save-reply-locally-btn"
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all shadow-sm ${
            hasSaved
              ? 'bg-emerald-700/80 border border-emerald-500/40 text-emerald-100'
              : 'bg-rose-900 hover:bg-rose-800 border border-rose-400/30'
          } disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          {hasSaved ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-300" />
              <span>Saved in Local JSON Archive</span>
            </>
          ) : (
            <>
              <Bookmark className="w-3.5 h-3.5 text-rose-300" />
              <span>Save Reply Locally (Feature 8)</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
};
