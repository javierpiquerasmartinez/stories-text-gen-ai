import type { Message } from '.';

export type Provider = 'openai' | 'groq';

export interface AIProvider {
    sendMessage: (messages: Message[]) => AsyncIterable<string>;
}