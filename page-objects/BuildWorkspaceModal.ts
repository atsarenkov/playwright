import { Page, Locator } from '@playwright/test';

export class BuildWorkspaceModal {
  readonly workspaceNameField: Locator;
  readonly workSpaceTypeDropdown: Locator;
  readonly workSpaceTypeList: Locator;
  readonly workspaceDescriptionField: Locator;
  readonly continueButton: Locator;
  readonly workspaceMembersField: Locator;
  readonly inviteToWorkspaceButton: Locator;
  
  constructor(page: Page) {
    this.workspaceNameField = page.locator('//*[text()="Workspace name"]/following-sibling::input');
    this.workSpaceTypeDropdown = page.locator('//*[text()="Workspace type"]/following-sibling::div');
    this.workSpaceTypeList = page.getByTestId(/team-type-input/);
    this.workspaceDescriptionField = page.locator('[id*=description]');
    this.continueButton = page.getByText('Continue');
    this.workspaceMembersField = page.getByTestId('add-members-input');
    this.inviteToWorkspaceButton = page.getByText('Invite to Workspace');
  }
  
  async enterWorkspaceName(name: string) {
    await this.workspaceNameField.fill(name);
  }

  async selectWorkspaceType(type: string) {
    await this.workSpaceTypeDropdown.click();
    await this.workSpaceTypeList.getByText(type).click();
  }

  async enterWorkspaceDescription(description: string) {
    await this.workspaceDescriptionField.fill(description);
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async inviteMember(email: string) {
    await this.workspaceMembersField.fill(email);
    await this.inviteToWorkspaceButton.click();
  }
}