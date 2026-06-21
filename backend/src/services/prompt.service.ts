import { Message } from '@prisma/client';

// Knowledge base for fictional ecommerce store "ShopVerse"
const KNOWLEDGE_BASE = `
Store Name: ShopVerse
Shipping Policy: We ship worldwide. Delivery takes 5-7 business days.
Return Policy: Returns are accepted within 30 days of purchase.
Refund Policy: Refunds are processed within 5 business days after return approval.
Support Hours: Monday to Friday, 9 AM to 6 PM (EST).
Contact: support@shopverse.com
`;

const SYSTEM_PROMPT = `
You are an AI customer support agent for ShopVerse, an online ecommerce store.
Your goal is to assist customers with their inquiries professionally and courteously.
You MUST base your answers on the following store policies and knowledge base.
Do not make up information not provided.
If you don't know the answer, politely say that you don't have that information and suggest contacting human support.

Knowledge Base:
${KNOWLEDGE_BASE}

Instructions:
- Be concise and helpful.
- Keep responses under 150 words.
- Use a friendly tone.
- If the user asks about topics outside the knowledge base, steer them to the official support channels.
`;

export class PromptService {
  /**
   * Build the full prompt for the LLM.
   * @param userMessage - The current user message
   * @param history - Array of previous messages (alternating user/AI)
   * @param maxHistoryMessages - Max number of recent messages to include
   * @returns Object containing system prompt and messages array for Groq API
   */
  // In prompt.service.ts
buildPrompt(
  userMessage: string,
  history: Message[] = [],
  maxHistoryMessages: number = 10
): { system: string; messages: Array<{ role: 'user' | 'assistant'; content: string }> } {
  const recentHistory = history.slice(-maxHistoryMessages);

  const chatHistory: Array<{ role: 'user' | 'assistant'; content: string }> = recentHistory.map((msg) => ({
    role: msg.sender === 'USER' ? 'user' : 'assistant',
    content: msg.content,
  }));

  chatHistory.push({ role: 'user', content: userMessage });

  return {
    system: SYSTEM_PROMPT,
    messages: chatHistory,
  };
}
}