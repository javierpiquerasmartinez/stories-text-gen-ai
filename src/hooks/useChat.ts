import { useMemo, useState } from "react"
import type { Message } from "../types"
import { getProvider } from "../providers/factory"
import type { AISelection } from "../types/ai"

export default function useChat(aiSelection: AISelection) {
    const [messages, setMessages] = useState<Message[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    
    const provider = useMemo(() => {
        return getProvider({
            provider: aiSelection.provider,
            baseURL: aiSelection.baseUrl,
            apiKey: aiSelection.apiKey
        })
    }, [aiSelection.provider])

    const cleanContext = () => {
        if (loading) return
        setMessages([])
    }

    const sendMessage = async (content:string) => {
        if (loading) return
        setLoading(true)
        setError(null)
        const messagesForAPI: Message[] = [...messages, { id: crypto.randomUUID(), role: 'user', content }]
        setMessages(messagesForAPI)
        try {
            const response = provider.sendMessage({ messages: messagesForAPI, temperature: aiSelection.temperature, stream: aiSelection.stream, model: aiSelection.model })
            setMessages([...messagesForAPI, { id: crypto.randomUUID(), role: 'assistant', content: '' }])
            for await (const chunk of response) {
                setMessages(prev => {
                    const lastMessage = prev[prev.length - 1]
                    return [...prev.slice(0, -1), { ...lastMessage, content: lastMessage.content + chunk }]
                })
            }
        } catch (err) {
            setError('Failed to send message: ' + (err instanceof Error ? err.message : 'Unknown error'))
        } finally {
            setLoading(false)
        }
    }

    return { messages, sendMessage, loading, error, cleanContext }
}