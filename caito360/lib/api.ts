import { mockMe, mockDocuments, mockInsights, mockChatResponse, mockConversations, mockConversationMessages, mockUsers } from './mock-api'

const delay = (ms: number) => new Promise(r => setTimeout(r, ms))

export const api = {
  async getMe() {
    await delay(100)
    return mockMe
  },
  async getDashboard() {
    await delay(150)
    return {
      insights: mockInsights,
      documents: mockDocuments.slice(0, 3),
      plan: { id: "growth", name: "Growth" },
      usage: { documents: 12, questions: 340 }
    }
  },
  async getDocuments() {
    await delay(200)
    return { documents: mockDocuments }
  },
  async getDocumentStatus(id: string) {
    await delay(500)
    const doc = mockDocuments.find(d => d.id === id)
    return doc ? { ...doc, status: 'ready' as const } : { id, status: 'ready' as const, filename: 'Uploaded_Document.pdf', pageCount: 12 }
  },
  async getUploadUrl(filename: string) {
    await delay(300)
    return { uploadUrl: `https://mock-r2.example.com/upload/tenant-abc/doc-999/${filename}`, documentId: "doc-999" }
  },
  async postChat(message?: string, conversationId?: string) {
    await delay(200)
    return { ...mockChatResponse, messageId: "msg-" + Date.now() }
  },
  async getConversations() {
    await delay(100)
    return { conversations: mockConversations }
  },
  async getConversation(id: string) {
    await delay(150)
    const msgs = mockConversationMessages[id as keyof typeof mockConversationMessages] || []
    const conv = mockConversations.find(c => c.id === id) || { id, title: "New Chat" }
    return { conversation: conv, messages: msgs }
  },
  async getInsights() {
    await delay(150)
    return { insights: mockInsights }
  },
  async getUsers() {
    await delay(150)
    return { users: mockUsers }
  }
}
