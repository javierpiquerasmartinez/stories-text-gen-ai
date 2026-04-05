import type { Provider } from "../types/ai";

export const providerConfig: { 
    provider: Provider; 
    baseURL?: string;
    model: string; 
    temperature: number, 
    stream: boolean,
    apiKey: string
    } = {
    provider: 'groq',
    baseURL: 'https://api.groq.com/openai/v1',
    model: 'llama-3.1-8b-instant',
    temperature: 0.7,
    stream: true,
    apiKey: import.meta.env.VITE_GROQ_API_KEY
}