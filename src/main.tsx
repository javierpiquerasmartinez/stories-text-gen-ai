import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ImagePage from './pages/ImagePage.tsx'
import TextPage from './pages/TextPage.tsx'
import { SidebarProvider } from './context/SidebarContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SidebarProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route path="/text" element={<TextPage />} />
            <Route path="/image" element={<ImagePage />} />
            <Route path="/" element={<Navigate to="/text" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SidebarProvider>
  </StrictMode>,
)
