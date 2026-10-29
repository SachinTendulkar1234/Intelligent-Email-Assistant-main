# Experiment 3: Intelligent Email Assistant using Ollama

**Course:** Natural Language Processing / Applied Artificial Intelligence Lab  
**Architecture:** Python + Flask, Sentence Transformers, Pandas, Local Ollama (`llama3.2`)  
**Theme:** Glassy Burgundy Modern Interface  
**Cloud Dependency:** NONE (100% Local & Privacy-Preserving)

---

## 1. Objective
To design and implement a local, privacy-first **Intelligent Customer Email Assistant** capable of:
1. Automated **Customer Intent Detection** via zero-shot local LLM classification.
2. Grounded **Historical Context Retrieval** using dense semantic vector embeddings (`all-MiniLM-L6-v2` Sentence Transformers & Cosine Similarity) over historical CSV data.
3. Context-aware **AI Email Reply Generation** powered by Ollama's `llama3.2`.
4. Controllable **Tone Rewriting** (Formal, Friendly, Empathetic, Concise, Urgent).
5. **Conversation Summarization** with sentiment and actionable follow-ups.
6. Local durable record keeping in JSON/CSV format.

---

## 2. Project Directory Structure

```text
├── app.py                      # Flask application & API controller
├── requirements.txt            # Python dependencies (Flask, Pandas, Sentence-Transformers, etc.)
├── README.md                   # Lab manual, architecture & documentation
├── data/
│   ├── historical_emails.csv   # Historical resolution database for semantic retrieval
│   └── saved_replies.json      # Local persistent storage for generated replies
├── templates/
│   └── index.html              # Frontend template with Glassy Burgundy styling
└── static/
    ├── css/
    │   └── style.css           # Glassmorphism Burgundy styling & animations
    └── js/
        └── app.js              # Client controller & pipeline orchestrator
```

---

## 3. Step-by-Step Local Execution

### Prerequisites
- Python 3.9+ installed
- Ollama installed ([https://ollama.com](https://ollama.com))

### Commands
```bash
# 1. Pull the target model in Ollama
ollama pull llama3.2

# 2. Ensure Ollama service is running
ollama serve

# 3. Install Python dependencies
pip install -r requirements.txt

# 4. Launch the application
python app.py
```

Open your browser and navigate to:
```text
http://127.0.0.1:5000
```

---

## 4. Key Experiment Features

| # | Feature | Mechanism |
|---|---|---|
| **1** | **Dashboard** | Live Ollama connection health monitor, model tag, historical dataset counter. |
| **2** | **Customer Email Input** | Collects Customer Name, Email, Subject, and Body with 7 quick lab scenarios. |
| **3** | **Intent Detection** | Classifies into 8 categories (Billing, Tech, Refund, Account, Escalation, etc.). |
| **4** | **Semantic Retrieval** | Sentence Transformers calculates 384-dimensional embeddings; ranks historical tickets via cosine similarity. |
| **5** | **Grounded AI Generation** | Prompts `llama3.2` with customer query + retrieved precedent resolutions. |
| **6** | **Tone Rewriting** | 1-click transformation across *Formal*, *Friendly*, *Empathetic*, *Concise*, *Urgent*. |
| **7** | **Conversation Summary** | Extracted summary, sentiment analysis (Positive/Neutral/Frustrated), and action checklist. |
| **8** | **Local Storage** | Records appended to `data/saved_replies.json` with search, view, and JSON export. |

---

## 5. College Lab Viva Voce Questions & Answers

**Q1: Why do we use Sentence Transformers instead of keyword search (BM25 or regex)?**  
*Answer:* Keyword search fails when words differ (e.g., "billed twice" vs "duplicate charge"). Sentence Transformers maps phrases into a shared semantic embedding space where semantically related concepts have high cosine similarity regardless of specific vocabulary.

**Q2: How does Ollama avoid sending customer data to cloud APIs?**  
*Answer:* Ollama runs quantized weights locally using llama.cpp. All inference is processed on the local CPU/GPU on port `11434`, ensuring zero data egress and total GDPR/privacy compliance.

**Q3: What is the benefit of feeding historical context into the LLM prompt?**  
*Answer:* This implements Retrieval-Augmented Generation (RAG). It minimizes hallucinations and ensures the model adheres to official past precedent (e.g. 3-day refund turnaround policy).
