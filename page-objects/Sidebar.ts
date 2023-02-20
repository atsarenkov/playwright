import { Page, Locator } from '@playwright/test';

export class Sidebar {
  readonly workspaceItem: Locator;
  readonly settingsButton: Locator;
    
  constructor(page: Page) {
    this.workspaceItem = page.getByTestId('home-team-tab-name');
    this.settingsButton = page.getByTestId('home-team-settings-tab');
  }

  async expandWorkspaceOptions(workspaceName: string) {
    await this.workspaceItem.getByText(workspaceName).click();
  }

  async clickSettings() {
    await this.settingsButton.click();
  }
}