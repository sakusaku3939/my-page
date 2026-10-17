const fs = require("node:fs");
const path = require("node:path");
const picomatch = require("picomatch");
const { globSync: tinyGlobSync } = require("tinyglobby");

// This adapter is deliberately scoped to @next/eslint-plugin-next's rootDir
// resolver. It is not a general replacement for fast-glob's API.
exports.globSync = function globSync(pattern, options = {}) {
  if (typeof pattern !== "string" || !pattern || options.onlyDirectories !== true ||
      Object.keys(options).some(key => key !== "onlyDirectories" && key !== "cwd")) {
    throw new TypeError("next-root-glob only supports directory rootDir patterns");
  }

  const unsupported = () => new TypeError("Unsupported Next rootDir glob: use a literal directory or a single terminal /* or /**");
  // Validate syntax before any filesystem operation. Reserved glob metacharacters
  // are intentionally unsupported even if another matcher treats them literally.
  if (/[!?{}[\]()\\]/.test(pattern)) throw unsupported();
  if (!pattern.includes("*")) {
    try {
      return fs.statSync(path.resolve(options.cwd ?? process.cwd(), pattern)).isDirectory() ? [pattern] : [];
    } catch (error) {
      if (error.code === "ENOENT" || error.code === "ENOTDIR") return [];
      throw error;
    }
  }

  // Fail explicitly outside the tested contract. A partial glob-dialect match
  // could silently stop Next from discovering pages and weaken route linting.
  const normalizedPattern = pattern.replace(/\/$/, "");
  const suffix = normalizedPattern.match(/(?:^|\/)(\*{1,2})$/);
  const prefix = suffix ? normalizedPattern.slice(0, suffix.index) : "";
  if (!suffix || prefix.includes("*")) throw unsupported();

  // fast-glob walks below a terminal globstar, excluding the base directory.
  const descendantPattern = pattern.replace(/\/\*\*\/?$/, "/**/*");
  const cwd = options.cwd ?? process.cwd();
  const absolute = path.isAbsolute(pattern);
  const linkedDirectories = [];
  const matches = picomatch(path.posix.normalize(descendantPattern), { posix: true });
  const directories = tinyGlobSync(descendantPattern, {
    ...options,
    absolute,
    expandDirectories: false,
    fs: {
      // fdir follows directory symlinks but omits the link itself. Observe links
      // without changing traversal or its cycle protection, then add matches.
      readdirSync(directory, readOptions) {
        const entries = fs.readdirSync(directory, readOptions);
        for (const entry of entries) {
          if (typeof entry.isSymbolicLink !== "function" || !entry.isSymbolicLink()) continue;
          const fullPath = path.resolve(directory, entry.name);
          const candidate = (absolute ? fullPath : path.relative(cwd, fullPath)).split(path.sep).join("/");
          if (!matches(candidate) && !matches(`${candidate}/`)) continue;
          try {
            if (fs.statSync(fullPath).isDirectory()) linkedDirectories.push(candidate);
          } catch (error) {
            if (error.code !== "ENOENT" && error.code !== "ENOTDIR") throw error;
          }
        }
        return entries;
      },
    },
  });
  return [...new Set([...directories, ...linkedDirectories].map(directory =>
    directory === "/" ? directory : directory.replace(/\/$/, "")
  ))];
};
