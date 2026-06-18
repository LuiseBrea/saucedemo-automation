import { test, expect } from '@playwright/test';

test('buscar en Wikipedia', async ({ page }) => {

  // 1. Entrar a Wikipedia
  await page.goto('https://es.wikipedia.org');

  // 2. Escribir en el buscador
  await page.getByRole('searchbox').fill('Playwright');

  // 3. Presionar Enter
  await page.keyboard.press('Enter');

  // 4. Verificar que el título de la página contiene "Playwright"
  await expect(page).toHaveTitle(/Playwright/);

});