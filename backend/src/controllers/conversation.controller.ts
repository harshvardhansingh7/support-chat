import { Request, Response, NextFunction } from 'express';
import { ConversationService } from '../services/conversation.service';
import logger from '../utils/logger';

export class ConversationController {
  constructor(private conversationService: ConversationService) {}

  /**
   * POST /api/conversations
   * Create a new conversation.
   */
  createConversation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const conversation = await this.conversationService.createConversation();
      res.status(201).json({
        success: true,
        data: {
          id: conversation.id,
          createdAt: conversation.createdAt,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /api/conversations/:id
   * Get conversation with messages.
   */
  getConversation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.conversationService.getConversationWithMessages(id);
      if (!result) {
        res.status(404).json({ success: false, error: 'Conversation not found' });
        return;
      }
      res.status(200).json({
        success: true,
        data: {
          conversation: result.conversation,
          messages: result.messages,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}