---
title: "ARE Calendar, Translation, and Migration Handoff"
primary_topic: "ARE calendar translation migration implementation handoff"
source_platform: "Claude"
capture_mode: "export-excerpt"
completeness: "partial"
extraction_depth: "comprehensive"
requested_extraction_depth: "comprehensive"
source_title: "Claude shared ARE observances and translation-matrix artifact package"
source_date: "unknown"
source_time_context: "Bundle label: v0.1, October 17, 2025; conversation and artifact creation timing unknown"
source_locator: "https://claude.ai/share/9bab40e2-1247-4d7b-858e-da189decd41c"
retention_decision: "redacted"
source_independence: "pass"
generated_at: "2026-07-22T16:14:41Z"
schema_version: "2.0"
artifact_type: thread-context-extract
---

# ARE Calendar, Translation, and Migration Handoff

## Introduction

This partial Claude capture records a two-workstream implementation handoff for the Abrahamic Reference Engine (ARE): a source-attributed Observances calendar for Judaism, Christianity, and Islam, and a translation-matrix plus QA package intended to make Verse Lookup translation selection more explicit and testable. The capture begins with a forensic assessment of an older Custom GPT bundle, identifies padding artifacts and the bundle's durable assets, then describes a proposed TypeScript translation matrix, an integration guide, a 32-test SPA QA checklist, and a long-form Replit directive. The current repository preserves much of the observance implementation and the reusable observance skill, but the exact translation and QA sidecars named by the capture are not available at their supplied Downloads paths. This extract therefore preserves the design intent, stated decisions, local implementation evidence, uncertainty boundaries, and the exact recovery work needed before any missing artifact is treated as authoritative.

## Extraction profile

- **Requested depth:** Highly detailed context and synthesis.
- **Selected depth:** Comprehensive.
- **Selection basis:** The user requested a high-quality, very detailed transformation and supplied a multi-file artifact package spanning product requirements, source adapters, calendar algorithms, iCalendar rules, translation integration, and QA.
- **Profile changes:** None.
- **Focus areas:** Claude bundle assessment; ARE Observances product and implementation architecture; translation-matrix integration; QA and Replit handoff; local repository reconciliation; missing sidecars and provenance.
- **Must preserve:** The padding finding; bundle salvage and exclusion decisions; translation availability and licensing gates; the 32-test QA intent; the no-fake-QA requirement; observance scope and authority boundaries; source adapters and caveats; computus and iCalendar rules; current repository evidence; unresolved static-versus-runtime architecture; and Notion report-only routing.
- **Safe exclusions:** Repeated artifact-card labels, decorative interface chrome, raw transcript repetition, private destination details, and verbatim reproduction of unavailable attachments.
- **Coverage rule:** Every user-referenced file, source URL, pasted block, and local analogue received an individual ledger disposition. Unique design and implementation value is retained. Exact unavailable attachments are flagged as missing rather than reconstructed. Current repository files are labeled supplemental local evidence, not proof of exact Claude artifact contents.
- **Not carried forward:** The original ZIP bytes, any full Claude export, hidden branches, Project instructions or knowledge files not supplied, exact contents of seven unavailable sidecars, private account or workspace details, and unsupported claims about current provider behavior.
- **Source-independence test:** Pass for resuming the implementation audit and locating the retained local assets. Exact recovery of the missing translation and QA artifacts remains blocked and is explicitly recorded in E003, E004, E005, E014, E015, E016, and E017.

## Coverage accounting

| Material class | Assessed | Retained | Compressed | Omitted with reason | Missing or unavailable | Notes |
|---|---:|---:|---:|---:|---:|---|
| Source turns or turn groups | 9 | 9 | 0 | 0 | 0 | The pasted analysis is flattened and role-uncertain, but all semantic blocks were assigned a turn or supplemental evidence record. |
| User-referenced files and URLs | 19 | 12 | 0 | 0 | 7 | Eleven repository analogues plus the pasted text are retained as evidence; seven exact Downloads artifacts are absent. The Claude share URL is metadata-only. |
| Local implementation sidecars | 8 grouped records | 8 | 0 | 0 | 0 | Current route, page, components, adapters, skill, existing context extracts, build, and date-validator results were inspected separately from the Claude source. |
| Decisions and alternatives | 18 | 18 | 0 | 0 | 0 | Accepted directions, rejected approaches, hard constraints, and unresolved architecture choices are preserved. |
| Reusable assets and procedures | 14 | 14 | 0 | 0 | 0 | Event model, provider rules, ICS rules, translation gate, QA contract, recovery plan, and Notion report-only plan are retained. |

## Source synopsis

The supplied Claude material is a flattened excerpt rather than a lossless conversation export. Its visible title is repeated as “Dissected bundle architecture, identified padding artifacts, salvaged substantive components.” The analysis concerns `gpt_religion_project_bundle.zip`, identified in the source as version 0.1 from October 17, 2025. The analysis says the bundle was a padded GPT Builder scaffold: the knowledge Markdown files contained a small amount of unique content followed by repeated numbered sections generated to inflate file size. The source treats that padding as a generation workaround, not as substantive project knowledge.

The bundle assessment classifies the main tradition primers and denomination files as thin scaffolds. Judaism and Islam are described as superseded by the ARE tradition-reference skill and live providers. Christianity's denomination framing is described as superseded by the SPA Browse tab. Hinduism and Buddhism are identified as outside the ARE Phase 1 boundary and therefore candidates for discard from active product content. Minor-tradition and nonaffiliated placeholder files are treated as archival or deferred material. Comparative methods and neutral glossary material are described as worth porting because their unique content supports the Compare tab. The original UI copy is described as usable after SPA adaptation. The API.Bible OpenAPI path is described as requiring a key and therefore superseded by the free `bible-api.com` path. Sefaria, Quran.com, and AlQuran.cloud OpenAPI material is described as already represented in the SPA. The Hadith entry is described as a placeholder and deferred.

The source identifies the bundle's clean translation matrix as the clearest structured-data gap surfaced by the old package. The original matrix is described as containing Bible translation codes and Quran.com IDs, including KJV, ESV, NRSV, NABRE, Douay-Rheims, Sahih International, Pickthall, and Yusuf Ali. The source then describes a proposed 471-line `translationMatrix.ts` that would extend coverage to the three ARE traditions, include Sefaria language or translation identifiers, add Quran translation IDs including Khattab 131 and Asad, and expose a `free-anonymous` availability gate. The source explicitly preserves a Catholic coverage limitation: no zero-cost English Catholic Bible is available through the current anonymous `bible-api.com` route, while NABRE and Douay-Rheims would require a different provider. The proposed data model therefore distinguishes free anonymous entries from a key-required candidate rather than presenting unavailable coverage as if it existed.

The translation work is organized into two workstreams. Workstream A integrates the matrix into Verse Lookup by adding selectors, mapping selected entries to provider calls, and displaying attribution or coverage notes. Workstream B runs a SPA-native QA suite and requires an actual dated QA report with PASS, FAIL, or SKIP for every case. The source specifically says the agent must not fake the QA run. The source describes the QA suite as 32 tests: 22 salvageable from the original 30 GPT test queries after removing out-of-scope-tradition and GPT-only settings cases, plus 10 Observances tests created after the calendar feature was added. The exact checklist file is not available in the current environment, so the test count and categories are retained as source assertions rather than a reconstructed test corpus.

The source also presents an Observances implementation package. The product direction is a top-level Observances surface under `/observances`, intended as a neutral visibility and literacy layer rather than an official religious calendar, devotional guide, legal or HR authority, or complete liturgical system. The feature keeps ARE's strict scope of Judaism, Christianity, and Islam, uses source attribution and caveats, avoids paid services, API keys, OAuth, user accounts, and runtime AI, and focuses on major observances that are useful to United States English-speaking users. The source favors public iCalendar output over direct calendar writes because a public feed or download avoids OAuth, permission scopes, credentials, and personal data.

The observance package uses a hybrid source strategy. Hebcal is the preferred Jewish provider for Diaspora-oriented calendar data with CC BY 4.0 attribution. AlAdhan is a conditional Islamic provider whose dates are calculated and may vary by local moon sighting or community method. Christianity is handled locally through Western and Orthodox Computus because no single free anonymous provider is treated as an authoritative ecumenical source. Wikipedia is used lazily for neutral event descriptions, with explicit CC BY-SA attribution and a returned article URL. The current repository contains these adapters, the shared event model, calendar UI, and iCalendar generator. The supplied design still leaves an important architecture choice open: whether runtime browser fetching and client-side ICS downloads are acceptable, or whether build-time static JSON and ICS outputs should become canonical for deployment stability.

The capture ends with an artifact inventory showing the named TypeScript files, reference documents, PRDs, Replit kickoff prompt, skill files, and an original ZIP card. The artifact cards establish that these items existed in the Claude workspace or were intended as deliverables, but they do not provide their payloads in the pasted text. In this environment, eleven of the named files have semantic repository analogues, one pasted analysis is available exactly, and seven exact sidecars are absent from `C:\Users\jamie\Downloads`. The current repository itself builds successfully, and its bundled Easter validator passes all 22 reference cases. Those checks support the local implementation audit but do not recover the missing Claude artifacts.

## Turn ledger

| Turn | Role | Role confidence | Boundary evidence | Content elements | Summary |
|---|---|---|---|---|---|
| T001 | unknown | low | Repeated source heading followed by a direct assessment opening | E019 | Introduced the bundle forensic review and stated the bottom-line classification as a padded GPT Builder scaffold. |
| T002 | unknown | low | A distinct “padding problem” section and file-by-file verdict table | E019 | Described repeated knowledge blocks, identified recoverable scaffolds, and classified active, archived, superseded, and out-of-scope bundle files. |
| T003 | unknown | low | New section headed “The one real gap this surfaces” with a translation table | E019 | Identified the translation matrix as the main structured-data gap and listed original translation codes, names, and notes. |
| T004 | unknown | low | New section covering test-query salvage, architecture mapping, and suggested follow-ups | E019 | Removed eight GPT-only or out-of-scope queries, preserved 22 SPA-suitable queries, mapped GPT layers to SPA layers, and proposed translation, QA, archive, and glossary follow-ups. |
| T005 | unknown | low | First-person confirmations such as “YES” followed by a deliverable request | E019 | Confirmed the need for a companion Markdown integration guide, a structured QA checklist, individual assets, and a long-form Replit directive. |
| T006 | unknown | medium | Repeated heading “Architecting four deliverables” followed by named artifact descriptions | E019 | Described the translation-matrix QA PRD, TypeScript data layer, integration guide, and 32-test checklist, including key requirements and known coverage gaps. |
| T007 | unknown | medium | Artifact-card inventory listing document, TypeScript, skill, and ZIP items | E019, E020 | Established referenced artifact names and types but did not supply their contents. |
| T008 | user | high | Current target request lists 18 local file paths, one pasted attachment, and a Claude share URL | E001-E020 | Authorized a detailed extraction using three repository skills and requested output under `context\threads\`. |
| T009 | tool / local evidence | medium | Repository inspection and validation output, not part of the Claude conversation | Local evidence table below | Cross-checked current files, existing context artifacts, production build, and the Easter validator without treating them as Claude statements. |

## Content element ledger

| Element | Turn | Type | Owner | Fidelity | Source locator | Destination reference | Catalog action |
|---|---|---|---|---|---|---|---|
| E001 | T008 | file | user | text-extracted via repository analogue | Original `C:\Users\jamie\Downloads\aladhanClient.ts` absent; analogue at `src/lib/aladhanClient.ts` | Reusable methods, source reconciliation | retain |
| E002 | T008 | file | user | text-extracted via repository analogue | Original Downloads file absent; analogue at `.agents/skills/okhp3-tradition-observance-calendar/references/api-reference.md` | Reusable methods, source reconciliation | retain |
| E003 | T008 | file | user | referenced-not-supplied | `C:\Users\jamie\Downloads\ARE-observances-PRD.md` not found | Decisions, missing sidecars, handoff | flag-missing |
| E004 | T008 | file | user | referenced-not-supplied | `C:\Users\jamie\Downloads\are-qa-checklist.md` not found | QA contract and recovery plan | flag-missing |
| E005 | T008 | file | user | referenced-not-supplied | `C:\Users\jamie\Downloads\ARE-translation-matrix-QA-PRD.md` not found | Translation workstream and recovery plan | flag-missing |
| E006 | T008 | file | user | text-extracted via repository analogue | Original Downloads file absent; analogue at `src/lib/christianCalendar.ts` | Computus and local implementation evidence | retain |
| E007 | T008 | file | user | text-extracted via repository analogue | Original Downloads file absent; analogue at `.agents/skills/okhp3-tradition-observance-calendar/references/computus.md` | Computus method and validation | retain |
| E008 | T008 | file | user | text-extracted via repository analogue | Original Downloads file absent; analogue at `src/lib/hebcalClient.ts` | Jewish provider adapter | retain |
| E009 | T008 | file | user | text-extracted via repository analogue | Original Downloads file absent; analogue at `.agents/skills/okhp3-tradition-observance-calendar/references/holiday-data.md` | Allowlist and normalization | retain |
| E010 | T008 | file | user | text-extracted via repository analogue | Original Downloads file absent; analogue at `src/lib/icsGenerator.ts` | iCalendar implementation | retain |
| E011 | T008 | file | user | text-extracted via repository analogue | Original Downloads file absent; analogue at `.agents/skills/okhp3-tradition-observance-calendar/references/ics-spec.md` | iCalendar requirements | retain |
| E012 | T008 | file | user | text-extracted via repository analogue | Original Downloads file absent; analogue at `src/lib/observanceHelpers.ts` | Unified event type and registries | retain |
| E013 | T008 | file | user | text-extracted via repository analogue | Original long filename absent; analogue at `.agents/skills/okhp3-tradition-observance-calendar/SKILL.md` | Reusable skill and execution contract | retain |
| E014 | T008 | file | user | referenced-not-supplied | `C:\Users\jamie\Downloads\replit-kickoff-prompt.md` not found | Replit handoff and missing sidecars | flag-missing |
| E015 | T008 | file | user | referenced-not-supplied with semantic analogue | `C:\Users\jamie\Downloads\SKILL.md` not found; likely overlaps E013 but exact identity is unknown | Source boundary and recovery plan | flag-missing |
| E016 | T008 | file | user | referenced-not-supplied | `C:\Users\jamie\Downloads\translationMatrix.ts` not found; no corresponding `src/lib/translationMatrix.ts` exists | Translation data layer | flag-missing |
| E017 | T008 | file | user | referenced-not-supplied | `C:\Users\jamie\Downloads\translation-matrix-integration.md` not found | Verse Lookup integration handoff | flag-missing |
| E018 | T008 | file | user | text-extracted via repository analogue | Original Downloads file absent; analogue at `src/lib/wikipediaClient.ts` | Lazy description provider | retain |
| E019 | T001-T007 | text file | unknown | text-extracted | `C:\Users\jamie\.codex\attachments\a674cd78-4028-479c-9e2a-833de77abae6\pasted-text.txt` | Source synopsis, decisions, reusable assets, provenance | retain |
| E020 | T007-T008 | citation / shared link | user | metadata-only | User-supplied `claude.ai/share` locator; page not accessed under the Claude skill boundary | Provenance only; no completeness claim | retain |

## Normalization exceptions

1. **Exact Downloads sidecars are unavailable.** The named files were checked at their requested paths. The Downloads folder contains no copies of them. Repository analogues are useful for current-state reconciliation, but they are not silently substituted as exact Claude artifact payloads.
2. **Seven exact artifacts remain missing.** The absent files are E003, E004, E005, E014, E015, E016, and E017. The pasted text supplies descriptions of their intended roles, not their complete contents. The missing `SKILL.md` is especially ambiguous because the artifact list also names a longer observance skill filename that semantically maps to the current repository skill.
3. **Flattened Claude roles.** The pasted text does not contain stable `User` or `Claude` labels for the analysis blocks. All T001-T007 roles remain `unknown` rather than being assigned from writing style alone. T005 contains apparent user confirmations, but its surrounding export boundary is still not lossless.
4. **Artifact cards are not payloads.** The list of documents and TypeScript files proves that artifacts were referenced, but it does not prove their exact text, version, line count, generated timestamp, or final revision state.
5. **Original bundle is not supplied.** `gpt_religion_project_bundle.zip` is named in the capture but is not present in the accessible attachment directory. Padding ratios, file contents, and hashes therefore remain source assertions.
6. **The Claude share URL was not replayed.** The requested Claude extraction skill is designed for human-supplied material and explicitly does not claim direct account or thread access. The URL is retained as provenance only.
7. **Current code may differ from the Claude artifacts.** The repository files were committed or generated at unknown times relative to the referenced Claude artifacts. They are labeled current local evidence, not historical identity proof.
8. **Source claims requiring verification.** Provider licenses, rate limits, API response behavior, Wikipedia licensing, Bible translation availability, and current URL behavior can change. The source's claims are preserved as stated or proposed and require fresh verification before release decisions.
9. **Scope language is methodological.** The observance package uses the repository's Abrahamic lineage plus United States population threshold. Excluded traditions are not described as lesser; they are outside the current product boundary.
10. **Emoji and symbol requirements are normalized to words.** The source and current code use tradition symbols in titles and registries. This context artifact describes the requirement without reproducing those symbols, in keeping with repository documentation governance.
11. **Notion is not a write destination for this run.** No target page, database, schema, connector, or visibility authorization was supplied. The Notion router therefore produces a report-only plan and does not claim deduplication or capture completion.

## Value inventory

| Area | Extracted value | Claim class | Source support |
|---|---|---|---|
| Purpose | Preserve enough ARE product and implementation context to resume Observances and translation-matrix work without relying on the original Claude thread. | stated | T005-T008, E019 |
| Context and constraints | ARE is a neutral, citation-first SPA for Judaism, Christianity, and Islam. The work must remain free, anonymous, source-attributed, English-language, non-devotional, and non-authoritative. | stated | E019; current `AGENTS.md` and `replit.md` corroborate the repository boundary |
| Bundle reasoning | The old package is a GPT Builder scaffold with duplicated padding. Its unique content is useful as historical provenance and a seed for migration, but the SPA and reusable skills are the current architecture. | stated in source; locally unverified | T001-T004; original ZIP absent |
| Translation reasoning | A structured translation matrix should gate UI availability by provider/auth model, make attribution visible, and expose honest Catholic and Orthodox coverage limitations rather than hiding them. | proposal | T003-T006; E005 and E016 missing |
| QA reasoning | A valid QA handoff must be SPA-native, include Observances coverage, record PASS/FAIL/SKIP, and require a dated report. Unsupported or out-of-scope GPT tests should be removed with reasons. | stated proposal | T004-T006; E004 missing |
| Observances reasoning | Major observances, deterministic Christian dates, provider filters, neutral descriptions, and public ICS downloads provide literacy value without building a full liturgical or civil calendar. | proposal | Existing local skill and implementation; prior local context extracts |
| Decisions and outcomes | Current repository has Observances route and implementation modules. The translation matrix and integration guide are not present, so the translation workstream is not complete in this checkout. | inferred from local evidence | E001-E018; T009 |
| Reusable assets | Event schema, source adapter rules, allowlists, moon-sighting caveat, Computus validation set, ICS rules, bundle salvage map, translation availability gate, QA report contract, and recovery sequence. | stated and proposal | E001-E019 |
| Limits | Exact PRD, checklist, translation data, integration guide, Replit prompt, original ZIP, full Claude thread, and source-workspace context cannot be reconstructed from the supplied material. | unknown / unresolved | E003-E005, E014-E017, E020 |

## Decisions and rationale

| ID | Decision or alternative | Status | Claim class | Rationale and consequence |
|---|---|---|---|---|
| D001 | Treat the old GPT bundle as historical provenance and a content seed, not the active ARE architecture. | accepted in source | stated | The SPA already replaces GPT knowledge, actions, and system-prompt layers with native UI, direct providers, and reusable skills. |
| D002 | Remove or ignore repeated padding when salvaging bundle knowledge. | accepted in source | stated | Repeated sections inflate files without adding unique knowledge. Exact padding claims remain unverified without the ZIP. |
| D003 | Keep comparative methods and neutral glossary material as candidates for Compare-tab reuse. | proposed | proposal | Their unique content supports cross-tradition explanation without preserving the GPT wrapper. |
| D004 | Exclude Hindu and Buddhist test or primer content from ARE Phase 1. | governing constraint | stated | The repository scope requires Abrahamic lineage and the project's United States representation threshold. Exclusion is methodological, not a judgment of worth. |
| D005 | Archive minor-tradition and nonaffiliated placeholder material rather than treating it as active product content. | proposed | proposal | It belongs to a future scope decision, not current ARE workflows. |
| D006 | Prefer free anonymous providers and reject the API.Bible path unless a credentialed integration is intentionally approved. | source direction | proposal | The current product has a no-key boundary. The exact licensing and coverage claims require verification. |
| D007 | Add a `free-anonymous` availability gate to the translation matrix. | proposed | proposal | The UI should not surface entries it cannot retrieve under the current provider and authorization model. |
| D008 | Show translation attribution and coverage gaps in the UI. | proposed | proposal | Users should see why a translation is available, unavailable, or provider-dependent. |
| D009 | Preserve an honest Catholic coverage gap for anonymous `bible-api.com` retrieval. | unresolved implementation requirement | stated in source | NABRE and Douay-Rheims are described as requiring another provider or key. Do not label them usable until the provider path is implemented and verified. |
| D010 | Provide a companion Markdown integration guide for the TypeScript matrix. | accepted in source | stated | The Replit handoff must explain how to absorb the data layer into the existing Verse Lookup UI and provider calls. Exact guide content is missing. |
| D011 | Expand the original 30 GPT queries into a 32-test SPA-native suite. | source assertion | stated | Twenty-two queries are described as salvageable, with ten Observances tests added. Exact test rows are missing and must be recovered before execution. |
| D012 | Require a dated QA report with PASS, FAIL, or SKIP for each test and prohibit fabricated results. | accepted in source | stated | A QA checklist is only useful when it records actual evidence and unresolved failures. |
| D013 | Use `/observances` as a top-level product surface for major observances. | present in local implementation and source direction | proposal | The label avoids civic “holiday” framing and does not imply religious authority or completeness. |
| D014 | Keep the calendar inside Judaism, Christianity, and Islam and use equal visual dignity. | governing constraint | stated | The observance surface follows ARE scope and neutral cross-tradition literacy goals. |
| D015 | Use Hebcal for Jewish data with Diaspora settings, an allowlist, grouping, attribution, and cache behavior. | present in local implementation | proposal | The provider is suitable for the intended US audience subject to current API and license verification. |
| D016 | Use AlAdhan conditionally for Islamic data with an explicit calculated-date and local-moon-sighting caveat. | present in local implementation | proposal | Dates should never be presented as universally authoritative. The provider output must be filtered to the approved allowlist. |
| D017 | Compute Western and Orthodox Christian dates locally through documented Computus. | present in local implementation | proposal | This avoids a paid or fragile external dependency. The current validator passes the bundled reference cases. |
| D018 | Generate all-day RFC 5545 ICS downloads locally and use transparent awareness events. | present in local implementation | proposal | All-day exclusive end dates, escaping, line folding, source URLs, and no reminders preserve interoperability without OAuth. |
| D019 | Fetch Wikipedia descriptions lazily on event selection and display attribution. | present in local implementation | proposal | Lazy retrieval limits network use, while the returned article URL supports source traceability. Current licensing and content suitability still need review. |
| D020 | Leave build-time static calendar output versus runtime browser fetching as an explicit architecture choice. | unresolved | unresolved | The product direction favors static output for reliability, while the current code fetches Hebcal and AlAdhan at runtime and generates ICS in the browser. A product-owner decision is required before refactoring. |
| D021 | Do not write to Notion in this extraction. | report-only | stated by router procedure | No destination or schema was supplied and no connector is available. The local artifact is the durable output for this run. |

## Actionable handoff

- **Current state:** The current checkout contains an Observances route, year and month navigation, tradition and Christian denomination filters, calendar grid, event list, detail panel, Hebcal and AlAdhan adapters, deterministic Christian calendar generation, lazy Wikipedia summaries, client-side ICS generation, a reusable observance skill, and supporting reference documents. The repository also contains two prior context extracts that overlap the broader Observances product and GPT-to-SPA migration story. The exact translation matrix, integration guide, translation QA PRD, QA checklist, Replit kickoff prompt, and original bundle are not available at the supplied locations.
- **Resume point:** Recover the missing exact sidecars if they are needed for lossless migration, then compare the current implementation against the preserved requirements and decide whether the translation workstream or the static-output architecture is the immediate priority.
- **Required context:** Read `AGENTS.md`, `replit.md`, this artifact, `src/pages/ObservancesCalendar.tsx`, `src/components/ObservanceControls.tsx`, `src/components/ObservanceCalendarGrid.tsx`, `src/components/ObservanceEventList.tsx`, `src/components/ObservanceEventDetail.tsx`, `src/lib/observanceHelpers.ts`, `src/lib/hebcalClient.ts`, `src/lib/aladhanClient.ts`, `src/lib/christianCalendar.ts`, `src/lib/wikipediaClient.ts`, `src/lib/icsGenerator.ts`, and `.agents/skills/okhp3-tradition-observance-calendar/`.

| Action | Owner | Status | Dependencies | Evidence or acceptance condition |
|---|---|---|---|---|
| Recover the exact seven missing sidecars from owner-controlled Downloads, Claude export, or an explicitly supplied archive. | user | blocked | Files or lossless export must be made available | File hashes and contents can be compared with the artifact-card inventory; no reconstruction is presented as verbatim. |
| Compare the current Observances UI and source adapters with the missing PRD requirements and the local skill contract. | agent | ready | Current repository files and this extract | Route, filters, empty/error states, source labels, caveats, event descriptions, and calendar downloads are checked against the preserved acceptance themes. |
| Run the bundled Computus validator after any calendar algorithm change. | agent | ready | `scripts/validate-easter.js` | All 22 Western and Orthodox cases remain passing. The current read-only run passed every case. |
| Decide whether runtime provider calls and browser ICS downloads remain approved or whether build-time static outputs are required. | user + agent | proposed | Product-owner decision and deployment review | The chosen model is documented with provider-outage, CORS, caching, and GitHub Pages consequences. |
| Recover or recreate the translation matrix only after the exact source contract is known. | agent | blocked | E005, E016, and E017 or owner approval to design a new matrix | Every entry has tradition, provider ID, availability/auth model, display name, attribution, license note, and UI behavior. No missing Catholic coverage is hidden. |
| Integrate translation selectors and attribution into Verse Lookup. | agent | proposed | Recovered matrix and integration guide; current Verse Lookup components | Selected entries resolve to the correct provider calls, unavailable entries are excluded or explained, and attribution is visible. |
| Recover the 32 exact QA cases and execute them as a dated report. | agent | blocked | E004 or owner-approved recreation | Every test has PASS, FAIL, or SKIP with evidence; no result is inferred from the checklist title. |
| Audit current event normalization for explicit confidence, caveat, and attribution fields. | agent | proposed | Product decision and existing event model | Provider, calculated, estimated, and community-variable dates remain distinguishable in data and UI. |
| Verify current provider endpoints, licensing, response shapes, and rate limits before release. | agent | ready | Network and current primary sources | Source references and UI attribution match current provider terms. |
| Prepare a Notion capture report without writing until a destination and schema are supplied. | agent | report-only | Authorized Notion connector, target page or database, schema fetch | Source-level and extract-level duplicate checks run before any create or update. |

## Reusable methods and assets

### A. Bundle salvage method

1. Treat the source bundle as historical evidence, not authority.
2. Detect repeated sections and separate unique content from padding.
3. Classify each file as port, supersede, archive, discard, or verify.
4. Preserve scope exclusions and licensing constraints with the salvage decision.
5. Reconcile every proposed port against the current SPA and skill packages.
6. Keep the original bundle or a verified hash in an owner-controlled archive if lossless lineage matters.

### B. Translation matrix contract recovered from the capture

The proposed matrix is a data layer, not a prose-only table. Each translation entry should be modeled with enough information for the UI to decide whether it can be offered. The recovered requirements are:

- Tradition or family and denomination lens.
- Stable provider identifier and provider name.
- User-facing display name.
- Availability status, with `free-anonymous` as the current default gate.
- Whether a key, account, or paid tier is required.
- License or attribution note.
- Provider-specific reference behavior.
- Honest coverage note for entries that exist conceptually but cannot be retrieved through the current anonymous provider.
- A helper such as `getAvailableBibleTranslations()` that filters entries before rendering selectors.
- Sefaria translation or language identifiers for Jewish lookup where applicable.
- Quran.com translation IDs, including the original IDs described in the bundle and the later additions described in the missing TypeScript artifact.

The source describes the original matrix as including KJV, ESV, NRSV, NABRE, Douay-Rheims, Sahih International, Pickthall, and Yusuf Ali. It describes the proposed extension as adding Sefaria data, Quran.com ID 131 for Khattab, and Asad. These specifics are source assertions because E016 is missing. The repository currently has `src/data/translations.ts` and `.agents/skills/okhp3-verse-lookup/translation-matrix.md`, but not the named `src/lib/translationMatrix.ts`; those current files should be compared before creating anything new.

### C. Translation integration sequence

1. Inspect the existing Verse Lookup component and provider adapters.
2. Map the recovered matrix IDs to the exact provider call shape.
3. Filter selectors to provider-compatible entries.
4. Preserve a visible explanation when a denomination has no anonymous coverage.
5. Send the selected provider ID without silently changing the user's choice.
6. Display translation name, provider, license or attribution, and availability status near the result.
7. Test invalid, unavailable, unsupported, and fallback paths.
8. Record the work in the dated QA report.

### D. QA contract

The recovered QA design has two layers. The first layer preserves the 22 valid SPA queries from the original 30. The eight removed cases are described as Bhagavad Gita, Dhammapada, cross-tradition cases that include those out-of-scope traditions, and GPT-only settings persistence or reset behavior. The second layer adds ten Observances-native cases. The exact case text is unavailable, but a future checklist should cover:

- Browse route and tradition cards.
- Verse Lookup reference resolution, provider selection, and translation attribution.
- Cross-tradition comparison and scope language.
- Observances route, year and month navigation, filters, sort order, empty states, and partial provider errors.
- Jewish Diaspora behavior, normalized multi-day events, and source links.
- Islamic allowlist, calculated-date caveat, and multi-day Eid grouping.
- Western and Orthodox computed dates against known values.
- Wikipedia lazy loading and graceful no-description behavior.
- ICS download structure, all-day end-date semantics, escaping, and line folding.
- Build and deployment readiness.

The acceptance rule is evidence-first: every case receives PASS, FAIL, or SKIP; every failure has a reproducible note; skipped cases state the missing dependency; and a dated report is committed only after the tests actually run. This list is a recovered framework, not a replacement for the missing exact checklist.

### E. Observances source and normalization model

The local event type currently carries an ID, title, raw name, tradition, denomination, dates, multi-day state, optional Hebrew or Hijri date, optional provider URL, optional Wikipedia article, and source classification. The source hierarchy and local implementation support the following pipeline:

1. Hebcal requests major, Diaspora-oriented Jewish holidays, filters to holiday records, strips Hebrew year suffixes, groups consecutive same-name items, carries Hebrew names and provider links, and caches annual results in session storage.
2. AlAdhan requests all twelve Gregorian months in parallel, collects only approved holiday strings, normalizes display names, groups consecutive Eid days, records Hijri text, and carries the local-moon-sighting warning. Partial month failures do not discard successful months.
3. Christian dates are calculated locally for Western and Orthodox Easter, fixed feasts, Easter-derived dates, Advent, Reformation Sunday, Orthodox Christmas, and Theophany. The bundled validator covers 2020 through 2030 for both Easter systems.
4. Wikipedia descriptions are fetched only after a user selects an event, mapped from stable article titles, cached per session, and rendered with an attribution link.
5. ICS generation converts every event to an all-day VEVENT, uses the day after the final event date as exclusive `DTEND`, escapes backslashes, commas, semicolons, and newlines, folds long lines, includes source URLs where available, and uses a transparent awareness-calendar posture.

### F. Reconciliation findings from current local evidence

- The current app exposes `/observances` and keeps Browse, Lookup, and Compare as separate surfaces.
- The current page starts Christian events synchronously and loads Jewish and Islamic events through independent promises, preserving partial provider failure states.
- The current UI has tradition filters and Christian denomination filters for Catholic, Protestant, LDS, and Orthodox views.
- The current `ObservanceEvent` model does not visibly include a first-class confidence, caveat, or explicit attribution field. Caveats and source notes are partly derived from tradition and source type in UI and ICS helpers.
- The current app uses runtime calls to Hebcal and AlAdhan and browser-side ICS generation. The preserved product direction favors static deployment outputs as a possible reliability improvement, but no final decision is captured.
- The current Christian validator passes all 22 bundled reference checks, and `npm run build` passes in this checkout.
- The current repository has no exact `src/lib/translationMatrix.ts`, `translation-matrix-integration.md`, or the named QA/PRD/Replit files. Existing translation reference files may overlap but are not assumed equivalent.

### G. Notion report-only plan

Following `okhp3-notion-capture-router`, this run is report-only. No destination was specified, no schema was fetched, and no connector write is authorized. If a later run supplies a destination, search first for a source-level Chat Thread record, then search for extracts by normalized title and source relation. Classify each as duplicate, complementary, net-new, conflicted, or unsafe-to-capture. Use the smallest safe update and verify by fetching after write. Candidate extracts are:

| Candidate | Type | Current classification | Required next step |
|---|---|---|---|
| Claude ARE implementation handoff | Chat Thread record | Unknown | Resolve destination and query by source identity. |
| Bundle salvage and GPT-to-SPA migration | Decision or Framework | Complementary likely | Compare with existing ARE migration context before writing. |
| Translation availability and coverage gate | Framework | Net-new or complementary | Recover exact matrix first, then deduplicate by normalized title. |
| 32-test SPA QA contract | Checklist | Net-new likely | Recover exact cases or label any recreated suite as proposal. |
| Observances source and ICS model | Framework | Complementary likely | Compare with existing observance context and current skill before append. |

## Open questions and limits

1. Can the exact seven missing sidecars be reattached or copied into an owner-controlled recovery directory?
2. Is the supplied Claude share link intended as a public provenance locator, and does it represent the complete source thread or only a share snapshot?
3. Is the original `gpt_religion_project_bundle.zip` available for hash and content verification?
4. Was the described 471-line translation matrix ever committed under another path, or is it only a Claude artifact card?
5. Which current translation map is authoritative: `src/data/translations.ts`, `.agents/skills/okhp3-verse-lookup/translation-matrix.md`, or the missing `translationMatrix.ts`?
6. Does the current Verse Lookup provider code support every translation entry described in the missing matrix, especially the claimed Sefaria and Quran.com additions?
7. What exact 22 salvageable test queries and 10 Observances cases make up the 32-test suite?
8. Does the recovered Observances PRD require build-time JSON and ICS outputs, or does it permit the current runtime model?
9. Should event data gain first-class confidence, caveat, and attribution fields before additional sources are added?
10. Are the current provider terms, endpoints, rate limits, and licenses still accurate as of release time?
11. Is the current Islamic provider's use of the Umm al-Qura method correct for every returned date and every intended US audience, or should the UI expose a broader calculation-method caveat?
12. Should the calendar include a separate Orthodox filter or continue treating Orthodox as a Christian denomination filter?
13. Should Wikipedia remain the default description source, or should durable original explanatory copy be stored locally to reduce runtime dependence and licensing ambiguity?
14. Is `.agents/memory/threads/` the stable tracked location for durable thread extracts? It is inside the permitted `.agents/` tree and now contains the three related context artifacts.
15. What Notion page or database should receive a later capture, and what schema and visibility rules apply?

## Rehydration test

| Test | Result | Evidence or gap |
|---|---|---|
| A reader can explain the objective without the source platform | pass | The introduction, source synopsis, scope, workstreams, and current state explain the task without requiring Claude. |
| Decisions and consequential rationale are recoverable | pass | The decision table preserves bundle salvage, translation gating, QA evidence, observance sources, ICS behavior, and unresolved static-output choice. |
| Current state and next action are unambiguous | pass | The actionable handoff identifies existing files, missing files, and the first recovery and audit actions. |
| Retained assets are available or missing assets are explicitly cataloged | pass | Local analogues are linked by path; all absent exact sidecars are listed by element ID and supplied path. |
| No source account, thread, Project, Artifact, or connector is a runtime dependency | pass | The artifact includes the usable implementation model and treats Claude, Notion, and the shared URL as provenance only. |

- **Overall source-independence result:** pass for implementation resumption, with exact artifact recovery blocked by the missing sidecars.
- **Blocked capability, if any:** Lossless reconstruction of the Claude artifact package, exact translation-matrix integration, exact 32-case QA execution, and verification of the original ZIP remain blocked until the corresponding source payloads are supplied.

## Provenance and retention

- **Capture boundary:** A user-supplied pasted text attachment containing a flattened Claude analysis, a user-supplied Claude share locator, and a list of local Downloads files that were expected to accompany the thread. The current repository was inspected as supplemental local evidence. No Claude login, thread replay, Project context, full export, original ZIP, or exact missing artifact payload was used.
- **Completeness:** Partial. The supplied pasted analysis is substantial but not a lossless transcript, and the named artifact payloads are incomplete in this environment.
- **Source time context:** The pasted analysis labels the bundle as version 0.1 from October 17, 2025. Conversation dates, artifact creation times, and export time are unknown. The current task date is not treated as source date.
- **Source locator:** User-supplied Claude share URL retained as provenance only; the page was not accessed under the capture boundary.
- **Retention decision:** Redacted. Durable product, architecture, QA, and recovery context is safe to retain. Exact private or unavailable source material is not copied, and no credentials, account details, private workspace URLs, or raw source archive are included.
- **Source caveats:** Manual paste; flattened and role-uncertain; artifact cards without payloads; missing Downloads sidecars; absent ZIP; current repository analogues may be newer or different; provider and licensing claims require verification; Notion routing is report-only.
