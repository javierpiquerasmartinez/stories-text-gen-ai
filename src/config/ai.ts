import type { Provider } from "../types/ai";

export const providerConfig: { provider: Provider; model: string; temperature: number } = {
    provider: 'openai',
    model: 'gpt-4o-mini',
    temperature: 0.7
}