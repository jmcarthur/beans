import { test, expect } from './fixtures';

test.describe('Workspace creation', () => {
  test('clicking + creates a workspace and navigates to it', async ({ beans, page }) => {
    await page.goto(beans.baseURL + '/');

    // Wait for the Workspaces section to appear
    await expect(page.getByText('Workspaces')).toBeVisible({ timeout: 10_000 });

    // Click the "+" button to create a workspace
    await page.getByRole('button', { name: 'Create worktree' }).click();

    // Should navigate to a workspace URL
    await expect(page).toHaveURL(/\/workspace\/wt-/, { timeout: 10_000 });

    // The sidebar should show the new workspace as active (has font-medium class)
    const sidebar = page.locator('nav');
    const activeWorkspace = sidebar.locator('button.font-medium', {
      has: page.locator('span.truncate')
    });
    await expect(activeWorkspace).toBeVisible({ timeout: 5_000 });

    // The agent chat composer textarea should be focused
    const composer = page.locator('textarea[placeholder="Send a message..."]');
    await expect(composer).toBeFocused({ timeout: 5_000 });
  });
});
