export default function ChatHeader() {
  return (
    <header id="chat-header">
      <div className="chat-header__icon">✦</div>
      <div className="chat-header__text">
        <h1>Stories AI</h1>
        <p>Text generation powered by AI</p>
      </div>
      <span className="chat-header__status">Online</span>
    </header>
  )
}
