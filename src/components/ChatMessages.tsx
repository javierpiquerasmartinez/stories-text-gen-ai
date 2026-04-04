import ChatMessage from './ChatMessage'
import type { Message } from '../types'
import { useEffect, useRef } from 'react'

interface ChatMessagesProps {
  messages: Message[]
}

export default function ChatMessages({ messages }: ChatMessagesProps) {

  const anchorDiv = useRef<HTMLDivElement>(null)
  const mainElement = useRef<HTMLElement>(null)

  useEffect(() => {
    const pageRendered = anchorDiv.current && mainElement.current
    const shouldAlwaysScroll = messages.length > 0 && (messages[messages.length - 1].role === 'user' || (messages[messages.length - 1].role === 'assistant' && messages[messages.length - 1].content === '') )
    const nearBottom = mainElement.current && (mainElement.current.scrollTop + mainElement.current.clientHeight >= mainElement.current.scrollHeight - 200)
    if (pageRendered && (nearBottom || shouldAlwaysScroll)) {
        anchorDiv.current!.scrollIntoView({ behavior: 'smooth' })
    }

  }, [messages])

  return (
    <main id="chat-messages" ref={mainElement}>
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} />
      ))}
      <div ref={anchorDiv}></div>
    </main>
  )
}
