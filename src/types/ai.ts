import type { Message } from '.';

export type Provider = 'openai' | 'groq';

export interface AIModel {
    id: string;
    name: string;
}

export interface AIProviderConfig {
    id: Provider;
    name: string;
    baseURL?: string;
    apiKeyId: string;
    models: AIModel[];
}

export interface AISelection {
    provider: Provider;
    model: string;
    baseUrl?: string;
    apiKey: string;
    temperature: number;
    stream: boolean;
}

export interface AIProvider {
    sendMessage: ({messages, temperature, stream, model}: 
        {messages: Message[], temperature: number, stream: boolean, model: string}) 
        => AsyncIterable<string>;
}