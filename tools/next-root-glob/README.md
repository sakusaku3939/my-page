# Next.js root-directory glob adapter

`eslint-config-next@16.2.11` installs `@next/eslint-plugin-next`, whose only
`fast-glob` call is `globSync(rootDir, { onlyDirectories: true })` in
`dist/utils/get-root-dirs.js`. Its `fast-glob → micromatch → braces` chain is
affected by [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm),
with no upstream patched release available when this adapter was added.

This small, private package replaces that call through a **scoped npm override**.
It delegates matching to pinned `tinyglobby@0.2.17` and deliberately supports
only literal directories or a single terminal `/*` / `/**` with a literal prefix
(including standalone `*` and `**`). The app currently uses Next's default cwd,
so it does not need a custom rootDir pattern. Arrays of supported patterns are
handled by Next itself.

Reserved glob metacharacters (`! ? { } [ ] ( )` and escapes), brace expansion,
extglobs, character classes, and dynamic middle segments throw a clear error instead of approximating another glob dialect and
silently disabling page discovery. If this app later needs those patterns, extend
and test the contract or remove the override after an upstream fix.

Literal directories do not expand, absolute paths stay absolute, a terminal
`/**` excludes its base, and directory symlinks are included without changing
the crawler's cycle protection. Returned roots are equivalent filesystem paths;
spelling/order is not promised to match fast-glob. Unsupported API/options fail
explicitly. This is **not** a full fast-glob implementation or an alias claiming
to be an upstream security release.

The direct `fast-glob: file:tools/next-root-glob` dev dependency exists so npm can
resolve the scoped `$fast-glob` override to a portable local package. Other
packages are not overridden. Do not use it as a general glob library.

`tests/dependency-compatibility.test.ts` exercises the installed plugin's resolver
and confirms that `no-html-link-for-pages` still finds routes and reports an
invalid anchor, as well as supported literal/simple globstar, absolute-path, hidden-literal and symlink
behavior, plus explicit rejection of unsupported advanced patterns. Run `npm test` after any change.

Before updating eslint-config-next, check every fast-glob usage in the new
plugin and extend this adapter/test contract if needed. Remove this package,
its direct dev dependency, and the scoped override once the plugin ships a
non-vulnerable upstream glob dependency; regenerate the lock and rerun the tests,
lint, type-check and production build.

The separate `js-yaml@3.15.2 → argparse@2.0.1` override removes `sprintf-js`
([GHSA-hp3w-g68c-fv3c](https://github.com/advisories/GHSA-hp3w-g68c-fv3c)).
Argparse 2 retains the legacy CLI API used by js-yaml 3, with deprecation warnings.
Compatibility tests cover that CLI and gray-matter parsing/stringifying. Keep
this override scoped to the legacy parser and remove it when gray-matter adopts
a compatible, safe upstream dependency chain. Do not override js-yaml to v4:
gray-matter 4 still requires the `safeLoad`/`safeDump` APIs removed there.

Known compatibility limit: argparse 2's deprecated constructor `version` option
exits successfully but prints an empty string for the nested js-yaml 3 CLI's
`--version`. Conversion, help, error statuses, and the library API used by this
site are covered. The project's installed `js-yaml` executable is the separate
v4 package and is unaffected. No site code invokes the nested CLI.
