import type { Tradition } from '../lib/observanceHelpers'
import type { ObservanceEvent } from '../lib/observanceHelpers'
import { downloadYearICS } from '../lib/icsGenerator'

export type ChristianDenomFilter = 'all' | 'catholic' | 'protestant' | 'orthodox'

interface ObservanceControlsProps {
  year: number
  onYearChange: (year: number) => void
  selectedTraditions: Set<Tradition>
  onToggleTradition: (t: Tradition) => void
  christianFilter: ChristianDenomFilter
  onChristianFilterChange: (f: ChristianDenomFilter) => void
  filteredEvents: ObservanceEvent[]
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2v8M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 11v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

// Alphabetical order: Christianity, Islam, Judaism
const TRADITION_BUTTONS: {
  tradition: Tradition
  label: string
  activeClass: string
}[] = [
  {
    tradition: 'christianity',
    label: 'Christianity',
    activeClass: 'text-violet-300 border-violet-700 bg-violet-950',
  },
  {
    tradition: 'islam',
    label: 'Islam',
    activeClass: 'text-emerald-300 border-emerald-700 bg-emerald-950',
  },
  {
    tradition: 'judaism',
    label: 'Judaism',
    activeClass: 'text-blue-300 border-blue-700 bg-blue-950',
  },
]

const INACTIVE_BTN = 'text-muted border-border-subtle bg-bg-base hover:text-parchment hover:border-border-mid'
const BTN_BASE = 'px-3 py-1.5 text-xs font-sans font-semibold rounded border transition-all duration-150'

const DENOM_BUTTONS: { value: ChristianDenomFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'catholic', label: 'Catholic' },
  { value: 'protestant', label: 'Protestant' },
  { value: 'orthodox', label: 'Orthodox' },
]

export default function ObservanceControls({
  year,
  onYearChange,
  selectedTraditions,
  onToggleTradition,
  christianFilter,
  onChristianFilterChange,
  filteredEvents,
}: ObservanceControlsProps) {
  return (
    <div className="space-y-3">
      {/* Top row: title + year selector + download */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-gold">Observances</h1>
          <p className="text-sm text-muted mt-0.5">
            Religious holidays for Judaism, Christianity, and Islam
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 border border-border-subtle rounded-lg overflow-hidden">
            <button
              onClick={() => onYearChange(year - 1)}
              className="px-2.5 py-1.5 text-muted hover:text-parchment hover:bg-white/5 transition-colors text-sm"
              aria-label="Previous year"
            >
              &#8249;
            </button>
            <span className="px-2 py-1.5 text-sm font-semibold text-parchment/90 select-none min-w-[3.5rem] text-center">
              {year}
            </span>
            <button
              onClick={() => onYearChange(year + 1)}
              className="px-2.5 py-1.5 text-muted hover:text-parchment hover:bg-white/5 transition-colors text-sm"
              aria-label="Next year"
            >
              &#8250;
            </button>
          </div>

          <button
            onClick={() => downloadYearICS(filteredEvents, year)}
            disabled={filteredEvents.length === 0}
            className="flex items-center gap-1.5 text-xs px-3 py-2 rounded border border-border-subtle text-muted hover:text-parchment hover:border-gold/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            title={`Download all ${filteredEvents.length} events as .ics`}
          >
            <DownloadIcon />
            <span className="hidden sm:inline">Download .ics</span>
          </button>
        </div>
      </div>

      {/* Tradition filter buttons -- alphabetical order, VerseLookup style */}
      <div className="flex flex-wrap gap-2">
        {TRADITION_BUTTONS.map(({ tradition, label, activeClass }) => {
          const active = selectedTraditions.has(tradition)
          return (
            <button
              key={tradition}
              onClick={() => onToggleTradition(tradition)}
              className={[BTN_BASE, active ? activeClass : INACTIVE_BTN].join(' ')}
              aria-pressed={active}
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* Christianity denomination sub-filter */}
      {selectedTraditions.has('christianity') && (
        <div className="flex flex-wrap gap-2 pl-1 border-l-2 border-gold/30">
          <span className="text-xs font-sans font-bold tracking-widest uppercase text-muted self-center">
            Denomination
          </span>
          {DENOM_BUTTONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onChristianFilterChange(value)}
              className={[
                BTN_BASE,
                christianFilter === value
                  ? 'text-gold border-gold bg-bg-active'
                  : INACTIVE_BTN,
              ].join(' ')}
              aria-pressed={christianFilter === value}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
