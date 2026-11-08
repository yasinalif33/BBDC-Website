// MPA helpers: the site is a true multi-page app. Every route is its own
// HTML file under the GitHub Pages base path, and every link is a plain
// <a href> to one of those files. No hash router, no "#" in URLs.
export const SITE_BASE = '/BBDC-Website'

export function hrefFor(path, query) {
  const clean = path === '/' ? '/' : path.replace(/\/$/, '') + '/'
  const url = SITE_BASE + clean
  if (!query) return url
  const q = new URLSearchParams(query).toString()
  return url + '?' + q
}

export function currentPath() {
  let p = window.location.pathname
  if (p.startsWith(SITE_BASE)) p = p.slice(SITE_BASE.length)
  if (!p) p = '/'
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1)
  return p || '/'
}

export function currentFund() {
  return new URLSearchParams(window.location.search).get('fund')
}

export function currentGroup() {
  return new URLSearchParams(window.location.search).get('group')
}

const STATIC_PAGES = new Set([
  '/', '/about', '/programmes', '/campaigns', '/donate', '/celebrate',
  '/stories', '/blood', '/volunteer', '/transparency', '/contact',
])

export function matchRoute(path) {
  if (STATIC_PAGES.has(path)) return { page: path === '/' ? 'home' : path.slice(1) }
  const parts = path.split('/').filter(Boolean)
  if (parts.length === 2 && parts[0] === 'programmes') return { page: 'programme', slug: parts[1] }
  if (parts.length === 2 && parts[0] === 'campaigns') return { page: 'campaign', slug: parts[1] }
  if (parts.length === 2 && parts[0] === 'stories') return { page: 'story', slug: parts[1] }
  return { page: 'home' }
}
