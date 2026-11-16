import { createContext, useContext, useEffect, useState } from 'react'
const Ctx = createContext(null)
export function SiteProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('bbdc-lang') || 'en')
  const [donateFund, setDonateFund] = useState('general')
  // Donation state lives here so the form, the Zakat card ("use this as my
  // gift") and the live gift summary all read and change the same values.
  const [donateAmount, setDonateAmount] = useState(1000)
  const [donateCustom, setDonateCustom] = useState('')
  const [donateType, setDonateType] = useState('one-time')
  const [donatePay, setDonatePay] = useState('bKash')
  useEffect(() => { localStorage.setItem('bbdc-lang', lang); document.documentElement.lang = lang === 'bn' ? 'bn' : 'en' }, [lang])
  return <Ctx.Provider value={{ lang, setLang, donateFund, setDonateFund, donateAmount, setDonateAmount, donateCustom, setDonateCustom, donateType, setDonateType, donatePay, setDonatePay }}>{children}</Ctx.Provider>
}
export function useSite() { return useContext(Ctx) }
export function pick(lang, en, bn) { return lang === 'bn' && bn ? bn : en }
