import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { COMPARE_THEMES, FEATURED_THEME_IDS } from '../data/compareThemes'
import { fetchPassage } from '../api'
import TraditionBadge from '../components/TraditionBadge'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import ScopeExplainer from '../components/ScopeExplainer'
import type { TraditionFamily, Passage, ApiStatus } from '../types'

const FAMILIES: TraditionFamily[] = ['judaism', 'christianity', 'islam']

const FAMILY_LABELS: Record<TraditionFamily, string> = {
  judaism: 'Judaism',
  christianity: 'Christianity',
  islam: 'Islam',
}

interface PanelState {
  status: ApiStatus
  passage: Passage | null
  error: string | null
  staticText: string
  displayRef: string
  translationName: string
  sourceUrl: string
}

function buildStaticPassage(theme: (typeof COMPARE_THEMES)[number], family: TraditionFamily): Passage {
  const p = theme.passages[family]
  return {
    reference: p.displayRef,
    displayReference: p.displayRef,
    tradition: family,
    primaryText: p.staticText,
    translationId: p.apiProvider,
    translationName: p.translationName,
    sourceUrl: family === 'judaism'
      ? `https://www.sefaria.org/${encodeURIComponent(p.lookup)}?lang=bi`
      : family === 'christianity'
      ? `https://bible-api.com/${encodeURIComponent(p.lookup)}`
      : `https://quran.com/${p.lookup}`,
    attribution: `${p.translationName} -- ${p.apiProvider}`,
  }
}

function TraditionPanel({
  family,
  state,
  onRefresh,
}: {
  family: TraditionFamily
  state: PanelState
  onRefresh: () => void
}) {
  const borderColors: Record<TraditionFamily, string> = {
    judaism: 'border-blue-800',
    christianity: 'border-violet-800',
    islam: 'border-emerald-800',
  }
  const accentColors: Record<TraditionFamily, string> = {
    judaism: 'border-l-blue-500',
    christianity: 'border-l-violet-500',
    islam: 'border-l-emerald-500',
  }

  const passage = state.passage ?? {
    displayReference: state.displayRef,
    primaryText: state.staticText,
    translationName: state.translationName,
    sourceUrl: state.sourceUrl,
    attribution: `${state.translationName} -- pre-seeded`,
  }

  return (
    <div
      className={`flex flex-col rounded-lg border bg-bg-elevated p-5 ${borderColors[family]}`}
      aria-label={`${FAMILY_LABELS[family]} passage`}
    >
      <header className="mb-4">
        <TraditionBadge family={family} size="md" className="mb-2" />
        <p className="text-xs font-sans text-muted uppercase tracking-widest">
          {passage.displayReference}
        </p>
        <p className="text-2xs font-sans text-muted mt-0.5">{passage.translationName}</p>
      </header>

      {state.status === 'loading' && (
        <div className="flex-1 flex items-center justify-center py-4">
          <LoadingSpinner label={`Fetching ${FAMILY_LABELS[family]} passage...`} size="sm" />
        </div>
      )}

      {state.status === 'error' && state.error && (
        <div className="flex-1">
          <p className="text-xs text-muted mb-3 italic">Showing pre-seeded text (live fetch failed):</p>
          <blockquote className={`text-sm font-serif text-parchment leading-relaxed border-l-2 pl-3 ${accentColors[family]}`}>
            {state.staticText}
          </blockquote>
          <ErrorMessage
            message={state.error}
            onRetry={onRefresh}
            className="mt-3"
          />
        </div>
      )}

      {(state.status === 'idle' || state.status === 'success') && (
        <blockquote className={`flex-1 text-sm font-serif text-parchment leading-relaxed border-l-2 pl-3 ${accentColors[family]}`}>
          {passage.primaryText}
        </blockquote>
      )}

      <footer className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between gap-2">
        <a
          href={passage.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xs font-sans text-gold-muted hover:text-gold transition-colors no-underline"
          aria-label={`Open ${passage.displayReference} on source website`}
        >
          {passage.translationName} &rarr;
        </a>
        {state.status !== 'loading' && (
          <button
            onClick={onRefresh}
            className="text-2xs font-sans text-muted hover:text-parchment transition-colors"
            aria-label={`Refresh ${FAMILY_LABELS[family]} passage from live API`}
            title="Refresh from live API"
          >
            Refresh
          </button>
        )}
      </footer>
    </div>
  )
}

function ThemeGrid({
  activeId,
  onSelect,
}: {
  activeId: string
  onSelect: (id: string) => void
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
      {COMPARE_THEMES.map(theme => (
        <button
          key={theme.id}
          onClick={() => onSelect(theme.id)}
          className={[
            'p-3 text-left border rounded transition-all duration-150',
            activeId === theme.id
              ? 'border-gold bg-bg-active text-gold'
              : 'border-border-subtle bg-bg-elevated text-dimmed hover:border-border-mid hover:text-parchment',
          ].join(' ')}
          aria-pressed={activeId === theme.id}
          aria-label={`Select theme: ${theme.title}`}
        >
          <div className="text-xs font-sans font-semibold">{theme.title}</div>
        </button>
      ))}
    </div>
  )
}

export default function CrossTraditionCompare() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialThemeId = searchParams.get('theme') ?? COMPARE_THEMES[0].id

  const [activeThemeId, setActiveThemeId] = useState(
    COMPARE_THEMES.some(t => t.id === initialThemeId) ? initialThemeId : COMPARE_THEMES[0].id
  )

  const activeTheme = COMPARE_THEMES.find(t => t.id === activeThemeId)!

  const buildInitialPanels = useCallback((theme: typeof activeTheme): Record<TraditionFamily, PanelState> => {
    const make = (family: TraditionFamily): PanelState => {
      const p = theme.passages[family]
      return {
        status: 'idle',
        passage: null,
        error: null,
        staticText: p.staticText,
        displayRef: p.displayRef,
        translationName: p.translationName,
        sourceUrl: family === 'judaism'
          ? `https://www.sefaria.org/${encodeURIComponent(p.lookup)}?lang=bi`
          : family === 'christianity'
          ? `https://bible-api.com/${encodeURIComponent(p.lookup)}`
          : `https://quran.com/${p.lookup}`,
      }
    }
    return { judaism: make('judaism'), christianity: make('christianity'), islam: make('islam') }
  }, [])

  const [panels, setPanels] = useState<Record<TraditionFamily, PanelState>>(
    buildInitialPanels(activeTheme)
  )

  function selectTheme(id: string) {
    setActiveThemeId(id)
    setSearchParams({ theme: id })
    const theme = COMPARE_THEMES.find(t => t.id === id)!
    setPanels(buildInitialPanels(theme))
  }

  async function refreshPanel(family: TraditionFamily) {
    const p = activeTheme.passages[family]
    setPanels(prev => ({
      ...prev,
      [family]: { ...prev[family], status: 'loading', error: null },
    }))
    try {
      const xlationId = family === 'christianity' ? 'kjv'
        : family === 'judaism' ? 'sefaria-en'
        : p.apiProvider === 'alquran.cloud' ? 'quran-arberry' : 'quran-20'
      const result = await fetchPassage({
        tradition: family,
        reference: p.lookup,
        translationId: xlationId,
      })
      setPanels(prev => ({
        ...prev,
        [family]: { ...prev[family], status: 'success', passage: result, error: null },
      }))
    } catch (err) {
      setPanels(prev => ({
        ...prev,
        [family]: {
          ...prev[family],
          status: 'error',
          error: err instanceof Error ? err.message : 'Fetch failed',
        },
      }))
    }
  }

  async function refreshAll() {
    await Promise.all(FAMILIES.map(f => refreshPanel(f)))
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-serif font-light text-gold mb-2">
          Cross-Tradition Compare
        </h1>
        <p className="text-base text-ink leading-relaxed max-w-2xl">
          The signature feature. Select a theme and see parallel passages from Judaism,
          Christianity, and Islam side by side -- with neutral bridging notes that invite
          discovery rather than declare a winner.
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline justify-between gap-3 mb-3">
          <h2 className="text-xs font-sans font-bold tracking-widest uppercase text-muted">
            Themes ({COMPARE_THEMES.length})
          </h2>
          <span className="text-2xs font-sans text-muted">
            All {COMPARE_THEMES.length} themes have entries for all three traditions
          </span>
        </div>
        <ThemeGrid activeId={activeThemeId} onSelect={selectTheme} />
      </div>

      <div className="mb-6 p-5 border border-border-mid rounded-lg bg-bg-elevated">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-serif font-light text-gold mb-1">
              {activeTheme.title}
            </h2>
            <p className="text-sm text-ink leading-relaxed">{activeTheme.description}</p>
          </div>
          <button
            onClick={refreshAll}
            className="text-xs font-sans text-gold-muted hover:text-gold border border-gold-muted hover:border-gold px-3 py-1.5 rounded transition-all duration-150 flex-shrink-0"
            aria-label="Refresh all passages from live APIs"
          >
            Refresh all
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {FAMILIES.map(family => (
          <TraditionPanel
            key={family}
            family={family}
            state={panels[family]}
            onRefresh={() => refreshPanel(family)}
          />
        ))}
      </div>

      <div className="p-5 border border-border-subtle rounded-lg bg-bg-elevated mb-6">
        <h3 className="text-xs font-sans font-bold tracking-widest uppercase text-gold mb-3">
          What Connects These?
        </h3>
        <p className="text-sm text-ink leading-relaxed">{activeTheme.bridgingNote}</p>
        <p className="text-xs text-muted mt-3 italic">
          This note draws out the structural or thematic parallel. It does not rank traditions,
          endorse any interpretation, or suggest one text is derived from another.
        </p>
      </div>

      <ScopeExplainer compact className="mb-6" />

      <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
        <Link
          to="/lookup"
          className="text-xs font-sans text-muted hover:text-gold transition-colors no-underline"
        >
          &larr; Verse Lookup
        </Link>
        <Link
          to="/browse"
          className="text-xs font-sans text-muted hover:text-gold transition-colors no-underline"
        >
          Browse traditions &rarr;
        </Link>
      </div>
    </div>
  )
}
