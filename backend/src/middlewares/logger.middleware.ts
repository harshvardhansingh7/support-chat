import morgan from 'morgan';
import logger from '../utils/logger';

// Override morgan stream to use winston
const stream = {
  write: (message: string) => logger.info(message.trim()),
};

export const httpLogger = morgan('combined', { stream });