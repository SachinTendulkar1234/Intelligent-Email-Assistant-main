/**
 * College Lab Experiment 3: Intelligent Email Assistant using Ollama
 * Theme: Glassy Burgundy
 * Features:
 * 1. Home dashboard
 * 2. Customer Name, Subject and Email input
 * 3. Customer intent detection
 * 4. Retrieve similar historical emails using Sentence Transformers
 * 5. Generate a professional AI reply using Ollama + retrieved context
 * 6. Rewrite reply with different tones
 * 7. Conversation summary & action items
 * 8. Save generated replies locally
 * 9. Display all results clearly
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MetricsRow } from './components/MetricsRow';
import { EmailInputForm } from './components/EmailInputForm';
import { IntentDisplay } from './components/IntentDisplay';
import { HistoricalRetrieval } from './components/HistoricalRetrieval';
import { ReplyGenerator } from './components/ReplyGenerator';
import { SummaryCard } from './components/SummaryCard';
import { ArchiveModal } from './components/ArchiveModal';
import { LabSpecsModal } from './components/LabSpecsModal';
import { ProjectFilesModal } from './components/ProjectFilesModal';

import {
  HistoricalEmail,
  SavedReply,
  IntentResult,
  ConversationSummary,
  EmailTone
} from './types';
import { HISTORICAL_EMAILS, SAMPLE_SCENARIOS } from './data/historicalEmails';
import { retrieveSimilarEmails } from './services/semanticRetrieval';
import {
  checkOllamaConnection,
  detectIntentOnline,
  generateReplyOnline,
  rewriteToneOnline,
  summarizeConversationOnline,
  DEFAULT_OLLAMA_URL,
  DEFAULT_MODEL
} from './services/ollamaService';

export default function App() {
  // Input State
  const [customerName, setCustomerName] = useState('Sarah Jenkins');
  const [customerEmail, setCustomerEmail] = useState('sarah.j@example.com');
  const [subject, setSubject] = useState('Double charged for monthly subscription');
  const [emailBody, setEmailBody] = useState(
    'Hello support, I was checking my bank statement today and noticed that I was billed twice for my Pro subscription on September 1st ($49.00 each). Could you please refund the duplicate charge immediately? Thanks, Sarah.'
  );

  // Processing & Inference State
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRewriting, setIsRewriting] = useState(false);
  const [currentTone, setCurrentTone] = useState<EmailTone>('Formal');
  const [intentResult, setIntentResult] = useState<IntentResult | null>(null);
  const [retrievedEmails, setRetrievedEmails] = useState<HistoricalEmail[]>([]);
  const [generatedReply, setGeneratedReply] = useState('');
  const [replyLatency, setReplyLatency] = useState<number | undefined>(undefined);
  const [modelUsed, setModelUsed] = useState(DEFAULT_MODEL);
  const [summaryData, setSummaryData] = useState<ConversationSummary | null>(null);

  // Ollama Connection State
  const [ollamaUrl, setOllamaUrl] = useState(DEFAULT_OLLAMA_URL);
  const [ollamaConnected, setOllamaConnected] = useState(false);

  // Local Storage Saved Replies State
  const [savedReplies, setSavedReplies] = useState<SavedReply[]>([]);
  const [hasSavedCurrent, setHasSavedCurrent] = useState(false);

  // Modals State
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [isLabInfoOpen, setIsLabInfoOpen] = useState(false);
  const [isFilesModalOpen, setIsFilesModalOpen] = useState(false);

  // Initialize saved replies from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ollama_saved_replies_v1');
      if (stored) {
        setSavedReplies(JSON.parse(stored));
      } else {
        // Preload default sample archive record matching data/saved_replies.json
        const initialRecord: SavedReply = {
          id: 'rep-2026-001',
          timestamp: new Date().toISOString(),
          customer_name: 'Marcus Vance',
          customer_email: 'm.vance@techstudio.com',
          subject: 'Charged twice after updating billing cycle',
          detected_intent: 'Refund Request',
          tone: 'Formal',
          summary: 'Customer Marcus Vance reported duplicate billing ($79 x 2) after prorated plan modification.',
          similar_email_id: 1,
          similarity_score: 0.884,
          generated_reply:
            'Dear Marcus,\n\nThank you for contacting our support team. We sincerely apologize for the inconvenience caused by the duplicate charge on your account following your billing cycle update.\n\nOur finance department has verified the duplicate transaction and processed an immediate refund of $79.00 to your original payment method. Depending on your financial institution, this credit will reflect in your account within 3 to 5 business days.\n\nPlease let us know if we can assist you with anything further.\n\nSincerely,\nCustomer Support Operations',
          model_used: 'llama3.2:latest'
        };
        setSavedReplies([initialRecord]);
        localStorage.setItem('ollama_saved_replies_v1', JSON.stringify([initialRecord]));
      }
    } catch {
      // Ignore storage errors
    }

    // Ping local Ollama daemon
    checkOllamaConnection(ollamaUrl).then((status) => {
      setOllamaConnected(status.connected);
    });
  }, [ollamaUrl]);

  // Handle Scenario Loader
  const handleLoadScenario = (scenarioId: string) => {
    const scenario = SAMPLE_SCENARIOS.find((s) => s.id === scenarioId);
    if (!scenario) return;
    setCustomerName(scenario.name);
    setCustomerEmail(scenario.email);
    setSubject(scenario.subject);
    setEmailBody(scenario.body);
    setHasSavedCurrent(false);
  };

  // Clear Form
  const handleClearForm = () => {
    setCustomerName('');
    setCustomerEmail('');
    setSubject('');
    setEmailBody('');
    setIntentResult(null);
    setRetrievedEmails([]);
    setGeneratedReply('');
    setSummaryData(null);
    setHasSavedCurrent(false);
  };

  // Run the Full Assistant Pipeline
  const handleRunPipeline = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailBody.trim() || !subject.trim()) return;

    setIsProcessing(true);
    setHasSavedCurrent(false);

    try {
      // Step 1: Customer Intent Detection (Feature 3)
      const intentRes = await detectIntentOnline(customerName, subject, emailBody, ollamaUrl, DEFAULT_MODEL);
      setIntentResult(intentRes);

      // Step 2: Retrieve Similar Historical Emails via Dense Cosine Similarity (Feature 4)
      const similarCases = retrieveSimilarEmails(subject, emailBody, 3);
      setRetrievedEmails(similarCases);

      // Step 3: Generate Grounded AI Reply with Ollama llama3.2 + Context (Feature 5)
      const replyData = await generateReplyOnline(
        customerName,
        subject,
        emailBody,
        intentRes.intent,
        similarCases,
        ollamaUrl,
        DEFAULT_MODEL
      );
      setGeneratedReply(replyData.reply);
      setReplyLatency(replyData.latency_sec);
      setModelUsed(replyData.model_used);
      setCurrentTone('Formal');

      // Step 4: Extract Conversation Summary & Action Items (Feature 7)
      const summaryRes = await summarizeConversationOnline(
        customerName,
        subject,
        emailBody,
        replyData.reply,
        intentRes.intent,
        ollamaUrl,
        DEFAULT_MODEL
      );
      setSummaryData(summaryRes);
    } catch (err) {
      console.error('Pipeline execution error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle Tone Selection (Feature 6)
  const handleToneSelect = async (tone: EmailTone) => {
    if (!generatedReply) return;
    setIsRewriting(true);
    setCurrentTone(tone);

    try {
      const rewritten = await rewriteToneOnline(generatedReply, customerName, tone, ollamaUrl, DEFAULT_MODEL);
      setGeneratedReply(rewritten.rewritten);
      setReplyLatency(rewritten.latency_sec);
    } catch (err) {
      console.error('Tone rewrite error:', err);
    } finally {
      setIsRewriting(false);
    }
  };

  // Save Generated Reply Locally (Feature 8)
  const handleSaveReply = () => {
    if (!generatedReply) return;

    const topMatch = retrievedEmails[0];
    const newRecord: SavedReply = {
      id: `rep-${Date.now()}`,
      timestamp: new Date().toISOString(),
      customer_name: customerName,
      customer_email: customerEmail,
      subject: subject,
      detected_intent: intentResult?.intent || 'General Inquiry',
      tone: currentTone,
      summary: summaryData?.summary || 'Support reply formulated and archived.',
      similar_email_id: topMatch ? topMatch.id : null,
      similarity_score: topMatch ? topMatch.similarity_score : 0,
      generated_reply: generatedReply,
      model_used: modelUsed
    };

    const updated = [newRecord, ...savedReplies];
    setSavedReplies(updated);
    try {
      localStorage.setItem('ollama_saved_replies_v1', JSON.stringify(updated));
    } catch {}

    setHasSavedCurrent(true);
  };

  // Delete Saved Reply
  const handleDeleteReply = (id: string) => {
    const updated = savedReplies.filter((r) => r.id !== id);
    setSavedReplies(updated);
    try {
      localStorage.setItem('ollama_saved_replies_v1', JSON.stringify(updated));
    } catch {}
  };

  // Export JSON file
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(savedReplies, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'saved_replies.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="min-h-screen bg-[#0c0205] text-[#fff1f2] relative overflow-x-hidden selection:bg-rose-500 selection:text-white">
      {/* Ambient Burgundy Glow Orbs */}
      <div className="fixed top-[-100px] left-[-80px] w-[500px] h-[500px] rounded-full bg-rose-950/40 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-150px] right-[-100px] w-[600px] h-[600px] rounded-full bg-rose-900/30 blur-[140px] pointer-events-none z-0" />
      <div className="fixed top-[40%] left-[30%] w-[450px] h-[450px] rounded-full bg-rose-950/20 blur-[130px] pointer-events-none z-0" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10">
        {/* Feature 1: Home Dashboard Header */}
        <Header
          ollamaConnected={ollamaConnected}
          modelName={DEFAULT_MODEL}
          savedCount={savedReplies.length}
          onOpenArchive={() => setIsArchiveOpen(true)}
          onOpenLabInfo={() => setIsLabInfoOpen(true)}
          onOpenFilesModal={() => setIsFilesModalOpen(true)}
          ollamaUrl={ollamaUrl}
          onChangeOllamaUrl={(newUrl) => setOllamaUrl(newUrl)}
        />

        {/* Feature 1: Dashboard Metrics */}
        <MetricsRow
          historicalCount={HISTORICAL_EMAILS.length}
          modelName={DEFAULT_MODEL}
          retrievalEngine="all-MiniLM-L6-v2"
        />

        {/* 2-Column Responsive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (5 Cols on large): Input & Precedent Retrieval */}
          <div className="lg:col-span-5 space-y-6">
            {/* Feature 2: Customer Input Form */}
            <EmailInputForm
              customerName={customerName}
              customerEmail={customerEmail}
              subject={subject}
              emailBody={emailBody}
              isProcessing={isProcessing}
              onCustomerNameChange={setCustomerName}
              onCustomerEmailChange={setCustomerEmail}
              onSubjectChange={setSubject}
              onEmailBodyChange={setEmailBody}
              onSubmit={handleRunPipeline}
              onClear={handleClearForm}
              onLoadScenario={handleLoadScenario}
            />

            {/* Feature 4: Sentence Transformers Precedent Retrieval */}
            <HistoricalRetrieval
              retrievedEmails={retrievedEmails}
              isProcessing={isProcessing}
            />
          </div>

          {/* Right Column (7 Cols on large): Intent, Grounded Reply, Tone Rewriting, Summary */}
          <div className="lg:col-span-7 space-y-6">
            {/* Feature 3: Intent Detection */}
            <IntentDisplay
              intentResult={intentResult}
              isProcessing={isProcessing}
            />

            {/* Feature 5, 6, 8: Generated AI Reply, Tone Rewriter & Local Save */}
            <ReplyGenerator
              generatedReply={generatedReply}
              isGenerating={isProcessing}
              isRewriting={isRewriting}
              currentTone={currentTone}
              latencySec={replyLatency}
              modelUsed={modelUsed}
              onReplyChange={setGeneratedReply}
              onToneSelect={handleToneSelect}
              onSaveReply={handleSaveReply}
              hasSaved={hasSavedCurrent}
            />

            {/* Feature 7: Conversation Summary & Action Items */}
            <SummaryCard
              summaryData={summaryData}
              isProcessing={isProcessing}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <ArchiveModal
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
        savedReplies={savedReplies}
        onDeleteReply={handleDeleteReply}
        onExportJSON={handleExportJSON}
      />

      <LabSpecsModal
        isOpen={isLabInfoOpen}
        onClose={() => setIsLabInfoOpen(false)}
      />

      <ProjectFilesModal
        isOpen={isFilesModalOpen}
        onClose={() => setIsFilesModalOpen(false)}
      />
    </div>
  );
}
