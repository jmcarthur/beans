---
# beans-0bb3
title: Archive All button in Board view Completed column
status: completed
type: feature
priority: normal
created_at: 2026-03-11T21:30:38Z
updated_at: 2026-03-11T21:35:26Z
---

Add an 'archive all' button in the Board view's Completed column header, next to the bean counter and the Completed badge. Clicking it should show a confirmation modal (using ConfirmModal), and on confirm, archive all completed beans (via GraphQL mutation). This is distinct from beans-ntus which is about archiving individual beans.

## Summary of Changes

Added an "archive all" button to the Board view's Completed column header:

- Button appears next to the bean count when there are completed beans
- Uses the existing archive icon (uil--archive)
- Clicking shows a ConfirmModal asking to confirm archiving all completed beans
- On confirm, archives each completed bean via the existing archiveBean GraphQL mutation
- Cancel dismisses the modal without changes
- Added e2e tests covering: button visibility, archive all flow, and cancel behavior
