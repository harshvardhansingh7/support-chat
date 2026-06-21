import { Router } from 'express';
import conversationRoutes from './conversation.routes';
import chatRoutes from './chat.routes';

const router = Router();

router.use('/conversations', conversationRoutes);
router.use('/chat', chatRoutes);

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;