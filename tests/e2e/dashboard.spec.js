// Integration test for dashboard filtering
// This test MUST FAIL until T041-T045 are implemented

import { test, expect } from '@playwright/test';

test.describe('Dashboard View - User Story 2', () => {
  test('should display projects with status and filters', async ({ page }) => {
    // Given: multiple projects exist with different statuses
    await page.goto('/');

    // Then: projects are displayed
    const dashboard = page.locator('.dashboard');
    await expect(dashboard).toBeVisible();

    // And: each project card shows required info
    const firstCard = page.locator('.project-card').first();
    await expect(firstCard).toContainText('On Track'); // status
    await expect(firstCard).toContainText('%'); // percent complete

    // When: filter by team
    await page.selectOption('[name="team-filter"]', 'Engineering');

    // Then: only Engineering projects shown
    const cards = page.locator('.project-card');
    await expect(cards).not.toHaveCount(0);

    // MUST FAIL until implementation complete
    expect(false).toBe(true);
  });

  test('should highlight blockers', async ({ page }) => {
    await page.goto('/');

    // When: a project has blockers
    const blockerCard = page.locator('.project-card:has(.blocker-indicator)').first();

    // Then: blocker is highlighted
    await expect(blockerCard).toBeVisible();
    await expect(blockerCard.locator('.blocker-indicator')).toBeVisible();

    // MUST FAIL until implementation complete
    expect(false).toBe(true);
  });
});
