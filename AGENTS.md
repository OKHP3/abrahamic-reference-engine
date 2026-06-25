# abrahamic-reference-engine

## Project Identity
- **Suite**: FoundRy
- **Type**: SPA + Agent Skills Package
- **GitHub**: https://github.com/OKHP3/abrahamic-reference-engine
- **Notion Anchor**: https://app.notion.com/p/895d08a0f20f4f8dbb8dc9dd55dee405
- **Status**: Active / In Development

## Purpose
ARE -- Abrahamic Reference Engine. An interfaith bridge: a neutral, agnostic reference tool that surfaces the shared wisdom and connections between Abrahamic traditions. Not a debate platform. Not a ranking. A translator between faiths -- showing that these traditions are less different than they appear.

A reference or study tool -- not a source of spiritual or moral authority. Never ranks beliefs, proselytizes, or declares a doctrine correct.

**Primary audience:** Secular and unaffiliated users seeking cultural and religious literacy -- people trying to understand coworkers, relatives, neighbors, or communities. Believers are also welcome but are not the only audience. This is an empathy bridge, not a devotional assistant.

Dual mission:
1. A single-page web application, free to use, hosted on GitHub Pages (MIT license)
2. A package of agent skills so developers can use the logic offline in any agentic platform

## Mission Constraints (non-negotiable -- apply to ALL agents working on this repo)
- **No tradition is ranked above another.** Every tradition is presented as equally valid and worthy of respect.
- **Strict scope: Abrahamic lineage + 1% US population.** A tradition must meet BOTH criteria to be included: (1) traceable lineage to Abraham, AND (2) 1% or greater of the US population per Pew Research Center's Religious Landscape Study. Both criteria must be met. Either criterion alone is insufficient.
- **Three traditions in scope:** Judaism (~2% US), Christianity (~63% US), Islam (~1% US). All others are excluded.
- **Explicitly excluded:** Hinduism (not Abrahamic), Buddhism (not Abrahamic), Wicca (not Abrahamic), Baha'i (Abrahamic but <1% US), Druze (Abrahamic but <1% US), Sikhism (not Abrahamic). Exclusion is not a judgment of worth -- it is a methodological boundary.
- **Proportional representation by US Pew share.** Content depth and volume (number of pre-seeded examples, denomination entries, etc.) reflect the tradition's share of the US population. Christianity gets more entries by count because it is ~63% of the US. But every entry has identical visual dignity.
- **Pew Research Center citation must be visible in the UI.** The scope decisions are data-driven, not arbitrary. The UI must surface this.
- **English-only, US English.** Primary audience is English-speaking American citizens.
- **No API costs.** All external API integrations must be free and anonymous.
- **MIT license throughout.**

## US Religious Demographics (Pew Research Center, Religious Landscape Study)
Source: https://www.pewresearch.org/religion/religious-landscape-study/
| Tradition | US Share | In scope | Notes |
|---|---|---|---|
| Christianity (total) | ~63% | YES | Subdivided by US denomination |
| -- Evangelical Protestant | ~25% | YES | |
| -- Catholic | ~20% | YES | |
| -- Mainline Protestant | ~16% | YES | |
| -- LDS / Restorationist | ~2% | YES | |
| -- Orthodox Christian | ~1% | YES | |
| Judaism | ~2% | YES | |
| Islam | ~1% | YES | |
| Hinduism | ~1% | NO | Not Abrahamic |
| Buddhism | ~1% | NO | Not Abrahamic |
| Baha'i | ~0.1% | NO | Abrahamic but below 1% threshold |
| Unaffiliated / Secular | ~26% | Context only | Not a scriptural tradition |

## Tech Stack
- **Frontend**: Vite + React + TypeScript + Tailwind CSS
- **Hosting target**: GitHub Pages (static SPA build)
- **Dev server**: port 5000, host 0.0.0.0
- **APIs**: Sefaria (free, no auth), Quran.com API v4 (free, no auth), Al-Quran Cloud (free fallback), bible-api.com (free, no key), free Hadith provider
- **Agent Skills**: OKHP3 skill format, MIT licensed

## Local Paths
- **Windows**: `C:\Users\jamie\OKH-Local\Projects\abrahamic-reference-engine`
- **Mac**: `/Volumes/OKH-Local/04_GitHub_Mirrors/abrahamic-reference-engine`

## Key Conventions
- Neutral, non-ranking language in all UI copy and skill content
- No em dashes in any generated content
- Preserve standalone punchy lines -- do not consolidate into paragraphs
- ROY principle: understanding produced / explanation invested -- verbosity must earn its space
- AutoCAD version is R10 (locked, not negotiable)
- Cross-tradition compare is the signature feature -- it embodies the mission
- The "Why these three?" / Pew citation explainer is not optional -- always present in the UI
- `src/` holds all React/TypeScript source; reference docs live in `docs/`
- Agent skills distributed via https://github.com/OKHP3/skillz under `okhp3-*` namespace
- **Tone**: solemn, scholarly, neutral -- librarian/archivist register, not charismatic or devotional. Closer to a comparative religion reference desk than a faith assistant. The Glee-fully sparkle/humor voice is explicitly excluded from this project.
- **Never hallucinate verses.** Never invent scripture references. Source-first: API retrieval or static pre-seeded text only.
- **Phase 2 is deferred, not excluded.** Hinduism and Buddhism each represent ~1% of the US and have cultural-literacy value. They are out of scope for Phase 1 (not Abrahamic) but should be revisited if scope expands beyond Abrahamic lineage.

## Project origin
This project originated from a 2026-06-14/15 conversation in which Patrick proposed a GPT for biblical reference understanding. The concept immediately expanded from a narrow Bible lookup into a broader, technically disciplined scripture-reference engine covering all Abrahamic traditions.

Key origin decisions:
- Placed under OverKill Hill P3 / FoundRy, not Glee-fully -- the solemn/sacred context is incompatible with the Glee-fully voice
- Tone set early: solemn, scholarly, neutral -- a librarian, not a preacher
- Scope set by U.S. religious demographics (Pew) + Abrahamic lineage -- both criteria must be met
- Secular/unaffiliated users identified as a primary audience from the start

Source threads: ChatGPT shared threads from 2026-06-14/15.
- https://chatgpt.com/share/6a3caabd-a68c-83ea-88e6-643be78bd23a
- https://chatgpt.com/share/6a3caada-e48c-83ea-8c6d-9dbc54e11222
**Limitation:** Both threads render client-side only. Programmatic extraction is not possible without a headless browser. The thread summaries above were captured via the Notion anchor page (895d08a0-f20f-4f8d-bb8d-c9dd55dee405).

## Related Repos
- [foundry-unt00-un-nocked-truth](https://github.com/OKHP3/foundry-unt00-un-nocked-truth)
- [foundry-psr00-pathscrib-r](https://github.com/OKHP3/foundry-psr00-pathscrib-r)
- [foundry-hmt01-homestead-r](https://github.com/OKHP3/foundry-hmt01-homestead-r)

## Notion extraction report (2026-06-25)
Three Notion pages were read via the Notion API:

| Page | Blocks | Outcome |
|------|--------|---------|
| Main project page (03572df2) | 0 | Empty page -- no content to extract |
| ARE Notion Anchor (895d08a0) | 105 | Rich content extracted -- see Project origin section and Key Conventions tone additions |
| Notion-GitHub Routing Hub (e2949892) | 27 | Structural routing index; table cells not exposed by block API at top level -- no extractable text rows for this repo |

Net-new content merged from Notion: purpose reframing (audience + authority boundary), tone constraint, Phase 2 deferred note, project origin section, NIV added to translation_matrix.md.
Content already captured: GitHub URL, repo name, Pew scope table, three traditions, mission constraints, related repos.

---
*Generated: 2026-06-11 | Merged & updated: 2026-06-25 | Source: Notion Routing Hub + Notion API extraction + Session context*
