import { HistoricalEmail, EmailScenario } from '../types';

export const HISTORICAL_EMAILS: HistoricalEmail[] = [
  {
    id: 1,
    customer_name: "Sarah Jenkins",
    customer_email: "sarah.j@example.com",
    subject: "Double charged for monthly subscription",
    email_body: "Hello support, I was checking my bank statement today and noticed that I was billed twice for my Pro subscription on September 1st ($49.00 each). Could you please refund the duplicate charge immediately? Thanks, Sarah.",
    intent: "Refund Request",
    resolution_notes: "Verified billing records, found accidental retry on payment gateway, processed immediate refund of $49.00 to original payment method within 3 business days.",
    similarity_keywords: "double charge, billed twice, duplicate payment, refund subscription"
  },
  {
    id: 2,
    customer_name: "Michael Chang",
    customer_email: "mchang@techcorp.io",
    subject: "API authentication failing with 401 Unauthorized",
    email_body: "Hi team, our production webhook service suddenly started receiving 401 Unauthorized errors when calling your /v2/events endpoint. Our API key was generated last month and hasn't been modified. Is there an outage or header requirement change?",
    intent: "Technical Issue",
    resolution_notes: "Investigated token expiration policy; suggested re-generating bearer token in developer dashboard and ensuring 'Authorization: Bearer <token>' header syntax. Issue resolved.",
    similarity_keywords: "401 unauthorized, api key failing, authentication error, webhook endpoint"
  },
  {
    id: 3,
    customer_name: "Elena Rostova",
    customer_email: "elena.rostova@gmail.com",
    subject: "Request for invoice copy with VAT number",
    email_body: "Good day, could you please re-issue our August invoice (INV-88214) including our company VAT number EU372091482 and registered legal address? Our finance department requires this for tax filing.",
    intent: "Billing Inquiry",
    resolution_notes: "Regenerated tax-compliant invoice INV-88214-REV with registered VAT EU372091482 and dispatched PDF copy to customer email within 2 hours.",
    similarity_keywords: "invoice copy, vat number, tax filing, receipt modification"
  },
  {
    id: 4,
    customer_name: "David Miller",
    customer_email: "david.m@construct.org",
    subject: "Unable to reset account password",
    email_body: "Hello, I have tried clicking 'Forgot Password' multiple times over the past 2 hours, but no reset link is arriving in my inbox or spam folder. My account email is david.m@construct.org. Please help me regain access.",
    intent: "Account Access",
    resolution_notes: "Discovered email deliverability suppression due to temporary bounce; cleared email suppression list and sent manual one-time secure password reset link valid for 24 hours.",
    similarity_keywords: "password reset, forgot password, not receiving email, account lockout"
  },
  {
    id: 5,
    customer_name: "Priya Sharma",
    customer_email: "priya.sharma@innovate.in",
    subject: "Urgent: Data export corrupted as CSV",
    email_body: "Dear Support, our quarterly compliance audit is tomorrow morning and the bulk CSV export tool is cutting off records after line 500 or generating corrupted characters for non-ASCII names. Please advise urgently!",
    intent: "Urgent Escalation",
    resolution_notes: "Identified UTF-8 BOM encoding issue on large exports; provided direct S3 presigned download of clean CSV and patched server export streaming buffer.",
    similarity_keywords: "corrupted export, csv export broken, urgent audit, data cut off"
  },
  {
    id: 6,
    customer_name: "Lucas Dubois",
    customer_email: "lucas@voyage-app.fr",
    subject: "Cancel annual renewal and downgrade to free",
    email_body: "Hello, I would like to disable auto-renewal for my Annual Plan which renews next week. I do not wish to be billed for another year as our project has ended. Please confirm cancellation.",
    intent: "Cancellation",
    resolution_notes: "Disabled auto-renewal immediately in stripe portal; confirmed account will remain active on Pro benefits until end of current cycle and then gracefully downgrade to Free tier.",
    similarity_keywords: "cancel renewal, downgrade account, stop subscription, auto-renew"
  },
  {
    id: 7,
    customer_name: "Amanda Torres",
    customer_email: "atorres@designhub.co",
    subject: "Feature Request: Figma token synchronization",
    email_body: "Hey guys, love the tool! Would it be possible to add direct synchronization for Figma design tokens in your upcoming roadmap? Our design team currently has to copy-paste hex colors manually every sprint.",
    intent: "Feature Request",
    resolution_notes: "Logged detailed feature request in Product backlog under ticket PRD-492; shared current community plugin workaround for automated JSON sync.",
    similarity_keywords: "feature request, figma integration, design tokens, roadmap suggestion"
  },
  {
    id: 8,
    customer_name: "Robert Kim",
    customer_email: "rkim99@university.edu",
    subject: "Student educational discount verification",
    email_body: "Dear Support Team, I am a university student and saw that you offer an 80% educational discount. I have attached my .edu email and student ID card. How can I apply this discount code to my account?",
    intent: "General Inquiry",
    resolution_notes: "Reviewed university credentials, approved student status, and generated personalized 80% discount promo code EDU-STU80-RKIM valid for 12 months.",
    similarity_keywords: "student discount, educational pricing, edu email, verification coupon"
  },
  {
    id: 9,
    customer_name: "Grace O'Connor",
    customer_email: "grace.oc@retailplus.com",
    subject: "Payment method declined repeatedly",
    email_body: "Hi, I'm trying to update our corporate credit card on file (MasterCard ending 4012), but your checkout form keeps showing 'Payment method declined by issuer'. My bank confirms the card is active with sufficient limit.",
    intent: "Billing Inquiry",
    resolution_notes: "Checked payment gateway error logs (3D Secure challenge timeout); advised customer to authorize international merchant flag or use secondary Visa card. Resolved successfully.",
    similarity_keywords: "payment declined, credit card error, checkout failing, card issuer"
  },
  {
    id: 10,
    customer_name: "Carlos Mendez",
    customer_email: "carlos@logistics-fast.com",
    subject: "Slow dashboard loading times during peak hours",
    email_body: "Hello, over the past week our operations team has experienced 10-15 second page load times between 9 AM and 11 AM EST. Can your engineering team investigate the latency on server cluster US-East?",
    intent: "Technical Issue",
    resolution_notes: "Investigated database indexing on tenant dashboard queries; deployed read-replica optimization which reduced average response time to under 380ms.",
    similarity_keywords: "dashboard slow, high latency, page load delay, server performance"
  },
  {
    id: 11,
    customer_name: "Hannah Abbott",
    customer_email: "hannah@greenclean.org",
    subject: "Account suspended unexpectedly",
    email_body: "Urgent: I woke up this morning to find my team's account suspended with an error 'Violation of Fair Use'. We only sent our regular monthly newsletter to 1,200 opted-in subscribers! Please restore our access.",
    intent: "Urgent Escalation",
    resolution_notes: "Investigated automated spam trigger falsely flagged by keyword heuristic; manually reinstated account, whitelisted sending IP, and issued apology credit.",
    similarity_keywords: "account suspended, ban appeal, restore access, false violation"
  },
  {
    id: 12,
    customer_name: "Kevin Patel",
    customer_email: "kpatel@finscale.io",
    subject: "Question about SOC2 and GDPR compliance reports",
    email_body: "Hello, our enterprise security committee requires your latest SOC 2 Type II audit report and Data Processing Addendum (DPA) before approving procurement. Where can we download these signed documents?",
    intent: "General Inquiry",
    resolution_notes: "Provided enterprise compliance portal link and sent countersigned GDPR DPA along with NDA-protected SOC 2 Type II compliance summary.",
    similarity_keywords: "soc2 report, gdpr compliance, security audit, enterprise dpa"
  }
];

export const SAMPLE_SCENARIOS: EmailScenario[] = [
  {
    id: "double_charge",
    label: "Duplicate Subscription Charge ($49)",
    name: "Sarah Jenkins",
    email: "sarah.j@example.com",
    subject: "Double charged for monthly subscription",
    body: "Hello support, I was checking my bank statement today and noticed that I was billed twice for my Pro subscription on September 1st ($49.00 each). Could you please refund the duplicate charge immediately? Thanks, Sarah.",
    expected_intent: "Refund Request"
  },
  {
    id: "api_401",
    label: "Webhook 401 Unauthorized Failure",
    name: "Michael Chang",
    email: "mchang@techcorp.io",
    subject: "API authentication failing with 401 Unauthorized",
    body: "Hi team, our production webhook service suddenly started receiving 401 Unauthorized errors when calling your /v2/events endpoint. Our API key was generated last month and hasn't been modified. Is there an outage or header requirement change?",
    expected_intent: "Technical Issue"
  },
  {
    id: "vat_invoice",
    label: "VAT Invoice Revision for Taxes",
    name: "Elena Rostova",
    email: "elena.rostova@gmail.com",
    subject: "Request for invoice copy with VAT number",
    body: "Good day, could you please re-issue our August invoice (INV-88214) including our company VAT number EU372091482 and registered legal address? Our finance department requires this for tax filing.",
    expected_intent: "Billing Inquiry"
  },
  {
    id: "password_reset",
    label: "Password Reset Email Not Received",
    name: "David Miller",
    email: "david.m@construct.org",
    subject: "Unable to reset account password",
    body: "Hello, I have tried clicking 'Forgot Password' multiple times over the past 2 hours, but no reset link is arriving in my inbox or spam folder. My account email is david.m@construct.org. Please help me regain access.",
    expected_intent: "Account Access"
  },
  {
    id: "urgent_csv",
    label: "Critical Corrupted Audit CSV Export",
    name: "Priya Sharma",
    email: "priya.sharma@innovate.in",
    subject: "Urgent: Data export corrupted as CSV",
    body: "Dear Support, our quarterly compliance audit is tomorrow morning and the bulk CSV export tool is cutting off records after line 500 or generating corrupted characters for non-ASCII names. Please advise urgently!",
    expected_intent: "Urgent Escalation"
  },
  {
    id: "cancel_renewal",
    label: "Annual Plan Auto-Renewal Cancel",
    name: "Lucas Dubois",
    email: "lucas@voyage-app.fr",
    subject: "Cancel annual renewal and downgrade to free",
    body: "Hello, I would like to disable auto-renewal for my Annual Plan which renews next week. I do not wish to be billed for another year as our project has ended. Please confirm cancellation.",
    expected_intent: "Cancellation"
  }
];
