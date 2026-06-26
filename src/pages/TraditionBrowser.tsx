import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { DENOMINATIONS, TRADITION_GROUPS } from '../data/traditions'
import { TRADITION_KNOWLEDGE, DENOMINATION_KNOWLEDGE } from '../data/knowledge'
import type { ScriptureRef } from '../data/knowledge'
import { TRANSLATIONS_BY_FAMILY } from '../data/translations'
import { COMPARE_THEMES, FEATURED_THEME_IDS } from '../data/compareThemes'
import type { CompareTheme } from '../data/compareThemes'
import { getThemesForPassage } from '../data/themeMapping'
import ScopeExplainer from '../components/ScopeExplainer'
import TraditionBadge from '../components/TraditionBadge'
import FeaturedHadithCard from '../components/FeaturedHadithCard'
import { useSettings } from '../context/SettingsContext'
import { getChristianDenominationSlug } from '../settings'
import { fetchHadithBatch } from '../api/hadith'
import type { TraditionFamily, Hadith } from '../types'

const FAMILY_LABEL: Record<TraditionFamily, string> = {
  judaism: 'Judaism',
  christianity: 'Christianity',
  islam: 'Islam',
}

function getThemesForRefs(
  family: TraditionFamily,
  refs: ScriptureRef[],
  max = 3
): CompareTheme[] {
  const seen = new Set<string>()
  const results: CompareTheme[] = []
  for (const ref of refs) {
    for (const id of getThemesForPassage(family, ref.lookup)) {
      if (!seen.has(id)) {
        seen.add(id)
        const theme = COMPARE_THEMES.find(t => t.id === id)
        if (theme) results.push(theme)
      }
      if (results.length >= max) return results
    }
  }
  for (const id of FEATURED_THEME_IDS) {
    if (!seen.has(id)) {
      seen.add(id)
      const theme = COMPARE_THEMES.find(t => t.id === id)
      if (theme) results.push(theme)
    }
    if (results.length >= max) break
  }
  return results
}

function CrossTraditionThemes({
  family,
  refs,
  contextual,
}: {
  family: TraditionFamily
  refs: ScriptureRef[]
  contextual: boolean
}) {
  const themes = getThemesForRefs(family, refs)
  if (themes.length === 0) return null
  return (
    <div className="p-5 border border-border-subtle rounded-lg bg-bg-elevated">
      <div className="flex items-baseline gap-2 mb-3">
        <h2 className="text-xs font-sans font-bold tracking-widest uppercase text-gold">
          Cross-Tradition Themes
        </h2>
        {contextual && (
          <span className="text-2xs font-sans text-muted italic">
            drawn from this tradition's core texts
          </span>
        )}
      </div>
      <p className="text-sm text-muted mb-4 leading-relaxed">
        See how the other traditions approach themes from this tradition's scripture:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {themes.map(theme => (
          <Link
            key={theme.id}
            to={`/compare?theme=${theme.id}`}
            className="p-4 border border-border-subtle rounded-lg bg-bg-base hover:border-gold hover:bg-bg-active transition-all duration-200 no-underline group"
          >
            <div className="flex gap-1 mb-2">
              {(['christianity', 'islam', 'judaism'] as TraditionFamily[]).map(f => (
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
}

function TranslationList({ family, preferredTranslationId }: { family: TraditionFamily; preferredTranslationId?: string }) {
  const translations = TRANSLATIONS_BY_FAMILY[family]
  const hasLicensed = translations.some(t => t.license === 'licensed')
  return (
    <div className="p-5 border border-border-subtle rounded-lg bg-bg-elevated">
      <h3 className="text-xs font-sans font-bold tracking-widest uppercase text-gold mb-3">
        Available Translations
      </h3>
      <ul className="space-y-3">
        {translations.map(t => (
          <li key={t.id}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0 flex items-center gap-2 flex-wrap">
                <span className={`text-sm font-sans ${t.license === 'licensed' ? 'text-muted' : 'text-parchment'}`}>
                  {t.shortName}
                </span>
                <span className="text-xs text-muted">{t.name}</span>
                {preferredTranslationId === t.id && (
                  <span className="text-2xs font-sans text-gold italic">your default</span>
                )}
              </div>
              <span
                className={`text-2xs font-sans px-1.5 py-0.5 rounded flex-shrink-0 ${
                  t.license === 'public-domain'
                    ? 'text-emerald-400 bg-emerald-950 border border-emerald-900'
                    : t.license === 'open-source'
                    ? 'text-blue-400 bg-blue-950 border border-blue-900'
                    : 'text-muted bg-bg-base border border-border-subtle'
                }`}
              >
                {t.license === 'public-domain' ? 'PD' : t.license === 'open-source' ? 'OSS' : 'key req.'}
              </span>
            </div>
            {t.license === 'licensed' && t.gapReason && (
              <p className="text-2xs text-muted mt-1 leading-relaxed">
                Not in free build -- {t.gapReason}
              </p>
            )}
          </li>
        ))}
      </ul>
      <p className="text-2xs text-muted mt-3">
        PD = public domain &nbsp;&middot;&nbsp; OSS = open source &nbsp;&middot;&nbsp; key req. = API key required -- not enabled in free build
        {hasLicensed && (
          <span> &nbsp;&middot;&nbsp; Grayed names are unavailable in this build.</span>
        )}
      </p>
    </div>
  )
}

function ScriptureLinks({
  family,
  refs,
  denominationSlug,
}: {
  family: TraditionFamily
  refs: Array<{ display: string; lookup: string; note?: string }>
  denominationSlug?: string
}) {
  function buildLookupUrl(ref: string) {
    const params = new URLSearchParams({ tradition: family, ref })
    if (denominationSlug) params.set('denomination', denominationSlug)
    return `/lookup?${params.toString()}`
  }

  return (
    <div className="p-5 border border-border-subtle rounded-lg bg-bg-elevated">
      <h3 className="text-xs font-sans font-bold tracking-widest uppercase text-gold mb-3">
        Key Passages
      </h3>
      <ul className="space-y-2">
        {refs.map(r => (
          <li key={r.lookup} className="flex items-start gap-3">
            <Link
              to={buildLookupUrl(r.lookup)}
              className="text-sm font-sans text-gold hover:text-gold-light transition-colors no-underline font-medium"
              aria-label={`Look up ${r.display}${r.note ? ` -- ${r.note}` : ''}`}
            >
              {r.display}
            </Link>
            {r.note && (
              <span className="text-xs text-muted leading-relaxed">{r.note}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

function TraditionDetail({ slug }: { slug: string }) {
  const denomination = DENOMINATIONS.find(d => d.slug === slug)
  const { settings } = useSettings()

  const [featuredHadith, setFeaturedHadith] = useState<Hadith | null>(null)
  const [hadithLoading, setHadithLoading] = useState(false)
  const [hadithError, setHadithError] = useState<string | null>(null)

  useEffect(() => {
    if (!denomination || denomination.family !== 'islam') return
    let cancelled = false
    setHadithLoading(true)
    setHadithError(null)
    setFeaturedHadith(null)
    fetchHadithBatch('bukhari', [1])
      .then(results => {
        if (cancelled) return
        if (results.length > 0) {
          setFeaturedHadith(results[0])
        } else {
          setHadithError('No hadith returned')
        }
      })
      .catch(() => {
        if (!cancelled) setHadithError('Failed to load hadith')
      })
      .finally(() => {
        if (!cancelled) setHadithLoading(false)
      })
    return () => { cancelled = true }
  }, [denomination?.family])

  if (!denomination) {
    return (
      <div className="text-muted text-sm mt-8">
        Tradition not found.{' '}
        <Link to="/browse" className="text-gold hover:text-gold-light">
          Return to Browse
        </Link>
      </div>
    )
  }

  const familyKnowledge = TRADITION_KNOWLEDGE[denomination.family]
  const denomKnowledge = DENOMINATION_KNOWLEDGE[denomination.id]
  const isUserTradition = settings.denomination === denomination.id

  const settingsDenomSlug = denomination.family === 'christianity'
    ? getChristianDenominationSlug(settings.denomination)
    : null

  const preferredTranslationId: string | undefined =
    denomination.family === 'christianity'
      ? settings.defaultTranslations.christianity
      : denomination.family === 'judaism'
      ? settings.defaultTranslations.judaism
      : settings.defaultTranslations.islam

  return (
    <article>
      <div className="mb-8">
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <TraditionBadge family={denomination.family} size="sm" />
              <p className="text-xs font-sans text-muted uppercase tracking-widest">
                {FAMILY_LABEL[denomination.family]}
              </p>
              {isUserTradition && (
                <span className="text-2xs font-sans text-gold italic">
                  your tradition
                </span>
              )}
            </div>
            <h1 className="text-2xl font-serif font-light text-gold mb-3">
              {denomination.name}
            </h1>
            <p className="text-base text-ink leading-relaxed">{denomination.description}</p>
          </div>
          <div className="flex-shrink-0 text-right">
            <div
              className="text-2xl font-sans font-light text-gold"
              title={`US population share per ${denomination.pewCitation.source}`}
            >
              {denomination.pewPercent}%
            </div>
            <div className="text-xs font-sans text-muted">of US adults</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 mb-8">
        <div className="p-5 border border-border-subtle rounded-lg bg-bg-elevated">
          <h2 className="text-xs font-sans font-bold tracking-widest uppercase text-gold mb-3">
            Canon Scope
          </h2>
          <p className="text-sm text-ink leading-relaxed">{denomination.canonScope}</p>
        </div>

        {denomination.id === 'christianity-orthodox' && (
          <div className="p-5 border border-amber-800 rounded-lg bg-amber-950/30">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xs font-sans font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-amber-900 text-amber-300 border border-amber-700">
                Partial coverage
              </span>
              <h2 className="text-xs font-sans font-bold tracking-widest uppercase text-amber-400">
                Orthodox OT -- API gap
              </h2>
            </div>
            <p className="text-sm text-ink leading-relaxed mb-3">
              WEB (World English Bible) covers the seven Catholic deuterocanonicals but does not include
              three Orthodox-specific texts: <span className="text-parchment font-medium">3 Maccabees</span>,{' '}
              <span className="text-parchment font-medium">4 Maccabees</span>, and{' '}
              <span className="text-parchment font-medium">Psalm 151</span>.
            </p>
            <p className="text-sm text-muted leading-relaxed mb-4">
              No free public API currently serves these books. Lookups for these texts will return a coverage-gap notice
              rather than the passage.
            </p>
            <a
              href="https://www.biblegateway.com/versions/Eastern-Orthodox-Bible-EOB/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-sans text-amber-400 hover:text-amber-300 transition-colors no-underline"
            >
              Read the full Orthodox canon at BibleGateway &rarr;
            </a>
          </div>
        )}

        {denomKnowledge && (
          <>
            <div className="p-5 border border-border-subtle rounded-lg bg-bg-elevated">
              <h2 className="text-xs font-sans font-bold tracking-widest uppercase text-gold mb-3">
                Distinctives
              </h2>
              <p className="text-sm text-ink leading-relaxed">{denomKnowledge.distinctives}</p>
            </div>

            <div className="p-5 border border-border-subtle rounded-lg bg-bg-elevated">
              <h2 className="text-xs font-sans font-bold tracking-widest uppercase text-gold mb-3">
                Worship
              </h2>
              <p className="text-sm text-ink leading-relaxed">{denomKnowledge.worship}</p>
            </div>

            <div className="p-5 border border-border-subtle rounded-lg bg-bg-elevated">
              <h2 className="text-xs font-sans font-bold tracking-widest uppercase text-gold mb-3">
                Stance on Scripture
              </h2>
              <p className="text-sm text-ink leading-relaxed">{denomKnowledge.stanceOnScripture}</p>
            </div>
          </>
        )}

        {familyKnowledge && (
          <>
            <div className="p-5 border border-border-subtle rounded-lg bg-bg-elevated">
              <h2 className="text-xs font-sans font-bold tracking-widest uppercase text-gold mb-3">
                Interpretive Traditions
              </h2>
              <ul className="space-y-1.5">
                {familyKnowledge.interpretiveTraditions.map((t, i) => (
                  <li key={i} className="text-sm text-ink flex items-start gap-2 leading-relaxed">
                    <span className="text-gold-muted text-xs mt-1 flex-shrink-0">--</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 border border-border-subtle rounded-lg bg-bg-elevated">
              <h2 className="text-xs font-sans font-bold tracking-widest uppercase text-gold mb-3">
                Key Themes
              </h2>
              <ul className="space-y-1.5">
                {familyKnowledge.keyThemes.map((t, i) => (
                  <li key={i} className="text-sm text-ink flex items-start gap-2 leading-relaxed">
                    <span className="text-gold-muted text-xs mt-1 flex-shrink-0">--</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 border border-border-subtle rounded-lg bg-bg-elevated">
              <h2 className="text-xs font-sans font-bold tracking-widest uppercase text-gold mb-3">
                Liturgical Life
              </h2>
              <p className="text-sm text-ink leading-relaxed">{familyKnowledge.liturgicalLife}</p>
            </div>
          </>
        )}

        <ScriptureLinks
          family={denomination.family}
          refs={
            denomKnowledge?.representativeVerses ??
            familyKnowledge?.primaryScriptures ??
            []
          }
          denominationSlug={settingsDenomSlug ?? undefined}
        />

        {(() => {
          const refs =
            denomKnowledge?.representativeVerses ??
            familyKnowledge?.primaryScriptures ??
            []
          const hasContextual = refs.some(
            r => getThemesForPassage(denomination.family, r.lookup).length > 0
          )
          return (
            <CrossTraditionThemes
              family={denomination.family}
              refs={refs}
              contextual={hasContextual}
            />
          )
        })()}

        <TranslationList
          family={denomination.family}
          preferredTranslationId={settings.denomination ? preferredTranslationId : undefined}
        />

        {denomination.family === 'islam' && (
          <FeaturedHadithCard
            hadith={featuredHadith}
            loading={hadithLoading}
            error={hadithError}
          />
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
        <a
          href={denomination.pewCitation.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-sans text-muted hover:text-gold transition-colors no-underline"
        >
          Population data: {denomination.pewCitation.source}, {denomination.pewCitation.year} &rarr;
        </a>
        <Link
          to="/compare"
          className="text-xs font-sans text-gold hover:text-gold-light transition-colors no-underline"
        >
          See cross-tradition comparisons &rarr;
        </Link>
      </div>
    </article>
  )
}

function TraditionGrid() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-light text-gold mb-2">
          Browse Traditions
        </h1>
        <p className="text-base text-ink leading-relaxed max-w-2xl">
          Three Abrahamic traditions with meaningful presence in the United States.
          Each is presented with equal respect -- the proportions below reflect Pew Research
          data, not a ranking of worth.
        </p>
      </div>

      {TRADITION_GROUPS.map(group => (
        <section key={group.family} className="mb-8" aria-label={`${group.label} denominations`}>
          <div className="flex items-baseline gap-3 mb-4">
            <TraditionBadge family={group.family} size="sm" />
            <span className="text-xs font-sans text-muted">
              ~{group.totalPewPercent}% of US adults
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {group.denominations.map(d => (
              <Link
                key={d.id}
                to={`/browse/${d.slug}`}
                className="p-5 border border-border-subtle rounded-lg bg-bg-elevated hover:border-gold hover:bg-bg-active transition-all duration-200 no-underline group"
                aria-label={`Browse ${d.name}`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-sm font-sans font-semibold text-parchment group-hover:text-gold transition-colors">
                    {d.name}
                  </h3>
                  <span
                    className="pew-badge flex-shrink-0"
                    title={`${d.pewPercent}% of US adults identify as ${d.name} (${d.pewCitation.source}, ${d.pewCitation.year})`}
                  >
                    {d.pewPercent}%
                  </span>
                </div>
                <p className="text-xs font-sans text-muted leading-relaxed line-clamp-2">
                  {d.canonScope}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <ScopeExplainer className="mt-4" />
    </>
  )
}

export default function TraditionBrowser() {
  const { traditionSlug } = useParams<{ traditionSlug: string }>()

  if (traditionSlug) {
    return <TraditionDetail slug={traditionSlug} />
  }

  return <TraditionGrid />
}
