import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { PROGRAMMES, CAMPAIGNS, STORIES } from './src/data.js'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

// Every route is its own HTML file (true MPA). The list is derived from the
// same data the pages render, so a new programme/campaign/story gets its
// page automatically. Titles are per-page.
function routes() {
  const list = [
    { path: '/', title: 'BBDC — Beyond Boundaries for Development and Change' },
    { path: '/about', title: 'About — BBDC' },
    { path: '/programmes', title: 'Programmes — BBDC' },
    { path: '/campaigns', title: 'Campaigns — BBDC' },
    { path: '/donate', title: 'Donate — BBDC' },
    { path: '/celebrate', title: 'Celebrate With BBDC' },
    { path: '/stories', title: 'Stories — BBDC' },
    { path: '/blood', title: 'Blood Donor Network — BBDC' },
    { path: '/volunteer', title: 'Volunteer — BBDC' },
    { path: '/transparency', title: 'Transparency — BBDC' },
    { path: '/contact', title: 'Contact — BBDC' },
  ]
  for (const p of PROGRAMMES) list.push({ path: `/programmes/${p.slug}`, title: `${p.en} — BBDC` })
  for (const c of CAMPAIGNS) list.push({ path: `/campaigns/${c.slug}`, title: `${c.en} — BBDC` })
  for (const s of STORIES) list.push({ path: `/stories/${s.slug}`, title: `${s.en} — BBDC` })
  return list
}

// Generate the per-route HTML files from the index.html template. This runs
// when Vite loads the config, so `npm run build` needs no extra step, on
// this machine or in the GitHub Pages workflow.
function generatePages() {
  const template = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8')
  const input = {}
  for (const r of routes()) {
    const html = template.replace(/<title>[^<]*<\/title>/, `<title>${r.title}</title>`)
    const file = r.path === '/' ? 'index.html' : `${r.path.slice(1)}/index.html`
    const full = path.join(rootDir, file)
    fs.mkdirSync(path.dirname(full), { recursive: true })
    fs.writeFileSync(full, html)
    const key = r.path === '/' ? 'main' : r.path.slice(1).replace(/\//g, '-')
    input[key] = full
  }
  return input
}

const input = generatePages()

// base '/BBDC-Website/' so every page, at any depth, resolves the shared
// assets and links from the same absolute prefix on GitHub Pages.
export default defineConfig({
  plugins: [react()],
  base: '/BBDC-Website/',
  build: { rollupOptions: { input } },
})
