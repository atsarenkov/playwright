import { Page, Locator } from '@playwright/test';

export class WorkspaceSettingsPage {
  readonly deleteThisWorkspaceButton: Locator;
  readonly workspaceNameField: Locator;
  readonly deleteWorkspaceButton: Locator;
  
  constructor(page: Page) {
    this.deleteThisWorkspaceButton = page.getByText('Delete this Workspace?');
    this.workspaceNameField = page.locator('#confirmWorkspaceName');
    this.deleteWorkspaceButton = page.getByRole('button', { name: 'Delete Workspace' });
  }

  async deleteWorkspace(workspaceName: string) {
    await this.deleteThisWorkspaceButton.click();
    await this.workspaceNameField.fill(workspaceName);
    await this.deleteWorkspaceButton.click();
  }
}