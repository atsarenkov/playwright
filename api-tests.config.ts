import { PlaywrightTestConfig } from '@playwright/test';
import { Data } from './test-data/Data';

const config: PlaywrightTestConfig = {
  use: {
    baseURL: 'https://api.trello.com/1/',
    extraHTTPHeaders: {
      'Authorization': `OAuth oauth_consumer_key="${Data.key}", oauth_token="${Data.token}"`,
      'Content-Type': 'application/json'
    }
  },
  reporter: [ ['html', { open: 'never' }] ]
}

export default config;