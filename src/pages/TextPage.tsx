
import { availableProviders } from './../config/ai'
import SettingsSideBar from './../components/SettingsSideBar'
import ChatMessages from './../components/ChatMessages'
import ChatInput from './../components/ChatInput'
import useChat from '../hooks/useChat'
import ErrorToast from '../components/ErrorToast'
import useChatSettings from '../hooks/useChatSettings'
import { useSidebar } from '../context/SidebarContext'
import ChatHeader from '../components/ChatHeader'

export default function TextPage() {
    const { sidebarOpen, setSidebarOpen } = useSidebar()
    const { selection, onProviderChange, onModelChange, onTemperatureChange, onStreamChange } = useChatSettings({ availableProviders: availableProviders.text })
    const { messages, loading, error, sendMessage, cleanContext } = useChat(selection)

    return (
        <>
            <ChatHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} onCleanContext={cleanContext} />
            <SettingsSideBar
                isOpen={sidebarOpen}
                selection={selection}
                availableProviders={availableProviders.text}
                onProviderChange={onProviderChange}
                onModelChange={onModelChange}
                onTemperatureChange={onTemperatureChange}
                onStreamChange={onStreamChange}
                onClose={() => setSidebarOpen(false)} />
            <div id="chat-layout">
                <ChatMessages messages={messages} />
                <ChatInput onSend={sendMessage} disabled={loading} />
            </div>
            {error && <ErrorToast error={error} />}
        </>
    )
}