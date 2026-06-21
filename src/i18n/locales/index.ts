// Barrel — aggregates all locale files into a single `translations` object.
// Mirrors the plugin's `texts.ts` barrel structure.
//
// Each locale file imports `Translations` from `./types` and is type-checked
// against it: any missing or mistyped key fails the TypeScript build.

import { en } from './en';
import { zh } from './zh';
import { ja } from './ja';
import { ko } from './ko';
import { de } from './de';
import { es } from './es';
import { fr } from './fr';
import { pt } from './pt';

import type { Translations } from './types';

export const translations: Record<string, Translations> = { en, zh, ja, ko, de, es, fr, pt };

export type { Translations };
