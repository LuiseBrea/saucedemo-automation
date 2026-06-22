import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { LoginPage } from '../pages/LoginPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';

test('flujo completo de compra con POM', async ({ page }) => {

  allure.label('feature', 'Checkout');
  allure.label('severity', 'critical');
  allure.description('Verifica el flujo completo desde login hasta confirmación de compra');

  const loginPage = new LoginPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await allure.step('Login con usuario válido', async () => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  await allure.step('Agregar producto al carrito', async () => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  });

  await allure.step('Ir al carrito', async () => {
    await cartPage.goto();
  });

  await allure.step('Iniciar checkout', async () => {
    await cartPage.checkout();
  });

  await allure.step('Llenar formulario de envío', async () => {
    await checkoutPage.fillForm('Juan', 'Perez', '10101');
  });

  await allure.step('Finalizar compra', async () => {
    await checkoutPage.finish();
  });

  await allure.step('Verificar confirmación', async () => {
    await expect(checkoutPage.confirmationMessage).toBeVisible();
  });

});