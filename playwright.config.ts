import { defineConfig, devices } from '@playwright/test'

const pagesE2E = process.env.PLAYWRIGHT_PAGES === 'true'

export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'dot' : 'list',
  use: {
    baseURL: pagesE2E ? 'http://127.0.0.1:4173' : 'http://127.0.0.1:5000',
    trace: 'retain-on-failure',
    permissions: ['clipboard-read', 'clipboard-write'],
  },
  webServer: {
    command: pagesE2E
      ? 'node scripts/serve-pages-preview.js'
      : 'npm run dev -- --host 127.0.0.1',
    url: pagesE2E
      ? 'http://127.0.0.1:4173/abrahamic-reference-engine/'
      : 'http://127.0.0.1:5000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: pagesE2E
    ? [
        {
          name: 'pages',
          use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 900 } },
        },
      ]
    : [
        {
          name: 'desktop',
          use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 900 } },
        },
        {
          name: 'mobile',
          use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 } },
        },
      ],
})