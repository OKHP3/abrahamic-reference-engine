import { useState, useEffect } from 'react'
import type { ObservanceEvent } from '../lib/observanceHelpers'
import { getHolidayDescription } from '../lib/wikipediaClient'
import type { WikiResult } from '../lib/wikipediaClient'
import { downloadEventICS } from '../lib/icsGenerator'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export function formatDateRange(event: ObservanceEvent): string {
  const start = event.startDate
  if (!event.isMultiDay) {
    return `${MONTHS[start.getMonth()]} ${start.getDate()}`
  }
  const end = event.endDate
  if (start.getMonth() === end.getMonth()) {
    return `${MONTHS[start.getMonth()]} ${start.getDate()} -- ${end.getDate()}`
  }
  return `${MONTHS[start.getMonth()]} ${start.getDate()} -- ${MONTHS[end.getMonth()]} ${end.getDate()}`
}

export function denominationLabel(den: string): string {
  if (den === 'all') return 'All Christian'
  if (den === 'catholic') return 'Catholic'
  if (den === 'protestant') return 'Protestant'
  if (den === 'orthodox') return 'Orthodox'
  if (den === 'evangelical') return 'Evangelical'
  if (den === 'restorationist') return 'Restorationist'
  return den
}

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function LoadingSpinner({ size = 14 }: { size?: number }) {
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

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface ObservanceEventDetailProps {
  event: ObservanceEvent
  accentColor: string
}

export default function ObservanceEventDetail({ event, accentColor }: ObservanceEventDetailProps) {
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
            style={{ background: `${accentColor}22`, color: accentColor }}
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

      {/* Islamic moon sighting notice (also in detail for full context) */}
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

      {/* Add to Calendar + source link */}
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
