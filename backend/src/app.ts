import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { httpLogger } from './middlewares/logger.middleware';
import { errorHandler } from './middlewares/error.middleware';
import routes from './routes';
import { env } from './config/env';

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(httpLogger);

// Routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

export default app;