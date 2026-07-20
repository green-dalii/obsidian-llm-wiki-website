// i18n module for the Astro website.
// - Re-exports the multi-file `translations` object so every existing
//   `import { translations } from '../../i18n/astro'` keeps working.
// - Exposes `getText(locale, key)` — a fallback-aware accessor that mirrors
//   the plugin's `getText()` pattern. When a locale is missing an optional
//   key (e.g. non-EN locales haven't yet received the new `trust` block),
//   it silently falls back to English so pages still render coherently.

import { translations } from './locales';
import type { Translations } from './locales/types';

export { translations };
export type { Translations };

// Default-expose English for component-level fallback.
const EN = translations.en;

/**
 * Get a top-level translation block for a locale, falling back to English
 * for any optional field that is undefined in the target locale.
 *
 * Use this in Astro components when you want a single import that always
 * returns a complete object:
 *
 *   const t = getTranslations(Astro.props.locale ?? 'en');
 *   <h1>{t.hero.title1}</h1>
 *
 * Currently all components read from the `translations` object directly with
 * a `?? translations.en` inline fallback. This function is the recommended
 * entry point going forward — components can migrate at their own pace.
 */
export function getTranslations(locale: string): Translations {
  const local = translations[locale];
  if (!local) return EN;
  // Shallow merge: top-level keys always present, optional fields filled
  // from EN when missing. Per-field merging is intentionally shallow so the
  // shape stays predictable for the rest of the app.
  return {
    ...local,
    providers: { ...EN.providers, ...local.providers },
    nav: { ...EN.nav, ...local.nav },
    trust: local.trust ?? EN.trust,
  } as Translations;
}

/**
 * Flat string accessor. Resolves `key` against the target locale, with
 * silent fallback to English when the value is undefined or empty. Mirrors
 * the plugin's getText() signature; reserved for future component migration.
 */
export function getText<K extends keyof Translations>(
  locale: string,
  key: K
): Translations[K];
export function getText<K extends keyof Translations>(
  locale: string,
  key: K,
  field: string
): string;
export function getText(
  locale: string,
  key: keyof Translations,
  field?: string
): unknown {
  const local = translations[locale]?.[key];
  const en = EN[key];
  if (field) {
    return (local as Record<string, unknown> | undefined)?.[field]
      ?? (en as Record<string, unknown>)[field]
      ?? '';
  }
  return local ?? en;
}

/** Map website locale codes to Facebook/Google Open Graph locale tags. */
export const OG_LOCALE_MAP: Record<string, string> = {
  en: 'en_US',
  zh: 'zh_CN',
  'zh-tw': 'zh_TW',
  ja: 'ja_JP',
  ko: 'ko_KR',
  de: 'de_DE',
  es: 'es_ES',
  fr: 'fr_FR',
  pt: 'pt_PT',
  it: 'it_IT',
  ru: 'ru_RU',
};
