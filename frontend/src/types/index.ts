export interface Message {
  id: string;
  content: string;
  sender: 'USER' | 'AI';
  createdAt: string;
}

export interface Conversation {
  id: string;
  createdAt: string;
  updatedAt?: string;
  messages?: Message[];
}

export interface SendMessageRequest {
  conversationId?: string;
  message: string;
}

export interface CreateConversationResponse {
  success: boolean;
  data: {
    id: string;
    createdAt: string;
  };
  error?: string;
}

export interface SendMessageResponse {
  success: boolean;
  data: {
    conversationId: string;
    userMessage: Message;
    aiMessage: Message;
  };
  error?: string;
}

export interface GetConversationResponse {
  success: boolean;
  data: {
    conversation: Conversation;
    messages: Message[];
  };
  error?: string;
}
