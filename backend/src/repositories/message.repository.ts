import { PrismaClient, Message, Sender } from '@prisma/client';
import logger from '../utils/logger';

export class MessageRepository {
  constructor(private prisma: PrismaClient) {}

  async create(conversationId: string, sender: Sender, content: string): Promise<Message> {
    try {
      return await this.prisma.message.create({
        data: {
          conversationId,
          sender,
          content,
        },
      });
    } catch (error) {
      logger.error('Error creating message:', error);
      throw new Error('Failed to save message');
    }
  }

  async getByConversationId(conversationId: string, limit?: number): Promise<Message[]> {
    try {
      return await this.prisma.message.findMany({
        where: { conversationId },
        orderBy: { createdAt: 'asc' },
        take: limit,
      });
    } catch (error) {
      logger.error(`Error fetching messages for conversation ${conversationId}:`, error);
      throw new Error('Failed to retrieve messages');
    }
  }
}