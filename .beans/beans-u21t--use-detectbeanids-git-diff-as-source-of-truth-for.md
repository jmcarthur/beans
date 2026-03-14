---
# beans-u21t
title: Use DetectBeanIDs (git diff) as source of truth for worktree bean association in UI
status: completed
type: task
priority: normal
created_at: 2026-03-14T17:11:11Z
updated_at: 2026-03-14T18:06:34Z
---

Replace the file-watcher-based worktreeLinks mechanism (System A) with the git-diff-based DetectBeanIDs mechanism (System B) for determining which beans belong to which worktree in the frontend UI.

## Tasks
- [x] Add beans field to worktree subscription in worktrees.svelte.ts
- [x] Update Sidebar.svelte to use worktree bean IDs instead of filtering by bean.worktreeId
- [x] Update BeanPane.svelte and BeanCard.svelte to derive worktree association from worktree store
- [x] Run tests and build to verify

## Summary of Changes

Switched the frontend from using `bean.worktreeId` (populated by the file-watcher-based `worktreeLinks` mechanism) to using `Worktree.beans` (populated by `DetectBeanIDs()` via git diff) as the source of truth for which beans belong to which worktree.

### Files changed:
- `frontend/src/lib/worktrees.svelte.ts` — Added `beans { id }` to subscription, `beanIds` to `Worktree` interface, `worktreeForBean()` helper
- `frontend/src/lib/beans.svelte.ts` — Removed `worktreeId` from `Bean` interface and GraphQL query
- `frontend/src/lib/components/Sidebar.svelte` — Uses worktree `beanIds` to look up beans instead of filtering by `bean.worktreeId`
- `frontend/src/lib/components/BeanCard.svelte` — Uses `worktreeStore.worktreeForBean()` instead of `bean.worktreeId`
- `frontend/src/lib/components/BeanPane.svelte` — Uses `worktreeStore.worktreeForBean()` instead of `bean.worktreeId`
