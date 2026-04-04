interface ChatInputProps {
  onSend: (content: string) => void
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const handleSend = () => {
    const input = document.getElementById('chat-input') as HTMLTextAreaElement
    const content = input.value.trim()
    if (content) {
      onSend(content)
      input.value = ''
    }
  }

  return (
    <footer id="chat-input-area">
      <div id="chat-input-wrapper">
        <textarea
          id="chat-input"
          placeholder="Type your message…"
          rows={1}
        />
        <button id="send-button" onClick={handleSend}>
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M3.105 3.105a.75.75 0 0 1 .815-.162l13 5.5a.75.75 0 0 1 0 1.114l-13 5.5a.75.75 0 0 1-1.01-.952l1.97-4.926L3.105 3.105Zm1.98 5.5-1.234 3.086L14.438 10 3.851 6.309l1.234 3.086V8.605Z" />
          </svg>
          <span className="sr-only">Send</span>
        </button>
      </div>
    </footer>
  )
}
