import Groq from 'groq-sdk';
import { env } from '../config/env';
import logger from '../utils/logger';

export class GroqService {
  private groq: Groq;

  constructor() {
    if (!env.GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY is not defined');
    }
    this.groq = new Groq({
      apiKey: env.GROQ_API_KEY,
    });
  }

  /**
   * Send a chat completion request to Groq.
   * @param systemPrompt - The system prompt for the LLM
   * @param messages - Array of user/assistant messages (excluding system)
   * @param model - Model to use (default: llama3-70b-8192)
   * @returns The AI response content
   */
  async generateResponse(
    systemPrompt: string,
    messages: Array<{ role: 'user' | 'assistant'; content: string }>,
    model: string = 'openai/gpt-oss-20b'
  ): Promise<string> {
    try {
      const response = await this.groq.chat.completions.create({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        temperature: 0.5,
        max_tokens: 500,
        top_p: 0.9,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response content from Groq');
      }
      return content;
    } catch (error: any) {
      logger.error('Groq API error:', error);
      // Enhance error with friendly messages
      if (error.status === 401) {
        throw new Error('Invalid Groq API key. Please check your credentials.');
      } else if (error.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
        throw new Error('Request to AI service timed out. Please try again.');
      } else {
        throw new Error(`AI service error: ${error.message || 'Unknown error'}`);
      }
    }
  }
}