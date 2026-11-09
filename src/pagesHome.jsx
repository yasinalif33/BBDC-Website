import { useState } from 'react'
import { useSite, pick } from './context.jsx'
import { PROGRAMMES, CAMPAIGNS, STORIES, WAYS, REGISTRATION } from './data.js'
import { Icon, DonateWidget, ZakatCard, Newsletter, PartnersMarquee, ProgCard, CampaignCard, t } from './components.jsx'
import { hrefFor } from './site.js'

const GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
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

/* Hero illustration: blood drop, sun and a boat on the river, drawn to match
   the mockup. The card behind it is dark teal via CSS. */
function HeroArt() {
  return <svg viewBox="0 0 560 380" role="img" aria-label="Blood drop, sun and boat on the river">
    <circle cx="430" cy="100" r="62" fill="#f5b301" />
    <circle cx="430" cy="100" r="86" fill="none" stroke="rgba(245,179,1,.35)" strokeWidth="2" />
    <circle cx="430" cy="100" r="112" fill="none" stroke="rgba(255,255,255,.10)" strokeWidth="2" />
    <path d="M170 60 C 152 92 110 138 110 178 A 60 60 0 0 0 230 178 C 230 138 188 92 170 60 Z" fill="#e03131" className="drop-pulse" />
    <ellipse cx="142" cy="172" rx="11" ry="20" fill="rgba(255,255,255,.35)" transform="rotate(-18 142 172)" />
    <path d="M0 300 C 90 270 180 330 280 300 C 380 270 470 330 560 300 L560 380 L0 380 Z" fill="#14524e" />
    <path d="M0 325 C 90 300 180 350 280 325 C 380 300 470 350 560 325 L560 380 L0 380 Z" fill="#14746f" />
    <path d="M0 350 C 90 330 180 368 280 350 C 380 330 470 368 560 350 L560 380 L0 380 Z" fill="#0a2e2d" />
    <g className="boat-bob">
      <path d="M330 268 L430 268 L412 290 L348 290 Z" fill="#ffffff" />
      <rect x="378" y="220" width="4" height="50" fill="#ffffff" />
      <path d="M382 220 L412 230 L382 240 Z" fill="#e03131" />
    </g>
  </svg>
}

/* Volunteer band illustration: colourful circles on teal, like the mockup. */
function VolunteerArt() {
  return <svg viewBox="0 0 560 380" role="img" aria-label="Colourful circles">
    <circle cx="420" cy="90" r="70" fill="#f5b301" />
    <circle cx="120" cy="120" r="46" fill="#e03131" />
    <circle cx="240" cy="200" r="58" fill="#ffffff" opacity=".92" />
    <circle cx="400" cy="260" r="52" fill="#0e3b3a" />
    <circle cx="150" cy="290" r="40" fill="#f5b301" />
    <circle cx="300" cy="90" r="26" fill="#e03131" opacity=".85" />
    <circle cx="480" cy="180" r="30" fill="#ffffff" opacity=".85" />
    <circle cx="90" cy="210" r="24" fill="#0e3b3a" opacity=".8" />
  </svg>
}

export function Home() {
  const { lang } = useSite(); const u = t(null, lang); const en = lang !== 'bn'
  const [group, setGroup] = useState('O+')
  return <>
    <section className="band band-cream hero-new"><div className="container-x"><div className="hero-grid">
      <div>
        <span className="hero-pill"><span className="dot" />{en ? 'Volunteer-led since 2012' : '২০১২ সাল থেকে স্বেচ্ছাসেবকদের নেতৃত্বে'}</span>
        <h1>{en ? <>When Barishal needs help, <span className="hl">neighbours show up.</span></> : <>বরিশালের প্রয়োজনে, <span className="hl">প্রতিবেশীরা এগিয়ে আসে।</span></>}</h1>
        <p className="hero-lead">{en ? 'Beyond Boundaries for Development and Change is a volunteer organisation founded in Barishal in 2012. Give blood, give food, give a livelihood, or simply give your time.' : 'বিয়ন্ড বাউন্ডারিজ ফর ডেভেলপমেন্ট অ্যান্ড চেঞ্জ বরিশালে ২০১২ সালে প্রতিষ্ঠিত একটি স্বেচ্ছাসেবী সংগঠন। রক্ত দিন, খাদ্য দিন, জীবিকা দিন, অথবা আপনার সময় দিন।'}</p>
        <div className="hero-cta"><a className="btn btn-primary" href={hrefFor('/donate')}>{u.donateNow}</a><a className="btn btn-secondary" href={hrefFor('/programmes')}>{u.explore}</a></div>
      </div>
      <div className="hero-art">
        <div className="hero-art-card"><HeroArt /></div>
        <div className="blood-card">
          <div className="blood-card-top"><h3>{en ? 'Need blood?' : 'রক্ত প্রয়োজন?'}</h3><span className="sub">{en ? 'Pick a group' : 'একটি গ্রুপ বেছে নিন'}</span></div>
          <div className="group-pills">{GROUPS.map(g => <button key={g} type="button" className={group === g ? 'on' : ''} onClick={() => setGroup(g)}>{g}</button>)}</div>
          <a className="btn btn-primary" style={{ width: '100%' }} href={hrefFor('/blood', { group })}>{en ? `Request ${group} blood` : `${group} রক্তের আবেদন করুন`}</a>
        </div>
      </div>
    </div></div></section>

    <div className="stat-strip"><div className="container-x"><div className="stat-grid">
      {[{ num: '2012', label: en ? 'Founded in Barishal' : 'বরিশালে প্রতিষ্ঠিত' }, { num: '8', label: en ? 'Programme areas' : 'কর্মসূচি ক্ষেত্র' }, { num: '8', label: en ? 'Blood groups covered' : 'রক্তের গ্রুপ' }, { num: '4', label: en ? 'Campaigns open' : 'চলমান প্রচারণা' }].map(s => <div key={s.label} className="stat-item"><b data-count={s.num}>{s.num}</b><span>{s.label}</span></div>)}
    </div></div></div>

    <section className="band band-white"><div className="container-x"><div className="split">
      <div><span className="eyebrow">{u.about}</span><h2>{en ? 'From a blood donors’ club to a community organisation.' : 'একটি রক্তদাতা ক্লাব থেকে একটি কমিউনিটি সংগঠনে।'}</h2><p>{en ? 'BBDC began in 2012 as the Barishal Blood Donors Club, saving lives through voluntary blood donation and supporting thalassemia patients. In 2025 it was reintroduced as Beyond Boundaries for Development and Change, keeping the same short name and the same volunteer spirit.' : 'বিবিডিসি ২০১২ সালে বরিশাল ব্লাড ডোনার্স ক্লাব হিসেবে যাত্রা শুরু করে, স্বেচ্ছায় রক্তদান ও থ্যালাসেমিয়া রোগীদের সহায়তার মাধ্যমে জীবন বাঁচিয়ে। ২০২৫ সালে এটি বিয়ন্ড বাউন্ডারিজ ফর ডেভেলপমেন্ট অ্যান্ড চেঞ্জ হিসেবে পুনরায় পরিচিত হয়, একই সংক্ষিপ্ত নাম ও স্বেচ্ছাসেবী চেতনা ধরে রেখে।'}</p><div className="plain-facts"><span className="pf-label">{en ? 'Plain facts' : 'সরল তথ্য'}</span><p>{en ? 'No invented totals here. What is confirmed: BBDC was founded in Barishal in 2012 and reincorporated in 2025 as Beyond Boundaries for Development and Change, with programmes across blood, health, education and food.' : 'এখানে কোনো উদ্ভাবিত মোট পরিসংখ্যান নেই। যা নিশ্চিত: বিবিডিসি ২০১২ সালে বরিশালে প্রতিষ্ঠিত এবং ২০২৫ সালে বিয়ন্ড বাউন্ডারিজ ফর ডেভেলপমেন্ট অ্যান্ড চেঞ্জ হিসেবে পুনরায় পরিচিত, রক্ত, স্বাস্থ্য, শিক্ষা ও খাদ্য কর্মসূচিসহ।'}</p><p><b>{REGISTRATION}</b></p></div></div>
      <div className="timeline">
        <div className="tl-item"><span className="tl-dot" style={{ background: '#e03131' }} /><b>2012</b><p>{en ? 'Barishal Blood Donors Club begins.' : 'বরিশাল ব্লাড ডোনার্স ক্লাবের যাত্রা শুরু।'}</p></div>
        <div className="tl-item"><span className="tl-dot" style={{ background: '#14746f' }} /><b>2013–2025</b><p>{en ? 'Blood, health, education, food and livelihood work grows across Barishal.' : 'বরিশালজুড়ে রক্ত, স্বাস্থ্য, শিক্ষা, খাদ্য ও জীবিকার কাজ বিস্তৃত হয়।'}</p></div>
        <div className="tl-item"><span className="tl-dot" style={{ background: '#f5b301' }} /><b>2025</b><p>{en ? 'Reincorporated as Beyond Boundaries for Development and Change.' : 'বিয়ন্ড বাউন্ডারিজ ফর ডেভেলপমেন্ট অ্যান্ড চেঞ্জ হিসেবে পুনরায় পরিচিত।'}</p></div>
      </div>
    </div></div></section>

    <section className="band band-mint"><div className="container-x"><div className="section-head"><div><span className="eyebrow">{u.programmes}</span><h2>{u.programmesTitle}</h2></div><a className="view-all" href={hrefFor('/programmes')}>{en ? 'View all programmes' : 'সব কর্মসূচি দেখুন'} →</a></div><div className="grid2">{PROGRAMMES.slice(0, 4).map((p, i) => <ProgCard key={p.slug} p={p} i={i} color={PROG_COLORS[i]} />)}</div></div></section>

    <section className="band band-white"><div className="container-x"><span className="eyebrow">{en ? 'How BBDC works' : 'আমরা কীভাবে কাজ করি'}</span><h2 style={{ marginTop: 12 }}>{en ? 'Not just donations. A local volunteer chain, from the first offer of help to the follow-up.' : 'শুধু দান নয়। সাহায্যের প্রথম প্রস্তাব থেকে পরবর্তী আপডেট পর্যন্ত একটি স্থানীয় স্বেচ্ছাসেবক চেইন।'}</h2><div className="grid3" style={{ marginTop: 28 }}>
      <div className="card"><div className="card-body"><span className="step-num">1</span><h3>{en ? 'You offer help' : 'আপনি সাহায্যের প্রস্তাব দেন'}</h3><p className="muted">{en ? 'Choose a fund, join the blood donor list, or sign up as a volunteer. You pick exactly where your help goes.' : 'একটি তহবিল বেছে নিন, রক্তদাতা তালিকায় যোগ দিন, অথবা স্বেচ্ছাসেবক হিসেবে সাইন আপ করুন। আপনার সাহায্য কোথায় যাবে, তা আপনিই ঠিক করেন।'}</p></div></div>
      <div className="card"><div className="card-body"><span className="step-num teal">2</span><h3>{en ? 'Volunteers deliver it locally' : 'স্বেচ্ছাসেবকরা স্থানীয়ভাবে তা পৌঁছে দেন'}</h3><p className="muted">{en ? 'Barishal volunteers run the drives, camps and distributions, in the neighbourhoods they live in.' : 'বরিশালের স্বেচ্ছাসেবকরা ড্রাইভ, ক্যাম্প ও বিতরণ পরিচালনা করেন, যে মহল্লায় তারা থাকেন, সেখানেই।'}</p></div></div>
      <div className="card"><div className="card-body"><span className="step-num">3</span><h3>{en ? 'You hear back' : 'আপনি আপডেট পান'}</h3><p className="muted">{en ? 'A receipt and field update are promised in the backend phase, and monthly stories keep you in the loop.' : 'ব্যাকএন্ড পর্যায়ে রসিদ ও মাঠের আপডেট দেওয়ার প্রতিশ্রুতি রয়েছে, এবং মাসিক গল্পগুলো আপনাকে আপডেট রাখে।'}</p></div></div>
    </div></div></section>

    <section className="band band-mint"><div className="container-x"><div className="section-head"><div><span className="eyebrow">{u.campaigns}</span><h2>{u.campaignsTitle}</h2></div><a className="view-all" href={hrefFor('/campaigns')}>{en ? 'View all campaigns' : 'সব প্রচারণা দেখুন'} →</a></div><div className="grid3">{CAMPAIGNS.slice(0, 3).map((c, i) => <CampaignCard key={c.slug} c={c} i={i} color={CAMP_COLORS[i]} />)}</div><p className="muted" style={{ marginTop: 20, fontSize: 14 }}>{en ? 'Sample figures until live campaign data is connected.' : 'লাইভ প্রচারণার তথ্য যুক্ত না হওয়া পর্যন্ত নমুনা পরিসংখ্যান।'}</p></div></section>

    <section className="band band-white"><div className="container-x"><span className="eyebrow">{u.waysHelp}</span><h2 style={{ marginTop: 12 }}>{en ? 'Give blood, give time, or give your skills.' : 'রক্ত দিন, সময় দিন, অথবা আপনার দক্ষতা দিন।'}</h2><p className="lead">{en ? 'There is a role for everyone.' : 'সবার জন্য একটি ভূমিকা আছে।'}</p>
      <div className="grid3" style={{ marginTop: 28 }}>
        <div className="ways-card ways-red"><span className="eyebrow">{en ? 'Blood donor network' : 'রক্তদাতা নেটওয়ার্ক'}</span><h3>{en ? 'Need blood? Or ready to give it?' : 'রক্ত প্রয়োজন? নাকি দিতে প্রস্তুত?'}</h3><p>{en ? 'Ask for blood by group in an emergency, or join the donor list so a hospital call can reach you in time.' : 'জরুরি প্রয়োজনে গ্রুপ অনুযায়ী রক্তের জন্য আবেদন করুন, অথবা দাতা তালিকায় যোগ দিন যাতে হাসপাতালের কল সময়মতো আপনার কাছে পৌঁছায়।'}</p><a className="btn btn-white" href={hrefFor('/blood')}>{en ? 'Request or give blood' : 'রক্তের আবেদন করুন বা দিন'}</a></div>
        <div className="ways-card ways-teal"><span className="eyebrow">{en ? 'Volunteer call-outs' : 'স্বেচ্ছাসেবক আহ্বান'}</span><h3>{en ? 'When we need hands, members hear first.' : 'যখন আমাদের হাত প্রয়োজন, সদস্যরা প্রথমে জানতে পারেন।'}</h3><p>{en ? 'Join BBDC to take part in drives, camps and distributions in your own neighbourhood in Barishal.' : 'বরিশালে আপনার নিজের মহল্লায় ড্রাইভ, ক্যাম্প ও বিতরণে অংশ নিতে বিবিডিসিতে যোগ দিন।'}</p><a className="btn btn-yellow" href={hrefFor('/volunteer')}>{en ? 'Join BBDC to take part' : 'অংশ নিতে বিবিডিসিতে যোগ দিন'}</a></div>
        <div className="ways-card ways-yellow"><span className="eyebrow">{en ? 'Celebrate With BBDC' : 'বিবিডিসির সঙ্গে উদযাপন'}</span><h3>{en ? 'Turn your special day into someone else’s good day.' : 'আপনার বিশেষ দিনটি অন্য কারো ভালো দিনে পরিণত করুন।'}</h3><p>{en ? 'Birthdays, anniversaries, weddings, graduations or a day in memory of someone you love. Celebrate with a gift to a family in Barishal.' : 'জন্মদিন, বিবাহবার্ষিকী, বিয়ে, গ্র্যাজুয়েশন, নতুন শিশু, অথবা প্রিয় কারো স্মরণে একটি দিন। বরিশালের একটি পরিবারকে উপহার দিয়ে উদযাপন করুন।'}</p><div className="way-chips">{(en ? ['Birthday', 'Anniversary', 'Wedding', 'Graduation', 'New baby', 'In memory'] : ['জন্মদিন', 'বিবাহবার্ষিকী', 'বিয়ে', 'গ্র্যাজুয়েশন', 'নতুন শিশু', 'স্মরণে']).map(x => <span key={x} className="way-chip">{x}</span>)}</div><a className="btn btn-dark" href={hrefFor('/celebrate')}>{en ? 'Plan my celebration' : 'আমার উদযাপনের পরিকল্পনা করুন'}</a></div>
      </div>
      <div className="grid4 ways-tiles" style={{ marginTop: 20 }}>{WAYS.slice(0, 8).map(w => <a key={w.en} href={hrefFor(w.to)} className="way-tile"><span className="way-icon"><Icon name={w.icon} /></span>{pick(lang, w.en, w.bn)}</a>)}</div>
    </div></section>

    <section className="band band-mint"><div className="container-x"><div className="section-head"><div><span className="eyebrow">{u.stories}</span><h2>{u.latest}</h2></div><a className="view-all" href={hrefFor('/stories')}>{en ? 'Read more stories' : 'আরও গল্প পড়ুন'} →</a></div><div className="grid3">{STORIES.slice(0, 3).map(s => <a key={s.slug} className="story-card" href={hrefFor(`/stories/${s.slug}`)}><div className="story-pills"><span className={`pill ${s.pillClass}`}>{pick(lang, s.pill, s.pill_bn)}</span><span className="pill-note">{pick(lang, s.pillNote, s.pillNote_bn)}</span></div><h3>{pick(lang, s.en, s.bn)}</h3><p>{pick(lang, s.ex_en, s.ex_bn)}</p><span className="view-all">{en ? 'Read more' : 'আরও পড়ুন'} →</span></a>)}</div></div></section>

    <div className="band donate-band-wrap">
      <svg className="wave" viewBox="0 0 1440 56" preserveAspectRatio="none" aria-hidden="true"><path d="M0 28 C 240 56 480 0 720 28 C 960 56 1200 0 1440 28 L1440 56 L0 56 Z" fill="#0e3b3a" /></svg>
      <section className="donate-band"><div className="container-x"><div className="split">
        <div className="sticky-col"><span className="eyebrow">{en ? 'Make a Donation' : 'দান করুন'}</span><h2>{en ? 'Support us and make a difference for the future!' : 'আমাদের সহায়তা করুন এবং ভবিষ্যতের জন্য পরিবর্তন আনুন!'}</h2><p className="lead">{en ? 'Give once or every month, to the fund you choose, or pay Zakat, give items, or give your time.' : 'একবার বা প্রতি মাসে দিন, আপনার পছন্দের তহবিলে, অথবা যাকাত দিন, সামগ্রী দিন, বা সময় দিন।'}</p><div className="before-card"><h3>{u.beforeGive}</h3><ul>{(en ? ['Founded in Barishal in 2012, volunteer-led', 'Choose the exact fund where your gift goes', 'A receipt and field update are promised in the backend phase', 'Ask us anything before giving, via Contact or Facebook'] : ['২০১২ সালে বরিশালে প্রতিষ্ঠিত, স্বেচ্ছাসেবকদের নেতৃত্বে', 'আপনার উপহার কোথায় যাবে, সঠিক তহবিল বেছে নিন', 'ব্যাকএন্ড পর্যায়ে রসিদ ও মাঠের আপডেট দেওয়ার প্রতিশ্রুতি', 'দেওয়ার আগে যেকোনো প্রশ্ন করুন, যোগাযোগ বা ফেসবুকের মাধ্যমে']).map(x => <li key={x}><Icon name="check" size={18} />{x}</li>)}</ul></div></div>
        <div><div className="donate-panel"><DonateWidget /></div><ZakatCard /></div>
      </div></div></section>
      <svg className="wave" viewBox="0 0 1440 56" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0 L1440 0 L1440 28 C 1200 56 960 0 720 28 C 480 56 240 0 0 28 Z" fill="#0e3b3a" /></svg>
    </div>

    <section className="band band-white"><div className="container-x"><div className="split">
      <div><span className="eyebrow">{en ? 'Our partners' : 'আমাদের অংশীদার'}</span><h2>{en ? 'We have worked with' : 'আমরা যাদের সঙ্গে কাজ করেছি'}</h2><p className="lead">{en ? 'BBDC’s work in Barishal has brought it together with national and local partners.' : 'বরিশালে বিবিডিসির কাজ জাতীয় ও স্থানীয় অংশীদারদের একত্র করেছে।'}</p><div style={{ marginTop: 24 }}><PartnersMarquee /></div></div>
      <div className="voices-card"><div className="voices-quote"><Icon name="quote" size={36} /></div><h3>{en ? 'Community voices' : 'সম্প্রদায়ের কণ্ঠ'}</h3><p>{en ? 'Volunteers, donors and families can tell BBDC what it meant to them. Stories appear here once they have been checked with the person who shared them.' : 'স্বেচ্ছাসেবক, দাতা বা পরিবার হিসেবে বিবিডিসিকে জানান আপনার কাছে এর অর্থ কী ছিল। গল্প প্রকাশের আগে যিনি শেয়ার করেছেন, তার সঙ্গে যাচাই করা হয়।'}</p><a className="btn btn-outline" href={hrefFor('/contact')}>{en ? 'Share your story' : 'আপনার গল্প শেয়ার করুন'}</a></div>
    </div></div></section>

    <section className="band band-mint"><div className="container-x"><div className="split">
      <div className="vol-art"><VolunteerArt /></div>
      <div><span className="eyebrow">{en ? 'Volunteer with BBDC' : 'বিবিডিসির সঙ্গে স্বেচ্ছাসেবক হোন'}</span><h2 style={{ marginTop: 12 }}>{en ? 'Give your time. Change a neighbour’s story.' : 'আপনার সময় দিন। একজন প্রতিবেশীর গল্প বদলে দিন।'}</h2><p className="lead">{en ? 'Join BBDC as a volunteer. Teach, mentor, run drives or share your skills, every hour you give reaches a neighbour in Barishal.' : 'বিবিডিসিতে স্বেচ্ছাসেবক হিসেবে যোগ দিন। পড়ান, পরামর্শ দিন, ড্রাইভ পরিচালনা করুন বা আপনার দক্ষতা ভাগ করুন, আপনার দেওয়া প্রতিটি ঘণ্টা বরিশালের একজন প্রতিবেশীর কাছে পৌঁছায়।'}</p><ul className="check-list" style={{ marginTop: 20 }}>{(en ? ['Teach and mentor children', 'Run relief and school drives', 'Share your professional skills'] : ['শিশুদের পড়ান ও পরামর্শ দিন', 'ত্রাণ ও স্কুল ড্রাইভ পরিচালনা করুন', 'আপনার পেশাদার দক্ষতা ভাগ করুন']).map(x => <li key={x}><Icon name="check" size={18} />{x}</li>)}</ul><div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 24 }}><a className="btn btn-dark" href={hrefFor('/volunteer')}>{en ? 'Join BBDC' : 'বিবিডিসিতে যোগ দিন'}</a><a className="btn btn-secondary" href={hrefFor('/volunteer')}>{en ? 'See what volunteers do' : 'স্বেচ্ছাসেবকরা কী করেন দেখুন'}</a></div></div>
    </div></div></section>

    <section className="band band-white"><div className="container-x"><Newsletter /></div></section>
  </>
}
