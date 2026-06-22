import { test, expect } from '@playwright/test';

const usuarios = [
  { usuario: 'standard_user', clave: 'secret_sauce', debeEntrar: true },
  { usuario: 'locked_out_user', clave: 'secret_sauce', debeEntrar: false },
  { usuario: 'error_user', clave: 'secret_sauce', debeEntrar: true },
  { usuario: 'problem_user', clave: 'secret_sauce', debeEntrar: true },
];

for (const datos of usuarios) {
  test(`login con ${datos.usuario}`, async ({ page }) => {

    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', datos.usuario);
    await page.fill('#password', datos.clave);
    await page.click('#login-button');

    if (datos.debeEntrar) {
      await expect(page.locator('.inventory_list')).toBeVisible();
    } else {
      await expect(page.locator('[data-test="error"]')).toBeVisible();
    }

  });
}