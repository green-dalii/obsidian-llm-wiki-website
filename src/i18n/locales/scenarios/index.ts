// Barrel — aggregates all locale files into a single `scenarios` object.
// Mirrors the structure of `../index.ts`.

import { en } from './en';
import { zh } from './zh';
import { ja } from './ja';
import { ko } from './ko';
import { de } from './de';
import { es } from './es';
import { fr } from './fr';
import { pt } from './pt';
import { it } from './it';
import { ru } from './ru';
import { zhTw } from './zh-tw';

import type { ScenariosTranslation } from './types';

export const scenariosTranslations: Record<string, ScenariosTranslation> = {
  en,
  zh,
  ja,
  ko,
  de,
  es,
  fr,
  pt,
  it,
  ru,
  'zh-tw': zhTw,
};

export type { ScenariosTranslation, Scenario, ScenarioId } from './types';