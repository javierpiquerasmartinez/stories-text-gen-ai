import './App.css'
import ChatHeader from './components/ChatHeader'
import ChatMessages from './components/ChatMessages'
import ChatInput from './components/ChatInput'
import useChat from './hooks/useChat'
import ErrorToast from './components/ErrorToast'
import { availableProviders } from './config/ai'
import type {AISelection, Provider} from './types/ai'
import { useState } from 'react'
import SettingsSideBar from './components/SettingsSideBar'

export default function App() {
  const [selection, setSelection] = useState<AISelection>({
    provider: availableProviders[0].id,
    model: availableProviders[0].models[0].id,
    baseUrl: availableProviders[0].baseURL,
    apiKey: import.meta.env['VITE_'+availableProviders[0].apiKeyId+'_API_KEY'],
    temperature: 0.7,
    stream: true,
  })
  const {messages, loading, error, sendMessage, cleanContext} = useChat(selection)  

  const onProviderChange = (providerId: Provider) => {
    const providerConfig = availableProviders.find(p => p.id === providerId)
    if (!providerConfig) return
    setSelection((prev) => ({
      ...prev,
      provider: providerId,
      model: providerConfig.models[0].id,
      baseUrl: providerConfig.baseURL,
      apiKey: import.meta.env['VITE_'+providerConfig.apiKeyId+'_API_KEY']
    }))
  }

  const onModelChange = (modelId: string) => {
    setSelection((prev) => ({
      ...prev,
      model: modelId,
    }))
  }

  const onTemperatureChange = (temperature: number) => {
    setSelection((prev) => ({
      ...prev,
      temperature,
    }))
  }

  const onStreamChange = (stream: boolean) => {
    setSelection((prev) => ({
      ...prev,
      stream,
    }))
  }

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
