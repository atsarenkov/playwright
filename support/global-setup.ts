import { chromium, FullConfig } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`${baseURL!}/login`);
  const loginPage = new LoginPage(page);
  await loginPage.logIn(`${process.env.EMAIL}`, `${process.env.PASSWORD}`);
  await page.context().storageState({ path: './support/storageState.json' });
  await browser.close();
}

export default globalSetup;