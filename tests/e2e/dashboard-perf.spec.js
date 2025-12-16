// Performance test for dashboard response time
// Target: P95 < 200ms for 500 projects

import { test, expect } from '@playwright/test';

test.describe('Dashboard Performance', () => {
  test('should load dashboard within 200ms P95', async ({ page }) => {
    const times = [];

    // Make 20 requests to measure P95
    for (let i = 0; i < 20; i++) {
      const start = Date.now();
      await page.goto('/');
      await page.locator('.dashboard').waitFor();
      const elapsed = Date.now() - start;
      times.push(elapsed);
    }

    times.sort((a, b) => a - b);
    const p95Index = Math.floor(times.length * 0.95);
    const p95 = times[p95Index];

    console.log(`Dashboard load P95: ${p95}ms`);
    expect(p95).toBeLessThan(200);

    // MUST FAIL until performance optimized
    expect(false).toBe(true);
  });
});
