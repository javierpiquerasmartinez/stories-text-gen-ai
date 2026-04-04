import { providerConfig } from '../config/ai';
import type { Message } from '../types/';
import type { AIProvider } from '../types/ai';
import OpenAI from 'openai';

const openai = new OpenAI({apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true});

export class OpenAIProvider implements AIProvider {
    async sendMessage(messages: Message[]): Promise<string> {
        const messagesForAPI = messages.map(msg => ({content: msg.content, role: msg.role}));
        const response = await openai.chat.completions.create({
            model: providerConfig.model,
            temperature: providerConfig.temperature,
            messages: messagesForAPI
        })
        if(!response.choices[0].message.content) throw new Error('No content in OpenAI response');
        return response.choices[0].message.content;
    }
}