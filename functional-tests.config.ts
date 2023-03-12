import { defineConfig } from '@playwright/test';
import path from 'path';

export const storageState = path.join(__dirname, './support/storageState.json');

export default defineConfig ({
  timeout: 60000,
  use: {
    baseURL: 'https://trello.com',
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
      use: {
        channel: 'chrome',
        storageState: storageState
      }
    },
    { 
      name: 'msedge',
      dependencies: ['setup'],    
      use: {
        channel: 'msedge',
        storageState: storageState
      }
    },
    { 
      name: 'firefox',
      dependencies: ['setup'],    
      use: {
        browserName: 'firefox',
        storageState: storageState
      }
    }
  ]
});