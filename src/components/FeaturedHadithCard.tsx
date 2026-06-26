import type { Hadith } from '../types'
import { COLLECTION_DISPLAY_NAMES } from '../api/hadith'
import LoadingSpinner from './LoadingSpinner'

interface FeaturedHadithCardProps {
  hadith: Hadith | null
  loading: boolean
  error: string | null
}

export default function FeaturedHadithCard({ hadith, loading, error }: FeaturedHadithCardProps) {
  return (
    <section
      aria-label="Featured Hadith"
      className="p-5 border border-emerald-900 rounded-lg bg-bg-elevated"
    >
      <span className="text-2xs font-sans font-bold tracking-widest uppercase text-emerald-500 block mb-3">
        Featured Hadith
      </span>

      {loading && (
        <div className="py-4 flex items-center justify-center">
          <LoadingSpinner label="Fetching hadith..." size="sm" />
        </div>
      )}

      {!loading && error && (
        <p className="text-xs text-muted italic">
          Hadith could not be loaded at this time.
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
                {COLLECTION_DISPLAY_NAMES[hadith.collection]} #{hadith.number}
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
              aria-label={`Open ${COLLECTION_DISPLAY_NAMES[hadith.collection]} #${hadith.number} on sunnah.com (opens in new tab)`}
            >
              sunnah.com &rarr;
            </a>
          </div>
        </>
      )}
    </section>
  )
}
