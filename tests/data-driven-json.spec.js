import { test, expect } from '@playwright/test';
import usuarios from '../data/usuarios.json' assert { type: 'json' };

for (const datos of usuarios) {
  test('login con ' + datos.usuario, async ({ page }) => {

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