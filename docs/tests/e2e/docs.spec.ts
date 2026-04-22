import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.removeItem('tp-skills-theme');
  });
});

test('mobile hamburger menu toggles on index page', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/skills/');

  const toggle = page.locator('#site-nav-toggle');
  const navLinks = page.locator('#site-nav-panel');

  await expect(toggle).toBeVisible();
  await expect(navLinks).toBeHidden();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');

  await toggle.click();

  await expect(navLinks).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
});

test('index search and filter interactions keep cards visible', async ({ page }) => {
  await page.goto('/skills/');

  await page.keyboard.press('Control+k');
  await expect(page.locator('#search-input')).toBeFocused();

  const cards = page.locator('#skills-grid .card');
  await expect(cards.first()).toBeVisible();

  await page.fill('#search-input', 'streaming');
  const filteredCountText = await page.locator('#visible-count').textContent();
  expect(Number(filteredCountText ?? '0')).toBeGreaterThan(0);
  await expect(page.locator('#skills-grid .card:visible').first()).toBeVisible();

  await page.getByRole('tab', { name: /all/i }).click();
  await expect(page.locator('#visible-count')).not.toHaveText('0');
});

test('agent-md generator updates preview and copy button works', async ({ page }) => {
  await page.addInitScript(() => {
    // Mock clipboard for deterministic CI/browser behavior.
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: () => Promise.resolve() },
      configurable: true
    });
  });

  await page.goto('/skills/agent-md-generator/');

  await page.fill('#project-name', 'Docs QA');
  await page.check('input[name="domain"][value="infrastructure"]');
  await page.check('input[name="preset"][value="security"]');

  const preview = page.locator('#agents-preview');
  const sizeStatus = page.locator('#agents-size-status');
  const sizeMetrics = page.locator('#agents-size-metrics');
  const sizeHint = page.locator('#agents-size-hint');

  await expect(sizeStatus).toBeVisible();
  await expect(sizeMetrics).toContainText('KB');
  await expect(sizeHint).toBeVisible();

  const longRules = Array.from({ length: 200 }, (_, index) => `Rule ${index + 1}: Keep instructions precise and avoid duplication.`).join('\n');
  await page.fill('#custom-standards', longRules);
  await expect(sizeStatus).toContainText('Needs review');
  await expect(sizeHint).toContainText('Consider trimming duplicated or obvious rules.');

  await expect(preview).toHaveValue(/AGENTS\.md for Docs QA/);
  await expect(preview).toHaveValue(/iac-infrastructure-as-code/);

  const copyButton = page.locator('#copy-agents');
  await copyButton.click();
  await expect(copyButton).toContainText('Copied!');
});

test('theme toggle applies dark class manually', async ({ page }) => {
  await page.goto('/skills/');

  const themeToggle = page.locator('#theme-toggle-button').first();
  for (let attempt = 0; attempt < 3; attempt += 1) {
    await themeToggle.click();
    const hasDarkClass = await page.locator('html').evaluate((element) => element.classList.contains('dark'));
    if (hasDarkClass) break;
  }
  await expect(page.locator('html')).toHaveClass(/dark/);

  const savedTheme = await page.evaluate(() => localStorage.getItem('tp-skills-theme'));
  expect(savedTheme === 'dark' || savedTheme === 'system').toBeTruthy();
});

test('system theme follows prefers-color-scheme', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/skills/');

  const themeToggle = page.locator('#theme-toggle-button').first();
  await themeToggle.click();
  await themeToggle.click();
  await themeToggle.click();
  await expect(page.locator('html')).toHaveClass(/dark/);
});
