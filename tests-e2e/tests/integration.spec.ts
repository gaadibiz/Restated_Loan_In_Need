import { test, expect } from '@playwright/test';

test('homepage has title', async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/LoanINNeed/);
});

test('check backend health', async ({ request }) => {
    const healthCheck = await request.get('http://localhost:5000/');
    expect(healthCheck.ok()).toBeTruthy();
    const response = await healthCheck.json();
    expect(response).toHaveProperty('message');
});
