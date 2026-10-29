/**
 * College Lab Experiment 3: Intelligent Email Assistant using Ollama
 * Frontend Application Controller
 */

// Global State
let currentPipelineData = {
  customer_name: "",
  customer_email: "",
  subject: "",
  email_body: "",
  intent: "",
  confidence: 0,
  reasoning: "",
  retrieved_context: [],
  generated_reply: "",
  current_tone: "Formal",
  summary: "",
  sentiment: "",
  action_items: [],
  urgency_level: ""
};

const SAMPLE_SCENARIOS = {
  double_charge: {
    name: "Sarah Jenkins",
    email: "sarah.j@example.com",
    subject: "Double charged for monthly subscription",
    body: "Hello support, I was checking my bank statement today and noticed that I was billed twice for my Pro subscription on September 1st ($49.00 each). Could you please refund the duplicate charge immediately? Thanks, Sarah."
  },
  api_401: {
    name: "Michael Chang",
    email: "mchang@techcorp.io",
    subject: "API authentication failing with 401 Unauthorized",
    body: "Hi team, our production webhook service suddenly started receiving 401 Unauthorized errors when calling your /v2/events endpoint. Our API key was generated last month and hasn't been modified. Is there an outage or header requirement change?"
  },
  vat_invoice: {
    name: "Elena Rostova",
    email: "elena.rostova@gmail.com",
    subject: "Request for invoice copy with VAT number",
    body: "Good day, could you please re-issue our August invoice (INV-88214) including our company VAT number EU372091482 and registered legal address? Our finance department requires this for tax filing."
  },
  password_reset: {
    name: "David Miller",
    email: "david.m@construct.org",
    subject: "Unable to reset account password",
    body: "Hello, I have tried clicking 'Forgot Password' multiple times over the past 2 hours, but no reset link is arriving in my inbox or spam folder. My account email is david.m@construct.org. Please help me regain access."
  },
  urgent_csv: {
    name: "Priya Sharma",
    email: "priya.sharma@innovate.in",
    subject: "Urgent: Data export corrupted as CSV",
    body: "Dear Support, our quarterly compliance audit is tomorrow morning and the bulk CSV export tool is cutting off records after line 500 or generating corrupted characters for non-ASCII names. Please advise urgently!"
  },
  cancel_sub: {
    name: "Lucas Dubois",
    email: "lucas@voyage-app.fr",
    subject: "Cancel annual renewal and downgrade to free",
    body: "Hello, I would like to disable auto-renewal for my Annual Plan which renews next week. I do not wish to be billed for another year as our project has ended. Please confirm cancellation."
  },
  student_discount: {
    name: "Robert Kim",
    email: "rkim99@university.edu",
    subject: "Student educational discount verification",
    body: "Dear Support Team, I am a university student and saw that you offer an 80% educational discount. I have attached my .edu email and student ID card. How can I apply this discount code to my account?"
  }
};

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  checkBackendStatus();
  fetchSavedRepliesCount();
});

// Check Ollama & Server Status
async function checkBackendStatus() {
  const chip = document.getElementById("ollama-status-chip");
  const text = document.getElementById("ollama-status-text");

  try {
    const res = await fetch("/api/status");
    if (!res.ok) throw new Error("Status endpoint error");
    const data = await res.json();

    if (data.ollama && data.ollama.connected) {
      chip.className = "status-chip online";
      text.textContent = `Ollama Online (${data.ollama.target_model})`;
    } else {
      chip.className = "status-chip";
      text.textContent = "Ollama Local (Offline / Simulated)";
    }

    if (data.dataset) {
      document.getElementById("metric-kb-count").textContent = `${data.dataset.historical_emails_count} Emails`;
      document.getElementById("metric-retrieval-engine").textContent = data.dataset.retrieval_engine.split(" ")[0];
    }
  } catch (err) {
    chip.className = "status-chip offline";
    text.textContent = "Flask Standalone";
  }
}

// Load Preset Scenarios
function loadSampleEmail(key) {
  if (!key || !SAMPLE_SCENARIOS[key]) return;
  const s = SAMPLE_SCENARIOS[key];
  document.getElementById("customer-name").value = s.name;
  document.getElementById("customer-email").value = s.email;
  document.getElementById("email-subject").value = s.subject;
  document.getElementById("email-body").value = s.body;
}

function clearForm() {
  document.getElementById("email-form").reset();
  document.getElementById("sample-select").value = "";
}

// Core Execution Pipeline
async function processEmailPipeline() {
  const customerName = document.getElementById("customer-name").value.trim();
  const customerEmail = document.getElementById("customer-email").value.trim();
  const subject = document.getElementById("email-subject").value.trim();
  const emailBody = document.getElementById("email-body").value.trim();

  if (!emailBody || !subject) {
    alert("Please enter subject and email content.");
    return;
  }

  const submitBtn = document.getElementById("submit-btn");
  const btnText = document.getElementById("btn-text");
  submitBtn.disabled = true;
  btnText.textContent = "Analyzing Intent & Retrieving Context...";

  currentPipelineData.customer_name = customerName;
  currentPipelineData.customer_email = customerEmail;
  currentPipelineData.subject = subject;
  currentPipelineData.email_body = emailBody;

  try {
    // Step 1: Detect Customer Intent
    const intentRes = await fetch("/api/detect-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_name: customerName,
        subject: subject,
        email_body: emailBody
      })
    });
    const intentData = await intentRes.json();
    currentPipelineData.intent = intentData.intent || "General Inquiry";
    currentPipelineData.confidence = intentData.confidence || 0.85;
    currentPipelineData.reasoning = intentData.reasoning || "";

    renderIntentUI(intentData);

    // Step 2: Retrieve Similar Historical Emails via Sentence Transformers
    btnText.textContent = "Retrieving Historical Context (Sentence Transformers)...";
    const simRes = await fetch("/api/retrieve-similar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject: subject,
        email_body: emailBody,
        top_k: 3
      })
    });
    const similarEmails = await simRes.json();
    currentPipelineData.retrieved_context = similarEmails;
    renderRetrievedEmails(similarEmails);

    // Step 3: Generate AI Reply via Ollama (llama3.2)
    btnText.textContent = "Generating Response with Ollama (llama3.2)...";
    const replyRes = await fetch("/api/generate-reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_name: customerName,
        subject: subject,
        email_body: emailBody,
        intent: currentPipelineData.intent,
        historical_context: similarEmails
      })
    });
    const replyData = await replyRes.json();
    currentPipelineData.generated_reply = replyData.reply || "";
    renderReplyUI(replyData);

    // Step 4: Extract Summary & Action Items
    btnText.textContent = "Extracting Summary & Action Items...";
    const sumRes = await fetch("/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_name: customerName,
        subject: subject,
        email_body: emailBody,
        reply_body: currentPipelineData.generated_reply
      })
    });
    const sumData = await sumRes.json();
    currentPipelineData.summary = sumData.summary;
    currentPipelineData.sentiment = sumData.sentiment;
    currentPipelineData.action_items = sumData.action_items;
    currentPipelineData.urgency_level = sumData.urgency_level;
    renderSummaryUI(sumData);

  } catch (err) {
    console.error("Pipeline error:", err);
    alert("Pipeline execution encountered an issue. Check console for details.");
  } finally {
    submitBtn.disabled = false;
    btnText.textContent = "Execute Assistant Pipeline";
  }
}

// Render Intent
function renderIntentUI(data) {
  const container = document.getElementById("intent-badge-container");
  container.innerHTML = `<span class="badge badge-active">${data.intent}</span>`;

  const confBar = document.getElementById("confidence-bar");
  const confPct = document.getElementById("confidence-pct");
  const pct = Math.round((data.confidence || 0.85) * 100);
  confBar.style.width = `${pct}%`;
  confPct.textContent = `${pct}%`;

  document.getElementById("intent-reasoning").textContent = data.reasoning || "Classified via semantic context.";
}

// Render Retrieved Historical Emails
function renderRetrievedEmails(list) {
  const container = document.getElementById("retrieved-emails-container");
  if (!list || list.length === 0) {
    container.innerHTML = '<div class="empty-state">No matching historical emails found.</div>';
    return;
  }

  container.innerHTML = list.map((item, index) => {
    const pct = Math.round((item.similarity_score || 0.7) * 100);
    return `
      <div class="retrieved-card">
        <div class="retrieved-header">
          <span class="retrieved-subject">${escapeHtml(item.subject)}</span>
          <span class="sim-score-badge">${pct}% match</span>
        </div>
        <div class="retrieved-customer">${escapeHtml(item.customer_name)} &bull; ${escapeHtml(item.intent)}</div>
        <div class="retrieved-resolution">
          <strong>Resolution Taken:</strong> ${escapeHtml(item.resolution_notes)}
        </div>
      </div>
    `;
  }).join("");
}

// Render AI Reply
function renderReplyUI(data) {
  document.getElementById("reply-output").value = data.reply;
  document.getElementById("reply-latency").textContent = `Inference Latency: ${data.latency_sec}s`;
  if (data.model_used) {
    document.getElementById("reply-model-tag").textContent = data.model_used;
  }

  // Reset tone selector to Formal
  document.querySelectorAll(".tone-btn").forEach(b => b.classList.remove("active"));
  const formalBtn = document.querySelector('.tone-btn[data-tone="Formal"]');
  if (formalBtn) formalBtn.classList.add("active");
  currentPipelineData.current_tone = "Formal";
}

// Handle Tone Rewriting
async function handleToneClick(tone) {
  const currentReply = document.getElementById("reply-output").value.trim();
  if (!currentReply) return;

  document.querySelectorAll(".tone-btn").forEach(b => b.classList.remove("active"));
  const targetBtn = document.querySelector(`.tone-btn[data-tone="${tone}"]`);
  if (targetBtn) targetBtn.classList.add("active");

  const spinner = document.getElementById("tone-spinner");
  spinner.classList.remove("hidden");

  try {
    const res = await fetch("/api/rewrite-tone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        current_reply: currentReply,
        customer_name: currentPipelineData.customer_name || "Customer",
        tone: tone
      })
    });
    const data = await res.json();
    if (data.rewritten_reply) {
      document.getElementById("reply-output").value = data.rewritten_reply;
      currentPipelineData.generated_reply = data.rewritten_reply;
      currentPipelineData.current_tone = tone;
      document.getElementById("reply-latency").textContent = `Rewritten in ${data.latency_sec}s (${tone})`;
    }
  } catch (err) {
    console.error("Tone rewrite error:", err);
  } finally {
    spinner.classList.add("hidden");
  }
}

// Render Summary
function renderSummaryUI(data) {
  document.getElementById("summary-text").textContent = data.summary || "Summary generated.";
  document.getElementById("sentiment-badge").textContent = `Sentiment: ${data.sentiment || "Neutral"}`;
  document.getElementById("urgency-badge").textContent = `Urgency: ${data.urgency_level || "Medium"}`;

  const listEl = document.getElementById("action-items-list");
  if (data.action_items && data.action_items.length > 0) {
    listEl.innerHTML = data.action_items.map(item => `<li>${escapeHtml(item)}</li>`).join("");
  } else {
    listEl.innerHTML = `<li>Review customer account</li><li>Confirm issue resolution</li>`;
  }
}

// Copy Reply
function copyReplyText() {
  const text = document.getElementById("reply-output").value;
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    const label = document.getElementById("copy-label");
    label.textContent = "Copied!";
    setTimeout(() => { label.textContent = "Copy"; }, 2000);
  });
}

// Save Current Reply to Local Storage
async function saveCurrentReply() {
  const replyText = document.getElementById("reply-output").value.trim();
  if (!replyText) {
    alert("No reply generated yet to save.");
    return;
  }

  const topMatch = (currentPipelineData.retrieved_context && currentPipelineData.retrieved_context[0]) || {};

  try {
    const res = await fetch("/api/save-reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_name: currentPipelineData.customer_name,
        customer_email: currentPipelineData.customer_email,
        subject: currentPipelineData.subject,
        detected_intent: currentPipelineData.intent,
        tone: currentPipelineData.current_tone,
        summary: currentPipelineData.summary,
        similar_email_id: topMatch.id || null,
        similarity_score: topMatch.similarity_score || 0,
        generated_reply: replyText
      })
    });

    const data = await res.json();
    if (data.success) {
      alert("Reply saved successfully to local storage (data/saved_replies.json)!");
      fetchSavedRepliesCount();
    }
  } catch (err) {
    alert("Failed to save reply locally: " + err.message);
  }
}

// Fetch Count
async function fetchSavedRepliesCount() {
  try {
    const res = await fetch("/api/saved-replies");
    const data = await res.json();
    if (Array.isArray(data)) {
      document.getElementById("saved-count-badge").textContent = data.length;
    }
  } catch (e) {}
}

// Archive Modal
async function openArchiveModal() {
  const modal = document.getElementById("archive-modal");
  modal.classList.remove("hidden");
  const content = document.getElementById("archive-modal-content");
  content.innerHTML = "<p>Loading saved replies...</p>";

  try {
    const res = await fetch("/api/saved-replies");
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      content.innerHTML = "<p>No saved replies found in local storage yet.</p>";
      return;
    }

    content.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:12px;">
        ${data.map(item => `
          <div style="background:rgba(25,3,9,0.7); border:1px solid rgba(244,63,94,0.2); border-radius:10px; padding:12px 16px;">
            <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
              <strong style="color:#fff;">${escapeHtml(item.subject)}</strong>
              <span style="font-size:12px; color:#fda4af;">${escapeHtml(item.detected_intent || "General")} &bull; ${escapeHtml(item.tone || "Formal")}</span>
            </div>
            <div style="font-size:12px; color:#fecdd3; margin-bottom:8px;">Customer: ${escapeHtml(item.customer_name)} (${escapeHtml(item.customer_email)})</div>
            <pre style="white-space:pre-wrap; font-family:inherit; font-size:13px; color:#fff1f2; background:rgba(10,1,3,0.5); padding:10px; border-radius:8px;">${escapeHtml(item.generated_reply)}</pre>
          </div>
        `).join("")}
      </div>
    `;
  } catch (err) {
    content.innerHTML = `<p style="color:#f87171;">Error loading archive: ${err.message}</p>`;
  }
}

function closeArchiveModal() {
  document.getElementById("archive-modal").classList.add("hidden");
}

function exportArchiveJSON() {
  fetch("/api/saved-replies")
    .then(r => r.json())
    .then(data => {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "saved_replies_export.json";
      a.click();
    });
}

// Lab Manual Modal
function openLabInfoModal() {
  document.getElementById("lab-modal").classList.remove("hidden");
}

function closeLabInfoModal() {
  document.getElementById("lab-modal").classList.add("hidden");
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
