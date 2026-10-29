import React, { useState } from 'react';
import { X, Copy, Check, FileCode, Database, Layers } from 'lucide-react';

interface ProjectFilesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FileKey = 'app_py' | 'requirements' | 'dataset' | 'readme';

export const ProjectFilesModal: React.FC<ProjectFilesModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<FileKey>('app_py');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const fileContents: Record<FileKey, { name: string; lang: string; content: string }> = {
    app_py: {
      name: 'app.py (Flask Backend)',
      lang: 'python',
      content: `import os
import json
import uuid
import datetime
import requests
import pandas as pd
import numpy as np
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__, template_folder="templates", static_folder="static")
CORS(app)

OLLAMA_BASE_URL = os.environ.get("OLLAMA_URL", "http://localhost:11434")
OLLAMA_MODEL = os.environ.get("OLLAMA_MODEL", "llama3.2")
HISTORICAL_CSV_PATH = "data/historical_emails.csv"
SAVED_REPLIES_PATH = "data/saved_replies.json"

# Feature 4: Sentence Transformers Precedent Retrieval
from sentence_transformers import SentenceTransformer
sentence_model = SentenceTransformer("all-MiniLM-L6-v2")

@app.route("/api/detect-intent", methods=["POST"])
def detect_intent():
    # Feature 3: Intent Detection via Ollama llama3.2 zero-shot classification
    ...

@app.route("/api/retrieve-similar", methods=["POST"])
def retrieve_similar():
    # Feature 4: Dense Vector Cosine Similarity
    ...

@app.route("/api/generate-reply", methods=["POST"])
def generate_reply():
    # Feature 5: Context-Grounded Reply Generation
    ...

@app.route("/api/rewrite-tone", methods=["POST"])
def rewrite_tone():
    # Feature 6: Tone Rewriter (Formal, Friendly, Empathetic, Concise, Urgent)
    ...

@app.route("/api/summarize", methods=["POST"])
def summarize():
    # Feature 7: Autonomous Conversation Summary
    ...

@app.route("/api/save-reply", methods=["POST"])
def save_reply():
    # Feature 8: Local Storage to JSON
    ...

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)`
    },
    requirements: {
      name: 'requirements.txt',
      lang: 'text',
      content: `flask>=3.0.0
flask-cors>=4.0.0
pandas>=2.0.0
sentence-transformers>=2.2.0
requests>=2.31.0
scikit-learn>=1.3.0
numpy>=1.24.0`
    },
    dataset: {
      name: 'data/historical_emails.csv',
      lang: 'csv',
      content: `id,customer_name,customer_email,subject,email_body,intent,resolution_notes
1,Sarah Jenkins,sarah.j@example.com,Double charged for monthly subscription,"...","Refund Request","Processed refund of $49.00 to original payment method within 3 business days."
2,Michael Chang,mchang@techcorp.io,API authentication failing with 401 Unauthorized,"...","Technical Issue","Suggested re-generating bearer token and using 'Authorization: Bearer <token>'."
3,Elena Rostova,elena.rostova@gmail.com,Request for invoice copy with VAT number,"...","Billing Inquiry","Regenerated invoice INV-88214-REV with registered VAT EU372091482."
4,David Miller,david.m@construct.org,Unable to reset account password,"...","Account Access","Cleared email suppression list and dispatched one-time reset link."
5,Priya Sharma,priya.sharma@innovate.in,Urgent: Data export corrupted as CSV,"...","Urgent Escalation","Patched streaming buffer and provided direct S3 presigned clean CSV download."`
    },
    readme: {
      name: 'README.md',
      lang: 'markdown',
      content: `# Experiment 3: Intelligent Email Assistant using Ollama
College Lab Project - NLP & Applied AI

## Execution:
ollama pull llama3.2
ollama serve
pip install -r requirements.txt
python app.py

Access application at: http://localhost:5000`
    }
  };

  const current = fileContents[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-burgundy rounded-2xl w-full max-w-4xl max-h-[88vh] flex flex-col overflow-hidden border border-rose-500/30 shadow-[0_20px_60px_rgba(14,2,5,0.9)]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-rose-500/20">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileCode className="w-5 h-5 text-rose-400" />
              <span>Project Source Code & Dataset Files</span>
            </h2>
            <p className="text-xs text-rose-200/70 mt-0.5">
              Source files created for offline local execution with Python + Flask
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-rose-300 hover:text-white hover:bg-rose-950/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="flex items-center gap-2 p-3 bg-black/40 border-b border-rose-500/20 overflow-x-auto">
          {(Object.keys(fileContents) as FileKey[]).map((k) => (
            <button
              key={k}
              onClick={() => { setActiveTab(k); setCopied(false); }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
                activeTab === k
                  ? 'bg-rose-900/90 text-white border border-rose-500/40 shadow-sm'
                  : 'text-rose-300/80 hover:text-white hover:bg-rose-950/40'
              }`}
            >
              {fileContents[k].name}
            </button>
          ))}

          <button
            onClick={handleCopy}
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 border border-rose-500/30 text-xs text-rose-200 transition-colors shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>

        {/* Code view */}
        <div className="flex-1 overflow-y-auto p-5 bg-black/60 font-mono text-xs text-rose-100 leading-relaxed">
          <pre className="whitespace-pre-wrap">{current.content}</pre>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-rose-500/20 flex justify-between items-center bg-black/20 text-xs text-rose-300/70">
          <span>Run locally with: <code>python app.py</code></span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-semibold text-white transition-all shadow-sm"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
