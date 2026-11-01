import { createContext, useContext, useEffect, useState } from 'react'
const Ctx = createContext(null)
export function SiteProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('bbdc-lang') || 'en')
  const [theme, setTheme] = useState(() => localStorage.getItem('bbdc-theme') || 'light')
  const [donateFund, setDonateFund] = useState('general')
  useEffect(() => { localStorage.setItem('bbdc-lang', lang); document.documentElement.lang = lang === 'bn' ? 'bn' : 'en' }, [lang])
  useEffect(() => { localStorage.setItem('bbdc-theme', theme); document.documentElement.setAttribute('data-theme', theme) }, [theme])
  return <Ctx.Provider value={{ lang, setLang, theme, setTheme, donateFund, setDonateFund }}>{children}</Ctx.Provider>
}
export function useSite() { return useContext(Ctx) }
export function pick(lang, en, bn) { return lang === 'bn' && bn ? bn : en }
