# ARE technology version audit

Retrieved: 2026-09-19T03:52:21.193Z. Source HEAD: `0e90bb6f0eecd6e4c75e1201cbbb8b6e579eee5f`.
Lockfile SHA-256: `a8f36edc21a5a2753d0cc4c72bbdcd6deda091d3cb13261bc7f68833ccf930de`.

Locked versions describe the source checkout, not proof of a deployed or installed version.
Latest means the highest published final npm version or final upstream release; prereleases are excluded.
The npm latest tag is retained separately because tags may point to an older major or a prerelease.
A newer release is a candidate, not proof of compatibility. Transitive packages follow their parent requirements.

Coverage: 267 lockfile entries; 258 distinct npm packages; 18 direct dependencies; 0 lookup errors.

## Direct dependencies

| Package | Requested | Locked | Installed here | Latest stable | Latest tag | Result | Source |
| --- | --- | --- | --- | --- | --- | --- | --- |
| @babel/eslint-parser | ^8.0.1 | 8.0.1 | 8.0.1 | 8.0.6 | 7.29.9 | patch update | https://registry.npmjs.org/%40babel%2Feslint-parser |
| @babel/preset-react | ^8.0.1 | 8.0.1 | 8.0.1 | 8.0.1 | 8.0.1 | current | https://registry.npmjs.org/%40babel%2Fpreset-react |
| @babel/preset-typescript | ^8.0.1 | 8.0.1 | 8.0.1 | 8.0.1 | 8.0.1 | current | https://registry.npmjs.org/%40babel%2Fpreset-typescript |
| @eslint/js | ^10.0.1 | 10.0.1 | 10.0.1 | 10.0.1 | 10.0.1 | current | https://registry.npmjs.org/%40eslint%2Fjs |
| @playwright/test | ^1.62.1 | 1.62.1 | 1.62.1 | 1.63.0 | 1.63.0 | minor update | https://registry.npmjs.org/%40playwright%2Ftest |
| @tailwindcss/postcss | ^4.3.3 | 4.3.3 | 4.3.3 | 4.3.3 | 4.3.3 | current | https://registry.npmjs.org/%40tailwindcss%2Fpostcss |
| @types/react | ^19.2.17 | 19.2.17 | 19.2.17 | 19.3.0 | 19.3.0 | minor update | https://registry.npmjs.org/%40types%2Freact |
| @types/react-dom | ^19.2.3 | 19.2.3 | 19.2.3 | 19.3.0 | 19.3.0 | minor update | https://registry.npmjs.org/%40types%2Freact-dom |
| @vitejs/plugin-react | ^6.0.3 | 6.0.3 | 6.0.3 | 6.1.1 | 6.1.1 | minor update | https://registry.npmjs.org/%40vitejs%2Fplugin-react |
| eslint | ^10.9.1 | 10.9.1 | 10.9.1 | 10.11.0 | 10.11.0 | minor update | https://registry.npmjs.org/eslint |
| postcss | ^8.5.19 | 8.5.19 | 8.5.19 | 8.5.28 | 8.5.28 | patch update | https://registry.npmjs.org/postcss |
| react | ^19.2.7 | 19.2.7 | 19.2.7 | 19.3.0 | 19.3.0 | minor update | https://registry.npmjs.org/react |
| react-dom | ^19.2.7 | 19.2.7 | 19.2.7 | 19.3.0 | 19.3.0 | minor update | https://registry.npmjs.org/react-dom |
| react-router-dom | ^7.18.1 | 7.18.1 | 7.18.1 | 7.18.4 | 7.18.4 | patch update | https://registry.npmjs.org/react-router-dom |
| tailwindcss | ^4.3.3 | 4.3.3 | 4.3.3 | 4.3.3 | 4.3.3 | current | https://registry.npmjs.org/tailwindcss |
| tsx | ^4.23.12 | 4.23.12 | 4.23.12 | 4.23.13 | 4.23.13 | patch update | https://registry.npmjs.org/tsx |
| typescript | ^7.0.2 | 7.0.2 | 7.0.2 | 7.0.2 | 7.0.2 | current | https://registry.npmjs.org/typescript |
| vite | ^8.1.4 | 8.1.4 | 8.1.4 | 8.3.0 | 8.3.0 | minor update | https://registry.npmjs.org/vite |

## Runtimes and environment

| Technology | In this audit process / configured | Latest stable | Policy / result | Source |
| --- | --- | --- | --- | --- |
| npm | 11.6.2 | 12.0.2 | major update | https://registry.npmjs.org/npm |
| Node.js (latest stable) | v24.11.1 | v26.9.0 | major update | https://nodejs.org/dist/index.json |
| Node.js (LTS production target) | v24.11.1 | v24.21.0 | minor update | https://nodejs.org/dist/index.json |
| Python | python-3.14 | 3.14.7 | declared series only; inspect host installation and patch separately | https://www.python.org/downloads/ |

Replit declarations: python-3.14, web, nodejs-24; Nix channel: stable-25_05. These are declarations, not runtime measurements.

Replit system packages (individual versions are not pinned): glib, nss, nspr, atk, at-spi2-atk, cups, dbus, expat, pango, cairo, fontconfig, freetype, harfbuzz, alsa-lib, libdrm, mesa, libxkbcommon, xorg.libX11, xorg.libXcomposite, xorg.libXdamage, xorg.libXext, xorg.libXfixes, xorg.libXrandr, xorg.libxcb, xorg.libxshmfence, libgbm, libGL, libGLU, xorg.libXi, xorg.libXrender.

## GitHub Actions

| Action | Configured ref | Latest stable | Result | Source |
| --- | --- | --- | --- | --- |
| actions/checkout | v7 | v7.0.1 | current major; floating patch | https://api.github.com/repos/actions/checkout/releases/latest |
| actions/setup-node | v7 | v7.0.0 | current major; floating patch | https://api.github.com/repos/actions/setup-node/releases/latest |
| actions/configure-pages | v6 | v6.0.0 | current major; floating patch | https://api.github.com/repos/actions/configure-pages/releases/latest |
| actions/upload-pages-artifact | v5 | v5.0.0 | current major; floating patch | https://api.github.com/repos/actions/upload-pages-artifact/releases/latest |
| actions/deploy-pages | v5 | v5.0.1 | current major; floating patch | https://api.github.com/repos/actions/deploy-pages/releases/latest |

Major action tags float within that major. Exact historical execution versions require the corresponding workflow logs.

## Supporting package manifests

| Path | Name | Version | External dependencies |
| --- | --- | --- | --- |
| .agents/skills/okhp3-as-is-process-capture/package.json | @bp-skill/as-is-process-capture | 0.1.0 | none |
| .agents/skills/okhp3-decision-model-authoring/package.json | @bp-skill/decision-model-authoring | 0.1.0 | none |
| .agents/skills/okhp3-elicitation-interviews/package.json | @bp-skill/elicitation-and-interview-facilitation | 0.1.0 | none |
| .agents/skills/okhp3-future-state-strategy/package.json | @bp-skill/future-state-and-change-strategy | 0.1.0 | none |
| .agents/skills/okhp3-handoff-packaging/package.json | @bp-skill/publication-and-handoff-packaging | 0.1.0 | none |
| .agents/skills/okhp3-process-gap-analysis/package.json | @bp-skill/process-gap-and-exception-analysis | 0.1.0 | none |
| .agents/skills/okhp3-process-intake-and-scope/package.json | @bp-skill/process-intake-and-scope | 0.1.0 | none |

## Complete npm lock inventory

| Package | Lock path | Locked | Latest stable | Latest tag | Result | Source |
| --- | --- | --- | --- | --- | --- | --- |
| @alloc/quick-lru | node_modules/@alloc/quick-lru | 5.2.0 | 5.3.0 | 5.3.0 | minor update | https://registry.npmjs.org/%40alloc%2Fquick-lru |
| @babel/code-frame | node_modules/@babel/code-frame | 8.0.0 | 8.0.6 | 8.0.6 | patch update | https://registry.npmjs.org/%40babel%2Fcode-frame |
| @babel/compat-data | node_modules/@babel/compat-data | 8.0.0 | 8.0.5 | 8.0.5 | patch update | https://registry.npmjs.org/%40babel%2Fcompat-data |
| @babel/core | node_modules/@babel/core | 8.0.1 | 8.0.6 | 8.0.6 | patch update | https://registry.npmjs.org/%40babel%2Fcore |
| @babel/eslint-parser | node_modules/@babel/eslint-parser | 8.0.1 | 8.0.6 | 7.29.9 | patch update | https://registry.npmjs.org/%40babel%2Feslint-parser |
| @babel/generator | node_modules/@babel/generator | 8.0.0 | 8.0.6 | 8.0.6 | patch update | https://registry.npmjs.org/%40babel%2Fgenerator |
| @babel/helper-annotate-as-pure | node_modules/@babel/helper-annotate-as-pure | 8.0.0 | 8.0.0 | 8.0.0 | current | https://registry.npmjs.org/%40babel%2Fhelper-annotate-as-pure |
| @babel/helper-compilation-targets | node_modules/@babel/helper-compilation-targets | 8.0.0 | 8.0.6 | 8.0.6 | patch update | https://registry.npmjs.org/%40babel%2Fhelper-compilation-targets |
| @babel/helper-create-class-features-plugin | node_modules/@babel/helper-create-class-features-plugin | 8.0.1 | 8.0.6 | 8.0.6 | patch update | https://registry.npmjs.org/%40babel%2Fhelper-create-class-features-plugin |
| @babel/helper-globals | node_modules/@babel/helper-globals | 8.0.0 | 8.0.6 | 8.0.6 | patch update | https://registry.npmjs.org/%40babel%2Fhelper-globals |
| @babel/helper-member-expression-to-functions | node_modules/@babel/helper-member-expression-to-functions | 8.0.0 | 8.0.5 | 8.0.5 | patch update | https://registry.npmjs.org/%40babel%2Fhelper-member-expression-to-functions |
| @babel/helper-module-imports | node_modules/@babel/helper-module-imports | 8.0.0 | 8.0.0 | 8.0.0 | current | https://registry.npmjs.org/%40babel%2Fhelper-module-imports |
| @babel/helper-module-transforms | node_modules/@babel/helper-module-transforms | 8.0.1 | 8.0.6 | 8.0.6 | patch update | https://registry.npmjs.org/%40babel%2Fhelper-module-transforms |
| @babel/helper-optimise-call-expression | node_modules/@babel/helper-optimise-call-expression | 8.0.0 | 8.0.0 | 8.0.0 | current | https://registry.npmjs.org/%40babel%2Fhelper-optimise-call-expression |
| @babel/helper-plugin-utils | node_modules/@babel/helper-plugin-utils | 8.0.1 | 8.0.1 | 8.0.1 | current | https://registry.npmjs.org/%40babel%2Fhelper-plugin-utils |
| @babel/helper-replace-supers | node_modules/@babel/helper-replace-supers | 8.0.1 | 8.0.1 | 8.0.1 | current | https://registry.npmjs.org/%40babel%2Fhelper-replace-supers |
| @babel/helper-skip-transparent-expression-wrappers | node_modules/@babel/helper-skip-transparent-expression-wrappers | 8.0.0 | 8.0.0 | 8.0.0 | current | https://registry.npmjs.org/%40babel%2Fhelper-skip-transparent-expression-wrappers |
| @babel/helper-string-parser | node_modules/@babel/helper-string-parser | 8.0.0 | 8.0.6 | 8.0.6 | patch update | https://registry.npmjs.org/%40babel%2Fhelper-string-parser |
| @babel/helper-validator-identifier | node_modules/@babel/helper-validator-identifier | 8.0.4 | 8.0.6 | 8.0.6 | patch update | https://registry.npmjs.org/%40babel%2Fhelper-validator-identifier |
| @babel/helper-validator-option | node_modules/@babel/helper-validator-option | 8.0.0 | 8.0.0 | 8.0.0 | current | https://registry.npmjs.org/%40babel%2Fhelper-validator-option |
| @babel/helpers | node_modules/@babel/helpers | 8.0.0 | 8.0.5 | 8.0.5 | patch update | https://registry.npmjs.org/%40babel%2Fhelpers |
| @babel/parser | node_modules/@babel/parser | 8.0.4 | 8.0.6 | 7.29.9 | patch update | https://registry.npmjs.org/%40babel%2Fparser |
| @babel/plugin-syntax-jsx | node_modules/@babel/plugin-syntax-jsx | 8.0.1 | 8.0.1 | 8.0.1 | current | https://registry.npmjs.org/%40babel%2Fplugin-syntax-jsx |
| @babel/plugin-syntax-typescript | node_modules/@babel/plugin-syntax-typescript | 8.0.3 | 8.0.3 | 8.0.3 | current | https://registry.npmjs.org/%40babel%2Fplugin-syntax-typescript |
| @babel/plugin-transform-modules-commonjs | node_modules/@babel/plugin-transform-modules-commonjs | 8.0.1 | 8.0.1 | 8.0.1 | current | https://registry.npmjs.org/%40babel%2Fplugin-transform-modules-commonjs |
| @babel/plugin-transform-react-display-name | node_modules/@babel/plugin-transform-react-display-name | 8.0.1 | 8.0.1 | 8.0.1 | current | https://registry.npmjs.org/%40babel%2Fplugin-transform-react-display-name |
| @babel/plugin-transform-react-jsx | node_modules/@babel/plugin-transform-react-jsx | 8.0.1 | 8.0.1 | 8.0.1 | current | https://registry.npmjs.org/%40babel%2Fplugin-transform-react-jsx |
| @babel/plugin-transform-react-jsx-development | node_modules/@babel/plugin-transform-react-jsx-development | 8.0.1 | 8.0.1 | 8.0.1 | current | https://registry.npmjs.org/%40babel%2Fplugin-transform-react-jsx-development |
| @babel/plugin-transform-react-pure-annotations | node_modules/@babel/plugin-transform-react-pure-annotations | 8.0.1 | 8.0.1 | 8.0.1 | current | https://registry.npmjs.org/%40babel%2Fplugin-transform-react-pure-annotations |
| @babel/plugin-transform-typescript | node_modules/@babel/plugin-transform-typescript | 8.0.1 | 8.0.6 | 7.29.9 | patch update | https://registry.npmjs.org/%40babel%2Fplugin-transform-typescript |
| @babel/preset-react | node_modules/@babel/preset-react | 8.0.1 | 8.0.1 | 8.0.1 | current | https://registry.npmjs.org/%40babel%2Fpreset-react |
| @babel/preset-typescript | node_modules/@babel/preset-typescript | 8.0.1 | 8.0.1 | 8.0.1 | current | https://registry.npmjs.org/%40babel%2Fpreset-typescript |
| @babel/template | node_modules/@babel/template | 8.0.0 | 8.0.0 | 8.0.0 | current | https://registry.npmjs.org/%40babel%2Ftemplate |
| @babel/traverse | node_modules/@babel/traverse | 8.0.4 | 8.0.6 | 8.0.6 | patch update | https://registry.npmjs.org/%40babel%2Ftraverse |
| @babel/types | node_modules/@babel/types | 8.0.4 | 8.0.6 | 8.0.6 | patch update | https://registry.npmjs.org/%40babel%2Ftypes |
| @emnapi/core | node_modules/@emnapi/core | 1.11.3 | 1.11.3 | 1.11.3 | current | https://registry.npmjs.org/%40emnapi%2Fcore |
| @emnapi/core | node_modules/@rolldown/binding-wasm32-wasi/node_modules/@emnapi/core | 1.11.1 | 1.11.3 | 1.11.3 | patch update | https://registry.npmjs.org/%40emnapi%2Fcore |
| @emnapi/runtime | node_modules/@emnapi/runtime | 1.11.3 | 1.11.3 | 1.11.3 | current | https://registry.npmjs.org/%40emnapi%2Fruntime |
| @emnapi/runtime | node_modules/@rolldown/binding-wasm32-wasi/node_modules/@emnapi/runtime | 1.11.1 | 1.11.3 | 1.11.3 | patch update | https://registry.npmjs.org/%40emnapi%2Fruntime |
| @emnapi/wasi-threads | node_modules/@emnapi/core/node_modules/@emnapi/wasi-threads | 1.2.3 | 2.1.0 | 2.1.0 | major update | https://registry.npmjs.org/%40emnapi%2Fwasi-threads |
| @emnapi/wasi-threads | node_modules/@emnapi/wasi-threads | 1.2.2 | 2.1.0 | 2.1.0 | major update | https://registry.npmjs.org/%40emnapi%2Fwasi-threads |
| @emnapi/wasi-threads | node_modules/@tailwindcss/oxide-wasm32-wasi/node_modules/@emnapi/wasi-threads | 1.2.2 | 2.1.0 | 2.1.0 | major update | https://registry.npmjs.org/%40emnapi%2Fwasi-threads |
| @esbuild/aix-ppc64 | node_modules/@esbuild/aix-ppc64 | 0.28.2 | 0.28.2 | 0.28.2 | current | https://registry.npmjs.org/%40esbuild%2Faix-ppc64 |
| @esbuild/android-arm | node_modules/@esbuild/android-arm | 0.28.2 | 0.28.2 | 0.28.2 | current | https://registry.npmjs.org/%40esbuild%2Fandroid-arm |
| @esbuild/android-arm64 | node_modules/@esbuild/android-arm64 | 0.28.2 | 0.28.2 | 0.28.2 | current | https://registry.npmjs.org/%40esbuild%2Fandroid-arm64 |
| @esbuild/android-x64 | node_modules/@esbuild/android-x64 | 0.28.2 | 0.28.2 | 0.28.2 | current | https://registry.npmjs.org/%40esbuild%2Fandroid-x64 |
| @esbuild/darwin-arm64 | node_modules/@esbuild/darwin-arm64 | 0.28.2 | 0.28.2 | 0.28.2 | current | https://registry.npmjs.org/%40esbuild%2Fdarwin-arm64 |
| @esbuild/darwin-x64 | node_modules/@esbuild/darwin-x64 | 0.28.2 | 0.28.2 | 0.28.2 | current | https://registry.npmjs.org/%40esbuild%2Fdarwin-x64 |
| @esbuild/freebsd-arm64 | node_modules/@esbuild/freebsd-arm64 | 0.28.2 | 0.28.2 | 0.28.2 | current | https://registry.npmjs.org/%40esbuild%2Ffreebsd-arm64 |
| @esbuild/freebsd-x64 | node_modules/@esbuild/freebsd-x64 | 0.28.2 | 0.28.2 | 0.28.2 | current | https://registry.npmjs.org/%40esbuild%2Ffreebsd-x64 |
| @esbuild/linux-arm | node_modules/@esbuild/linux-arm | 0.28.2 | 0.28.2 | 0.28.2 | current | https://registry.npmjs.org/%40esbuild%2Flinux-arm |
| @esbuild/linux-arm64 | node_modules/@esbuild/linux-arm64 | 0.28.2 | 0.28.2 | 0.28.2 | current | https://registry.npmjs.org/%40esbuild%2Flinux-arm64 |
| @esbuild/linux-ia32 | node_modules/@esbuild/linux-ia32 | 0.28.2 | 0.28.2 | 0.28.2 | current | https://registry.npmjs.org/%40esbuild%2Flinux-ia32 |
| @esbuild/linux-loong64 | node_modules/@esbuild/linux-loong64 | 0.28.2 | 0.28.2 | 0.28.2 | current | https://registry.npmjs.org/%40esbuild%2Flinux-loong64 |
| @esbuild/linux-mips64el | node_modules/@esbuild/linux-mips64el | 0.28.2 | 0.28.2 | 0.28.2 | current | https://registry.npmjs.org/%40esbuild%2Flinux-mips64el |
| @esbuild/linux-ppc64 | node_modules/@esbuild/linux-ppc64 | 0.28.2 | 0.28.2 | 0.28.2 | current | https://registry.npmjs.org/%40esbuild%2Flinux-ppc64 |
| @esbuild/linux-riscv64 | node_modules/@esbuild/linux-riscv64 | 0.28.2 | 0.28.2 | 0.28.2 | current | https://registry.npmjs.org/%40esbuild%2Flinux-riscv64 |
| @esbuild/linux-s390x | node_modules/@esbuild/linux-s390x | 0.28.2 | 0.28.2 | 0.28.2 | current | https://registry.npmjs.org/%40esbuild%2Flinux-s390x |
| @esbuild/linux-x64 | node_modules/@esbuild/linux-x64 | 0.28.2 | 0.28.2 | 0.28.2 | current | https://registry.npmjs.org/%40esbuild%2Flinux-x64 |
| @esbuild/netbsd-arm64 | node_modules/@esbuild/netbsd-arm64 | 0.28.2 | 0.28.2 | 0.28.2 | current | https://registry.npmjs.org/%40esbuild%2Fnetbsd-arm64 |
| @esbuild/netbsd-x64 | node_modules/@esbuild/netbsd-x64 | 0.28.2 | 0.28.2 | 0.28.2 | current | https://registry.npmjs.org/%40esbuild%2Fnetbsd-x64 |
| @esbuild/openbsd-arm64 | node_modules/@esbuild/openbsd-arm64 | 0.28.2 | 0.28.2 | 0.28.2 | current | https://registry.npmjs.org/%40esbuild%2Fopenbsd-arm64 |
| @esbuild/openbsd-x64 | node_modules/@esbuild/openbsd-x64 | 0.28.2 | 0.28.2 | 0.28.2 | current | https://registry.npmjs.org/%40esbuild%2Fopenbsd-x64 |
| @esbuild/openharmony-arm64 | node_modules/@esbuild/openharmony-arm64 | 0.28.2 | 0.28.2 | 0.28.2 | current | https://registry.npmjs.org/%40esbuild%2Fopenharmony-arm64 |
| @esbuild/sunos-x64 | node_modules/@esbuild/sunos-x64 | 0.28.2 | 0.28.2 | 0.28.2 | current | https://registry.npmjs.org/%40esbuild%2Fsunos-x64 |
| @esbuild/win32-arm64 | node_modules/@esbuild/win32-arm64 | 0.28.2 | 0.28.2 | 0.28.2 | current | https://registry.npmjs.org/%40esbuild%2Fwin32-arm64 |
| @esbuild/win32-ia32 | node_modules/@esbuild/win32-ia32 | 0.28.2 | 0.28.2 | 0.28.2 | current | https://registry.npmjs.org/%40esbuild%2Fwin32-ia32 |
| @esbuild/win32-x64 | node_modules/@esbuild/win32-x64 | 0.28.2 | 0.28.2 | 0.28.2 | current | https://registry.npmjs.org/%40esbuild%2Fwin32-x64 |
| @eslint-community/eslint-utils | node_modules/@eslint-community/eslint-utils | 4.10.1 | 4.10.1 | 4.10.1 | current | https://registry.npmjs.org/%40eslint-community%2Feslint-utils |
| @eslint-community/regexpp | node_modules/@eslint-community/regexpp | 4.12.2 | 4.12.2 | 4.12.2 | current | https://registry.npmjs.org/%40eslint-community%2Fregexpp |
| @eslint/config-array | node_modules/@eslint/config-array | 0.23.5 | 0.23.5 | 0.23.5 | current | https://registry.npmjs.org/%40eslint%2Fconfig-array |
| @eslint/config-helpers | node_modules/@eslint/config-helpers | 0.7.0 | 0.7.0 | 0.7.0 | current | https://registry.npmjs.org/%40eslint%2Fconfig-helpers |
| @eslint/core | node_modules/@eslint/core | 1.2.1 | 1.2.1 | 1.2.1 | current | https://registry.npmjs.org/%40eslint%2Fcore |
| @eslint/js | node_modules/@eslint/js | 10.0.1 | 10.0.1 | 10.0.1 | current | https://registry.npmjs.org/%40eslint%2Fjs |
| @eslint/object-schema | node_modules/@eslint/object-schema | 3.0.5 | 3.0.5 | 3.0.5 | current | https://registry.npmjs.org/%40eslint%2Fobject-schema |
| @eslint/plugin-kit | node_modules/@eslint/plugin-kit | 0.7.2 | 0.7.3 | 0.7.3 | patch update | https://registry.npmjs.org/%40eslint%2Fplugin-kit |
| @humanfs/core | node_modules/@humanfs/core | 0.19.2 | 0.20.0 | 0.20.0 | minor update | https://registry.npmjs.org/%40humanfs%2Fcore |
| @humanfs/node | node_modules/@humanfs/node | 0.16.8 | 0.17.0 | 0.17.0 | minor update | https://registry.npmjs.org/%40humanfs%2Fnode |
| @humanfs/types | node_modules/@humanfs/types | 0.15.0 | 0.16.0 | 0.16.0 | minor update | https://registry.npmjs.org/%40humanfs%2Ftypes |
| @humanwhocodes/module-importer | node_modules/@humanwhocodes/module-importer | 1.0.1 | 1.0.1 | 1.0.1 | current | https://registry.npmjs.org/%40humanwhocodes%2Fmodule-importer |
| @humanwhocodes/retry | node_modules/@humanwhocodes/retry | 0.4.3 | 0.4.3 | 0.4.3 | current | https://registry.npmjs.org/%40humanwhocodes%2Fretry |
| @jridgewell/gen-mapping | node_modules/@jridgewell/gen-mapping | 0.3.13 | 0.3.13 | 0.3.13 | current | https://registry.npmjs.org/%40jridgewell%2Fgen-mapping |
| @jridgewell/remapping | node_modules/@jridgewell/remapping | 2.3.5 | 2.3.5 | 2.3.5 | current | https://registry.npmjs.org/%40jridgewell%2Fremapping |
| @jridgewell/resolve-uri | node_modules/@jridgewell/resolve-uri | 3.1.2 | 3.1.2 | 3.1.2 | current | https://registry.npmjs.org/%40jridgewell%2Fresolve-uri |
| @jridgewell/sourcemap-codec | node_modules/@jridgewell/sourcemap-codec | 1.5.5 | 1.6.0 | 1.6.0 | minor update | https://registry.npmjs.org/%40jridgewell%2Fsourcemap-codec |
| @jridgewell/trace-mapping | node_modules/@jridgewell/trace-mapping | 0.3.31 | 0.3.31 | 0.3.31 | current | https://registry.npmjs.org/%40jridgewell%2Ftrace-mapping |
| @napi-rs/wasm-runtime | node_modules/@napi-rs/wasm-runtime | 1.1.6 | 1.2.4 | 1.2.4 | minor update | https://registry.npmjs.org/%40napi-rs%2Fwasm-runtime |
| @napi-rs/wasm-runtime | node_modules/@tailwindcss/oxide-wasm32-wasi/node_modules/@napi-rs/wasm-runtime | 1.1.4 | 1.2.4 | 1.2.4 | minor update | https://registry.npmjs.org/%40napi-rs%2Fwasm-runtime |
| @oxc-project/types | node_modules/@oxc-project/types | 0.139.0 | 0.150.0 | 0.150.0 | minor update | https://registry.npmjs.org/%40oxc-project%2Ftypes |
| @playwright/test | node_modules/@playwright/test | 1.62.1 | 1.63.0 | 1.63.0 | minor update | https://registry.npmjs.org/%40playwright%2Ftest |
| @rolldown/binding-android-arm64 | node_modules/@rolldown/binding-android-arm64 | 1.1.5 | 1.2.9 | 1.2.9 | minor update | https://registry.npmjs.org/%40rolldown%2Fbinding-android-arm64 |
| @rolldown/binding-darwin-arm64 | node_modules/@rolldown/binding-darwin-arm64 | 1.1.5 | 1.2.9 | 1.2.9 | minor update | https://registry.npmjs.org/%40rolldown%2Fbinding-darwin-arm64 |
| @rolldown/binding-darwin-x64 | node_modules/@rolldown/binding-darwin-x64 | 1.1.5 | 1.2.9 | 1.2.9 | minor update | https://registry.npmjs.org/%40rolldown%2Fbinding-darwin-x64 |
| @rolldown/binding-freebsd-x64 | node_modules/@rolldown/binding-freebsd-x64 | 1.1.5 | 1.2.9 | 1.2.9 | minor update | https://registry.npmjs.org/%40rolldown%2Fbinding-freebsd-x64 |
| @rolldown/binding-linux-arm-gnueabihf | node_modules/@rolldown/binding-linux-arm-gnueabihf | 1.1.5 | 1.2.9 | 1.2.9 | minor update | https://registry.npmjs.org/%40rolldown%2Fbinding-linux-arm-gnueabihf |
| @rolldown/binding-linux-arm64-gnu | node_modules/@rolldown/binding-linux-arm64-gnu | 1.1.5 | 1.2.9 | 1.2.9 | minor update | https://registry.npmjs.org/%40rolldown%2Fbinding-linux-arm64-gnu |
| @rolldown/binding-linux-arm64-musl | node_modules/@rolldown/binding-linux-arm64-musl | 1.1.5 | 1.2.9 | 1.2.9 | minor update | https://registry.npmjs.org/%40rolldown%2Fbinding-linux-arm64-musl |
| @rolldown/binding-linux-ppc64-gnu | node_modules/@rolldown/binding-linux-ppc64-gnu | 1.1.5 | 1.2.9 | 1.2.9 | minor update | https://registry.npmjs.org/%40rolldown%2Fbinding-linux-ppc64-gnu |
| @rolldown/binding-linux-s390x-gnu | node_modules/@rolldown/binding-linux-s390x-gnu | 1.1.5 | 1.2.9 | 1.2.9 | minor update | https://registry.npmjs.org/%40rolldown%2Fbinding-linux-s390x-gnu |
| @rolldown/binding-linux-x64-gnu | node_modules/@rolldown/binding-linux-x64-gnu | 1.1.5 | 1.2.9 | 1.2.9 | minor update | https://registry.npmjs.org/%40rolldown%2Fbinding-linux-x64-gnu |
| @rolldown/binding-linux-x64-musl | node_modules/@rolldown/binding-linux-x64-musl | 1.1.5 | 1.2.9 | 1.2.9 | minor update | https://registry.npmjs.org/%40rolldown%2Fbinding-linux-x64-musl |
| @rolldown/binding-openharmony-arm64 | node_modules/@rolldown/binding-openharmony-arm64 | 1.1.5 | 1.2.9 | 1.2.9 | minor update | https://registry.npmjs.org/%40rolldown%2Fbinding-openharmony-arm64 |
| @rolldown/binding-wasm32-wasi | node_modules/@rolldown/binding-wasm32-wasi | 1.1.5 | 1.2.9 | 1.2.9 | minor update | https://registry.npmjs.org/%40rolldown%2Fbinding-wasm32-wasi |
| @rolldown/binding-win32-arm64-msvc | node_modules/@rolldown/binding-win32-arm64-msvc | 1.1.5 | 1.2.9 | 1.2.9 | minor update | https://registry.npmjs.org/%40rolldown%2Fbinding-win32-arm64-msvc |
| @rolldown/binding-win32-x64-msvc | node_modules/@rolldown/binding-win32-x64-msvc | 1.1.5 | 1.2.9 | 1.2.9 | minor update | https://registry.npmjs.org/%40rolldown%2Fbinding-win32-x64-msvc |
| @rolldown/pluginutils | node_modules/@rolldown/pluginutils | 1.0.1 | 1.0.1 | 1.0.1 | current | https://registry.npmjs.org/%40rolldown%2Fpluginutils |
| @tailwindcss/node | node_modules/@tailwindcss/node | 4.3.3 | 4.3.3 | 4.3.3 | current | https://registry.npmjs.org/%40tailwindcss%2Fnode |
| @tailwindcss/oxide | node_modules/@tailwindcss/oxide | 4.3.3 | 4.3.3 | 4.3.3 | current | https://registry.npmjs.org/%40tailwindcss%2Foxide |
| @tailwindcss/oxide-android-arm64 | node_modules/@tailwindcss/oxide-android-arm64 | 4.3.3 | 4.3.3 | 4.3.3 | current | https://registry.npmjs.org/%40tailwindcss%2Foxide-android-arm64 |
| @tailwindcss/oxide-darwin-arm64 | node_modules/@tailwindcss/oxide-darwin-arm64 | 4.3.3 | 4.3.3 | 4.3.3 | current | https://registry.npmjs.org/%40tailwindcss%2Foxide-darwin-arm64 |
| @tailwindcss/oxide-darwin-x64 | node_modules/@tailwindcss/oxide-darwin-x64 | 4.3.3 | 4.3.3 | 4.3.3 | current | https://registry.npmjs.org/%40tailwindcss%2Foxide-darwin-x64 |
| @tailwindcss/oxide-freebsd-x64 | node_modules/@tailwindcss/oxide-freebsd-x64 | 4.3.3 | 4.3.3 | 4.3.3 | current | https://registry.npmjs.org/%40tailwindcss%2Foxide-freebsd-x64 |
| @tailwindcss/oxide-linux-arm-gnueabihf | node_modules/@tailwindcss/oxide-linux-arm-gnueabihf | 4.3.3 | 4.3.3 | 4.3.3 | current | https://registry.npmjs.org/%40tailwindcss%2Foxide-linux-arm-gnueabihf |
| @tailwindcss/oxide-linux-arm64-gnu | node_modules/@tailwindcss/oxide-linux-arm64-gnu | 4.3.3 | 4.3.3 | 4.3.3 | current | https://registry.npmjs.org/%40tailwindcss%2Foxide-linux-arm64-gnu |
| @tailwindcss/oxide-linux-arm64-musl | node_modules/@tailwindcss/oxide-linux-arm64-musl | 4.3.3 | 4.3.3 | 4.3.3 | current | https://registry.npmjs.org/%40tailwindcss%2Foxide-linux-arm64-musl |
| @tailwindcss/oxide-linux-x64-gnu | node_modules/@tailwindcss/oxide-linux-x64-gnu | 4.3.3 | 4.3.3 | 4.3.3 | current | https://registry.npmjs.org/%40tailwindcss%2Foxide-linux-x64-gnu |
| @tailwindcss/oxide-linux-x64-musl | node_modules/@tailwindcss/oxide-linux-x64-musl | 4.3.3 | 4.3.3 | 4.3.3 | current | https://registry.npmjs.org/%40tailwindcss%2Foxide-linux-x64-musl |
| @tailwindcss/oxide-wasm32-wasi | node_modules/@tailwindcss/oxide-wasm32-wasi | 4.3.3 | 4.3.3 | 4.3.3 | current | https://registry.npmjs.org/%40tailwindcss%2Foxide-wasm32-wasi |
| @tailwindcss/oxide-win32-arm64-msvc | node_modules/@tailwindcss/oxide-win32-arm64-msvc | 4.3.3 | 4.3.3 | 4.3.3 | current | https://registry.npmjs.org/%40tailwindcss%2Foxide-win32-arm64-msvc |
| @tailwindcss/oxide-win32-x64-msvc | node_modules/@tailwindcss/oxide-win32-x64-msvc | 4.3.3 | 4.3.3 | 4.3.3 | current | https://registry.npmjs.org/%40tailwindcss%2Foxide-win32-x64-msvc |
| @tailwindcss/postcss | node_modules/@tailwindcss/postcss | 4.3.3 | 4.3.3 | 4.3.3 | current | https://registry.npmjs.org/%40tailwindcss%2Fpostcss |
| @tybys/wasm-util | node_modules/@tailwindcss/oxide-wasm32-wasi/node_modules/@tybys/wasm-util | 0.10.2 | 0.10.4 | 0.10.4 | patch update | https://registry.npmjs.org/%40tybys%2Fwasm-util |
| @tybys/wasm-util | node_modules/@tybys/wasm-util | 0.10.3 | 0.10.4 | 0.10.4 | patch update | https://registry.npmjs.org/%40tybys%2Fwasm-util |
| @types/esrecurse | node_modules/@types/esrecurse | 4.3.1 | 4.3.1 | 4.3.1 | current | https://registry.npmjs.org/%40types%2Fesrecurse |
| @types/estree | node_modules/@types/estree | 1.0.9 | 1.0.9 | 1.0.9 | current | https://registry.npmjs.org/%40types%2Festree |
| @types/gensync | node_modules/@types/gensync | 1.0.5 | 1.0.5 | 1.0.5 | current | https://registry.npmjs.org/%40types%2Fgensync |
| @types/jsesc | node_modules/@types/jsesc | 2.5.1 | 3.0.3 | 3.0.3 | major update | https://registry.npmjs.org/%40types%2Fjsesc |
| @types/json-schema | node_modules/@types/json-schema | 7.0.15 | 7.0.15 | 7.0.15 | current | https://registry.npmjs.org/%40types%2Fjson-schema |
| @types/react | node_modules/@types/react | 19.2.17 | 19.3.0 | 19.3.0 | minor update | https://registry.npmjs.org/%40types%2Freact |
| @types/react-dom | node_modules/@types/react-dom | 19.2.3 | 19.3.0 | 19.3.0 | minor update | https://registry.npmjs.org/%40types%2Freact-dom |
| @typescript/typescript-aix-ppc64 | node_modules/@typescript/typescript-aix-ppc64 | 7.0.2 | 7.0.2 | 7.0.2 | current | https://registry.npmjs.org/%40typescript%2Ftypescript-aix-ppc64 |
| @typescript/typescript-darwin-arm64 | node_modules/@typescript/typescript-darwin-arm64 | 7.0.2 | 7.0.2 | 7.0.2 | current | https://registry.npmjs.org/%40typescript%2Ftypescript-darwin-arm64 |
| @typescript/typescript-darwin-x64 | node_modules/@typescript/typescript-darwin-x64 | 7.0.2 | 7.0.2 | 7.0.2 | current | https://registry.npmjs.org/%40typescript%2Ftypescript-darwin-x64 |
| @typescript/typescript-freebsd-arm64 | node_modules/@typescript/typescript-freebsd-arm64 | 7.0.2 | 7.0.2 | 7.0.2 | current | https://registry.npmjs.org/%40typescript%2Ftypescript-freebsd-arm64 |
| @typescript/typescript-freebsd-x64 | node_modules/@typescript/typescript-freebsd-x64 | 7.0.2 | 7.0.2 | 7.0.2 | current | https://registry.npmjs.org/%40typescript%2Ftypescript-freebsd-x64 |
| @typescript/typescript-linux-arm | node_modules/@typescript/typescript-linux-arm | 7.0.2 | 7.0.2 | 7.0.2 | current | https://registry.npmjs.org/%40typescript%2Ftypescript-linux-arm |
| @typescript/typescript-linux-arm64 | node_modules/@typescript/typescript-linux-arm64 | 7.0.2 | 7.0.2 | 7.0.2 | current | https://registry.npmjs.org/%40typescript%2Ftypescript-linux-arm64 |
| @typescript/typescript-linux-loong64 | node_modules/@typescript/typescript-linux-loong64 | 7.0.2 | 7.0.2 | 7.0.2 | current | https://registry.npmjs.org/%40typescript%2Ftypescript-linux-loong64 |
| @typescript/typescript-linux-mips64el | node_modules/@typescript/typescript-linux-mips64el | 7.0.2 | 7.0.2 | 7.0.2 | current | https://registry.npmjs.org/%40typescript%2Ftypescript-linux-mips64el |
| @typescript/typescript-linux-ppc64 | node_modules/@typescript/typescript-linux-ppc64 | 7.0.2 | 7.0.2 | 7.0.2 | current | https://registry.npmjs.org/%40typescript%2Ftypescript-linux-ppc64 |
| @typescript/typescript-linux-riscv64 | node_modules/@typescript/typescript-linux-riscv64 | 7.0.2 | 7.0.2 | 7.0.2 | current | https://registry.npmjs.org/%40typescript%2Ftypescript-linux-riscv64 |
| @typescript/typescript-linux-s390x | node_modules/@typescript/typescript-linux-s390x | 7.0.2 | 7.0.2 | 7.0.2 | current | https://registry.npmjs.org/%40typescript%2Ftypescript-linux-s390x |
| @typescript/typescript-linux-x64 | node_modules/@typescript/typescript-linux-x64 | 7.0.2 | 7.0.2 | 7.0.2 | current | https://registry.npmjs.org/%40typescript%2Ftypescript-linux-x64 |
| @typescript/typescript-netbsd-arm64 | node_modules/@typescript/typescript-netbsd-arm64 | 7.0.2 | 7.0.2 | 7.0.2 | current | https://registry.npmjs.org/%40typescript%2Ftypescript-netbsd-arm64 |
| @typescript/typescript-netbsd-x64 | node_modules/@typescript/typescript-netbsd-x64 | 7.0.2 | 7.0.2 | 7.0.2 | current | https://registry.npmjs.org/%40typescript%2Ftypescript-netbsd-x64 |
| @typescript/typescript-openbsd-arm64 | node_modules/@typescript/typescript-openbsd-arm64 | 7.0.2 | 7.0.2 | 7.0.2 | current | https://registry.npmjs.org/%40typescript%2Ftypescript-openbsd-arm64 |
| @typescript/typescript-openbsd-x64 | node_modules/@typescript/typescript-openbsd-x64 | 7.0.2 | 7.0.2 | 7.0.2 | current | https://registry.npmjs.org/%40typescript%2Ftypescript-openbsd-x64 |
| @typescript/typescript-sunos-x64 | node_modules/@typescript/typescript-sunos-x64 | 7.0.2 | 7.0.2 | 7.0.2 | current | https://registry.npmjs.org/%40typescript%2Ftypescript-sunos-x64 |
| @typescript/typescript-win32-arm64 | node_modules/@typescript/typescript-win32-arm64 | 7.0.2 | 7.0.2 | 7.0.2 | current | https://registry.npmjs.org/%40typescript%2Ftypescript-win32-arm64 |
| @typescript/typescript-win32-x64 | node_modules/@typescript/typescript-win32-x64 | 7.0.2 | 7.0.2 | 7.0.2 | current | https://registry.npmjs.org/%40typescript%2Ftypescript-win32-x64 |
| @vitejs/plugin-react | node_modules/@vitejs/plugin-react | 6.0.3 | 6.1.1 | 6.1.1 | minor update | https://registry.npmjs.org/%40vitejs%2Fplugin-react |
| acorn | node_modules/acorn | 8.18.0 | 8.18.0 | 8.18.0 | current | https://registry.npmjs.org/acorn |
| acorn-jsx | node_modules/acorn-jsx | 5.3.2 | 5.3.2 | 5.3.2 | current | https://registry.npmjs.org/acorn-jsx |
| ajv | node_modules/ajv | 6.15.0 | 8.20.0 | 8.20.0 | major update | https://registry.npmjs.org/ajv |
| balanced-match | node_modules/balanced-match | 4.0.4 | 4.0.4 | 4.0.4 | current | https://registry.npmjs.org/balanced-match |
| baseline-browser-mapping | node_modules/baseline-browser-mapping | 2.11.19 | 2.11.25 | 2.11.25 | patch update | https://registry.npmjs.org/baseline-browser-mapping |
| brace-expansion | node_modules/brace-expansion | 5.0.9 | 5.0.12 | 5.0.12 | patch update | https://registry.npmjs.org/brace-expansion |
| browserslist | node_modules/browserslist | 4.28.8 | 4.29.0 | 4.29.0 | minor update | https://registry.npmjs.org/browserslist |
| caniuse-lite | node_modules/caniuse-lite | 1.0.30001810 | 1.0.30001810 | 1.0.30001810 | current | https://registry.npmjs.org/caniuse-lite |
| convert-source-map | node_modules/convert-source-map | 2.0.0 | 2.0.0 | 2.0.0 | current | https://registry.npmjs.org/convert-source-map |
| cookie | node_modules/cookie | 1.1.1 | 2.0.1 | 2.0.1 | major update | https://registry.npmjs.org/cookie |
| cross-spawn | node_modules/cross-spawn | 7.0.6 | 7.0.6 | 7.0.6 | current | https://registry.npmjs.org/cross-spawn |
| csstype | node_modules/csstype | 3.2.3 | 3.2.3 | 3.2.3 | current | https://registry.npmjs.org/csstype |
| debug | node_modules/debug | 4.4.3 | 4.4.3 | 4.4.3 | current | https://registry.npmjs.org/debug |
| deep-is | node_modules/deep-is | 0.1.4 | 0.1.4 | 0.1.4 | current | https://registry.npmjs.org/deep-is |
| detect-libc | node_modules/detect-libc | 2.1.2 | 2.1.2 | 2.1.2 | current | https://registry.npmjs.org/detect-libc |
| electron-to-chromium | node_modules/electron-to-chromium | 1.5.415 | 1.5.433 | 1.5.433 | patch update | https://registry.npmjs.org/electron-to-chromium |
| empathic | node_modules/empathic | 2.0.1 | 2.1.0 | 2.1.0 | minor update | https://registry.npmjs.org/empathic |
| enhanced-resolve | node_modules/enhanced-resolve | 5.24.5 | 5.25.1 | 5.25.1 | minor update | https://registry.npmjs.org/enhanced-resolve |
| esbuild | node_modules/esbuild | 0.28.2 | 0.28.2 | 0.28.2 | current | https://registry.npmjs.org/esbuild |
| escalade | node_modules/escalade | 3.2.0 | 3.2.0 | 3.2.0 | current | https://registry.npmjs.org/escalade |
| escape-string-regexp | node_modules/escape-string-regexp | 4.0.0 | 5.0.0 | 5.0.0 | major update | https://registry.npmjs.org/escape-string-regexp |
| eslint | node_modules/eslint | 10.9.1 | 10.11.0 | 10.11.0 | minor update | https://registry.npmjs.org/eslint |
| eslint-scope | node_modules/eslint-scope | 9.1.2 | 9.1.2 | 9.1.2 | current | https://registry.npmjs.org/eslint-scope |
| eslint-visitor-keys | node_modules/@eslint-community/eslint-utils/node_modules/eslint-visitor-keys | 3.4.3 | 5.0.1 | 5.0.1 | major update | https://registry.npmjs.org/eslint-visitor-keys |
| eslint-visitor-keys | node_modules/eslint-visitor-keys | 5.0.1 | 5.0.1 | 5.0.1 | current | https://registry.npmjs.org/eslint-visitor-keys |
| espree | node_modules/espree | 11.2.0 | 11.2.0 | 11.2.0 | current | https://registry.npmjs.org/espree |
| esquery | node_modules/esquery | 1.7.0 | 1.7.0 | 1.7.0 | current | https://registry.npmjs.org/esquery |
| esrecurse | node_modules/esrecurse | 4.3.0 | 4.3.0 | 4.3.0 | current | https://registry.npmjs.org/esrecurse |
| estraverse | node_modules/estraverse | 5.3.0 | 5.3.0 | 5.3.0 | current | https://registry.npmjs.org/estraverse |
| esutils | node_modules/esutils | 2.0.3 | 2.0.3 | 2.0.3 | current | https://registry.npmjs.org/esutils |
| fast-deep-equal | node_modules/fast-deep-equal | 3.1.3 | 3.1.3 | 3.1.3 | current | https://registry.npmjs.org/fast-deep-equal |
| fast-json-stable-stringify | node_modules/fast-json-stable-stringify | 2.1.0 | 2.1.0 | 2.1.0 | current | https://registry.npmjs.org/fast-json-stable-stringify |
| fast-levenshtein | node_modules/fast-levenshtein | 2.0.6 | 3.0.0 | 3.0.0 | major update | https://registry.npmjs.org/fast-levenshtein |
| fdir | node_modules/fdir | 6.5.0 | 6.5.0 | 6.5.0 | current | https://registry.npmjs.org/fdir |
| file-entry-cache | node_modules/file-entry-cache | 8.0.0 | 11.1.5 | 11.1.5 | major update | https://registry.npmjs.org/file-entry-cache |
| find-up | node_modules/find-up | 5.0.0 | 8.0.0 | 8.0.0 | major update | https://registry.npmjs.org/find-up |
| flat-cache | node_modules/flat-cache | 4.0.1 | 6.1.23 | 6.1.23 | major update | https://registry.npmjs.org/flat-cache |
| flatted | node_modules/flatted | 3.4.4 | 3.4.4 | 3.4.4 | current | https://registry.npmjs.org/flatted |
| fsevents | node_modules/fsevents | 2.3.3 | 2.3.3 | 2.3.3 | current | https://registry.npmjs.org/fsevents |
| fsevents | node_modules/playwright/node_modules/fsevents | 2.3.2 | 2.3.3 | 2.3.3 | patch update | https://registry.npmjs.org/fsevents |
| gensync | node_modules/gensync | 1.0.0-beta.2 | 0.1.0 | 1.0.0-beta.2 | prerelease in use; review parent dependency before changing | https://registry.npmjs.org/gensync |
| glob-parent | node_modules/glob-parent | 6.0.2 | 6.0.2 | 6.0.2 | current | https://registry.npmjs.org/glob-parent |
| graceful-fs | node_modules/graceful-fs | 4.2.11 | 4.2.11 | 4.2.11 | current | https://registry.npmjs.org/graceful-fs |
| ignore | node_modules/ignore | 5.3.2 | 7.0.9 | 7.0.9 | major update | https://registry.npmjs.org/ignore |
| import-meta-resolve | node_modules/import-meta-resolve | 4.2.0 | 4.2.0 | 4.2.0 | current | https://registry.npmjs.org/import-meta-resolve |
| imurmurhash | node_modules/imurmurhash | 0.1.4 | 0.1.4 | 0.1.4 | current | https://registry.npmjs.org/imurmurhash |
| is-extglob | node_modules/is-extglob | 2.1.1 | 2.1.1 | 2.1.1 | current | https://registry.npmjs.org/is-extglob |
| is-glob | node_modules/is-glob | 4.0.3 | 4.0.3 | 4.0.3 | current | https://registry.npmjs.org/is-glob |
| isexe | node_modules/isexe | 2.0.0 | 4.0.0 | 4.0.0 | major update | https://registry.npmjs.org/isexe |
| jiti | node_modules/jiti | 2.7.0 | 2.7.0 | 2.7.0 | current | https://registry.npmjs.org/jiti |
| js-tokens | node_modules/js-tokens | 10.0.0 | 10.0.0 | 10.0.0 | current | https://registry.npmjs.org/js-tokens |
| jsesc | node_modules/jsesc | 3.1.0 | 3.1.0 | 3.1.0 | current | https://registry.npmjs.org/jsesc |
| json-buffer | node_modules/json-buffer | 3.0.1 | 3.0.1 | 3.0.1 | current | https://registry.npmjs.org/json-buffer |
| json-schema-traverse | node_modules/json-schema-traverse | 0.4.1 | 1.0.0 | 1.0.0 | major update | https://registry.npmjs.org/json-schema-traverse |
| json-stable-stringify-without-jsonify | node_modules/json-stable-stringify-without-jsonify | 1.0.1 | 1.0.1 | 1.0.1 | current | https://registry.npmjs.org/json-stable-stringify-without-jsonify |
| json5 | node_modules/json5 | 2.2.3 | 2.2.3 | 2.2.3 | current | https://registry.npmjs.org/json5 |
| keyv | node_modules/keyv | 4.5.4 | 5.6.0 | 5.6.0 | major update | https://registry.npmjs.org/keyv |
| levn | node_modules/levn | 0.4.1 | 0.4.1 | 0.4.1 | current | https://registry.npmjs.org/levn |
| lightningcss | node_modules/lightningcss | 1.32.0 | 1.33.0 | 1.33.0 | minor update | https://registry.npmjs.org/lightningcss |
| lightningcss-android-arm64 | node_modules/lightningcss-android-arm64 | 1.32.0 | 1.33.0 | 1.33.0 | minor update | https://registry.npmjs.org/lightningcss-android-arm64 |
| lightningcss-darwin-arm64 | node_modules/lightningcss-darwin-arm64 | 1.32.0 | 1.33.0 | 1.33.0 | minor update | https://registry.npmjs.org/lightningcss-darwin-arm64 |
| lightningcss-darwin-x64 | node_modules/lightningcss-darwin-x64 | 1.32.0 | 1.33.0 | 1.33.0 | minor update | https://registry.npmjs.org/lightningcss-darwin-x64 |
| lightningcss-freebsd-x64 | node_modules/lightningcss-freebsd-x64 | 1.32.0 | 1.33.0 | 1.33.0 | minor update | https://registry.npmjs.org/lightningcss-freebsd-x64 |
| lightningcss-linux-arm-gnueabihf | node_modules/lightningcss-linux-arm-gnueabihf | 1.32.0 | 1.33.0 | 1.33.0 | minor update | https://registry.npmjs.org/lightningcss-linux-arm-gnueabihf |
| lightningcss-linux-arm64-gnu | node_modules/lightningcss-linux-arm64-gnu | 1.32.0 | 1.33.0 | 1.33.0 | minor update | https://registry.npmjs.org/lightningcss-linux-arm64-gnu |
| lightningcss-linux-arm64-musl | node_modules/lightningcss-linux-arm64-musl | 1.32.0 | 1.33.0 | 1.33.0 | minor update | https://registry.npmjs.org/lightningcss-linux-arm64-musl |
| lightningcss-linux-x64-gnu | node_modules/lightningcss-linux-x64-gnu | 1.32.0 | 1.33.0 | 1.33.0 | minor update | https://registry.npmjs.org/lightningcss-linux-x64-gnu |
| lightningcss-linux-x64-musl | node_modules/lightningcss-linux-x64-musl | 1.32.0 | 1.33.0 | 1.33.0 | minor update | https://registry.npmjs.org/lightningcss-linux-x64-musl |
| lightningcss-win32-arm64-msvc | node_modules/lightningcss-win32-arm64-msvc | 1.32.0 | 1.33.0 | 1.33.0 | minor update | https://registry.npmjs.org/lightningcss-win32-arm64-msvc |
| lightningcss-win32-x64-msvc | node_modules/lightningcss-win32-x64-msvc | 1.32.0 | 1.33.0 | 1.33.0 | minor update | https://registry.npmjs.org/lightningcss-win32-x64-msvc |
| locate-path | node_modules/locate-path | 6.0.0 | 8.0.0 | 8.0.0 | major update | https://registry.npmjs.org/locate-path |
| lru-cache | node_modules/lru-cache | 11.5.2 | 11.5.3 | 11.5.3 | patch update | https://registry.npmjs.org/lru-cache |
| magic-string | node_modules/magic-string | 0.30.21 | 1.4.1 | 1.4.1 | major update | https://registry.npmjs.org/magic-string |
| minimatch | node_modules/minimatch | 10.2.6 | 10.2.6 | 10.2.6 | current | https://registry.npmjs.org/minimatch |
| ms | node_modules/ms | 2.1.3 | 2.1.3 | 2.1.3 | current | https://registry.npmjs.org/ms |
| nanoid | node_modules/nanoid | 3.3.15 | 6.0.1 | 6.0.1 | major update | https://registry.npmjs.org/nanoid |
| natural-compare | node_modules/natural-compare | 1.4.0 | 1.4.0 | 1.4.0 | current | https://registry.npmjs.org/natural-compare |
| node-releases | node_modules/node-releases | 2.0.54 | 2.0.56 | 2.0.56 | patch update | https://registry.npmjs.org/node-releases |
| obug | node_modules/obug | 2.1.4 | 3.0.0 | 3.0.0 | major update | https://registry.npmjs.org/obug |
| optionator | node_modules/optionator | 0.9.4 | 0.9.4 | 0.9.4 | current | https://registry.npmjs.org/optionator |
| p-limit | node_modules/p-limit | 3.1.0 | 7.3.3 | 7.3.3 | major update | https://registry.npmjs.org/p-limit |
| p-locate | node_modules/p-locate | 5.0.0 | 7.0.0 | 7.0.0 | major update | https://registry.npmjs.org/p-locate |
| path-exists | node_modules/path-exists | 4.0.0 | 5.0.0 | 5.0.0 | major update | https://registry.npmjs.org/path-exists |
| path-key | node_modules/path-key | 3.1.1 | 4.0.0 | 4.0.0 | major update | https://registry.npmjs.org/path-key |
| picocolors | node_modules/picocolors | 1.1.1 | 1.1.1 | 1.1.1 | current | https://registry.npmjs.org/picocolors |
| picomatch | node_modules/picomatch | 4.0.5 | 4.0.7 | 4.0.7 | patch update | https://registry.npmjs.org/picomatch |
| playwright | node_modules/playwright | 1.62.1 | 1.63.0 | 1.63.0 | minor update | https://registry.npmjs.org/playwright |
| playwright-core | node_modules/playwright-core | 1.62.1 | 1.63.0 | 1.63.0 | minor update | https://registry.npmjs.org/playwright-core |
| postcss | node_modules/postcss | 8.5.19 | 8.5.28 | 8.5.28 | patch update | https://registry.npmjs.org/postcss |
| prelude-ls | node_modules/prelude-ls | 1.2.1 | 1.2.1 | 1.2.1 | current | https://registry.npmjs.org/prelude-ls |
| punycode | node_modules/punycode | 2.3.1 | 2.3.1 | 2.3.1 | current | https://registry.npmjs.org/punycode |
| react | node_modules/react | 19.2.7 | 19.3.0 | 19.3.0 | minor update | https://registry.npmjs.org/react |
| react-dom | node_modules/react-dom | 19.2.7 | 19.3.0 | 19.3.0 | minor update | https://registry.npmjs.org/react-dom |
| react-router | node_modules/react-router | 7.18.1 | 8.4.0 | 8.4.0 | major update | https://registry.npmjs.org/react-router |
| react-router-dom | node_modules/react-router-dom | 7.18.1 | 7.18.4 | 7.18.4 | patch update | https://registry.npmjs.org/react-router-dom |
| rolldown | node_modules/rolldown | 1.1.5 | 1.2.9 | 1.2.9 | minor update | https://registry.npmjs.org/rolldown |
| scheduler | node_modules/scheduler | 0.27.0 | 0.28.0 | 0.28.0 | minor update | https://registry.npmjs.org/scheduler |
| semver | node_modules/semver | 7.8.5 | 7.8.5 | 7.8.5 | current | https://registry.npmjs.org/semver |
| set-cookie-parser | node_modules/set-cookie-parser | 2.7.2 | 3.1.2 | 3.1.2 | major update | https://registry.npmjs.org/set-cookie-parser |
| shebang-command | node_modules/shebang-command | 2.0.0 | 2.0.0 | 2.0.0 | current | https://registry.npmjs.org/shebang-command |
| shebang-regex | node_modules/shebang-regex | 3.0.0 | 4.0.0 | 4.0.0 | major update | https://registry.npmjs.org/shebang-regex |
| source-map-js | node_modules/source-map-js | 1.2.1 | 1.2.1 | 1.2.1 | current | https://registry.npmjs.org/source-map-js |
| tailwindcss | node_modules/tailwindcss | 4.3.3 | 4.3.3 | 4.3.3 | current | https://registry.npmjs.org/tailwindcss |
| tapable | node_modules/tapable | 2.3.3 | 2.3.3 | 2.3.3 | current | https://registry.npmjs.org/tapable |
| tinyglobby | node_modules/tinyglobby | 0.2.17 | 0.2.17 | 0.2.17 | current | https://registry.npmjs.org/tinyglobby |
| tslib | node_modules/@tailwindcss/oxide-wasm32-wasi/node_modules/tslib | 2.8.1 | 2.8.1 | 2.8.1 | current | https://registry.npmjs.org/tslib |
| tslib | node_modules/tslib | 2.8.1 | 2.8.1 | 2.8.1 | current | https://registry.npmjs.org/tslib |
| tsx | node_modules/tsx | 4.23.12 | 4.23.13 | 4.23.13 | patch update | https://registry.npmjs.org/tsx |
| type-check | node_modules/type-check | 0.4.0 | 0.4.0 | 0.4.0 | current | https://registry.npmjs.org/type-check |
| typescript | node_modules/typescript | 7.0.2 | 7.0.2 | 7.0.2 | current | https://registry.npmjs.org/typescript |
| update-browserslist-db | node_modules/update-browserslist-db | 1.3.1 | 1.3.3 | 1.3.3 | patch update | https://registry.npmjs.org/update-browserslist-db |
| uri-js | node_modules/uri-js | 4.4.1 | 4.4.1 | 4.4.1 | current | https://registry.npmjs.org/uri-js |
| vite | node_modules/vite | 8.1.4 | 8.3.0 | 8.3.0 | minor update | https://registry.npmjs.org/vite |
| which | node_modules/which | 2.0.2 | 7.0.0 | 7.0.0 | major update | https://registry.npmjs.org/which |
| word-wrap | node_modules/word-wrap | 1.2.5 | 1.2.5 | 1.2.5 | current | https://registry.npmjs.org/word-wrap |
| yocto-queue | node_modules/yocto-queue | 0.1.0 | 1.2.2 | 1.2.2 | major update | https://registry.npmjs.org/yocto-queue |

## Lookup failures

None.

See docs/reviews/technology-inventory.md in the repository for languages, service interfaces, formats, host observations, and the update/release plan.
