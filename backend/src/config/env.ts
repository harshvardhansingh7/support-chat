import dotenv from 'dotenv';
dotenv.config();

export const env = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL as string,
  GROQ_API_KEY: process.env.GROQ_API_KEY as string,
} as const;

// Validate required env vars
if (!env.DATABASE_URL) throw new Error('DATABASE_URL is missing');
if (!env.GROQ_API_KEY) throw new Error('GROQ_API_KEY is missing');