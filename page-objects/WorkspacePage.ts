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
    this.profileImage = page.getByTestId('profileImage');
    this.changeLogoButton = page.getByText('Change logo');
    this.uploadNewLogoButton = page.getByText('Upload a new logo');
    this.createNewBoardItem = page.getByTestId('create-board-tile');
    this.workspaceName = page.locator('[class$=header-content] h2');
    this.collapseSidebarIcon = page.getByAltText('Workspace navigation collapse icon');
  }

  async clickChangeLogo() {
    await this.profileImage.hover();
    await this.changeLogoButton.click();
  }
  
  async uploadLogo(filePath: string) {
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      this.uploadNewLogoButton.click()
    ]);
    await Promise.all([
      this.page.waitForResponse(response => response.url().includes('/logo')),
      fileChooser.setFiles(filePath)
    ]);
  }

  async clickCreateNewBoard() {
    await this.createNewBoardItem.click();
  }

  async collapseSidebar() {
    await this.collapseSidebarIcon.click();
  }
}