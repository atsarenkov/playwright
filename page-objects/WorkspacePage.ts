import { Page, Locator } from '@playwright/test';

export class WorkspacePage {
  readonly page: Page;
  readonly profileImage: Locator;
  readonly changeLogoButton: Locator;
  readonly uploadNewLogoButton: Locator;
  readonly createNewBoardItem: Locator;
  readonly workspaceName: Locator;
  readonly collapseSidebarIcon: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.profileImage = page.locator('//*[text()="Change logo"]/preceding-sibling::*');
    this.uploadNewLogoButton = page.getByTestId('fileInput');
    this.createNewBoardItem = page.getByTestId('create-board-tile');
    this.workspaceName = page.locator('[id=content] h2').first();
    this.collapseSidebarIcon = page.getByAltText('Workspace navigation collapse icon');
  }
  
  async uploadLogo(filePath: string) {
    await this.profileImage.click();
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      this.uploadNewLogoButton.click()
    ]);
    await fileChooser.setFiles(filePath);
  }

  async clickCreateNewBoard() {
    await this.createNewBoardItem.click();
  }

  async collapseSidebar() {
    await this.collapseSidebarIcon.click();
  }
}