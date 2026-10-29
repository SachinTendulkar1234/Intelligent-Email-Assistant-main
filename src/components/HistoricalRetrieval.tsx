import React from 'react';
import { Search, CheckCircle2, History, ChevronRight } from 'lucide-react';
import { HistoricalEmail } from '../types';

interface HistoricalRetrievalProps {
  retrievedEmails: HistoricalEmail[];
  isProcessing: boolean;
  onSelectPrecedent?: (email: HistoricalEmail) => void;
}

export const HistoricalRetrieval: React.FC<HistoricalRetrievalProps> = ({
  retrievedEmails,
  isProcessing,
  onSelectPrecedent
}) => {
  return (
    <section className="glass-burgundy rounded-2xl p-5 mb-6">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-rose-500/20">
        <div className="flex items-center gap-2 text-white">
          <div className="p-1.5 rounded-lg bg-rose-950/80 border border-rose-500/30 text-rose-400">
            <Search className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Similar Historical Precedents</h3>
            <p className="text-[11px] text-rose-200/70">Lab Feature 4: Dense Sentence Transformers (all-MiniLM-L6-v2)</p>
          </div>
        </div>

        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-200 font-mono">
          Top 3 Cosine Matches
        </span>
      </div>

      {isProcessing ? (
        <div className="flex items-center gap-3 py-6 px-4 rounded-xl bg-black/40 border border-rose-500/20 text-xs text-rose-300 animate-pulse justify-center">
          <span className="w-4 h-4 border-2 border-rose-400/40 border-t-rose-400 rounded-full animate-spin" />
          <span>Generating dense vector embeddings & calculating cosine similarities across CSV corpus...</span>
        </div>
      ) : retrievedEmails.length > 0 ? (
        <div className="space-y-3">
          {retrievedEmails.map((email, idx) => {
            const pct = Math.round((email.similarity_score || 0.7) * 100);
            return (
              <div
                key={email.id || idx}
                className="p-3.5 rounded-xl bg-black/40 border border-rose-500/20 hover:border-rose-400/40 transition-all text-xs"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2 font-medium text-white truncate">
                    <span className="w-4 h-4 rounded-full bg-rose-900/60 flex items-center justify-center text-[10px] text-rose-200 font-mono">
                      {idx + 1}
                    </span>
                    <span className="truncate">{email.subject}</span>
                  </div>

                  <span className="shrink-0 px-2 py-0.5 rounded-md bg-rose-900/40 border border-rose-400/30 text-rose-200 font-mono font-semibold text-[11px]">
                    {pct}% match
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-rose-300/70 mb-2">
                  <span>{email.customer_name}</span>
                  <span>&bull;</span>
                  <span className="text-rose-400 font-medium">{email.intent}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/15 text-rose-100/90 text-[11.5px] leading-relaxed">
                  <span className="text-rose-300 font-semibold flex items-center gap-1 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 inline" />
                    Verified Precedent Resolution:
                  </span>
                  {email.resolution_notes}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-6 px-3 text-center text-xs text-rose-300/60 italic rounded-xl bg-black/20 border border-dashed border-rose-500/20">
          Enter an email and run the pipeline to retrieve semantically related historical cases from <code>historical_emails.csv</code>.
        </div>
      )}
    </section>
  );
};
