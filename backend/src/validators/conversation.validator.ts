import { z } from 'zod';

export const conversationIdSchema = z.object({
  id: z.string().uuid('Invalid conversation ID format'),
});

export const createConversationSchema = z.object({});