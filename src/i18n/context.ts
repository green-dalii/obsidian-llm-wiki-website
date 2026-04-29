import { createContext } from 'react';
import type { Translations } from './translations';

type Lang = 'en' | 'zh';

export interface I18nContextType {
  lang: Lang;
  t: Translations;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

export const I18nContext = createContext<I18nContextType | null>(null);
