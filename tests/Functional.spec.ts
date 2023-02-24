import test from '../support/custom-fixtures';
import { expect } from '@playwright/test';
import { Data } from '../test-data/Data';

test.describe.serial('@functional', async () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Create A Workspace', async ({ page, header, buildWorkspaceModal, workspacePage }) => {
        await header.clickCreateWorkspace();
        await buildWorkspaceModal.enterWorkspaceName(Data.workspaceName);
        await buildWorkspaceModal.selectWorkspaceType('Engineering-IT');
        await buildWorkspaceModal.enterWorkspaceDescription('Just testing');
        await buildWorkspaceModal.clickContinue();
        await buildWorkspaceModal.inviteMember(Data.email);
        await workspacePage.clickChangeLogo();
        await workspacePage.uploadLogo(Data.logoPath);
        await expect(workspacePage.workspaceName).toHaveText(Data.workspaceName);
        await workspacePage.collapseSidebar();
        await expect(page).toHaveScreenshot('WorkspacePage.png', { 
            fullPage: true, 
            mask: [workspacePage.workspaceName] 
        });
    });

    test('Add A Board To The Workspace', async ({ header, workspacePage, createBoardModal, boardPage }) => {
        await header.openWorkspace(Data.workspaceName);
        await workspacePage.clickCreateNewBoard();
        await createBoardModal.clickStartWithTemplate();
        await createBoardModal.selectBoardTemplate('Simple Project Board');
        await createBoardModal.clickCreate();
        await expect(boardPage.boardContent).toHaveScreenshot('BoardContent.png');
    });

    test('Delete The Workspace', async ({ sidebar, workspaceSettingsPage, abstractPage }) => {
        await sidebar.expandWorkspaceOptions(Data.workspaceName);
        await sidebar.clickSettings();
        await workspaceSettingsPage.deleteWorkspace(Data.workspaceName);
        await expect(abstractPage.alertBanner).toHaveText(`The Workspace "${Data.workspaceName}" has been deleted.`);
    });
});