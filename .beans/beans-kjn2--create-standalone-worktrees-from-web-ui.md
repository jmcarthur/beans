---
# beans-kjn2
title: Create standalone worktrees from web UI
status: completed
type: feature
priority: normal
created_at: 2026-03-11T21:48:26Z
updated_at: 2026-03-11T21:59:46Z
---

Allow creating new worktrees from the beans-serve web UI that aren't attached to a specific bean. Currently worktrees are created via the startWork mutation which requires a beanId. This feature adds the ability to create ad-hoc worktrees for exploratory work, prototyping, or tasks that don't have a corresponding bean.


## Plan

The current architecture tightly couples worktrees to beans — every worktree requires a beanId. We need to decouple this so worktrees can exist independently.

### Approach

Introduce a `createWorktree(name: String!): Worktree!` GraphQL mutation that creates a worktree with a user-provided name (not tied to a bean). The worktree manager already creates directories under `.beans/.worktrees/<id>` and git branches `beans/<id>` — we'll reuse this with a generated ID but allow a human-readable name.

Key changes:
1. **Worktree model**: Add an optional `name` field; make `beanId` optional
2. **GraphQL schema**: Add `createWorktree(name: String!)` mutation and `name` field on `Worktree` type
3. **Worktree manager**: Support creating worktrees with a generated ID + name instead of beanId
4. **Resolvers**: Implement the new mutation
5. **Frontend**: Add UI in sidebar to create standalone worktrees (e.g., a "+" button)

### Tasks

- [ ] Add `name` field to Worktree model and make `beanId` optional
- [ ] Add `createWorktree(name: String!): Worktree!` mutation to GraphQL schema
- [ ] Update worktree manager to support standalone worktrees
- [ ] Implement resolver for `createWorktree`
- [ ] Run codegen (`mise codegen`)
- [ ] Add frontend UI for creating standalone worktrees
- [ ] Update sidebar to display standalone worktrees
- [ ] Write/update tests
- [ ] Verify build and e2e tests pass
