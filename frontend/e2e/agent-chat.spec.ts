import { test, expect } from './fixtures';
import { agentSession } from './agent-session';

test.describe('Agent chat', () => {
  test('Clear button resets the conversation in the UI', async ({ page, beans }) => {
    await agentSession('__central__', beans)
      .withMessages([
        { role: 'user', content: 'hello agent' },
        { role: 'assistant', content: 'Hi! How can I help?' }
      ])
      .open(page);

    // Verify the seeded messages are visible
    await expect(page.locator('text=hello agent')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=Hi! How can I help?')).toBeVisible({ timeout: 5000 });

    // Clear button should be enabled
    const clearBtn = page.locator('button:has-text("Clear")');
    await expect(clearBtn).toBeEnabled();

    // Click Clear
    await clearBtn.click();

    // The empty state message should reappear
    await expect(page.locator('text=Send a message to start a conversation')).toBeVisible({
      timeout: 5000
    });

    // The messages should be gone
    await expect(page.locator('text=hello agent')).not.toBeVisible();
    await expect(page.locator('text=Hi! How can I help?')).not.toBeVisible();

    // Clear button should be disabled again
    await expect(clearBtn).toBeDisabled();
  });
});
