import { createContext, useContext, useState } from 'react'

interface SidebarContextType {
    sidebarOpen: boolean
    setSidebarOpen: (value: boolean) => void
}

const SidebarContext = createContext<SidebarContextType>({
    sidebarOpen: false,
    setSidebarOpen: () => { }
})

export function SidebarProvider({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
            {children}
        </SidebarContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSidebar() {
    return useContext(SidebarContext)
}
