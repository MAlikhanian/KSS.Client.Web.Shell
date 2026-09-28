import { test, expect } from '@playwright/test';
import { getSection } from '../helpers/selectors';

test.describe('Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/person');
    await page.waitForLoadState('networkidle');
  });

  test('should show required asterisks on personal info fields', async ({ page }) => {
    const section = getSection(page, 'اطلاعات پایه');

    // These labels should have red * (required)
    const requiredFields = ['کد ملی', 'شماره شناسنامه', 'تاریخ تولد'];
    for (const field of requiredFields) {
      const label = section.locator('label').filter({ hasText: field }).first();
      await expect(label.locator('.text-destructive')).toBeVisible();
    }
  });

  test('should NOT show required asterisks on optional fields', async ({ page }) => {
    const section = getSection(page, 'اطلاعات پایه');

    const optionalFields = ['شماره پاسپورت', 'شماره بیمه'];
    for (const field of optionalFields) {
      const label = section.locator('label').filter({ hasText: field }).first();
      const hasAsterisk = await label.locator('.text-destructive').count();
      expect(hasAsterisk).toBe(0);
    }
  });

  test('should show placeholder on dropdowns with no default value', async ({ page }) => {
    const section = getSection(page, 'اطلاعات پایه');
    // Check at least one select shows placeholder
    const selectTrigger = section.locator('#sexId');
    const text = await selectTrigger.textContent();
    expect(text).toContain('انتخاب کنید');
  });

  test('should require fatherName in name section', async ({ page }) => {
    const nameSection = getSection(page, 'نام، نام خانوادگی و نام پدر');

    // Click add button
    await nameSection.getByRole('button', { name: /افزودن/ }).click();
    await page.waitForTimeout(500);

    // Fill only firstName and lastName (skip fatherName)
    const firstNameInput = nameSection.getByPlaceholder(/نام به/);
    const lastNameInput = nameSection.getByPlaceholder(/نام خانوادگی به/);

    if (await firstNameInput.count() > 0) {
      await firstNameInput.fill('تست');
      await lastNameInput.fill('تستی');

      // Save button should be disabled because fatherName is empty
      const saveButton = nameSection.getByRole('button', { name: /ذخیره/ });
      await expect(saveButton).toBeDisabled();

      // Fill fatherName
      const fatherNameInput = nameSection.getByPlaceholder(/نام پدر به/);
      await fatherNameInput.fill('پدر');

      // Save button should now be enabled
      await expect(saveButton).toBeEnabled();
    }
  });
});
