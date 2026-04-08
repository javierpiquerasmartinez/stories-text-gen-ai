import { useMemo, useState } from "react";
import { getProvider } from "../providers/factory";
import type { Message } from "../types";
import type { AISelection } from "../types/ai";


export default function useImageChat(aiSelection: AISelection) {
    const [messages, setMessages] = useState<Message[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const provider = useMemo(() => {
        return getProvider({
            provider: aiSelection.provider,
            baseURL: aiSelection.baseUrl,
            apiKey: aiSelection.apiKey
        })
    }, [aiSelection])

    const cleanContext = () => {
        if (loading) return
        setMessages([])
    }

    const sendMessage = async (content: string) => {
        if (loading) return
        setLoading(true)
        setError(null)
        const messagesForAPI: Message[] = [...messages, { id: crypto.randomUUID(), role: 'user', content, type: 'text' }]
        setMessages([...messagesForAPI, { id: crypto.randomUUID(), role: 'assistant', content: '', type: 'text' }])

        try {
            const response = await provider.createImage({ prompt: content, temperature: aiSelection.temperature, stream: false, model: aiSelection.model })
            setMessages([...messagesForAPI, response])
        } catch (err) {
            setError('Failed to send message: ' + (err instanceof Error ? err.message : 'Unknown error'))
            setMessages(p => p.slice(0, -1))
        } finally {
            setLoading(false)
        }
    }

    return { messages, loading, error, setError, cleanContext, sendMessage }
}
