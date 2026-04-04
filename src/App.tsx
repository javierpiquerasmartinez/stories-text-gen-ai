import './App.css'
import ChatHeader from './components/ChatHeader'
import ChatMessages from './components/ChatMessages'
import ChatInput from './components/ChatInput'
import useChat from './hooks/useChat'

export default function App() {
  const {messages, loading, error, sendMessage} = useChat()

  return (
    <div id="chat-layout">
      <ChatHeader />
      <ChatMessages messages={messages} />
      <ChatInput onSend={sendMessage} />
    </div>
  )
}
