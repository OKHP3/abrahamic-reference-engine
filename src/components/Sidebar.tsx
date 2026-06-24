import { NavLink } from 'react-router-dom'
import { TRADITION_GROUPS, PEW_SCOPE_NOTE } from '../data/traditions'
import type { TraditionGroup } from '../types'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

function TraditionGroupSection({ group, onClose }: { group: TraditionGroup; onClose: () => void }) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between px-3 mb-1">
        <span className="text-2xs font-sans font-semibold tracking-widest uppercase text-muted">
          {group.label}
        </span>
        <span className="text-2xs font-sans text-muted" title="US population share (Pew Research Center)">
          ~{group.totalPewPercent}%
        </span>
      </div>

      {group.denominations.map(d => (
        <NavLink
          key={d.id}
          to={`/browse/${d.slug}`}
          onClick={onClose}
          className={({ isActive }) =>
            `tradition-entry${isActive ? ' active' : ''}`
          }
          title={d.description}
        >
          <span className="truncate">{d.name}</span>
          <span
            className="pew-badge flex-shrink-0 ml-2"
            title={`${d.pewPercent}% of US adults identify as ${d.name} (${d.pewCitation.source}, ${d.pewCitation.year})`}
          >
            {d.pewPercent}%
          </span>
        </NavLink>
      ))}
    </div>
  )
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <aside
      className={[
        'w-72 bg-bg-elevated border-r border-border-subtle flex flex-col',
        'fixed top-0 bottom-0 left-0 z-30 overflow-y-auto',
        'transition-transform duration-200 ease-in-out',
        'md:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full',
      ].join(' ')}
      aria-label="Tradition navigation"
    >
      <div className="px-5 py-5 border-b border-border-subtle flex-shrink-0 flex items-center justify-between">
        <NavLink to="/browse" className="block no-underline" onClick={onClose}>
          <div className="text-xs font-sans font-bold tracking-widest uppercase text-gold">
            ARE00
          </div>
          <div className="text-xs font-sans text-muted mt-0.5">
            Abrahamic Reference Engine
          </div>
        </NavLink>

        <button
          className="md:hidden p-1 text-muted hover:text-parchment transition-colors"
          onClick={onClose}
          aria-label="Close navigation"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <nav className="flex-1 pt-4 px-3" aria-label="Traditions">
        {TRADITION_GROUPS.map(group => (
          <TraditionGroupSection key={group.family} group={group} onClose={onClose} />
        ))}
      </nav>

      <footer className="px-4 py-4 border-t border-border-subtle flex-shrink-0">
        <p className="text-2xs font-sans text-muted leading-relaxed">
          Scope: Abrahamic traditions with 1%+ US presence.
        </p>
        <a
          href={PEW_SCOPE_NOTE.citation.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xs font-sans text-gold-muted hover:text-gold transition-colors duration-150 no-underline mt-0.5 block"
          aria-label="Pew Research Center Religious Landscape Study (opens in new tab)"
        >
          Pew Research Center, {PEW_SCOPE_NOTE.citation.year} &rarr;
        </a>
      </footer>
    </aside>
  )
}
