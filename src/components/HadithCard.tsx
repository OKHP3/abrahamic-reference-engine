import type { Hadith, HadithCollection } from '../types'
import { COLLECTION_DISPLAY_NAMES } from '../api/hadith'
import LoadingSpinner from './LoadingSpinner'

const COLLECTION_KEYS = Object.keys(COLLECTION_DISPLAY_NAMES) as HadithCollection[]

interface HadithCardProps {
  hadiths: Hadith[]
  loading: boolean
  error: string | null
  index: number
  onNext: () => void
  onPrev: () => void
  collection: HadithCollection
  onCollectionChange: (c: HadithCollection) => void
}

export default function HadithCard({
  hadiths,
  loading,
  error,
  index,
  onNext,
  onPrev,
  collection,
  onCollectionChange,
}: HadithCardProps) {
  const hadith = hadiths[index] ?? null
  const total = hadiths.length
  const displayCollection = hadith
    ? COLLECTION_DISPLAY_NAMES[hadith.collection]
    : COLLECTION_DISPLAY_NAMES[collection]

  return (
    <section
      aria-label="Related Hadith"
      className="p-5 border border-emerald-900 rounded-lg bg-bg-elevated"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="min-w-0 flex-1">
          <span className="text-2xs font-sans font-bold tracking-widest uppercase text-emerald-500 block mb-1">
            Related Hadith
          </span>
          {!loading && !error && (
            <select
              value={collection}
              onChange={e => onCollectionChange(e.target.value as HadithCollection)}
              className="bg-bg-base border border-emerald-900 rounded px-2 py-1 text-xs font-sans text-parchment focus:outline-none focus:border-emerald-700 transition-colors max-w-[200px]"
              aria-label="Hadith collection"
            >
              {COLLECTION_KEYS.map(key => (
                <option key={key} value={key}>
                  {COLLECTION_DISPLAY_NAMES[key]}
                </option>
              ))}
            </select>
          )}
          {(loading || error) && (
            <span className="text-xs font-sans text-muted mt-0.5 block">{displayCollection}</span>
          )}
        </div>

        {!loading && !error && total > 1 && (
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={onPrev}
              disabled={index === 0}
              className="px-2.5 py-1 text-xs font-sans rounded border border-border-subtle text-muted hover:border-emerald-800 hover:text-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150"
              aria-label="Previous hadith"
            >
              &larr;
            </button>
            <span className="text-xs font-sans text-muted tabular-nums">
              {index + 1} / {total}
            </span>
            <button
              onClick={onNext}
              disabled={index === total - 1}
              className="px-2.5 py-1 text-xs font-sans rounded border border-border-subtle text-muted hover:border-emerald-800 hover:text-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150"
              aria-label="Next hadith"
            >
              &rarr;
            </button>
          </div>
        )}
      </div>

      {loading && (
        <div className="py-4 flex items-center justify-center">
          <LoadingSpinner label="Fetching hadith..." size="sm" />
        </div>
      )}

      {!loading && error && (
        <p className="text-xs text-muted italic">
          Hadith could not be loaded. The verse above is unaffected.
        </p>
      )}

      {!loading && !error && hadith && (
        <>
          <blockquote className="text-sm font-serif text-parchment leading-relaxed border-l-2 border-l-emerald-700 pl-3 mb-4">
            {hadith.text}
          </blockquote>
          <div className="flex items-start justify-between gap-3 pt-3 border-t border-border-subtle">
            <div className="min-w-0">
              <span className="text-2xs font-sans text-muted block">
                {displayCollection} #{hadith.number}
              </span>
              {hadith.bookName && (
                <span className="text-2xs font-sans text-muted italic block mt-0.5">
                  {hadith.bookName}
                </span>
              )}
            </div>
            <a
              href={hadith.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xs font-sans text-emerald-600 hover:text-emerald-400 transition-colors no-underline flex-shrink-0"
              aria-label={`Open ${displayCollection} #${hadith.number} on sunnah.com (opens in new tab)`}
            >
              sunnah.com &rarr;
            </a>
          </div>
        </>
      )}

      {!loading && !error && total === 0 && (
        <p className="text-xs text-muted italic">No hadith available for this lookup.</p>
      )}
    </section>
  )
}
