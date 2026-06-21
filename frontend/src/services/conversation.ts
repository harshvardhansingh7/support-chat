import apiClient from './api';
import { Conversation, GetConversationResponse, CreateConversationResponse, Message } from '@/types';

export const conversationService = {
  create: async (): Promise<Conversation> => {
    const response = await apiClient.post<CreateConversationResponse>('/conversations');
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to create conversation');
    }
    return response.data.data;
  },

  get: async (id: string): Promise<{ conversation: Conversation; messages: Message[] }> => {
    const response = await apiClient.get<GetConversationResponse>(`/conversations/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to fetch conversation');
    }
    return response.data.data;
  },
};