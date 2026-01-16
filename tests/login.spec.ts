import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/loginPage';

test('Successful login with valid data', async ({ page }) => {
  // Создаём объект логин-страницы
  const loginPage = new LoginPage(page);

  // Открываем сайт
  await loginPage.goto();

  // Выполняем логин
  await loginPage.login('standard_user', 'secret_sauce');

  // Проверяем, что после логина нас перенаправило на страницу товаров
  await expect(page).toHaveURL(/.*inventory/);
});


test('Login fails with invalid data', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('invalid_user', 'wrong_password');

  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('Login fails for locked out user', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('locked_out_user', 'secret_sauce');

  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});