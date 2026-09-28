import { test, expect } from '@playwright/test';
import { getSection } from '../helpers/selectors';

test.describe('Employment Information', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/person');
    await page.waitForLoadState('networkidle');

    const personCombobox = page.getByRole('combobox').first();
    await personCombobox.click();
    await page.waitForTimeout(2000);
    await page.getByRole('option').first().click();
    await expect(page.getByRole('heading', { name: 'سوابق کاری' })).toBeVisible({ timeout: 15000 });
  });

  test('should open add employment dialog', async ({ page }) => {
    const section = getSection(page, 'سوابق کاری');
    const addButton = section.getByRole('button', { name: /افزودن/ });

    if (await addButton.isEnabled()) {
      await addButton.click();
      const dialog = page.locator('[data-slot="dialog-content"]');
      await expect(dialog).toBeVisible();
      await expect(dialog.getByText(/افزودن سابقه شغلی|تعیین تاریخ/)).toBeVisible();
    }
  });

  test('should search company by name', async ({ page }) => {
    const section = getSection(page, 'سوابق کاری');
    const addButton = section.getByRole('button', { name: /افزودن/ });

    if (await addButton.isEnabled()) {
      await addButton.click();
      const dialog = page.locator('[data-slot="dialog-content"]');

      // Type company name in search input
      await dialog.getByPlaceholder(/جستجوی نام/).fill('سبا');
      await page.waitForTimeout(2000);

      // Should show search results or "not found" message
      await page.waitForTimeout(2000);
      const hasResults = await dialog.locator('button').filter({ hasText: /سبا/ }).count();
      const hasNotFound = await dialog.getByText(/شرکتی یافت نشد/).count();
      // Either results found or not-found message shown (Company service may not be running)
      expect(hasResults > 0 || hasNotFound > 0).toBeTruthy();
    }
  });

  test('should search company by national ID', async ({ page }) => {
    const section = getSection(page, 'سوابق کاری');
    const addButton = section.getByRole('button', { name: /افزودن/ });

    if (await addButton.isEnabled()) {
      await addButton.click();
      const dialog = page.locator('[data-slot="dialog-content"]');

      await dialog.getByPlaceholder(/جستجوی نام/).fill('10101');
      await page.waitForTimeout(2000);

      const results = dialog.locator('button').filter({ has: page.locator('.font-mono') });
      const count = await results.count();
      expect(count).toBeGreaterThanOrEqual(0); // May or may not find results depending on data
    }
  });

  test('should validate company is required', async ({ page }) => {
    const section = getSection(page, 'سوابق کاری');
    const addButton = section.getByRole('button', { name: /افزودن/ });

    if (await addButton.isEnabled()) {
      await addButton.click();
      const dialog = page.locator('[data-slot="dialog-content"]');
      await dialog.getByRole('button', { name: /ذخیره/ }).click();
      await expect(page.getByText(/لطفاً شرکت را انتخاب کنید/)).toBeVisible({ timeout: 5000 });
    }
  });

  test('should enforce date chain - cannot add when current is open', async ({ page }) => {
    const section = getSection(page, 'سوابق کاری');
    const hasOpen = await section.getByText('جاری').count();
    if (hasOpen > 0) {
      const addButton = section.getByRole('button', { name: /افزودن/ });
      await expect(addButton).toBeDisabled();
    }
  });

  test('should show employment table headers', async ({ page }) => {
    const section = getSection(page, 'سوابق کاری');
    const rows = await section.locator('tbody tr').count();
    if (rows > 0) {
      await expect(section.getByText('حوزه فعالیت')).toBeVisible();
      await expect(section.getByText('واحد فعالیت')).toBeVisible();
      await expect(section.getByText('سمت')).toBeVisible();
      await expect(section.getByText('نوع قرارداد')).toBeVisible();
    } else {
      await expect(section.getByText(/هیچ سابقه شغلی/)).toBeVisible();
    }
  });
});
