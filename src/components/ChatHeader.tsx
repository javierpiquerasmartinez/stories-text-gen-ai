interface ChatHeaderProps {
  isLoading?: boolean,
  cleanContext: () => void,
}

export default function ChatHeader({ isLoading, cleanContext }: ChatHeaderProps) {
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
    </header>
  )
}
