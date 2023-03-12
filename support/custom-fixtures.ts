import { test as base } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { Header } from '../page-objects/Header';
import { Sidebar } from '../page-objects/Sidebar';
import { BuildWorkspaceModal } from '../page-objects/BuildWorkspaceModal';
import { WorkspacePage } from '../page-objects/WorkspacePage';
import { WorkspaceSettingsPage } from '../page-objects/WorkspaceSettingsPage';
import { CreateBoardModal } from '../page-objects/CreateBoardModal';
import { BoardPage } from '../page-objects/BoardPage';
import { AbstractPage } from '../page-objects/AbstractPage';

type CustomFixtures = {
  loginPage: LoginPage;
  header: Header;
  sidebar: Sidebar;
  buildWorkspaceModal: BuildWorkspaceModal;
  workspacePage: WorkspacePage;
  workspaceSettingsPage: WorkspaceSettingsPage;
  createBoardModal: CreateBoardModal;
  boardPage: BoardPage;
  abstractPage: AbstractPage;
};

export const test = base.extend<CustomFixtures>({
  loginPage: async ({ page }, use) => {
    await use (new LoginPage(page));
  },
  header: async ({ page }, use) => {
    await use (new Header(page));
  },
  sidebar: async ({ page }, use) => {
    await use (new Sidebar(page));
  },
  buildWorkspaceModal: async ({ page }, use) => {
    await use (new BuildWorkspaceModal(page));
  },
  workspacePage: async ({ page }, use) => {
    await use (new WorkspacePage(page));
  },
  workspaceSettingsPage: async ({ page }, use) => {
    await use (new WorkspaceSettingsPage(page));
  },
  createBoardModal: async ({ page }, use) => {
    await use (new CreateBoardModal(page));
  },
  boardPage: async ({ page }, use) => {
    await use (new BoardPage(page));
  },
  abstractPage: async ({ page }, use) => {
    await use (new AbstractPage(page));
  }
});

export { expect } from '@playwright/test';