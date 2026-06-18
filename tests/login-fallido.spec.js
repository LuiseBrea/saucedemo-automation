import { test, expect } from '@playwright/test';

test('login con credenciales incorrectas', async ({ page }) => {

  // 1. Entrar a la página
  await page.goto('https://www.saucedemo.com');

  // 2. Escribir usuario incorrecto
  await page.fill('#user-name', 'usuario_falso');

  // 3. Escribir contraseña incorrecta
  await page.fill('#password', 'clave_incorrecta');

  // 4. Hacer clic en Login
  await page.click('#login-button');

  // 5. Verificar que aparece el mensaje de error
  await expect(page.locator('[data-test="error"]')).toBeVisible();

});