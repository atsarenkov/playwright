import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailField: Locator;
  readonly continueButton: Locator;
  readonly passwordField: Locator;
  readonly logInButton: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.emailField = page.getByPlaceholder('Enter email');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.passwordField = page.getByPlaceholder('Enter password');
    this.logInButton = page.getByRole('button', { name: 'Log in' });
  }
  
  async logIn(email: string, password: string) {
    await this.emailField.fill(email);
    await this.continueButton.click();
    await this.passwordField.fill(password);
    await Promise.all([
      this.page.waitForResponse(response => response.url().includes('/member')),
      this.logInButton.click()
    ]);
  }
}