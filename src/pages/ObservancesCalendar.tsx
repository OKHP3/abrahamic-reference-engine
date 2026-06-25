import { useState, useEffect, useCallback } from 'react'
import type { Tradition } from '../lib/observanceHelpers'
import { generateChristianHolidays } from '../lib/christianCalendar'
import { fetchJewishHolidays } from '../lib/hebcalClient'
import { fetchIslamicHolidays } from '../lib/aladhanClient'
import type { ObservanceEvent } from '../lib/observanceHelpers'
import ObservanceControls from '../components/ObservanceControls'
import type { ChristianDenomFilter } from '../components/ObservanceControls'
import ObservanceCalendarGrid from '../components/ObservanceCalendarGrid'
import ObservanceEventList from '../components/ObservanceEventList'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

interface LoadState {
  judaism: 'idle' | 'loading' | 'done' | 'error'
  islam: 'idle' | 'loading' | 'done' | 'error'
}

function matchesDenominationFilter(
  event: ObservanceEvent,
  filter: ChristianDenomFilter
): boolean {
  if (event.tradition !== 'christianity') return true
  if (filter === 'all') return true
  return event.denomination === 'all' || event.denomination === filter
}

function LoadingSpinner({ size = 13 }: { size?: number }) {
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

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ObservancesCalendar() {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth()

  // year drives the API fetch; viewMonth drives which month the calendar shows
  const [year, setYear] = useState(currentYear)
  const [viewMonth, setViewMonth] = useState(currentMonth)
  const [allEvents, setAllEvents] = useState<ObservanceEvent[]>([])
  const [loadState, setLoadState] = useState<LoadState>({ judaism: 'idle', islam: 'idle' })
  const [errors, setErrors] = useState<{ judaism?: string; islam?: string }>({})
  const [selectedTraditions, setSelectedTraditions] = useState<Set<Tradition>>(
    new Set(['judaism', 'christianity', 'islam'])
  )
  const [christianFilter, setChristianFilter] = useState<ChristianDenomFilter>('all')
  const [selectedId, setSelectedId] = useState<string>('')

  const loadYear = useCallback(async (y: number) => {
    const christian = generateChristianHolidays(y)
    setAllEvents(christian)
    setLoadState({ judaism: 'loading', islam: 'loading' })
    setErrors({})
    setSelectedId('')

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

  // Year stepper -- fast-skip; keeps current view month
  function handleYearChange(y: number) {
    setYear(y)
    setSelectedId('')
  }

  // Month navigation -- can cross year boundaries
  function handlePrevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11)
      setYear(y => y - 1)
    } else {
      setViewMonth(m => m - 1)
    }
    setSelectedId('')
  }

  function handleNextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0)
      setYear(y => y + 1)
    } else {
      setViewMonth(m => m + 1)
    }
    setSelectedId('')
  }

  function handleToggleTradition(t: Tradition) {
    setSelectedTraditions(prev => {
      const next = new Set(prev)
      if (next.has(t)) {
        if (next.size === 1) return prev
        next.delete(t)
      } else {
        next.add(t)
      }
      return next
    })
    setSelectedId('')
  }

  function handleChristianFilterChange(f: ChristianDenomFilter) {
    setChristianFilter(f)
    setSelectedId('')
  }

  function handleEventClick(id: string) {
    setSelectedId(prev => (prev === id ? '' : id))
  }

  // All filtered events for the year (used by download button)
  const filteredYearEvents = allEvents
    .filter(event => {
      if (!selectedTraditions.has(event.tradition)) return false
      if (event.tradition === 'christianity') {
        return matchesDenominationFilter(event, christianFilter)
      }
      return true
    })
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())

  // Events for the currently visible month (used by calendar grid + list)
  const filteredMonthEvents = filteredYearEvents.filter(
    ev => ev.startDate.getMonth() === viewMonth && ev.startDate.getFullYear() === year
  )

  const isLoading = loadState.judaism === 'loading' || loadState.islam === 'loading'
  const loadingTraditions = [
    loadState.judaism === 'loading' && 'Jewish',
    loadState.islam === 'loading' && 'Islamic',
  ].filter(Boolean).join(' and ')

  return (
    <div className="flex flex-col gap-5 pb-12">
      {/* Controls: year stepper + tradition filters + year download */}
      <ObservanceControls
        year={year}
        onYearChange={handleYearChange}
        selectedTraditions={selectedTraditions}
        onToggleTradition={handleToggleTradition}
        christianFilter={christianFilter}
        onChristianFilterChange={handleChristianFilterChange}
        filteredEvents={filteredYearEvents}
      />

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex items-center gap-2 text-xs text-muted">
          <LoadingSpinner />
          Loading {loadingTraditions} holidays...
        </div>
      )}

      {/* Inline errors */}
      {(errors.judaism || errors.islam) && (
        <div className="space-y-1">
          {errors.judaism && (
            <p className="text-xs text-dimmed flex items-center gap-1.5">
              <span aria-hidden="true">&#9888;</span> {errors.judaism}
            </p>
          )}
          {errors.islam && (
            <p className="text-xs text-dimmed flex items-center gap-1.5">
              <span aria-hidden="true">&#9888;</span> {errors.islam}
            </p>
          )}
        </div>
      )}

      {/* Calendar grid */}
      <ObservanceCalendarGrid
        year={year}
        month={viewMonth}
        events={filteredMonthEvents}
        selectedId={selectedId}
        onEventClick={handleEventClick}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />

      {/* Event list for current month */}
      <section>
        <h3 className="text-xs font-semibold tracking-widest uppercase text-gold/70 mb-3">
          {MONTH_NAMES[viewMonth]} {year}
          <span className="normal-case tracking-normal font-normal text-muted ml-2">
            -- {filteredMonthEvents.length} event{filteredMonthEvents.length !== 1 ? 's' : ''}
          </span>
        </h3>
        <ObservanceEventList
          events={filteredMonthEvents}
          selectedId={selectedId}
          onSelect={handleEventClick}
          showMonthHeader={false}
        />
      </section>

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
          Christian dates via Ecclesiastical Computus
          {' '}&middot;{' '}
          Moon phases computed locally (Julian date algorithm)
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
          , loaded on demand when you click an event.
        </p>
      </footer>
    </div>
  )
}
