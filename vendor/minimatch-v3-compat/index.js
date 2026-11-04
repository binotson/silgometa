"use strict";

/**
 * minimatch 3.x API on top of the patched minimatch 11.0.4.
 *
 * Why: ESLint, @eslint/eslintrc, eslint-plugin-import, eslint-plugin-react and
 * eslint-plugin-jsx-a11y still depend on minimatch ^3, and every minimatch
 * release below 11.0.1 is covered by GHSA-g3hv-75wg-m249 (globParts
 * amplification). No patched 3.x exists, and 11.x dropped the 3.x CommonJS
 * shape these packages rely on: `require("minimatch")` returning a callable
 * function that also carries `.Minimatch`, `.filter`, `.makeRe`, etc.
 *
 * This module restores that shape and delegates all matching to 11.0.4.
 * It is wired in through `overrides` in the root package.json for
 * `minimatch@^3` only, and is used by development tooling (ESLint) only.
 *
 * Behaviour kept from 3.x: on Windows, a backslash in a pattern is a path
 * separator rather than an escape character (3.x converted `\` to `/`).
 *
 * Remove this shim (and the override) once those packages depend on
 * minimatch >= 11.0.1.
 */

// The patched minimatch 11.0.4, installed at the project root under the alias
// "minimatch-11" (see devDependencies). The shim has no dependencies of its
// own, so npm 12 (allow-remote=none) can install it with `npm ci`.
const mm = require("minimatch-11");

const isWindows = process.platform === "win32";

/** 3.x treated backslashes in patterns as path separators on Windows. */
const withDefaults = (options) =>
  isWindows ? { windowsPathsNoEscape: true, ...(options || {}) } : options || {};

class Minimatch extends mm.Minimatch {
  constructor(pattern, options) {
    super(pattern, withDefaults(options));
  }
}

function minimatch(path, pattern, options) {
  return mm.minimatch(path, pattern, withDefaults(options));
}

minimatch.Minimatch = Minimatch;
minimatch.minimatch = minimatch;
minimatch.filter = (pattern, options) => mm.filter(pattern, withDefaults(options));
minimatch.makeRe = (pattern, options) => mm.makeRe(pattern, withDefaults(options));
minimatch.match = (list, pattern, options) => mm.match(list, pattern, withDefaults(options));
minimatch.braceExpand = (pattern, options) => mm.braceExpand(pattern, withDefaults(options));
minimatch.defaults = (def) => mm.defaults(withDefaults(def));
minimatch.escape = mm.escape;
minimatch.unescape = mm.unescape;
minimatch.GLOBSTAR = mm.GLOBSTAR;
minimatch.sep = mm.sep;

// Plain CommonJS export with no __esModule flag, exactly like 3.x, so
// Babel/TypeScript interop (`_interopRequireDefault(require("minimatch")).default`)
// and ESM `import minimatch from "minimatch"` both receive this function.
module.exports = minimatch;
