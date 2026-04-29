import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { en, zh, type Translations } from './translations';

type Lang = 'en' | 'zh';

const translations: Record<Lang, Translations> = { en, zh };

interface I18nContextType {
  lang: Lang;
  t: Translations;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  const setLang = useCallback((l: Lang) => setLangState(l), []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => (prev === 'en' ? 'zh' : 'en'));
  }, []);

  const t = useMemo(() => translations[lang], [lang]);

  return (
    <I18nContext.Provider value={{ lang, t, setLang, toggleLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextType {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
