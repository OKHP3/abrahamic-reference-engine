# abrahamic-reference-engine

## Project Identity
- **Suite**: FoundRy
- **Type**: SPA + Agent Skills Package
- **GitHub**: https://github.com/OKHP3/abrahamic-reference-engine
- **Notion Anchor**: https://app.notion.com/p/895d08a0f20f4f8dbb8dc9dd55dee405
- **Status**: Active / In Development

## Purpose
ARE00 -- Abrahamic Reference Engine. An interfaith bridge: a neutral, agnostic reference tool that surfaces the shared wisdom and connections between Abrahamic traditions. Not a debate platform. Not a ranking. A translator between faiths -- showing that these traditions are less different than they appear.

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

## Related Repos
- [foundry-unt00-un-nocked-truth](https://github.com/OKHP3/foundry-unt00-un-nocked-truth)
- [foundry-psr00-pathscrib-r](https://github.com/OKHP3/foundry-psr00-pathscrib-r)
- [foundry-hmt01-homestead-r](https://github.com/OKHP3/foundry-hmt01-homestead-r)

---
*Generated: 2026-06-11 | Merged & updated: 2026-06-24 | Source: Notion Routing Hub + Local Scans + Session context*
