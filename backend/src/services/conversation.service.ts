import { ConversationRepository } from '../repositories/conversation.repository';
import { MessageRepository } from '../repositories/message.repository';
import { Conversation, Message } from '@prisma/client';
import logger from '../utils/logger';

export class ConversationService {
  constructor(
    private conversationRepo: ConversationRepository,
    private messageRepo: MessageRepository
  ) {}

  async createConversation(): Promise<Conversation> {
    return this.conversationRepo.create();
  }

  async getConversationWithMessages(id: string): Promise<{ conversation: Conversation; messages: Message[] } | null> {
    const conversation = await this.conversationRepo.findById(id);
    if (!conversation) return null;
    // The repository already includes messages via include
    return {
      conversation,
      messages: conversation.messages,
    };
  }

  async addMessage(conversationId: string, sender: 'USER' | 'AI', content: string): Promise<Message> {
    return this.messageRepo.create(conversationId, sender, content);
  }

  async getMessages(conversationId: string, limit?: number): Promise<Message[]> {
    return this.messageRepo.getByConversationId(conversationId, limit);
  }
}