import { Page, Locator } from '@playwright/test';

/**
 * Helper to select a value from a shadcn Select (dropdown) component.
 * Clicks the trigger, then clicks the item with matching text.
 */
export async function selectDropdown(page: Page, triggerLocator: Locator, optionText: string) {
  await triggerLocator.click();
  await page.getByRole('option', { name: optionText }).click();
}

/**
 * Helper to select a value from a shadcn Combobox (Popover + Command) component.
 * Clicks the trigger button, types in the search input, then clicks the matching item.
 */
export async function selectCombobox(page: Page, triggerLocator: Locator, searchText: string, optionText?: string) {
  await triggerLocator.click();
  await page.getByRole('dialog').getByPlaceholder(/جستجو/).fill(searchText);
  await page.getByRole('option', { name: optionText || searchText }).first().click();
}

/**
 * Helper to fill a Persian DatePicker.
 * Clicks the input, types the date string directly.
 */
export async function fillDatePicker(page: Page, locator: Locator, dateStr: string) {
  await locator.locator('input').click();
  await locator.locator('input').fill(dateStr);
  // Press Escape to close the calendar popup
  await page.keyboard.press('Escape');
}

/**
 * Helper to open a dialog by clicking an "افزودن" button within a section.
 */
export async function openAddDialog(page: Page, sectionTitle: string) {
  const section = page.locator('div').filter({ has: page.getByText(sectionTitle) }).first();
  await section.getByRole('button', { name: /افزودن/ }).click();
}

/**
 * Helper to click "ذخیره" (Save) button inside the open dialog.
 */
export async function clickDialogSave(page: Page) {
  await page.locator('[data-slot="dialog-content"]').getByRole('button', { name: /ذخیره/ }).click();
}

/**
 * Helper to click "لغو" (Cancel) button inside the open dialog.
 */
export async function clickDialogCancel(page: Page) {
  await page.locator('[data-slot="dialog-content"]').getByRole('button', { name: /لغو/ }).click();
}

/**
 * Helper to count rows in a shadcn Table within a section.
 */
export async function getTableRowCount(page: Page, sectionLocator: Locator): Promise<number> {
  return sectionLocator.locator('tbody tr').count();
}

/**
 * Helper to get a section card by its heading title text.
 * Uses the heading role to avoid matching sidebar or other cards that contain the text.
 */
export function getSection(page: Page, title: string): Locator {
  return page.locator('[data-slot="card"]').filter({ has: page.getByRole('heading', { name: title }) }).first();
}

/**
 * Helper to fill an input inside the currently open dialog.
 */
export async function fillDialogInput(page: Page, placeholder: string, value: string) {
  await page.locator('[data-slot="dialog-content"]').getByPlaceholder(placeholder).fill(value);
}

/**
 * Helper to select from a dropdown inside the currently open dialog.
 */
export async function selectDialogDropdown(page: Page, label: string, optionText: string) {
  const dialog = page.locator('[data-slot="dialog-content"]');
  const field = dialog.locator('div').filter({ hasText: label }).first();
  await field.getByRole('combobox').click();
  await page.getByRole('option', { name: optionText }).click();
}
