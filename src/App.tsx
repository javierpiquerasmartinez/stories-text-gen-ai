import './App.css'
import ChatHeader from './components/ChatHeader'
import ChatMessages from './components/ChatMessages'
import ChatInput from './components/ChatInput'
import useChat from './hooks/useChat'
import ErrorToast from './components/ErrorToast'
import { availableProviders } from './config/ai'
import SettingsSideBar from './components/SettingsSideBar'
import useChatSettings from './hooks/useChatSettings'

export default function App() {
  const {selection, onProviderChange, onModelChange, onTemperatureChange, onStreamChange} = useChatSettings()
  const {messages, loading, error, sendMessage, cleanContext} = useChat(selection)  

  return (
    <div id="app-shell">
      <SettingsSideBar
        selection={selection}
        availableProviders={availableProviders}
        onProviderChange={onProviderChange}
        onModelChange={onModelChange}
        onTemperatureChange={onTemperatureChange}
        onStreamChange={onStreamChange} />
      <div id="chat-layout">
        <ChatHeader isLoading={loading} cleanContext={cleanContext} />
        <ChatMessages messages={messages} />
        <ChatInput onSend={sendMessage} disabled={loading} />
      </div>
      {error && <ErrorToast error={error} />}
    </div>
  )
}
