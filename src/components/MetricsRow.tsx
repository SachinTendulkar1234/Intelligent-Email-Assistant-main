import React from 'react';
import { Database, Cpu, Search, HardDrive } from 'lucide-react';

interface MetricsRowProps {
  historicalCount: number;
  modelName: string;
  retrievalEngine: string;
}

export const MetricsRow: React.FC<MetricsRowProps> = ({
  historicalCount,
  modelName,
  retrievalEngine
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-6">
      {/* Metric 1 */}
      <div className="glass-burgundy rounded-xl p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between text-rose-300/80 mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider">Historical Precedents</span>
          <Database className="w-4 h-4 text-rose-400" />
        </div>
        <div className="text-xl font-bold text-white tracking-tight">{historicalCount} Emails</div>
        <div className="text-[11px] text-rose-300/70 mt-1">Stored in historical_emails.csv</div>
      </div>

      {/* Metric 2 */}
      <div className="glass-burgundy rounded-xl p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between text-rose-300/80 mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider">Target LLM</span>
          <Cpu className="w-4 h-4 text-rose-400" />
        </div>
        <div className="text-xl font-bold font-mono text-white tracking-tight">{modelName}</div>
        <div className="text-[11px] text-rose-300/70 mt-1">Ollama local inference engine</div>
      </div>

      {/* Metric 3 */}
      <div className="glass-burgundy rounded-xl p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between text-rose-300/80 mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider">Semantic Retrieval</span>
          <Search className="w-4 h-4 text-rose-400" />
        </div>
        <div className="text-lg font-bold font-mono text-white tracking-tight truncate">{retrievalEngine}</div>
        <div className="text-[11px] text-rose-300/70 mt-1">Dense 384d Cosine Similarity</div>
      </div>

      {/* Metric 4 */}
      <div className="glass-burgundy rounded-xl p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between text-rose-300/80 mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider">Data Persistence</span>
          <HardDrive className="w-4 h-4 text-rose-400" />
        </div>
        <div className="text-xl font-bold text-white tracking-tight">CSV + JSON</div>
        <div className="text-[11px] text-rose-300/70 mt-1">Local file system in /data</div>
      </div>
    </div>
  );
};
