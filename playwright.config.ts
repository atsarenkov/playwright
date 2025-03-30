import { defineConfig } from '@playwright/test';
import { key, token } from './test-data/Data';
import path from 'path';

export const storageState = path.join(__dirname, './support/storageState.json');

export default defineConfig ({
  timeout: 60000,
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: process.env.BASE_URL,
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
    video: {
      mode: 'retain-on-failure',
      size: { width: 1920, height: 1080 }
    },
    screenshot: {
      mode: 'only-on-failure',
      fullPage: true
    }
  },
  expect: {
    timeout: 10000,
    toHaveScreenshot: { maxDiffPixelRatio: 0.01 }
  },
  reporter: [ ['html', { open: 'never' }] ],
  projects: [
    {
      name: 'setup',
      testMatch: /login.setup\.ts/
    },
    { 
      name: 'chrome',
      dependencies: ['setup'],
      grep: /@e2e/,
      use: {
        channel: 'chrome',
        storageState: storageState
      }
    },
    { 
      name: 'msedge',
      dependencies: ['setup'],
      grep: /@e2e/,    
      use: {
        channel: 'msedge',
        storageState: storageState
      }
    },
    { 
      name: 'firefox',
      dependencies: ['setup'],
      grep: /@e2e/,    
      use: {
        browserName: 'firefox',
        storageState: storageState
      }
    },
    { 
      name: 'api',
      grep: /@api/, 
      use: {
        baseURL: `${process.env.BASE_URL}/1/`,
        extraHTTPHeaders: {
          'Authorization': `OAuth oauth_consumer_key="${key}", oauth_token="${token}"`,
          'Content-Type': 'application/json'
        }
      }
    }
  ]
});