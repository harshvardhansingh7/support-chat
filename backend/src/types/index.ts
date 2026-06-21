import { Sender } from '@prisma/client';

export interface Conversation {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: Sender;
  content: string;
  createdAt: Date;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatRequest {
  conversationId?: string;
  message: string;
}

export interface ChatResponse {
  messageId: string;
  content: string;
  sender: Sender;
  conversationId: string;
}