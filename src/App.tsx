import './App.css'
import { Outlet } from 'react-router-dom'
import BottomNav from './components/BottomNav'

export default function App() {

  return (
    <div id="app-shell">
      <Outlet></Outlet>
      <BottomNav></BottomNav>
    </div>
  )
}
