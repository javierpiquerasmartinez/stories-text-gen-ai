import './App.css'
import { useState } from 'react'
import ChatHeader from './components/ChatHeader'
import ChatMessages from './components/ChatMessages'
import ChatInput from './components/ChatInput'
import useChat from './hooks/useChat'
import ErrorToast from './components/ErrorToast'
import { availableProviders } from './config/ai'
import SettingsSideBar from './components/SettingsSideBar'
import useChatSettings from './hooks/useChatSettings'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const {selection, onProviderChange, onModelChange, onTemperatureChange, onStreamChange} = useChatSettings()
  const {messages, loading, error, sendMessage, cleanContext} = useChat(selection)

  return (
    <div id="app-shell">
      <SettingsSideBar
        isOpen={sidebarOpen}
        selection={selection}
        availableProviders={availableProviders}
        onProviderChange={onProviderChange}
        onModelChange={onModelChange}
        onTemperatureChange={onTemperatureChange}
        onStreamChange={onStreamChange}
        onClose={() => setSidebarOpen(false)} />
      <div id="chat-layout">
        <ChatHeader isLoading={loading} cleanContext={cleanContext} onToggleSidebar={() => setSidebarOpen(o => !o)} />
        <ChatMessages messages={messages} />
        <ChatInput onSend={sendMessage} disabled={loading} />
      </div>
      {error && <ErrorToast error={error} />}
    </div>
  )
}
