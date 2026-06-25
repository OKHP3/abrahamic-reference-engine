import { useState, useCallback, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { fetchPassage, fetchNephiPassage, isLdsBibleRef, LdsApiUnavailableError } from '../api'
import { fetchHadithBatch, HADITH_COLLECTION_SIZES } from '../api/hadith'
import { TRANSLATIONS_BY_FAMILY } from '../data/translations'
import { getContextualThemes, isContextualMatch } from '../data/themeMapping'
import VerseCard from '../components/VerseCard'
import HadithCard from '../components/HadithCard'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import TraditionBadge from '../components/TraditionBadge'
import ScopeExplainer from '../components/ScopeExplainer'
import type { Passage, Hadith, TraditionFamily, ApiStatus } from '../types'

type ChristianDenomination = 'lds' | 'orthodox' | null

interface OrthodoxGapBook {
  name: string
  description: string
  searchUrl: string
}

const ORTHODOX_GAP_BOOKS: Record<string, OrthodoxGapBook> = {
  '3maccabees': {
    name: '3 Maccabees',
    description:
      'Recounts Ptolemy IV\'s attempt to desecrate the Jerusalem Temple and the subsequent persecution of Alexandrian Jews. Included in the Orthodox OT (Septuagint tradition) but absent from Protestant and most Catholic editions.',
    searchUrl: 'https://www.biblegateway.com/passage/?search=3+Maccabees+1&version=NRSV',
  },
  '4maccabees': {
    name: '4 Maccabees',
    description:
      'A philosophical treatise on the supremacy of reason over passion, using the Maccabean martyrs as examples. Included as an appendix in some Orthodox canons (Greek, Georgian, Armenian) but absent from Western canons.',
    searchUrl: 'https://www.biblegateway.com/passage/?search=4+Maccabees+1&version=NRSV',
  },
  psalm151: {
    name: 'Psalm 151',
    description:
      'A short supernumerary psalm attesting David\'s anointing, preserved in the Septuagint. Included in the Orthodox psalter after Psalm 150 but absent from Protestant and Catholic psalters in most editions.',
    searchUrl: 'https://www.biblegateway.com/passage/?search=Psalm+151&version=NRSVA',
  },
}

function detectOrthodoxGap(ref: string): OrthodoxGapBook | null {
  const lower = ref.toLowerCase().trim()
  if (lower.startsWith('3 macc') || lower.startsWith('iii macc') || lower.startsWith('3macc')) {
    return ORTHODOX_GAP_BOOKS['3maccabees']
  }
  if (lower.startsWith('4 macc') || lower.startsWith('iv macc') || lower.startsWith('4macc')) {
    return ORTHODOX_GAP_BOOKS['4maccabees']
  }
  if (/^psalms?\s+151\b/.test(lower)) {
    return ORTHODOX_GAP_BOOKS['psalm151']
  }
  return null
}

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

const LDS_EXAMPLES = [
  { label: '2 Nephi 2:25', ref: '2 Ne. 2:25' },
  { label: 'Moroni 10:4-5', ref: 'Moro. 10:4-5' },
  { label: 'D&C 76:22', ref: 'D&C 76:22' },
  { label: 'Moses 1:39', ref: 'Moses 1:39' },
]

const TRADITION_PLACEHOLDER: Record<TraditionFamily, string> = {
  judaism: 'e.g. Genesis 1:1 or Psalms 23',
  christianity: 'e.g. john 3:16 or romans 8:28-39',
  islam: 'e.g. 2:255 (surah:ayah)',
}

const LDS_PLACEHOLDER = 'e.g. 2 Ne. 2:25 or D&C 76:22 or james 1:5'

const TRADITION_LABELS: Record<TraditionFamily, string> = {
  judaism: 'Judaism',
  christianity: 'Christianity',
  islam: 'Islam',
}

function isLikelyValidRef(tradition: TraditionFamily, ref: string): boolean {
  const t = ref.trim()
  if (!t) return false
  if (tradition === 'islam') {
    return /^\d+:\d+$/.test(t)
  }
  return /^[1-9]?\s?[a-zA-Z].*\s\d/.test(t)
}

function buildHadithNumbers(ref: string): number[] {
  const surah = Math.max(1, parseInt(ref.split(':')[0]) || 1)
  const base = ((surah * 53) % 900) + 100
  const max = HADITH_COLLECTION_SIZES.bukhari
  return [0, 100, 200, 300, 400].map(offset =>
    Math.min(Math.max(1, base + offset), max)
  )
}

export default function VerseLookup() {
  const [searchParams, setSearchParams] = useSearchParams()

  const initialTradition = (searchParams.get('tradition') as TraditionFamily | null) ?? 'judaism'
  const initialRef = searchParams.get('ref') ?? ''
  const rawDenom = searchParams.get('denomination')
  const initialDenom: ChristianDenomination =
    rawDenom === 'lds' ? 'lds' : rawDenom === 'orthodox' ? 'orthodox' : null

  const VALID_FAMILIES: TraditionFamily[] = ['judaism', 'christianity', 'islam']
  const validatedInitialTradition: TraditionFamily | null =
    VALID_FAMILIES.includes(initialTradition as TraditionFamily)
      ? (initialTradition as TraditionFamily)
      : null

  const [tradition, setTradition] = useState<TraditionFamily>(
    validatedInitialTradition ?? 'judaism'
  )
  const [denomination, setDenomination] = useState<ChristianDenomination>(
    validatedInitialTradition === 'christianity' ? initialDenom : null
  )
  const [reference, setReference] = useState(initialRef)
  const [translationId, setTranslationId] = useState('')
  const [status, setStatus] = useState<ApiStatus>('idle')
  const [passage, setPassage] = useState<Passage | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLdsFallback, setIsLdsFallback] = useState(false)
  const [canonGapBook, setCanonGapBook] = useState<OrthodoxGapBook | null>(null)
  const [hadiths, setHadiths] = useState<Hadith[]>([])
  const [hadithStatus, setHadithStatus] = useState<ApiStatus>('idle')
  const [hadithIndex, setHadithIndex] = useState(0)
  const [hadithError, setHadithError] = useState<string | null>(null)
  const [fetchedRef, setFetchedRef] = useState('')
  const [fetchedTradition, setFetchedTradition] = useState<TraditionFamily>('judaism')

  const freeTranslations = TRANSLATIONS_BY_FAMILY[tradition].filter(
    t => t.license !== 'licensed'
  )

  useEffect(() => {
    const defaultTranslation = freeTranslations[0]?.id ?? ''
    setTranslationId(defaultTranslation)
  }, [tradition])

  useEffect(() => {
    if (validatedInitialTradition && isLikelyValidRef(validatedInitialTradition, initialRef)) {
      doFetch(validatedInitialTradition, initialRef.trim(), freeTranslations[0]?.id ?? '', initialDenom)
    }
  }, [])

  useEffect(() => {
    const params: Record<string, string> = { tradition }
    if (reference) params.ref = reference
    if (denomination) params.denomination = denomination
    setSearchParams(params, { replace: true })
  }, [tradition, reference, denomination])

  const doFetch = useCallback(
    async (
      trad: TraditionFamily,
      ref: string,
      xlation: string,
      denom: ChristianDenomination = null,
    ) => {
      if (!ref.trim()) return
      if (denom === 'orthodox') {
        const gap = detectOrthodoxGap(ref)
        if (gap) {
          setCanonGapBook(gap)
          setStatus('error')
          setPassage(null)
          setError(null)
          setIsLdsFallback(false)
          setHadiths([])
          setHadithStatus('idle')
          setHadithIndex(0)
          setHadithError(null)
          return
        }
      }
      setStatus('loading')
      setCanonGapBook(null)
      setPassage(null)
      setError(null)
      setIsLdsFallback(false)
      setHadiths([])
      setHadithStatus('idle')
      setHadithIndex(0)
      setHadithError(null)
      try {
        let result: Passage
        if (trad === 'christianity' && denom === 'lds' && !isLdsBibleRef(ref)) {
          result = await fetchNephiPassage(ref.trim())
        } else {
          result = await fetchPassage({ tradition: trad, reference: ref.trim(), translationId: xlation })
        }
        setPassage(result)
        setStatus('success')
        setFetchedRef(ref.trim())
        setFetchedTradition(trad)
        if (trad === 'islam') {
          setHadithStatus('loading')
          const numbers = buildHadithNumbers(ref.trim())
          fetchHadithBatch('bukhari', numbers)
            .then(results => {
              if (results.length > 0) {
                setHadiths(results)
                setHadithStatus('success')
                return
              }
              return fetchHadithBatch('muslim', numbers).then(fallback => {
                if (fallback.length > 0) {
                  setHadiths(fallback)
                  setHadithStatus('success')
                } else {
                  setHadithStatus('error')
                  setHadithError('No hadith returned from collection.')
                }
              })
            })
            .catch(() => {
              setHadithStatus('error')
              setHadithError('Hadith could not be loaded.')
            })
        }
      } catch (err) {
        if (err instanceof LdsApiUnavailableError) {
          setIsLdsFallback(true)
          setError(err.message)
        } else {
          setError(err instanceof Error ? err.message : 'Unknown error fetching passage.')
        }
        setStatus('error')
      }
    },
    []
  )

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const params: Record<string, string> = { tradition, ref: reference }
    if (denomination) params.denomination = denomination
    setSearchParams(params)
    doFetch(tradition, reference, translationId, denomination)
  }

  function handleTraditionChange(next: TraditionFamily) {
    setTradition(next)
    setDenomination(null)
    setPassage(null)
    setError(null)
    setIsLdsFallback(false)
    setCanonGapBook(null)
    setStatus('idle')
    setReference('')
    setHadiths([])
    setHadithStatus('idle')
    setHadithIndex(0)
    setHadithError(null)
    setSearchParams({ tradition: next })
  }

  function handleDenominationChange(next: ChristianDenomination) {
    setDenomination(next)
    setPassage(null)
    setError(null)
    setIsLdsFallback(false)
    setCanonGapBook(null)
    setStatus('idle')
    setReference('')
  }

  function handleExample(ref: string) {
    setReference(ref)
    const params: Record<string, string> = { tradition, ref }
    if (denomination) params.denomination = denomination
    setSearchParams(params)
    doFetch(tradition, ref, translationId, denomination)
  }

  const isLds = tradition === 'christianity' && denomination === 'lds'
  const currentExamples = isLds ? LDS_EXAMPLES : TRADITION_EXAMPLES[tradition]
  const currentPlaceholder = isLds ? LDS_PLACEHOLDER : TRADITION_PLACEHOLDER[tradition]

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

          {tradition === 'christianity' && (
            <div className="mb-4 pl-1 border-l-2 border-violet-900">
              <fieldset>
                <legend className="text-xs font-sans font-bold tracking-widest uppercase text-muted mb-2 block">
                  Denomination
                </legend>
                <div className="flex gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => handleDenominationChange(null)}
                    className={[
                      'px-3 py-1.5 text-xs font-sans font-semibold rounded border transition-all duration-150',
                      denomination === null
                        ? 'text-violet-300 border-violet-700 bg-violet-950'
                        : 'text-muted border-border-subtle bg-bg-base hover:text-parchment hover:border-border-mid',
                    ].join(' ')}
                    aria-pressed={denomination === null}
                  >
                    Standard
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDenominationChange('lds')}
                    className={[
                      'px-3 py-1.5 text-xs font-sans font-semibold rounded border transition-all duration-150',
                      denomination === 'lds'
                        ? 'text-violet-300 border-violet-700 bg-violet-950'
                        : 'text-muted border-border-subtle bg-bg-base hover:text-parchment hover:border-border-mid',
                    ].join(' ')}
                    aria-pressed={denomination === 'lds'}
                  >
                    LDS
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDenominationChange('orthodox')}
                    className={[
                      'px-3 py-1.5 text-xs font-sans font-semibold rounded border transition-all duration-150',
                      denomination === 'orthodox'
                        ? 'text-violet-300 border-violet-700 bg-violet-950'
                        : 'text-muted border-border-subtle bg-bg-base hover:text-parchment hover:border-border-mid',
                    ].join(' ')}
                    aria-pressed={denomination === 'orthodox'}
                  >
                    Orthodox
                  </button>
                </div>
                {denomination === 'lds' && (
                  <p className="text-2xs text-muted mt-2">
                    Latter-day Saint -- includes Bible (KJV) via bible-api.com and Standard
                    Works (Book of Mormon, D&C, Pearl of Great Price) via scriptures.nephi.org.
                  </p>
                )}
                {denomination === 'orthodox' && (
                  <p className="text-2xs text-muted mt-2">
                    Eastern and Oriental Orthodox -- uses the Septuagint-based canon (76-78 books).
                    Most books work normally; 3 Maccabees, 4 Maccabees, and Psalm 151 are not yet
                    covered by the connected API.
                  </p>
                )}
              </fieldset>
            </div>
          )}

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
                placeholder={currentPlaceholder}
                className="w-full bg-bg-base border border-border-mid rounded px-3 py-2 text-sm font-sans text-parchment placeholder-muted focus:outline-none focus:border-gold-muted transition-colors"
                aria-describedby="reference-hint"
                autoComplete="off"
                spellCheck={false}
              />
              <p id="reference-hint" className="text-2xs text-muted mt-1">
                {isLds
                  ? 'Bible: book chapter:verse (e.g. james 1:5) -- Standard Works: e.g. 2 Ne. 2:25, D&C 76:22, Moses 1:39'
                  : tradition === 'islam'
                  ? 'Format: surah:ayah (e.g. 2:255)'
                  : tradition === 'judaism'
                  ? 'Format: Book Chapter:Verse (e.g. Genesis 1:1)'
                  : 'Format: book chapter:verse (e.g. john 3:16)'}
              </p>
            </div>

            {!isLds && (
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
            )}

            {isLds && (
              <div className="sm:w-48 flex-shrink-0 flex items-end">
                <p className="text-2xs text-muted leading-relaxed">
                  Bible refs use KJV.
                  Standard Works use LDS canonical text.
                </p>
              </div>
            )}
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

      {status === 'error' && error && !isLdsFallback && (
        <ErrorMessage
          message={error}
          onRetry={() => doFetch(tradition, reference, translationId, denomination)}
          className="mb-6"
        />
      )}

      {status === 'error' && isLdsFallback && (
        <div className="mb-6 p-5 border border-violet-800 rounded-lg bg-bg-elevated">
          <h3 className="text-xs font-sans font-bold tracking-widest uppercase text-violet-400 mb-2">
            LDS Standard Works
          </h3>
          <p className="text-sm text-ink leading-relaxed mb-3">
            The Book of Mormon, Doctrine &amp; Covenants, and Pearl of Great Price are served
            via a community-maintained API (scriptures.nephi.org) with no uptime guarantee.
            It appears to be unreachable right now.
          </p>
          <a
            href="https://www.churchofjesuschrist.org/study/scriptures"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 text-xs font-sans font-semibold text-violet-300 border border-violet-700 rounded hover:bg-violet-950 transition-all duration-150 no-underline"
          >
            Look up on ChurchOfJesusChrist.org &rarr;
          </a>
        </div>
      )}

      {status === 'error' && canonGapBook && (
        <div className="mb-6 p-5 border border-violet-800 rounded-lg bg-bg-elevated">
          <h3 className="text-xs font-sans font-bold tracking-widest uppercase text-violet-400 mb-1">
            Orthodox Canon -- Coverage Gap
          </h3>
          <p className="text-base font-serif text-parchment mb-2">{canonGapBook.name}</p>
          <p className="text-sm text-ink leading-relaxed mb-3">
            {canonGapBook.description}
          </p>
          <p className="text-sm text-ink leading-relaxed mb-4">
            This text is part of the Orthodox canon but is not yet available through the
            connected API (bible-api.com WEB). Coverage may be added in a future update.
          </p>
          <a
            href={canonGapBook.searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 text-xs font-sans font-semibold text-violet-300 border border-violet-700 rounded hover:bg-violet-950 transition-all duration-150 no-underline"
          >
            Read {canonGapBook.name} on BibleGateway &rarr;
          </a>
        </div>
      )}

      {status === 'success' && passage && (
        <div className="mb-6">
          <VerseCard passage={passage} showBadge showAttribution />
        </div>
      )}

      {tradition === 'islam' && (hadithStatus === 'loading' || hadithStatus === 'success' || hadithStatus === 'error') && (
        <div className="mb-6">
          <HadithCard
            hadiths={hadiths}
            loading={hadithStatus === 'loading'}
            error={hadithError}
            index={hadithIndex}
            onNext={() => setHadithIndex(i => Math.min(i + 1, hadiths.length - 1))}
            onPrev={() => setHadithIndex(i => Math.max(i - 1, 0))}
          />
        </div>
      )}

      {status === 'idle' || status === 'success' ? (
        <div className="mb-6">
          <h2 className="text-xs font-sans font-bold tracking-widest uppercase text-muted mb-3">
            Quick Examples
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {currentExamples.map(ex => (
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

      {status === 'success' && passage && (() => {
        const contextual = isContextualMatch(fetchedTradition, fetchedRef)
        const themes = getContextualThemes(fetchedTradition, fetchedRef)
        return (
          <div className="mb-6">
            <div className="flex items-baseline gap-2 mb-3">
              <h2 className="text-xs font-sans font-bold tracking-widest uppercase text-muted">
                Explore Parallels
              </h2>
              {contextual && (
                <span className="text-2xs font-sans text-gold italic">
                  matched to this passage
                </span>
              )}
            </div>
            <p className="text-sm text-ink mb-4 leading-relaxed">
              {contextual
                ? 'Themes drawn from this part of scripture -- see how the other traditions approach them:'
                : 'See how the other two traditions address similar themes:'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {themes.map(theme => (
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
              ))}
            </div>
          </div>
        )
      })()}

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
