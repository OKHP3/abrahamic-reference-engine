import { test, expect, type Page, type Route } from '@playwright/test'

const biblePassage = (reference: string, text: string) => ({
  reference,
  verses: [{ book_id: 'john', book_name: 'John', chapter: 3, verse: 16, text }],
  text,
  translation_id: 'kjv',
  translation_name: 'King James Version',
  translation_note: '',
})

const quranPassage = {
  verse: {
    id: 255,
    verse_number: 255,
    verse_key: '2:255',
    text_uthmani: 'الله',
    translations: [{ id: 20, text: 'Quran response', resource_name: 'Saheeh International' }],
  },
}

const hadithCollection = {
  metadata: { name: 'Sahih al-Bukhari', section: {} },
  hadiths: [{ hadithnumber: 206, text: 'Hadith response' }],
}

const aladhanDay = (year: string, month: string) => ({
  gregorian: {
    date: `01-${month.padStart(2, '0')}-${year}`,
    year,
    month: { number: Number(month), en: 'January' },
    day: '1',
  },
  hijri: {
    date: '01-01-1448',
    year: '1448',
    month: { number: 1, en: 'Muharram', ar: 'محرم' },
    day: '1',
    holidays: ['1st Day of Muharram'],
  },
})

async function json(route: Route, body: unknown, status = 200) {
  await route.fulfill({
    status,
    contentType: 'application/json',
    body: JSON.stringify(body),
  })
}

async function mockCalendarProviders(page: Page, includeEvent = true) {
  await page.route('https://www.hebcal.com/**', route =>
    json(route, {
      title: 'Deterministic Hebcal fixture',
      items: includeEvent
        ? [{ title: 'Rosh Hashanah', date: '2026-09-12', category: 'holiday', link: 'https://hebcal.example/rosh' }]
        : [],
    })
  )
  await page.route('https://api.aladhan.com/**', async route => {
    const url = new URL(route.request().url())
    const [, month, year] = url.pathname.split('/').slice(-3)
    await json(route, {
      code: 200,
      status: 'OK',
      data: includeEvent && month === '1' ? [aladhanDay(year, month)] : [],
    })
  })
}

async function mockScriptureProviders(page: Page) {
  await page.route('https://bible-api.com/**', route =>
    json(route, biblePassage('John 3:16', 'For God so loved the world.'))
  )
  await page.route('https://api.quran.com/**', route => json(route, quranPassage))
  await page.route('https://cdn.jsdelivr.net/**', route => json(route, hadithCollection))
}

test.beforeEach(async ({ page }) => {
  // Any provider request not explicitly fulfilled by a test is a failure-prone
  // abort rather than an accidental live-network dependency.
  await page.route('https://**/*', route => route.abort())
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: async () => undefined },
    })
  })
  await mockCalendarProviders(page)
  await mockScriptureProviders(page)
})

test.describe('route matrix and refresh safety', () => {
  test('opens every public route, settings, and a direct deep link', async ({ page }) => {
    const routes = [
      ['/browse', 'Browse Traditions'],
      ['/lookup', 'Verse Lookup'],
      ['/compare', 'Cross-Tradition Compare'],
      ['/observances', 'Observances'],
      ['/skills', 'Agent Skills'],
      ['/origin', 'Origin Archive'],
    ] as const

    for (const [path, heading] of routes) {
      await page.goto(path)
      await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible()
      await page.reload()
      await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible()
      await expect(page.locator('body')).toContainText(heading)
    }

    await page.goto('/browse/catholic')
    await expect(page.getByRole('heading', { name: 'Catholic', exact: true })).toBeVisible()
    await page.reload()
    await expect(page.getByRole('heading', { name: 'Catholic', exact: true })).toBeVisible()

    await page.goto('/not-a-real-route')
    await expect(page).toHaveURL(/\/browse$/)
    await expect(page.getByRole('heading', { name: 'Browse Traditions', exact: true })).toBeVisible()
  })

  test('opens, persists, and closes settings from the navigation', async ({ page }) => {
    await page.goto('/browse')
    await page.getByRole('button', { name: 'Open settings' }).click()
    await expect(page.getByRole('dialog', { name: 'Settings' })).toBeVisible()
    await page.getByRole('button', { name: 'Catholic' }).click()
    await expect(page.getByRole('button', { name: 'Catholic' })).toHaveAttribute('aria-pressed', 'true')
    await expect(page.getByText('Bible passages will default to WEB')).toBeVisible()
    await expect.poll(() => page.evaluate(() => localStorage.getItem('are-settings'))).toContain('christianity-catholic')
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog', { name: 'Settings' })).toBeHidden()
    await page.reload()
    await page.getByRole('button', { name: 'Open settings' }).click()
    await expect(page.getByRole('button', { name: 'Catholic' })).toHaveAttribute('aria-pressed', 'true')
  })

  test('keeps the layout within a narrow viewport', async ({ page }) => {
    await page.goto('/browse')
    const dimensions = await page.evaluate(() => ({
      viewport: window.innerWidth,
      documentWidth: document.documentElement.scrollWidth,
    }))
    expect(dimensions.documentWidth).toBeLessThanOrEqual(dimensions.viewport + 1)
  })
})

test.describe('deterministic lookup states', () => {
  test('shows loading, error, retry, and copy-link success', async ({ page }) => {
    let attempts = 0
    let releaseFirstRequest: (() => void) | undefined
    const firstRequestFinished = new Promise<void>(resolve => { releaseFirstRequest = resolve })
    await page.route('https://bible-api.com/**', async route => {
      attempts += 1
      if (attempts === 1) {
        await firstRequestFinished
        await json(route, { error: 'fixture failure' }, 503)
      } else {
        await json(route, biblePassage('John 3:16', 'Retry succeeded passage.'))
      }
    })

    await page.goto('/lookup')
    await page.getByRole('button', { name: 'Christianity' }).click()
    await page.getByLabel('Reference').fill('john 3:16')
    await page.getByRole('button', { name: 'Look up passage' }).click()
    await expect(page.getByText('Fetching passage from API...')).toBeVisible()
    releaseFirstRequest?.()
    await expect(page.getByRole('alert')).toContainText('bible-api.com error 503')
    await page.getByRole('button', { name: 'Try again' }).click()
    await expect(page.getByText('Retry succeeded passage.')).toBeVisible()

    await page.getByRole('button', { name: 'Copy link' }).click()
    await expect(page.getByRole('button', { name: 'Copied!' })).toBeVisible()
  })

  test('does not let an older response replace a newer lookup', async ({ page }) => {
    let firstRequestResolve: (() => void) | undefined
    const firstRequestFinished = new Promise<void>(resolve => { firstRequestResolve = resolve })
    await page.route('https://bible-api.com/**', async route => {
      if (route.request().url().toLowerCase().includes('john%203%3a16')) {
        await firstRequestFinished
        await json(route, biblePassage('John 3:16', 'OLD response must not render.'))
      } else {
        await json(route, biblePassage('John 3:17', 'NEW response wins.'))
      }
    })
    await page.route('https://www.sefaria.org/**', route => json(route, {
      ref: 'Genesis 1:1',
      text: 'NEW response wins.',
      he: 'בראשית',
      sections: [1, 1],
      toSections: [1, 1],
    }))

    await page.goto('/lookup')
    await page.getByRole('button', { name: 'Christianity' }).click()
    await page.getByLabel('Reference').fill('john 3:16')
    await page.getByRole('button', { name: 'Look up passage' }).click()
    await expect(page.getByText('Fetching passage from API...')).toBeVisible()

    await page.getByRole('button', { name: 'Judaism' }).click()
    await page.getByLabel('Reference').fill('Genesis 1:1')
    await page.getByRole('button', { name: 'Look up passage' }).click()
    await expect(page.getByText('NEW response wins.')).toBeVisible()
    firstRequestResolve?.()
    await expect(page.getByText('OLD response must not render.')).toBeHidden()
  })
})

test.describe('deterministic compare and observance states', () => {
  test('shows compare loading, retry, and copy-link states', async ({ page }) => {
    let christianAttempts = 0
    let releaseFirstRequest: (() => void) | undefined
    const firstRequestFinished = new Promise<void>(resolve => { releaseFirstRequest = resolve })
    await page.route('https://bible-api.com/**', async route => {
      christianAttempts += 1
      if (christianAttempts === 1) {
        await firstRequestFinished
        await json(route, { error: 'compare failure' }, 503)
      } else {
        await json(route, biblePassage('Genesis 1:1', 'Christian retry passage.'))
      }
    })
    await page.route('https://www.sefaria.org/**', route => json(route, {
      ref: 'Genesis 1:1',
      text: 'Jewish compare passage.',
      he: 'עברית',
      sections: [1, 1],
      toSections: [1, 1],
    }))

    await page.goto('/compare')
    await page.getByRole('button', { name: 'Refresh all passages from live APIs' }).click()
    await expect(page.getByText('Fetching Christianity passage...')).toBeVisible()
    releaseFirstRequest?.()
    await expect(page.getByRole('alert')).toContainText('bible-api.com error 503')
    await page.getByRole('button', { name: 'Refresh Christianity passage from live API' }).click()
    await expect(page.getByText('Christian retry passage.')).toBeVisible()

    await page.getByRole('button', { name: 'Copy shareable link to this theme comparison' }).click()
    await expect(
      page.getByRole('button', { name: 'Copy shareable link to this theme comparison' })
    ).toHaveText('Copied!')
  })

  test('renders the calendar loading and empty states without live providers', async ({ page }) => {
    await page.unroute('https://www.hebcal.com/**')
    await page.unroute('https://api.aladhan.com/**')
    await page.route('https://www.hebcal.com/**', async route => {
      await new Promise(resolve => setTimeout(resolve, 100))
      await json(route, { title: 'Empty Hebcal fixture', items: [] })
    })
    await page.route('https://api.aladhan.com/**', async route => {
      await new Promise(resolve => setTimeout(resolve, 100))
      await json(route, { code: 200, status: 'OK', data: [] })
    })
    await page.goto('/observances')
    await expect(page.getByText(/Loading (Jewish and Islamic|Jewish|Islamic) holidays/)).toBeVisible()
    await expect(page.getByText('No events found for the selected filters.')).toBeVisible()
  })

  test('shows calendar provider errors while preserving local Christian dates', async ({ page }) => {
    await page.unroute('https://www.hebcal.com/**')
    await page.unroute('https://api.aladhan.com/**')
    await page.route('https://www.hebcal.com/**', route => route.abort())
    await page.route('https://api.aladhan.com/**', route => route.abort())
    await page.goto('/observances')
    await expect(page.getByText('Could not load Jewish holidays. Check your connection.')).toBeVisible()
    await expect(page.getByText('Could not load Islamic holidays. Check your connection.')).toBeVisible()
    const currentMonth = await page.evaluate(() => new Date().getMonth())
    for (let month = currentMonth; month < 11; month += 1) {
      await page.getByRole('button', { name: 'Next month' }).click()
    }
    await expect(page.locator('button[title="Christmas"]:visible').last()).toBeVisible()
  })
})