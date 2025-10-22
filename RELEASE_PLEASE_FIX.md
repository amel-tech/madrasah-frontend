# Release-Please Fix Documentation

## Problem Statement

After PR #93 was merged on October 22, 2025, the release-please workflow ran successfully but **did not create any new release PRs**.

## Root Cause Analysis

### What Happened

PR #93 made changes only to `shared/services/package.json`:
- Changed prebuild script from `npm run generate` to `echo 'All pre-generated.'`
- Changed build script to simpler version

### Why No Release PR Was Created

The release-please workflow logs showed:
```
✔ No commits for path: apps/keycloak-theme, skipping
✔ No commits for path: apps/tedris, skipping
✔ No commits for path: apps/nizam, skipping
✔ No commits for path: apps/nazir, skipping
```

**Root Cause**: The `shared/services` directory was NOT configured as a tracked package in `release-please-config.json`. Only the `apps/*` directories were tracked for releases.

### How Release-Please Works

Release-please uses a path-based strategy for monorepos:
1. It tracks specific paths configured in `release-please-config.json`
2. When commits are made, it determines which packages changed based on file paths
3. It creates release PRs only for packages that have changes in their tracked paths

### The Missing Configuration

The original configuration only tracked these paths:
- `apps/keycloak-theme`
- `apps/tedris`
- `apps/nizam`
- `apps/nazir`

The `shared/services` directory was referenced in `extra-files` for each app, but:
- **`extra-files`** only updates version references in those files during a release
- **`extra-files` does NOT trigger releases** when those files change

### Why This Matters

The repository structure includes shared packages that apps depend on:
- `@madrasah/services` (used by tedris-web and nizam-web)
- `@madrasah/icons`
- `@madrasah/tokens`
- `@madrasah/mocks`

When these shared packages change, the apps that depend on them should get new releases, but without tracking these packages, release-please couldn't detect the changes.

## The Solution

### Changes Made

1. **Updated `release-please-config.json`**: Added four shared packages to the tracked packages:
   - `shared/services` → `@madrasah/services`
   - `shared/icons` → `@madrasah/icons`
   - `shared/tokens` → `@madrasah/tokens`
   - `shared/mocks` → `@madrasah/mocks`

2. **Updated `.release-please-manifest.json`**: Added initial version numbers for the shared packages:
   - `shared/services`: 0.1.0
   - `shared/icons`: 1.0.0
   - `shared/tokens`: 1.0.0
   - `shared/mocks`: 1.0.0

### How It Works Now

With the fix in place:

1. **When a shared package changes**: Release-please will detect changes and create a release PR for that shared package
2. **When apps need updates**: If the shared package version changes, apps that depend on it will need manual version bumps or can use workspace protocol to automatically use the latest version
3. **Separate release PRs**: Each package (shared or app) gets its own release PR due to `"separate-pull-requests": true`

### Example: PR #93 Scenario

With the new configuration, PR #93 would have resulted in:
1. Release-please detects changes to `shared/services/package.json`
2. Creates a release PR for `@madrasah/services` (e.g., version 0.1.0 → 0.1.1)
3. When that release PR is merged, it creates a GitHub release for `services-v0.1.1`
4. Apps depending on `@madrasah/services` can then be updated (either manually or in their next changes)

## Best Practices Going Forward

### Commit Message Scopes

Use conventional commit scopes to clearly indicate which package is affected:

```bash
# For shared packages
fix(services): disabled build script for @madrasah/services
feat(icons): add new icon components
chore(tokens): update color tokens

# For apps
fix(tedris-web): update user authentication flow
feat(nizam-web): add new dashboard feature
```

### When to Expect Release PRs

Release PRs will now be created when:
- ✅ Changes are made to any `apps/*` directory
- ✅ Changes are made to any tracked `shared/*` directory (services, icons, tokens, mocks)
- ❌ Changes are made only to untracked shared directories (hooks, ui, utils, types with version 0.0.0)

### Versioning Strategy

The shared packages that are now tracked have semantic versions:
- `@madrasah/services`: 0.1.0 (will use 0.x.x versioning until stable)
- `@madrasah/icons`: 1.0.0 (stable)
- `@madrasah/tokens`: 1.0.0 (stable)
- `@madrasah/mocks`: 1.0.0 (stable)

Packages with version 0.0.0 (hooks, ui, utils, types) are internal workspace dependencies and don't need separate releases.

## Testing the Fix

To verify the fix works:

1. Make a change to any file in `shared/services/` with a conventional commit message
2. Merge to main branch
3. The release-please workflow should create a new release PR for `@madrasah/services`

## Additional Notes

### Why Not Track All Shared Packages?

We only track shared packages that:
1. Have actual version numbers (not 0.0.0)
2. Are published or distributed separately
3. Are not marked as `private: true`

The packages with version 0.0.0 (`@madrasah/hooks`, `@madrasah/ui`, `@madrasah/utils`, `@madrasah/types`) are internal workspace dependencies that don't need independent releases.

### Alternative Approaches Considered

1. **Include all shared changes in all app releases**: Too complex, would create unnecessary releases
2. **Manual triggering**: Not sustainable for automated workflows
3. **Track shared as a single package**: Doesn't reflect the actual package structure
4. **Use monorepo-wide versioning**: Loses granular control over individual packages

The chosen solution (tracking shared packages independently) is the standard approach for monorepo release management with release-please.

## Related Documentation

- [Release Please Documentation](https://github.com/googleapis/release-please)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Monorepo Release Strategies](https://github.com/googleapis/release-please#monorepo-support)
