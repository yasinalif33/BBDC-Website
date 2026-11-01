# BBDC Website

BBDC — **Beyond Boundaries for Development and Change** — a volunteer organisation in Barishal, Bangladesh, founded in 2012 as the Barishal Blood Donors Club and rebranded in 2025.

This is a complete React.js (Vite) frontend for the new BBDC website. It replaces the old WordPress/Elementor site in design, with a multi-page structure, a prominent donation flow, a blood-donor network, volunteer sign-up, and English/Bengali language support.

**Live site (after deployment):** https://yasinalif33.github.io/BBDC-Website/

## Run locally

```bash
npm install
npm run dev
```

Then open the local address printed by Vite (usually http://localhost:5173).

## Build

```bash
npm run build
```

The production output is in `dist/`.

## Deploy to GitHub Pages

This repo ships a GitHub Actions workflow at `.github/workflows/deploy.yml`. It builds the site and deploys it to GitHub Pages.

**Important — one manual step in the repo:** in the GitHub repository, go to **Settings → Pages** and set **Source: GitHub Actions**. Without this, the workflow cannot publish, and the Pages URL above will not update.

The workflow uses `npm ci` + `npm run build`, then `upload-pages-artifact` and `deploy-pages`, with `pages: write`, `id-token: write` and `contents: read` permissions.

The site uses Vite `base: './'` and React Router `HashRouter`, so routes work on GitHub Pages without server rewrites.

## Notes and honesty labels

- **Frontend only:** online payment is not live yet in this frontend. Payment options (bKash, Nagad, Rocket, SSLCommerz, bank) are shown in the UI only, with a plain note on the Donate page and wherever payment appears: it activates in the backend phase.
- **Figures:** campaign goals, raised totals, unit costs and the fund-direction breakdown are labelled **“Illustrative preview figures”** until BBDC confirms real figures. No invented totals (such as 200+/300+ volunteers/projects) are claimed.
- **Photos:** images are representative Unsplash photos, captioned as such, with an on-error fallback to a solid colour so a broken image never breaks the layout. They should be replaced with BBDC’s own archive photos before launch.
- **No invented facts:** no registration number, audited totals, partner logos, staff names or testimonials are claimed on this site.
