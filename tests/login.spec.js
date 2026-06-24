import { test, expect } from '@playwright/test';

test('login exitoso', async ({ page }) => {

  // 1. Entrar a la página
  await page.goto('/');
  
  // 2. Escribir el usuario
  await page.fill('#user-name', 'standard_user');

  // 3. Escribir la contraseña
  await page.fill('#password', 'secret_sauce');

  // 4. Hacer clic en el botón Login
  await page.click('#login-button');

  // 5. Verificar que entramos a la tienda
  await expect(page.locator('.inventory_list')).toBeVisible();

});