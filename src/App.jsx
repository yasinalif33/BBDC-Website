import { useEffect } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { SiteProvider } from './context.jsx'
import { Header, Footer } from './components.jsx'
import { Home, About, ProgrammesIndex, ProgrammeDetail, CampaignsIndex, CampaignDetail, DonatePage, StoriesIndex, StoryDetail } from './pages1.jsx'
import { BloodPage, VolunteerPage, TransparencyPage, ContactPage } from './pages2.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}
export default function App() {
  return <SiteProvider><HashRouter><ScrollToTop /><Header /><main className="wrap"><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/programmes" element={<ProgrammesIndex />} />
    <Route path="/programmes/:slug" element={<ProgrammeDetail />} />
    <Route path="/campaigns" element={<CampaignsIndex />} />
    <Route path="/campaigns/:slug" element={<CampaignDetail />} />
    <Route path="/donate" element={<DonatePage />} />
    <Route path="/stories" element={<StoriesIndex />} />
    <Route path="/stories/:slug" element={<StoryDetail />} />
    <Route path="/blood" element={<BloodPage />} />
    <Route path="/volunteer" element={<VolunteerPage />} />
    <Route path="/transparency" element={<TransparencyPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="*" element={<Home />} />
  </Routes></main><Footer /></HashRouter></SiteProvider>
}
