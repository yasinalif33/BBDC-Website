import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSite, pick } from './context.jsx'
import { UI, FUNDS, LOGO_URL, REGISTRATION, SOCIALS } from './data.js'

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
  }
  return <svg {...p}>{paths[name] || paths.heart}</svg>
}
export function SmartImage({ src, alt = '', className = '', style }) {
  const [err, setErr] = useState(false)
  if (err) return <div className="img-fallback" style={style}>{alt || 'BBDC'}</div>
  return <img src={src} alt={alt} className={className} style={style} onError={() => setErr(true)} loading="lazy" />
}
export function t(ui, lang) { return UI[lang] || UI.en }
export function Header() {
  const { lang, setLang, theme, setTheme } = useSite()
  const u = t(null, lang); const nav = useNavigate()
  const [mobile, setMobile] = useState(false); const [open, setOpen] = useState(null)
  const closeAll = () => { setMobile(false); setOpen(null) }
  const link = (to, label) => <NavLink key={to} to={to} onClick={closeAll} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>
  const drop = (key, label, items) => (
    <div className={`dropdown ${open === key ? 'open' : ''}`} onMouseLeave={() => setOpen(null)}>
      <button className="navlink" onClick={() => setOpen(open === key ? null : key)}>{label} <Icon name="chev" size={14} /></button>
      <div className="dropdown-panel">{items.map(i => <Link key={i.to} to={i.to} onClick={closeAll}>{i.label}</Link>)}</div>
    </div>
  )
  return (<>
    <div className="topbar"><div className="wrap"><span>Barishal, Bangladesh · {lang === 'bn' ? '২০১২ সাল থেকে' : 'Since 2012'}</span><span>{REGISTRATION} · <a href="https://facebook.com/BBDCaid" target="_blank" rel="noreferrer">facebook.com/BBDCaid</a></span></div></div>
    <header className="site"><div className="wrap header-row">
      <Link to="/" className="logo" onClick={closeAll} aria-label="BBDC home"><img src={LOGO_URL} alt="BBDC — Beyond Boundaries for Development and Change" className="logo-img" onError={e => { e.currentTarget.style.display = 'none'; const t = e.currentTarget.nextSibling; if (t) t.style.display = 'inline' }} /><span className="logo-text">BBDC</span></Link>
      <nav className="main">
        {link('/', u.home)}{link('/about', u.about)}{link('/programmes', u.programmes)}{link('/campaigns', u.campaigns)}{link('/stories', u.stories)}
        {drop('involved', u.getInvolved, [{ to: '/volunteer', label: u.volunteer }, { to: '/blood', label: u.blood }])}
        {drop('more', u.more, [{ to: '/transparency', label: u.transparency }, { to: '/contact', label: u.contact }])}
      </nav>
      <div className="actions">
        <button className="iconbtn" aria-label="Toggle theme" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}><Icon name={theme === 'light' ? 'moon' : 'sun'} /></button>
        <button className="iconbtn" aria-label="Toggle language" onClick={() => setLang(lang === 'en' ? 'bn' : 'en')} style={{ fontSize: 12, fontWeight: 800 }}>{lang === 'en' ? 'বাং' : 'EN'}</button>
        <Link to="/volunteer" className="btn btn-outline btn-sm hide-sm" onClick={closeAll}>{u.join}</Link>
        <Link to="/donate" className="btn btn-red btn-sm" onClick={closeAll}>{u.donate}</Link>
        <button className="iconbtn burger" aria-label="Menu" onClick={() => setMobile(!mobile)}><Icon name={mobile ? 'close' : 'menu'} /></button>
      </div>
    </div>
    <div className={`mobile-menu ${mobile ? 'open' : ''}`}>
      {[['/', u.home], ['/about', u.about], ['/programmes', u.programmes], ['/campaigns', u.campaigns], ['/stories', u.stories], ['/volunteer', u.volunteer], ['/blood', u.blood], ['/transparency', u.transparency], ['/contact', u.contact], ['/donate', u.donate]].map(([to, l]) => <Link key={to} to={to} onClick={closeAll}>{l}</Link>)}
      <button onClick={() => { setLang(lang === 'en' ? 'bn' : 'en') }}>{lang === 'en' ? 'বাংলা' : 'English'}</button>
    </div>
    </header>
  </>)
}
export function Footer() {
  const { lang } = useSite(); const u = t(null, lang)
  return <footer className="site"><div className="wrap footgrid">
    <div><div className="logo"><img src={LOGO_URL} alt="BBDC — Beyond Boundaries for Development and Change" className="logo-img foot-logo" onError={e => { e.currentTarget.style.display = 'none' }} /></div><p className="muted">{lang === 'bn' ? 'বরিশালের একটি স্বেচ্ছাসেবী সংগঠন — ২০১২ সাল থেকে।' : 'A volunteer organisation in Barishal, Bangladesh — since 2012.'}</p><p className="muted" style={{ fontSize: 13 }}>{u.footerNote}</p><div className="social-row">{SOCIALS.map(s => <a key={s.id} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} title={s.label}><Icon name={s.id} size={18} /></a>)}</div></div>
    <div><b>{u.programmes}</b><Link to="/programmes">All programmes</Link><Link to="/blood">{u.blood}</Link><Link to="/campaigns">{u.campaigns}</Link></div>
    <div><b>{u.getInvolved}</b><Link to="/volunteer">{u.volunteer}</Link><Link to="/donate">{u.donate}</Link><Link to="/transparency">{u.transparency}</Link></div>
    <div><b>{u.contact}</b><a href="https://facebook.com/BBDCaid" target="_blank" rel="noreferrer">facebook.com/BBDCaid</a><Link to="/contact">Barishal, Bangladesh</Link></div>
  </div><div className="wrap"><p className="muted" style={{ fontSize: 13 }}>© BBDC — Beyond Boundaries for Development and Change · {REGISTRATION}. {u.paymentNote}</p></div></footer>
}
export function Progress({ raised, goal }) {
  const pct = Math.min(100, Math.round(raised / goal * 100))
  return <div><div className="progress"><i style={{ width: pct + '%' }} /></div><p className="muted" style={{ fontSize: 14 }}>৳{raised.toLocaleString()} raised · Goal ৳{goal.toLocaleString()} · {pct}%</p></div>
}
export function Faq({ q, a }) {
  const [o, setO] = useState(false)
  return <div className="faq"><button onClick={() => setO(!o)}>{q}<span>{o ? '−' : '+'}</span></button>{o && <div>{a}</div>}</div>
}
export function DonateWidget({ initialFund }) {
  const { lang, donateFund, setDonateFund } = useSite(); const u = t(null, lang)
  const [freq, setFreq] = useState('once'); const [amount, setAmount] = useState(1000); const [custom, setCustom] = useState(''); const [pay, setPay] = useState('bKash'); const [done, setDone] = useState(false); const [assets, setAssets] = useState(200000)
  const fund = initialFund || donateFund
  const fundName = (FUNDS.find(f => f.id === fund) || FUNDS[0])[lang === 'bn' ? 'bn' : 'en']
  const amt = custom ? Number(custom) || 0 : amount
  const impact = amt >= 12000 ? (lang === 'bn' ? 'একটি সেলাই মেশিনের সম্পূর্ণ খরচ হতে পারে' : 'could fully fund one sewing machine') : amt >= 1500 ? (lang === 'bn' ? 'একটি সম্পূর্ণ স্কুল কিট হতে পারে' : 'could cover a full school kit') : amt >= 1000 ? (lang === 'bn' ? 'একটি পরিবারের খাদ্য প্যাক হতে পারে' : 'could stock a family food pack') : (lang === 'bn' ? 'প্রতিটি টাকা সাহায্য করে' : 'every taka helps')
  if (done) return <div className="ok"><b>{lang === 'bn' ? 'ধন্যবাদ!' : 'Thank you!'}</b><p>{lang === 'bn' ? `আপনার ${amt ? '৳' + amt.toLocaleString() : ''} দানের বিবরণ সংরক্ষিত হয়েছে (ফ্রন্টএন্ড প্রিভিউ)।` : `Your donation summary for ${amt ? '৳' + amt.toLocaleString() : ''} is saved (frontend preview).`} {u.paymentNote}</p><button className="btn btn-outline" onClick={() => setDone(false)}>{lang === 'bn' ? 'আবার দিন' : 'Give again'}</button></div>
  return <div>
    <div className="chips" role="group" aria-label="Frequency"><button className={`chip ${freq === 'once' ? 'on' : ''}`} onClick={() => setFreq('once')}>{lang === 'bn' ? 'একবার' : 'One-time'}</button><button className={`chip ${freq === 'monthly' ? 'on' : ''}`} onClick={() => setFreq('monthly')}>{lang === 'bn' ? 'প্রতি মাসে' : 'Monthly'}</button></div>
    <label>{lang === 'bn' ? 'তহবিল বেছে নিন' : 'Choose fund'}</label>
    <div className="chips">{FUNDS.map(f => <button key={f.id} className={`chip ${fund === f.id ? 'on' : ''}`} onClick={() => setDonateFund(f.id)}>{f[lang === 'bn' ? 'bn' : 'en']}</button>)}</div>
    <label>{lang === 'bn' ? 'পরিমাণ (৳)' : 'Amount (৳)'}</label>
    <div className="chips">{[500, 1000, 1500, 5000].map(a => <button key={a} className={`chip ${!custom && amount === a ? 'on' : ''}`} onClick={() => { setAmount(a); setCustom('') }}>৳{a.toLocaleString()}</button>)}</div>
    <input className="field" style={{ marginTop: 10 }} type="number" min="1" placeholder={lang === 'bn' ? 'নিজের পরিমাণ লিখুন' : 'Custom amount'} value={custom} onChange={e => setCustom(e.target.value)} />
    <p><b>{fundName}</b> · {freq === 'monthly' ? (lang === 'bn' ? 'প্রতি মাসে' : 'monthly') : (lang === 'bn' ? 'একবার' : 'one-time')} · {impact} <span className="muted">({u.illustrative})</span></p>
    <label>{lang === 'bn' ? 'পেমেন্ট মাধ্যম' : 'Payment method'}</label>
    <div className="chips">{['bKash', 'Nagad', 'Rocket', 'SSLCommerz', 'Bank'].map(p => <button key={p} className={`chip ${pay === p ? 'on' : ''}`} onClick={() => setPay(p)}>{p}</button>)}</div>
    <div className="notice" style={{ marginTop: 14 }}>{u.paymentNote} {lang === 'bn' ? 'এই পর্যায়ে কোনো টাকা কাটা হবে না।' : 'No money is taken at this stage.'}</div>
    <button className="btn btn-red" style={{ marginTop: 14, width: '100%' }} onClick={() => setDone(true)}>{u.donate} {amt ? `৳${amt.toLocaleString()}` : ''} {pay ? `· ${pay}` : ''}</button>
    <h3 style={{ marginTop: 28 }}>{lang === 'bn' ? 'যাকাত ক্যালকুলেটর' : 'Zakat calculator'}</h3>
    <label>{lang === 'bn' ? 'মোট সম্পদ (৳)' : 'Total zakatable assets (৳)'}</label>
    <input className="field" type="number" value={assets} onChange={e => setAssets(Number(e.target.value) || 0)} />
    <p>{lang === 'bn' ? 'আনুমানিক যাকাত (২.৫%):' : 'Estimated Zakat (2.5%):'} <b>৳{Math.round(assets * 0.025).toLocaleString()}</b></p>
  </div>
}
export function Newsletter() {
  const { lang } = useSite(); const u = t(null, lang); const [ok, setOk] = useState(false)
  return <div className="band"><h2>{u.newsletter}</h2><p className="lead">{lang === 'bn' ? 'আপনার সহায়তা যাদের কাছে পৌঁছায়, তাদের নিয়ে একটি ছোট ইমেইল। স্প্যাম নয়, যেকোনো সময় বাতিল করা যাবে।' : 'One short email about the people your support reaches. No spam, unsubscribe anytime.'}</p>{ok ? <p className="ok">{u.subscribed}</p> : <form onSubmit={e => { e.preventDefault(); setOk(true) }} style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}><input required type="email" className="field" style={{ maxWidth: 360 }} placeholder="Email" /><button className="btn btn-red">{u.subscribe}</button></form>}</div>
}
