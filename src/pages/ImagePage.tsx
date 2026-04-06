
import { availableProviders } from './../config/ai'
import SettingsSideBar from './../components/SettingsSideBar'
import ChatMessages from './../components/ChatMessages'
import ChatInput from './../components/ChatInput'
import useImageChat from '../hooks/useImageChat'
import ErrorToast from '../components/ErrorToast'
import useChatSettings from '../hooks/useChatSettings'
import { useSidebar } from '../context/SidebarContext'
import ChatHeader from '../components/ChatHeader'

export default function ImagePage() {

    const { sidebarOpen, setSidebarOpen } = useSidebar()
    const { selection, onProviderChange, onModelChange, onTemperatureChange, onStreamChange } = useChatSettings({ availableProviders: availableProviders.image })
    const { messages, loading, error, sendMessage, cleanContext } = useImageChat(selection)

    return (
        <>
            <ChatHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} onCleanContext={cleanContext} />
            <SettingsSideBar
                isOpen={sidebarOpen}
                selection={selection}
                availableProviders={availableProviders.image}
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