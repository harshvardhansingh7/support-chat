import { Request, Response, NextFunction } from 'express';
import { ConversationService } from '../services/conversation.service';
import { GroqService } from '../services/groq.service';
import { PromptService } from '../services/prompt.service';
import { sendMessageSchema } from '../validators/message.validator';
import logger from '../utils/logger';

export class ChatController {
  constructor(
    private conversationService: ConversationService,
    private groqService: GroqService,
    private promptService: PromptService
  ) {}

  /**
   * POST /api/chat/message
   * Send a message and get AI response.
   */
  sendMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate input
      const parseResult = sendMessageSchema.safeParse(req.body);
      if (!parseResult.success) {
        res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: parseResult.error.errors,
        });
        return;
      }

      const { conversationId, message } = parseResult.data;

      // Determine conversation: use existing or create new
// In chat.controller.ts, inside sendMessage
let convId: string;
if (conversationId) {
  const existing = await this.conversationService.getConversationWithMessages(conversationId);
  if (existing) {
    convId = conversationId;
  } else {
    // If provided ID doesn't exist, create new
    const newConv = await this.conversationService.createConversation();
    convId = newConv.id;
  }
} else {
  const newConv = await this.conversationService.createConversation();
  convId = newConv.id;
}

      // Save user message
      const userMessage = await this.conversationService.addMessage(convId, 'USER', message);

      // Fetch conversation history (include user message, but we just saved it)
      const messages = await this.conversationService.getMessages(convId, 20); // limit for context

      // Build prompt
      const { system, messages: chatMessages } = this.promptService.buildPrompt(
        message,
        messages.slice(0, -1) // exclude the current user message (it's already added by buildPrompt)
      );

      // Call Groq
      const aiResponseText = await this.groqService.generateResponse(system, chatMessages);

      // Save AI response
      const aiMessage = await this.conversationService.addMessage(convId, 'AI', aiResponseText);

      // Return response
      res.status(200).json({
        success: true,
        data: {
          conversationId: convId,
          userMessage: {
            id: userMessage.id,
            content: userMessage.content,
            sender: userMessage.sender,
            createdAt: userMessage.createdAt,
          },
          aiMessage: {
            id: aiMessage.id,
            content: aiMessage.content,
            sender: aiMessage.sender,
            createdAt: aiMessage.createdAt,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  };
}