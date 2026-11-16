import { useEffect } from 'react'
import { SiteProvider } from './context.jsx'
import { Header, Footer, UtilityBar, BackToTop } from './components.jsx'
import { Home } from './pagesHome.jsx'
import { About, ProgrammesIndex, ProgrammeDetail, CampaignsIndex, CampaignDetail, DonatePage, BlogIndex, PostDetail, CelebratePage } from './pages1.jsx'
import { MediaPage, VolunteerPage, TransparencyPage, ContactPage } from './pages2.jsx'
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
    case 'blog': return <BlogIndex />
    case 'post': return <PostDetail slug={route.slug} />
    case 'media': return <MediaPage />
    case 'volunteer': return <VolunteerPage />
    case 'transparency': return <TransparencyPage />
    case 'contact': return <ContactPage />
    default: return <Home />
  }
}
function Shell() {
  const path = currentPath()
  const isHome = path === '/'
  // Motion: scroll-reveal only. The hidden state only exists after JS adds
  // .js to <html> (see index.css), so content is never hidden if JS or the
  // observer fails. The .reveal class is removed after the transition so
  // each card's own hover transition takes over.
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
      document.querySelectorAll('.band, .card, .prog-card, .camp-card, .story-card, .film-card, .side-card, .mini-card, .info-box, .fund-card, .take-option, .donate-panel, .zakat-card, .gift-card, .testi-card, .news-card, .partner-tile, .tl-item, .hero-pill, .hero-new h1, .hero-lead, .hero-cta, .newsletter-strip, .video-embed, .video-section, .video-player, .video-thumbs, .faq').forEach(el => { el.classList.add('reveal'); io.observe(el) })
      return () => { io.disconnect() }
    } catch { revealAll() }
  }, [])
  return <>
    <UtilityBar />
    <Header topBarH={40} />
    {!isHome && <div className="header-spacer" />}
    <main className="wrap"><Page /></main>
    <Footer />
    <BackToTop />
  </>
}
export default function App() {
  return <SiteProvider><Shell /></SiteProvider>
}
