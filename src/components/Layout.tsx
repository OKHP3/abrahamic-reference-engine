import { useState, useCallback, useRef, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import ModeNav from './ModeNav'
import AppFooter from './AppFooter'
import { usePageTracking } from '../hooks/usePageTracking'

function getRouteAnnouncement(pathname: string): string {
  pathname = pathname.replace(/\/+$/, '')
  if (pathname === '/browse') return 'Browse Traditions page'
  if (pathname.startsWith('/browse/')) return 'Tradition details page'
  if (pathname === '/lookup') return 'Verse Lookup page'
  if (pathname === '/compare') return 'Cross-Tradition Compare page'
  if (pathname === '/observances') return 'Observances page'
  if (pathname === '/skills') return 'Agent Skills page'
  if (pathname === '/origin') return 'Origin Archive page'
  return 'Page changed'
}

export default function Layout() {
  usePageTracking()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const [routeAnnouncement, setRouteAnnouncement] = useState('')

  const openSidebar = useCallback(() => setSidebarOpen(true), [])
  const closeSidebar = useCallback(() => setSidebarOpen(false), [])
  const restoreMenuFocus = useCallback(() => {
    requestAnimationFrame(() => menuButtonRef.current?.focus())
  }, [])

  useEffect(() => {
    setRouteAnnouncement(getRouteAnnouncement(location.pathname))
  }, [location.pathname])

  return (
    <div className="flex min-h-screen bg-bg-base">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 md:hidden"
          aria-hidden="true"
          onClick={closeSidebar}
        />
      )}

      <Sidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
        onCloseRestoreFocus={restoreMenuFocus}
      />

      <div className="flex flex-col flex-1 min-w-0 md:ml-72">
        <ModeNav
          onMenuClick={openSidebar}
          sidebarOpen={sidebarOpen}
          menuButtonRef={menuButtonRef}
        />
        <div
          className="sr-only"
          role="status"
          aria-live="polite"
          aria-atomic="true"
          data-testid="route-announcement"
        >
          {routeAnnouncement}
        </div>
        <main className="flex-1 px-4 py-6 sm:px-6 md:px-8 w-full max-w-4xl">
          <Outlet />
        </main>
        <AppFooter />
      </div>
    </div>
  )
}
