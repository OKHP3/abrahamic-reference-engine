---
title: "ARE Observance Calendar and GPT-to-SPA Migration Plan"
primary_topic: "ARE observance calendar and GPT-to-SPA migration plan"
source_platform: "ChatGPT"
capture_mode: "unknown"
completeness: "partial"
extraction_depth: "comprehensive"
requested_extraction_depth: "exhaustive"
source_title: "ChatGPT ARE observance calendar and project migration thread"
source_date: "2026-06-14"
source_time_context: "Initial segment: Sun, Jun 14, 2026 at 11:11 PM; later capture context: Wed, Jun 24, 2026 at 11:42 PM; timezone unknown"
source_locator: "User-supplied ChatGPT Project and conversation locators; exact URLs intentionally not reproduced"
retention_decision: "redacted"
source_independence: "pass"
generated_at: "2026-07-21T20:43:24Z"
schema_version: "2.0"
artifact_type: thread-context-extract
---

# ARE Observance Calendar and GPT-to-SPA Migration Plan

## Introduction

This supplied ChatGPT capture combines a Notion-oriented conversation archive procedure with a product-design and migration record for the Abrahamic Reference Engine (ARE). Its durable value is a set of decisions and implementation requirements for an `Observances` feature: a zero-cost, read-only, source-attributed calendar of major United States-relevant observances from ARE's three in-scope traditions, designed as a bridge-building visibility layer rather than a religious authority. The capture also preserves a routing method for deduplicating Chat Threads and Extracts across Notion and GitHub, plus a migration conclusion that the original GPT starter ZIP is historical provenance and content seed, while the active architecture is a public React/TypeScript SPA with reusable Agent Skills. The source is a flattened, manually supplied capture rather than an export, so the extract preserves intent, decisions, requirements, and missing-asset records without claiming lossless coverage of hidden branches, project instructions, private Notion content, or the unavailable ZIP payload.

## Extraction profile

- **Requested depth:** very detailed and entire-thread context; normalized to `comprehensive` / `exhaustive`.
- **Selected depth:** comprehensive.
- **Selection basis:** The user explicitly requested high quality and very detailed context, and the supplied material contains a multi-stage product brief, routing workflow, and migration assessment.
- **Profile changes:** none.
- **Focus areas:** ARE Observances product requirements; source and authority boundaries; zero-cost delivery; reusable calendar schema and feed rules; Notion/GitHub routing; GPT-to-SPA migration implications.
- **Must preserve:** scope rules, visibility-not-authority boundary, no-cost/no-auth constraints, source strategy, observance schema, educational event-body requirements, iCalendar strategy, acceptance criteria, migration decision, routing and archive rules, rejected alternatives, and missing sidecars.
- **Safe exclusions:** repeated conversational filler, timing labels, decorative UI chrome, repeated restatements, private Notion URLs, and the raw transcript wording except where needed to preserve a decision or rule.
- **Coverage rule:** Seven semantic turn groups and eight non-text or rich-element groups were individually assessed. Unique requirements and decisions are retained; repetitive PRD prose is consolidated by topic; UI chrome is excluded; unavailable files and inaccessible private destinations are explicitly flagged.
- **Not carried forward:** raw private Notion destinations, raw transcript, undocumented ChatGPT project instructions, hidden branches, unprovided source export, and the contents of the referenced ZIP file. These omissions protect the repository boundary and preserve an explicit recovery path.
- **Source-independence test:** pass with explicit sidecar gaps. A reader can understand the objective, continue the Observances work, use the requirements, and distinguish implemented local evidence from unverified source claims without ChatGPT, Notion, or the original ZIP.

## Coverage accounting

| Material class | Assessed | Retained | Compressed | Omitted with reason | Missing or unavailable | Notes |
|---|---:|---:|---:|---:|---:|---|
| Turns or turn groups | 7 | 7 | 0 | 0 | 0 | Flattened capture segmented by explicit date, speaker, artifact, and file boundaries. |
| Rich elements | 8 | 5 | 1 | 1 | 1 | Private Notion links were redacted; ZIP payload was not supplied; UI chrome was excluded. |
| Decisions and alternatives | 18 | 18 | 0 | 0 | 0 | Includes accepted choices, rejected approaches, and unresolved provider questions. |
| Reusable assets | 12 | 12 | 0 | 0 | 0 | Includes routing rules, PRD requirements, data model, feed rules, build prompt, and migration mapping. |

## Source synopsis

The capture begins with a user request dated Sunday, June 14, 2026 at 11:11 PM. The request asks for a lengthy analysis of a full ChatGPT thread, evaluation of whether its value was already captured in Notion, creation or registration of a new Notion record if needed, reconciliation with any linked GitHub repository, and backlinking for later validation. A later supplied Notion artifact, dated Wednesday, June 24, 2026 at 11:42 PM, defines a reusable `Capture & Route Prompt`. That prompt establishes a personal-brain and intake workflow: read the intent hub and domain routing rules, classify origin before writing, extract every compounding nugget, deduplicate at both thread and nugget levels, write Chat Threads and Extracts records, reconcile against the owner's GitHub repositories, and apply an archive contract. The prompt also records a known backlink limitation: a platform request may reveal that a source is ChatGPT without supplying a reliable per-thread URL.

The central product discussion then considers whether ARE should add a calendar surface. The user wants maximum useful capability at zero cost, with no user-paid AI, API, service, or calendar dependency. The proposed feature is a new top-level `Observances` tab that consumes public, free, anonymous sources for major United States-relevant religious observances belonging to ARE's already-established scope. The feature is explicitly not intended to be a civil holiday calendar, a complete liturgical operating system, a local religious authority, or a source of legal or HR guidance. Its purpose is cross-tradition literacy: a user unfamiliar with another tradition should be able to see what an observance is, why it matters, how it relates to the tradition, how its timing works, and what source or calculation produced the date.

The product rationale is that search, browse, and comparison answer textual and thematic questions, while a calendar answers practical visibility questions such as what may be happening this week, why a date moves, which branch is involved, and why a coworker or neighbor may be unavailable. The discussion repeatedly returns to the ARE spine: proportional representation, equal dignity, source-first comparison, visibility rather than authority, and bridges rather than divides.

The proposed source hierarchy is intentionally hybrid. Hebcal is identified as the preferred Jewish source where its free, anonymous API or feed is suitable and its attribution requirement is honored. An Islamic calendar provider such as AlAdhan is treated as a candidate that must be validated before becoming canonical, with local moon-sighting and community-authority caveats attached to Islamic dates. Christianity is treated as a special case because no single free anonymous source cleanly covers Western, Catholic, Orthodox, Protestant, and LDS contexts. The proposed fallback is static metadata plus transparent calculation, including separate Western and Orthodox movable-date calculations where needed. The source's provider statements are assistant claims and require re-verification before reuse.

The long-form PRD translates the idea into a SPA route, data contracts, source adapters, educational copy, static outputs, iCalendar generation, accessibility, mobile behavior, error handling, performance targets, testing, and a reusable Agent Skill. It proposes current-year and next-year data, combined and per-tradition feeds, filtering by tradition, month-grouped event cards, event detail views, source and caveat display, and Google Calendar subscription through public iCalendar URLs rather than OAuth or direct calendar writes. It specifies that all events should behave as transparent awareness events, not busy-time blockers, and that descriptions should be written for outsiders in neutral, plain language.

The PRD also supplies a normalized event model with tradition, branch, title, dates, duration, source, confidence, educational description fields, outsider notes, caveats, and tags. It enumerates major v1 observances for Judaism, Christianity including Orthodox-specific items, and Islam, while explicitly excluding daily prayer times, weekly Shabbat recurrence, every saint day, full denominational micro-calendars, local moon-sighting declarations, and out-of-scope religions. It proposes a practical limit of fewer than 100 default events across two years and rejects runtime AI generation for event descriptions.

The final source segment concerns `gpt_religion_project_bundle.zip`, described as the initial package loaded into Replit. The supplied assistant analysis says the ZIP was a GPT Builder-style starter bundle with knowledge Markdown, OpenAPI stubs, settings, translation material, tests, UI copy, and generation tooling. It concludes that the bundle is Custom GPT-first rather than SPA-first, and that it should be kept as historical provenance, a content seed, and migration reference. The active standard should instead be ARE as a public SPA plus source-grounded data plus reusable Agent Skills, with a possible future GPT wrapper. This conclusion is preserved as a migration interpretation, not as proof of the ZIP contents, because the ZIP itself was not supplied in the current capture.

## Turn ledger

| Turn | Role | Role confidence | Boundary evidence | Content elements | Summary |
|---|---|---|---|---|---|
| T001 | user | medium | Explicit dated user request at the beginning of the pasted capture. | E001, E002 | Requested a full thread summary, Notion deduplication and routing, GitHub reconciliation, and backlinks. |
| T002 | unknown | low | A Notion-labeled artifact with a titled prompt, tables, and procedural sections; speaker is not explicit. | E001, E008 | Defined the Capture & Route workflow, two-layer Notion model, origin classification, dedupe, GitHub reconciliation, backlink limitation, and archive contract. |
| T003 | assistant | medium | Narrative recommendation begins after source links and includes assistant thought-time chrome. | E003, E007, E008 | Recommended Observances as a fourth ARE surface and developed the visibility-not-authority, source, scope, and iCalendar direction. |
| T004 | user | medium | Explicit first-person goal statement requesting maximum capability at zero cost and a long-form PRD. | E008 | Required zero cost, no paid or keyed dependencies, a new Observances tab, and a reusable observance-calendar Agent Skill. |
| T005 | assistant | medium | Explicit assistant thought label followed by a long structured Product Requirements Document. | E004, E005, E007 | Produced the detailed Observances PRD, schema, UX requirements, feeds, source rules, acceptance criteria, tests, implementation phases, build prompt, and definition of done. |
| T006 | user | medium | File chip and archive label appear after the PRD. | E006 | Supplied or referenced `gpt_religion_project_bundle.zip` as the original starter artifact. The binary payload is absent from this capture. |
| T007 | assistant | medium | Narrative analysis follows the file chip and explicitly frames the ZIP as a baseline artifact. | E004, E006, E008 | Classified the starter bundle as GPT-first historical provenance and recommended the modern SPA plus Agent Skills architecture as canonical. |

## Content element ledger

| Element | Turn | Type | Owner | Fidelity | Source locator | Destination reference | Catalog action |
|---|---|---|---|---|---|---|---|
| E001 | T001-T002 | citation / routing map | unknown | metadata-only | Supplied Notion destination block | Open questions and provenance; private destinations intentionally not reproduced | retain |
| E002 | T001-T003 | citation | unknown | referenced-not-supplied | Public ARE GitHub repository locator in the supplied text | Provenance and local repository cross-check | retain |
| E003 | T003 | citation / source claim group | assistant | referenced-not-supplied | Hebcal, Google Calendar help, Islamic calendar provider, and Pew references named in the source | Source strategy and verification notes | retain |
| E004 | T005-T007 | code / schema / artifact text | assistant | text-extracted | Inline TypeScript, JSON, iCalendar examples, implementation paths, and migration mapping | Reusable methods and assets; decisions and rationale | retain |
| E005 | T005 | generated artifact | assistant | text-extracted | Long-form Observances Product Requirements Document | Source synopsis, value inventory, actionable handoff | retain |
| E006 | T006-T007 | generated file | user / unknown | metadata-only | `gpt_religion_project_bundle.zip` file chip; binary payload not supplied | Normalization exceptions and open questions | flag-missing |
| E007 | T003-T005 | citation / source card group | assistant | referenced-not-supplied | Provider and calendar source links named in the narrative | Source claims remain needs-verification | compress |
| E008 | T002-T007 | ui_chrome | unknown | metadata-only | Notion labels, thought-time labels, repeated separators, file-chip chrome | Not semantic content | exclude-chrome |

## Normalization exceptions

1. **Flattened role boundaries:** The paste does not provide a lossless message export or structured role metadata. T002 is retained as an unknown-role Notion artifact rather than being forced into user, assistant, or system status. The assistant and user boundaries around T003-T007 are supported by narrative cues and explicit first-person language, but remain medium confidence.
2. **Project context not captured:** The source belongs to or references an ARE ChatGPT Project, but no Project instructions, uploaded knowledge, branch tree, or project inventory was supplied. The extract does not imply that any of these were captured.
3. **No lossless export:** No ChatGPT data export, conversation mapping, raw message nodes, hashes, or project manifest was supplied. This is an artifact-lane extraction only, not completion of a full project migration.
4. **Missing binary sidecar:** The ZIP file chip proves that a starter bundle was referenced, but not what files or bytes it contained. The migration conclusion is preserved as a source assertion and remains independently unverified here.
5. **Private routing destinations:** The supplied Notion block contains workspace-specific page and data-source URLs. They are not copied into this repository artifact. The roles of Brain hub, Intake page, Chat Threads, Extracts, Domains, Projects, and the Repo-to-Notion index are retained at the conceptual level.
6. **Source claims may be time-sensitive:** Provider availability, licensing, API behavior, Google Calendar instructions, and demographic figures can change. Claims from the source are marked as stated or proposed, not independently certified.
7. **Symbol rendering:** The source proposes Unicode tradition markers in event titles. This extract records the requirement in words and does not reproduce the symbols because this repository's governance prohibits emojis in generated documentation.

## Value inventory

| Area | Extracted value | Claim class | Source support |
|---|---|---|---|
| Purpose | Preserve a durable, actionable context package for an ARE ChatGPT thread and identify the project direction that should survive deletion of the source conversation. | stated | T001-T002 |
| Context and constraints | ARE is a neutral, citation-first reference tool for Judaism, Christianity, and Islam. The calendar must be free, anonymous, static-friendly, source-attributed, English-language, and non-authoritative. | stated | T003-T005; current repository governance corroborates scope |
| Reasoning and alternatives | A calendar adds practical religious literacy. Public iCalendar feeds are preferred to Google OAuth. Christianity needs transparent calculation and curation. The full liturgical and civil-calendar approaches are rejected as scope expansion. | proposal / inferred | T003-T005 |
| Decisions and outcomes | Name the surface Observances, use `/observances`, support combined and per-tradition feeds, provide outsider-facing event explanations, and treat the GPT bundle as historical rather than canonical. | proposal / stated | T003-T007 |
| Reusable assets | Routing prompt, archive contract, event schema, source hierarchy, educational copy template, implementation phases, testing plan, Replit build prompt, and migration mapping. | stated / proposal | T002, T005, T007 |

## Decisions and rationale

| ID | Decision or alternative | Status | Claim class | Rationale and consequence |
|---|---|---|---|---|
| D001 | Use `Observances` as the feature name and `/observances` as the route. | accepted in source | proposal | Precise enough to avoid implying an official or comprehensive religious calendar. |
| D002 | Treat the calendar as a visibility layer, not a religious authority. | governing principle | stated | Every date and description must show source method and caveat where practice varies. |
| D003 | Keep ARE's existing scope: Judaism, Christianity, and Islam only. | governing constraint | stated | Scope requires Abrahamic lineage plus the project's United States population threshold. Exclusion is methodological, not a judgment of worth. |
| D004 | Require zero paid services, no required login, no OAuth, no API keys, and no runtime AI. | hard constraint | stated | Maintains anonymous public access and avoids variable cost, secrets, and user-calendar permissions. |
| D005 | Use public iCalendar feeds for calendar subscription. | recommended architecture | proposal | Users can subscribe through a calendar client's public URL flow without direct Google API writes or OAuth. |
| D006 | Generate combined and per-tradition feeds. | recommended requirement | proposal | Supports both broad awareness and focused use without user accounts. |
| D007 | Focus v1 on major observances, not every religious date. | scope decision | proposal | Keeps the feature legible and avoids becoming a full liturgical, prayer-time, saint-day, or denominational scheduling system. |
| D008 | Write event bodies for outsiders. | accepted content rule | stated | Each event should answer what it is, why it matters, its relationship to the tradition, history where useful, timing, source, and outsider context. |
| D009 | Use tradition markers in titles but preserve text labels for accessibility. | recommended UX | proposal | Visual scanning is useful, but color or symbols cannot be the only tradition indicator. |
| D010 | Prefer Hebcal for Jewish data where suitable. | source preference | proposal | The source describes it as free and anonymous with attribution requirements. Re-verify current API, licensing, and rate limits before relying on it. |
| D011 | Treat an Islamic provider as conditional and attach moon-sighting caveats. | source preference | proposal | Calculated or provider dates are estimates and may differ by community, jurisdiction, or local observation. |
| D012 | Use static metadata and transparent calculation for Christianity. | source preference | proposal | No single anonymous provider was identified as covering all relevant Christian branches; Western and Orthodox movable dates may require different calculations. |
| D013 | Prefer build-time or cached data over provider calls on every page load. | architecture preference | proposal | Static hosting and reliability improve when the app avoids runtime waterfalls and has fallbacks. |
| D014 | Use a normalized `AREObservance` or repository-equivalent event model. | data contract | proposal | A single model allows provider normalization, UI filtering, descriptions, and iCalendar generation to share source and caveat fields. |
| D015 | Keep the original GPT bundle as historical provenance and content seed. | migration decision | stated / inferred | Its architecture is GPT Builder-first and does not outrank the current SPA, source data, and Agent Skills package. |
| D016 | Route durable value through separate Chat Threads and Extracts layers, then reconcile with GitHub. | operational workflow | proposal | Thread-level dedupe prevents duplicate sources; nugget-level extraction preserves reusable decisions and methods. |
| D017 | Use a 70 percent extracted-value threshold plus title, origin, summary, and backlink for archive eligibility. | archive rule | proposal | This gives the source conversation a practical deletion test, but the rule was not independently evaluated against current Notion schema. |
| D018 | Do not fabricate a backlink when the source URL is unavailable. | provenance rule | stated | Keep the item Extracted and mark the link pending rather than creating a false locator. |

Significant rejected or deferred alternatives:

- Direct Google Calendar API integration and OAuth were rejected in favor of public iCalendar subscription because they add permissions, auth scopes, and operational complexity without improving the core visibility goal.
- A public holiday API as the primary Christian authority was rejected because civil-holiday status is not the inclusion criterion and no single source covers all relevant Christian branches.
- Calendarific-style keyed services were rejected or deferred because API keys and paid-plan limits conflict with the zero-cost anonymous requirement.
- A full liturgical calendar, daily prayer-time system, candle-lighting service, saint-day database, local parish calendar, or denomination micro-calendar was rejected as bloat and authority drift.
- Runtime AI generation of event descriptions was rejected because stable educational copy should be reviewed, source-attributed, and available without a model call.
- Adding Hinduism, Buddhism, Sikhism, Wicca, Baha'i, or general world-religion holidays was rejected for the current phase because it would violate the project's declared scope boundary.
- Treating the original GPT bundle as the active architecture was rejected because the current product has matured into a public SPA and reusable skills package.

## Actionable handoff

- **Current state:** The source requirements and migration decisions have been extracted into this repository artifact. A local repository cross-check shows that the proposed capability is now represented by an `/observances` route, an `ObservancesCalendar` page, observance clients/helpers and iCalendar generation, and an `okhp3-tradition-observance-calendar` skill. This local evidence is separate from the claims in the supplied ChatGPT capture.
- **Resume point:** Compare the implemented observance behavior and skill documentation against the extracted acceptance checklist, then resolve any remaining source, caveat, feed, accessibility, and static-deployment gaps.
- **Required context:** Read the repository `AGENTS.md`, `replit.md`, the existing observance skill, and the relevant source files before changing implementation. Treat provider and calendar claims as needing current verification.

| Action | Owner | Status | Dependencies | Evidence or acceptance condition |
|---|---|---|---|---|
| Preserve this extract under `context/threads/`. | agent | complete | Reviewed body and extractor utility | Final Markdown exists at the requested destination and passes utility validation. |
| Compare the local Observances implementation with the source PRD. | agent / user | ready | Current source tree and build environment | `/observances` works, filters and details work, sources and caveats remain visible, and the implementation does not exceed scope. |
| Verify current Hebcal, Islamic provider, Google Calendar, and Pew claims. | agent | proposed | Current primary documentation and live provider checks | Provider status, licensing, endpoint behavior, and demographic basis are recorded in the project's current gap register or source docs. |
| Verify iCalendar output and static deployment behavior. | agent | proposed | Build output and deployed GitHub Pages path | Combined and tradition-specific feeds parse correctly and remain awareness events rather than busy-time blocks. |
| Decide whether to register this extract in Notion. | user | blocked pending authorization | A confirmed private destination and connector write authorization | No Notion write was performed by this extraction; if authorized later, use schema-first dedupe and append/update semantics. |
| Recover or separately archive the original GPT ZIP if full migration is required. | user | blocked | Owner-controlled source file or ChatGPT export | A raw source archive, hash, mapping-node count, and exception manifest are required before claiming lossless migration. |
| Keep the GPT bundle historical and the modern SPA/skills package canonical. | team | complete as a source decision | Current repository architecture | Historical assets may inform content, but new work follows current SPA and Agent Skill boundaries. |

## Reusable methods and assets

### Capture and routing method

The supplied routing prompt provides a reusable two-layer workflow:

1. Load intent and domain context before writing.
2. Classify origin and privacy boundary.
3. Produce a one-line thread summary.
4. Extract one compounding nugget per decision, framework, prompt, definition, finding, caveat, rejected option, or open question.
5. Route by domain rather than guessing a destination.
6. Search and deduplicate both the source-thread layer and the nugget layer.
7. Link each extract to its source thread and domain.
8. Reconcile the durable nuggets with the matching GitHub repository.
9. Keep backlinks pending when the source URL is unavailable.
10. Mark a thread archived only when value coverage and retrieval axes are sufficient.

### Observance event contract

The source proposes a normalized event with these conceptual fields: stable ID and slug; tradition and branch; title and display title; start and end dates; all-day and sunset flags; duration type; confidence; source ID, name, and URL; short description; what-it-is; why-it-matters; historical context; relationship to the tradition; outsider note; caveat; and tags. The current repository may use a compatible but not identical interface, so the local implementation is authoritative for code changes and the source model is a migration reference.

### Educational event-body template

Each event should be able to render:

- Tradition and branch
- Observance name and type
- What it is
- Why it matters
- Relationship to the tradition
- Historical or scriptural context when appropriate
- Outsider note explaining what an unfamiliar user may notice
- Timing, sunset, duration, or local-variation caveat
- Source attribution
- A statement that the entry is educational and not a religious ruling

### Source and fallback method

Use the strongest available free source, but make the method visible. Prefer a reputable free anonymous API or feed, then transparent local calculation, then curated static metadata with an explicit caveat. Cache or generate data at build time when possible. On provider failure, use a cached or static fallback, lower confidence, log the failure, and never silently invent a date.

### Feed method

Generate a combined feed and one feed per tradition. Include stable UIDs, timestamps, all-day start and end handling, summary, educational description, category, source URL when available, and transparent/free-time semantics. Escape iCalendar text and validate syntax before deployment. Provide copyable URLs and plain instructions for adding a public calendar by URL. Do not require OAuth.

### Implementation checklist extracted from the PRD

- Add or maintain the `/observances` route and primary navigation entry.
- Normalize Judaism, Christianity, and Islam into one event collection.
- Preserve branch and date-variation metadata.
- Provide combined, filtered, upcoming, and year views.
- Group events by month and sort by date.
- Provide accessible detail views and text labels alongside markers or colors.
- Expose source, confidence, and caveat data for every event.
- Generate current-year and next-year data without a runtime provider waterfall.
- Validate provider failure, missing-description, empty-data, and rate-limit behavior.
- Keep event descriptions local and reviewed rather than generated at runtime.
- Validate JSON, iCalendar syntax, build output, deep links, and mobile layout.
- Keep out-of-scope traditions, legal claims, personal calendar access, and paid dependencies absent.

### Migration mapping

| Historical starter asset | Current treatment |
|---|---|
| GPT Builder installation guide | Historical seed; do not make it the active README. |
| Keyed API stubs | Historical reference only; prefer free anonymous providers or transparent fallbacks. |
| Out-of-scope tradition files | Do not carry into the active Phase 1 app scope. |
| Translation matrix, primers, glossary, comparison methods, UI copy, and test prompts | Candidate content seeds; reconcile against current data and skills before reuse. |
| Hadith placeholder provider | Optional or future; not implementation-ready by source evidence. |
| GPT-focused test queries | Inspiration for current UI, data, and calendar tests, not the final QA suite. |

## Open questions and limits

- Was the pasted material a control-all full-paste, a selected excerpt, or a manually assembled transfer? The capture mode remains uncertain.
- Are there additional hidden branches, regenerated answers, tool events, citations, canvases, or files in the original ChatGPT thread? Unknown.
- What were the actual Project instructions, uploaded knowledge files, and thread inventory? Not supplied.
- Does the original ZIP exist locally, and what is its cryptographic hash? Unknown. The referenced binary is not available in this capture.
- Were the private Notion page and data-source records already created, partially captured, duplicated, or linked to this repository? Unknown. No Notion inspection was performed for this request.
- Is the supplied Notion schema still current, and are the named fields and relations available under the connected workspace? Needs verification.
- Are Hebcal, the Islamic provider, and the Google Calendar URL workflow still available under the same terms? Needs verification.
- Which current repository implementation details intentionally diverge from the source PRD? Needs a code-level comparison before any refactor.
- Does the current implementation offer public subscription URLs or only client-side downloads? The source PRD asks for public feeds; local code review should confirm the deployed behavior.
- Which observances qualify as major and United States-relevant for each branch? The PRD proposes lists but leaves some optional items unresolved.
- What exact licensing and attribution language must appear for each provider? Needs current primary-source review.

## Rehydration test

| Test | Result | Evidence or gap |
|---|---|---|
| A reader can explain the objective without the source platform | pass | Introduction, source synopsis, value inventory, and governing constraints explain the product and migration purpose. |
| Decisions and consequential rationale are recoverable | pass | D001-D018 and the rejected-alternatives list preserve accepted directions and why competing approaches were deferred or rejected. |
| Current state and next action are unambiguous | pass | Actionable handoff distinguishes source extraction completion, local implementation evidence, verification work, and blocked owner decisions. |
| Retained assets are available or missing assets are explicitly cataloged | pass | Requirements and code/schema excerpts are summarized; the ZIP, private Notion content, and hidden Project sidecars are marked unavailable. |
| No source account, thread, project, canvas, or connector is a runtime dependency | pass | The extract is standalone and does not require ChatGPT or Notion access to resume the implementation review. |

- **Overall source-independence result:** pass.
- **Blocked capability, if any:** Lossless reconstruction of the original ChatGPT Project, all mapping nodes, private Notion records, and the binary starter ZIP remains blocked until the owner supplies an export or explicitly accepts the current partial boundary.

## Provenance and retention

- **Capture boundary:** A user-supplied 2,558-line text attachment containing a flattened ChatGPT conversation excerpt and referenced artifact labels. No authenticated ChatGPT access, data export, Notion fetch, GitHub account operation, or ZIP payload was used.
- **Completeness:** partial. The supplied text was fully assessed, but it does not prove that the original conversation, Project, branches, attachments, or external routing records were complete.
- **Source time context:** Initial request shown as Sunday, June 14, 2026 at 11:11 PM; later Notion capture prompt shown as Wednesday, June 24, 2026 at 11:42 PM; exact timezone and full conversation span are unknown.
- **Retention decision:** redacted. Durable product and migration value is retained; private Notion destinations, raw transcript, and unavailable binary content are not copied.
- **Source caveats:** Capture mode is unknown and likely flattened UI text. Project instructions, hidden branches, tool output, citation cards, and file contents may be missing. Assistant claims about provider behavior and the original ZIP are source assertions requiring verification.
- **Notion routing mode:** report-only. The Notion capture-router method was applied conceptually, but no page or database was created, updated, deduplicated, or verified because the current request authorized a repository artifact, not an external Notion write, and private destinations were not resolved.
- **Migration mode:** artifact-lane distillation only. The project-migration contract is not complete: no export archive, SHA-256 hash, project manifest, normalized conversation record, mapping-node count, or reconciliation ledger was available.
- **Repository governance note:** The user explicitly requested `context/threads/`. The repository's AGENTS.md permitted-root list does not currently include `context/`, so this output remains an untracked user-requested artifact and should not be committed without resolving that governance conflict.
- **Local repository cross-check:** Current workspace evidence includes `src/App.tsx`, `src/pages/ObservancesCalendar.tsx`, observance helper/client/iCalendar modules, `replit.md` references, and `.agents/skills/okhp3-tradition-observance-calendar/SKILL.md`. This cross-check is local evidence, not a claim made by the supplied source.
