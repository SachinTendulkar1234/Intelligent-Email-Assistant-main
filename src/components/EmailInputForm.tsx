import React from 'react';
import { Mail, Sparkles, RotateCcw, User, AtSign } from 'lucide-react';
import { SAMPLE_SCENARIOS } from '../data/historicalEmails';

interface EmailInputFormProps {
  customerName: string;
  customerEmail: string;
  subject: string;
  emailBody: string;
  isProcessing: boolean;
  onCustomerNameChange: (val: string) => void;
  onCustomerEmailChange: (val: string) => void;
  onSubjectChange: (val: string) => void;
  onEmailBodyChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClear: () => void;
  onLoadScenario: (scenarioId: string) => void;
}

export const EmailInputForm: React.FC<EmailInputFormProps> = ({
  customerName,
  customerEmail,
  subject,
  emailBody,
  isProcessing,
  onCustomerNameChange,
  onCustomerEmailChange,
  onSubjectChange,
  onEmailBodyChange,
  onSubmit,
  onClear,
  onLoadScenario
}) => {
  return (
    <section className="glass-burgundy rounded-2xl p-5 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-rose-500/20">
        <div className="flex items-center gap-2.5 text-white">
          <div className="p-2 rounded-lg bg-rose-950/80 border border-rose-500/30 text-rose-400">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">Incoming Customer Email</h2>
            <p className="text-xs text-rose-200/70">Lab Feature 2: Customer Name, Subject & Email Input</p>
          </div>
        </div>

        {/* Quick Scenario Picker */}
        <div className="flex items-center gap-2">
          <label htmlFor="scenario-select" className="text-xs text-rose-300 font-medium whitespace-nowrap">
            Load Scenario:
          </label>
          <select
            id="scenario-select"
            onChange={(e) => onLoadScenario(e.target.value)}
            defaultValue=""
            className="bg-black/50 border border-rose-500/30 rounded-xl px-3 py-1.5 text-xs text-rose-100 focus:outline-none focus:border-rose-400 cursor-pointer"
          >
            <option value="" disabled>-- Select Lab Test Email --</option>
            {SAMPLE_SCENARIOS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Name & Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-rose-200/90 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-rose-400" />
              Customer Name
            </label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => onCustomerNameChange(e.target.value)}
              placeholder="e.g. Sarah Jenkins"
              className="w-full bg-black/40 border border-rose-500/25 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-rose-300/30 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-rose-200/90 mb-1.5 flex items-center gap-1.5">
              <AtSign className="w-3.5 h-3.5 text-rose-400" />
              Customer Email Address
            </label>
            <input
              type="email"
              required
              value={customerEmail}
              onChange={(e) => onCustomerEmailChange(e.target.value)}
              placeholder="e.g. sarah.j@example.com"
              className="w-full bg-black/40 border border-rose-500/25 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-rose-300/30 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-all"
            />
          </div>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-xs font-medium text-rose-200/90 mb-1.5">
            Subject Line
          </label>
          <input
            type="text"
            required
            value={subject}
            onChange={(e) => onSubjectChange(e.target.value)}
            placeholder="e.g. Double charged for monthly subscription"
            className="w-full bg-black/40 border border-rose-500/25 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-rose-300/30 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-all"
          />
        </div>

        {/* Email Body */}
        <div>
          <label className="block text-xs font-medium text-rose-200/90 mb-1.5">
            Customer Email Message Body
          </label>
          <textarea
            required
            rows={5}
            value={emailBody}
            onChange={(e) => onEmailBodyChange(e.target.value)}
            placeholder="Paste or write the customer email content here..."
            className="w-full bg-black/40 border border-rose-500/25 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-rose-300/30 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-all resize-y leading-relaxed font-sans"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={isProcessing || !emailBody.trim()}
            id="run-assistant-pipeline-btn"
            className="flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-rose-600 via-rose-700 to-rose-900 hover:from-rose-500 hover:to-rose-800 border border-rose-400/40 shadow-[0_4px_20px_rgba(225,29,72,0.4)] hover:shadow-[0_6px_28px_rgba(225,29,72,0.6)] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Running Pipeline (Intent &bull; Retrieval &bull; Ollama)...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-rose-200 animate-pulse" />
                <span>Execute Assistant Pipeline</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClear}
            disabled={isProcessing}
            className="px-4 py-3 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 border border-rose-500/30 text-rose-200 text-sm font-medium flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </form>
    </section>
  );
};
