import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import ModeNav from './ModeNav'

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-bg-base">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0 ml-72">
        <ModeNav />
        <main className="flex-1 px-8 py-8 max-w-4xl">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
