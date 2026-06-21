import { useState, useEffect } from 'react';
import { conversationService } from '@/services/conversation';

const CONVERSATION_ID_KEY = 'support-conversation-id';

export function useConversation() {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load conversation ID from localStorage on mount
  useEffect(() => {
    const storedId = localStorage.getItem(CONVERSATION_ID_KEY);
    if (storedId) {
      setConversationId(storedId);
    }
    setIsLoading(false);
  }, []);

  // Create a new conversation
  const createNewConversation = async () => {
    try {
      const conv = await conversationService.create();
      localStorage.setItem(CONVERSATION_ID_KEY, conv.id);
      setConversationId(conv.id);
      return conv;
    } catch (error) {
      console.error('Failed to create conversation:', error);
      throw error;
    }
  };

  // Set conversation ID (e.g., when loading from a URL or existing)
  const setConversation = (id: string) => {
    localStorage.setItem(CONVERSATION_ID_KEY, id);
    setConversationId(id);
  };

  // Clear conversation (start fresh)
  const clearConversation = () => {
    localStorage.removeItem(CONVERSATION_ID_KEY);
    setConversationId(null);
  };

  return {
    conversationId,
    isLoading,
    createNewConversation,
    setConversation,
    clearConversation,
  };
}