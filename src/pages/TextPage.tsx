
import { availableProviders } from './../config/ai'
import SettingsSideBar from './../components/SettingsSideBar'
import ChatMessages from './../components/ChatMessages'
import ChatInput from './../components/ChatInput'
import useChat from '../hooks/useChat'
import ErrorToast from '../components/ErrorToast'
import useChatSettings from '../hooks/useChatSettings'
import { useSidebar } from '../context/SidebarContext'

export default function TextPage() {
    const { sidebarOpen, setSidebarOpen } = useSidebar()
    const { selection, onProviderChange, onModelChange, onTemperatureChange, onStreamChange } = useChatSettings()
    const { messages, loading, error, sendMessage } = useChat(selection)

    return (
        <>
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
                <ChatMessages messages={messages} />
                <ChatInput onSend={sendMessage} disabled={loading} />
            </div>
            {error && <ErrorToast error={error} />}
        </>
    )
}