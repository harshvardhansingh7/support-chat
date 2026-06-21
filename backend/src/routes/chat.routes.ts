import { Router } from 'express';
import { ChatController } from '../controllers/chat.controller';
import { ConversationService } from '../services/conversation.service';
import { GroqService } from '../services/groq.service';
import { PromptService } from '../services/prompt.service';
import { ConversationRepository } from '../repositories/conversation.repository';
import { MessageRepository } from '../repositories/message.repository';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const conversationRepo = new ConversationRepository(prisma);
const messageRepo = new MessageRepository(prisma);
const conversationService = new ConversationService(conversationRepo, messageRepo);
const groqService = new GroqService();
const promptService = new PromptService();

const chatController = new ChatController(conversationService, groqService, promptService);

const router = Router();

router.post('/message', chatController.sendMessage);

export default router;