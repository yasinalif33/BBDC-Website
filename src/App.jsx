import { useEffect, useState } from 'react'
import { SiteProvider } from './context.jsx'
import { Header, Footer, AnnouncementBar, BackToTop } from './components.jsx'
import { Home } from './pagesHome.jsx'
import { About, ProgrammesIndex, ProgrammeDetail, CampaignsIndex, CampaignDetail, DonatePage, StoriesIndex, StoryDetail, CelebratePage } from './pages1.jsx'
import { BloodPage, VolunteerPage, TransparencyPage, ContactPage } from './pages2.jsx'
import { currentPath, matchRoute } from './site.js'

// True MPA: each URL is its own HTML file served by GitHub Pages, and the
// browser does a full page load. The bundle only decides which page
// component to mount for this file's URL. No router, no "#" in links.
function Page() {
  const route = matchRoute(currentPath())
  switch (route.page) {
    case 'home': return <Home />
    case 'about': return <About />
    case 'programmes': return <ProgrammesIndex />
    case 'programme': return <ProgrammeDetail slug={route.slug} />
    case 'campaigns': return <CampaignsIndex />
    case 'campaign': return <CampaignDetail slug={route.slug} />
    case 'donate': return <DonatePage />
    case 'celebrate': return <CelebratePage />
    case 'stories': return <StoriesIndex />
    case 'story': return <StoryDetail slug={route.slug} />
    case 'blood': return <BloodPage />
    case 'volunteer': return <VolunteerPage />
    case 'transparency': return <TransparencyPage />
    case 'contact': return <ContactPage />
    default: return <Home />
  }
}
function Shell() {
  const path = currentPath()
  const isHome = path === '/'
  const [showAnnounce, setShowAnnounce] = useState(true)
  const announceH = showAnnounce ? 40 : 0
  // Motion: scroll-reveal + stat count-up. The hidden state only exists
  // after JS adds .js to <html> (see index.css), so content is never
  // hidden if JS or the observer fails. The .reveal class is removed
  // after the transition so each card's own hover transition takes over.
  useEffect(() => {
    const root = document.documentElement
    root.classList.add('js')
    const revealAll = () => document.querySelectorAll('.reveal').forEach(el => el.classList.add('in-view'))
    try {
      if (!('IntersectionObserver' in window)) { revealAll(); return }
      const io = new IntersectionObserver((entries) => {
        entries.forEach(en => {
          if (!en.isIntersecting) return
          const el = en.target
          el.classList.add('in-view')
          io.unobserve(el)
          setTimeout(() => el.classList.remove('reveal'), 850)
        })
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })
      document.querySelectorAll('.band, .stat-strip, .card, .prog-card, .camp-card, .story-card, .ways-card, .way-tile, .voices-card, .donate-panel, .zakat-card, .before-card, .plain-facts, .vol-art, .tl-item, .stat-item, .section, .hero-pill, .hero-new h1, .hero-lead, .hero-cta, .hero-art, .newsletter-strip, .video-embed, .faq').forEach(el => { el.classList.add('reveal'); io.observe(el) })
      // Stat count-up: numbers start at their final value in the HTML
      // (so no-JS shows the real figure) and animate from 0 on first view.
      const cio = new IntersectionObserver((entries) => {
        entries.forEach(en => {
          if (!en.isIntersecting) return
          const el = en.target
          cio.unobserve(el)
          const target = Number(el.dataset.count || 0)
          const t0 = performance.now()
          const tick = (now) => {
            const p = Math.min(1, (now - t0) / 1200)
            el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        })
      }, { threshold: 0.4 })
      document.querySelectorAll('[data-count]').forEach(el => cio.observe(el))
      return () => { io.disconnect(); cio.disconnect() }
    } catch { revealAll() }
  }, [])
  return <>
    {showAnnounce && <AnnouncementBar onClose={() => setShowAnnounce(false)} />}
    <Header overlay={isHome} announceH={announceH} />
    {!isHome && <div className="header-spacer" />}
    <main className="wrap"><Page /></main>
    <Footer />
    <BackToTop />
  </>
}
export default function App() {
  return <SiteProvider><Shell /></SiteProvider>
}
