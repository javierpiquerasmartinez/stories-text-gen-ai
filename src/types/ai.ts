import type { Message } from '.';

export type Provider = 'openai' | 'anthropic';

export interface AIProvider {
    sendMessage: (messages: Message[]) => Promise<string>;
}