import { NavLink } from 'react-router-dom'

interface ModeNavProps {
  onMenuClick: () => void
}

const MODES = [
  { to: '/browse', label: 'Browse', description: 'Explore traditions' },
  { to: '/lookup', label: 'Lookup', description: 'Find a passage' },
  { to: '/compare', label: 'Compare', description: 'Side-by-side themes' },
]

export default function ModeNav({ onMenuClick }: ModeNavProps) {
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
    </header>
  )
}
