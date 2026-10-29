import React from 'react';
import { Bot, FileText, Database, ShieldCheck, Settings } from 'lucide-react';

interface HeaderProps {
  ollamaConnected: boolean;
  modelName: string;
  savedCount: number;
  onOpenArchive: () => void;
  onOpenLabInfo: () => void;
  onOpenFilesModal: () => void;
  ollamaUrl: string;
  onChangeOllamaUrl: (url: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  ollamaConnected,
  modelName,
  savedCount,
  onOpenArchive,
  onOpenLabInfo,
  onOpenFilesModal,
  ollamaUrl,
  onChangeOllamaUrl
}) => {
  const [showConfig, setShowConfig] = React.useState(false);
  const [urlInput, setUrlInput] = React.useState(ollamaUrl);

  const handleSaveConfig = () => {
    onChangeOllamaUrl(urlInput);
    setShowConfig(false);
  };

  return (
    <header className="glass-burgundy rounded-2xl p-5 mb-6 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left branding */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-200 text-xs font-semibold tracking-wider uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
            <span>College Lab Experiment 3</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            Intelligent Email Assistant
            <span className="text-xs font-normal px-2.5 py-0.5 rounded-md bg-rose-900/50 border border-rose-400/20 text-rose-200">
              Ollama + llama3.2
            </span>
          </h1>
          <p className="text-xs md:text-sm text-rose-200/80 mt-1">
            Zero Cloud APIs &bull; Sentence Transformers Precedent Retrieval &bull; Controllable Tone Engine &bull; Local CSV/JSON
          </p>
        </div>

        {/* Right action controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status badge */}
          <div 
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/40 border border-rose-500/20 text-xs text-rose-100 cursor-pointer hover:border-rose-400/40 transition-colors"
            onClick={() => setShowConfig(!showConfig)}
            title="Click to configure local Ollama endpoint"
          >
            <span className={`w-2.5 h-2.5 rounded-full ${ollamaConnected ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-amber-400 shadow-[0_0_8px_#fbbf24]'}`} />
            <span className="font-medium">
              {ollamaConnected ? `Ollama Ready (${modelName})` : `Ollama Local (${modelName})`}
            </span>
            <Settings className="w-3.5 h-3.5 text-rose-300 ml-1 opacity-70" />
          </div>

          <button
            id="saved-archive-btn"
            onClick={onOpenArchive}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-950/70 hover:bg-rose-900/80 border border-rose-500/30 text-xs font-medium text-white transition-all shadow-sm"
          >
            <Database className="w-3.5 h-3.5 text-rose-400" />
            <span>Saved Archive</span>
            <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-rose-500/30 text-rose-200 font-mono">
              {savedCount}
            </span>
          </button>

          <button
            id="lab-manual-btn"
            onClick={onOpenLabInfo}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-950/70 hover:bg-rose-900/80 border border-rose-500/30 text-xs font-medium text-white transition-all shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-rose-400" />
            <span>Lab Manual</span>
          </button>

          <button
            id="source-files-btn"
            onClick={onOpenFilesModal}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-950/70 hover:bg-rose-900/80 border border-rose-500/30 text-xs font-medium text-white transition-all shadow-sm"
          >
            <Bot className="w-3.5 h-3.5 text-rose-400" />
            <span>Code Files</span>
          </button>
        </div>
      </div>

      {/* Ollama endpoint config dropdown */}
      {showConfig && (
        <div className="mt-4 p-3.5 rounded-xl bg-black/60 border border-rose-500/30 text-xs text-rose-200 flex flex-col md:flex-row items-center gap-3 animate-fadeIn">
          <span className="font-semibold text-white whitespace-nowrap">Local Ollama Endpoint:</span>
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1 w-full bg-rose-950/60 border border-rose-500/30 rounded-lg px-3 py-1.5 text-white font-mono text-xs focus:outline-none focus:border-rose-400"
            placeholder="http://localhost:11434"
          />
          <button
            onClick={handleSaveConfig}
            className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs whitespace-nowrap transition-colors"
          >
            Update URL
          </button>
          <button
            onClick={() => setShowConfig(false)}
            className="text-xs text-rose-400 hover:text-white px-2 py-1"
          >
            Cancel
          </button>
        </div>
      )}
    </header>
  );
};
