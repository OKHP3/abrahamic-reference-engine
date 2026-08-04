const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

// ── Types ──────────────────────────────────────────────────────────────────

interface Skill {
  id: string
  name: string
  version: string
  category: string
  categoryLabel: string
  description: string
  inScope: string
  outScope: string
  githubUrl: string
  appRoute?: string
  appRouteLabel?: string
}

// ── Data ───────────────────────────────────────────────────────────────────

const ARE_SKILLS: Skill[] = [
  {
    id: 'okhp3-verse-lookup',
    name: 'Verse Lookup',
    version: '—',
    category: 'scripture-retrieval',
    categoryLabel: 'Scripture Retrieval',
    description:
      'Retrieves a specific scripture reference by book, chapter, and verse from Sefaria (Jewish texts), bible-api.com (Christian canon), or Quran.com (Islamic texts). Handles translation selection, canonical addressing, and provider fallback.',
    inScope: 'Precise chapter/verse retrieval across Judaism, Christianity, and Islam; translation selection; provider fallback routing.',
    outScope: 'Full-text search, commentary, devotional guidance, or denomination-specific variant selection.',
    githubUrl: 'https://github.com/OKHP3/abrahamic-reference-engine/tree/main/.agents/skills/okhp3-verse-lookup',
    appRoute: '/lookup',
    appRouteLabel: 'Verse Lookup tab',
    local: true,
  },
  {
    id: 'okhp3-cross-tradition-compare',
    name: 'Cross-Tradition Compare',
    version: '—',
    category: 'comparative-theology',
    categoryLabel: 'Comparative Theology',
    description:
      'Finds parallel passages across two or three Abrahamic traditions on a shared theological theme — creation, covenant, prayer, afterlife — and aligns them side-by-side for academic comparison without imposing interpretation.',
    inScope: 'Thematic parallel identification; side-by-side text alignment across Judaism, Christianity, and Islam.',
    outScope: 'Theological interpretation, devotional guidance, sectarian commentary, or non-Abrahamic traditions.',
    githubUrl: 'https://github.com/OKHP3/abrahamic-reference-engine/tree/main/.agents/skills/okhp3-cross-tradition-compare',
    appRoute: '/compare',
    appRouteLabel: 'Compare tab',
    local: true,
  },
  {
    id: 'okhp3-tradition-reference',
    name: 'Tradition Reference',
    version: '—',
    category: 'reference-data',
    categoryLabel: 'Reference Data',
    description:
      'Returns authoritative metadata about any supported tradition: canon scope and book count, available translations, US demographic share from Pew Research Center, and the API provider routing table used by the engine.',
    inScope: 'Canon scope, translation matrix, Pew demographic data, API endpoint routing for all supported denominations.',
    outScope: 'Devotional content, clergy contact information, community directories, or non-Abrahamic traditions.',
    githubUrl: 'https://github.com/OKHP3/abrahamic-reference-engine/tree/main/.agents/skills/okhp3-tradition-reference',
    appRoute: '/browse',
    appRouteLabel: 'Browse tab',
    local: true,
  },
  {
    id: 'okhp3-tradition-observance-calendar',
    name: 'Observance Calendar',
    version: '—',
    category: 'calendar-data',
    categoryLabel: 'Calendar Data',
    description:
      'Computes observance dates and descriptions for Jewish, Christian, and Islamic holidays for any requested year. Outputs structured event data or iCalendar (.ics) format for calendar import. Supports multi-tradition merging.',
    inScope: 'Holiday dates, descriptions, iCal export, and multi-tradition calendar merging for any supported year.',
    outScope: 'Liturgical planning software, clerical schedules, or observances outside the three Abrahamic traditions.',
    githubUrl: 'https://github.com/OKHP3/abrahamic-reference-engine/tree/main/.agents/skills/okhp3-tradition-observance-calendar',
    appRoute: '/observances',
    appRouteLabel: 'Observances tab',
    local: true,
  },
  {
    id: 'okhp3-celestial-data',
    name: 'Celestial Data',
    version: '—',
    category: 'astronomical-data',
    categoryLabel: 'Astronomical Data',
    description:
      'Calculates current moon phase, active astrological season, and Mercury retrograde status for a given date or date range. Used to contextualize religious observances against lunar and solar cycles.',
    inScope: 'Moon phase, solar season, Mercury retrograde windows, and proximity to significant celestial events.',
    outScope: 'Natal astrology, horoscopes, predictive forecasting, or non-Abrahamic ritual timing guidance.',
    githubUrl: 'https://github.com/OKHP3/abrahamic-reference-engine/tree/main/.agents/skills/okhp3-celestial-data',
    appRoute: '/observances',
    appRouteLabel: 'Observances tab',
    local: true,
  },
]

// ── Category color map ──────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  'scripture-retrieval':  'text-gold bg-gold/10 border-gold/20',
  'comparative-theology': 'text-gold bg-gold/10 border-gold/20',
  'reference-data':       'text-gold bg-gold/10 border-gold/20',
  'calendar-data':        'text-gold bg-gold/10 border-gold/20',
  'astronomical-data':    'text-gold bg-gold/10 border-gold/20',
}

// ── Sub-components ─────────────────────────────────────────────────────────

function SkillCard({ skill }: { skill: Skill }) {
  const catColor = CATEGORY_COLORS[skill.category] ?? 'text-muted bg-border-subtle/40 border-border-mid'

  return (
    <article className="card flex flex-col gap-3 hover:border-border-mid transition-all duration-150">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-sans font-semibold text-parchment leading-snug">
          {skill.name}
        </h3>
        <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
          {skill.version !== '—' && (
            <span className="text-2xs font-sans font-medium text-muted bg-bg-base border border-border-subtle px-1.5 py-0.5 rounded font-mono">
              v{skill.version}
            </span>
          )}
          <span className={`text-2xs font-sans font-medium border px-1.5 py-0.5 rounded ${catColor}`}>
            {skill.categoryLabel}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs font-sans text-dimmed leading-relaxed flex-1">
        {skill.description}
      </p>

      {/* Scope */}
      <div className="space-y-1.5 pt-1 border-t border-border-subtle">
        <div className="flex gap-2">
          <span className="text-2xs font-sans font-semibold text-gold flex-shrink-0 mt-0.5 leading-relaxed">IN</span>
          <p className="text-2xs font-sans text-muted leading-relaxed">{skill.inScope}</p>
        </div>
        <div className="flex gap-2">
          <span className="text-2xs font-sans font-semibold text-muted flex-shrink-0 mt-0.5 leading-relaxed">OUT</span>
          <p className="text-2xs font-sans text-muted leading-relaxed">{skill.outScope}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1">
        <a
          href={skill.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xs font-sans text-muted hover:text-gold transition-colors duration-150 no-underline flex items-center gap-1"
          aria-label={`View ${skill.name} on GitHub (opens in new tab)`}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          SKILL.md
        </a>
        {skill.appRoute && skill.appRouteLabel && (
          <a
            href={`${BASE}${skill.appRoute}`}
            className="text-2xs font-sans text-gold hover:text-gold-light transition-colors duration-150 no-underline"
          >
            → {skill.appRouteLabel}
          </a>
        )}
      </div>
    </article>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function SkillsGallery() {
  return (
    <div className="space-y-10 pb-12">
      {/* Page header */}
      <div>
        <span className="section-rule" aria-hidden="true" />
        <h1 className="text-2xl font-serif text-parchment mb-2">Agent Skills</h1>
        <p className="text-sm font-sans text-dimmed leading-relaxed max-w-2xl">
          Portable, platform-agnostic instruction files (SKILL.md) that extend any compatible AI agent — Claude Code, GitHub Copilot, Cursor, Windsurf, and similar clients. These five skills are the extractable agent logic layer of the Abrahamic Reference Engine; each maps to one of the app's tabs and is usable independently outside this app.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <a
            href="https://github.com/OKHP3/abrahamic-reference-engine/tree/main/skills"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-sans text-gold hover:text-gold-light no-underline border border-gold/30 hover:border-gold/60 px-3 py-1.5 rounded transition-all duration-150"
          >
            View skills on GitHub →
          </a>
          <a
            href="https://github.com/OKHP3/skillz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-sans text-muted hover:text-parchment no-underline border border-border-mid hover:border-border-mid px-3 py-1.5 rounded transition-all duration-150"
          >
            OKHP3/skillz distribution repo →
          </a>
        </div>
      </div>

      {/* Skills grid */}
      <section aria-label="ARE operation skills">
        <div className="flex items-baseline gap-3 mb-5">
          <h2 className="text-xs font-sans font-bold tracking-widest uppercase text-gold">
            ARE Skills
          </h2>
          <span className="text-2xs font-sans text-muted">{ARE_SKILLS.length} skills</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ARE_SKILLS.map(skill => <SkillCard key={skill.id} skill={skill} />)}
        </div>
      </section>

      {/* Footer note */}
      <p className="text-2xs font-sans text-muted leading-relaxed border-t border-border-subtle pt-4">
        All skills are MIT licensed · Authored by Jamie Hill — OverKill Hill P³™ ·{' '}
        <a href="https://overkillhill.com" target="_blank" rel="noopener noreferrer" className="text-gold-muted hover:text-gold no-underline transition-colors duration-150">
          overkillhill.com
        </a>
      </p>
    </div>
  )
}
