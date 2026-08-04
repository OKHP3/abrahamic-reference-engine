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
  local: boolean // lives in this repo's .agents/skills/
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
    githubUrl: 'https://github.com/OKHP3/skillz/tree/main/abrahamic/okhp3-verse-lookup',
    appRoute: '/lookup',
    appRouteLabel: 'Verse Lookup tab',
    local: false,
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
    githubUrl: 'https://github.com/OKHP3/skillz/tree/main/abrahamic/okhp3-cross-tradition-compare',
    appRoute: '/compare',
    appRouteLabel: 'Compare tab',
    local: false,
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
    githubUrl: 'https://github.com/OKHP3/skillz/tree/main/abrahamic/okhp3-tradition-reference',
    appRoute: '/browse',
    appRouteLabel: 'Browse tab',
    local: false,
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
    githubUrl: 'https://github.com/OKHP3/skillz/tree/main/abrahamic/okhp3-tradition-observance-calendar',
    appRoute: '/observances',
    appRouteLabel: 'Observances tab',
    local: false,
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
    githubUrl: 'https://github.com/OKHP3/skillz/tree/main/abrahamic/okhp3-celestial-data',
    appRoute: '/observances',
    appRouteLabel: 'Observances tab',
    local: false,
  },
]

const TOOLKIT_SKILLS: Skill[] = [
  {
    id: 'okhp3-skill-foundry',
    name: 'Skill Foundry',
    version: '3.1.0',
    category: 'meta-tooling',
    categoryLabel: 'Meta-Tooling',
    description:
      'The authoritative OKHP3 workflow for creating, auditing, testing, and improving portable Agent Skills. Covers evidence-backed instruction authoring, progressive disclosure patterns, risk-based evaluation design, and release checks.',
    inScope: 'Authoring new SKILL.md files; improving existing skills; designing and grading evaluations; diagnosing weak trigger behavior; synchronizing a skill across repositories.',
    outScope: 'Running general code tasks, executing builds, or performing work outside the skill-authoring domain.',
    githubUrl: 'https://github.com/OKHP3/abrahamic-reference-engine/tree/main/.agents/skills/okhp3-skill-foundry',
    local: true,
  },
  {
    id: 'okhp3-skill-cataloger',
    name: 'Skill Cataloger',
    version: '1.6.1',
    category: 'universal',
    categoryLabel: 'Universal',
    description:
      'Inventories and validates all repository-local Agent Skills, then safely regenerates the machine-readable catalog README. Supports project-surface mode for individual repos and distribution-index mode for the skillz monorepo.',
    inScope: 'Listing, auditing, version-checking, validating, and refreshing skills under .agents/skills/; indexing a distribution repository\'s root family folders.',
    outScope: 'Modifying skill content, publishing to external registries, or creating new skills from scratch.',
    githubUrl: 'https://github.com/OKHP3/abrahamic-reference-engine/tree/main/.agents/skills/okhp3-skill-cataloger',
    local: true,
  },
  {
    id: 'okhp3-skill-promotion',
    name: 'Skill Promotion',
    version: '0.1.0',
    category: 'universal',
    categoryLabel: 'Universal',
    description:
      'Promotes and synchronizes a project-local Agent Skill into the portable skillz distribution package. Handles provenance recording, canonical family assignment, publication mirroring, and safe handoff into OKHP3/skillz.',
    inScope: 'Skill-source selection, local publication mirrors, provenance tracking, safe synchronization, and validation handoff before promotion.',
    outScope: 'Blind overwrites, deletion of unreviewed work, autonomous commits, pushes, or pull requests.',
    githubUrl: 'https://github.com/OKHP3/abrahamic-reference-engine/tree/main/.agents/skills/okhp3-skill-promotion',
    local: true,
  },
  {
    id: 'okhp3-artifact-validation',
    name: 'Artifact Validation',
    version: '0.1.0',
    category: 'knowledge-operations',
    categoryLabel: 'Knowledge Operations',
    description:
      'Validates a project change, draft, research packet, skill, or handoff before it is treated as complete. Runs any identified project validator, then adds judgment checks the script cannot prove mechanically.',
    inScope: 'Read-only mechanical and judgment validation of a named artifact before handoff or reliance.',
    outScope: 'Inventing a validator, treating an artifact as complete by assumption, publication, or destructive repair.',
    githubUrl: 'https://github.com/OKHP3/abrahamic-reference-engine/tree/main/.agents/skills/okhp3-artifact-validation',
    local: true,
  },
  {
    id: 'okhp3-equilibrium-review',
    name: 'Equilibrium Review',
    version: '1.0.0',
    category: 'evaluation-and-governance',
    categoryLabel: 'Evaluation & Governance',
    description:
      'Evaluates a document, report, spreadsheet, hypothesis, or decision memo with independent evidence review, conditional disruption, and evidence-based adjudication. Use when testing whether an artifact is trustworthy or ready to act on.',
    inScope: 'Testing artifact trustworthiness; multi-agent review design; falsification passes; claim ledgers; structured quality gates.',
    outScope: 'Domain-specific statistical, legal, medical, or security review requiring specialist credentials.',
    githubUrl: 'https://github.com/OKHP3/abrahamic-reference-engine/tree/main/.agents/skills/okhp3-equilibrium-review',
    local: true,
  },
  {
    id: 'okhp3-evidence-standard',
    name: 'Evidence Standard',
    version: '0.1.0',
    category: 'knowledge-operations',
    categoryLabel: 'Knowledge Operations',
    description:
      'Classifies consequential claims as confirmed, inferred, proposal, or unknown, and keeps those tiers visible throughout a document or decision record. Prevents confident presentation of uncertain claims.',
    inScope: 'Cross-machine or cross-agent comparisons; conflicting sources; handoffs; decision records; recommendations from incomplete evidence.',
    outScope: 'Mechanical validation or primary source research — this skill labels claims, it does not verify them.',
    githubUrl: 'https://github.com/OKHP3/abrahamic-reference-engine/tree/main/.agents/skills/okhp3-evidence-standard',
    local: true,
  },
  {
    id: 'okhp3-session-handoff',
    name: 'Session Handoff',
    version: '0.1.0',
    category: 'context-extraction',
    categoryLabel: 'Context Extraction',
    description:
      'Creates a durable continuation record when work pauses, becomes blocked, or crosses an agent host boundary. Records changed files, reasoning, evidence tiers, validation, limitations, and the exact next action without relying on chat memory.',
    inScope: 'Work pauses; blockers; machine or agent host transitions; any time a future session needs to resume accurately.',
    outScope: 'Performing the actual work, generating code, or making file edits — this skill documents state, not state changes.',
    githubUrl: 'https://github.com/OKHP3/abrahamic-reference-engine/tree/main/.agents/skills/okhp3-session-handoff',
    local: true,
  },
  {
    id: 'okhp3-brand-style-registry',
    name: 'Brand Style Registry',
    version: '1.1.0',
    category: 'developer-tooling',
    categoryLabel: 'Developer Tooling',
    description:
      'Extracts and registers a reusable brand or visual style profile from any source — website, stylesheet, document, or presentation. Applies named profiles to target artifacts without blending unrelated brands or treating inferred cues as declared rules.',
    inScope: 'Evidence-backed extraction, registration, and application of named visual style profiles to approved artifacts.',
    outScope: 'Inventing a brand identity, unauthorized source copying, or redesigning unrelated products.',
    githubUrl: 'https://github.com/OKHP3/abrahamic-reference-engine/tree/main/.agents/skills/okhp3-brand-style-registry',
    local: true,
  },
  {
    id: 'okhp3-repository-organizer',
    name: 'Repository Organizer',
    version: '1.1.1',
    category: 'universal',
    categoryLabel: 'Universal',
    description:
      'Profiles and reorganizes content-first Git repositories that grew organically — particularly those containing prompts, AI conversations, research documents, mixed knowledge assets, or Word/PDF/spreadsheet files rather than conventional application code.',
    inScope: 'Evidence-based profiling, purpose summary, classification, naming cleanup, folder design, governance scaffolding, and safe reorganization planning.',
    outScope: 'Application-template advice, new-repository creation, or cataloging skills in an already-structured developer repo.',
    githubUrl: 'https://github.com/OKHP3/abrahamic-reference-engine/tree/main/.agents/skills/okhp3-repository-organizer',
    local: true,
  },
  {
    id: 'okhp3-vite-github-pages',
    name: 'Vite → GitHub Pages',
    version: '1.0.0',
    category: 'deployment',
    categoryLabel: 'Deployment',
    description:
      'Deployment runbook for React/Vite SPAs published to GitHub Pages. Covers Actions workflow configuration, production base paths, HashRouter fallback, dist artifact validation, and Pages environment variable wiring.',
    inScope: 'Deployment and repair of React or Vue Vite SPAs on GitHub Pages, including base paths and router behavior.',
    outScope: 'Servers, databases, backend proxies, gh-pages branches, secret creation, or unrelated application changes.',
    githubUrl: 'https://github.com/OKHP3/abrahamic-reference-engine/tree/main/.agents/skills/okhp3-vite-github-pages',
    local: true,
  },
]

// ── Category color map ──────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  'scripture-retrieval':       'text-gold bg-gold/10 border-gold/20',
  'comparative-theology':      'text-gold bg-gold/10 border-gold/20',
  'reference-data':            'text-gold bg-gold/10 border-gold/20',
  'calendar-data':             'text-gold bg-gold/10 border-gold/20',
  'astronomical-data':         'text-gold bg-gold/10 border-gold/20',
  'meta-tooling':              'text-dimmed bg-border-subtle/40 border-border-mid',
  'universal':                 'text-dimmed bg-border-subtle/40 border-border-mid',
  'knowledge-operations':      'text-dimmed bg-border-subtle/40 border-border-mid',
  'evaluation-and-governance': 'text-dimmed bg-border-subtle/40 border-border-mid',
  'context-extraction':        'text-dimmed bg-border-subtle/40 border-border-mid',
  'developer-tooling':         'text-dimmed bg-border-subtle/40 border-border-mid',
  'deployment':                'text-dimmed bg-border-subtle/40 border-border-mid',
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

function SectionHeader({ label, count, note }: { label: string; count: number; note: string }) {
  return (
    <div className="mb-5">
      <div className="flex items-baseline gap-3 mb-1">
        <h2 className="text-xs font-sans font-bold tracking-widest uppercase text-gold">
          {label}
        </h2>
        <span className="text-2xs font-sans text-muted">{count} skills</span>
      </div>
      <p className="text-xs font-sans text-muted leading-relaxed max-w-prose">{note}</p>
    </div>
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
          Portable, platform-agnostic instruction files (SKILL.md) that extend any compatible AI agent — Claude Code, GitHub Copilot, Cursor, Windsurf, and similar clients. Two families live in this repository: the five operation skills that directly power the ARE's four tabs, and the OKHP3 toolkit of general-purpose meta-skills.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <a
            href="https://github.com/OKHP3/skillz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-sans text-gold hover:text-gold-light no-underline border border-gold/30 hover:border-gold/60 px-3 py-1.5 rounded transition-all duration-150"
          >
            OKHP3/skillz distribution repo →
          </a>
          <a
            href="https://github.com/OKHP3/abrahamic-reference-engine/tree/main/.agents/skills"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-sans text-muted hover:text-parchment no-underline border border-border-mid hover:border-border-mid px-3 py-1.5 rounded transition-all duration-150"
          >
            Skills in this repo →
          </a>
        </div>
      </div>

      {/* ARE Operation Skills */}
      <section aria-labelledby="are-skills-heading">
        <SectionHeader
          label="ARE Skills"
          count={ARE_SKILLS.length}
          note="These five skills are the extractable agent logic layer of the Abrahamic Reference Engine. Each maps directly to one of the app's tabs and is usable independently in any compatible agent outside this app. Distributed via the OKHP3/skillz repository."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ARE_SKILLS.map(skill => <SkillCard key={skill.id} skill={skill} />)}
        </div>
      </section>

      {/* OKHP3 Toolkit */}
      <section aria-labelledby="toolkit-heading">
        <SectionHeader
          label="OKHP3 Toolkit"
          count={TOOLKIT_SKILLS.length}
          note="General-purpose meta-skills authored by OverKill Hill P³ for use across any repository or project. These ship with this repo and are promoted to the OKHP3/skillz distribution as they reach release quality."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TOOLKIT_SKILLS.map(skill => <SkillCard key={skill.id} skill={skill} />)}
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
