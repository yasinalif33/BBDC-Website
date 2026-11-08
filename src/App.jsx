import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { SiteProvider } from './context.jsx'
import { Header, Footer, AnnouncementBar } from './components.jsx'
import { Home } from './pagesHome.jsx'
import { About, ProgrammesIndex, ProgrammeDetail, CampaignsIndex, CampaignDetail, DonatePage, StoriesIndex, StoryDetail, CelebratePage } from './pages1.jsx'
import { BloodPage, VolunteerPage, TransparencyPage, ContactPage } from './pages2.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}
function GsapAnimations() {
  const { pathname } = useLocation()
  useEffect(() => {
    const gsap = window.gsap
    if (!gsap || !window.ScrollTrigger) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    gsap.registerPlugin(window.ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from('.hero-video-inner > *', { y: 30, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12, clearProps: 'all' })
      gsap.utils.toArray('.gsap-item').forEach(el => {
        gsap.from(el, { y: 28, opacity: 0, duration: 0.8, ease: 'power3.out', clearProps: 'all', scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
      })
    })
    return () => ctx.revert()
  }, [pathname])
  return null
}
function Shell() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [showAnnounce, setShowAnnounce] = useState(true)
  const announceH = showAnnounce ? 40 : 0
  return <>
    {showAnnounce && <AnnouncementBar onClose={() => setShowAnnounce(false)} />}
    <Header overlay={isHome} announceH={announceH} />
    {!isHome && <div className="header-spacer" />}
    <main className="wrap"><Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/programmes" element={<ProgrammesIndex />} />
      <Route path="/programmes/:slug" element={<ProgrammeDetail />} />
      <Route path="/campaigns" element={<CampaignsIndex />} />
      <Route path="/campaigns/:slug" element={<CampaignDetail />} />
      <Route path="/donate" element={<DonatePage />} />
      <Route path="/celebrate" element={<CelebratePage />} />
      <Route path="/stories" element={<StoriesIndex />} />
      <Route path="/stories/:slug" element={<StoryDetail />} />
      <Route path="/blood" element={<BloodPage />} />
      <Route path="/volunteer" element={<VolunteerPage />} />
      <Route path="/transparency" element={<TransparencyPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<Home />} />
    </Routes></main>
    <Footer />
  </>
}
export default function App() {
  return <SiteProvider><HashRouter><ScrollToTop /><GsapAnimations /><Shell /></HashRouter></SiteProvider>
}
