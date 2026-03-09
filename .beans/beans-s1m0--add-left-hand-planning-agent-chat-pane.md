---
# beans-s1m0
title: Add left-hand planning agent chat pane
status: completed
type: feature
priority: normal
created_at: 2026-03-09T14:46:18Z
updated_at: 2026-03-09T14:47:37Z
---

Add a collapsible left-hand chat pane to the planning view (backlog + board modes) that connects to the central agent session (__central__), running in the main repo directory.

## Summary of Changes

Added a collapsible left-hand agent chat pane to the planning view:

- **uiState.svelte.ts**: Added `showPlanningChat` state + `togglePlanningChat()` method, persisted to localStorage
- **+layout.ts**: Loads `showPlanningChat` from localStorage on startup
- **+layout.svelte**: Initializes `showPlanningChat` from load data
- **+page.svelte**: Wraps existing layout in a second `SplitPane` (side=start) containing an `AgentChat` connected to the `__central__` session. Added a chat toggle button (speech bubble icon) in the toolbar.
