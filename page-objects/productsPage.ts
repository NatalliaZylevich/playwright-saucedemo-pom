import { Page, Locator} from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly inventoryItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page.locator('.inventory_item'); 
  }

  async isAt() {
    await this.page.waitForURL(/.*inventory/);
  }

  async getProductCount() {
    return await this.inventoryItems.count();
  }

async addBackpackToCart() {
  const backpackAddButton = this.page.locator('data-test=add-to-cart-sauce-labs-backpack');
  await backpackAddButton.click();
}
}

