import type { Passage } from '../types'
import TraditionBadge from './TraditionBadge'

interface Props {
  passage: Passage
  showBadge?: boolean
  showAttribution?: boolean
  className?: string
  onParallelClick?: (family: 'judaism' | 'christianity' | 'islam') => void
}

export default function VerseCard({
  passage,
  showBadge = true,
  showAttribution = true,
  className = '',
}: Props) {
  return (
    <article
      className={`p-5 rounded-lg border border-border-mid bg-bg-elevated ${className}`}
      aria-label={`Verse: ${passage.displayReference}`}
    >
      <header className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-sans font-semibold text-muted uppercase tracking-widest mb-0.5">
            {passage.displayReference}
          </p>
          <p className="text-xs font-sans text-muted">{passage.translationName}</p>
        </div>
        {showBadge && (
          <TraditionBadge family={passage.tradition} size="sm" className="flex-shrink-0" />
        )}
      </header>

      <blockquote className="text-base font-serif text-parchment leading-relaxed mb-4 border-l-2 border-border-mid pl-4">
        {passage.primaryText}
      </blockquote>

      {showAttribution && (
        <footer className="flex items-center justify-between gap-3">
          <p className="text-2xs font-sans text-muted leading-relaxed flex-1 min-w-0">
            {passage.attribution}
          </p>
          <a
            href={passage.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xs font-sans text-gold-muted hover:text-gold transition-colors no-underline flex-shrink-0"
            aria-label={`Open ${passage.displayReference} on source website`}
          >
            Source &rarr;
          </a>
        </footer>
      )}
    </article>
  )
}
