import { Page, Locator } from '@playwright/test';

export class CreateBoardModal {
  readonly page: Page;
  readonly startWithTemplateButton: Locator;
  readonly boardTemplateMenuItem: Locator;
  readonly createButton: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.startWithTemplateButton = page.getByText('Start with a template');
    this.boardTemplateMenuItem = page.getByRole('menuitem');
    this.createButton = page.getByTestId('create-board-submit-button');
  }

  async clickStartWithTemplate() {
    await this.startWithTemplateButton.click();
  }

  async selectBoardTemplate(templateName: string) {
    await this.boardTemplateMenuItem.getByText(templateName).click();
  }

  async clickCreate() {
    await Promise.all([
      this.page.waitForResponse(response => response.url().includes('/boards')),
      this.createButton.click()
    ]);
  }
}