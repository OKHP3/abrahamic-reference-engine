import { Link } from 'react-router-dom'
import { TRADITION_GROUPS } from '../data/traditions'

const EXAMPLE_REFS = [
  { tradition: 'Judaism', label: 'Genesis 1:1', ref: 'Genesis 1:1', slug: 'judaism' },
  { tradition: 'Christianity', label: 'John 3:16', ref: 'John 3:16', slug: 'evangelical-protestant' },
  { tradition: 'Islam', label: 'Al-Fatiha 1:1', ref: 'Surah 1, Ayah 1', slug: 'islam' },
]

export default function VerseLookup() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-light text-gold mb-2">
          Verse Lookup
        </h1>
        <p className="text-base text-ink leading-relaxed max-w-2xl">
          Retrieve a specific passage from any of the three in-scope Abrahamic traditions.
          Live text is fetched from free, anonymous public APIs -- Sefaria for Judaism,
          bible-api.com for Christianity, and Quran.com for Islam.
        </p>
      </div>

      <div className="p-6 border border-border-mid rounded-lg bg-bg-elevated mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 rounded-full bg-gold-muted"></div>
          <h2 className="text-xs font-sans font-bold tracking-widest uppercase text-gold">
            Coming in the Next Release
          </h2>
        </div>
        <p className="text-sm text-ink leading-relaxed mb-4">
          The live verse lookup feature will let you enter any scripture reference and
          instantly retrieve the text -- with translation options, source attribution,
          and suggestions for parallel passages in the other two traditions.
        </p>
        <p className="text-sm text-muted leading-relaxed">
          The API layer is being built in Task #2 (Data Layer). Once complete, this page
          will be fully wired to live data in Task #3 (Features).
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xs font-sans font-bold tracking-widest uppercase text-muted mb-4">
          What to Expect
        </h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="p-5 border border-border-subtle rounded-lg bg-bg-elevated">
            <h3 className="text-sm font-sans font-semibold text-parchment mb-2">
              Reference Input
            </h3>
            <p className="text-sm text-ink leading-relaxed">
              Enter a verse reference in natural format -- "Genesis 1:1", "Surah 2:255",
              "Psalm 23:1". Select the tradition and preferred translation.
            </p>
          </div>
          <div className="p-5 border border-border-subtle rounded-lg bg-bg-elevated">
            <h3 className="text-sm font-sans font-semibold text-parchment mb-2">
              Translation Options
            </h3>
            <p className="text-sm text-ink leading-relaxed mb-2">
              Available free translations by tradition:
            </p>
            <ul className="space-y-1">
              {TRADITION_GROUPS.map(g => (
                <li key={g.family} className="text-sm text-muted">
                  <span className="text-dimmed">{g.label}:</span>
                  {g.family === 'judaism' && ' JPS, Koren, Sefaria English'}
                  {g.family === 'christianity' && ' KJV, World English Bible, BBE'}
                  {g.family === 'islam' && ' Sahih International, Pickthall, Yusuf Ali'}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-5 border border-border-subtle rounded-lg bg-bg-elevated">
            <h3 className="text-sm font-sans font-semibold text-parchment mb-2">
              Cross-Tradition Suggestions
            </h3>
            <p className="text-sm text-ink leading-relaxed">
              After retrieving a verse, the app will suggest thematically related passages
              from the other two traditions -- inviting exploration across the Abrahamic family.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xs font-sans font-bold tracking-widest uppercase text-muted mb-4">
          Example References
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {EXAMPLE_REFS.map(ex => (
            <div
              key={ex.ref}
              className="p-4 border border-border-subtle rounded-lg bg-bg-elevated opacity-60"
              aria-label={`Example: ${ex.tradition} -- ${ex.label} (not yet active)`}
            >
              <div className="text-xs font-sans font-semibold text-muted uppercase tracking-wider mb-1">
                {ex.tradition}
              </div>
              <div className="text-sm text-parchment font-sans">{ex.label}</div>
              <div className="text-xs text-muted mt-1 italic">Available in next release</div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-border-subtle">
        <p className="text-sm text-muted mb-3">
          While Lookup is in development, explore traditions in Browse mode:
        </p>
        <Link
          to="/browse"
          className="inline-block text-sm font-sans text-gold border border-gold-muted px-4 py-2 rounded hover:bg-bg-active transition-colors no-underline"
        >
          Browse Traditions &rarr;
        </Link>
      </div>
    </div>
  )
}
