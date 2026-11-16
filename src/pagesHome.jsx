import { useState } from 'react'
import { useSite, pick } from './context.jsx'
import { PROGRAMMES, CAMPAIGNS, STORIES, FUNDS, TESTIMONIALS, NEWS, REGISTRATION } from './data.js'
import { Icon, Progress, DonateWidget, DonateSummary, ZakatCard, Newsletter, PartnersCarousel, ProgCard, CampaignCard, VideoSection, t } from './components.jsx'
import { hrefFor } from './site.js'

const AREA_COLORS = [
  { bg: '#fde8e4', fg: '#b42318' },
  { bg: '#dce8fb', fg: '#1d4ed8' },
  { bg: '#fdefc9', fg: '#7a5b00' },
  { bg: '#d9f2e3', fg: '#0f5c50' },
]

/* Featured film poster: sunset over the river, a sailboat on the water.
   No blood imagery anywhere on the frontend. */
function FilmPoster() {
  return <svg className="film-art" viewBox="0 0 560 420" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Sunset over the river in Barishal, a sailboat on the water">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#1e3a5f" />
        <stop offset=".45" stopColor="#ff7a59" />
        <stop offset=".75" stopColor="#ffd9a0" />
        <stop offset="1" stopColor="#ffe9c4" />
      </linearGradient>
      <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#2563eb" />
        <stop offset="1" stopColor="#0b1e3a" />
      </linearGradient>
    </defs>
    <rect width="560" height="300" fill="url(#sky)" />
    <circle cx="280" cy="180" r="52" fill="#ffd166" />
    <circle cx="280" cy="180" r="76" fill="none" stroke="rgba(255,209,102,.4)" strokeWidth="2" />
    <ellipse cx="120" cy="90" rx="70" ry="16" fill="rgba(255,255,255,.28)" />
    <ellipse cx="440" cy="70" rx="56" ry="12" fill="rgba(255,255,255,.22)" />
    <path d="M120 130 q10 -8 20 0 M150 120 q10 -8 20 0" stroke="#0b1e3a" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M400 150 q10 -8 20 0" stroke="#0b1e3a" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M0 300 C 90 272 180 328 280 300 C 380 272 470 328 560 300 L560 420 L0 420 Z" fill="url(#sea)" />
    <path d="M0 330 C 90 306 180 352 280 330 C 380 306 470 352 560 330 L560 420 L0 420 Z" fill="#0b1e3a" opacity=".55" />
    <path d="M0 360 C 90 340 180 376 280 360 C 380 340 470 376 560 360 L560 420 L0 420 Z" fill="#0b1e3a" opacity=".35" />
    <g className="boat-bob">
      <path d="M330 268 L430 268 L412 290 L348 290 Z" fill="#ffffff" />
      <rect x="378" y="220" width="4" height="50" fill="#ffffff" />
      <path d="M382 220 L412 230 L382 240 Z" fill="#ff5a3c" />
    </g>
  </svg>
}

export function Home() {
  const { lang } = useSite(); const u = t(null, lang); const en = lang !== 'bn'
  const [submitSignal, setSubmitSignal] = useState(0)
  const running = CAMPAIGNS[0]
  const latest = STORIES[0]
  return <>
    <section className="band hero-new"><div className="container-x">
      <div className="hero-center">
        <span className="hero-pill"><span className="dot" />{en ? 'Volunteer-led since 2012 · Barishal' : '২০১২ সাল থেকে স্বেচ্ছাসেবকদের নেতৃত্বে · বরিশাল'}</span>
        <h1>{en ? <>When Barishal needs help, <span className="hl">neighbours show up.</span></> : <>বরিশালের প্রয়োজনে, <span className="hl">প্রতিবেশীরা এগিয়ে আসে।</span></>}</h1>
        <p className="hero-lead">{en ? 'Beyond Boundaries for Development and Change is a volunteer organisation founded in Barishal in 2012. Give food, give a livelihood, or simply give your time.' : 'বিয়ন্ড বাউন্ডারিজ ফর ডেভেলপমেন্ট অ্যান্ড চেঞ্জ বরিশালে ২০১২ সালে প্রতিষ্ঠিত একটি স্বেচ্ছাসেবী সংগঠন। খাদ্য দিন, জীবিকা দিন, অথবা আপনার সময় দিন।'}</p>
        <div className="hero-cta">
          <a className="btn btn-primary" href={hrefFor('/donate')}>{u.donateNow}</a>
          <a className="btn btn-blue" href={hrefFor('/volunteer')}>{en ? 'Become a volunteer' : 'স্বেচ্ছাসেবক হোন'}</a>
          <a className="btn btn-white" href="#video">{en ? 'Watch our work' : 'আমাদের কাজ দেখুন'}</a>
        </div>
      </div>
      <div className="hero-media">
        <a href="#video" className="film-card" aria-label={en ? 'Watch our work' : 'আমাদের কাজ দেখুন'}>
          <FilmPoster />
          <span className="film-tag">{en ? 'Featured film' : 'বিশেষ ফিল্ম'}</span>
          <span className="film-play"><Icon name="play" size={26} /></span>
          <span className="film-cap"><h3>{en ? 'A day with BBDC volunteers' : 'বিবিডিসি স্বেচ্ছাসেবকদের সঙ্গে একটি দিন'}</h3><p>{en ? 'Watch the film' : 'ফিল্মটি দেখুন'}</p></span>
        </a>
        <div className="hero-side">
          <div className="side-card">
            <div className="side-top"><span>{en ? 'Running campaign' : 'চলমান প্রচারণা'}</span><span className="live">{en ? 'Live' : 'চলমান'}</span></div>
            <h3>{pick(lang, running.en, running.bn)}</h3>
            <p>{pick(lang, running.desc_en, running.desc_bn)}</p>
            <div className="side-progress"><Progress raised={running.raised} goal={running.goal} /></div>
            <a className="btn btn-primary" href={hrefFor('/donate', { fund: running.fund })}>{u.donateNow}</a>
          </div>
          <div className="side-card">
            <div className="side-top"><span>{en ? 'Up next' : 'এরপর'}</span><span className="sample-badge">{en ? 'Sample' : 'নমুনা'}</span></div>
            <h3>{en ? 'Winter Blanket Drive' : 'শীতের কম্বল অভিযান'}</h3>
            <p>{en ? 'Warmth for families this winter. Dates to be confirmed.' : 'এই শীতে পরিবারের জন্য উষ্ণতা। তারিখ পরে জানানো হবে।'}</p>
            <a className="view-all" href={hrefFor('/campaigns')}>{en ? 'See campaigns' : 'প্রচারণা দেখুন'} →</a>
          </div>
        </div>
      </div>
      <div className="grid3" style={{ marginTop: 20 }}>
        <div className="mini-card"><span className="mini-tag">{en ? 'Volunteers' : 'স্বেচ্ছাসেবক'}</span><h3>{en ? 'Join the team' : 'দলে যোগ দিন'}</h3><p>{en ? 'Volunteer-led since 2012. Give your time in Barishal.' : '২০১২ সাল থেকে স্বেচ্ছাসেবকদের নেতৃত্বে। বরিশালে আপনার সময় দিন।'}</p><a className="btn btn-secondary btn-sm" href={hrefFor('/volunteer')}>{en ? 'Become a volunteer' : 'স্বেচ্ছাসেবক হোন'}</a></div>
        <div className="mini-card"><span className="mini-tag">{en ? 'Partners' : 'অংশীদার'}</span><h3>{en ? 'Working together' : 'একসাথে কাজ করছি'}</h3><p>{en ? 'UNICEF and government partners in Barishal.' : 'বরিশালে ইউনিসেফ ও সরকারি অংশীদার।'}</p><a className="btn btn-secondary btn-sm" href={hrefFor('/') + '#partners'}>{en ? 'See our partners' : 'আমাদের অংশীদার দেখুন'}</a></div>
        <div className="mini-card"><span className="mini-tag">{en ? 'From the blog' : 'ব্লগ থেকে'}</span><h3>{pick(lang, latest.en, latest.bn)}</h3><p>{pick(lang, latest.ex_en, latest.ex_bn)}</p><a className="btn btn-secondary btn-sm" href={hrefFor('/blog')}>{en ? 'Read the blog' : 'ব্লগ পড়ুন'}</a></div>
      </div>
    </div></section>

    <section className="band band-white"><div className="container-x"><div className="split">
      <div><span className="eyebrow">{u.about}</span><h2 style={{ marginTop: 12 }}>{en ? 'A volunteer organisation in Barishal, since 2012.' : 'বরিশালের একটি স্বেচ্ছাসেবী সংগঠন, ২০১২ সাল থেকে।'}</h2><p className="lead">{en ? 'BBDC began in 2012 as a community of volunteers in Barishal. Today it works across health, education, food and livelihoods, in the neighbourhoods its volunteers live in.' : 'বিবিডিসি ২০১২ সালে বরিশালের একদল স্বেচ্ছাসেবক হিসেবে যাত্রা শুরু করে। আজ এটি স্বাস্থ্য, শিক্ষা, খাদ্য ও জীবিকার ক্ষেত্রে কাজ করে, যে মহল্লায় এর স্বেচ্ছাসেবকরা থাকেন, সেখানেই।'}</p><p className="muted" style={{ fontSize: 14 }}>{REGISTRATION}</p><a className="btn btn-secondary" href={hrefFor('/about')}>{en ? 'More about BBDC' : 'বিবিডিসি সম্পর্কে আরও জানুন'} →</a></div>
      <div className="info-boxes">
        <div className="info-box"><span className="ib-label">{en ? 'Founded' : 'প্রতিষ্ঠিত'}</span><div className="ib-value">2012, Barishal</div></div>
        <div className="info-box"><span className="ib-label">{en ? 'Led by' : 'নেতৃত্বে'}</span><div className="ib-value">{en ? 'Volunteers' : 'স্বেচ্ছাসেবক'}</div></div>
        <div className="info-box"><span className="ib-label">{en ? 'Programme areas' : 'কর্মসূচি ক্ষেত্র'}</span><div className="ib-value">{en ? '4 areas' : '৪টি ক্ষেত্র'}</div></div>
        <div className="info-box"><span className="ib-label">{en ? 'Campaigns open' : 'চলমান প্রচারণা'}</span><div className="ib-value">{en ? '4 campaigns' : '৪টি প্রচারণা'}</div></div>
      </div>
    </div></div></section>

    <section className="band band-cream"><div className="container-x"><div className="section-head"><div><span className="eyebrow">{u.programmes}</span><h2>{u.programmesTitle}</h2></div><a className="view-all" href={hrefFor('/programmes')}>{en ? 'View all programmes' : 'সব কর্মসূচি দেখুন'} →</a></div><div className="grid4">{PROGRAMMES.slice(0, 4).map((p, i) => <ProgCard key={p.slug} p={p} i={i} color={AREA_COLORS[i]} />)}</div></div></section>

    <section className="band band-white"><div className="container-x"><div className="section-head"><div><span className="eyebrow">{u.campaigns}</span><h2>{en ? 'Campaigns open for support' : 'সহায়তার জন্য খোলা প্রচারণা'}</h2></div><a className="view-all" href={hrefFor('/campaigns')}>{en ? 'View all campaigns' : 'সব প্রচারণা দেখুন'} →</a></div><div className="grid3">{CAMPAIGNS.slice(0, 3).map((c, i) => <CampaignCard key={c.slug} c={c} i={i} />)}</div><p className="muted" style={{ marginTop: 20, fontSize: 14 }}>{en ? 'Sample figures until live campaign data is connected.' : 'লাইভ প্রচারণার তথ্য যুক্ত না হওয়া পর্যন্ত নমুনা পরিসংখ্যান।'}</p></div></section>

    <VideoSection />

    <section className="band band-white"><div className="container-x"><div className="section-head"><div><span className="eyebrow">{u.blog}</span><h2>{u.latest}</h2></div><a className="view-all" href={hrefFor('/blog')}>{en ? 'Read the blog' : 'ব্লগ পড়ুন'} →</a></div><div className="carousel"><div className="carousel-track">{[...STORIES, ...STORIES].map((s, i) => <a key={`${s.slug}-${i}`} className="story-card" href={hrefFor(`/blog/${s.slug}`)}><div className="story-pills"><span className={`pill ${s.pillClass}`}>{pick(lang, s.pill, s.pill_bn)}</span><span className="pill-note">{pick(lang, s.pillNote, s.pillNote_bn)}</span></div><h3>{pick(lang, s.en, s.bn)}</h3><p>{pick(lang, s.ex_en, s.ex_bn)}</p><span className="view-all">{en ? 'Read more' : 'আরও পড়ুন'} →</span></a>)}</div></div></div></section>

    <section className="band band-cream" id="partners"><div className="container-x"><div className="section-head"><div><span className="eyebrow">{en ? 'Our partners' : 'আমাদের অংশীদার'}</span><h2>{en ? 'We have worked with' : 'আমরা যাদের সঙ্গে কাজ করেছি'}</h2></div></div><PartnersCarousel /></div></section>

    <section className="band band-white"><div className="container-x"><div className="section-head"><div><span className="eyebrow">{en ? 'Donation categories' : 'দানের বিভাগ'}</span><h2>{en ? 'Choose where your gift goes' : 'আপনার উপহার কোথায় যাবে বেছে নিন'}</h2></div><a className="view-all" href={hrefFor('/donate')}>{en ? 'Make a donation' : 'দান করুন'} →</a></div><div className="fund-grid">{FUNDS.map((f, i) => { const c = AREA_COLORS[i % AREA_COLORS.length]; return <a key={f.id} className="fund-card" href={hrefFor('/donate', { fund: f.id })}><span className="fund-icon" style={{ background: c.bg, color: c.fg }}><Icon name={f.icon} size={26} /></span><h3>{f[lang === 'bn' ? 'bn' : 'en']}</h3><p>{pick(lang, f.desc_en, f.desc_bn)}</p><span className="view-all">{en ? 'Give to this fund' : 'এই তহবিলে দিন'} →</span></a> })}</div></div></section>

    <section className="band take-action"><div className="container-x"><div className="section-head"><div><span className="eyebrow">{en ? 'Take action' : 'পদক্ষেপ নিন'}</span><h2>{en ? 'Choose how you want to help' : 'কীভাবে সাহায্য করতে চান বেছে নিন'}</h2></div></div><div className="take-grid">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <a className="take-option" href={hrefFor('/volunteer')}><span className="to-icon"><Icon name="users" size={22} /></span><div><h3>{en ? 'Become a volunteer' : 'স্বেচ্ছাসেবক হোন'}</h3><p>{en ? 'Teach, mentor, run drives or share your skills in Barishal.' : 'বরিশালে পড়ান, পরামর্শ দিন, ড্রাইভ পরিচালনা করুন বা আপনার দক্ষতা ভাগ করুন।'}</p></div></a>
        <a className="take-option" href={hrefFor('/celebrate')}><span className="to-icon"><Icon name="sun" size={22} /></span><div><h3>{en ? 'Celebrate With BBDC' : 'বিবিডিসির সঙ্গে উদযাপন'}</h3><p>{en ? 'Turn a birthday, wedding or graduation into a gift for a family.' : 'জন্মদিন, বিয়ে বা গ্র্যাজুয়েশনকে একটি পরিবারের উপহারে পরিণত করুন।'}</p></div></a>
        <a className="take-option" href={hrefFor('/contact')}><span className="to-icon"><Icon name="heart" size={22} /></span><div><h3>{en ? 'Partner with us' : 'আমাদের অংশীদার হোন'}</h3><p>{en ? 'Work with BBDC on a programme, a campaign or a community drive.' : 'একটি কর্মসূচি, প্রচারণা বা কমিউনিটি ড্রাইভে বিবিডিসির সঙ্গে কাজ করুন।'}</p></div></a>
      </div>
      <div className="donate-panel"><DonateWidget submitSignal={submitSignal} /></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}><DonateSummary onDonate={() => setSubmitSignal(s => s + 1)} /><ZakatCard /></div>
    </div></div></section>

    <section className="band band-white"><div className="container-x"><div className="section-head"><div><span className="eyebrow">{en ? 'Testimonials' : 'প্রশংসাপত্র'}</span><h2>{en ? 'What people say about BBDC' : 'বিবিডিসি সম্পর্কে মানুষ যা বলে'}</h2></div></div><div className="testi-grid">{TESTIMONIALS.map((tst, i) => <div key={i} className="testi-card"><span className="t-quote"><Icon name="quote" size={28} /></span><blockquote>{pick(lang, tst.quote_en, tst.quote_bn)}</blockquote><div className="t-who">{pick(lang, tst.who_en, tst.who_bn)}</div><span className="sample-badge">{en ? 'Sample' : 'নমুনা'}</span></div>)}</div><p className="muted" style={{ marginTop: 16, fontSize: 14 }}>{en ? 'These are sample quotes until real words from volunteers, donors and families are added.' : 'স্বেচ্ছাসেবক, দাতা ও পরিবারের আসল কথা যুক্ত না হওয়া পর্যন্ত এগুলো নমুনা উক্তি।'}</p></div></section>

    <section className="band band-cream"><div className="container-x"><div className="section-head"><div><span className="eyebrow">{en ? 'News' : 'সংবাদ'}</span><h2>{en ? 'News, print and online media' : 'সংবাদ, মুদ্রণ ও অনলাইন মিডিয়া'}</h2></div><a className="view-all" href={hrefFor('/contact')}>{en ? 'Send a coverage link' : 'কভারেজের লিঙ্ক পাঠান'} →</a></div><div className="news-grid">{NEWS.map((n, i) => <article key={i} className="news-card"><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}><span className="news-kind">{pick(lang, n.kind, n.kind_bn)}</span><span className="sample-badge">{en ? 'Sample' : 'নমুনা'}</span></div><h3>{pick(lang, n.title_en, n.title_bn)}</h3><p className="n-outlet">{pick(lang, n.outlet_en, n.outlet_bn)}</p></article>)}</div><p className="muted" style={{ marginTop: 16, fontSize: 14 }}>{en ? 'No verified press coverage has been found yet. If you have seen BBDC in print or online, send us the link.' : 'এখনো যাচাইকৃত সংবাদ কভারেজ পাওয়া যায়নি। আপনি যদি মুদ্রণ বা অনলাইনে বিবিডিসিকে দেখে থাকেন, লিঙ্কটি পাঠান।'}</p></div></section>

    <section className="band band-white"><div className="container-x"><Newsletter /></div></section>
  </>
}
