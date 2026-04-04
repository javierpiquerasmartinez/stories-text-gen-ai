import { providerConfig } from '../config/ai';
import type { Message } from '../types/';
import type { AIProvider } from '../types/ai';
import OpenAI from 'openai';

const openai = new OpenAI({apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true});

export class OpenAIProvider implements AIProvider {
    async *sendMessage(messages: Message[]): AsyncIterable<string> {
        const messagesForAPI = messages.map(msg => ({content: msg.content, role: msg.role}));
        const apiRequestParams = {
            model: providerConfig.model,
            messages: messagesForAPI,
            temperature: providerConfig.temperature,
        };
        if(!providerConfig.stream) {
            const response = await openai.chat.completions.create({...apiRequestParams, stream: false});
            if(!response.choices[0].message.content) throw new Error('No content in OpenAI response');
            yield response.choices[0].message.content;
            return
        }
        const response = await openai.chat.completions.create({...apiRequestParams, stream: true});
        for await (const chunk of response) {
            if(!chunk.choices[0].delta.content) continue;
            yield chunk.choices[0].delta.content;
        }
    }
}