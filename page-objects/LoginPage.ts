import { Page, Locator } from '@playwright/test';
import * as OTPAuth from 'otpauth';
import { secret } from '../test-data/Data';

export class LoginPage {
  readonly page: Page;
  readonly emailField: Locator;
  readonly continueButton: Locator;
  readonly passwordField: Locator;
  readonly logInButton: Locator;
  readonly otpCodeField: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.emailField = page.getByTestId('username');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.passwordField = page.getByPlaceholder('Enter password');
    this.logInButton = page.getByRole('button', { name: 'Log in' });
    this.otpCodeField = page.getByRole('textbox', { name: '6-digit verification code' });
  }
  
  async logIn(email: string, password: string) {
    await this.emailField.fill(email);
    await this.continueButton.click();
    await this.passwordField.fill(password);
    await this.logInButton.click()
    const totp = new OTPAuth.TOTP({
      secret: OTPAuth.Secret.fromBase32(secret)
    });
    const token = totp.generate();
    await Promise.all([
      this.page.waitForResponse(response => response.url().includes('/auth/atlassian')),
      this.otpCodeField.fill(token)
    ]);
  }
}