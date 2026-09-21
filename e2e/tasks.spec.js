const { test, expect } = require('@playwright/test');

test.describe('Task List', () => {
  test('adds a task and shows it in the list', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('task-input').fill('Buy coffee');
    await page.getByTestId('add-task-button').click();

    await expect(page.getByTestId('task-item')).toHaveText('Buy coffee');
  });

  test('shows an error when submitting an empty task', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('add-task-button').click();

    await expect(page.getByTestId('error-message')).toBeVisible();
  });
});
