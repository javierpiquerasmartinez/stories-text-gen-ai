import type { Provider } from "../types/ai";
import { OpenAISDKProvider } from "./openaisdk";

export const getProvider = ({provider, baseURL, apiKey}: 
    {provider: Provider, baseURL?: string, apiKey: string}) => {
    if(provider === 'openai') {
        return new OpenAISDKProvider({apiKey, baseURL});
    }
    if(provider === 'groq') {
        if(!baseURL) throw new Error('Base URL is required for Groq provider');
        return new OpenAISDKProvider({apiKey, baseURL});
    }
    throw new Error(`Unsupported provider: ${provider}`);
}
