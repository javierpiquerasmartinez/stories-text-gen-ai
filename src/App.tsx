import './App.css'
import ChatHeader from './components/ChatHeader'
import { Outlet } from 'react-router-dom'
import { useSidebar } from './context/SidebarContext'
import BottomNav from './components/BottomNav'

export default function App() {

  return (
    <div id="app-shell">
      <Outlet></Outlet>
      <BottomNav></BottomNav>
    </div>
  )
}
