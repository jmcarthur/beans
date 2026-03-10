---
# beans-58sx
title: Dark theme with automatic system preference detection
status: completed
type: feature
priority: normal
created_at: 2026-03-09T14:06:45Z
updated_at: 2026-03-09T17:01:28Z
order: Vw
---

Implement dark mode that switches automatically based on prefers-color-scheme. Define dark variants for all semantic color tokens and fix hardcoded colors in components.

## Summary of Changes

Implemented automatic dark/light theme switching based on `prefers-color-scheme` system preference.

### Changes:
- **layout.css**: Restructured color tokens to use CSS custom properties on `:root` with dark mode overrides via `@media (prefers-color-scheme: dark)`. Used `@theme inline` to bridge CSS variables into Tailwind utilities. Added `color-scheme: light dark` for proper browser widget styling.
- **BeanDetail.svelte**: Added `dark:` variants to type badge and border colors. Replaced hardcoded hex colors in `<style>` block (markdown headings, inline code bg) with CSS custom properties.
- **BoardView.svelte**: Added `dark:` variants to type badge and border colors.
- **BeanItem.svelte**: Added `dark:` variants to type border colors.
