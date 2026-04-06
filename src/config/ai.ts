import type { AIProviderConfig } from "../types/ai";

export const availableProviders: AIProviderConfig[] = [
    {
        id: 'openai',
        name: 'OpenAI',
        apiKeyId: 'OPENAI',
        models: [
            { id: 'gpt-5.4-nano', name: 'GPT-5.4 Nano' },
            { id: 'gpt-5.4-mini', name: 'GPT-5.4 Mini' },
            { id: 'dall-e-3', name: 'DALL-E 3' }
        ]
    },
    {
        id: 'groq',
        name: 'Groq',
        apiKeyId: 'GROQ',
        models: [
            { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B Instant' },
            { id: 'groq/compound', name: 'Compound' },
            { id: 'groq/compound-mini', name: 'Compound Mini' }
        ],
        baseURL: 'https://api.groq.com/openai/v1'
    }
]
