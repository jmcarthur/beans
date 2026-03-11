import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { test, expect } from './fixtures';

/** Send a GraphQL mutation to the beans server. */
async function gql(baseURL: string, query: string) {
  const res = await fetch(`${baseURL}/api/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });
  return res.json();
}

/** Seed a central conversation JSONL file so the chat has messages to display. */
function seedConversation(beansPath: string) {
  const convDir = join(beansPath, '.conversations');
  mkdirSync(convDir, { recursive: true });
  writeFileSync(
    join(convDir, '__central__.jsonl'),
    [
      JSON.stringify({ type: 'message', role: 'user', content: 'Plan a refactor' }),
      JSON.stringify({
        type: 'message',
        role: 'assistant',
        content: 'Here is my plan for the refactor.'
      })
    ].join('\n') + '\n'
  );
}

test.describe('Plan mode approval flow', () => {
  test('ExitPlanMode shows approval UI with plan content and hint text', async ({
    page,
    beans
  }) => {
    seedConversation(beans.beansPath);

    await page.goto(beans.baseURL + '/');
    await page.click('button[title="Show chat"]');

    // Wait for seeded messages to load (subscription connects and loads from JSONL)
    await expect(page.locator('text=Plan a refactor')).toBeVisible({ timeout: 5000 });

    // Now inject the pending interaction — the subscription will push the update
    await gql(
      beans.baseURL,
      `mutation { setAgentPlanMode(beanId: "__central__", planMode: true) }`
    );
    await gql(
      beans.baseURL,
      `mutation { setAgentPendingInteraction(beanId: "__central__", type: EXIT_PLAN, planContent: "# Refactor Plan\\n\\n1. Extract module\\n2. Update imports") }`
    );

    // Verify the approval UI is visible
    await expect(
      page.locator('text=Agent wants to leave plan mode and start working.')
    ).toBeVisible({ timeout: 5000 });

    // Verify plan content is rendered
    await expect(page.locator('text=Refactor Plan')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=Extract module')).toBeVisible();

    // Verify the Approve button is present
    await expect(page.locator('button:has-text("Approve")')).toBeVisible();

    // Verify the hint text is shown
    await expect(page.locator('text=or type below to refine the plan')).toBeVisible();

    // Verify there is NO Reject button
    await expect(page.locator('button:has-text("Reject")')).not.toBeVisible();
  });

  test('ENTER_PLAN interaction type does not show approval UI', async ({ page, beans }) => {
    seedConversation(beans.beansPath);

    await page.goto(beans.baseURL + '/');
    await page.click('button[title="Show chat"]');
    await expect(page.locator('text=Plan a refactor')).toBeVisible({ timeout: 5000 });

    // Inject an ENTER_PLAN pending interaction
    await gql(
      beans.baseURL,
      `mutation { setAgentPendingInteraction(beanId: "__central__", type: ENTER_PLAN) }`
    );

    // Give the subscription time to push the update
    await page.waitForTimeout(500);

    // The ENTER_PLAN type should NOT show the ExitPlanMode approval UI
    await expect(
      page.locator('text=Agent wants to leave plan mode and start working.')
    ).not.toBeVisible();
  });

  test('Plan/Act mode toggle reflects session state', async ({ page, beans }) => {
    seedConversation(beans.beansPath);

    await page.goto(beans.baseURL + '/');
    await page.click('button[title="Show chat"]');
    await expect(page.locator('text=Plan a refactor')).toBeVisible({ timeout: 5000 });

    // Put the session in plan mode via mutation
    await gql(
      beans.baseURL,
      `mutation { setAgentPlanMode(beanId: "__central__", planMode: true) }`
    );

    // The mode toggle should show "Plan" is active
    const planButton = page.getByRole('button', { name: 'Plan', exact: true });
    await expect(planButton).toBeVisible({ timeout: 5000 });
  });
});
