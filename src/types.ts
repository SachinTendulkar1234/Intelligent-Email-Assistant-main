export interface HistoricalEmail {
  id: number;
  customer_name: string;
  customer_email: string;
  subject: string;
  email_body: string;
  intent: string;
  resolution_notes: string;
  similarity_keywords?: string;
  similarity_score?: number;
}

export interface SavedReply {
  id: string;
  timestamp: string;
  customer_name: string;
  customer_email: string;
  subject: string;
  detected_intent: string;
  tone: string;
  summary: string;
  similar_email_id?: number | null;
  similarity_score?: number;
  generated_reply: string;
  model_used: string;
}

export interface IntentResult {
  intent: string;
  confidence: number;
  reasoning: string;
  model_used: string;
  latency_sec: number;
}

export interface ConversationSummary {
  summary: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative' | 'Frustrated';
  action_items: string[];
  urgency_level: 'Low' | 'Medium' | 'High' | 'Critical';
  latency_sec?: number;
}

export interface EmailScenario {
  id: string;
  label: string;
  name: string;
  email: string;
  subject: string;
  body: string;
  expected_intent: string;
}

export type EmailTone = 'Formal' | 'Friendly' | 'Empathetic' | 'Concise' | 'Urgent';
