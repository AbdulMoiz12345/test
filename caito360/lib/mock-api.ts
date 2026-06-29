import type { MeResponse, Document, Insight, TeamUser } from './types'

export const mockMe: MeResponse = {
  user: {
    id: "user-123",
    email: "moiz@acmecorp.com",
    fullName: "Moiz Khan",
    role: "owner",
    department: "finance",
    branch: "karachi"
  },
  tenant: { id: "tenant-abc", name: "Acme Corp" },
  plan: { id: "growth", name: "Growth", maxDocuments: 250, maxQuestions: 5000, maxSeats: 10 },
  usage: { documents: 12, questions: 340, tokens: 120000 }
}

export const mockInsights: Insight[] = [
  { id: "ins-1", category: "finance", title: "Revenue dropped 12% in Q3", body: "Based on uploaded financials, Q3 revenue fell compared to Q2 due to reduced enterprise deal closures in July and August.", severity: "high", createdAt: "2026-06-01T10:00:00Z" },
  { id: "ins-2", category: "churn", title: "3 enterprise accounts flagged at risk", body: "Usage patterns and support ticket frequency suggest elevated churn probability for 3 accounts renewing this quarter.", severity: "high", createdAt: "2026-06-02T10:00:00Z" },
  { id: "ins-3", category: "sales", title: "Pipeline conversion improving", body: "Lead-to-close rate improved by 8% compared to last quarter. Mid-market segment driving most of the gain.", severity: "medium", createdAt: "2026-06-05T10:00:00Z" },
  { id: "ins-4", category: "growth", title: "New market segment emerging", body: "Inbound inquiries from logistics sector up 34% this month. No current documents cover this vertical.", severity: "low", createdAt: "2026-06-10T10:00:00Z" }
]

export const mockDocuments: Document[] = [
  { id: "doc-1", filename: "Q3_Revenue_Report.pdf", status: "ready", docType: "financial", department: "finance", visibility: "tenant", uploadedAt: "2026-06-01T09:00:00Z", pageCount: 24 },
  { id: "doc-2", filename: "Sales_Pipeline_June.xlsx", status: "processing", docType: "crm", department: "sales", visibility: "department", uploadedAt: "2026-06-10T11:00:00Z", pageCount: null },
  { id: "doc-3", filename: "Customer_Churn_Analysis.pdf", status: "failed", errorReason: "File appears corrupted after page 6. Re-upload a clean copy.", docType: "report", department: "finance", visibility: "tenant", uploadedAt: "2026-06-12T08:00:00Z", pageCount: null },
  { id: "doc-4", filename: "HR_Policy_2026.pdf", status: "ready", docType: "report", department: "hr", visibility: "department", uploadedAt: "2026-05-20T09:00:00Z", pageCount: 18 },
  { id: "doc-5", filename: "Board_Deck_Q2.pptx", status: "ready", docType: "financial", department: "finance", visibility: "private", uploadedAt: "2026-05-15T14:00:00Z", pageCount: 32 }
]

export const mockUsers: TeamUser[] = [
  { id: "user-123", fullName: "Moiz Khan", email: "moiz@acmecorp.com", role: "owner", department: "finance", status: "active", lastLoginAt: "2026-06-29T08:00:00Z" },
  { id: "user-124", fullName: "Sara Ahmed", email: "sara@acmecorp.com", role: "admin", department: "sales", status: "active", lastLoginAt: "2026-06-28T14:00:00Z" },
  { id: "user-125", fullName: "Ali Raza", email: "ali@acmecorp.com", role: "member", department: "finance", status: "invited", lastLoginAt: null }
]

export const mockChatResponse = {
  messageId: "msg-" + Date.now(),
  content: "Based on your Q3 revenue report, total revenue was PKR 4.2M — down 12% from Q2. The primary driver was a 28% drop in enterprise deal closures during July, which your sales pipeline data attributes to two delayed procurement cycles in the manufacturing sector. Renewal rate held steady at 87%.\n\nLooking at the breakdown by segment: enterprise revenue fell to PKR 2.1M (from PKR 2.9M in Q2), while SMB revenue remained relatively stable at PKR 1.8M. The pipeline data shows 4 large deals that were expected to close in July slipped to Q4, accounting for roughly PKR 600K of the shortfall.",
  sources: [
    { chunkId: "chunk-1", filename: "Q3_Revenue_Report.pdf", page: 4, section: "Q3 Revenue Summary" },
    { chunkId: "chunk-2", filename: "Sales_Pipeline_June.xlsx", page: 1, section: "Enterprise Pipeline" }
  ]
}

export const mockConversations = [
  { id: "conv-1", title: "Q3 Revenue Analysis" },
  { id: "conv-2", title: "Churn risk deep dive" },
  { id: "conv-3", title: "HR policy questions" },
]

export const mockConversationMessages = {
  "conv-1": [
    { id: "msg-1", role: "user" as const, content: "What happened to revenue in Q3?", createdAt: "2026-06-20T10:00:00Z" },
    { id: "msg-2", role: "assistant" as const, content: "Based on your Q3 revenue report, total revenue was PKR 4.2M — down 12% from Q2. The primary driver was a 28% drop in enterprise deal closures during July.", sources: [{ filename: "Q3_Revenue_Report.pdf", page: 4, section: "Q3 Revenue Summary" }], createdAt: "2026-06-20T10:00:05Z" }
  ],
  "conv-2": [
    { id: "msg-3", role: "user" as const, content: "Which accounts are at highest churn risk?", createdAt: "2026-06-21T09:00:00Z" },
    { id: "msg-4", role: "assistant" as const, content: "Based on your churn analysis document, three enterprise accounts show elevated risk: Zenith Manufacturing (renewal in July, 45-day ticket spike), Atlas Retail (usage down 62% MoM), and CoreTech Ltd (primary champion departed last month). Combined ARR exposure is approximately PKR 3.2M.", sources: [{ filename: "Customer_Churn_Analysis.pdf", page: 2, section: "Risk Accounts" }], createdAt: "2026-06-21T09:00:06Z" }
  ],
  "conv-3": []
}
