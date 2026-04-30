import { en, zh } from './translations';
import type { Translations } from './translations';

export const translations = { en, zh };

export function getT(lang: string): Translations {
  return lang === 'zh' ? zh : en;
}

/**
 * Wraps content in a data-lang div for client-side switching.
 * Use this for any text/markup that differs between languages.
 */
export function langBlock(lang: string, content: string): string {
  return `<div data-lang="${lang}" style="display: none;">${content}</div>`;
}
