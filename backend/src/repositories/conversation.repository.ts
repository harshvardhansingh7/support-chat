// backend/src/repositories/conversation.repository.ts
import { PrismaClient, Conversation } from '@prisma/client';
import { Message } from '@prisma/client';   // or from '@prisma/client'
import logger from '../utils/logger';

export class ConversationRepository {
  constructor(private prisma: PrismaClient) {}

  async create(): Promise<Conversation> {
    try {
      return await this.prisma.conversation.create({ data: {} });
    } catch (error) {
      logger.error('Error creating conversation:', error);
      throw new Error('Failed to create conversation');
    }
  }

  // ✅ Fix: return type includes messages
  async findById(id: string): Promise<(Conversation & { messages: Message[] }) | null> {
    try {
      return await this.prisma.conversation.findUnique({
        where: { id },
        include: {
          messages: {
            orderBy: { createdAt: 'asc' },
          },
        },
      });
    } catch (error) {
      logger.error(`Error finding conversation ${id}:`, error);
      throw new Error('Failed to retrieve conversation');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.conversation.delete({ where: { id } });
    } catch (error) {
      logger.error(`Error deleting conversation ${id}:`, error);
      throw new Error('Failed to delete conversation');
    }
  }
}