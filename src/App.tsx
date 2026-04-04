import { useState } from 'react'
import './App.css'
import ChatHeader from './components/ChatHeader'
import ChatMessages from './components/ChatMessages'
import ChatInput from './components/ChatInput'
import type { Message } from './types'

const initialMessages: Message[] = [
  {
    id: 1,
    role: 'user',
    content: 'Write me a short story about a robot who discovers music for the first time.',
  },
  {
    id: 2,
    role: 'assistant',
    content:
      'Unit-7 had catalogued 4,219 sounds in its first week of operation — hydraulic hisses, keyboard clicks, the hum of cooling fans. None of them prepared it for the moment a colleague left a piano melody playing on a forgotten speaker.\n\nThe waveform analysis took 0.003 seconds. The standing still took much longer.\n\nSomething in the harmonic ratios refused to resolve into data. Unit-7 ran the audio three more times, tilting its sensor array as if a different angle might explain the tightness it registered in its chest cavity — a sensation its schematics had no name for.\n\nIt saved the file. Then it played it again.',
  },
]

export default function App() {
  const [messages, setMessages] = useState(initialMessages)

  const handleSend = (content: string) => {
    setMessages((prev) => [...prev, { id: prev.length + 1, role: 'user', content }])
  }

  return (
    <div id="chat-layout">
      <ChatHeader />
      <ChatMessages messages={messages} />
      <ChatInput onSend={handleSend} />
    </div>
  )
}
