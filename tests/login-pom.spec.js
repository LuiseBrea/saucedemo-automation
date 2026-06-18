import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

test('login exitoso con POM', async ({ page }) => {

  const loginPage = new LoginPage(page);

  // 1. Ir a la página
  await loginPage.goto();

  // 2. Hacer login
  await loginPage.login('standard_user', 'secret_sauce');

  // 3. Verificar que entró
  await expect(loginPage.inventoryList).toBeVisible();

});