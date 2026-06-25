import { useState, useEffect, useCallback } from 'react'
import type { Tradition } from '../lib/observanceHelpers'
import { generateChristianHolidays } from '../lib/christianCalendar'
import { fetchJewishHolidays } from '../lib/hebcalClient'
import { fetchIslamicHolidays } from '../lib/aladhanClient'
import type { ObservanceEvent } from '../lib/observanceHelpers'
import ObservanceControls from '../components/ObservanceControls'
import type { ChristianDenomFilter } from '../components/ObservanceControls'
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

// ---------------------------------------------------------------------------
// Page
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

  function handleYearChange(y: number) {
    setYear(y)
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

  // Filter and sort events
  const filteredEvents = allEvents
    .filter(event => {
      if (!selectedTraditions.has(event.tradition)) return false
      if (event.tradition === 'christianity') {
        return matchesDenominationFilter(event, christianFilter)
      }
      return true
    })
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())

  const isLoading = loadState.judaism === 'loading' || loadState.islam === 'loading'

  const loadingTraditions = [
    loadState.judaism === 'loading' && 'Jewish',
    loadState.islam === 'loading' && 'Islamic',
  ].filter(Boolean).join(' and ')

  return (
    <div className="flex flex-col gap-5 pb-12">
      <ObservanceControls
        year={year}
        onYearChange={handleYearChange}
        selectedTraditions={selectedTraditions}
        onToggleTradition={handleToggleTradition}
        christianFilter={christianFilter}
        onChristianFilterChange={handleChristianFilterChange}
        filteredEvents={filteredEvents}
      />

      {/* Loading indicators for async sources */}
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
            <p className="text-xs text-amber-400/80 flex items-center gap-1.5">
              <span aria-hidden="true">&#9888;</span> {errors.judaism}
            </p>
          )}
          {errors.islam && (
            <p className="text-xs text-amber-400/80 flex items-center gap-1.5">
              <span aria-hidden="true">&#9888;</span> {errors.islam}
            </p>
          )}
        </div>
      )}

      <ObservanceEventList
        events={filteredEvents}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />

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
          , loaded on demand when you click an event.
        </p>
      </footer>
    </div>
  )
}
