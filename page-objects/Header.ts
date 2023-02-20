import { Page, Locator } from '@playwright/test';

export class Header {
  readonly page: Page;
  readonly workspacesSelection: Locator;
  readonly workspaceList: Locator;
  readonly createButton: Locator;
  readonly createWorkspaceButton: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.workspacesSelection = page.getByLabel('Workspaces');
    this.workspaceList = page.getByTestId('workspace-list');
    this.createButton = page.getByLabel('Create board or Workspace');
    this.createWorkspaceButton = page.getByText('Create Workspace');
  }

  async openWorkspace(workspaceName: string) {
    await this.workspacesSelection.click();
    await Promise.all([
      this.page.waitForResponse(response => response.url().includes('/member')),
      this.workspaceList.getByText(workspaceName).click()
    ]);
  }

  async clickCreateWorkspace() {
    await this.createButton.click();
    await this.createWorkspaceButton.click();
  }
}