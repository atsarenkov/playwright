import { Page, Locator } from '@playwright/test';

export class AbstractPage {
  readonly alertBanner: Locator;
    
  constructor(page: Page) {
    this.alertBanner = page.getByRole('alert');
  }
}