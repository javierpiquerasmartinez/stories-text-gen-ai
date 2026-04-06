import type { TextMessage } from '../types';
import type { AIProvider } from '../types/ai';
import OpenAI from 'openai';

export class OpenAISDKProvider implements AIProvider {
    private client: OpenAI

    constructor({ apiKey, baseURL }: { apiKey: string, baseURL?: string }) {
        this.client = new OpenAI({ apiKey, baseURL, dangerouslyAllowBrowser: true });
    }

    async *sendMessage({ messages, temperature, stream, model }: { messages: TextMessage[], temperature: number, stream: boolean, model: string }): AsyncIterable<string> {
        const messagesForAPI = messages.map(msg => ({ content: msg.content, role: msg.role }));
        const apiRequestParams = {
            model: model,
            messages: messagesForAPI,
            temperature: temperature,
        };
        if (!stream) {
            const response = await this.client.chat.completions.create({ ...apiRequestParams, stream: false });
            if (!response.choices[0].message.content) throw new Error('No content in OpenAI response');
            yield response.choices[0].message.content;
            return
        }
        const response = await this.client.chat.completions.create({ ...apiRequestParams, stream: true });
        for await (const chunk of response) {
            if (!chunk.choices[0].delta.content) continue;
            yield chunk.choices[0].delta.content;
        }
    }

    async createImage({ prompt, temperature, stream, model }: { prompt: string, temperature: number, stream: boolean, model: string }) {
        const apiRequestParams = {
            model: model,
            prompt: prompt,
            n: 1
        }
        const response = await this.client.images.generate({ ...apiRequestParams });
        if (!response.data || response.data.length === 0) throw new Error('No data in OpenAI image response');
        if (!response.data[0].url) throw new Error('Missing url in OpenAI image response');
        return {
            id: crypto.randomUUID(),
            role: 'assistant' as const,
            content: {
                url: response.data[0].url,
                b64_json: response.data[0].b64_json,
                config: {
                    revised_prompt: response.data[0].revised_prompt,
                    output_format: response.output_format,
                    quality: response.quality,
                    size: response.size
                }
            },
            type: 'image' as const
        }
    }
}