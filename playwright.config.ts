import { defineConfig, devices } from '@playwright/test'

const pagesE2E = process.env.PLAYWRIGHT_PAGES === 'true'
const hostedPagesE2E = pagesE2E && process.env.PLAYWRIGHT_HOSTED === 'true'

if (hostedPagesE2E && !process.env.PLAYWRIGHT_BASE_URL) {
  throw new Error('PLAYWRIGHT_BASE_URL is required for hosted Pages checks')
}

const pagesBaseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:4173'

export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'dot' : 'list',
  use: {
    baseURL: pagesE2E ? pagesBaseURL : 'http://127.0.0.1:5000',
    trace: 'retain-on-failure',
    permissions: ['clipboard-read', 'clipboard-write'],
  },
  webServer: hostedPagesE2E
    ? undefined
    : {
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