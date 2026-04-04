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
            const response = provider.sendMessage(messagesForAPI)
            setMessages([...messagesForAPI, { id: Date.now(), role: 'assistant', content: '' }])
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

    return { messages, sendMessage, loading, error }
}