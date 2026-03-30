'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Lang = 'en' | 'ru'

interface LangContextType {
  lang: Lang
  toggle: () => void
}

export const LangContext = createContext<LangContextType>(null!)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  const toggle = () => setLang(l => l === 'en' ? 'ru' : 'en')
  return (
    <LangContext.Provider value={{ lang, toggle }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
