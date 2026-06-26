import { createContext, useContext, useEffect, useState } from 'react'

export type ThemeMode = 'system' | 'light' | 'dark'

interface ThemeContextValue {
  mode: ThemeMode
  resolvedTheme: 'light' | 'dark'
  cycle: () => void
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: 'system',
  resolvedTheme: 'dark',
  cycle: () => {},
})

function getSystemTheme(): 'light' | 'dark' {
  try {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light'
  } catch {
    // ignore
  }
  return 'dark'
}

function getInitialMode(): ThemeMode {
  try {
    const saved = localStorage.getItem('are-theme')
    if (saved === 'light' || saved === 'dark' || saved === 'system') return saved
  } catch {
    // localStorage not available
  }
  return 'system'
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode)
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(getSystemTheme)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const handler = (e: MediaQueryListEvent) =>
      setSystemTheme(e.matches ? 'light' : 'dark')
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const resolvedTheme: 'light' | 'dark' = mode === 'system' ? systemTheme : mode

  useEffect(() => {
    const root = document.documentElement
    if (resolvedTheme === 'light') {
      root.classList.add('light')
      root.classList.remove('dark')
    } else {
      root.classList.add('dark')
      root.classList.remove('light')
    }
  }, [resolvedTheme])

  const cycle = () => {
    const next: ThemeMode =
      mode === 'system' ? 'light' : mode === 'light' ? 'dark' : 'system'
    setMode(next)
    try {
      localStorage.setItem('are-theme', next)
    } catch {
      // ignore
    }
  }

  return (
    <ThemeContext.Provider value={{ mode, resolvedTheme, cycle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
