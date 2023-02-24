import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  timeout: 60000,
  globalSetup: require.resolve('./support/global-setup'),
  use: {
    baseURL: 'https://trello.com',
    storageState: './support/storageState.json',
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
      name: 'chrome',  
      use: {
        channel: 'chrome'
      }
    },
    { 
      name: 'msedge',  
      use: {
        channel: 'msedge'
      }
    },
    { 
      name: 'firefox',  
      use: {
        browserName: 'firefox'
      }
    }
  ]
}

export default config;