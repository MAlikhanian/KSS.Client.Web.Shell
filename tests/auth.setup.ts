import { test as setup, expect } from '@playwright/test';

const authFile = 'tests/.auth/user.json';

// Credentials come from the environment and have NO fallback, deliberately.
//
// This file previously read `process.env.TEST_USERNAME || '<literal>'`. That pattern
// reads as "use the environment variable" and does — until the variable is absent,
// which is exactly when the literal fires. `.env.test` and `tests/.auth/` are both
// gitignored, so every file MEANT to hold the secret was correctly excluded and the
// secret ended up in the source file instead, as the fallback for their absence.
// On a fresh clone `npm run test:e2e` then authenticated as a real person using
// credentials the repository supplied.
//
// A required variable with no default fails loudly. A default fails silently and
// succeeds as somebody real.
const username = process.env.TEST_USERNAME;
const password = process.env.TEST_PASSWORD;

if (!username || !password) {
  throw new Error(
    'TEST_USERNAME and TEST_PASSWORD are required and have no default.\n' +
      'Copy .env.test.example to .env.test and fill it in, or set them in your shell.\n' +
      'Never put a value in this file: it is committed and this repository is public.',
  );
}

setup('authenticate', async ({ page }) => {
  await page.goto('/signin');

  // Fill login form
  await page.getByPlaceholder(/کد ملی/).fill(username);
  await page.getByPlaceholder(/رمز عبور/).fill(password);

  // Submit
  await page.getByRole('button', { name: 'ورود', exact: true }).click();

  // Wait for navigation away from signin page
  await page.waitForURL((url) => !url.pathname.includes('signin'), { timeout: 30000 });

  // Save authentication state
  await page.context().storageState({ path: authFile });
});
