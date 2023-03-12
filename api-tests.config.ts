import { defineConfig } from '@playwright/test';
import { key, token } from './test-data/Data';

export default defineConfig ({
  use: {
    baseURL: 'https://api.trello.com/1/',
    extraHTTPHeaders: {
      'Authorization': `OAuth oauth_consumer_key="${key}", oauth_token="${token}"`,
      'Content-Type': 'application/json'
    }
  },
  reporter: [ ['html', { open: 'never' }] ]
});