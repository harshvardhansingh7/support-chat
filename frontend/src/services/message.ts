import apiClient from './api';
import { SendMessageRequest, SendMessageResponse, Message } from '@/types';

export const messageService = {
  send: async (payload: SendMessageRequest): Promise<{
    conversationId: string;
    userMessage: Message;
    aiMessage: Message;
  }> => {
    const response = await apiClient.post<SendMessageResponse>('/chat/message', payload);
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to send message');
    }
    return response.data.data;
  },
};