import { useState, useEffect, useCallback } from 'react'
import type { ObservanceEvent, Tradition, Denomination } from '../lib/observanceHelpers'
import { TRADITION_COLORS, ORTHODOX_COLOR } from '../lib/observanceHelpers'
import { generateChristianHolidays } from '../lib/christianCalendar'
import { fetchJewishHolidays } from '../lib/hebcalClient'
import { fetchIslamicHolidays } from '../lib/aladhanClient'
import { getHolidayDescription } from '../lib/wikipediaClient'
import type { WikiResult } from '../lib/wikipediaClient'
import { downloadYearICS, downloadEventICS } from '../lib/icsGenerator'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ChristianDenomFilter = 'all' | 'catholic' | 'protestant' | 'orthodox'

interface LoadState {
  judaism: 'idle' | 'loading' | 'done' | 'error'
  islam: 'idle' | 'loading' | 'done' | 'error'
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function formatDateRange(event: ObservanceEvent): string {
  const start = event.startDate
  const opts: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' }
  if (!event.isMultiDay) {
    return start.toLocaleDateString('en-US', opts)
  }
  const end = event.endDate
  if (start.getMonth() === end.getMonth()) {
    return `${start.toLocaleDateString('en-US', opts)} -- ${end.getDate()}`
  }
  return `${start.toLocaleDateString('en-US', opts)} -- ${end.toLocaleDateString('en-US', opts)}`
}

function eventColor(event: ObservanceEvent): string {
  if (event.tradition === 'christianity' && event.denomination === 'orthodox') {
    return ORTHODOX_COLOR
  }
  return TRADITION_COLORS[event.tradition]
}

function denominationLabel(den: Denomination): string {
  if (den === 'all') return 'All Christian'
  if (den === 'catholic') return 'Catholic'
  if (den === 'protestant') return 'Protestant'
  if (den === 'orthodox') return 'Orthodox'
  if (den === 'evangelical') return 'Evangelical'
  if (den === 'restorationist') return 'Restorationist'
  return den
}

function matchesDenominationFilter(event: ObservanceEvent, filter: ChristianDenomFilter): boolean {
  if (event.tradition !== 'christianity') return true
  if (filter === 'all') return true
  // Always show 'all'-denomination events; also show events specific to the chosen filter
  return event.denomination === 'all' || event.denomination === filter
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function LoadingSpinner({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="animate-spin"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M1 7h14" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5 1v4M11 1v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2v8M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 11v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

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
// Event detail panel
// ---------------------------------------------------------------------------

interface EventDetailProps {
  event: ObservanceEvent
}

function EventDetail({ event }: EventDetailProps) {
  const [wiki, setWiki] = useState<WikiResult | null>(null)
  const [wikiLoading, setWikiLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setWikiLoading(true)
    setWiki(null)
    getHolidayDescription(event.rawName).then(result => {
      if (!cancelled) {
        setWiki(result)
        setWikiLoading(false)
      }
    })
    return () => { cancelled = true }
  }, [event.rawName])

  const color = eventColor(event)

  return (
    <div className="mt-2 pt-3 border-t border-border-subtle space-y-3">
      {/* Meta row */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
        <span>{formatDateRange(event)}</span>
        {event.isMultiDay && (
          <span className="italic">Multi-day observance</span>
        )}
        {event.tradition === 'christianity' && event.denomination !== 'all' && (
          <span
            className="px-1.5 py-0.5 rounded text-xs font-medium"
            style={{ background: `${color}22`, color }}
          >
            {denominationLabel(event.denomination)}
          </span>
        )}
        {event.hebrewName && (
          <span className="font-mono text-xs" dir="rtl">{event.hebrewName}</span>
        )}
        {event.hijriDate && (
          <span className="text-xs">{event.hijriDate}</span>
        )}
      </div>

      {/* Islamic moon sighting notice */}
      {event.tradition === 'islam' && (
        <p className="text-xs text-amber-400/80 italic">
          Islamic dates are calculated using the Umm al-Qura method.
          Actual observance may vary by one day based on local moon sighting.
        </p>
      )}

      {/* Wikipedia description */}
      <div className="text-sm leading-relaxed">
        {wikiLoading ? (
          <span className="flex items-center gap-2 text-muted">
            <LoadingSpinner size={13} />
            Loading description...
          </span>
        ) : wiki ? (
          <div className="space-y-1.5">
            <p className="text-parchment/80">{wiki.extract}</p>
            <a
              href={wiki.wikiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted hover:text-gold transition-colors underline underline-offset-2"
            >
              Description via Wikipedia (CC BY-SA 3.0)
            </a>
          </div>
        ) : (
          <span className="text-muted italic text-xs">No description available.</span>
        )}
      </div>

      {/* Add to Calendar button */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => downloadEventICS(event)}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border border-border-subtle text-muted hover:text-parchment hover:border-gold/40 transition-colors"
        >
          <CalendarIcon />
          Add to Calendar (.ics)
        </button>
        {event.sourceUrl && (
          <a
            href={event.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted hover:text-gold transition-colors underline underline-offset-2"
          >
            Hebcal source
          </a>
        )}
      </div>
    </div>
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
  const color = eventColor(event)

  return (
    <div
      className={`rounded-lg border transition-colors cursor-pointer ${
        isSelected
          ? 'border-gold/30 bg-bg-elevated'
          : 'border-border-subtle bg-bg-elevated/50 hover:border-border-subtle/80 hover:bg-bg-elevated'
      }`}
    >
      <button
        className="w-full text-left px-4 py-3 flex items-center gap-3"
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

        {/* Name */}
        <span className="flex-1 text-sm font-medium text-parchment/90">
          {event.rawName}
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
          <EventDetail event={event} />
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
  selectedId: string | null
  onSelect: (id: string) => void
}

function MonthGroup({ monthIndex, events, selectedId, onSelect }: MonthGroupProps) {
  if (events.length === 0) return null
  return (
    <section>
      <h2 className="text-xs font-semibold tracking-widest uppercase text-gold/70 mb-2 px-1">
        {MONTHS[monthIndex]}
      </h2>
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
// Main page
// ---------------------------------------------------------------------------

export default function ObservancesCalendar() {
  const currentYear = new Date().getFullYear()
  const [year, setYear] = useState(currentYear)
  const [allEvents, setAllEvents] = useState<ObservanceEvent[]>([])
  const [loadState, setLoadState] = useState<LoadState>({ judaism: 'idle', islam: 'idle' })
  const [errors, setErrors] = useState<{ judaism?: string; islam?: string }>({})
  const [selectedTraditions, setSelectedTraditions] = useState<Set<Tradition>>(
    new Set(['judaism', 'christianity', 'islam'])
  )
  const [christianFilter, setChristianFilter] = useState<ChristianDenomFilter>('all')
  const [selectedId, setSelectedId] = useState<string>('')

  // Load events for the selected year
  const loadYear = useCallback(async (y: number) => {
    // Christian is synchronous
    const christian = generateChristianHolidays(y)

    setAllEvents(christian)
    setLoadState({ judaism: 'loading', islam: 'loading' })
    setErrors({})
    setSelectedId('')

    // Jewish and Islamic are async
    const [jewishResult, islamicResult] = await Promise.allSettled([
      fetchJewishHolidays(y),
      fetchIslamicHolidays(y),
    ])

    const jewishEvents: ObservanceEvent[] =
      jewishResult.status === 'fulfilled' ? jewishResult.value : []
    const islamicEvents: ObservanceEvent[] =
      islamicResult.status === 'fulfilled' ? islamicResult.value : []

    const newErrors: { judaism?: string; islam?: string } = {}
    const newLoadState: LoadState = { judaism: 'done', islam: 'done' }

    if (jewishResult.status === 'rejected') {
      newErrors.judaism = 'Could not load Jewish holidays. Check your connection.'
      newLoadState.judaism = 'error'
    }
    if (islamicResult.status === 'rejected') {
      newErrors.islam = 'Could not load Islamic holidays. Check your connection.'
      newLoadState.islam = 'error'
    }

    setAllEvents([...christian, ...jewishEvents, ...islamicEvents])
    setLoadState(newLoadState)
    setErrors(newErrors)
  }, [])

  useEffect(() => {
    loadYear(year)
  }, [year, loadYear])

  // Filter events
  const filteredEvents = allEvents.filter(event => {
    if (!selectedTraditions.has(event.tradition)) return false
    if (event.tradition === 'christianity') {
      return matchesDenominationFilter(event, christianFilter)
    }
    return true
  })

  // Sort by start date
  filteredEvents.sort((a, b) => a.startDate.getTime() - b.startDate.getTime())

  // Group by month
  const byMonth: ObservanceEvent[][] = Array.from({ length: 12 }, () => [])
  for (const event of filteredEvents) {
    byMonth[event.startDate.getMonth()].push(event)
  }

  const isLoading = loadState.judaism === 'loading' || loadState.islam === 'loading'

  function toggleTradition(t: Tradition) {
    setSelectedTraditions(prev => {
      const next = new Set(prev)
      if (next.has(t)) {
        if (next.size === 1) return prev // keep at least one
        next.delete(t)
      } else {
        next.add(t)
      }
      return next
    })
    setSelectedId('')
  }

  const TRADITION_BUTTONS: { tradition: Tradition; label: string; color: string }[] = [
    { tradition: 'judaism', label: '✡️ Judaism', color: TRADITION_COLORS.judaism },
    { tradition: 'christianity', label: '✝️ Christianity', color: TRADITION_COLORS.christianity },
    { tradition: 'islam', label: '☪️ Islam', color: TRADITION_COLORS.islam },
  ]

  const DENOM_BUTTONS: { value: ChristianDenomFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'catholic', label: 'Catholic' },
    { value: 'protestant', label: 'Protestant' },
    { value: 'orthodox', label: 'Orthodox' },
  ]

  const visibleMonths = byMonth
    .map((events, idx) => ({ events, idx }))
    .filter(({ events }) => events.length > 0)

  return (
    <div className="flex flex-col gap-5 pb-12">
      {/* Page header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-gold">Observances</h1>
          <p className="text-sm text-muted mt-0.5">
            Religious holidays for Judaism, Christianity, and Islam
          </p>
        </div>

        {/* Year selector + Download */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 border border-border-subtle rounded-lg overflow-hidden">
            <button
              onClick={() => setYear(y => y - 1)}
              className="px-2.5 py-1.5 text-muted hover:text-parchment hover:bg-white/5 transition-colors text-sm"
              aria-label="Previous year"
            >
              ‹
            </button>
            <span className="px-2 py-1.5 text-sm font-semibold text-parchment/90 select-none min-w-[3.5rem] text-center">
              {year}
            </span>
            <button
              onClick={() => setYear(y => y + 1)}
              className="px-2.5 py-1.5 text-muted hover:text-parchment hover:bg-white/5 transition-colors text-sm"
              aria-label="Next year"
            >
              ›
            </button>
          </div>

          <button
            onClick={() => downloadYearICS(filteredEvents, year)}
            disabled={filteredEvents.length === 0}
            className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border border-border-subtle text-muted hover:text-parchment hover:border-gold/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            title={`Download all ${filteredEvents.length} events as .ics`}
          >
            <DownloadIcon />
            <span className="hidden sm:inline">Download .ics</span>
          </button>
        </div>
      </div>

      {/* Tradition filter */}
      <div className="flex flex-wrap gap-2">
        {TRADITION_BUTTONS.map(({ tradition, label, color }) => {
          const active = selectedTraditions.has(tradition)
          return (
            <button
              key={tradition}
              onClick={() => toggleTradition(tradition)}
              className="text-xs px-3 py-1.5 rounded-full border font-medium transition-all"
              style={
                active
                  ? { borderColor: color, color, background: `${color}18` }
                  : { borderColor: 'var(--border-subtle)', color: 'var(--muted)' }
              }
              aria-pressed={active}
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* Christian denomination sub-filter */}
      {selectedTraditions.has('christianity') && (
        <div className="flex flex-wrap gap-1.5 -mt-2">
          <span className="text-xs text-muted self-center mr-1">Denomination:</span>
          {DENOM_BUTTONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => { setChristianFilter(value); setSelectedId('') }}
              className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                christianFilter === value
                  ? 'border-violet-500/60 text-violet-400 bg-violet-500/10'
                  : 'border-border-subtle text-muted hover:text-parchment/80'
              }`}
              aria-pressed={christianFilter === value}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Loading indicators for async sources */}
      {isLoading && (
        <div className="flex items-center gap-2 text-xs text-muted">
          <LoadingSpinner size={13} />
          Loading {[
            loadState.judaism === 'loading' && 'Jewish',
            loadState.islam === 'loading' && 'Islamic',
          ].filter(Boolean).join(' and ')} holidays...
        </div>
      )}

      {/* Inline errors */}
      {(errors.judaism || errors.islam) && (
        <div className="space-y-1">
          {errors.judaism && (
            <p className="text-xs text-amber-400/80 flex items-center gap-1.5">
              <span aria-hidden="true">⚠</span> {errors.judaism}
            </p>
          )}
          {errors.islam && (
            <p className="text-xs text-amber-400/80 flex items-center gap-1.5">
              <span aria-hidden="true">⚠</span> {errors.islam}
            </p>
          )}
        </div>
      )}

      {/* Event list */}
      {visibleMonths.length === 0 && !isLoading ? (
        <p className="text-muted text-sm py-8 text-center">
          No events found for the selected filters.
        </p>
      ) : (
        <div className="space-y-6">
          {visibleMonths.map(({ events, idx }) => (
            <MonthGroup
              key={idx}
              monthIndex={idx}
              events={events}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          ))}
        </div>
      )}

      {/* Attribution footer */}
      <footer className="mt-2 pt-4 border-t border-border-subtle space-y-1">
        <p className="text-xs text-muted">
          <a
            href="https://www.hebcal.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold transition-colors underline underline-offset-2"
          >
            Calendar data via Hebcal.com (CC BY 4.0)
          </a>
          {' '}&middot;{' '}
          <a
            href="https://aladhan.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold transition-colors underline underline-offset-2"
          >
            Islamic calendar data via AlAdhan.com
          </a>
          {' '}&middot;{' '}
          Christian dates computed via Ecclesiastical Computus algorithm
        </p>
        <p className="text-xs text-muted">
          Event descriptions via{' '}
          <a
            href="https://en.wikipedia.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold transition-colors underline underline-offset-2"
          >
            Wikipedia (CC BY-SA 3.0)
          </a>
          {' '}, loaded on demand when you click an event.
        </p>
      </footer>
    </div>
  )
}
