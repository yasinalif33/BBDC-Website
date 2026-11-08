import { createContext, useContext, useEffect, useState } from 'react'
const Ctx = createContext(null)
export function SiteProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('bbdc-lang') || 'en')
  const [donateFund, setDonateFund] = useState('general')
  useEffect(() => { localStorage.setItem('bbdc-lang', lang); document.documentElement.lang = lang === 'bn' ? 'bn' : 'en' }, [lang])
  return <Ctx.Provider value={{ lang, setLang, donateFund, setDonateFund }}>{children}</Ctx.Provider>
}
export function useSite() { return useContext(Ctx) }
export function pick(lang, en, bn) { return lang === 'bn' && bn ? bn : en }
