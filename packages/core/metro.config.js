const path = require("path");
const { FileStore } = require("metro-cache");
const { getDefaultConfig } = require("expo/metro-config");

// Find the project and workspace directories
// eslint-disable-next-line no-undef
const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "../../node_modules/.pnpm");

const config = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo
config.watchFolders = [monorepoRoot];

// 2. Enable symlinks to support pnpm monorepo
config.resolver.unstable_enableSymlinks = true;

// 3. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(monorepoRoot, "node_modules"),
];

// Use monorepo to restore the cache when possible
config.cacheStores = [
  new FileStore({
    root: path.join(projectRoot, "node_modules", ".cache", "metro"),
  }),
];

module.exports = config;
