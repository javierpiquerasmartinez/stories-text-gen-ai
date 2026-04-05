import type { Provider } from "../types/ai";

export const providerConfig: { 
    provider: Provider; 
    baseURL?: string;
    model: string; 
    temperature: number, 
    stream: boolean,
    apiKey: string
    } = {
    provider: 'openai',
    // baseURL: 'https://api.groq.com/openai/v1',
    model: 'gpt-4o-mini',
    temperature: 0.7,
    stream: true,
    apiKey: import.meta.env.VITE_OPENAI_API_KEY
}