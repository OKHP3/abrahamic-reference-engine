import { NavLink } from 'react-router-dom'

const MODES = [
  {
    to: '/browse',
    label: 'Browse',
    description: 'Explore traditions',
  },
  {
    to: '/lookup',
    label: 'Lookup',
    description: 'Find a passage',
  },
  {
    to: '/compare',
    label: 'Compare',
    description: 'Side-by-side themes',
  },
]

export default function ModeNav() {
  return (
    <header className="border-b border-border-subtle bg-bg-elevated px-8 py-0 flex-shrink-0">
      <nav className="flex gap-0" aria-label="Application modes">
        {MODES.map(mode => (
          <NavLink
            key={mode.to}
            to={mode.to}
            className={({ isActive }) =>
              `mode-tab px-6${isActive ? ' active' : ''}`
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
