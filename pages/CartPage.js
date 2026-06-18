export class CartPage {

  constructor(page) {
    this.page = page;
    this.cartIcon = page.locator('.shopping_cart_link');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async goto() {
    await this.cartIcon.click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

}