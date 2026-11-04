# minimatch-v3-compat (development-only shim)

ESLint and several of its plugins (`@eslint/eslintrc`, `eslint-plugin-import`,
`eslint-plugin-react`, `eslint-plugin-jsx-a11y`, all pulled in by
`eslint-config-next`) still depend on `minimatch@^3`. Every minimatch release
below 11.0.1 is covered by
[GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249)
(globParts amplification), and no patched 3.x release exists.

minimatch 11 dropped the 3.x CommonJS shape (a callable module), so it cannot be
substituted directly. This shim exposes the 3.x API and delegates all matching to
the patched **minimatch 11.0.4**, which is installed at the project root
under the alias `minimatch-11` (`"minimatch-11": "npm:minimatch@11.0.4"` in
`devDependencies`). The shim itself has no dependencies.

- Wired in by `overrides` → `"minimatch@^3"` in the root `package.json`.
- Used only by development tooling (ESLint). It is not part of the website.
- Keeps 3.x's Windows behaviour: `\` in a pattern is a path separator.

**Remove** this folder, the `minimatch` and `minimatch-11` devDependencies and the override once those packages depend on
`minimatch >= 11.0.1`. Check with `npm view eslint-plugin-react dependencies.minimatch`
(and the same for the other packages above).
