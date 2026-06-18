import { test, expect } from '@playwright/test';

test('mi-codigo', async ({ page }) => {

  //login
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page.locator('.inventory_list')).toBeVisible();

});