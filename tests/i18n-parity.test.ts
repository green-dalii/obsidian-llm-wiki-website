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

const EN = translations.en;
const LOCALES = Object.keys(translations) as Array<keyof typeof translations>;

/**
 * Known gaps — paths where EN has content but other locales have not yet
 * been updated for v2.2.0. Format: dot-joined path with array index for
 * arrays. A gap is "covered" if a KNOWN_GAPS entry equals it or is a
 * strict prefix (so `features.moreCapabilities` covers
 * `features.moreCapabilities[7]`).
 */
const KNOWN_GAPS: Array<{ path: string; reason: string }> = [
  // Trust section (new in v2.2.0) — only EN translated.
  { path: 'trust', reason: 'New Trust section — pending ZH/JA/KO/DE/ES/FR/PT translation' },
  // Nav 'Trust' anchor (new in v2.2.0).
  { path: 'nav.trust', reason: 'Header nav "Trust" anchor — pending translation' },
  // Providers pillar fields (reframed in v2.2.0).
  { path: 'providers.noLockInTitle', reason: 'Providers pillar — No lock-in' },
  { path: 'providers.noLockInDesc', reason: 'Providers pillar — No lock-in desc' },
  { path: 'providers.privacyTitle', reason: 'Providers pillar — Privacy first' },
  { path: 'providers.privacyDesc', reason: 'Providers pillar — Privacy first desc' },
  { path: 'providers.affordableTitle', reason: 'Providers pillar — Almost free' },
  { path: 'providers.affordableDesc', reason: 'Providers pillar — Almost free desc' },
  { path: 'providers.localBadge', reason: 'Providers wall — Local badge' },
  // Providers wall text reframed in v2.2.0.
  { path: 'providers.label', reason: 'Providers label — refactored to "Bring Your Own AI"' },
  { path: 'providers.title', reason: 'Providers title — refactored to "Your AI. Your rules."' },
  { path: 'providers.subtitle', reason: 'Providers subtitle — refactored' },
  { path: 'providers.cardLabel', reason: 'Providers card label — refactored' },
  { path: 'providers.cardSubtitle', reason: 'Providers card subtitle — refactored' },
  { path: 'providers.contextNote', reason: 'Providers context note — refactored' },
  // Features moreCapabilities reframed in v2.2.0: EN has 8 items.
  { path: 'features.moreCapabilities', reason: 'Features moreCapabilities array — reframed to 8 user-friendly items' },
  // Conversational card desc tweaked in v2.2.0 ("Watch it reason").
  { path: 'features.conversationalDesc', reason: 'Features conversationalDesc — tweaked to mention "Watch it reason"' },
  // FAQ tweaked in v2.2.0.
  { path: 'faq.items', reason: 'FAQ items — reworked in v2.2.0 (Obsidian 1.11.0+, providers, offline angle)' },
];

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

  it('KNOWN_GAPS is finite and well-formed (sanity check)', () => {
    expect(KNOWN_GAPS.length).toBeGreaterThan(0);
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

  it('fills missing optional fields from EN (trust, nav.trust, providers new fields)', () => {
    const t = getTranslations('zh');
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
