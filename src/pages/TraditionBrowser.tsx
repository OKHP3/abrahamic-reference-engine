import { useParams, Link, useNavigate } from 'react-router-dom'
import { DENOMINATIONS, TRADITION_GROUPS } from '../data/traditions'
import { TRADITION_KNOWLEDGE, DENOMINATION_KNOWLEDGE } from '../data/knowledge'
import { TRANSLATIONS_BY_FAMILY } from '../data/translations'
import ScopeExplainer from '../components/ScopeExplainer'
import TraditionBadge from '../components/TraditionBadge'
import type { TraditionFamily } from '../types'

const FAMILY_LABEL: Record<TraditionFamily, string> = {
  judaism: 'Judaism',
  christianity: 'Christianity',
  islam: 'Islam',
}

function TranslationList({ family }: { family: TraditionFamily }) {
  const translations = TRANSLATIONS_BY_FAMILY[family]
  return (
    <div className="p-5 border border-border-subtle rounded-lg bg-bg-elevated">
      <h3 className="text-xs font-sans font-bold tracking-widest uppercase text-gold mb-3">
        Available Translations
      </h3>
      <ul className="space-y-2">
        {translations.map(t => (
          <li key={t.id} className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <span className="text-sm font-sans text-parchment">{t.shortName}</span>
              <span className="text-xs text-muted ml-2">{t.name}</span>
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
          </li>
        ))}
      </ul>
      <p className="text-2xs text-muted mt-3">
        PD = public domain &nbsp;&middot;&nbsp; OSS = open source &nbsp;&middot;&nbsp; key req. = API key required (not enabled in free build)
      </p>
    </div>
  )
}

function ScriptureLinks({
  family,
  refs,
}: {
  family: TraditionFamily
  refs: Array<{ display: string; lookup: string; note?: string }>
}) {
  return (
    <div className="p-5 border border-border-subtle rounded-lg bg-bg-elevated">
      <h3 className="text-xs font-sans font-bold tracking-widest uppercase text-gold mb-3">
        Key Passages
      </h3>
      <ul className="space-y-2">
        {refs.map(r => (
          <li key={r.lookup} className="flex items-start gap-3">
            <Link
              to={`/lookup?tradition=${family}&ref=${encodeURIComponent(r.lookup)}`}
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
        />

        <TranslationList family={denomination.family} />
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
