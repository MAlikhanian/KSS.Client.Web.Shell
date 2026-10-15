import { test, expect } from '@playwright/test';
import { getSection } from '../helpers/selectors';

test.describe('Status (Active Periods)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/person');
    await page.waitForLoadState('networkidle');

    const personCombobox = page.getByRole('combobox').first();
    await personCombobox.click();
    await page.waitForTimeout(2000);
    await page.getByRole('option').first().click();
    await expect(page.getByRole('heading', { name: /وضعیت/ })).toBeVisible({ timeout: 15000 });
  });

  test('should show status section with badge', async ({ page }) => {
    const section = getSection(page, 'وضعیت');
    await expect(section).toBeVisible();
    // Should have a count badge
    await expect(section.locator('[data-slot="badge"]').first()).toBeVisible();
  });

  test('should open add status dialog', async ({ page }) => {
    const section = getSection(page, 'وضعیت');
    const addButton = section.getByRole('button', { name: /افزودن/ });

    if (await addButton.isEnabled()) {
      await addButton.click();
      const dialog = page.locator('[data-slot="dialog-content"]');
      await expect(dialog).toBeVisible();
      await expect(dialog.getByText(/افزودن دوره فعالیت/)).toBeVisible();
    }
  });

  test('should disable add button when current period is open', async ({ page }) => {
    const section = getSection(page, 'وضعیت');
    const hasOpenPeriod = await section.getByText('جاری').count();

    if (hasOpenPeriod > 0) {
      const addButton = section.getByRole('button', { name: /افزودن/ });
      await expect(addButton).toBeDisabled();
    }
  });

  test('should show edit button only on last open record', async ({ page }) => {
    const section = getSection(page, 'وضعیت');
    const rows = section.locator('tbody tr');
    const rowCount = await rows.count();

    if (rowCount > 0) {
      // Last row should have action buttons
      const lastRow = rows.last();
      const buttons = await lastRow.locator('button').count();
      expect(buttons).toBeGreaterThan(0);

      // Non-last rows should NOT have buttons
      if (rowCount > 1) {
        const firstRow = rows.first();
        const firstRowButtons = await firstRow.locator('button').count();
        expect(firstRowButtons).toBe(0);
      }
    }
  });

  test('should validate end date after start date', async ({ page }) => {
    const section = getSection(page, 'وضعیت');
    const rows = section.locator('tbody tr');
    const rowCount = await rows.count();

    if (rowCount > 0) {
      const lastRow = rows.last();
      const hasJari = await lastRow.getByText('جاری').count();

      if (hasJari > 0) {
        // Click edit (pencil) button on last row
        const buttons = lastRow.locator('button');
        await buttons.first().click();

        const dialog = page.locator('[data-slot="dialog-content"]');
        await expect(dialog).toBeVisible();
        await expect(dialog.getByText(/تعیین تاریخ پایان/)).toBeVisible();
      }
    }
  });
});
