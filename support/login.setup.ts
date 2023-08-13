import { test as setup } from '../support/custom-fixtures';
import { email, password } from '../test-data/Data';
import { storageState } from '../playwright.config';

setup('Login', async ({ page, loginPage }) => { 
  await page.goto('/login');
  await loginPage.logIn(email, password);
  await page.context().storageState({ path: storageState });
});