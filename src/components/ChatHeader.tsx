interface ChatHeaderProps {
  isLoading?: boolean,
  cleanContext: () => void,
  onToggleSidebar?: () => void,
}

export default function ChatHeader({ isLoading, cleanContext, onToggleSidebar }: ChatHeaderProps) {
  return (
    <header id="chat-header">
      <div className={`chat-header__icon${isLoading ? ' chat-header__icon--loading' : ''}`}>🧑‍🚀</div>
      <div className="chat-header__text">
        <h1>Stories AI</h1>
        <p>Text generation powered by AI</p>
      </div>
      <span className="chat-header__status">Online</span>
      <button className="chat-header__new-chat" disabled={isLoading} onClick={cleanContext}>
        Nuevo Chat
      </button>
      <button className="chat-header__settings-toggle" onClick={onToggleSidebar} aria-label="Toggle settings">
        ⚙
      </button>
    </header>
  )
}
