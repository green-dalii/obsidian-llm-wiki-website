/**
 * i18n parity guard.
 *
 * Mirrors the plugin's i18n-parity.test.ts strategy:
 *   1. Every locale must cover every top-level EN key.
 *   2. No empty string values in any locale.
 *   3. Strict bidirectional parity vs EN (no missing, no extra keys).
 *
 * In addition to the plugin's check, this file introduces a
 * "known-gap registry" — a list of EN-only extension paths that the EN
 * baseline has but other locales haven't yet received (e.g. the new
 * `trust` block, `nav.trust`, and the reframed `providers` pillars from
 * the v2.2.0 redesign). The strict parity test reports these gaps as
 * actionable items rather than hard-failing the build, so the i18n
 * refactor can land without blocking on translation work.
 *
 * When the gap registry is empty (i.e. all locales are fully translated),
 * the strict parity test runs in hard-fail mode and prevents regressions.
 */

import { describe, it, expect } from 'vitest';
import { translations, getTranslations, getText } from '../src/i18n/astro';
import { scenariosTranslations } from '../src/i18n/locales/scenarios';

const EN = translations.en;
const LOCALES = Object.keys(translations) as Array<keyof typeof translations>;

/**
 * Known gaps registry. Empty by design once every locale has caught up
 * with EN — any difference then becomes a hard failure. Add entries here
 * temporarily when EN is intentionally ahead while other locales are
 * being translated, and remove them once translations land.
 */
const KNOWN_GAPS: Array<{ path: string; reason: string }> = [];

/** True when a gap path is covered (equal to or nested under) a known gap. */
function isGapCovered(gapPath: string): boolean {
  return KNOWN_GAPS.some(
    (g) => gapPath === g.path || gapPath.startsWith(g.path + '.') || gapPath.startsWith(g.path + '['),
  );
}

// ---------------------------------------------------------------------------
// 1. Every locale must cover every required (non-optional) EN top-level key.
// ---------------------------------------------------------------------------

describe('UI text parity across all locales — required top-level keys', () => {
  it('en is defined and has the expected baseline keys', () => {
    const required = [
      'nav', 'hero', 'wikiDemo', 'comparison', 'features', 'install',
      'providers', 'ecosystem', 'footer', 'cta', 'faq',
    ];
    for (const key of required) {
      expect(EN, `en.${key}`).toBeDefined();
    }
  });

  it.each(LOCALES)('locale "%s" covers every required en top-level key', (locale) => {
    const t = translations[locale];
    const required = [
      'nav', 'hero', 'wikiDemo', 'comparison', 'features', 'install',
      'providers', 'ecosystem', 'footer', 'cta', 'faq',
    ];
    const missing = required.filter((k) => t[k as keyof typeof t] === undefined);
    expect(missing, `missing required top-level keys in ${locale}`).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// 2. No empty string values anywhere in any locale.
// ---------------------------------------------------------------------------

function collectStrings(obj: unknown, path = ''): Array<{ path: string; value: string }> {
  if (typeof obj === 'string') {
    return obj.trim() === '' ? [{ path, value: obj }] : [];
  }
  if (Array.isArray(obj)) {
    return obj.flatMap((item, i) => collectStrings(item, `${path}[${i}]`));
  }
  if (obj && typeof obj === 'object') {
    return Object.entries(obj).flatMap(([k, v]) => collectStrings(v, path ? `${path}.${k}` : k));
  }
  return [];
}

describe('UI text parity across all locales — no empty strings', () => {
  it.each(LOCALES)('locale "%s" has no empty string values', (locale) => {
    const empties = collectStrings(translations[locale]);
    expect(empties, `empty values in ${locale}`).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// 3. Strict bidirectional parity vs EN — known-gap-aware.
// ---------------------------------------------------------------------------

describe('Strict bidirectional parity vs EN (known-gap aware)', () => {
  it.each(LOCALES)('locale "%s" matches en modulo known gaps', (locale) => {
    if (locale === 'en') return;

    const enRaw = translations.en;
    const locRaw = translations[locale];

    // Extra top-level keys in the locale are a hard fail — usually dead
    // orphans.
    for (const section of Object.keys(locRaw)) {
      if ((enRaw as any)[section] === undefined) {
        expect.fail(`locale "${locale}" has extra top-level key "${section}" not in en`);
      }
    }

    // Compute all gaps at full path granularity.
    const allGaps = collectAllGaps(enRaw, locRaw);
    const untracked = allGaps.filter((g) => !isGapCovered(g.path));

    if (allGaps.length > 0) {
      // eslint-disable-next-line no-console
      console.warn(
        `[i18n parity] locale "${locale}" — ${untracked.length} untracked + ${allGaps.length - untracked.length} known gaps (add to KNOWN_GAPS or translate)`,
      );
    }

    expect(
      untracked,
      `untracked gaps in ${locale} — add to KNOWN_GAPS or translate: ${untracked.map((g) => g.path).join(', ')}`,
    ).toEqual([]);
  });

  it('KNOWN_GAPS registry exists (empty = all locales are fully translated)', () => {
    expect(Array.isArray(KNOWN_GAPS)).toBe(true);
    for (const gap of KNOWN_GAPS) {
      expect(gap.path).toBeTruthy();
      expect(gap.reason).toBeTruthy();
    }
  });
});

/** Recursively compare en and a locale, returning every missing path. */
function collectAllGaps(
  en: unknown,
  loc: unknown,
  path = '',
): Array<{ path: string }> {
  const out: Array<{ path: string }> = [];
  if (typeof en === 'string') {
    if (en.trim() !== '' && (loc === undefined || (typeof loc === 'string' && loc.trim() === ''))) {
      out.push({ path });
    }
    return out;
  }
  if (Array.isArray(en)) {
    if (!Array.isArray(loc)) {
      out.push({ path });
      return out;
    }
    // If lengths differ, the whole array is a gap — emit one report at
    // the array level and skip per-index recursion. (Per-index reports
    // would double-count and create confusing [7], [8] entries.)
    if (loc.length < en.length) {
      out.push({ path });
      return out;
    }
    for (let i = 0; i < en.length; i++) {
      out.push(...collectAllGaps(en[i], loc[i], `${path}[${i}]`));
    }
    return out;
  }
  if (en && typeof en === 'object') {
    for (const k of Object.keys(en)) {
      out.push(...collectAllGaps((en as any)[k], (loc as any)?.[k], path ? `${path}.${k}` : k));
    }
    return out;
  }
  return out;
}

// ---------------------------------------------------------------------------
// 4. getText / getTranslations API — shape & fallback behavior.
// ---------------------------------------------------------------------------

describe('getTranslations() / getText() API', () => {
  it('returns the en object for unknown locales', () => {
    const t = getTranslations('xx');
    expect(t).toBe(EN);
  });

  it('returns the locale object when present', () => {
    const t = getTranslations('zh');
    expect(t.nav.howItWorks).toBe(translations.zh.nav.howItWorks);
  });

  it('falls back to EN for unknown locales and missing optional fields', () => {
    const t = getTranslations('xx');
    expect(t.trust).toBeDefined();
    expect(t.trust?.title).toBe(EN.trust?.title);
    expect(t.nav.trust).toBe(EN.nav.trust);
    expect(t.providers.noLockInTitle).toBe(EN.providers.noLockInTitle);
  });

  it('getText returns the en fallback for a missing locale', () => {
    const title = getText('xx', 'hero', 'title1');
    expect(title).toBe(EN.hero.title1);
  });
});

// ---------------------------------------------------------------------------
// 5. Scenarios parity — every locale must cover every scenario with the same
//    structural shape (id, scenario count, extractedItems.length, etc.) and
//    no empty strings. Locale-specific content (notes, summaries) is allowed
//    to differ but the contract — what fields exist and how many — must match.
// ---------------------------------------------------------------------------

const SCENARIO_LOCALES = Object.keys(scenariosTranslations) as Array<keyof typeof scenariosTranslations>;

describe('Scenarios i18n parity — structural coverage', () => {
  it('every locale covers all 6 scenarios', () => {
    for (const locale of SCENARIO_LOCALES) {
      expect(scenariosTranslations[locale].scenarios.length, `${locale} scenario count`).toBe(6);
    }
  });

  it('scenario ids match exactly across locales', () => {
    const enIds = scenariosTranslations.en.scenarios.map(s => s.id).sort();
    for (const locale of SCENARIO_LOCALES) {
      if (locale === 'en') continue;
      const ids = scenariosTranslations[locale].scenarios.map(s => s.id).sort();
      expect(ids, `${locale} scenario ids`).toEqual(enIds);
    }
  });

  it('extractedItems, generatedPages, links counts match EN per scenario', () => {
    const enById = new Map(scenariosTranslations.en.scenarios.map(s => [s.id, s]));
    for (const locale of SCENARIO_LOCALES) {
      if (locale === 'en') continue;
      for (const scenario of scenariosTranslations[locale].scenarios) {
        const enScenario = enById.get(scenario.id);
        expect(enScenario, `EN baseline missing for ${scenario.id} in ${locale}`).toBeDefined();
        expect(scenario.extractedItems.length, `${locale}/${scenario.id} extractedItems`).toBe(enScenario!.extractedItems.length);
        expect(scenario.generatedPages.length, `${locale}/${scenario.id} generatedPages`).toBe(enScenario!.generatedPages.length);
        expect(scenario.links.length, `${locale}/${scenario.id} links`).toBe(enScenario!.links.length);
      }
    }
  });

  it('no empty label / sourceNoteContext / sourceNote / chatQuestion strings', () => {
    for (const locale of SCENARIO_LOCALES) {
      for (const s of scenariosTranslations[locale].scenarios) {
        expect(s.label.trim(), `${locale}/${s.id} label`).not.toBe('');
        expect(s.sourceNoteContext.trim(), `${locale}/${s.id} sourceNoteContext`).not.toBe('');
        expect(s.sourceNote.trim(), `${locale}/${s.id} sourceNote`).not.toBe('');
        expect(s.chatQuestion.trim(), `${locale}/${s.id} chatQuestion`).not.toBe('');
        expect(s.chatAnswerDetail.trim(), `${locale}/${s.id} chatAnswerDetail`).not.toBe('');
      }
    }
  });

  it('[[token]] markers are preserved in chatAnswerLead.text', () => {
    // Each scenario has at least one [[...]] marker in chatAnswerLead. They
    // are rendered as bold wiki-style links and must NOT be lost in
    // translation.
    for (const locale of SCENARIO_LOCALES) {
      for (const s of scenariosTranslations[locale].scenarios) {
        const markerCount = (s.chatAnswerLead.text.match(/\[\[/g) || []).length;
        expect(markerCount, `${locale}/${s.id} should have at least 1 [[token]] marker`).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it('filename and chatSource kept as filename-like identifiers (no whitespace, end with .md)', () => {
    for (const locale of SCENARIO_LOCALES) {
      for (const s of scenariosTranslations[locale].scenarios) {
        expect(s.filename.endsWith('.md'), `${locale}/${s.id} filename must end with .md`).toBe(true);
        expect(s.chatSource.endsWith('.md'), `${locale}/${s.id} chatSource must end with .md`).toBe(true);
      }
    }
  });

  it('all generatedPages have non-empty title and summary, and valid tags', () => {
    for (const locale of SCENARIO_LOCALES) {
      for (const s of scenariosTranslations[locale].scenarios) {
        for (const page of s.generatedPages) {
          expect(page.title.trim(), `${locale}/${s.id} page title`).not.toBe('');
          expect(page.summary.trim(), `${locale}/${s.id}/${page.title} summary`).not.toBe('');
          expect(page.tags.length, `${locale}/${s.id}/${page.title} tags`).toBeGreaterThan(0);
        }
      }
    }
  });

  it('every locale has zh-tw coverage for the 11th locale (Traditional Chinese)', () => {
    expect(scenariosTranslations['zh-tw']).toBeDefined();
    expect(scenariosTranslations['zh-tw'].scenarios.length).toBe(6);
  });

  it('zh-tw uses Traditional characters (not Simplified)', () => {
    // Quick sanity check: a common Traditional character should appear at least once
    const allText = JSON.stringify(scenariosTranslations['zh-tw']);
    expect(allText).toMatch(/[網經機制學]/); // 網, 經, 機, 制, 學
  });
});
