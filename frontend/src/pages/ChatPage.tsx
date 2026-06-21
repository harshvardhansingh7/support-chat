import React from 'react';
import { useChat } from '@/hooks/useChat';
import { ChatWindow } from '@/components/ChatWindow';

const ChatPage: React.FC = () => {
  const {
    messages,
    isLoadingMessages,
    isSending,
    sendMessage,
    sendError,
    conversationId,
  } = useChat();

  // Show error if send fails
  React.useEffect(() => {
    if (sendError) {
      alert('Failed to send message. Please try again.');
    }
  }, [sendError]);

  const handleSendMessage = (message: string) => {
    sendMessage({ message, id: conversationId || undefined });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <ChatWindow
        messages={messages}
        isLoadingMessages={isLoadingMessages}
        isSending={isSending}
        onSendMessage={handleSendMessage}
        conversationId={conversationId}
      />
    </div>
  );
};

export default ChatPage;