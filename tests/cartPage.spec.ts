import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/loginPage';
import { ProductsPage } from '../page-objects/productsPage';
import { CartPage } from '../page-objects/cartPage';

test('User can add Sauce Labs Backpack to cart and see it in the cart page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await productsPage.isAt();
  await productsPage.addBackpackToCart();

  await cartPage.open();
  await cartPage.isProductInCart('Sauce Labs Backpack');
});

test('Cart contains 1 item after adding 1 product', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await productsPage.isAt();
  await productsPage.addBackpackToCart();

  await cartPage.open();

  const productCount = await cartPage.getProductCount();
  expect(productCount).toBe(1);
});