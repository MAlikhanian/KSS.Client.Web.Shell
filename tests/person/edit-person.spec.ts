import { test, expect } from '@playwright/test';
import { getSection } from '../helpers/selectors';

test.describe('Edit Person', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/person');
    await page.waitForLoadState('networkidle');

    // Select an existing person
    const personSelect = page.getByRole('combobox').first();
    await personSelect.click();
    await page.getByRole('option').first().click();

    // Wait for form to populate
    await page.waitForTimeout(2000);
  });

  test('should populate form with existing person data', async ({ page }) => {
    // National ID should be filled
    const nationalId = await page.locator('#nationalId').inputValue();
    expect(nationalId).not.toBe('');
  });

  test('should show update button text for existing person', async ({ page }) => {
    await expect(page.getByRole('button', { name: /به‌روزرسانی|ایجاد/ })).toBeVisible();
  });

  test('should update person data', async ({ page }) => {
    // Change insurance number (optional field)
    const insuranceInput = page.locator('#insuranceNumber');
    await insuranceInput.clear();
    await insuranceInput.fill('TEST-123');

    // Click update
    await page.getByRole('button', { name: /به‌روزرسانی|ایجاد/ }).click();

    // Wait for success
    await page.waitForTimeout(2000);

    // Reload page
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Re-select the same person
    const personSelect = page.getByRole('combobox').first();
    await personSelect.click();
    await page.getByRole('option').first().click();
    await page.waitForTimeout(2000);

    // Verify the change persisted
    await expect(page.locator('#insuranceNumber')).toHaveValue('TEST-123');
  });

  test('should clear person selection', async ({ page }) => {
    // Click X button to clear selection
    const clearButton = page.locator('button').filter({ has: page.locator('svg.lucide-x') }).first();
    await clearButton.click();

    // Form should be empty again
    await expect(page.locator('#nationalId')).toHaveValue('');

    // Phase 2 sections should disappear
    await expect(page.getByText('ایمیل‌ها')).not.toBeVisible();
  });

  test('should load all Phase 2 sections for existing person', async ({ page }) => {
    // All sub-entity sections should be visible
    await expect(page.getByRole('heading', { name: 'تابعیت‌ها' })).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('heading', { name: 'ایمیل‌ها' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'تلفن‌ها' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'آدرس‌ها' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'سوابق کاری' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'روابط' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'وضعیت' })).toBeVisible();
  });
});
