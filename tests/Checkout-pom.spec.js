import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';

test('flujo completo de compra con POM', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // 1. Login
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  // 2. Agregar producto al carrito
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

  // 3. Ir al carrito
  await cartPage.goto();

  // 4. Ir al checkout
  await cartPage.checkout();

  // 5. Llenar formulario
  await checkoutPage.fillForm('Juan', 'Perez', '10101');

  // 6. Finalizar compra
  await checkoutPage.finish();

  // 7. Verificar confirmación
  await expect(checkoutPage.confirmationMessage).toBeVisible();

})