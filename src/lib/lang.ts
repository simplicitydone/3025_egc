import { createContext, useContext } from 'react'

// Bilingual reference: the whole UI shows either English or Korean.
export type Lang = 'en' | 'kr'

export interface LangCtx {
  lang: Lang
  setLang: (l: Lang) => void
}

export const LANG_KEY = 'egc-lang'
export const LangContext = createContext<LangCtx>({ lang: 'en', setLang: () => {} })

export function useLang(): LangCtx {
  return useContext(LangContext)
}
