// Integration test for update submission flow
// This test MUST FAIL until T026-T034 are implemented

import { test, expect } from '@playwright/test';

test.describe('Submit Weekly Update - User Story 1', () => {
  test('should submit an update and see it on timeline', async ({ page }) => {
    // Given: authenticated as project member, project exists
    await page.goto('/project.html?id=test-project');

    // When: fill out update form and submit
    await page.fill('[name="status"]', 'On Track');
    await page.fill('[name="percent_complete"]', '75');
    await page.fill('[name="blockers"]', 'Waiting for design review');
    await page.fill('[name="next_steps"]', 'Complete implementation by Friday');
    await page.click('button[type="submit"]');

    // Then: update appears on timeline with timestamp
    const timeline = page.locator('.timeline');
    await expect(timeline).toContainText('On Track');
    await expect(timeline).toContainText('75%');
    await expect(timeline).toContainText('Waiting for design review');

    // MUST FAIL until implementation complete
    expect(false).toBe(true);
  });

  test('should show validation errors for invalid input', async ({ page }) => {
    await page.goto('/project.html?id=test-project');

    // When: submit with invalid percent_complete
    await page.fill('[name="percent_complete"]', '150');
    await page.click('button[type="submit"]');

    // Then: shows error message
    await expect(page.locator('.error-message')).toBeVisible();

    // MUST FAIL until implementation complete
    expect(false).toBe(true);
  });
});
