---
# beans-iji0
title: Client-side text filter for backlog and board views
status: todo
type: feature
priority: normal
created_at: 2026-03-10T09:03:09Z
updated_at: 2026-03-10T09:04:15Z
---

Add a text input at the top of both the backlog and board panes that filters the visible beans client-side as the user types.

## Design

- Single shared filter string in `uiState.svelte.ts` (persisted to localStorage so it survives view toggles)
- Filter input component rendered above the bean list in both backlog and board views
- Matching: case-insensitive substring match against bean title, type, status, tags, and ID
- In backlog view: a top-level bean is shown if it OR any of its children match; matching children are shown, non-matching children are hidden
- In board view: filter each column's beans individually
- Clear button (×) inside the input to quickly reset the filter
- Keyboard shortcut: Cmd/Ctrl+F to focus the filter input (with preventDefault to avoid browser find)

## Tasks

- [ ] Add `filterText` state to `uiState.svelte.ts`
- [ ] Create a `FilterInput.svelte` component (text input with clear button)
- [ ] Implement `matchesFilter(bean, text)` utility function
- [ ] Integrate filter into backlog view in `+page.svelte` (filter `topLevelBeans` with recursive child matching)
- [ ] Integrate filter into `BoardView.svelte` (filter `beansForStatus`)
- [ ] Add Cmd/Ctrl+F keyboard shortcut to focus filter
- [ ] Write e2e tests for filtering in both views
