import { en, zh, ja, ko, de, es } from './translations';
import type { Translations } from './translations';

export const translations = { en, zh, ja, ko, de, es };

export function getT(lang: string): Translations {
  const map: Record<string, Translations> = { en, zh, ja, ko, de, es };
  return map[lang] || en;
}

/**
 * Wraps content in a data-lang div for client-side switching.
 * Use this for any text/markup that differs between languages.
 */
export function langBlock(lang: string, content: string): string {
  return `<div data-lang="${lang}" style="display: none;">${content}</div>`;
}
