import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, join, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const basePath = '/abrahamic-reference-engine'
const projectRoot = resolve(fileURLToPath(new URL('..', import.meta.url)))
const distRoot = resolve(projectRoot, 'dist')
const fallbackPath = join(distRoot, '404.html')
const port = Number(process.env.PORT ?? 4173)

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
}

function isWithinDist(filePath) {
  return filePath === distRoot || filePath.startsWith(`${distRoot}${sep}`)
}

async function isFile(filePath) {
  try {
    return (await stat(filePath)).isFile()
  } catch {
    return false
  }
}

const server = createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url ?? '/', `http://${request.headers.host ?? '127.0.0.1'}`)
    if (requestUrl.pathname !== basePath && !requestUrl.pathname.startsWith(`${basePath}/`)) {
      response.writeHead(404)
      response.end('Not found')
      return
    }

    const relativePath = requestUrl.pathname.slice(basePath.length)
    const requestedRelativePath = relativePath === '' || relativePath === '/'
      ? '/index.html'
      : relativePath
    const requestedPath = resolve(distRoot, `.${requestedRelativePath}`)
    const requestedFileExists = isWithinDist(requestedPath) && await isFile(requestedPath)
    const filePath = requestedFileExists ? requestedPath : fallbackPath

    response.writeHead(requestedFileExists ? 200 : 404, {
      'Content-Type': contentTypes[extname(filePath)] ?? 'application/octet-stream',
    })
    createReadStream(filePath).pipe(response)
  } catch {
    response.writeHead(500)
    response.end('Preview server error')
  }
})

server.listen(port, '127.0.0.1', () => {
  console.log(`GitHub Pages preview listening on http://127.0.0.1:${port}${basePath}/`)
})