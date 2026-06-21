import { Router } from 'express';
import { ConversationController } from '../controllers/conversation.controller';
import { ConversationService } from '../services/conversation.service';
import { ConversationRepository } from '../repositories/conversation.repository';
import { MessageRepository } from '../repositories/message.repository';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const conversationRepo = new ConversationRepository(prisma);
const messageRepo = new MessageRepository(prisma);
const conversationService = new ConversationService(conversationRepo, messageRepo);
const conversationController = new ConversationController(conversationService);

const router = Router();

router.post('/', conversationController.createConversation);
router.get('/:id', conversationController.getConversation);

export default router;