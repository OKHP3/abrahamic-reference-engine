import assert from 'node:assert/strict'
import fs from 'node:fs'

const base = '/abrahamic-reference-engine/'
const indexPath = 'dist/index.html'
const manifestPath = 'dist/site.webmanifest'

assert.ok(fs.existsSync(indexPath), `Missing ${indexPath}; run npm run build first.`)
assert.ok(fs.existsSync(manifestPath), `Missing ${manifestPath}; run npm run build first.`)

const index = fs.readFileSync(indexPath, 'utf8')
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))

for (const asset of [
  'favicon.svg',
  'favicon-32x32.png',
  'favicon-16x16.png',
  'apple-touch-icon.png',
  'site.webmanifest',
]) {
  assert.match(index, new RegExp(`${base}${asset.replace('.', '\\.')}`), `Pages base missing for ${asset}`)
}

assert.doesNotMatch(index, /(?:href|src)="\/(?:favicon|apple-touch|site\.webmanifest)/)
assert.doesNotMatch(index, /src="\/src\/main\.tsx"/)
assert.equal(manifest.start_url, '.')
for (const icon of manifest.icons) {
  assert.ok(!icon.src.startsWith('/'), `Manifest icon must remain relative: ${icon.src}`)
}

console.log(`GitHub Pages artifact paths OK for ${base}`)