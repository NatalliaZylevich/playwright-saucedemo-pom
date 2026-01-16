import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
  }

  async open() {
    await this.page.click('.shopping_cart_link');
    await expect(this.page).toHaveURL(/.*cart/);
  }

  async isProductInCart(productName: string) {
    const product = this.page.locator('.cart_item', { hasText: productName });
    await expect(product).toBeVisible();
  }
async getProductCount() {
return await this.cartItems.count();
}

}