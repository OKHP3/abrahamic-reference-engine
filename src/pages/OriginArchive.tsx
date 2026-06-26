const KNOWLEDGE_FILES = [
  { file: 'judaism_tanakh_primer.md', label: 'Judaism -- Tanakh Primer', tradition: 'Judaism' },
  { file: 'christianity_catholic_canon.md', label: 'Christianity -- Catholic Canon', tradition: 'Christianity' },
  { file: 'christianity_mainline_protestant.md', label: 'Christianity -- Mainline Protestant', tradition: 'Christianity' },
  { file: 'christianity_evangelical_baptist.md', label: 'Christianity -- Evangelical / Baptist', tradition: 'Christianity' },
  { file: 'christianity_orthodox_canon.md', label: 'Christianity -- Orthodox Canon', tradition: 'Christianity' },
  { file: 'christianity_restorationist_lds.md', label: 'Christianity -- LDS / Restorationist', tradition: 'Christianity' },
  { file: 'christianity_ecumenical_concordance.md', label: 'Christianity -- Ecumenical Concordance', tradition: 'Christianity' },
  { file: 'islam_quran_primer.md', label: 'Islam -- Quran Primer', tradition: 'Islam' },
  { file: 'hinduism_bhagavad_gita_primer.md', label: 'Hinduism -- Bhagavad Gita Primer', tradition: 'Phase 2' },
  { file: 'buddhism_dhammapada_primer.md', label: 'Buddhism -- Dhammapada Primer', tradition: 'Phase 2' },
  { file: 'comparative_methods.md', label: 'Comparative Methods', tradition: 'Cross-cutting' },
  { file: 'translation_metadata_and_licenses.md', label: 'Translation Metadata & Licenses', tradition: 'Cross-cutting' },
  { file: 'glossary_neutral_terms.md', label: 'Glossary of Neutral Terms', tradition: 'Cross-cutting' },
  { file: 'reserved_minor_traditions.md', label: 'Reserved -- Minor Traditions', tradition: 'Reserve' },
  { file: 'reserved_nonaffiliated_perspectives.md', label: 'Reserved -- Non-affiliated Perspectives', tradition: 'Reserve' },
]

const OPENAPI_FILES = [
  { file: 'openapi_bible.json', label: 'API.Bible (Christianity)' },
  { file: 'openapi_sefaria.json', label: 'Sefaria (Judaism)' },
  { file: 'openapi_quran.json', label: 'Quran.com (Islam, primary)' },
  { file: 'openapi_alquran.json', label: 'AlQuran.cloud (Islam, fallback)' },
  { file: 'openapi_hadith.json', label: 'Hadith API (stub)' },
]

const TRADITION_COLORS: Record<string, string> = {
  Judaism: 'text-blue-400 border-blue-800 bg-blue-950',
  Christianity: 'text-violet-400 border-violet-800 bg-violet-950',
  Islam: 'text-emerald-400 border-emerald-800 bg-emerald-950',
  'Phase 2': 'text-amber-400 border-amber-800 bg-amber-950',
  'Cross-cutting': 'text-gold border-gold/30 bg-bg-base',
  Reserve: 'text-muted border-border-subtle bg-bg-base',
}

const BASE = import.meta.env.BASE_URL

export default function OriginArchive() {
  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-light text-gold mb-2">
          Origin Archive
        </h1>
        <p className="text-base text-ink leading-relaxed max-w-2xl">
          ARE began as a GPT design conversation in October 2025.
          This page preserves that origin -- the design thread, the v0.1 artifact bundle, and the decisions that shaped what got built.
        </p>
      </div>

      <aside
        className="border border-border-subtle rounded-lg bg-bg-elevated p-5 mb-8"
        aria-labelledby="origin-story-heading"
      >
        <h2
          id="origin-story-heading"
          className="text-xs font-sans font-bold tracking-widest uppercase text-gold mb-3"
        >
          How It Started
        </h2>
        <div className="space-y-3 text-sm text-ink leading-relaxed">
          <p>
            Patrick had an idea: a GPT that could look up scripture and compare passages across traditions, neutral and citation-first.
            One conversation turned it into a full product architecture -- scope, APIs, knowledge-file allocation, brand placement, tone constraints, and a 27-file asset bundle.
          </p>
          <p>
            That conversation happened on October 17, 2025, inside ChatGPT.
            The ARE you are using now is the direct descendant of what was designed there.
          </p>
          <p className="text-muted text-xs italic">
            "The valuable nuggets are the architectural decisions, not merely the zip file." -- ARE00 Thread Summary
          </p>
        </div>
      </aside>

      <section className="mb-8">
        <h2 className="text-xs font-sans font-bold tracking-widest uppercase text-gold mb-4">
          Design Thread Summary
        </h2>
        <div className="border border-border-subtle rounded-lg bg-bg-elevated p-5 space-y-2">
          <p className="text-sm text-ink leading-relaxed">
            A full executive summary of the origin conversation -- scope decisions, brand placement rationale, API strategy, knowledge allocation, competitive positioning, and functional requirements.
          </p>
          <a
            href={`${BASE}origin/are00_thread_summary.md`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-sans text-gold hover:text-gold-light transition-colors no-underline block mt-3"
          >
            Read are00_thread_summary.md &rarr;
          </a>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xs font-sans font-bold tracking-widest uppercase text-gold mb-4">
          v0.1 Artifact Bundle
        </h2>
        <div className="border border-border-subtle rounded-lg bg-bg-elevated p-5 mb-4">
          <p className="text-sm text-ink leading-relaxed mb-4">
            The 27-file bundle generated during the origin conversation.
            Knowledge scaffolds, OpenAPI action stubs, translation matrix, settings schema, test queries, UI copy, and changelog.
            First-pass prototype -- not production-ready, but the concrete output of the design sprint.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`${BASE}origin/gpt_religion_project_bundle.zip`}
              download
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-sans font-semibold text-gold border border-gold/40 rounded hover:bg-gold/10 transition-colors no-underline"
            >
              Download bundle .zip
            </a>
            <a
              href={`${BASE}origin/gpt_religion_project/README.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-sans text-muted border border-border-subtle rounded hover:text-parchment hover:border-border-mid transition-colors no-underline"
            >
              Installation README &rarr;
            </a>
            <a
              href={`${BASE}origin/gpt_religion_project/CHANGELOG.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-sans text-muted border border-border-subtle rounded hover:text-parchment hover:border-border-mid transition-colors no-underline"
            >
              CHANGELOG &rarr;
            </a>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-2xs font-sans font-semibold tracking-widest uppercase text-muted mb-3 px-1">
            Knowledge Scaffolds (15)
          </h3>
          <div className="space-y-1.5">
            {KNOWLEDGE_FILES.map(({ file, label, tradition }) => (
              <div
                key={file}
                className="flex items-center justify-between gap-3 px-3 py-2 border border-border-subtle rounded bg-bg-elevated"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`text-2xs font-sans px-1.5 py-0.5 rounded border flex-shrink-0 ${TRADITION_COLORS[tradition]}`}>
                    {tradition}
                  </span>
                  <span className="text-xs text-ink truncate">{label}</span>
                </div>
                <a
                  href={`${BASE}origin/gpt_religion_project/${file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xs font-sans text-gold hover:text-gold-light transition-colors no-underline flex-shrink-0"
                >
                  view &rarr;
                </a>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xs font-sans font-semibold tracking-widest uppercase text-muted mb-3 px-1">
            OpenAPI Action Stubs (5)
          </h3>
          <div className="space-y-1.5">
            {OPENAPI_FILES.map(({ file, label }) => (
              <div
                key={file}
                className="flex items-center justify-between gap-3 px-3 py-2 border border-border-subtle rounded bg-bg-elevated"
              >
                <span className="text-xs text-ink">{label}</span>
                <a
                  href={`${BASE}origin/gpt_religion_project/${file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xs font-sans text-gold hover:text-gold-light transition-colors no-underline flex-shrink-0"
                >
                  view &rarr;
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xs font-sans font-bold tracking-widest uppercase text-gold mb-4">
          What the Origin Designed vs What Got Built
        </h2>
        <div className="border border-border-subtle rounded-lg bg-bg-elevated p-5">
          <div className="space-y-3">
            {[
              { designed: 'Sefaria for Tanakh', built: 'Implemented -- live in Verse Lookup', done: true },
              { designed: 'Quran.com + AlQuran.cloud fallback', built: 'Implemented -- both providers wired', done: true },
              { designed: 'Denomination-aware Bible translation defaults', built: 'Implemented -- Settings panel', done: true },
              { designed: 'Cross-tradition theme comparison', built: 'Implemented -- 20 pre-seeded themes in Compare', done: true },
              { designed: 'Religious observance calendar', built: 'Implemented -- Hebcal, AlAdhan, Computus, .ics export', done: true },
              { designed: 'Orthodox canon gap handling', built: 'Implemented -- detectOrthodoxGap() + BibleGateway fallback', done: true },
              { designed: 'LDS Standard Works via community API', built: 'Implemented -- nephi.org routing', done: true },
              { designed: 'Neutral scope with Pew citation', built: 'Implemented -- ScopeExplainer on every tab', done: true },
              { designed: 'Agent skills package', built: 'Implemented -- 5 OKHP3 skills published to skillz repo', done: true },
              { designed: 'API.Bible for Christian passages', built: 'Replaced with bible-api.com (no key required)', done: true },
              { designed: 'Phase 2: Hinduism + Buddhism', built: 'Deferred -- outside ARE v1 scope', done: false },
              { designed: 'GPT Builder deployment', built: 'Deferred -- ARE shipped as standalone SPA instead', done: false },
            ].map(({ designed, built, done }) => (
              <div key={designed} className="flex items-start gap-3">
                <span className={`flex-shrink-0 text-sm mt-0.5 ${done ? 'text-emerald-400' : 'text-muted'}`}>
                  {done ? '✓' : '○'}
                </span>
                <div>
                  <p className="text-xs text-parchment font-medium">{designed}</p>
                  <p className="text-xs text-muted">{built}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <aside
        className="border border-border-subtle rounded-lg bg-bg-elevated p-5 mb-6"
        aria-labelledby="origin-credit-heading"
      >
        <h2
          id="origin-credit-heading"
          className="text-xs font-sans font-bold tracking-widest uppercase text-gold mb-2"
        >
          Credit
        </h2>
        <p className="text-sm text-ink leading-relaxed">
          Conceived, designed, and built by Patrick -- OverKill Hill P3.
        </p>
        <p className="text-xs text-muted mt-1 leading-relaxed">
          Origin conversation: ChatGPT, October 17, 2025.
          SPA implementation: Replit, 2026.
        </p>
        <div className="mt-3 flex flex-wrap gap-4">
          <a href="https://overkillhill.com/" target="_blank" rel="noopener noreferrer" className="text-xs font-sans text-gold hover:text-gold-light transition-colors no-underline">overkillhill.com &rarr;</a>
          <a href="https://github.com/OKHP3" target="_blank" rel="noopener noreferrer" className="text-xs font-sans text-gold hover:text-gold-light transition-colors no-underline">github.com/OKHP3 &rarr;</a>
          <a href="https://github.com/OKHP3/skillz/tree/main/abrahamic" target="_blank" rel="noopener noreferrer" className="text-xs font-sans text-gold hover:text-gold-light transition-colors no-underline">ARE Agent Skills &rarr;</a>
        </div>
      </aside>

    </div>
  )
}
