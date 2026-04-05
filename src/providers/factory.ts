import type { Provider } from "../types/ai";
import { OpenAISDKProvider } from "./openaisdk";

export const getProvider = ({provider, baseURL, apiKey, model}: 
    {provider: Provider, baseURL?: string, apiKey: string, model: string}) => {
    if(provider === 'openai') {
        return new OpenAISDKProvider({apiKey, baseURL, model});
    }
    if(provider === 'groq') {
        if(!baseURL) throw new Error('Base URL is required for Groq provider');
        return new OpenAISDKProvider({apiKey, baseURL, model});
    }
    throw new Error(`Unsupported provider: ${provider}`);
}
