import { Link } from 'react-router-dom'

const PREVIEW_THEMES = [
  {
    theme: 'The Golden Rule',
    preview: 'Every tradition expresses a version of reciprocal ethical treatment -- love your neighbor as yourself.',
    traditions: ['Judaism', 'Christianity', 'Islam'],
  },
  {
    theme: 'Creation',
    preview: 'How each tradition describes the origin of the world and humanity\'s place within it.',
    traditions: ['Judaism', 'Christianity', 'Islam'],
  },
  {
    theme: 'Prayer',
    preview: 'The practice, posture, and purpose of speaking to God across three traditions.',
    traditions: ['Judaism', 'Christianity', 'Islam'],
  },
  {
    theme: 'Mercy and Forgiveness',
    preview: 'God\'s compassion as a defining attribute -- and humanity\'s call to reflect it.',
    traditions: ['Judaism', 'Christianity', 'Islam'],
  },
  {
    theme: 'Covenant',
    preview: 'The binding agreements between God and humanity at the root of all three traditions.',
    traditions: ['Judaism', 'Christianity', 'Islam'],
  },
  {
    theme: 'Justice',
    preview: 'Righteousness toward the poor, the stranger, and the vulnerable.',
    traditions: ['Judaism', 'Christianity', 'Islam'],
  },
  {
    theme: 'Charity',
    preview: 'The obligation to give -- tzedakah, agape, and zakat as structural parallels.',
    traditions: ['Judaism', 'Christianity', 'Islam'],
  },
  {
    theme: 'Monotheism',
    preview: 'The Shema, the Trinity, and Tawhid -- three articulations of one God\'s singularity.',
    traditions: ['Judaism', 'Christianity', 'Islam'],
  },
]

export default function CrossTraditionCompare() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-light text-gold mb-2">
          Cross-Tradition Compare
        </h1>
        <p className="text-base text-ink leading-relaxed max-w-2xl">
          The signature feature. Select a theme and see parallel passages from Judaism,
          Christianity, and Islam side by side -- with neutral bridging notes that invite
          discovery rather than declare a winner.
        </p>
      </div>

      <div className="p-6 border border-border-mid rounded-lg bg-bg-elevated mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 rounded-full bg-gold-muted"></div>
          <h2 className="text-xs font-sans font-bold tracking-widest uppercase text-gold">
            Coming in the Next Release
          </h2>
        </div>
        <p className="text-sm text-ink leading-relaxed mb-3">
          The Compare feature is the heart of this application's mission: to show that
          the Abrahamic family shares far more than it differs. Live passages will be
          fetched from the three tradition APIs and displayed side by side with
          "What connects these?" bridging notes.
        </p>
        <p className="text-sm text-muted leading-relaxed">
          The themes below are pre-seeded and ready. The API layer (Task #2) and feature
          implementation (Task #3) will bring them to life.
        </p>
      </div>

      <div className="mb-8">
        <div className="flex items-baseline gap-3 mb-4">
          <h2 className="text-xs font-sans font-bold tracking-widest uppercase text-muted">
            Pre-Seeded Themes
          </h2>
          <span className="text-xs font-sans text-muted">
            {PREVIEW_THEMES.length} themes ready
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {PREVIEW_THEMES.map(theme => (
            <div
              key={theme.theme}
              className="p-5 border border-border-subtle rounded-lg bg-bg-elevated opacity-70 cursor-not-allowed"
              aria-label={`Theme: ${theme.theme} (not yet active)`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-sm font-sans font-semibold text-parchment mb-1">
                    {theme.theme}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">{theme.preview}</p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  {theme.traditions.map(t => (
                    <span
                      key={t}
                      className="text-2xs font-sans font-medium text-muted bg-bg-base px-1.5 py-0.5 rounded border border-border-subtle"
                    >
                      {t.slice(0, 3)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 border border-border-subtle rounded-lg bg-bg-elevated mb-8">
        <h2 className="text-xs font-sans font-bold tracking-widest uppercase text-gold mb-3">
          How Compare Will Work
        </h2>
        <div className="space-y-3">
          <div className="flex gap-3">
            <span className="text-gold font-sans font-bold text-sm flex-shrink-0">1.</span>
            <p className="text-sm text-ink">
              Select a theme from the list above -- or search for a concept like "mercy" or "covenant."
            </p>
          </div>
          <div className="flex gap-3">
            <span className="text-gold font-sans font-bold text-sm flex-shrink-0">2.</span>
            <p className="text-sm text-ink">
              The app retrieves the most relevant passage from each tradition via its
              respective API, in your preferred translation.
            </p>
          </div>
          <div className="flex gap-3">
            <span className="text-gold font-sans font-bold text-sm flex-shrink-0">3.</span>
            <p className="text-sm text-ink">
              Three panels appear side by side -- Judaism | Christianity | Islam -- each
              with the passage text, translation, and a brief neutral context note.
            </p>
          </div>
          <div className="flex gap-3">
            <span className="text-gold font-sans font-bold text-sm flex-shrink-0">4.</span>
            <p className="text-sm text-ink">
              A "What connects these?" note below the panels identifies the shared thread
              without declaring any tradition's interpretation superior.
            </p>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-border-subtle">
        <p className="text-sm text-muted mb-3">
          Explore the traditions that will be compared:
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
