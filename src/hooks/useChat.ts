import { useMemo, useState } from "react"
import type { Message } from "../types"
import { OpenAIProvider } from "../providers/openai"
import { providerConfig } from "../config/ai"

export default function useChat() {
    const [messages, setMessages] = useState<Message[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    
    const provider = useMemo(() => {
        if (providerConfig.provider === 'openai') {
            return new OpenAIProvider()
        }
        throw new Error(`Unsupported provider: ${providerConfig.provider}`)
    }, [])

    const sendMessage = async (content:string) => {
        if (loading) return
        setLoading(true)
        setError(null)
        const messagesForAPI: Message[] = [...messages, { id: Date.now(), role: 'user', content }]
        setMessages(messagesForAPI)
        try {
            const response = await provider.sendMessage(messagesForAPI)
            setMessages([...messagesForAPI, { id: Date.now(), role: 'assistant', content: response }])
        } catch (err) {
            setError('Failed to send message: ' + (err instanceof Error ? err.message : 'Unknown error'))
        } finally {
            setLoading(false)
        }
    }

    return { messages, sendMessage, loading, error }
}