import { useRef, useState } from "react"

interface ChatInputProps {
  onSend: (content: string) => void,
  disabled?: boolean
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {

  const [userText, setUserText] = useState('')
  const chatInputRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    const content = userText.trim()
    if (content) {
      onSend(content)
      setUserText('')
      if (!chatInputRef.current) return
      chatInputRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleTextchange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserText(e.target.value)
    if (!chatInputRef.current) return
    chatInputRef.current.style.height = 'auto'
    chatInputRef.current.style.height = chatInputRef.current.scrollHeight + 'px'
  }

  return (
    <footer id="chat-input-area">
      <div id="chat-input-wrapper">
        <textarea
        ref={chatInputRef}
          id="chat-input"
          placeholder="Type your message…"
          value={userText}
          onChange={handleTextchange}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={disabled}
        />
        <button id="send-button" onClick={handleSend} disabled={disabled}>
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M3.105 3.105a.75.75 0 0 1 .815-.162l13 5.5a.75.75 0 0 1 0 1.114l-13 5.5a.75.75 0 0 1-1.01-.952l1.97-4.926L3.105 3.105Zm1.98 5.5-1.234 3.086L14.438 10 3.851 6.309l1.234 3.086V8.605Z" />
          </svg>
          <span className="sr-only">Send</span>
        </button>
      </div>
      <p className="input-hint">Enter to send &middot; Shift+Enter for new line</p>
    </footer>
  )
}
