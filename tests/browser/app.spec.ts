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

const primaryRoutes = [
  ['/browse', 'Browse Traditions'],
  ['/lookup', 'Verse Lookup'],
  ['/compare', 'Cross-Tradition Compare'],
  ['/observances', 'Observances'],
  ['/skills', 'Agent Skills'],
  ['/origin', 'Origin Archive'],
] as const

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
  const hostedOrigin = process.env.PLAYWRIGHT_HOSTED === 'true' && process.env.PLAYWRIGHT_BASE_URL
    ? new URL(process.env.PLAYWRIGHT_BASE_URL).origin
    : null
  await page.route('https://**/*', route => {
    if (hostedOrigin && new URL(route.request().url()).origin === hostedOrigin) {
      return route.continue()
    }
    return route.abort()
  })
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
      await expect(page.getByTestId('route-announcement')).toHaveText(`${heading} page`)
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

test.describe('keyboard, focus, zoom, and motion accessibility', () => {
  test.use({ reducedMotion: 'reduce' })

  test('keeps keyboard focus visible on every primary route at 200% zoom', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    for (const [path, heading] of primaryRoutes) {
      await page.goto(path)
      await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible()
      await page.evaluate(() => {
        document.documentElement.style.zoom = '200%'
      })
      expect(await page.evaluate(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true)
      await expect.poll(() => page.evaluate(() => document.documentElement.style.zoom)).toBe('200%')

      const focusableCount = await page.locator(
        'a[href], button, input, select, textarea, summary, [tabindex]:not([tabindex="-1"])',
      ).count()
      const tabsToCheck = Math.min(focusableCount, 12)
      expect(tabsToCheck).toBeGreaterThan(0)

      for (let tab = 0; tab < tabsToCheck; tab += 1) {
        await page.keyboard.press('Tab')
        const focused = page.locator(':focus-visible')
        await expect(focused).toHaveCount(1)
        await focused.scrollIntoViewIfNeeded()
        await expect(focused).toBeVisible()
        const focusStyle = await focused.evaluate(element => {
          const style = window.getComputedStyle(element)
          return { outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth }
        })
        expect(focusStyle.outlineStyle).not.toBe('none')
        expect(focusStyle.outlineWidth).not.toBe('0px')
      }
    }
  })

  test('opens, uses, and closes settings without a pointer', async ({ page }) => {
    await page.goto('/browse')
    const settingsButton = page.getByRole('button', { name: 'Open settings' })
    await settingsButton.focus()
    await page.keyboard.press('Enter')

    const dialog = page.getByRole('dialog', { name: 'Settings' })
    await expect(dialog).toBeVisible()
    await expect(page.getByRole('button', { name: 'Close settings' })).toBeFocused()
    await page.getByRole('button', { name: 'Catholic' }).focus()
    await page.keyboard.press('Enter')
    await expect(page.getByRole('button', { name: 'Catholic' })).toHaveAttribute('aria-pressed', 'true')
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(settingsButton).toBeFocused()
  })

  test('opens, uses, and closes mobile navigation without a pointer', async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 0) >= 768, 'Mobile navigation is hidden on desktop')
    await page.goto('/browse')

    const openButton = page.getByRole('button', { name: 'Open navigation' })
    await openButton.focus()
    await page.keyboard.press('Enter')
    const sidebar = page.getByRole('complementary', { name: 'Tradition navigation' })
    const closeButton = page.getByRole('button', { name: 'Close navigation' })
    await expect(closeButton).toBeFocused()

    await sidebar.getByRole('link', { name: /Catholic/ }).first().focus()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/browse\/catholic$/)

    await openButton.focus()
    await page.keyboard.press('Enter')
    await expect(closeButton).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(sidebar).toBeHidden()
    await expect(openButton).toBeFocused()
  })
})

test.describe('deterministic lookup states', () => {
  test('keeps phrase discovery states visible and preserves source links after choosing a candidate', async ({ page }) => {
    await page.route('https://www.sefaria.org/**', route => json(route, {
      ref: 'Genesis 1:1',
      heRef: 'בראשית א:א',
      text: 'Sefaria fixture passage.',
      he: 'בראשית',
      book: 'Genesis',
      categories: ['Tanakh'],
      type: 'Tanakh',
      sections: [1, 1],
      toSections: [1, 1],
    }))

    await page.goto('/lookup')
    const phraseInput = page.getByRole('textbox', { name: 'Phrase' })
    const searchButton = page.getByRole('button', { name: 'Search quotations' })
    const results = page.getByTestId('phrase-discovery-results')

    await phraseInput.fill('zzzz phrase not present')
    await searchButton.click()
    await expect(results.getByRole('heading', { name: 'No source match' })).toBeVisible()

    await phraseInput.fill('In the beginning God created')
    await searchButton.click()
    await expect(results.getByRole('heading', { name: 'One source match' })).toBeVisible()
    await expect(results).toContainText('Genesis 1:1')

    await phraseInput.fill('In the beginning')
    await searchButton.click()
    await expect(results.getByRole('heading', { name: '2 source candidates' })).toBeVisible()
    await expect(results).toContainText('Ambiguity: multiple candidates')

    const genesisCandidate = results.locator('article').filter({ hasText: 'Genesis 1:1' }).first()
    await genesisCandidate.getByRole('button', { name: 'Use exact reference' }).click()

    await expect(page.getByLabel('Reference')).toHaveValue('Genesis 1:1')
    await expect(page.getByRole('article', { name: 'Verse: Genesis 1:1' })).toContainText('Sefaria fixture passage.')
    const genesisSourceLinks = page.getByRole('link', { name: 'Open Genesis 1:1 on source website' })
    await expect(genesisSourceLinks).toHaveCount(2)
    await expect(genesisSourceLinks.first()).toHaveAttribute(
      'href',
      'https://www.sefaria.org/Genesis%201%3A1?lang=bi',
    )
  })

  test('restores phrase candidates and source links from a shared lookup URL after reload', async ({ page }) => {
    const sharedLookupUrl = '/lookup?tradition=judaism&phrase=In%20the%20beginning'
    await page.goto(sharedLookupUrl)

    const results = page.getByTestId('phrase-discovery-results')
    const sourceLinks = results.getByRole('link', { name: /Open .* on source website/ })

    await expect(results).toBeVisible()
    await expect(results.getByRole('heading', { name: '2 source candidates' })).toBeVisible()
    await expect(results).toContainText('Ambiguity: multiple candidates')
    await expect(sourceLinks).toHaveCount(2)

    await page.reload()

    await expect(page).toHaveURL(/\/lookup\?tradition=judaism&phrase=In\+the\+beginning$/)
    await expect(results).toBeVisible()
    await expect(results.getByRole('heading', { name: '2 source candidates' })).toBeVisible()
    await expect(results).toContainText('Ambiguity: multiple candidates')
    await expect(sourceLinks).toHaveCount(2)
    await expect(sourceLinks.first()).toHaveAttribute(
      'href',
      'https://www.sefaria.org/Genesis%201%3A1?lang=bi',
    )
  })

  test('GitHub Pages shared lookup route survives direct navigation and hard reload', async ({ page }) => {
    test.skip(test.info().project.name !== 'pages', 'Production base-path check runs in the Pages project')

    // This runs against the production build. Direct navigation models GitHub Pages
    // serving the copied 404.html SPA fallback for a URL below the repository base.
    const sharedLookupUrl =
      '/abrahamic-reference-engine/lookup?tradition=judaism&phrase=In%20the%20beginning'
    const initialResponse = await page.goto(sharedLookupUrl)
    expect([200, 404]).toContain(initialResponse?.status())

    const results = page.getByTestId('phrase-discovery-results')
    const sourceLinks = results.getByRole('link', { name: /Open .* on source website/ })

    const assertPublishedLookupUrl = async () => {
      await expect.poll(() => page.evaluate(() => {
        const url = new URL(window.location.href)
        return {
          pathname: url.pathname,
          tradition: url.searchParams.get('tradition'),
          phrase: url.searchParams.get('phrase'),
        }
      })).toEqual({
        pathname: '/abrahamic-reference-engine/lookup',
        tradition: 'judaism',
        phrase: 'In the beginning',
      })
    }

    await assertPublishedLookupUrl()
    await expect(results.getByRole('heading', { name: '2 source candidates' })).toBeVisible()
    await expect(results).toContainText('Ambiguity: multiple candidates')
    const candidateCards = results.locator('article')
    await expect(candidateCards).toHaveCount(2)
    await expect(candidateCards.nth(0)).toBeVisible()
    await expect(candidateCards.nth(1)).toBeVisible()
    await expect(results).toContainText('Genesis 1:1')
    await expect(results).toContainText('John 1:1-3')
    await expect(sourceLinks).toHaveCount(2)
    await expect(sourceLinks.nth(0)).toBeVisible()
    await expect(sourceLinks.nth(1)).toBeVisible()

    const reloadResponse = await page.reload()
    expect([200, 404]).toContain(reloadResponse?.status())

    await assertPublishedLookupUrl()
    await expect(results.getByRole('heading', { name: '2 source candidates' })).toBeVisible()
    await expect(results).toContainText('Ambiguity: multiple candidates')
    await expect(candidateCards).toHaveCount(2)
    await expect(candidateCards.nth(0)).toBeVisible()
    await expect(candidateCards.nth(1)).toBeVisible()
    await expect(results).toContainText('Genesis 1:1')
    await expect(results).toContainText('John 1:1-3')
    await expect(sourceLinks).toHaveCount(2)
    await expect(sourceLinks.nth(0)).toBeVisible()
    await expect(sourceLinks.nth(1)).toBeVisible()
    await expect(sourceLinks.first()).toHaveAttribute(
      'href',
      'https://www.sefaria.org/Genesis%201%3A1?lang=bi',
    )
  })

  test('GitHub Pages public routes survive direct navigation and hard reload', async ({ page }) => {
    test.skip(test.info().project.name !== 'pages', 'Production base-path check runs in the Pages project')

    const publicRoutes = [
      ['/abrahamic-reference-engine/browse', 'Browse Traditions', 'Browse Traditions page'],
      ['/abrahamic-reference-engine/lookup', 'Verse Lookup', 'Verse Lookup page'],
      ['/abrahamic-reference-engine/compare', 'Cross-Tradition Compare', 'Cross-Tradition Compare page'],
      ['/abrahamic-reference-engine/observances', 'Observances', 'Observances page'],
      ['/abrahamic-reference-engine/skills', 'Agent Skills', 'Agent Skills page'],
      ['/abrahamic-reference-engine/origin', 'Origin Archive', 'Origin Archive page'],
      ['/abrahamic-reference-engine/browse/catholic', 'Catholic', 'Tradition details page'],
    ] as const

    for (const [path, heading, announcement] of publicRoutes) {
      const initialResponse = await page.goto(path)
      expect([200, 404]).toContain(initialResponse?.status())
      await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible()
      await expect(page.getByTestId('route-announcement')).toHaveText(announcement)

      const reloadResponse = await page.reload()
      expect([200, 404]).toContain(reloadResponse?.status())
      await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible()
      await expect(page.getByTestId('route-announcement')).toHaveText(announcement)
    }
  })

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
    await expect(page.getByTestId('lookup-announcement')).toContainText('Loading Christianity passage')
    releaseFirstRequest?.()
    await expect(page.getByRole('alert')).toContainText('bible-api.com error 503')
    await expect(page.getByTestId('lookup-announcement')).toContainText('Christianity passage could not be loaded')
    await page.getByRole('button', { name: 'Try again' }).click()
    await expect(page.getByText('Retry succeeded passage.')).toBeVisible()
    await expect(page.getByTestId('lookup-announcement')).toContainText('Christianity passage loaded')

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
    await expect(page.getByTestId('compare-announcement')).toContainText('Loading Christianity, Islam, and Judaism')
    releaseFirstRequest?.()
    await expect(page.getByRole('alert')).toContainText('bible-api.com error 503')
    await expect(page.getByTestId('compare-announcement')).toContainText('Christianity passage could not be loaded')
    await page.getByRole('button', { name: 'Refresh Christianity passage from live API' }).click()
    await expect(page.getByText('Christian retry passage.')).toBeVisible()
    await expect(page.getByTestId('compare-announcement')).toContainText('Christianity passage loaded')

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
    await expect(page.getByTestId('observances-announcement')).toContainText('Loading')
    await expect(page.getByText('No events found for the selected filters.')).toBeVisible()
    await expect(page.getByTestId('observances-announcement')).toContainText('Loaded')
  })

  test('shows calendar provider errors while preserving local Christian dates', async ({ page }) => {
    await page.unroute('https://www.hebcal.com/**')
    await page.unroute('https://api.aladhan.com/**')
    await page.route('https://www.hebcal.com/**', route => route.abort())
    await page.route('https://api.aladhan.com/**', route => route.abort())
    await page.goto('/observances')
    await expect(page.getByText('Could not load Jewish holidays. Check your connection.')).toBeVisible()
    await expect(page.getByText('Could not load Islamic holidays. Check your connection.')).toBeVisible()
    await expect(page.getByRole('alert')).toContainText('Could not load Jewish holidays')
    await expect(page.getByRole('alert')).toContainText('Could not load Islamic holidays')
    const currentMonth = await page.evaluate(() => new Date().getMonth())
    for (let month = currentMonth; month < 11; month += 1) {
      await page.getByRole('button', { name: 'Next month' }).click()
    }
    await expect(page.locator('button[title="Christmas"]:visible').last()).toBeVisible()
  })
})