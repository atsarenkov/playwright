import test from '../support/custom-fixtures';
import { expect } from '@playwright/test';

test.describe.serial('Trello UI', async () => {
    const randomNumber = Math.floor(Math.random() * 900) + 100;
    const workspaceName = `Workspace - ${randomNumber}`;
    const logoPath = './test-data/logo.png';

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Create A Workspace', async ({ page, header, buildWorkspaceModal, workspacePage }) => {
        await header.clickCreateWorkspace();
        await buildWorkspaceModal.enterWorkspaceName(workspaceName);
        await buildWorkspaceModal.selectWorkspaceType('Engineering-IT');
        await buildWorkspaceModal.enterWorkspaceDescription('Just testing');
        await buildWorkspaceModal.clickContinue();
        await buildWorkspaceModal.inviteMember("atsarankou@gmail.com");
        await workspacePage.clickChangeLogo();
        await workspacePage.uploadLogo(logoPath);
        await expect(workspacePage.workspaceName).toHaveText(workspaceName);
        await workspacePage.collapseSidebar();
        await expect(page).toHaveScreenshot('WorkspacePage.png', { 
            fullPage: true, 
            mask: [workspacePage.workspaceName] 
        });
    });

    test('Add A Board To The Workspace', async ({ header, workspacePage, createBoardModal, boardPage }) => {
        await header.openWorkspace(workspaceName);
        await workspacePage.clickCreateNewBoard();
        await createBoardModal.clickStartWithTemplate();
        await createBoardModal.selectBoardTemplate('Simple Project Board');
        await createBoardModal.clickCreate();
        await expect(boardPage.boardContent).toHaveScreenshot('BoardContent.png');
    });

    test('Delete The Workspace', async ({ sidebar, workspaceSettingsPage, abstractPage }) => {
        await sidebar.expandWorkspaceOptions(workspaceName);
        await sidebar.clickSettings();
        await workspaceSettingsPage.deleteWorkspace(workspaceName);
        await expect(abstractPage.alertBanner).toHaveText(`The Workspace "${workspaceName}" has been deleted.`);
    });
});