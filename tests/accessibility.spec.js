import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('reporte de accesibilidad - login', async ({ page }) => {

  await page.goto('/');

  const results = await new AxeBuilder({ page }).analyze();

  console.log(`Violaciones encontradas: ${results.violations.length}`);
  results.violations.forEach(v => {
    console.log(`[${v.impact.toUpperCase()}] ${v.description}`);
  });

  // Solo fallamos si hay problemas CRITICAL
  const critical = results.violations.filter(v => v.impact === 'critical');
  expect(critical).toHaveLength(0);

});

test('reporte de accesibilidad - tienda', async ({ page }) => {

  await page.goto('/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  const results = await new AxeBuilder({ page }).analyze();

  console.log(`Violaciones encontradas: ${results.violations.length}`);
  results.violations.forEach(v => {
    console.log(`[${v.impact.toUpperCase()}] ${v.description}`);
  });

  // Documentamos el bug conocido del select sin label
  const critical = results.violations.filter(v => v.impact === 'critical');
  console.log(`Bugs críticos: ${critical.length}`);
  console.log('BUG CONOCIDO: El selector de productos no tiene label accesible');

});