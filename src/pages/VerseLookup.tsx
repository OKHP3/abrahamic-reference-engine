import { useState, useCallback, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { fetchPassage } from '../api'
import { TRANSLATIONS_BY_FAMILY } from '../data/translations'
import { COMPARE_THEMES, FEATURED_THEME_IDS } from '../data/compareThemes'
import VerseCard from '../components/VerseCard'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import TraditionBadge from '../components/TraditionBadge'
import ScopeExplainer from '../components/ScopeExplainer'
import type { Passage, TraditionFamily, ApiStatus } from '../types'

const TRADITION_EXAMPLES: Record<TraditionFamily, Array<{ label: string; ref: string }>> = {
  judaism: [
    { label: 'Genesis 1:1', ref: 'Genesis 1:1' },
    { label: 'Psalms 23:1', ref: 'Psalms 23:1' },
    { label: 'Deuteronomy 6:4', ref: 'Deuteronomy 6:4' },
    { label: 'Proverbs 1:7', ref: 'Proverbs 1:7' },
  ],
  christianity: [
    { label: 'John 3:16', ref: 'john 3:16' },
    { label: 'Matthew 5:3-12', ref: 'matthew 5:3-12' },
    { label: 'Romans 8:28', ref: 'romans 8:28' },
    { label: '1 Corinthians 13:4', ref: '1 corinthians 13:4' },
  ],
  islam: [
    { label: 'Al-Fatiha 1:1', ref: '1:1' },
    { label: 'Ayat al-Kursi 2:255', ref: '2:255' },
    { label: 'Al-Ikhlas 112:1', ref: '112:1' },
    { label: 'Al-Hujurat 49:13', ref: '49:13' },
  ],
}

const TRADITION_PLACEHOLDER: Record<TraditionFamily, string> = {
  judaism: 'e.g. Genesis 1:1 or Psalms 23',
  christianity: 'e.g. john 3:16 or romans 8:28-39',
  islam: 'e.g. 2:255 (surah:ayah)',
}

const TRADITION_LABELS: Record<TraditionFamily, string> = {
  judaism: 'Judaism',
  christianity: 'Christianity',
  islam: 'Islam',
}

function getSuggestedThemes() {
  const featured = FEATURED_THEME_IDS.slice(0, 3)
  return featured.map(id => COMPARE_THEMES.find(t => t.id === id)).filter(Boolean)
}

export default function VerseLookup() {
  const [searchParams, setSearchParams] = useSearchParams()

  const initialTradition = (searchParams.get('tradition') as TraditionFamily | null) ?? 'judaism'
  const initialRef = searchParams.get('ref') ?? ''

  const [tradition, setTradition] = useState<TraditionFamily>(
    ['judaism', 'christianity', 'islam'].includes(initialTradition) ? initialTradition : 'judaism'
  )
  const [reference, setReference] = useState(initialRef)
  const [translationId, setTranslationId] = useState('')
  const [status, setStatus] = useState<ApiStatus>('idle')
  const [passage, setPassage] = useState<Passage | null>(null)
  const [error, setError] = useState<string | null>(null)

  const freeTranslations = TRANSLATIONS_BY_FAMILY[tradition].filter(
    t => t.license !== 'licensed'
  )

  useEffect(() => {
    const defaultTranslation = freeTranslations[0]?.id ?? ''
    setTranslationId(defaultTranslation)
  }, [tradition])

  useEffect(() => {
    if (initialRef) {
      doFetch(initialTradition as TraditionFamily, initialRef, freeTranslations[0]?.id ?? '')
    }
  }, [])

  const doFetch = useCallback(
    async (trad: TraditionFamily, ref: string, xlation: string) => {
      if (!ref.trim()) return
      setStatus('loading')
      setPassage(null)
      setError(null)
      try {
        const result = await fetchPassage({ tradition: trad, reference: ref.trim(), translationId: xlation })
        setPassage(result)
        setStatus('success')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error fetching passage.')
        setStatus('error')
      }
    },
    []
  )

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSearchParams({ tradition, ref: reference })
    doFetch(tradition, reference, translationId)
  }

  function handleTraditionChange(next: TraditionFamily) {
    setTradition(next)
    setPassage(null)
    setError(null)
    setStatus('idle')
    setReference('')
  }

  function handleExample(ref: string) {
    setReference(ref)
    setSearchParams({ tradition, ref })
    doFetch(tradition, ref, translationId)
  }

  const suggestedThemes = getSuggestedThemes()

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-serif font-light text-gold mb-2">
          Verse Lookup
        </h1>
        <p className="text-base text-ink leading-relaxed max-w-2xl">
          Retrieve a specific passage from any of the three in-scope Abrahamic traditions.
          Text is fetched live from free public APIs -- no account required.
        </p>
      </div>

      <div className="p-5 border border-border-mid rounded-lg bg-bg-elevated mb-6">
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <fieldset>
              <legend className="text-xs font-sans font-bold tracking-widest uppercase text-muted mb-2 block">
                Tradition
              </legend>
              <div className="flex gap-2 flex-wrap">
                {(['judaism', 'christianity', 'islam'] as TraditionFamily[]).map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => handleTraditionChange(t)}
                    className={[
                      'px-3 py-1.5 text-xs font-sans font-semibold rounded border transition-all duration-150',
                      tradition === t
                        ? t === 'judaism'
                          ? 'text-blue-300 border-blue-700 bg-blue-950'
                          : t === 'christianity'
                          ? 'text-violet-300 border-violet-700 bg-violet-950'
                          : 'text-emerald-300 border-emerald-700 bg-emerald-950'
                        : 'text-muted border-border-subtle bg-bg-base hover:text-parchment hover:border-border-mid',
                    ].join(' ')}
                    aria-pressed={tradition === t}
                  >
                    {TRADITION_LABELS[t]}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="flex gap-3 mb-4 flex-col sm:flex-row">
            <div className="flex-1 min-w-0">
              <label htmlFor="verse-reference" className="text-xs font-sans font-bold tracking-widest uppercase text-muted mb-2 block">
                Reference
              </label>
              <input
                id="verse-reference"
                type="text"
                value={reference}
                onChange={e => setReference(e.target.value)}
                placeholder={TRADITION_PLACEHOLDER[tradition]}
                className="w-full bg-bg-base border border-border-mid rounded px-3 py-2 text-sm font-sans text-parchment placeholder-muted focus:outline-none focus:border-gold-muted transition-colors"
                aria-describedby="reference-hint"
                autoComplete="off"
                spellCheck={false}
              />
              <p id="reference-hint" className="text-2xs text-muted mt-1">
                {tradition === 'islam' ? 'Format: surah:ayah (e.g. 2:255)' :
                 tradition === 'judaism' ? 'Format: Book Chapter:Verse (e.g. Genesis 1:1)' :
                 'Format: book chapter:verse (e.g. john 3:16)'}
              </p>
            </div>

            <div className="sm:w-48 flex-shrink-0">
              <label htmlFor="translation-select" className="text-xs font-sans font-bold tracking-widest uppercase text-muted mb-2 block">
                Translation
              </label>
              <select
                id="translation-select"
                value={translationId}
                onChange={e => setTranslationId(e.target.value)}
                className="w-full bg-bg-base border border-border-mid rounded px-3 py-2 text-sm font-sans text-parchment focus:outline-none focus:border-gold-muted transition-colors"
              >
                {freeTranslations.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.shortName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={!reference.trim() || status === 'loading'}
            className="px-5 py-2 text-sm font-sans font-semibold text-bg-base bg-gold rounded hover:bg-gold-light disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
            aria-disabled={!reference.trim() || status === 'loading'}
          >
            {status === 'loading' ? 'Fetching...' : 'Look up passage'}
          </button>
        </form>
      </div>

      {status === 'loading' && (
        <div className="py-6 flex justify-center">
          <LoadingSpinner label="Fetching passage from API..." size="md" />
        </div>
      )}

      {status === 'error' && error && (
        <ErrorMessage
          message={error}
          onRetry={() => doFetch(tradition, reference, translationId)}
          className="mb-6"
        />
      )}

      {status === 'success' && passage && (
        <div className="mb-6">
          <VerseCard passage={passage} showBadge showAttribution />
        </div>
      )}

      {status === 'idle' || status === 'success' ? (
        <div className="mb-6">
          <h2 className="text-xs font-sans font-bold tracking-widest uppercase text-muted mb-3">
            Quick Examples
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {TRADITION_EXAMPLES[tradition].map(ex => (
              <button
                key={ex.ref}
                onClick={() => handleExample(ex.ref)}
                className="p-3 text-left border border-border-subtle rounded bg-bg-elevated hover:border-gold hover:bg-bg-active transition-all duration-150 group"
              >
                <TraditionBadge family={tradition} size="sm" className="mb-2" />
                <div className="text-sm font-sans text-dimmed group-hover:text-parchment transition-colors">
                  {ex.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {status === 'success' && passage && (
        <div className="mb-6">
          <h2 className="text-xs font-sans font-bold tracking-widest uppercase text-muted mb-3">
            Explore Parallels
          </h2>
          <p className="text-sm text-ink mb-4 leading-relaxed">
            See how the other two traditions address similar themes:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {suggestedThemes.map(theme =>
              theme ? (
                <Link
                  key={theme.id}
                  to={`/compare?theme=${theme.id}`}
                  className="p-4 border border-border-subtle rounded-lg bg-bg-elevated hover:border-gold hover:bg-bg-active transition-all duration-200 no-underline group"
                >
                  <div className="flex gap-1 mb-2">
                    {(['judaism', 'christianity', 'islam'] as TraditionFamily[]).map(f => (
                      <TraditionBadge key={f} family={f} size="sm" />
                    ))}
                  </div>
                  <h3 className="text-sm font-sans font-semibold text-parchment group-hover:text-gold transition-colors mb-1">
                    {theme.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed line-clamp-2">
                    {theme.description}
                  </p>
                </Link>
              ) : null
            )}
          </div>
        </div>
      )}

      <ScopeExplainer compact className="mb-6" />

      <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
        <Link
          to="/browse"
          className="text-xs font-sans text-muted hover:text-gold transition-colors no-underline"
        >
          &larr; Browse Traditions
        </Link>
        <Link
          to="/compare"
          className="text-xs font-sans text-gold hover:text-gold-light transition-colors no-underline"
        >
          Cross-tradition Compare &rarr;
        </Link>
      </div>
    </div>
  )
}
