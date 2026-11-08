import { useState } from 'react'
import { SiteProvider } from './context.jsx'
import { Header, Footer, AnnouncementBar } from './components.jsx'
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
  return <>
    {showAnnounce && <AnnouncementBar onClose={() => setShowAnnounce(false)} />}
    <Header overlay={isHome} announceH={announceH} />
    {!isHome && <div className="header-spacer" />}
    <main className="wrap"><Page /></main>
    <Footer />
  </>
}
export default function App() {
  return <SiteProvider><Shell /></SiteProvider>
}
