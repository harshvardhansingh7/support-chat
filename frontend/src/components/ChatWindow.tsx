import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { Message } from '@/types';

interface ChatWindowProps {
  messages: Message[];
  isLoadingMessages: boolean;
  isSending: boolean;
  onSendMessage: (message: string) => void;
  conversationId?: string | null;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  isLoadingMessages,
  isSending,
  onSendMessage,
  conversationId,
}) => {
  return (
    <Card className="w-full max-w-3xl mx-auto h-[600px] flex flex-col shadow-lg">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2">
          <span>ShopVerse Support</span>
          {conversationId && (
            <span className="text-sm font-normal text-muted-foreground">
              (ID: {conversationId.slice(0, 8)})
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-hidden flex flex-col">
        <MessageList
          messages={messages}
          isLoading={isLoadingMessages}
          isSending={isSending}
        />
        <ChatInput
          onSendMessage={onSendMessage}
          isSending={isSending}
          disabled={isLoadingMessages}
        />
      </CardContent>
    </Card>
  );
};