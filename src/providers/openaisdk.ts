import type { Message } from '../types';
import type { AIProvider } from '../types/ai';
import OpenAI from 'openai';

export class OpenAISDKProvider implements AIProvider {
    private client: OpenAI

    constructor({apiKey, baseURL}: {apiKey:string, baseURL?:string}) {
        this.client = new OpenAI({apiKey, baseURL, dangerouslyAllowBrowser: true});
    }

    async *sendMessage({messages, temperature, stream, model}: {messages: Message[], temperature: number, stream: boolean, model: string}): AsyncIterable<string> {
        const messagesForAPI = messages.map(msg => ({content: msg.content, role: msg.role}));
        const apiRequestParams = {
            model: model,
            messages: messagesForAPI,
            temperature: temperature,
        };
        if(!stream) {
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