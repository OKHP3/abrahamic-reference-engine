import { useMemo } from 'react'
import { getMoonPhase } from '../lib/celestial'
import type { ObservanceEvent } from '../lib/observanceHelpers'
import { TRADITION_COLORS, ORTHODOX_COLOR } from '../lib/observanceHelpers'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function eventColor(event: ObservanceEvent): string {
  if (event.tradition === 'christianity' && event.denomination === 'orthodox') return ORTHODOX_COLOR
  return TRADITION_COLORS[event.tradition]
}

function chipLabel(name: string): string {
  return name.length > 9 ? name.slice(0, 8) + '\u2026' : name
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

// ---------------------------------------------------------------------------
// CalendarCell
// ---------------------------------------------------------------------------

interface CellProps {
  date: number
  year: number
  month: number
  events: ObservanceEvent[]
  isToday: boolean
  selectedId: string
  onEventClick: (id: string) => void
}

function CalendarCell({ date, year, month, events, isToday, selectedId, onEventClick }: CellProps) {
  const moon = useMemo(() => getMoonPhase(new Date(year, month, date)), [year, month, date])
  const MAX_CHIPS_DESKTOP = 3
  const visible = events.slice(0, MAX_CHIPS_DESKTOP)
  const overflow = events.length - MAX_CHIPS_DESKTOP

  return (
    <div
      className={`relative flex flex-col min-h-[72px] p-1 border-b border-r border-border-subtle transition-colors ${
        isToday ? 'bg-gold/[0.06]' : 'hover:bg-white/[0.02]'
      }`}
    >
      {/* Moon + date row */}
      <div className="flex items-center justify-between mb-0.5 gap-0.5">
        <span
          className="text-[10px] leading-none opacity-50 flex-shrink-0"
          title={`${moon.name} (${Math.round(moon.illumination * 100)}% illuminated)`}
          aria-hidden="true"
        >
          {moon.emoji}
        </span>
        <span
          className={`text-[11px] font-semibold leading-none flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full ${
            isToday
              ? 'bg-gold text-bg-base'
              : 'text-muted'
          }`}
        >
          {date}
        </span>
      </div>

      {/* Event chips -- desktop: emoji + truncated label; mobile: colored dot row */}
      {events.length > 0 && (
        <>
          {/* Mobile: dot row */}
          <div className="flex flex-wrap gap-0.5 mt-0.5 md:hidden">
            {events.slice(0, 4).map(ev => (
              <button
                key={ev.id}
                onClick={() => onEventClick(ev.id === selectedId ? '' : ev.id)}
                className="w-2 h-2 rounded-full flex-shrink-0 transition-transform hover:scale-125"
                style={{ background: eventColor(ev) }}
                title={ev.rawName}
                aria-label={ev.rawName}
              />
            ))}
            {events.length > 4 && (
              <span className="text-[9px] text-muted leading-none self-center">+{events.length - 4}</span>
            )}
          </div>

          {/* Desktop: text chips */}
          <div className="hidden md:flex flex-col gap-0.5 mt-0.5">
            {visible.map(ev => {
              const color = eventColor(ev)
              const active = selectedId === ev.id
              return (
                <button
                  key={ev.id}
                  onClick={() => onEventClick(ev.id === selectedId ? '' : ev.id)}
                  className={`w-full text-left text-[10px] leading-tight px-1 py-[2px] rounded truncate transition-all outline-none ${
                    active ? 'opacity-100 ring-1 ring-inset' : 'opacity-75 hover:opacity-100'
                  }`}
                  style={{ background: active ? `${color}35` : `${color}20`, color }}
                  title={ev.rawName}
                >
                  {ev.emoji} {chipLabel(ev.rawName)}
                </button>
              )
            })}
            {overflow > 0 && (
              <span className="text-[10px] text-muted px-1 leading-none">+{overflow} more</span>
            )}
          </div>
        </>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Padding cell
// ---------------------------------------------------------------------------

function PaddingCell() {
  return (
    <div className="min-h-[72px] border-b border-r border-border-subtle bg-bg-base/30 opacity-40" />
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

interface ObservanceCalendarGridProps {
  year: number
  month: number
  events: ObservanceEvent[]
  selectedId: string
  onEventClick: (id: string) => void
  onPrevMonth: () => void
  onNextMonth: () => void
}

export default function ObservanceCalendarGrid({
  year,
  month,
  events,
  selectedId,
  onEventClick,
  onPrevMonth,
  onNextMonth,
}: ObservanceCalendarGridProps) {
  const today = new Date()

  // Build grid cells
  const { cells, daysInMonth } = useMemo(() => {
    const firstDow = new Date(year, month, 1).getDay()  // 0 = Sunday
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const total = Math.ceil((firstDow + daysInMonth) / 7) * 7
    const cells: (number | null)[] = [
      ...Array<null>(firstDow).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
      ...Array<null>(total - firstDow - daysInMonth).fill(null),
    ]
    return { cells, firstDow, daysInMonth }
  }, [year, month])

  // Group events by start day-of-month (only events in this month)
  const eventsByDay = useMemo(() => {
    const map = new Map<number, ObservanceEvent[]>()
    for (let d = 1; d <= daysInMonth; d++) map.set(d, [])
    for (const ev of events) {
      const s = ev.startDate
      if (s.getFullYear() === year && s.getMonth() === month) {
        const d = s.getDate()
        map.get(d)?.push(ev)
      }
    }
    return map
  }, [events, year, month, daysInMonth])

  const weeks = []
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7))
  }

  return (
    <div className="rounded-xl border border-border-subtle overflow-hidden bg-bg-elevated">
      {/* Month navigation header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle">
        <button
          onClick={onPrevMonth}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:text-parchment hover:bg-white/5 transition-colors text-lg"
          aria-label="Previous month"
        >
          &#8249;
        </button>
        <h2 className="text-sm font-semibold text-parchment/90 tracking-wide">
          {MONTH_NAMES[month]} {year}
        </h2>
        <button
          onClick={onNextMonth}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:text-parchment hover:bg-white/5 transition-colors text-lg"
          aria-label="Next month"
        >
          &#8250;
        </button>
      </div>

      {/* Day-of-week header */}
      <div className="grid grid-cols-7 border-b border-border-subtle">
        {DAY_LABELS.map(label => (
          <div
            key={label}
            className="py-1.5 text-center text-[10px] font-semibold uppercase tracking-wider text-muted border-r border-border-subtle last:border-r-0"
          >
            {label}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div>
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7">
            {week.map((day, di) => {
              if (day === null) {
                return <PaddingCell key={`pad-${wi}-${di}`} />
              }
              const cellDate = new Date(year, month, day)
              return (
                <CalendarCell
                  key={day}
                  date={day}
                  year={year}
                  month={month}
                  events={eventsByDay.get(day) ?? []}
                  isToday={isSameDay(cellDate, today)}
                  selectedId={selectedId}
                  onEventClick={onEventClick}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
