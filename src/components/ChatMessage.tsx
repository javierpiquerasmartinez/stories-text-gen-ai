import type { Message } from '../types'
import Markdown from 'react-markdown'

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className={`message message--${message.role}`}>
      <span className="message__label">
        {message.role === 'user' ? 'You' : 'Assistant'}
      </span>
      <div className="message__bubble">
        <Markdown>{message.content}</Markdown>
      </div>
    </div>
  )
}
