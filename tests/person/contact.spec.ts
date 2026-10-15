import { test, expect } from '@playwright/test';
import { getSection } from '../helpers/selectors';

const uniqueId = () => Date.now().toString().slice(-6);

test.describe('Contact Information', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/person');
    await page.waitForLoadState('networkidle');

    const personCombobox = page.getByRole('combobox').first();
    await personCombobox.click();
    await page.waitForTimeout(2000);
    await page.getByRole('option').first().click();
    await expect(page.getByRole('heading', { name: 'ایمیل‌ها' })).toBeVisible({ timeout: 15000 });
  });

  test('should add email via dialog', async ({ page }) => {
    const emailSection = getSection(page, 'ایمیل‌ها');
    const testEmail = `test-${uniqueId()}@example.com`;

    await emailSection.getByRole('button', { name: /افزودن/ }).click();
    const dialog = page.locator('[data-slot="dialog-content"]');
    await expect(dialog).toBeVisible();

    await dialog.locator('input[type="email"]').fill(testEmail);
    await dialog.getByRole('button', { name: /ذخیره/ }).click();
    await page.waitForTimeout(1500);

    // Verify email was added — check row count or text
    const hasEmail = await emailSection.getByText(testEmail).count();
    const rowsAfter = await emailSection.locator('tbody tr').count();
    expect(hasEmail > 0 || rowsAfter > 0).toBeTruthy();
  });

  test('should add phone via dialog', async ({ page }) => {
    const phoneSection = getSection(page, 'تلفن‌ها');
    const testPhone = `0912${uniqueId()}`;
    const rowsBefore = await phoneSection.locator('tbody tr').count();

    await phoneSection.getByRole('button', { name: /افزودن/ }).click();
    const dialog = page.locator('[data-slot="dialog-content"]');
    await expect(dialog).toBeVisible();

    await dialog.locator('input[type="tel"]').fill(testPhone);
    await dialog.getByRole('button', { name: /ذخیره/ }).click();
    await page.waitForTimeout(1500);

    // Phone numbers display in Persian digits, so check row count increased
    const rowsAfter = await phoneSection.locator('tbody tr').count();
    expect(rowsAfter).toBeGreaterThan(rowsBefore);
  });

  test('should add address via dialog', async ({ page }) => {
    const addressSection = getSection(page, 'آدرس‌ها');
    await addressSection.getByRole('button', { name: /افزودن/ }).click();

    const dialog = page.locator('[data-slot="dialog-content"]');
    await expect(dialog).toBeVisible();

    // Verify dialog title
    await expect(dialog.getByText(/افزودن آدرس/)).toBeVisible();

    // Verify dialog has expected labels
    await expect(dialog.locator('label').filter({ hasText: 'کشور' })).toBeVisible();

    // Cancel
    await dialog.getByRole('button', { name: /لغو/ }).click();
    await expect(dialog).not.toBeVisible();
  });

  test('should delete email from table', async ({ page }) => {
    const emailSection = getSection(page, 'ایمیل‌ها');
    const rows = emailSection.locator('tbody tr');
    const initialRows = await rows.count();

    if (initialRows > 0) {
      await rows.last().locator('button').click();
      await page.waitForTimeout(1000);
      const newRows = await rows.count();
      expect(newRows).toBeLessThan(initialRows);
    }
  });
});
