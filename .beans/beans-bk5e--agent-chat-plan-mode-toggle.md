---
# beans-bk5e
title: 'Agent chat: plan mode toggle'
status: completed
type: feature
priority: normal
created_at: 2026-03-09T17:50:42Z
updated_at: 2026-03-09T17:56:10Z
order: V0V
---

Allow switching between regular (default) and plan permission modes in the agent chat UI. Plan mode makes the agent read-only — it can explore and reason but not edit files. The toggle should be in the chat header/composer area. Switching modes requires killing and respawning the claude CLI process since --permission-mode is a startup arg.

## Summary of Changes

### Backend (Go)
- Added `PlanMode` field to `agent.Session` (types.go)
- `buildClaudeArgs` now passes `--permission-mode plan` when plan mode is enabled (claude.go)
- Added `SetPlanMode` method to `Manager` — toggles plan mode, kills running process, clears session ID so next message spawns fresh (manager.go)
- Added `setAgentPlanMode` GraphQL mutation and `planMode` field on `AgentSession` type (schema.graphqls)
- Implemented resolver and updated `agentSessionToModel` helper (schema.resolvers.go, agent_helpers.go)
- Added 6 new tests for SetPlanMode and buildClaudeArgs (manager_test.go)

### Frontend (Svelte)
- Added `planMode` to `AgentSession` interface and subscription query (agentChat.svelte.ts)
- Added `SET_AGENT_PLAN_MODE` mutation and `setPlanMode` method to `AgentChatStore`
- Added plan/full mode toggle button in AgentChat composer area (AgentChat.svelte)
