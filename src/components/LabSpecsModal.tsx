import React from 'react';
import { X, BookOpen, Terminal, CheckCircle, HelpCircle } from 'lucide-react';

interface LabSpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LabSpecsModal: React.FC<LabSpecsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-burgundy rounded-2xl w-full max-w-3xl max-h-[88vh] flex flex-col overflow-hidden border border-rose-500/30 shadow-[0_20px_60px_rgba(14,2,5,0.9)]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-rose-500/20">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-rose-400" />
              <span>Experiment 3 Lab Manual & Specifications</span>
            </h2>
            <p className="text-xs text-rose-200/70 mt-0.5">
              Intelligent Email Assistant using Ollama &bull; College Evaluation Guide
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-rose-300 hover:text-white hover:bg-rose-950/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-rose-100/90 leading-relaxed">
          {/* Aim */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1.5 text-rose-300">
              1. Aim of the Experiment
            </h3>
            <p className="bg-black/30 p-3.5 rounded-xl border border-rose-500/20 text-rose-100">
              To construct a local, privacy-first customer support email assistant utilizing <strong>Ollama (llama3.2)</strong> for local neural generation, <strong>Sentence Transformers (all-MiniLM-L6-v2)</strong> for semantic precedent retrieval over local CSV datasets, zero-shot intent categorization, tone modulation, and local file storage without any cloud API dependency.
            </p>
          </div>

          {/* Architecture Flow */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1.5 text-rose-300">
              2. Lab Algorithm & Workflow
            </h3>
            <div className="bg-black/30 p-4 rounded-xl border border-rose-500/20 space-y-2">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-900/60 flex items-center justify-center font-mono text-[10px] text-rose-300 shrink-0">1</span>
                <span><strong>Input Parsing:</strong> Extract Customer Name, Email, Subject, and Body using Pandas/Flask.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-900/60 flex items-center justify-center font-mono text-[10px] text-rose-300 shrink-0">2</span>
                <span><strong>Intent Classification:</strong> Zero-shot classification into business intent categories with confidence scores.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-900/60 flex items-center justify-center font-mono text-[10px] text-rose-300 shrink-0">3</span>
                <span><strong>Precedent Retrieval:</strong> Compute 384-dimensional dense vectors using Sentence Transformers; rank historical records via Cosine Similarity.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-900/60 flex items-center justify-center font-mono text-[10px] text-rose-300 shrink-0">4</span>
                <span><strong>Context-Grounded Generation:</strong> Synthesize customer query with historical resolution and prompt local <code>llama3.2</code> via Ollama.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-900/60 flex items-center justify-center font-mono text-[10px] text-rose-300 shrink-0">5</span>
                <span><strong>Controllable Tone Rewrite:</strong> Prompt <code>llama3.2</code> to rewrite reply across Formal, Friendly, Empathetic, Concise, and Urgent styles.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-900/60 flex items-center justify-center font-mono text-[10px] text-rose-300 shrink-0">6</span>
                <span><strong>Summarization:</strong> Extract sentiment, key discussion summary, and action items.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-900/60 flex items-center justify-center font-mono text-[10px] text-rose-300 shrink-0">7</span>
                <span><strong>Persistence:</strong> Append structured record to <code>data/saved_replies.json</code>.</span>
              </div>
            </div>
          </div>

          {/* Run Instructions */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1.5 text-rose-300 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-rose-400" />
              <span>3. Local Execution Commands</span>
            </h3>
            <div className="p-3.5 rounded-xl bg-black/60 border border-rose-500/25 font-mono text-[12px] text-rose-200 space-y-1">
              <div className="text-rose-400/80"># 1. Pull the 3B quantized llama model</div>
              <div>ollama pull llama3.2</div>
              <div className="text-rose-400/80 mt-2"># 2. Install dependencies</div>
              <div>pip install -r requirements.txt</div>
              <div className="text-rose-400/80 mt-2"># 3. Launch Flask server</div>
              <div>python app.py</div>
            </div>
          </div>

          {/* Viva Voce Questions */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1.5 text-rose-300 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-rose-400" />
              <span>4. Viva Voce Questions & Answers</span>
            </h3>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-black/30 border border-rose-500/15">
                <div className="font-semibold text-white mb-1">Q1: Why are dense Sentence Transformers superior to keyword search?</div>
                <div className="text-rose-200/80">A: Keyword search fails when words differ (e.g., "billed twice" vs "duplicate charge"). Sentence Transformers encode semantic meaning into dense vectors, identifying conceptual similarity regardless of vocabulary.</div>
              </div>
              <div className="p-3 rounded-xl bg-black/30 border border-rose-500/15">
                <div className="font-semibold text-white mb-1">Q2: How does Ollama ensure complete data privacy?</div>
                <div className="text-rose-200/80">A: Ollama processes weights entirely within the local host CPU/GPU on port 11434 without sending telemetry or prompts over the public Internet.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-rose-500/20 flex justify-end bg-black/20">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-semibold text-white transition-all shadow-sm"
          >
            Close Lab Specs
          </button>
        </div>
      </div>
    </div>
  );
};
