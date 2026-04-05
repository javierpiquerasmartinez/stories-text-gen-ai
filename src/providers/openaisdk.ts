import { providerConfig } from '../config/ai';
import type { Message } from '../types';
import type { AIProvider } from '../types/ai';
import OpenAI from 'openai';

export class OpenAISDKProvider implements AIProvider {
    private model: string
    private client: OpenAI

    constructor({apiKey, baseURL, model}: {apiKey:string, baseURL?:string, model:string}) {
        this.model = model;
        this.client = new OpenAI({apiKey, baseURL, dangerouslyAllowBrowser: true});
    }

    async *sendMessage(messages: Message[]): AsyncIterable<string> {
        const messagesForAPI = messages.map(msg => ({content: msg.content, role: msg.role}));
        const apiRequestParams = {
            model: this.model,
            messages: messagesForAPI,
            temperature: providerConfig.temperature,
        };
        if(!providerConfig.stream) {
            const response = await this.client.chat.completions.create({...apiRequestParams, stream: false});
            if(!response.choices[0].message.content) throw new Error('No content in OpenAI response');
            yield response.choices[0].message.content;
            return
        }
        const response = await this.client.chat.completions.create({...apiRequestParams, stream: true});
        for await (const chunk of response) {
            if(!chunk.choices[0].delta.content) continue;
            yield chunk.choices[0].delta.content;
        }
    }
}