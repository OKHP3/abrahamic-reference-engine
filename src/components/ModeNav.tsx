import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

interface ModeNavProps {
  onMenuClick: () => void
}

const MODES = [
  { to: '/browse', label: 'Browse', description: 'Explore traditions' },
  { to: '/lookup', label: 'Lookup', description: 'Find a passage' },
  { to: '/compare', label: 'Compare', description: 'Side-by-side themes' },
  { to: '/observances', label: 'Observances', description: 'Religious holiday calendar' },
]

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="7.5" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
      <line x1="7.5" y1="1" x2="7.5" y2="2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="7.5" y1="12.5" x2="7.5" y2="14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="1" y1="7.5" x2="2.5" y2="7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="12.5" y1="7.5" x2="14" y2="7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="2.75" y1="2.75" x2="3.82" y2="3.82" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="11.18" y1="11.18" x2="12.25" y2="12.25" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="12.25" y1="2.75" x2="11.18" y2="3.82" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="3.82" y1="11.18" x2="2.75" y2="12.25" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path d="M12.5 9.5A5.5 5.5 0 0 1 5.5 2.5a5.5 5.5 0 1 0 7 7z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function ModeNav({ onMenuClick }: ModeNavProps) {
  const { theme, toggle } = useTheme()

  return (
    <header className="border-b border-border-subtle bg-bg-elevated flex-shrink-0 flex items-stretch">
      <button
        className="md:hidden flex-shrink-0 px-4 text-muted hover:text-parchment transition-colors border-r border-border-subtle"
        onClick={onMenuClick}
        aria-label="Open navigation"
        aria-expanded={false}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      <nav className="flex flex-1 min-w-0" aria-label="Application modes">
        {MODES.map(mode => (
          <NavLink
            key={mode.to}
            to={mode.to}
            className={({ isActive }) =>
              `mode-tab px-4 sm:px-6${isActive ? ' active' : ''}`
            }
            aria-label={mode.description}
          >
            {mode.label}
          </NavLink>
        ))}
      </nav>

      <div className="flex-shrink-0 flex items-center px-3 border-l border-border-subtle">
        <button
          className="theme-toggle"
          onClick={toggle}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  )
}
