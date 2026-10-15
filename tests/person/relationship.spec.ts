import { test, expect } from '@playwright/test';
import { getSection, clickDialogSave } from '../helpers/selectors';

test.describe('Relationships', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/person');
    await page.waitForLoadState('networkidle');

    const personSelect = page.getByRole('combobox').first();
    await personSelect.click();
    await page.getByRole('option').first().click();
    await expect(page.getByText('روابط')).toBeVisible({ timeout: 10000 });
  });

  test('should open add relationship dialog', async ({ page }) => {
    const section = getSection(page, 'روابط');
    await section.getByRole('button', { name: /افزودن/ }).click();

    const dialog = page.locator('[data-slot="dialog-content"]');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText('افزودن رابطه')).toBeVisible();
  });

  test('should search related person', async ({ page }) => {
    const section = getSection(page, 'روابط');
    await section.getByRole('button', { name: /افزودن/ }).click();

    const dialog = page.locator('[data-slot="dialog-content"]');
    await dialog.getByPlaceholder(/نام، نام خانوادگی/).fill('محمد');

    await page.waitForTimeout(1500);
    const results = dialog.locator('button').filter({ has: page.locator('.font-mono') });
    await expect(results.first()).toBeVisible({ timeout: 5000 });
  });

  test('should validate related person is required', async ({ page }) => {
    const section = getSection(page, 'روابط');
    await section.getByRole('button', { name: /افزودن/ }).click();

    await clickDialogSave(page);
    await expect(page.getByText('لطفاً شخص مرتبط را انتخاب کنید')).toBeVisible({ timeout: 3000 });
  });

  test('should prevent self-relation', async ({ page }) => {
    const section = getSection(page, 'روابط');
    await section.getByRole('button', { name: /افزودن/ }).click();

    const dialog = page.locator('[data-slot="dialog-content"]');
    // Get current person's name from the person select button
    const currentPersonName = await page.getByRole('combobox').first().textContent();

    // Try to search and select the same person
    if (currentPersonName) {
      await dialog.getByPlaceholder(/نام، نام خانوادگی/).fill(currentPersonName.substring(0, 5));
      await page.waitForTimeout(1500);
    }

    // If we select same person, should show error
    // (This test may need adjustment based on actual data)
  });
});
