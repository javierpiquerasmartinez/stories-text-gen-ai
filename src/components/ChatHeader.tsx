interface ChatHeaderProps {
  onToggleSidebar?: () => void,
  onCleanContext?: () => void,
}

export default function ChatHeader({ onToggleSidebar, onCleanContext }: ChatHeaderProps) {
  return (
    <header id="chat-header">
      <div className="chat-header__icon">🧑‍🚀</div>
      <div className="chat-header__text">
        <h1>Stories AI</h1>
        <p>Text generation powered by AI</p>
      </div>
      <button className="chat-header__clear-btn" onClick={onCleanContext} aria-label="Clear chat">
        ↺
      </button>
      <button className="chat-header__settings-toggle" onClick={onToggleSidebar} aria-label="Toggle settings">
        ⚙
      </button>
    </header>
  )
}
