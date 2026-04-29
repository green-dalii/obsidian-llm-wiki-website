import { useState, useCallback, useMemo } from 'react';
import { en, zh, type Translations } from './translations';
import { I18nContext } from './context';

type Lang = 'en' | 'zh';

const translations: Record<Lang, Translations> = { en, zh };

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
