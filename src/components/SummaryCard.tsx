import React from 'react';
import { ListChecks, AlertTriangle, Smile, Meh, Frown, Flame } from 'lucide-react';
import { ConversationSummary } from '../types';

interface SummaryCardProps {
  summaryData: ConversationSummary | null;
  isProcessing: boolean;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  summaryData,
  isProcessing
}) => {
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return <Smile className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Frustrated':
        return <Flame className="w-3.5 h-3.5 text-rose-400" />;
      case 'Negative':
        return <Frown className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <Meh className="w-3.5 h-3.5 text-blue-400" />;
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'Critical':
        return 'bg-rose-950 border-rose-500 text-rose-200 shadow-[0_0_10px_rgba(244,63,94,0.4)]';
      case 'High':
        return 'bg-amber-950 border-amber-500/50 text-amber-200';
      case 'Low':
        return 'bg-emerald-950 border-emerald-500/50 text-emerald-200';
      default:
        return 'bg-blue-950 border-blue-500/50 text-blue-200';
    }
  };

  return (
    <section className="glass-burgundy rounded-2xl p-5 mb-6">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-rose-500/20">
        <div className="flex items-center gap-2 text-white">
          <div className="p-1.5 rounded-lg bg-rose-950/80 border border-rose-500/30 text-rose-400">
            <ListChecks className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Conversation Summary & Action Items</h3>
            <p className="text-[11px] text-rose-200/70">Lab Feature 7: Autonomous Extraction</p>
          </div>
        </div>

        {summaryData && !isProcessing && (
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-black/40 border border-rose-500/20 text-[11px] text-rose-200">
              {getSentimentIcon(summaryData.sentiment)}
              <span>{summaryData.sentiment}</span>
            </span>

            <span className={`px-2.5 py-0.5 rounded-md border text-[11px] font-medium ${getUrgencyBadge(summaryData.urgency_level)}`}>
              {summaryData.urgency_level} Urgency
            </span>
          </div>
        )}
      </div>

      {isProcessing ? (
        <div className="py-6 flex items-center justify-center gap-3 text-xs text-rose-300 animate-pulse">
          <span className="w-4 h-4 border-2 border-rose-400/40 border-t-rose-400 rounded-full animate-spin" />
          <span>Synthesizing conversation summary and actionable follow-ups...</span>
        </div>
      ) : summaryData ? (
        <div className="space-y-3.5">
          <div className="p-3.5 rounded-xl bg-black/40 border border-rose-500/20 text-xs md:text-sm text-rose-100/90 leading-relaxed">
            {summaryData.summary}
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-wider font-semibold text-rose-300/80 mb-2">
              Action Items Checklist:
            </h4>
            <ul className="space-y-1.5">
              {summaryData.action_items.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs text-rose-100 bg-rose-950/30 border border-rose-500/15 rounded-lg px-3 py-2"
                >
                  <span className="text-rose-400 mt-0.5 font-bold">&#10003;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="py-6 px-3 text-center text-xs text-rose-300/60 italic rounded-xl bg-black/20 border border-dashed border-rose-500/20">
          Summary and follow-up action items will be generated when the assistant pipeline runs.
        </div>
      )}
    </section>
  );
};
