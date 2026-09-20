# Technology inventory and update plan

## Current snapshot: September 20, 2026

The [current version report](technology-audit-2026-09-20/technology-versions.md)
and [machine-readable inventory](technology-audit-2026-09-20/technology-versions.json)
were regenerated after dependency PR #16. They enumerate 280 lock entries,
266 distinct package names, and 18 direct dependencies. The live
scan completed with 0 lookup errors. 78 lock entries, including
3 direct dependencies, have newer final releases for review.

The scanned lockfile SHA-256 is `0798f77a14c344202d427592f7eddf81a618937e8dfb8dae1df3214c7755d2a4`,
which matches the dependency state reviewed in PR #17. The report records its
source commit and retrieval time. Installed-version fields describe only that
scan's checkout; Replit runtime versions were not remeasured.

PR #16 merged at `5a6c63b717c0807ab50a6261f4326eb33ebad38a` after full CI.
Its main CI and Pages deployment passed, including hosted browser checks.
The remaining audit publication is reviewed separately in PR #17. Release
candidates in this report are proposals, not automatic upgrades.

## Historical review: September 18, 2026

The remainder preserves the earlier review and its host observations. Its
package counts, version comparisons, validation results, and pending steps
belong to that date; use the September 20 report above for the updated dependency
inventory. The original dated reports remain available for comparison.

Audit date: September 18, 2026 (America/Chicago). Release retrieval timestamps
are UTC in the generated report. Baseline: `0e90bb6f0eecd6e4c75e1201cbbb8b6e579eee5f`.

Decision: extend the existing Dependabot workflow and add a reproducible release
audit. An upstream release becomes a tested update proposal. Production changes
follow a passing review and merge, because a stable upstream release does not
guarantee compatibility with this application.

## Inventory and evidence boundaries

The [complete version report](technology-audit-2026-09-18/technology-versions.md)
and [machine-readable inventory](technology-audit-2026-09-18/technology-versions.json)
list all 18 direct npm dependencies and all 267 lockfile entries, including 258
distinct package names, nested versions, and optional platform binaries. They
also list five GitHub Actions, seven supporting skill package manifests, and
the Replit environment declarations. Every package has an upstream source URL.

The completed scan has zero release-lookup errors. Twelve of the 18 direct
dependencies and 112 of all 267 lock entries have newer stable versions.
The latter count includes transitive and platform-specific packages; it is not
112 independent app migrations. TypeScript 7.0.2 and Tailwind CSS 4.3.3 are
already current. Resolved versions of Replit's 30 system libraries remain an
explicit inventory exception, managed through its supported package channel.

For npm, latest stable means the highest published final version. The report
also preserves the registry's `latest` tag: Babel tags can point at an older
major, and `gensync` tags a beta while its final release remains 0.1.0. A
prerelease already required by an upstream package is flagged for parent-package
review, never automatically downgraded. Missing metadata remains unknown.

`package.json` ranges are requested versions; `package-lock.json` contains the
resolved source versions. Installed versions are measured independently. The
initial Windows installation was incomplete: six lint/test dependencies were
missing. A clean `npm ci --ignore-scripts --no-audit --no-fund` restored the locked
installation without changing the lockfile. This audit does not upgrade the
application packages or the user's machine.

The SPA uses React, React DOM, React Router DOM, TypeScript, Vite and its React
plugin, Tailwind CSS and its PostCSS integration, and PostCSS. Validation uses
ESLint, `@eslint/js`, Babel's ESLint parser and React/TypeScript presets,
Playwright, `tsx`, and React/React DOM type declarations. The manifest currently
places some test/lint tools in `dependencies`; that field alone is not evidence
that a package ships in the browser bundle.

Build internals such as Rolldown, esbuild, Lightning CSS, Babel core, Tailwind
Oxide, source-map tools, and platform-specific native binaries are transitive
dependencies. Their exact versions and latest releases are in the full report.
Update their owning packages or regenerate a compatible lockfile; do not force
every transitive dependency to its latest major or hand-edit lock entries.

## Languages, runtimes, and supporting tools

| Technology | Version in use / evidence | Latest stable checked | Update treatment |
|---|---|---|---|
| TypeScript / TSX | 7.0.2 compiler; `src/`, `vite.config.ts` | See generated npm report | Dependabot plus type-check/build gate. |
| JavaScript / ECMAScript | ESM and CJS tools; app type-check target ES2020; build-config target ES2022 with ES2023 libraries | [ECMAScript 2026, edition 17](https://ecma-international.org/publications-and-standards/standards/ecma-262/) | A language standard is not an installed package. Keep compatibility targets intentional; do not increase them automatically. |
| Node.js | Windows 24.11.1; Replit shell 24.13.0; CI and Pages declare `lts/*` with `check-latest: true` | [26.9.0 Current; 24.21.0 LTS](https://nodejs.org/en/download) | Continue production LTS tracking; test Current separately before an LTS transition. Replit/local binaries require host updates. |
| npm | Windows and Replit 11.6.2; lockfile format 3 | Official registry result in generated report | Node LTS currently bundles npm 11.19.0. npm can advance independently; use one tested version when regenerating the lockfile. |
| Python | Windows 3.14.0rc1; Replit `python3 --version` reports 3.14.6; declares `python-3.14` | [3.14.7](https://www.python.org/downloads/) | Skill support and archived generator only. Replace the local prerelease with a final release and refresh Replit's supported patch. Replit's `python` alias offered tool installation, but `python3` works. |
| Python libraries | All 22 tracked Python files use the standard library; no Python dependency manifest found | Follows Python | No pip dependency updater is needed today. Do not execute the historical generator as a test. |
| Git / Git for Windows | 2.55.0.windows.5 locally; remote Git version unmeasured | [Git 2.55.0](https://git-scm.com/install/); [Windows 2.55.0.windows.5](https://github.com/git-for-windows/git/releases/tag/v2.55.0.windows.5) | Host package management; not an SPA dependency. |
| Bash | Git for Windows Bash 5.3.15(2); used by optional skill health checks and hosted workflow shell steps | [Bash 5.3 release line](https://www.gnu.org/software/bash/manual/html_node/index.html); latest upstream patch not independently established | Follow the host's supported distribution. |
| curl | Windows 8.21.0; optional Bash provider health checks | [8.22.0](https://curl.se/docs/releases.html) | Host package management; the app uses browser Fetch. |
| jq | Referenced by optional skill health checks; not found on the Windows PATH | [1.8.2](https://github.com/jqlang/jq/releases/tag/jq-1.8.2) | Install through the host package manager only when those checks are needed. |
| Chromium / Chrome for Testing | Playwright 1.62.1 declares Chromium 151.0.7922.34, revision 1234 | Browser revision supplied by the selected Playwright release | CI installs the matching browser after every Playwright update. Do not pair arbitrary browser and driver releases. Firefox/WebKit metadata is bundled, but this project's configured tests use Chromium. |
| Mermaid | No npm dependency, runtime import, or CDN script. A fenced example exists in a skill extraction fixture. | No project-controlled Mermaid release to update | GitHub/editor rendering is host-managed. Do not add Mermaid to the app merely because documentation mentions it. |

## Hosting and system environment

| Technology | In-place configuration | Latest stable / release boundary | Update treatment |
|---|---|---|---|
| GitHub Actions | `ubuntu-latest`; checkout v7, setup-node v7, configure-pages v6, upload-pages-artifact v5, deploy-pages v5 | Official action releases in generated report; runner image is rolling | Dependabot updates action refs. Capture the actual runner image and resolved action SHA from each run's logs. |
| GitHub Pages | Static SPA with production basename `/abrahamic-reference-engine/` | Provider-managed service; no installable version | Existing Pages deployment and hosted route smoke checks. |
| Replit | Modules `python-3.14`, `web`, `nodejs-24`; port 5000; preview deployment configuration | Provider-managed service | Confirm module availability in Replit. Git synchronization does not update the provisioned runtime automatically. |
| Nix / nixpkgs | Replit channel `stable-25_05`; shell reports Determinate Nix 3.11.2, upstream Nix 2.31.1 | [Determinate Nix 3.22.3](https://manual.determinate.systems/release-notes-determinate/index.html); [upstream Nix 2.35.2 and NixOS/nixpkgs 26.05](https://nixos.org/download/) | The fork, upstream executable, and package channel are separate versions. Use Replit-supported upgrades; verify support before migrating the channel and browser libraries. |
| Replit Notion integration | `notion:1.0.0` declared in `.replit` | Provider integration identifier; public latest version unknown | Workspace integration, not a browser dependency. Review supported versions in Replit. |

All 30 declared Replit system package names are preserved in the generated
report: `glib`, `nss`, `nspr`, `atk`, `at-spi2-atk`, `cups`, `dbus`, `expat`,
`pango`, `cairo`, `fontconfig`, `freetype`, `harfbuzz`, `alsa-lib`, `libdrm`,
`mesa`, `libxkbcommon`, `xorg.libX11`, `xorg.libXcomposite`, `xorg.libXdamage`,
`xorg.libXext`, `xorg.libXfixes`, `xorg.libXrandr`, `xorg.libxcb`,
`xorg.libxshmfence`, `libgbm`, `libGL`, `libGLU`, `xorg.libXi`, and
`xorg.libXrender`. Individual resolved and latest package versions remain
unknown; these are channel-managed browser/system libraries. Do not assume all
declarations are installed. Upgrade through a tested Replit channel change.

## Formats and browser standards

| Technology | In use | Current specification / update method |
|---|---|---|
| HTML | HTML doctype and SPA shell | [WHATWG living standard](https://html.spec.whatwg.org/multipage/); browser compatibility tests. |
| CSS | Custom properties and Tailwind 4 CSS-first theme | [CSS Snapshot 2026](https://www.w3.org/TR/css/); individual modules have separate levels, not one installable CSS version. |
| JSON | Manifests, source data, lockfile, API fixtures | [RFC 8259](https://www.rfc-editor.org/rfc/rfc8259); file schemas govern compatibility. |
| JSON-LD / Schema.org | Search metadata in `index.html` | [JSON-LD 1.1](https://www.w3.org/TR/json-ld11/); Schema.org vocabulary is remotely maintained. Review structured data when changing metadata. |
| YAML | Workflow, skill, and brand configuration; no explicit dialect pin | [YAML 1.2.2](https://yaml.org/spec/1.2.2/); GitHub Actions and Dependabot have their own schemas. Dependabot's `version: 2` is a config schema version. |
| TOML | `.replit` and agent asset metadata; no explicit dialect pin | [TOML 1.1.0](https://toml.io/en/); Replit parser support governs adoption. |
| Markdown | README, skills, reference material; renderer not pinned | [CommonMark 0.31.2](https://spec.commonmark.org/) and [GFM 0.29](https://github.github.com/gfm/); host-managed rendering. |
| OpenAPI | 3.1.0 in checked-in skill API descriptions | [3.2.1](https://spec.openapis.org/oas/v3.2.1.html); validate consuming tools before changing schema versions. Archived specs may describe providers other than active SPA adapters. |
| iCalendar | `VERSION:2.0` output in `src/lib/icsGenerator.ts` | [RFC 5545](https://www.rfc-editor.org/info/rfc5545/); compatibility tests, not a package bump. |
| SVG, PNG, JPEG, WebP, ICO, web app manifest, ZIP | Static icons, images, downloadable historical archive, site manifest | File formats, not installed runtime dependencies. No image encoder or archive library is pinned by this app. |
| Fetch, DOM, Web Storage, Clipboard, URL, Intl | Browser APIs used directly by application code | Living browser standards; verify supported browsers after frontend updates. |

## External services and API versions

These are service contracts, not dependencies with a universal "latest stable"
package version. Keep endpoint versions and provider behavior distinct.

| Service | Interface in active source | Upstream reference / update plan |
|---|---|---|
| Sefaria | `/api/texts`, unversioned | [Developer portal](https://developers.sefaria.org/); a newer supported anonymous replacement was not confirmed in this audit. |
| bible-api.com | Unversioned reference endpoint | [Provider documentation](https://bible-api.com/); source still documents this interface. |
| Quran.com | `/api/v4` | [Current foundation documentation](https://api-docs.quran.com/) describes v4 content APIs with app credentials. That is a separate integration boundary; do not silently migrate this anonymous SPA. |
| AlQuran.cloud | `/v1` | [Provider documentation](https://alquran.cloud/api); retain edition/provenance checks. |
| Hadith API through jsDelivr | GitHub dataset ref `fawazahmed0/hadith-api@1` | [Dataset repository](https://github.com/fawazahmed0/hadith-api); moving ref, not npm package `hadith-api`. Review dataset changes and rendered citations. |
| scriptures.nephi.org | Unversioned scripture endpoint | [Provider documentation](https://scriptures.nephi.org/); no version bump feed established. |
| Hebcal | `/hebcal` query API | [Developer APIs](https://www.hebcal.com/home/developer-apis); validate yearly calendar results. |
| Aladhan | `/v1/gToHCalendar` | [Calendar API](https://aladhan.com/islamic-calendar-api); validate dates and response contracts. |
| Wikipedia | `/api/rest_v1/page/summary` | [MediaWiki API guidance](https://www.mediawiki.org/wiki/REST_API); review lifecycle notices and test this exact interface before migration. |
| Google Analytics | GA4 via hosted `gtag.js` | [Google tag documentation](https://developers.google.com/tag-platform/gtagjs); hosted script has no app-pinned package version. |

No database, backend framework, authenticated app service, Java runtime, or
Python web server is part of the active SPA. VS Code, Chrome, Edge, Explorer,
ChatGPT, and this audit session's tools are authoring/access clients. Their
desktop application releases are outside the solution's dependency contract.

## Implemented automation and release plan

1. **Detect and propose package updates.** `.github/dependabot.yml` checks npm
   at 09:00 America/Chicago every weekday and Actions at 09:15. Minor and patch
   updates remain grouped; majors remain separate. npm's `increase` strategy
   raises manifest requirements as well as the lockfile. See the
   [official configuration reference](https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-options-reference).
2. **Audit the broader inventory.** `.github/workflows/technology-audit.yml`
   runs daily at 14:43 UTC and supports manual dispatch. It reads npm final
   releases, Node Current/LTS releases, Python final releases, and action
   releases, then writes the full comparison to the run summary. It requires
   no added packages, PAT, external bot, or service subscription. Read-only
   `GITHUB_TOKEN` avoids anonymous GitHub API limits. Lookup failures fail the
   audit and remain unknown. Available updates appear in the summary; they do
   not fail a healthy audit or generate a second duplicate update PR.
3. **Validate changes.** Existing PR CI performs clean `npm ci`, build, Pages
   artifact checks, lint, deterministic API tests, Chromium browser tests,
   Pages path tests, skill parity, and calendar coverage. New audit logic tests
   also run in CI. Do not treat this configuration as an enforced merge rule:
   the branch endpoint currently reports `protected: false`. No branch
   permissions were changed by this work.
4. **Review and merge.** Owner review checks release notes, engine/peer
   requirements, lockfile consistency, and failed tests. Merge a passing update
   PR, then verify the Pages deployment and hosted smoke check at that commit.
   There is no unconditional auto-merge or automatic major-version migration.
   Existing PR #16 already proposes 12 updates and had a successful GitHub
   build when inspected; it is not merged by this audit.
5. **Synchronize environments.** After release, preserve any local/Replit work,
   fetch/fast-forward the tested main, install from its lockfile, and rerun
   validation. Record actual `node --version` and `npm --version` on each host.
   The workflow cannot update a disconnected workstation or provision Replit
   modules. For a new Node LTS major or Python minor, test the new series,
   verify Replit availability, update its declarations through a reviewed PR,
   and update the local runtime using its official installer/package manager.
6. **Review platform and provider changes monthly.** The owner reviews the
   Nix/Replit channel, system tools, API lifecycle notices, and standards above.
   Run `npm run test:api` for provider changes and calendar browser checks for
   calendar changes. Preserve the free/anonymous API constraint. Add discovered
   provider gaps and keep the canonical and publication gap registers in sync.
7. **Recover safely.** If an update breaks the app, stop its PR or revert its
   reviewed change through a PR, rerun the gates, and verify deployment. Do not
   force-push, delete recovery branches, edit installed packages, or manufacture
   missing lockfile metadata. Refresh this dated report after dependency or
   runtime changes; the next live audit supersedes its latest-version column.

Run from the repository root:

```sh
npm run test:technologies
npm run audit:technologies -- --output .local/state/technology-audit
```

For inventory without network access, add `--offline`; all upstream results
then say `not checked (offline)`. Use `--summary <path>` to append the Markdown
report. The online audit reads public package names only. Rate-limited hosts
are stopped for the run; honor the reported retry interval before retrying.

## Claim and validation ledger

| Claim | Tier | Evidence | Consequence if false | Next check |
|---|---|---|---|---|
| All root npm lock entries are enumerated | Confirmed | Generated JSON, 267 entries / 258 names | An untracked dependency may age unnoticed | Regenerate after lock changes; test nested/optional entries. |
| The Windows, Replit, and GitHub source baselines agree | Confirmed | Local HEAD, Replit shell HEAD, and GitHub main all `0e90bb6`; Replit short status was empty | Audit would compare different code | Refresh main before publication; connector authentication remains a separate concern. |
| New automation is running on GitHub | Unknown until merged | Files created locally in this task | Daily audit/schedule changes are inactive | Merge through a PR and manually dispatch the audit. |
| New audit version logic works | Confirmed | Deterministic audit tests and YAML parse | Misclassified upgrades | Run tests in CI after script edits. |
| Existing Windows release gates all pass | Confirmed false | Build/lint/Pages/calendar pass; README test fails with CRLF; skill check reports byte/cache differences and Windows path mismatches | Local validation would be overstated | Track the portability fixes separately; retain hosted CI evidence separately. |
| Replit Python 3 is available | Confirmed | `python3 --version` returned 3.14.6; the unqualified `python` alias did not resolve | Skill commands using the wrong executable may fail | Use `python3` in Replit and verify the version after a module refresh. |
| All upstream releases are compatible | Unknown | Release metadata only | Runtime or provider regressions | Test each proposed update before merge. |

Acceptance requires a sourced version inventory, a runnable audit, tested
failure handling, a reviewable updater configuration, and explicit exceptions.
This record expires on dependency/environment changes or a later successful
live audit. Deployment and host-runtime changes are separate release steps.

### Validation results

- **PASS:** clean locked install without lifecycle scripts; lockfile unchanged.
- **PASS:** production build, application lint, Pages artifact paths, and Mercury
  date coverage. The build retains its existing large-chunk warning.
- **PASS:** ten audit tests, including stable-only selection, stale registry tags,
  missing lock entries/metadata, nested dependencies, token scope, and rate-limit
  handling; workflow/config YAML parses successfully.
- **PASS:** the full live release audit completes with zero lookup errors;
  offline mode produces a complete lock inventory without implying freshness.
- **PASS:** 36 deterministic browser tests; 10 intentionally skipped because of
  the selected desktop/mobile projects and local-server mode.
- **FAIL in the existing working copy:** one README assertion assumes LF line
  endings. All 13 deterministic API/content tests pass in a clean LF source
  snapshot containing this task's changes.
- **FAIL on Windows:** the existing skill check compares native backslash paths
  with forward-slash keys. That failure remains in the clean LF snapshot. The
  original checkout also has CRLF byte differences and an ignored Python cache
  in a mirrored skill package. No skill source or recovery material was changed.
- **NOT RUN for this branch:** hosted CI, deployment, and live provider smoke
  tests. Existing Dependabot PR #16 has a passing hosted build; that is evidence
  for its own commit, not this branch.

### First update cycle

1. Publish this configuration through a reviewed PR and manually run the audit.
2. Refresh existing Dependabot PR #16 against the current version report; let
   Dependabot regenerate the lockfile and run the existing CI gates. Review
   coordinated React/type packages, Babel tools, Vite/plugin, and Playwright
   browser revisions together.
3. Move development hosts to a supported Node 24 LTS patch, currently 24.21.0,
   and Python final patches, currently 3.14.7, using each host's supported tools.
4. Evaluate npm 12.0.2 separately. Its published Node requirement is
   `^22.22.2 || ^24.15.0 || >=26.0.0`, so the observed Windows 24.11.1 and Replit
   24.13.0 runtimes need an update first. Keeping the npm supplied with Node LTS
   is acceptable until that upgrade is validated.
5. Verify CI and the Pages deployment for the merged commit, then synchronize
   Replit and the Windows checkout. Record every host's resulting versions.
