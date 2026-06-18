import { test, expect } from '@playwright/test';

test('login exitoso', async ({ page }) => {

  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Verificar que entró a la tienda
  await expect(page.locator('.inventory_list')).toBeVisible();

});

test('login con credenciales incorrectas', async ({ page }) => {

  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'usuario_falso');
  await page.fill('#password', 'clave_incorrecta');
  await page.click('#login-button');

  // Verificar que aparece el mensaje de error
  await expect(page.locator('[data-test="error"]')).toBeVisible();

});

test('agregar producto al carrito', async ({ page }) => {

  // 1. Hacer login
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // 2. Agregar el primer producto al carrito
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

  // 3. Verificar que el carrito muestra 1 producto
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

});