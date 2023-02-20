import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  use: {
    baseURL: 'https://api.trello.com/1/',
    extraHTTPHeaders: {
      'Authorization': `OAuth oauth_consumer_key="${process.env.KEY}", oauth_token="${process.env.TOKEN}"`,
      'Content-Type': 'application/json'
    }
  },
  reporter: [ ['html', { open: 'never' }] ]
}

export default config;