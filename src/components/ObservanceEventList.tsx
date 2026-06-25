import type { ObservanceEvent } from '../lib/observanceHelpers'
import { TRADITION_COLORS, ORTHODOX_COLOR } from '../lib/observanceHelpers'
import ObservanceEventDetail, { formatDateRange } from './ObservanceEventDetail'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export function eventAccentColor(event: ObservanceEvent): string {
  if (event.tradition === 'christianity' && event.denomination === 'orthodox') {
    return ORTHODOX_COLOR
  }
  return TRADITION_COLORS[event.tradition]
}

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    >
      <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Event row
// ---------------------------------------------------------------------------

interface EventRowProps {
  event: ObservanceEvent
  isSelected: boolean
  onSelect: () => void
}

function EventRow({ event, isSelected, onSelect }: EventRowProps) {
  const color = eventAccentColor(event)

  return (
    <div
      className={`rounded-lg border transition-colors ${
        isSelected
          ? 'border-border-mid bg-bg-elevated'
          : 'border-border-subtle bg-bg-elevated/50 hover:border-border-subtle/80 hover:bg-bg-elevated'
      }`}
    >
      <button
        className="w-full text-left px-4 py-3 flex items-center gap-3 cursor-pointer"
        onClick={onSelect}
        aria-expanded={isSelected}
      >
        {/* Tradition accent bar */}
        <div
          className="w-0.5 self-stretch rounded-full flex-shrink-0"
          style={{ background: color }}
          aria-hidden="true"
        />

        {/* Emoji */}
        <span className="text-base flex-shrink-0 leading-none" aria-hidden="true">
          {event.emoji}
        </span>

        {/* Name + inline moon sighting badge for Islamic events */}
        <span className="flex-1 flex items-center gap-2 min-w-0">
          <span className="text-sm font-medium text-parchment/90 truncate">
            {event.rawName}
          </span>
          {event.tradition === 'islam' && (
            <span
              className="flex-shrink-0 text-2xs px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-400/70 border border-amber-400/20 hidden sm:inline"
              title="Actual observance may vary by one day based on local moon sighting"
            >
              moon sighting may vary
            </span>
          )}
        </span>

        {/* Date */}
        <span className="text-xs text-muted flex-shrink-0 hidden sm:block">
          {formatDateRange(event)}
        </span>

        {/* Chevron */}
        <span className="text-muted flex-shrink-0">
          <ChevronIcon open={isSelected} />
        </span>
      </button>

      {isSelected && (
        <div className="px-4 pb-4">
          <ObservanceEventDetail event={event} accentColor={color} />
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Month group
// ---------------------------------------------------------------------------

interface MonthGroupProps {
  monthIndex: number
  events: ObservanceEvent[]
  selectedId: string
  onSelect: (id: string) => void
  showHeader: boolean
}

function MonthGroup({ monthIndex, events, selectedId, onSelect, showHeader }: MonthGroupProps) {
  if (events.length === 0) return null
  return (
    <section>
      {showHeader && (
        <h2 className="text-xs font-semibold tracking-widest uppercase text-gold/70 mb-2 px-1">
          {MONTHS[monthIndex]}
        </h2>
      )}
      <div className="space-y-1.5">
        {events.map(event => (
          <EventRow
            key={event.id}
            event={event}
            isSelected={selectedId === event.id}
            onSelect={() => onSelect(event.id === selectedId ? '' : event.id)}
          />
        ))}
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Main list component
// ---------------------------------------------------------------------------

interface ObservanceEventListProps {
  events: ObservanceEvent[]
  selectedId: string
  onSelect: (id: string) => void
  showMonthHeader?: boolean
}

export default function ObservanceEventList({
  events,
  selectedId,
  onSelect,
  showMonthHeader = true,
}: ObservanceEventListProps) {
  // Group by month
  const byMonth: ObservanceEvent[][] = Array.from({ length: 12 }, () => [])
  for (const event of events) {
    byMonth[event.startDate.getMonth()].push(event)
  }

  const visibleMonths = byMonth
    .map((monthEvents, idx) => ({ monthEvents, idx }))
    .filter(({ monthEvents }) => monthEvents.length > 0)

  if (visibleMonths.length === 0) {
    return (
      <p className="text-muted text-sm py-8 text-center">
        No events found for the selected filters.
      </p>
    )
  }

  return (
    <div className="space-y-6">
      {visibleMonths.map(({ monthEvents, idx }) => (
        <MonthGroup
          key={idx}
          monthIndex={idx}
          events={monthEvents}
          selectedId={selectedId}
          onSelect={onSelect}
          showHeader={showMonthHeader}
        />
      ))}
    </div>
  )
}
