---
# beans-ou9t
title: Move worktrees outside main repo to ~/.beans/worktrees/<project>/
status: completed
type: feature
priority: normal
created_at: 2026-03-15T17:48:28Z
updated_at: 2026-03-15T17:54:57Z
---

Move git worktree creation from <repo>/.beans/.worktrees/ to ~/.beans/worktrees/<project-name>/ to avoid confusion from nested repo state, accidental search hits, and tool confusion.

## Tasks
- [x] Add worktree Path config field and ResolveWorktreePath to config
- [x] Refactor Manager to use external worktreeRoot instead of beansDir
- [x] Update serve.go to compute and pass worktreeRoot
- [x] Remove .worktrees/ from generated .gitignore
- [x] Add startup warning for old .beans/.worktrees/ directory
- [x] Update tests

## Summary of Changes

- Added `worktree.path` config field to `WorktreeConfig` with `~` expansion support
- Added `ResolveWorktreePath(projectName)` method that defaults to `~/.beans/worktrees/<project>/`
- Refactored `worktree.Manager` to use `worktreeRoot` instead of deriving path from `beansDir`
- Updated `serve.go` to resolve the worktree root from config, create the directory, and log its location
- Added startup warning when old `.beans/.worktrees/` directory is detected
- Removed `.worktrees/` from generated `.gitignore` (no longer needed)
- Updated all tests to use a separate temp directory as worktreeRoot
- Updated CLAUDE.md to document the new architecture
