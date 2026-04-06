import type { Message } from '../types'
import ImageMessageContent from './ImageMessageContent'
import TextMessageContent from './TextMessageContent'

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className={`message message--${message.role}`}>
      <span className="message__label">
        {message.role === 'user' ? 'You' : 'Assistant'}
      </span>
      <div className={`message__bubble${message.role === 'assistant' && message.type === 'text' && !message.content ? ' message__bubble--thinking' : ''}`}>
        {message.type === 'text' && <TextMessageContent content={message.content} />}
        {message.type === 'image' && <ImageMessageContent content={message.content} />}
      </div>
    </div>
  )
}
