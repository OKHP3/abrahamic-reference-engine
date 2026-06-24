import { useParams, Link } from 'react-router-dom'
import { DENOMINATIONS, TRADITION_GROUPS, PEW_SCOPE_NOTE } from '../data/traditions'

function ScopeNote() {
  return (
    <aside className="mt-12 p-5 border border-border-subtle rounded-lg bg-bg-elevated">
      <h2 className="text-xs font-sans font-bold tracking-widest uppercase text-gold mb-3">
        Why These Three Traditions?
      </h2>
      <p className="text-sm text-ink leading-relaxed mb-3">
        This application includes only traditions that meet <strong className="text-parchment">both</strong> of
        the following criteria:
      </p>
      <ol className="list-decimal list-inside space-y-1 mb-4">
        {PEW_SCOPE_NOTE.qualifyingCriteria.map((c, i) => (
          <li key={i} className="text-sm text-ink">
            {c}
          </li>
        ))}
      </ol>
      <p className="text-sm text-ink leading-relaxed mb-3">
        Traditions excluded from scope:
      </p>
      <ul className="space-y-1 mb-4">
        {PEW_SCOPE_NOTE.excluded.map(e => (
          <li key={e.name} className="text-sm text-muted">
            <span className="text-dimmed">{e.name}</span>
            <span className="mx-2 text-border-mid">--</span>
            {e.reason}
          </li>
        ))}
      </ul>
      <p className="text-xs text-muted italic">{PEW_SCOPE_NOTE.note}</p>
      <a
        href={PEW_SCOPE_NOTE.citation.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-3 text-xs font-sans text-gold hover:text-gold-light transition-colors no-underline"
      >
        Source: {PEW_SCOPE_NOTE.citation.source}, {PEW_SCOPE_NOTE.citation.year} &rarr;
      </a>
    </aside>
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

  return (
    <article>
      <div className="mb-8">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <p className="text-xs font-sans font-semibold tracking-widest uppercase text-muted mb-1">
              {denomination.family.charAt(0).toUpperCase() + denomination.family.slice(1)}
            </p>
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

      <div className="grid grid-cols-1 gap-6 mb-8">
        <div className="p-5 border border-border-subtle rounded-lg bg-bg-elevated">
          <h2 className="text-xs font-sans font-bold tracking-widest uppercase text-gold mb-3">
            Canon Scope
          </h2>
          <p className="text-sm text-ink">{denomination.canonScope}</p>
        </div>

        <div className="p-5 border border-border-subtle rounded-lg bg-bg-elevated">
          <h2 className="text-xs font-sans font-bold tracking-widest uppercase text-gold mb-3">
            Key Texts
          </h2>
          <ul className="space-y-1">
            {denomination.keyTexts.map(text => (
              <li key={text} className="text-sm text-ink flex items-center gap-2">
                <span className="text-gold-muted text-xs">--</span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-5 border border-border-subtle rounded-lg bg-bg-elevated">
          <h2 className="text-xs font-sans font-bold tracking-widest uppercase text-gold mb-3">
            Live Lookup
          </h2>
          <p className="text-sm text-muted italic mb-3">
            Coming in the next release -- live scripture retrieval from free public APIs.
          </p>
          <Link
            to="/lookup"
            className="inline-block text-sm font-sans text-gold border border-gold-muted px-4 py-2 rounded hover:bg-bg-active transition-colors no-underline"
          >
            Try Verse Lookup &rarr;
          </Link>
        </div>
      </div>

      <div className="pt-4 border-t border-border-subtle">
        <a
          href={denomination.pewCitation.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-sans text-muted hover:text-gold transition-colors no-underline"
        >
          Population data: {denomination.pewCitation.source}, {denomination.pewCitation.year} &rarr;
        </a>
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
          Each tradition is presented with equal respect -- the proportions below
          reflect Pew Research data, not a ranking of worth.
        </p>
      </div>

      {TRADITION_GROUPS.map(group => (
        <section key={group.family} className="mb-8">
          <div className="flex items-baseline gap-3 mb-4">
            <h2 className="text-xs font-sans font-bold tracking-widest uppercase text-muted">
              {group.label}
            </h2>
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
                    title={`${d.pewPercent}% of US adults (${d.pewCitation.source}, ${d.pewCitation.year})`}
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

      <ScopeNote />
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
