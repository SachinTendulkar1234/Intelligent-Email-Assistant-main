import React from 'react';
import { X, Download, Trash2, Calendar, User, Tag, FileText } from 'lucide-react';
import { SavedReply } from '../types';

interface ArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedReplies: SavedReply[];
  onDeleteReply: (id: string) => void;
  onExportJSON: () => void;
}

export const ArchiveModal: React.FC<ArchiveModalProps> = ({
  isOpen,
  onClose,
  savedReplies,
  onDeleteReply,
  onExportJSON
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-burgundy rounded-2xl w-full max-w-4xl max-h-[88vh] flex flex-col overflow-hidden border border-rose-500/30 shadow-[0_20px_60px_rgba(14,2,5,0.9)]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-rose-500/20">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Local Saved Replies Archive</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-rose-900/60 border border-rose-500/30 text-rose-200 font-mono">
                {savedReplies.length} Records
              </span>
            </h2>
            <p className="text-xs text-rose-200/70 mt-0.5">
              Saved locally in <code>data/saved_replies.json</code> & localStorage
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-rose-300 hover:text-white hover:bg-rose-950/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
          {savedReplies.length === 0 ? (
            <div className="text-center py-16 text-rose-300/60 text-sm italic">
              No replies saved yet. Generate a reply and click "Save Reply Locally" to store it here.
            </div>
          ) : (
            savedReplies.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-black/45 border border-rose-500/20 hover:border-rose-400/40 transition-all text-xs space-y-2.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="font-semibold text-white text-sm truncate flex items-center gap-2">
                    <span>{item.subject}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-rose-900/50 text-rose-200 border border-rose-500/30">
                      {item.detected_intent}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-500/20">
                      {item.tone}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-rose-300/70 text-[11px] font-mono shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-rose-400" />
                    <span>{new Date(item.timestamp).toLocaleString()}</span>
                    <button
                      onClick={() => onDeleteReply(item.id)}
                      className="p-1 rounded text-rose-400 hover:text-rose-200 hover:bg-rose-950 transition-colors ml-2"
                      title="Delete entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-rose-200/80 flex items-center gap-3 text-[11px]">
                  <span>Customer: <strong className="text-white">{item.customer_name}</strong> ({item.customer_email})</span>
                  {item.similarity_score !== undefined && (
                    <span>&bull; Retrieval match: {Math.round(item.similarity_score * 100)}%</span>
                  )}
                </div>

                <div className="p-3 rounded-lg bg-black/60 border border-rose-500/15 text-rose-100 font-sans text-xs leading-relaxed whitespace-pre-wrap max-h-40 overflow-y-auto">
                  {item.generated_reply}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-rose-500/20 flex items-center justify-between gap-3 bg-black/20">
          <button
            onClick={onExportJSON}
            disabled={savedReplies.length === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-950/70 hover:bg-rose-900 border border-rose-500/30 text-xs font-semibold text-rose-100 transition-all disabled:opacity-40"
          >
            <Download className="w-3.5 h-3.5 text-rose-300" />
            <span>Download saved_replies.json</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-semibold text-white transition-all shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
