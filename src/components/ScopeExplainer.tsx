import { PEW_SCOPE_NOTE } from '../data/traditions'
import PewProvenance from './PewProvenance'

interface Props {
  compact?: boolean
  className?: string
}

export default function ScopeExplainer({ compact = false, className = '' }: Props) {
  return (
    <aside
      className={`border border-border-subtle rounded-lg bg-bg-elevated ${compact ? 'p-4' : 'p-5'} ${className}`}
      aria-labelledby="scope-explainer-heading"
    >
      <h2
        id="scope-explainer-heading"
        className="text-xs font-sans font-bold tracking-widest uppercase text-gold mb-3"
      >
        Why These Three Traditions?
      </h2>

      <p className={`${compact ? 'text-xs' : 'text-sm'} text-ink leading-relaxed mb-3`}>
        This application includes only traditions that meet{' '}
        <strong className="text-parchment">both</strong> of the following criteria:
      </p>

      <ol className="list-decimal list-inside space-y-1.5 mb-4">
        {PEW_SCOPE_NOTE.qualifyingCriteria.map((criterion, i) => (
          <li key={i} className={`${compact ? 'text-xs' : 'text-sm'} text-ink leading-relaxed`}>
            {criterion}
          </li>
        ))}
      </ol>

      <p className={`${compact ? 'text-2xs' : 'text-xs'} text-muted leading-relaxed mb-3`}>
        Reproducible threshold: at least {PEW_SCOPE_NOTE.threshold.minimumPercent}% of{' '}
        {PEW_SCOPE_NOTE.threshold.denominator}, using a separately reported top-level
        category. The threshold does not treat an unreported group as proof of being
        below 1%.
      </p>

      {!compact && (
        <>
          <p className="text-sm text-ink leading-relaxed mb-3">
            Traditions reviewed but excluded from scope:
          </p>
          <ul className="space-y-1.5 mb-4">
            {PEW_SCOPE_NOTE.excluded.map(e => (
              <li key={e.name} className="text-sm flex items-baseline gap-2">
                <span className="text-dimmed font-sans font-medium">{e.name}</span>
                <span className="text-border-mid text-xs">--</span>
                <span className="text-muted">{e.reason}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      <p className={`${compact ? 'text-2xs' : 'text-xs'} text-muted italic mb-3 leading-relaxed`}>
        {PEW_SCOPE_NOTE.note}
      </p>

      <PewProvenance citation={PEW_SCOPE_NOTE.citation} compact={compact} />
    </aside>
  )
}
