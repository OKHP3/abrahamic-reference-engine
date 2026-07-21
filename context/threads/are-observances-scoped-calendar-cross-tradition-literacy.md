---
title: "ARE Observances: Scoped Calendar for Cross-Tradition Literacy"
primary_topic: "ARE Observances scoped calendar for cross-tradition literacy"
source_platform: "ChatGPT"
capture_mode: "full-paste"
completeness: "partial"
extraction_depth: "comprehensive"
requested_extraction_depth: "exhaustive"
source_title: "ChatGPT thread capture: Generate a lengthy summary of the entire thread"
source_date: "June 14 and June 24; year unknown in supplied source"
source_time_context: "Initial request at 11:10 PM; later capture prompt at 11:41 PM; exact span unknown"
source_locator: "User-supplied attachment: pasted-text.txt; account-scoped ChatGPT URLs intentionally omitted"
retention_decision: "redacted"
source_independence: "pass"
generated_at: "2026-07-21T20:42:45Z"
schema_version: "2.0"
artifact_type: thread-context-extract
---

# ARE Observances: Scoped Calendar for Cross-Tradition Literacy

## Introduction

The supplied ChatGPT capture documents the decision to extend Abrahamic Reference Engine with a fourth top-level mode named Observances: a neutral, source-labeled calendar of major Jewish, Christian, and Islamic observances for cross-tradition literacy. The thread establishes a firm boundary between visibility and authority, favors free public sources and deterministic date calculations, rejects Google Calendar OAuth and direct calendar writes, and defines a public `.ics` subscription path compatible with a static GitHub Pages deployment. It also develops a long-form implementation plan covering scope tiers, source strategy, event explanations, confidence labels, emoji display rules, TypeScript data models, date calculations, ICS and JSON output, UI behavior, a reusable observance skill, testing, risk controls, and a Replit execution sequence. The same capture records a migration decision: the historical Custom GPT bundle is useful source material, but the current repository should remain SPA-native and should not recreate the old GPT Builder plus OpenAPI architecture. The current repository already contains an Observances page, adapters, calendar utilities, UI components, documentation references, and the observance skill, so this artifact serves as a detailed decision and provenance record for auditing alignment between the original PRD and the implementation.

## Extraction profile

- **Requested depth:** Very detailed context; the supplied source itself requests exhaustive nugget extraction.
- **Selected depth:** comprehensive.
- **Selection basis:** The source explicitly says “exhaustive extraction,” “completeness over brevity,” and “over-capture, never lose value.”
- **Profile changes:** None. The source was assessed as a whole before drafting.
- **Focus areas:** Observances product decision; scope and authority boundaries; zero-cost architecture; provider and calculation strategy; implementation acceptance criteria; migration from the historical Custom GPT bundle; Notion and GitHub routing implications.
- **Must preserve:** Named decisions, constraints, dates and examples, source and confidence rules, event-body structure, rejected alternatives and their rationale, file and route plans, acceptance criteria, risks, and unresolved differences between the source PRD and the current repository.
- **Safe exclusions:** Repeated UI chrome, repeated copies of the same user vision, duplicated Notion URLs, and comedic filler that does not change a decision.
- **Coverage rule:** Preserve unique decisions and requirements individually; compress repeated restatements; catalog referenced files, URLs, attachments, and missing sidecars explicitly; exclude platform chrome from semantic content while retaining it as boundary evidence.
- **Not carried forward:** Private/account-scoped Notion page IDs and URLs; the supplied ChatGPT project and conversation URLs; raw transcript prose as a lossless archive; the actual starter ZIP, which is referenced but not present in the supplied attachment.
- **Source-independence test:** pass. A capable reader can understand the Observances objective, recover the main decisions, inspect the current repository implementation, identify open discrepancies, and resume with the handoff below without access to the original ChatGPT account or Notion workspace.

## Coverage accounting

| Material class | Assessed | Retained | Compressed | Omitted with reason | Missing or unavailable | Notes |
|---|---:|---:|---:|---:|---:|---|
| Turns or turn groups | 7 | 7 | 0 | 0 | 0 | Logical groups reconstructed from date labels, response markers, and topic shifts; this is not a lossless role transcript. |
| Rich elements | 8 | 6 | 1 | 1 | 4 | Public repository link and text-based code/config excerpts retained; private Notion destinations and ChatGPT account URLs are cataloged but not reproduced. |
| Decisions and alternatives | 24 | 24 | 0 | 0 | 0 | Includes the Observances boundary, source choices, architecture, migration, and non-goals. |
| Reusable assets | 15 | 15 | 0 | 0 | 1 | Includes PRD structure, data model, event template, acceptance checks, copy deck, execution order, and routing plan; the referenced ZIP is unavailable. |

## Source synopsis

The capture begins with a request to summarize an entire ChatGPT thread, check whether it had already been routed to Notion, deduplicate it, reconcile it against GitHub, and backlink the durable artifacts to the originating thread. A later “Capture & Route Prompt” makes that workflow explicit. It defines a Brain hub and Intake landing zone, separate Chat Threads and Extracts layers, a Domains routing table, a Projects relation, and a GitHub-to-Notion index. It requires exhaustive nugget extraction, one idea per extract, preservation of important wording and caveats, two-layer deduplication, GitHub reconciliation, a pending status when a source share URL is unavailable, and an archive gate requiring at least 70 percent value capture plus topic, date, origin, and canonical destination retrieval axes.

The substantive product decision is an Observances feature for Abrahamic Reference Engine. The user vision asks for an in-scope religious calendar that lets people view observances in the app and connect them to Google Calendar, with event bodies explaining what each observance is, why it matters, who observes it, and how it relates to the tradition. The intended audience is not only practitioners. It includes secular readers, students, educators, writers, managers, believers learning about another tradition, and interfaith participants. The feature is framed as bridge-building and cultural literacy rather than practice instruction or theological adjudication.

The assistant accepts the feature but narrows it. The visible mode should be called Observances, not Holidays or a full religious calendar. It should show major observances only for Judaism, Christianity, and Islam, use source-backed data or deterministic calculations, display source and date-confidence metadata, explain dates and practices in plain U.S. English, and publish a public `.ics` feed. Google Calendar should be supported through its public “From URL” subscription flow. Google OAuth, direct calendar writes, accounts, personal-data storage, and a backend are rejected because they would violate the repository’s static, anonymous, zero-cost posture.

The source then expands into a prescriptive PRD. It defines the fourth route as `/observances`, keeps the existing Browse, Lookup, and Compare modes, preserves the dark scholarly UI, and requires filters, event cards, source notes, an export panel, and optionally a month view. It establishes an event-body template with “What it is,” “Why it matters,” “Who observes it,” “Date note,” an educational ARE note, and Sources. It specifies emoji only in display titles and ICS summaries: the Star of David for Judaism, a cross for broad Christian observances, an Orthodox cross for Orthodox-specific events, and a crescent-and-star for Islam. It prohibits emoji in IDs, route paths, filenames, function names, or TypeScript discriminants.

The source proposes a Tier 1 MVP allowlist. Judaism includes Rosh Hashanah, Yom Kippur, Sukkot, Shemini Atzeret, Simchat Torah, Hanukkah, Tu BiShvat, Purim, Passover/Pesach, Yom HaShoah, Shavuot, and Tisha B’Av. Broad Christianity includes Advent, Christmas, Epiphany, Ash Wednesday, Palm Sunday, Maundy Thursday, Good Friday, Easter, Ascension, Pentecost, and All Saints. Orthodox Christianity receives separate date logic for Orthodox Christmas, Clean Monday or Orthodox Lent, Orthodox Palm Sunday, Orthodox Good Friday, Orthodox Pascha, Orthodox Ascension, and Orthodox Pentecost. Islam includes Ramadan, Laylat al-Qadr, Eid al-Fitr, Hajj, the Day of Arafah, Eid al-Adha, Islamic New Year, Ashura, and Mawlid with a variation note. Later tiers may add limited denominational overlays, but the source explicitly excludes full saint calendars, daily learning cycles, prayer times, candle-lighting events, local congregation calendars, civic holidays, and micro-observances.

The provider strategy is intentionally mixed. Hebcal is the Jewish source because it offers free JSON and iCalendar endpoints, requires no registration or API key, supports Diaspora mode, and is identified in the source as CC BY 4.0. AlAdhan is the Islamic source candidate, but Islamic dates must be labeled calculated, estimated, or community-variable because moon sighting, calculation method, locality, and community authority can differ. Christian dates should be generated locally with Western and Orthodox computus rather than scraped from a copyrighted calendar. USCCB and Orthodox sources may validate dates, but the implementation should not reproduce copyrighted calendar prose. Explanations should be original and neutral.

The preferred runtime architecture is build-time or scheduled generation of static JSON and ICS files under `public/calendars/`, with the SPA reading local JSON and users subscribing to the public ICS URL. The source notes that live API calls may be acceptable where CORS permits, but they should not be a mandatory dependency for deployed UI behavior. It proposes deterministic IDs, exclusive ICS end dates, all-day events, no alarms, source URLs, transparency markers, and robust escaping for commas, semicolons, backslashes, and line breaks. It also defines a source registry, a normalized `ObservanceEvent` shape, a calendar payload shape, date validation, UI acceptance checks, and a skill package that exposes the same logic outside the web UI.

The final part of the capture revisits the original starter bundle. That package was a historical Custom GPT-era asset bundle with 27 files, approximately 543 KB uncompressed, including 15 knowledge Markdown files, a translation matrix, settings schema, test queries, UI copy, README, changelog, a generator, and OpenAPI stubs. The migration conclusion is that those assets are historical source material only. Current ARE equivalents belong in React/TypeScript source, static data, public calendar files, and `.agents/skills/`. The bundle may inform tone, attribution, and testing, but the Observances implementation should not recreate GPT Builder knowledge slots or OpenAPI Actions.

## Turn ledger

| Turn | Role | Role confidence | Boundary evidence | Content elements | Summary |
|---|---|---|---|---|---|
| T001 | user | high | Explicit date label “Sun, Jun 14 at 11:10 PM” followed by a direct request | E001, E002, E004 | Requests a lengthy thread summary, Notion dedupe and routing, GitHub reconciliation, and backlinks. |
| T002 | user or pasted system context | medium | Date label “Wed, Jun 24 at 11:41 PM,” “Notion” marker, and a structured capture prompt | E004, E005 | Defines the two-layer Notion capture workflow, exhaustive nuggets, routing, dedupe, GitHub checks, backlink limitation, and archive contract. |
| T003 | assistant | medium | “Thought for 3m 2s” followed by “Verdict” and a sustained recommendation | E005, E006, E007 | Accepts a bounded Observances tab and explains visibility-layer, source, scope, and Google Calendar decisions. |
| T004 | user | high | First-person product intent and explicit zero-cost requirement | E007 | Requests a long-form Observances PRD and a new observance-calendar skill. |
| T005 | assistant | medium | “Received app response,” “Thought for 2m 36s,” then a titled PRD | E007, E008 | Produces the detailed PRD covering product, scope, data, architecture, UI, skill, testing, and implementation tasks. |
| T006 | user or attachment context | medium | “gpt_religion_project_bundle.zip” and “Zip Archive” markers | E006 | Identifies the historical starter bundle as an input to migration reasoning. |
| T007 | assistant | medium | “Thought for 39s,” “Confirmed,” and a migration comparison | E006, E007 | Distinguishes historical GPT Builder assets from the current SPA-native ARE architecture and proposes a clean migration note. |

Role confidence is not high for every assistant block because the supplied text is a flattened, manually supplied capture rather than a structured export with message IDs and role fields. The source contains no mapping object, branch metadata, regeneration history, or complete message-node inventory.

## Content element ledger

| Element | Turn | Type | Owner | Fidelity | Source locator | Destination reference | Catalog action |
|---|---|---|---|---|---|---|---|
| E001 | T001 | artifact | user | text-extracted | Supplied attachment `pasted-text.txt` | Provenance and retention | retain |
| E002 | T001 | citation | user | metadata-only | ChatGPT Project and conversation URLs supplied in the task; not copied into this repository artifact | Provenance caveat | flag-missing |
| E003 | T001-T002 | citation | user | referenced-not-supplied | Account-scoped Notion Brain, Intake, Chat Threads, Extracts, Domains, Projects, and routing destinations | Notion capture report below | flag-missing |
| E004 | T001-T002 | citation | user | metadata-only | Public GitHub owner and ARE repository links | Repository reconciliation | retain |
| E005 | T003-T005 | code | assistant | text-extracted | TypeScript interfaces, route snippets, event IDs, computus formulas, API parameters, JSON, and ICS examples | Reusable methods and assets | retain |
| E006 | T006-T007 | file | user/assistant | referenced-not-supplied | `gpt_religion_project_bundle.zip`; the actual ZIP is not present in the supplied attachment | Migration notes and open limits | flag-missing |
| E007 | T003-T007 | citation | assistant | text-extracted | Provider, licensing, and Google Calendar help references named in the capture | Source strategy and verification notes | retain |
| E008 | T001-T007 | ui_chrome | unknown | metadata-only | “ChatGPT,” “Notion,” “Thought for,” “Received app response,” and “Zip Archive” labels | Boundary evidence only | exclude-chrome |

No rich element is treated as proof of availability merely because a filename, URL, or file-chip label appears in the pasted text. The missing ZIP, private destinations, and account-scoped source URLs remain explicit exceptions.

## Normalization exceptions

1. **Flattened conversation:** The file is a long Markdown/text paste containing prior summaries and PRD material, not a raw ChatGPT export. It cannot prove that every original user and assistant turn was captured.
2. **Missing source mapping:** No conversation ID, node IDs, parent/child links, current node, update times, or alternate branches are present. A migration manifest with normalized mapping nodes cannot be truthfully generated from this file alone.
3. **Incomplete sidecars:** The actual `gpt_religion_project_bundle.zip` is referenced but not supplied. Its file list is preserved only as described in the capture.
4. **Private destinations:** The source includes account-scoped Notion pages, databases, and IDs. They are not reproduced here to keep this repository artifact public-safe. A Notion connector must resolve and inspect them before any write.
5. **Source URL limitation:** The capture itself says the per-thread URL was unavailable to the earlier MCP request. The current task supplies ChatGPT Project and conversation URLs, but they were not opened or verified during this local extraction.
6. **Repeated material:** The user’s Observances vision appears more than once. Repeated copies were compressed into one decision record while preserving distinct requirements and the later PRD elaboration.
7. **Date ambiguity:** The source gives June 14 and June 24 without a year. The year is not asserted in the artifact metadata; any 2026 association comes from surrounding repository context and is not treated as source fact.
8. **Provider claims:** Statements about current provider behavior, licensing, API availability, and Google Calendar UI are source claims requiring re-verification before a release or external publication.
9. **Current implementation divergence:** The current repository appears to use runtime provider clients and client-side ICS generation, while the source PRD prefers static build-time JSON and ICS. This is preserved as a review item rather than normalized away.
10. **Scope divergence:** The source PRD’s Tier 1 list is narrower than the current implementation evidence, which includes additional events such as Candlemas, Immaculate Conception, Theophany, and other denominational entries. This may be intentional expansion or scope drift and requires owner review.

## Value inventory

| Area | Extracted value | Claim class | Source support |
|---|---|---|---|
| Purpose | Extend ARE from Browse, Lookup, and Compare into a fourth Observances mode that supports cross-tradition literacy. | stated | T003-T005 and PRD executive summary. |
| Audience | Serve secular readers, believers learning about another tradition, educators, writers, managers, students, interfaith participants, and AI builders. | stated | PRD target users and user stories. |
| Authority boundary | ARE Observances is a visibility layer, not an authority layer; it must not issue rulings or replace local calendars. | stated | T003-T005 guiding principle and required disclaimer. |
| Scope | Include major observances from Judaism, Christianity, and Islam; treat exclusions as methodological rather than judgments of worth. | stated | PRD scope rules and repository governance. |
| Cost constraint | No paid APIs, API keys, AI calls, OAuth, backend, accounts, user tracking, or calendar data storage. | stated | User zero-cost requirement and PRD non-goals. |
| Google integration | Use a public ICS URL and Google Calendar’s From URL flow; do not use the Google Calendar API or direct writes. | proposal | T003-T005 architecture recommendation. |
| Jewish source | Use Hebcal with Diaspora settings for U.S. users, preserve attribution, and filter to the allowlist. | proposal | Source strategy and adapter requirements. |
| Islamic source | Use AlAdhan or documented Hijri calculation, label dates as estimated or community-variable, and include a moon-sighting caveat. | proposal | Source strategy and Islamic adapter requirements. |
| Christian source | Compute Western and Orthodox dates locally with deterministic computus; use public or official references for validation without copying copyrighted prose. | proposal | Christian source strategy and date-calculation sections. |
| Event explanation | Every event needs What it is, Why it matters, Who observes it, Date note, ARE note, and Sources. | stated | Event explanation model and copy deck. |
| Confidence model | Expose whether a date is official-source, public-api, calculated, estimated, or community-variable. | proposal | Data confidence model. |
| Display identity | Use tradition-specific symbols in display titles and ICS summaries only; keep IDs and code identifiers ASCII and symbol-free. | proposal | Emoji and event ID rules. |
| Tiering | Ship a bounded Tier 1 MVP, defer optional denominational overlays, and exclude full calendars, daily cycles, civic holidays, and local events. | proposal | Observance tiering and risk register. |
| Static architecture | Prefer build-time or scheduled generation of `are-observances.json` and `are-observances.ics`, with local JSON powering the SPA. | proposal | Preferred architecture and build integration. |
| Migration | Treat the Custom GPT bundle as historical source material; map knowledge files to app data/skills, actions to TypeScript adapters, and tests to acceptance scenarios. | stated | Starter-bundle migration note. |
| Routing | Capture a Chat Threads source row plus one Extracts row per reusable nugget, dedupe at both levels, and hold archival status when canonical backlinks are missing. | stated | Capture & Route Prompt. |

## Decisions and rationale

### Accepted decisions

1. **Add Observances as a fourth top-level mode.** This extends ARE from texts and themes into time while retaining the existing Browse, Lookup, and Compare thesis.
2. **Use “Observances” as the product label.** “Holidays” is too civic and retail-coded; “Observances” better communicates religious and cultural visibility without claiming a comprehensive official calendar.
3. **Keep the feature Abrahamic and U.S.-scope aligned.** The three in-scope families remain Judaism, Christianity, and Islam. Out-of-scope traditions and civic/legal events are excluded by methodology, not by worth.
4. **Use source labels and date confidence.** The feature must distinguish provider-sourced, calculated, estimated, and community-variable dates so that users can see what the calendar can and cannot claim.
5. **Prefer a public ICS feed over Google OAuth.** A hosted public feed provides calendar-client interoperability without credentials, permissions, user accounts, or personal data.
6. **Explain observances for outsiders.** Event bodies should answer what, why, who, date, ARE boundary, and source questions. The feature is a bridge for understanding, not a practice guide.
7. **Use deterministic Christian date calculations.** Western Easter, Orthodox Pascha, and derived dates can be computed without a paid or fragile holiday API.
8. **Use provider adapters for Jewish and Islamic data with filtering.** Provider output must not be passed through wholesale; only the in-scope allowlists should reach the product.
9. **Package the logic as `okhp3-tradition-observance-calendar`.** The skill makes the observance workflow reusable outside the SPA and should document scope, sources, schemas, ICS rules, and refusal behavior.
10. **Migrate the old bundle conceptually, not structurally.** The current repository is React/TypeScript/Tailwind plus skills and public data. It should not become another GPT Builder asset dump.

### Rejected or bounded alternatives

| Alternative | Decision | Rationale |
|---|---|---|
| Full official “religious calendar” | Reject | No single U.S. authority represents each tradition, and the framing would overstate ARE’s authority. |
| Google Calendar API integration | Reject | Adds OAuth, scopes, tokens, privacy obligations, account handling, and direct-write complexity with no literacy benefit. |
| Runtime-only provider calls | Bound or defer | Runtime calls introduce CORS, rate-limit, outage, and provider-change fragility. Static generation is the preferred deployed path. |
| Pass-through all provider events | Reject | Provider calendars contain daily readings, candle-lighting, prayer times, local events, minor observances, and civic entries outside MVP scope. |
| Reproduce USCCB or other copyrighted calendar prose | Reject | Use official material for validation where permitted, but write original explanatory content. |
| Include every saint day, fast, local feast, or denominational memorial | Reject | This creates scope bloat and turns a literacy surface into a full calendaring system. |
| Use timed events for prayers, services, candle lighting, or local observance times | Reject for MVP | The product needs awareness markers, not practice scheduling or local authority claims. |
| Rebuild the Custom GPT architecture | Reject | The current ARE architecture is SPA-native; the old bundle is historical source material only. |
| Write to Notion without a connector/schema fetch | Reject for this run | The Notion router requires destination resolution, schema inspection, dedupe, and verification. No connector is available in this task context. |

### Important tension retained

The user’s initial vision asks for all religious holidays recognized by in-scope religions in the United States, while the assistant’s bounded recommendation and PRD define a major-observance Tier 1 MVP. This is a deliberate product-scope narrowing, not a settled statement that every recognized observance has been captured. The current implementation should be reviewed against the Tier 1 allowlist before expanding further.

## Actionable handoff

- **Current state:** The source decision and PRD are now preserved in this repository context artifact. The repository already contains an Observances route, page, controls, event list/grid/detail components, Hebcal and AlAdhan clients, Christian calendar calculations, ICS generation, documentation references, and the `okhp3-tradition-observance-calendar` skill.
- **Resume point:** Audit the current implementation against the source PRD’s scope, static-output preference, source/confidence model, event-body requirements, and acceptance criteria.
- **Required context:** Read `AGENTS.md`, `replit.md`, this artifact, the current Observances source files, and the observance skill. Treat provider and product claims from the source as needing verification before release.

| Action | Owner | Status | Dependencies | Evidence or acceptance condition |
|---|---|---|---|---|
| Compare the current route and UI against the PRD’s `/observances` requirements. | agent | ready | Current source tree | Existing route, nav, filters, event cards, source notes, and mobile behavior are checked against the acceptance list. |
| Decide whether to move from runtime fetch/client ICS generation to build-time static JSON and ICS. | user + agent | proposed | Product-owner choice; provider and deployment review | A documented decision explains whether current behavior is intentional or whether `public/calendars/` generation is required. |
| Audit current event allowlists against Tier 1 and out-of-scope rules. | agent | ready | Current provider filters and Christian event definitions | No event outside the approved scope appears without an explicit owner-approved tier. |
| Verify all event descriptions and source/confidence fields. | agent | ready | Current event detail components and adapters | Every displayed event has the required explanation sections, source attribution, and date caveat. |
| Validate Western and Orthodox computus for known years. | agent | ready | Existing validator and calendar code | Known dates in the source, including 2026 and 2027 Easter/Pascha, pass. |
| Preserve the supplied attachment hash and obtain a true export if lossless migration is needed. | user | blocked | ChatGPT export or original archive | A raw export with mapping nodes, branches, assets, and a normalized-record hash is available. |
| Resolve Notion destination, fetch schemas, dedupe, and write Chat Threads plus Extracts records. | agent with Notion connector | blocked | Authorized connector and destination access | Destination and schemas are fetched first; rows are created or updated idempotently and verified afterward. |
| Decide whether `context/threads/` should be a tracked repository location. | user | proposed | Repository governance review | The requested context folder is retained locally, but it is outside the permitted root-level list in `AGENTS.md`; commit only after an explicit governance decision. |

## Reusable methods and assets

### Product charter

> ARE Observances is a visibility layer, not an authority layer. It aggregates and explains major observances from in-scope Abrahamic traditions for U.S. English-speaking users. It does not declare official religious rulings, replace community calendars, include civic/legal holidays, or cover traditions outside ARE’s Abrahamic and U.S. representation scope.

### Recommended event body

```text
What it is:
[Plain-English explanation.]

Why it matters:
[Relationship to the tradition and sacred story.]

Who observes it:
[Tradition and, if relevant, denomination or community.]

Date note:
[Fixed, lunar, calculated, sunset-to-sunset, multi-day, or variable behavior.]

ARE note:
This is an educational reference entry, not a religious ruling or official observance notice.

Sources:
[Provider or reference links.]
```

### Data model principles

- Stable IDs should combine tradition/family, a normalized slug, and the ISO start date.
- User-facing `displayTitle` may contain the tradition symbol; IDs, filenames, routes, and code names should not.
- Events should carry start date, optional end date, all-day/multi-day state, tradition or family, source references, date status, tags, and explanatory fields.
- All-day ICS end dates are exclusive. A one-day event on December 25 ends on December 26 in ICS representation.
- Sunset-to-sunset behavior should be explained in text for MVP rather than modeled with local timed events.
- Islamic entries must carry the moon-sighting and community-authority caveat.
- Sources generated by calculation should say that the date is based on documented calendar rules and should include validation references where available.

### Source and provider posture

| Family | Preferred input | Handling | Required caveat |
|---|---|---|---|
| Judaism | Hebcal | Use U.S. Diaspora settings, filter to Tier 1, attribute the provider, exclude candle-lighting and daily-cycle events. | Many Jewish observances begin at sundown before the listed Gregorian date. |
| Christianity | Deterministic Western and Orthodox computus | Generate fixed and Easter-derived dates locally; validate against public or official references; write original explanations. | Practices and calendars vary by denomination and jurisdiction. |
| Islam | AlAdhan or documented Hijri calculation | Treat dates as calculated or estimated; normalize provider names; do not present dates as universal rulings. | Local moon sighting, calculation method, and community authority can shift dates. |

### ICS requirements

- Calendar metadata should identify ARE Observances, OverKill Hill P3, educational purpose, and the three in-scope traditions.
- Each event should include UID, summary, generation timestamp, all-day start/end, escaped description, source URL, categories, and `TRANSP:TRANSPARENT`.
- Do not add alarms or reminders in MVP.
- Escape backslashes, commas, semicolons, and newlines, and follow RFC 5545 line-folding rules when needed.
- The public URL should be suitable for manual subscription by Google Calendar, Apple Calendar, Outlook, and other ICS clients.

### Acceptance checklist distilled from the PRD

- `/observances` is reachable from the top navigation.
- Browse, Lookup, and Compare remain functional.
- Judaism, Christianity, Orthodox Christianity, and Islam can be filtered distinctly where the implementation exposes those families.
- Upcoming events are sorted chronologically and include empty and error states.
- Event details contain all required body sections.
- Every event has source and date-status metadata.
- Jewish dates use Diaspora behavior and exclude candle-lighting events.
- Islamic events include variation caveats.
- Western and Orthodox computed dates pass known-date checks.
- JSON and ICS outputs validate and do not contain missing sources, duplicate IDs, invalid dates, or out-of-scope entries.
- No paid service, API key, OAuth, backend, user account, personal-data store, or direct calendar write is introduced.
- UI copy remains solemn, neutral, explanatory, non-devotional, and non-proselytizing.

### Suggested implementation order

1. Inspect repository governance and current route structure.
2. Establish calendar types and source registry.
3. Implement explanations and scope allowlists.
4. Implement Western and Orthodox date helpers.
5. Implement Jewish and Islamic adapters with fallback/partial-failure handling.
6. Normalize and validate events.
7. Generate or confirm JSON and ICS outputs.
8. Build the Observances page and export panel.
9. Add or audit the reusable skill.
10. Update README, AGENTS, and replit guidance as needed.
11. Run build, date validation, API checks when adapters change, and manual route/UI QA.

### Notion capture plan -- report-only

The source requests a two-layer Notion write, but this local task has no Notion connector and no verified destination schema. Following the Notion capture router, no Notion write is claimed.

| Capture item | Proposed type | Proposed fields | Mode | Status |
|---|---|---|---|---|
| ARE Observances thread | Chat Threads record | Title, platform ChatGPT, origin OKH, source date, domain/project relation, one-line summary, status, source link | report-only | pending destination fetch and dedupe |
| Observances product charter | Extract | Title, Type Framework or Decision, confidence, next action, source relation, domain relation | report-only | net-new or complementary status unknown until query |
| Zero-cost ICS architecture | Extract | Title, Type Decision, confidence, next action, source relation | report-only | likely complementary to current repository implementation |
| Source/confidence model | Extract | Title, Type Framework, confidence, next action, source relation | report-only | likely complementary; schema query required |
| Starter-bundle migration note | Extract | Title, Type Decision, confidence, next action, source relation, repository path | report-only | complementary to existing `public/origin/` material |
| Acceptance and risk checklist | Extract | Title, Type Checklist, confidence, next action, source relation | report-only | net-new as a structured capture unless already present |

Required Notion sequence if later authorized: resolve Brain and Domains context; fetch target page/database/data-source schemas; search Chat Threads by stable source identity; search Extracts by normalized title and source relation; classify duplicate, complementary, net-new, conflicted, or unsafe-to-capture; perform the smallest create/update; refetch and verify; report created, updated, skipped, redacted, failed, and pending items. Do not copy this artifact or the raw source wholesale into Notion merely to make it searchable.

### GitHub reconciliation observed locally

The local repository is `OKHP3/abrahamic-reference-engine`, the project named by the source. Existing tracked evidence includes:

- `src/App.tsx` with an `observances` route.
- `src/pages/ObservancesCalendar.tsx`.
- Observance controls, calendar grid, event list, and event detail components.
- `src/lib/hebcalClient.ts`, `src/lib/aladhanClient.ts`, `src/lib/christianCalendar.ts`, `src/lib/observanceHelpers.ts`, and `src/lib/icsGenerator.ts`.
- `README.md`, `AGENTS.md`, and `replit.md` references to the Observances mode.
- `.agents/skills/okhp3-tradition-observance-calendar/` with the reusable calendar skill and supporting references/scripts.
- `public/origin/` with the historical GPT-era bundle and a prior ARE origin summary.

This confirms substantial repository coverage, but it does not prove that every source nugget was routed to Notion or that the current implementation exactly matches the PRD. The most important reconciliation questions are runtime versus build-time generation, event allowlist breadth, event-description completeness, and whether all current provider claims have been recently verified.

## Open questions and limits

1. Was the supplied 3,021-line file intended as the complete visible thread, or is it itself a summary excerpt from a longer conversation?
2. Is the actual `gpt_religion_project_bundle.zip` available in an owner-controlled archive? The pasted text names it but does not include it.
3. Which Notion page and data-source schemas are currently authoritative? The source names roles, but this extraction did not fetch or verify the workspace.
4. Has this thread already been captured in the Notion Chat Threads and Extracts data sources? Unknown without connector search.
5. Is the source ChatGPT Project/conversation link safe and intended for long-term repository provenance, or should it remain private-only?
6. Should the repository adopt the PRD’s static build-time JSON and ICS architecture, or is the current runtime-fetch/client-generated ICS design the approved implementation?
7. Which observances are officially approved beyond the Tier 1 allowlist? The current implementation evidence suggests broader coverage than the bounded PRD.
8. Should a future version include separate Orthodox UI filtering, or is a Christian denomination filter sufficient?
9. What source and licensing checks are required before shipping Wikipedia summaries or any provider-derived explanatory text?
10. Should the user-authorized `context/threads/` location be added to repository governance, ignored, or kept as a local-only working archive? `AGENTS.md` currently does not list `context/` as an allowed root directory.
11. Current-provider behavior, API availability, licensing, and calendar dates are time-sensitive and require fresh verification before a release. The source’s claims are not treated as current facts merely because they appeared in the ChatGPT response.
12. The original capture’s archive gate depends on a real backlink. The artifact intentionally does not reproduce private/account-scoped URLs, so it cannot by itself satisfy a Notion “Archived” status.

## Rehydration test

| Test | Result | Evidence or gap |
|---|---|---|
| A reader can explain the objective without the source platform | pass | Introduction, source synopsis, charter, scope, audience, and user stories are preserved. |
| Decisions and consequential rationale are recoverable | pass | Decisions, rejected alternatives, architecture, source strategy, and migration rationale are explicit. |
| Current state and next action are unambiguous | pass | Actionable handoff identifies existing repository coverage and the first audit action. |
| Retained assets are available or missing assets are explicitly cataloged | pass | Repository paths are named; the missing ZIP, private destinations, and unverified source URLs are listed as exceptions. |
| No source account, thread, project, canvas, or connector is a runtime dependency | pass | The artifact is self-contained and labels all external locators as provenance only. |

- **Overall source-independence result:** pass.
- **Blocked capability, if any:** Lossless conversation migration, Notion dedupe/write, and verification of the absent starter ZIP remain blocked until their source sidecars or connectors are available. These gaps do not prevent a reader from resuming the Observances implementation audit.

## Provenance and retention

- **Capture boundary:** A user-supplied local text attachment named `pasted-text.txt`, containing a flattened ChatGPT capture with an initial routing request, a later Notion capture prompt, Observances recommendations and PRD content, and a Custom GPT starter-bundle migration note. The original ChatGPT account, complete export mapping, branches, private Project instructions, Notion workspace, and actual ZIP were not supplied to this extraction.
- **Completeness:** partial. The supplied file is substantial and internally coherent, but it is not a lossless export and cannot prove complete branch, attachment, or tool coverage.
- **Source time context:** The file shows “Sun, Jun 14 at 11:10 PM” and “Wed, Jun 24 at 11:41 PM”; the year and exact conversation span are unknown in the source. Current task date is not treated as source date.
- **Source hash:** `07A9F938D5CFB896EBF59C6EEC9E3BFDDAEC39420F453222D5980F9FC44E2BCF` for the supplied attachment at extraction time.
- **Normalized-record hash:** not applicable. No raw ChatGPT JSON conversation record or mapping object was supplied.
- **Retention decision:** redacted. The durable product and implementation context is safe to retain in this repository location, while private/account-scoped Notion links, ChatGPT account URLs, and unavailable sidecars are omitted or described without reproducing them.
- **Source caveats:** Manual paste; flattened roles; repeated summary/PRD material; missing branches and rich sidecars; provider and product claims need verification; Notion routing is report-only in this run.
- **Repository boundary note:** The user explicitly requested `context/threads/`, so the artifact is placed there. The directory is outside the root-level locations currently enumerated by `AGENTS.md`; do not commit or broaden governance without owner review.
