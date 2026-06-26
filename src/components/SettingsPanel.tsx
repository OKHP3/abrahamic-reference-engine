import { useEffect, useRef } from 'react'
import { useSettings } from '../context/SettingsContext'
import {
  DENOMINATION_LABELS,
  DENOMINATION_TRANSLATION_MAP,
  DENOMINATION_TRANSLATION_MAP as _map,
} from '../settings'
import type { DenominationId } from '../settings'

interface SettingsPanelProps {
  onClose: () => void
}

const DENOMINATION_OPTIONS: Array<{ id: DenominationId; group: string }> = [
  { id: 'christianity-evangelical', group: 'Christianity' },
  { id: 'christianity-catholic', group: 'Christianity' },
  { id: 'christianity-mainline', group: 'Christianity' },
  { id: 'christianity-lds', group: 'Christianity' },
  { id: 'christianity-orthodox', group: 'Christianity' },
  { id: 'judaism', group: 'Judaism' },
  { id: 'islam', group: 'Islam' },
]

const GROUPS = ['Christianity', 'Judaism', 'Islam'] as const

function GearIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M7.5 1v1.5M7.5 12.5V14M1 7.5h1.5M12.5 7.5H14M2.75 2.75l1.06 1.06M11.19 11.19l1.06 1.06M12.25 2.75l-1.06 1.06M3.81 11.19l-1.06 1.06" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}

export { GearIcon }

export default function SettingsPanel({ onClose }: SettingsPanelProps) {
  const { settings, setDenomination } = useSettings()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  useEffect(() => {
    panelRef.current?.focus()
  }, [])

  const currentDenom = settings.denomination
  const mapping = currentDenom ? DENOMINATION_TRANSLATION_MAP[currentDenom] : null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Settings"
    >
      <div
        className="fixed inset-0 bg-black/60"
        aria-hidden="true"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative z-10 w-full max-w-sm h-full bg-bg-elevated border-l border-border-subtle overflow-y-auto flex flex-col focus:outline-none"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border-subtle flex-shrink-0">
          <h2 className="text-xs font-sans font-bold tracking-widest uppercase text-gold">
            Settings
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-muted hover:text-parchment transition-colors"
            aria-label="Close settings"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="flex-1 px-5 py-5 space-y-6">
          <div>
            <h3 className="text-xs font-sans font-bold tracking-widest uppercase text-muted mb-1">
              Your Tradition
            </h3>
            <p className="text-xs text-muted leading-relaxed mb-4">
              Sets your default Bible translation in Verse Lookup.
              No content is hidden based on this preference.
            </p>

            <div className="mb-3">
              <button
                type="button"
                onClick={() => setDenomination(null)}
                className={[
                  'w-full text-left px-3 py-2 text-sm font-sans rounded border transition-all duration-150 mb-2',
                  currentDenom === null
                    ? 'text-parchment border-gold bg-bg-active'
                    : 'text-muted border-border-subtle bg-bg-base hover:text-parchment hover:border-border-mid',
                ].join(' ')}
              >
                No preference
              </button>
            </div>

            {GROUPS.map(group => {
              const options = DENOMINATION_OPTIONS.filter(o => o.group === group)
              return (
                <div key={group} className="mb-4">
                  <div className="text-2xs font-sans font-semibold tracking-widest uppercase text-muted mb-2 px-1">
                    {group}
                  </div>
                  <div className="space-y-1">
                    {options.map(({ id }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setDenomination(id)}
                        className={[
                          'w-full text-left px-3 py-2 text-sm font-sans rounded border transition-all duration-150',
                          currentDenom === id
                            ? group === 'Christianity'
                              ? 'text-violet-200 border-violet-700 bg-violet-950'
                              : group === 'Judaism'
                              ? 'text-blue-200 border-blue-700 bg-blue-950'
                              : 'text-emerald-200 border-emerald-700 bg-emerald-950'
                            : 'text-muted border-border-subtle bg-bg-base hover:text-parchment hover:border-border-mid',
                        ].join(' ')}
                        aria-pressed={currentDenom === id}
                      >
                        {DENOMINATION_LABELS[id]}
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {currentDenom && (
            <div className="p-4 border border-border-subtle rounded-lg bg-bg-base">
              <div className="text-2xs font-sans font-bold tracking-widest uppercase text-muted mb-2">
                Translation effect
              </div>
              {mapping?.defaultChristianityTranslation ? (
                <p className="text-xs text-ink leading-relaxed">
                  Bible passages will default to{' '}
                  <span className="text-parchment font-medium">
                    {mapping.defaultChristianityTranslation.toUpperCase()}
                  </span>
                  {' '}in Verse Lookup.
                  {mapping.translationNote && (
                    <span className="block mt-1 text-muted">{mapping.translationNote}</span>
                  )}
                </p>
              ) : (
                <p className="text-xs text-ink leading-relaxed">
                  No change to Bible translation defaults for this tradition.
                </p>
              )}
            </div>
          )}
        </div>

        <div className="px-5 py-4 border-t border-border-subtle flex-shrink-0">
          <p className="text-2xs text-muted leading-relaxed">
            Preferences are stored in your browser only -- no account required.
          </p>
        </div>
      </div>
    </div>
  )
}
