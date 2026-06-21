import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messageService } from '@/services/message';
import { conversationService } from '@/services/conversation';
import { Message } from '@/types';
import { useConversation } from './useConversation';

export function useChat() {
  const queryClient = useQueryClient();
  const { conversationId, createNewConversation, setConversation } = useConversation();

  // Fetch conversation messages when conversationId exists
  const {
    data: messages = [],
    isLoading: isLoadingMessages,
    error: messagesError,
    refetch: refetchMessages,
  } = useQuery({
    queryKey: ['conversation', conversationId, 'messages'],
    queryFn: async () => {
      if (!conversationId) return [];
      const data = await conversationService.get(conversationId);
      return data.messages as Message[];
    },
    enabled: !!conversationId,
    staleTime: Infinity, // Cache forever as conversation is immutable
    retry: false,
  });

  // Mutation to send a message
  const {
    mutate: sendMessage,
    isPending: isSending,
    error: sendError,
  } = useMutation({
    mutationFn: async ({ message, id }: { message: string; id?: string }) => {
      let convId = id || conversationId;
      if (!convId) {
        // Create new conversation first
        const newConv = await createNewConversation();
        convId = newConv.id;
      }
      return await messageService.send({
        conversationId: convId,
        message,
      });
    },
    onSuccess: (data) => {
      // Update conversationId if it was newly created
      if (!conversationId) {
        setConversation(data.conversationId);
      }
      // Update messages cache
      queryClient.setQueryData(
        ['conversation', data.conversationId, 'messages'],
        (old: Message[] = []) => {
          return [...old, data.userMessage, data.aiMessage];
        }
      );
      // Invalidate to refetch if needed
      queryClient.invalidateQueries({
        queryKey: ['conversation', data.conversationId, 'messages'],
      });
    },
    onError: (error) => {
      console.error('Send message error:', error);
    },
  });

  return {
    messages,
    isLoadingMessages,
    messagesError,
    isSending,
    sendError,
    sendMessage,
    refetchMessages,
    conversationId,
  };
}