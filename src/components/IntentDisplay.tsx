import React from 'react';
import { Target, Activity } from 'lucide-react';
import { IntentResult } from '../types';

interface IntentDisplayProps {
  intentResult: IntentResult | null;
  isProcessing: boolean;
}

export const IntentDisplay: React.FC<IntentDisplayProps> = ({
  intentResult,
  isProcessing
}) => {
  const getBadgeColor = (intent: string) => {
    switch (intent) {
      case 'Refund Request':
        return 'bg-amber-950/80 border-amber-500/40 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.25)]';
      case 'Technical Issue':
        return 'bg-blue-950/80 border-blue-500/40 text-blue-200 shadow-[0_0_12px_rgba(59,130,246,0.25)]';
      case 'Urgent Escalation':
        return 'bg-rose-950/90 border-rose-500/50 text-rose-100 shadow-[0_0_14px_rgba(244,63,94,0.4)]';
      case 'Billing Inquiry':
        return 'bg-emerald-950/80 border-emerald-500/40 text-emerald-200 shadow-[0_0_12px_rgba(16,185,129,0.25)]';
      case 'Account Access':
        return 'bg-purple-950/80 border-purple-500/40 text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.25)]';
      default:
        return 'bg-rose-950/80 border-rose-500/40 text-rose-200 shadow-[0_0_12px_rgba(225,29,72,0.25)]';
    }
  };

  return (
    <section className="glass-burgundy rounded-2xl p-5 mb-6">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-rose-500/20">
        <div className="flex items-center gap-2 text-white">
          <div className="p-1.5 rounded-lg bg-rose-950/80 border border-rose-500/30 text-rose-400">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Detected Customer Intent</h3>
            <p className="text-[11px] text-rose-200/70">Lab Feature 3: Local Zero-shot Classification</p>
          </div>
        </div>

        {intentResult && !isProcessing && (
          <span className="text-[11px] font-mono text-rose-300/80">
            Latency: {intentResult.latency_sec}s
          </span>
        )}
      </div>

      {isProcessing ? (
        <div className="flex items-center gap-3 py-3 px-4 rounded-xl bg-black/40 border border-rose-500/20 text-xs text-rose-300 animate-pulse">
          <Activity className="w-4 h-4 text-rose-400 animate-spin" />
          <span>Classifying customer intent using local llama3.2 neural prompt...</span>
        </div>
      ) : intentResult ? (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-lg border text-xs font-semibold uppercase tracking-wider ${getBadgeColor(intentResult.intent)}`}>
                {intentResult.intent}
              </span>
              <span className="text-xs text-rose-200/80 font-mono">
                Model: {intentResult.model_used}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-rose-300 font-medium">Confidence:</span>
              <div className="w-24 h-2 rounded-full bg-black/60 border border-rose-500/30 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-rose-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.round(intentResult.confidence * 100)}%` }}
                />
              </div>
              <span className="font-mono text-rose-200 font-semibold">
                {Math.round(intentResult.confidence * 100)}%
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-rose-500/20 text-xs text-rose-100/90 leading-relaxed border-l-2 border-l-rose-500">
            <strong className="text-rose-300 font-medium">Reasoning: </strong>
            {intentResult.reasoning}
          </div>
        </div>
      ) : (
        <div className="py-4 px-3 text-center text-xs text-rose-300/60 italic rounded-xl bg-black/20 border border-dashed border-rose-500/20">
          Run the pipeline above to detect customer intent with confidence scores and reasoning.
        </div>
      )}
    </section>
  );
};
