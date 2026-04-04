import type { Message } from '../types'

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
        {message.content.split('\n\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </div>
  )
}
