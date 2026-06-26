import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

declare function gtag(...args: unknown[]): void

const PAGE_TITLES: Record<string, string> = {
  '/browse':       'Browse Traditions',
  '/lookup':       'Verse Lookup',
  '/compare':      'Cross-Tradition Compare',
  '/observances':  'Observances Calendar',
  '/origin':       'Origin Archive',
}

function resolveTitle(pathname: string): string {
  if (pathname.startsWith('/browse/')) return 'Browse Traditions -- Detail'
  return PAGE_TITLES[pathname] ?? pathname
}

export function usePageTracking(): void {
  const location = useLocation()

  useEffect(() => {
    if (typeof gtag !== 'function') return

    const title = resolveTitle(location.pathname)

    gtag('event', 'page_view', {
      page_path:     location.pathname,
      page_title:    title,
      page_location: window.location.href,
    })
  }, [location.pathname])
}
