import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/loginPage';
import { ProductsPage } from '../page-objects/productsPage';

test('User sees product list after successful login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  // Login
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  // Check that we are on the products page
  await productsPage.isAt();

  // Check that there are products visible
  const productCount = await productsPage.getProductCount();
  expect(productCount).toBeGreaterThan(0);
});