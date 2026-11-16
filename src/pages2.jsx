import { useState } from 'react'
import { useSite } from './context.jsx'
import { t, Faq, Icon, SmartImage, VideoSection } from './components.jsx'
import { IMG } from './data.js'
import { hrefFor } from './site.js'

/* Media: videos only, plus a photo gallery. No text articles here, those
   live on the Blog. The video band is the same shared VideoSection the home
   page uses, so both pages show the same player. */
export function MediaPage() {
  const { lang } = useSite(); const en = lang !== 'bn'
  const photos = [
    { src: IMG.health, label: en ? 'Health camp' : 'স্বাস্থ্য ক্যাম্প' },
    { src: IMG.education, label: en ? 'Education' : 'শিক্ষা' },
    { src: IMG.food, label: en ? 'Food & relief' : 'খাদ্য ও ত্রাণ' },
    { src: IMG.livelihood, label: en ? 'Livelihoods' : 'জীবিকা' },
    { src: IMG.climate, label: en ? 'Climate & environment' : 'জলবায়ু ও পরিবেশ' },
    { src: IMG.mehendi, label: en ? 'Community celebration' : 'কমিউনিটি উদযাপন' },
  ]
  return <>
    <div className="section gsap-item"><h1>{en ? 'Media' : 'মিডিয়া'}</h1><p className="lead">{en ? 'Videos from BBDC, and photos from the field.' : 'বিবিডিসির ভিডিও এবং মাঠের ছবি।'}</p></div>
    <VideoSection />
    <div className="section gsap-item"><h2>{en ? 'Photos' : 'ছবি'}</h2><div className="grid3" style={{ marginTop: 20 }}>{photos.map((p, i) => <div key={i}><SmartImage src={p.src} alt={p.label} style={{ height: 220, borderRadius: 18 }} /><p className="caption">{p.label}</p></div>)}</div><p className="caption">{en ? 'Representative photos.' : 'প্রতিনিধিত্বমূলক ছবি।'}</p></div>
  </>
}
export function VolunteerPage() {
  const { lang } = useSite(); const u = t(null, lang); const en = lang !== 'bn'; const [done, setDone] = useState(false)
  const roles = en ? [['Community drives', 'Help run camps and community events.'], ['Health camps', 'Welcome families and support camp days.'], ['Education', 'Support school kits and awareness sessions.'], ['Food & relief', 'Pack and distribute food and essentials.'], ['Environment', 'Join cleanliness and tree-planting drives.'], ['Media & skills', 'Photos, writing, design or IT help.']] : [['কমিউনিটি ড্রাইভ', 'ক্যাম্প ও কমিউনিটি ইভেন্ট পরিচালনায় সাহায্য।'], ['স্বাস্থ্য ক্যাম্প', 'পরিবারকে স্বাগত জানানো ও ক্যাম্প দিবসে সহায়তা।'], ['শিক্ষা', 'স্কুল কিট ও সচেতনতা সেশনে সহায়তা।'], ['খাদ্য ও ত্রাণ', 'খাদ্য ও প্রয়োজনীয় সামগ্রী প্যাক ও বিতরণ।'], ['পরিবেশ', 'পরিচ্ছন্নতা ও বৃক্ষরোপণ অভিযানে যোগদান।'], ['মিডিয়া ও দক্ষতা', 'ছবি, লেখা, ডিজাইন বা আইটি সহায়তা।']]
  return <div className="section gsap-item"><h1>{u.volunteer}</h1><p className="lead">{en ? 'BBDC runs on volunteers. Join a role, learn on the job, and work in your own neighbourhood in Barishal.' : 'বিবিডিসি স্বেচ্ছাসেবকদের উপর চলে। একটি ভূমিকায় যোগ দিন, কাজের মাধ্যমে শিখুন, এবং বরিশালে আপনার নিজের মহল্লায় কাজ করুন।'}</p>
    <div className="grid3" style={{ marginTop: 20 }}>{roles.map(([a, b]) => <div key={a} className="card"><div className="card-body"><h3>{a}</h3><p className="muted">{b}</p></div></div>)}</div>
    <div className="card" style={{ marginTop: 24 }}><div className="card-body"><h2>{en ? 'Join BBDC' : 'বিবিডিসিতে যোগ দিন'}</h2>{done ? <p className="ok">{en ? 'Thank you, your volunteer application is saved (frontend preview). BBDC will be in touch.' : 'ধন্যবাদ, আপনার স্বেচ্ছাসেবক আবেদন সংরক্ষিত হয়েছে (ফ্রন্টএন্ড প্রিভিউ)।'}</p> : <form onSubmit={e => { e.preventDefault(); setDone(true) }}><label>{en ? 'Name' : 'নাম'}</label><input required className="field" /><label>{en ? 'Phone / Facebook' : 'ফোন / ফেসবুক'}</label><input required className="field" /><label>{en ? 'Role you are interested in' : 'আগ্রহী ভূমিকা'}</label><select className="field">{roles.map(([a]) => <option key={a}>{a}</option>)}</select><label>{en ? 'Tell us briefly why you want to join' : 'কেন যোগ দিতে চান, সংক্ষেপে জানান'}</label><textarea className="field" rows="4" /><button className="btn btn-primary" style={{ marginTop: 14 }}>{u.join}</button></form>}</div></div>
  </div>
}
export function TransparencyPage() {
  const { lang } = useSite(); const u = t(null, lang); const en = lang !== 'bn'
  return <div className="section gsap-item"><h1>{u.transparency}</h1><p className="lead">{en ? 'What BBDC does with gifts, how it reports back, and what to ask before you give.' : 'বিবিডিসি উপহার দিয়ে কী করে, কীভাবে প্রতিবেদন দেয়, এবং দেওয়ার আগে কী জিজ্ঞাসা করবেন।'}</p>
    <h2>{en ? 'Fund direction (illustrative preview)' : 'তহবিলের দিকনির্দেশনা (উদাহরণমূলক প্রিভিউ)'}</h2><table><thead><tr><th>{en ? 'Fund' : 'তহবিল'}</th><th>{en ? 'Share (illustrative)' : 'অংশ (উদাহরণমূলক)'}</th></tr></thead><tbody><tr><td>Food &amp; Relief</td><td>35%</td></tr><tr><td>Education</td><td>25%</td></tr><tr><td>Health</td><td>20%</td></tr><tr><td>Livelihoods</td><td>15%</td></tr><tr><td>Running costs</td><td>5%</td></tr></tbody></table><p className="muted">{u.illustrative}, {en ? 'replace with BBDC’s real figures before launch.' : 'লঞ্চের আগে বিবিডিসির আসল পরিসংখ্যান দিয়ে প্রতিস্থাপন করুন।'}</p>
    <h2>{en ? 'Reporting' : 'প্রতিবেদন'}</h2><ul><li>{en ? 'Donors receive a receipt in the backend phase.' : 'ব্যাকএন্ড পর্যায়ে দাতারা রসিদ পাবেন।'}</li><li>{en ? 'Campaign updates are published as blog posts on this site.' : 'প্রচারণার আপডেট এই সাইটে ব্লগ পোস্ট হিসেবে প্রকাশিত হয়।'}</li><li>{en ? 'Questions about a gift can be asked via Contact or Facebook before or after giving.' : 'কোনো উপহার নিয়ে প্রশ্ন দেওয়ার আগে বা পরে যোগাযোগ বা ফেসবুকের মাধ্যমে করা যাবে।'}</li></ul>
    <Faq q={en ? 'Is my payment secure?' : 'আমার পেমেন্ট কি নিরাপদ?'} a={en ? 'Online payment is not live yet in this frontend. In the backend phase, payments are planned through SSLCommerz, bKash, Nagad and Rocket, with receipts issued.' : 'এই ফ্রন্টএন্ডে অনলাইন পেমেন্ট এখনো চালু নয়। ব্যাকএন্ড পর্যায়ে SSLCommerz, বিকাশ, নগদ ও রকেটের মাধ্যমে পেমেন্টের পরিকল্পনা রয়েছে, রসিদসহ।'} />
  </div>
}
export function ContactPage() {
  const { lang } = useSite(); const u = t(null, lang); const en = lang !== 'bn'; const [done, setDone] = useState(false)
  return <div className="section gsap-item"><h1>{u.contact}</h1><div className="split"><div className="card"><div className="card-body"><h2>{en ? 'Send us a message' : 'আমাদের বার্তা পাঠান'}</h2>{done ? <p className="ok">{en ? 'Thank you, your message is saved (frontend preview).' : 'ধন্যবাদ, আপনার বার্তা সংরক্ষিত হয়েছে (ফ্রন্টএন্ড প্রিভিউ)।'}</p> : <form onSubmit={e => { e.preventDefault(); setDone(true) }}><label>{en ? 'Name' : 'নাম'}</label><input required className="field" /><label>Email</label><input required type="email" className="field" /><label>{en ? 'Message' : 'বার্তা'}</label><textarea required className="field" rows="5" /><button className="btn btn-primary" style={{ marginTop: 14 }}>{en ? 'Send message' : 'বার্তা পাঠান'}</button></form>}</div></div><aside className="sidebar"><div className="card"><div className="card-body"><h3><Icon name="pin" /> Barishal, Bangladesh</h3><p className="muted">{en ? 'BBDC is rooted in Barishal and works with communities across Bangladesh.' : 'বিবিডিসি বরিশালে প্রতিষ্ঠিত এবং বাংলাদেশজুড়ে সম্প্রদায়ের সঙ্গে কাজ করে।'}</p><p><a href="https://facebook.com/BBDCaid" target="_blank" rel="noreferrer"><b>facebook.com/BBDCaid</b></a></p><p><a href={hrefFor('/donate')}>{u.donate}</a> · <a href={hrefFor('/volunteer')}>{u.join}</a></p><p className="muted">{en ? 'Partnership enquiries are welcome, use this form and mention your organisation.' : 'অংশীদারিত্বের অনুসন্ধান স্বাগতম, এই ফর্মটি ব্যবহার করুন এবং আপনার সংগঠনের নাম উল্লেখ করুন।'}</p></div></div></aside></div></div>
}
