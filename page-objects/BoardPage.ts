import { Page, Locator } from '@playwright/test';

export class BoardPage {
  readonly boardContent: Locator;
    
  constructor(page: Page) {
    this.boardContent = page.locator('.board-main-content');
  }
}