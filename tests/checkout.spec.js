import { test, expect } from '@playwright/test';

test('flujo completo de compra', async ({ page }) => {

  // 1. Login
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // 2. Agregar producto al carrito
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

  // 3. Ir al carrito
  await page.click('.shopping_cart_link');

  // 4. Clic en Checkout
  await page.click('[data-test="checkout"]');

  // 5. Llenar el formulario
  await page.fill('[data-test="firstName"]', 'Juan');
  await page.fill('[data-test="lastName"]', 'Perez');
  await page.fill('[data-test="postalCode"]', '10101');

  // 6. Clic en Continue
  await page.click('[data-test="continue"]');

  // 7. Clic en Finish
  await page.click('[data-test="finish"]');

  // 8. Verificar que la compra fue exitosa
  await expect(page.getByText('Thank you for your order!')).toBeVisible();

});