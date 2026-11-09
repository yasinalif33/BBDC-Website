import { useEffect, useRef, useState } from 'react'
import { useSite, pick } from './context.jsx'
import { UI, FUNDS, LOGO_URL, REGISTRATION, SOCIALS, PARTNERS } from './data.js'
import { hrefFor, currentPath } from './site.js'

export function Icon({ name, size = 20 }) {
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', width: size, height: size, viewBox: '0 0 24 24', 'aria-hidden': true }
  const paths = {
    heart: <><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" /></>,
    drop: <><path d="M12 2.7s6.5 7 6.5 11.3a6.5 6.5 0 1 1-13 0C5.5 9.7 12 2.7 12 2.7z" /></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z" /><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" /></>,
    hand: <><path d="M18 11V6a2 2 0 0 0-4 0v5M14 10V4a2 2 0 0 0-4 0v6M10 10a2 2 0 0 0-4 0v7a6 6 0 0 0 6 6h1a6 6 0 0 0 6-6v-4a2 2 0 0 0-4 0" /></>,
    leaf: <><path d="M11 20A7 7 0 0 1 4 13c0-4 3-9 16-9-1 13-5 16-9 16z" /><path d="M4 21c4-6 8-10 12-12" /></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    food: <><path d="M3 11h18M4 11v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9M8 11V7M12 11V7M16 11V7" /></>,
    share: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
    moon: <><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" /></>,
    menu: <><path d="M3 6h18M3 12h18M3 18h18" /></>,
    close: <><path d="M18 6L6 18M6 6l12 12" /></>,
    chev: <><path d="M6 9l6 6 6-6" /></>,
    check: <><path d="M20 6L9 17l-5-5" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 6l-10 7L2 6" /></>,
    phone: <><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z" /></>,
    pin: <><path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>,
    facebook: <><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></>,
    instagram: <><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></>,
    youtube: <><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></>,
    x: <><path d="M4 4l16 16M20 4L4 20" /></>,
    up: <><path d="M12 19V5M5 12l7-7 7 7" /></>,
    quote: <><path d="M10 7.5C7.5 8.5 5.5 11 5.5 14v4.5h5V13H8c.3-2 1.2-3.5 2.5-4.5V7.5zm9 0c-2.5 1-4.5 3.5-4.5 6.5v4.5h5V13h-2.5c.3-2 1.2-3.5 2.5-4.5V7.5z" /></>,
  }
  return <svg {...p}>{paths[name] || paths.heart}</svg>
}
export function SmartImage({ src, alt = '', className = '', style }) {
  const [err, setErr] = useState(false)
  if (err) return <div className="img-fallback" style={style}>{alt || 'BBDC'}</div>
  return <img src={src} alt={alt} className={className} style={style} onError={() => setErr(true)} loading="lazy" />
}
export function t(ui, lang) { return UI[lang] || UI.en }
export function AnnouncementBar({ onClose }) {
  const { lang } = useSite()
  return <div className="announce-bar"><span>{lang === 'bn' ? 'বরিশালের একটি পরিবারের জন্য খাদ্য প্যাকের দাম ৳১,০০০।' : 'A food pack for a family in Barishal costs ৳1,000.'}</span><a href={hrefFor('/donate')}>{lang === 'bn' ? 'দান করুন' : 'Donate now'} →</a><button className="announce-close" aria-label="Dismiss" onClick={onClose}>×</button></div>
}
export function Header({ overlay = true, announceH = 0 }) {
  const { lang, setLang } = useSite()
  const u = t(null, lang)
  const [mobile, setMobile] = useState(false); const [open, setOpen] = useState(null)
  const [stuck, setStuck] = useState(false)
  const closeTimer = useRef(null)
  // Closing on mouse-leave waits 150ms: a diagonal move from the chevron to
  // a panel link briefly leaves the menu, and the delay lets the pointer
  // reach the panel before anything closes. Re-entering cancels the close.
  const cancelClose = () => { if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null } }
  const scheduleClose = () => { cancelClose(); closeTimer.current = setTimeout(() => setOpen(null), 150) }
  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current) }, [])
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > Math.max(10, announceH))
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [announceH])
  // Clicking anywhere outside a dropdown closes it (touch users have no hover).
  useEffect(() => {
    const close = (e) => { if (!e.target.closest('.dropdown')) setOpen(null) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])
  const closeAll = () => { setMobile(false); setOpen(null) }
  const path = currentPath()
  const link = (to, label) => <a key={to} href={hrefFor(to)} className={path === to ? 'active' : ''}>{label}</a>
  // Like SNDC: the label itself is a real link to the section page, and only
  // the small chevron button opens the dropdown. Clicking the label always navigates.
  // The chevron always OPENS (never toggles closed): hovering already opens the
  // menu, so a toggle would close it again on the same click.
  const drop = (key, label, to, items) => (
    <div className={`dropdown ${open === key ? 'open' : ''}`} onMouseEnter={() => { cancelClose(); setOpen(key) }} onMouseLeave={() => scheduleClose()}>
      <a className={`navlink ${items.some(i => i.to === path) ? 'active' : ''}`} href={hrefFor(to)}>{label}</a>
      <button type="button" className="nav-dd-toggle" aria-expanded={open === key} aria-haspopup="true" aria-label={`Show ${label} menu`} onClick={() => setOpen(key)}><Icon name="chev" size={14} /></button>
      <div className="dropdown-panel">{items.map(i => <a key={i.to} href={hrefFor(i.to)}>{i.label}</a>)}</div>
    </div>
  )
  return (
    <div className={`site-header-bar ${stuck ? 'stuck' : ''}`} style={{ top: stuck ? 0 : announceH }}>
      <div className="container-x"><header className="nav-card">
        <a href={hrefFor('/')} className="logo" aria-label="BBDC home"><img src={LOGO_URL} alt="BBDC - Beyond Boundaries for Development and Change" className="logo-img" onError={e => { e.currentTarget.style.display = 'none'; const t = e.currentTarget.nextSibling; if (t) t.style.display = 'inline' }} /><span className="logo-text">BBDC</span></a>
        <nav className="main" aria-label="Main">
          <div className="nav-pill">
            {link('/', u.home)}
            {drop('about', u.about, '/about', [{ to: '/about', label: u.about }, { to: '/transparency', label: u.transparency }])}
            {drop('work', u.ourWork, '/programmes', [{ to: '/programmes', label: u.programmes }, { to: '/campaigns', label: u.campaigns }, { to: '/stories', label: u.stories }])}
            {drop('involved', u.getInvolved, '/volunteer', [{ to: '/volunteer', label: u.volunteer }, { to: '/blood', label: u.blood }, { to: '/celebrate', label: u.celebrate }])}
            {link('/contact', u.contact)}
          </div>
        </nav>
        <div className="actions">
          <button className="langbtn" aria-label="Toggle language" onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}>{lang === 'en' ? <><b>EN</b> / বাং</> : <>EN / <b>বাং</b></>}</button>
          <a href={hrefFor('/volunteer')} className="btn btn-secondary btn-sm" style={{ display: 'inline-flex' }}>{lang === 'bn' ? 'যোগ দিন' : 'Join us'}</a>
          <a href={hrefFor('/donate')} className="btn btn-primary btn-sm">{u.donate}</a>
          <button className="iconbtn burger" aria-label="Menu" onClick={() => setMobile(!mobile)}><Icon name={mobile ? 'close' : 'menu'} /></button>
        </div>
      </header>
      <div className={`mobile-menu ${mobile ? 'open' : ''}`}>
        <div style={{ display: 'flex', gap: 10 }}><a href={hrefFor('/donate')} className="btn btn-primary" style={{ flex: 1 }}>{u.donate}</a><a href={hrefFor('/volunteer')} className="btn btn-secondary" style={{ flex: 1 }}>{u.join}</a></div>
        <div style={{ marginTop: 10 }}><button onClick={() => { setLang(lang === 'en' ? 'bn' : 'en') }}>{lang === 'en' ? 'বাংলা' : 'English'}</button></div>
        {[['/', u.home], ['/about', u.about], ['/transparency', u.transparency], ['/programmes', u.programmes], ['/campaigns', u.campaigns], ['/stories', u.stories], ['/volunteer', u.volunteer], ['/blood', u.blood], ['/celebrate', u.celebrate], ['/contact', u.contact]].map(([to, l]) => <a key={to} href={hrefFor(to)}>{l}</a>)}
        <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid #ebebeb', fontSize: 13, color: '#535558', textAlign: 'center' }}><div className="social-row" style={{ justifyContent: 'center' }}>{SOCIALS.map(s => <a key={s.id} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} title={s.label}><Icon name={s.id} size={18} /></a>)}</div><p style={{ marginTop: 12 }}>{REGISTRATION}</p></div>
      </div>
      </div>
    </div>
  )
}
export function Footer() {
  const { lang } = useSite(); const u = t(null, lang); const en = lang !== 'bn'
  return <footer className="site"><div className="wrap footgrid">
    <div><div className="logo"><img src={LOGO_URL} alt="BBDC - Beyond Boundaries for Development and Change" className="logo-img foot-logo" onError={e => { e.currentTarget.style.display = 'none' }} /></div><p className="muted" style={{ marginTop: 16 }}>{en ? 'A volunteer organisation in Barishal, Bangladesh, since 2012.' : 'বরিশালের একটি স্বেচ্ছাসেবী সংগঠন, ২০১২ সাল থেকে।'}</p><a href={hrefFor('/donate')} className="btn btn-primary btn-sm" style={{ marginTop: 8 }}>{u.donate}</a><div className="social-row">{SOCIALS.map(s => <a key={s.id} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} title={s.label}><Icon name={s.id} size={18} /></a>)}</div></div>
    <div><b>{en ? 'Explore' : 'ঘুরে দেখুন'}</b><a href={hrefFor('/about')}>{u.about}</a><a href={hrefFor('/programmes')}>{u.programmes}</a><a href={hrefFor('/campaigns')}>{u.campaigns}</a><a href={hrefFor('/stories')}>{u.stories}</a></div>
    <div><b>{en ? 'Get Involved' : 'যুক্ত হোন'}</b><a href={hrefFor('/volunteer')}>{u.volunteer}</a><a href={hrefFor('/celebrate')}>{u.celebrate}</a><a href={hrefFor('/donate')}>{u.donate}</a><a href={hrefFor('/contact')}>{en ? 'Partner with us' : 'অংশীদার হোন'}</a></div>
    <div><b>{u.ourWork}</b><a href={hrefFor('/blood')}>{u.blood}</a><a href={hrefFor('/programmes/health-camps')}>{en ? 'Health Camps' : 'স্বাস্থ্য ক্যাম্প'}</a><a href={hrefFor('/programmes/education')}>{en ? 'Education' : 'শিক্ষা'}</a><a href={hrefFor('/programmes/food-relief')}>{en ? 'Food & Relief' : 'খাদ্য ও ত্রাণ'}</a></div>
    <div><b>{u.contact}</b><a href="https://facebook.com/BBDCaid" target="_blank" rel="noreferrer">{en ? 'BBDC on Facebook' : 'ফেসবুকে বিবিডিসি'}</a><a href={hrefFor('/contact')}>Barishal, Bangladesh</a><a href={hrefFor('/contact')}>{en ? 'Send us a message' : 'আমাদের বার্তা পাঠান'}</a></div>
  </div><div className="foot-bottom"><div className="wrap"><span>© BBDC - Beyond Boundaries for Development and Change</span><span>{REGISTRATION}</span></div></div></footer>
}
export function Progress({ raised, goal }) {
  const pct = Math.min(100, Math.round(raised / goal * 100))
  return <div className="camp-progress">
    <div className="camp-progress-top"><span><b>৳{raised.toLocaleString()}</b> raised of ৳{goal.toLocaleString()}</span><span>{pct}% funded</span></div>
    <div className="progress"><i style={{ width: pct + '%' }} /></div>
  </div>
}
export function Faq({ q, a }) {
  const [o, setO] = useState(false)
  return <div className="faq"><button onClick={() => setO(!o)}>{q}<span>{o ? '−' : '+'}</span></button>{o && <div>{a}</div>}</div>
}
export function DonateWidget({ initialFund }) {
  const { lang, donateFund, setDonateFund } = useSite(); const u = t(null, lang); const en = lang !== 'bn'
  const [donType, setDonType] = useState('One-time'); const [amount, setAmount] = useState(1000); const [custom, setCustom] = useState(''); const [pay, setPay] = useState('bKash'); const [done, setDone] = useState(false)
  const fund = initialFund || donateFund
  const amt = custom ? Number(custom) || 0 : amount
  if (done) return <div className="ok"><b>{en ? 'Thank you!' : 'ধন্যবাদ!'}</b><p>{en ? `Your donation summary for ${amt ? '৳' + amt.toLocaleString() : ''} is saved (frontend preview).` : `আপনার ${amt ? '৳' + amt.toLocaleString() : ''} দানের বিবরণ সংরক্ষিত হয়েছে (ফ্রন্টএন্ড প্রিভিউ)।`} {u.paymentNote}</p><button className="btn btn-outline" onClick={() => setDone(false)}>{en ? 'Give again' : 'আবার দিন'}</button></div>
  return <div>
    <h3 style={{ marginTop: 0 }}>{en ? 'Make a donation' : 'দান করুন'}</h3>
    <p className="muted">{en ? 'Your contribution, big or small, helps a family in Barishal.' : 'আপনার ছোট বা বড় যেকোনো অবদান বরিশালের একটি পরিবারকে সাহায্য করে।'}</p>
    <label>{en ? 'Choose amount' : 'পরিমাণ বেছে নিন'}</label>
    <div className="chips">{[500, 1000, 2500, 5000, 10000].map(a => <button key={a} type="button" className={`chip ${!custom && amount === a ? 'on' : ''}`} onClick={() => { setAmount(a); setCustom('') }}>৳{a.toLocaleString()}</button>)}</div>
    <label>{en ? 'Or enter your own amount (BDT)' : 'অথবা নিজের পরিমাণ লিখুন (টাকা)'}</label>
    <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ height: 52, display: 'inline-flex', alignItems: 'center', padding: '0 14px', border: '1px solid #d8d3c6', borderRight: 0, borderRadius: '12px 0 0 12px', background: '#fbf7ef' }}>৳</span><input className="field" style={{ borderRadius: '0 12px 12px 0' }} type="number" min="1" placeholder={en ? 'Custom amount' : 'নিজের পরিমাণ'} value={custom || amount} onChange={e => setCustom(e.target.value)} /></div>
    <div className="grid2" style={{ gap: 12 }}>
      <div><label>{en ? 'Full name' : 'আপনার নাম'} *</label><input className="field" placeholder={en ? 'Your full name' : 'আপনার নাম'} /></div>
      <div><label>{en ? 'Phone number' : 'ফোন নম্বর'} *</label><input className="field" type="tel" placeholder={en ? 'Phone number' : 'ফোন নম্বর'} /></div>
    </div>
    <label>Email</label>
    <input className="field" type="email" placeholder="Email" />
    <label>{en ? 'Give to' : 'কোথায় দেবেন'}</label>
    <div className="chips">{FUNDS.map(f => <button key={f.id} type="button" className={`chip ${fund === f.id ? 'on' : ''}`} onClick={() => setDonateFund(f.id)}>{f[lang === 'bn' ? 'bn' : 'en']}</button>)}</div>
    <label>{en ? 'Donation type' : 'দানের ধরন'}</label>
    <div className="chips">{(en ? ['One-time', 'Monthly', 'Ramadan', 'Emergency'] : ['একবার', 'প্রতি মাসে', 'রমজান', 'জরুরি']).map(p => <button key={p} type="button" className={`chip ${donType === p ? 'on' : ''}`} onClick={() => setDonType(p)}>{p}</button>)}</div>
    <label>{en ? 'Payment method' : 'পেমেন্ট মাধ্যম'}</label>
    <div className="chips">{['bKash', 'Nagad', 'Rocket', 'Card', 'Bank'].map(p => <button key={p} type="button" className={`chip ${pay === p ? 'on' : ''}`} onClick={() => setPay(p)}>{p}</button>)}</div>
    <button className="btn btn-primary" style={{ marginTop: 20, width: '100%' }} onClick={() => setDone(true)}>{u.donate} {amt ? `৳${amt.toLocaleString()}` : ''} {pay ? `· ${pay}` : ''}</button>
    <p className="muted" style={{ fontSize: 13, marginTop: 12, textAlign: 'center' }}>{u.paymentNote}</p>
  </div>
}
export function ZakatCard() {
  const { lang } = useSite(); const en = lang !== 'bn'
  const [assets, setAssets] = useState(100000)
  return <div className="zakat-card">
    <h3>{en ? 'Zakat calculator' : 'যাকাত ক্যালকুলেটর'}</h3>
    <label>{en ? 'Total zakatable assets (BDT)' : 'মোট যাকাতযোগ্য সম্পদ (টাকা)'}</label>
    <input className="field" type="number" value={assets} onChange={e => setAssets(Number(e.target.value) || 0)} />
    <div className="zakat-est"><span>{en ? 'Estimated Zakat (2.5%)' : 'আনুমানিক যাকাত (২.৫%)'}</span><b>৳{Math.round(assets * 0.025).toLocaleString()}</b></div>
  </div>
}
const PROG_COLORS = [
  { bg: '#e03131', fg: '#ffffff' },
  { bg: '#14746f', fg: '#ffffff' },
  { bg: '#f5b301', fg: '#0e3b3a' },
  { bg: '#0e3b3a', fg: '#ffffff' },
]
const CAMP_COLORS = [
  { bg: '#e03131', fg: '#ffffff' },
  { bg: '#f5b301', fg: '#0e3b3a' },
  { bg: '#14746f', fg: '#ffffff' },
  { bg: '#0e3b3a', fg: '#ffffff' },
]
/* Programme card: coloured icon panel left, white body right. `color` is an
   explicit {bg, fg} from the caller; `i` falls back to the palette order. */
export function ProgCard({ p, i = 0, color }) {
  const { lang } = useSite()
  const c = color || PROG_COLORS[i % PROG_COLORS.length]
  return <div className="prog-card"><div className="prog-icon" style={{ background: c.bg, color: c.fg }}><Icon name={p.icon} size={64} /></div><div className="prog-body"><span className="prog-tagline">{p.tag} · Barishal</span><h3>{pick(lang, p.en, p.bn)}</h3><p>{pick(lang, p.desc_en, p.desc_bn)}</p><a className="support-link" href={hrefFor(`/programmes/${p.slug}`)}>{lang === 'bn' ? 'এই কর্মসূচিতে সহায়তা করুন' : 'Support this programme'} <Icon name="arrow" size={16} /></a></div></div>
}
/* Campaign card: coloured top panel with icon, body with progress. */
export function CampaignCard({ c, i = 0, color }) {
  const { lang } = useSite(); const u = t(null, lang)
  const col = color || CAMP_COLORS[i % CAMP_COLORS.length]
  return <div className="camp-card"><div className="camp-top" style={{ background: col.bg, color: col.fg }}><Icon name={c.icon || 'heart'} size={56} /></div><div className="camp-body"><h3>{pick(lang, c.en, c.bn)}</h3><p>{pick(lang, c.desc_en, c.desc_bn)}</p><Progress raised={c.raised} goal={c.goal} /><div className="camp-actions"><a className="btn btn-primary" href={hrefFor('/donate', { fund: c.fund })}>{u.donateNow}</a><a className="view-all" href={hrefFor(`/campaigns/${c.slug}`)}>{u.learnMore} →</a></div></div></div>
}
export function PartnersMarquee() {
  const { lang } = useSite()
  const en = lang !== 'bn'
  return <div><div className="partners-row" aria-label={en ? 'Partners BBDC has worked with' : 'বিবিডিসি যাদের সঙ্গে কাজ করেছে'}>{PARTNERS.map((p, i) => <div key={i} className="partner-tile" title={p.name}><img src={p.logo} alt={`${p.name} logo`} className="partner-logo" loading="lazy" /></div>)}</div><p className="muted" style={{ fontSize: 13, marginTop: 12 }}>{en ? 'UNICEF logo from UNICEF’s official brand artwork. The government partners share one official mark, the Government of Bangladesh seal, the same mark their own gov.bd sites display. Hover a tile to see that partner’s name.' : 'ইউনিসেফ লোগো ইউনিসেফের অফিসিয়াল ব্র্যান্ড আর্টওয়ার্ক থেকে। সরকারি অংশীদারদের সবার একই অফিসিয়াল চিহ্ন, গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের সিল, যা তাদের নিজস্ব gov.bd সাইটেও দেখানো হয়। কোনো টাইলের উপর মাউস রাখলে সেই অংশীদারের নাম দেখা যাবে।'}</p></div>
}
export function Newsletter() {
  const { lang } = useSite(); const u = t(null, lang); const [ok, setOk] = useState(false)
  return <div className="newsletter-strip"><div><h2>{u.newsletter}</h2><p className="lead">{lang === 'bn' ? 'আপনার সহায়তা যাদের কাছে পৌঁছায়, তাদের নিয়ে একটি ছোট ইমেইল। স্প্যাম নয়, যেকোনো সময় বাতিল করা যাবে।' : 'One short email about the people your support reaches. No spam, unsubscribe anytime.'}</p></div>{ok ? <p className="ok">{u.subscribed}</p> : <form className="newsletter-form" onSubmit={e => { e.preventDefault(); setOk(true) }}><input required type="email" className="field" placeholder="Email" /><button className="btn btn-primary">{u.subscribe}</button></form>}</div>
}
export function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <button type="button" className={`to-top ${show ? 'show' : ''}`} aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><Icon name="up" size={20} /></button>
}
