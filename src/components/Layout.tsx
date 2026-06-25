import { useState, useCallback } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import ModeNav from './ModeNav'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const openSidebar = useCallback(() => setSidebarOpen(true), [])
  const closeSidebar = useCallback(() => setSidebarOpen(false), [])

  return (
    <div className="flex min-h-screen bg-bg-base">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 md:hidden"
          aria-hidden="true"
          onClick={closeSidebar}
        />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <div className="flex flex-col flex-1 min-w-0 md:ml-72">
        <ModeNav onMenuClick={openSidebar} />
        <main className="flex-1 px-4 py-6 sm:px-6 md:px-8 w-full max-w-4xl">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
