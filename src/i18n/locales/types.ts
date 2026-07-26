// Shared type for all locale files. Mirrors the plugin's i18n contract:
// the shape is defined once, every locale must conform.
//
// When a locale file is missing a required key, TypeScript will fail the
// build immediately — this is a faster, earlier guard than the Vitest
// parity test, which catches runtime / structural drift on top of it.

export interface Translations {
  nav: {
    howItWorks: string;
    comparison: string;
    features: string;
    ecosystem: string;
    install: string;
    download: string;
    faq: string;
    blog: string;
    home: string;
  };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    seoTitle: string;
    subtitle: string;
    ctaInstall: string;
    ctaObsidian: string;
    obsidianHint: string;
    ctaRead: string;
    legendSources: string;
    legendEntities: string;
    legendConcepts: string;
    scrollHint: string;
  };
  wikiDemo: {
    label: string;
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    step5Title: string;
    step5Desc: string;
    next: string;
    prev: string;
    restart: string;
    sourceNote: string;
    extracted: string;
    generated: string;
    linked: string;
    ask: string;
    answer: string;
  };
  comparison: {
    label: string;
    title: string;
    subtitle: string;
    beforeLabel: string;
    afterLabel: string;
    items: Array<{
      category: string;
      before: string;
      after: string;
    }>;
  };
  features: {
    label: string;
    title: string;
    subtitle: string;
    organizeTitle: string;
    organizeDesc: string;
    organizeTag: string;
    bidirectionalTitle: string;
    bidirectionalDesc: string;
    bidirectionalTag: string;
    conversationalTitle: string;
    conversationalDesc: string;
    conversationalTag: string;
    autoMaintenanceTitle: string;
    autoMaintenanceDesc: string;
    autoMaintenanceTag: string;
    smartFixTitle: string;
    smartFixDesc: string;
    smartFixTag: string;
    granularityTitle: string;
    granularityDesc: string;
    granularityTag: string;
    citationsTitle: string;
    citationsDesc: string;
    citationsTag: string;
    multiFileTitle: string;
    multiFileDesc: string;
    multiFileTag: string;
    tagsTitle: string;
    tagsDesc: string;
    tagsTag: string;
    finalizedTitle: string;
    finalizedDesc: string;
    finalizedTag: string;
    historyTitle: string;
    historyDesc: string;
    historyTag: string;
    // PDF Ingest (v1.25.0) — first-class source format alongside Markdown.
    // Required: lands in the main 9-card grid, so all 11 locales must define it.
    pdfIngestTitle: string;
    pdfIngestDesc: string;
    pdfIngestTag: string;
    // Per-task model selection (v1.24.0) — chip-only entry, optional with EN fallback.
    perTaskModelsTitle?: string;
    perTaskModelsDesc?: string;
    moreCapabilities: string[];
    moreLabel: string;
  };
  install: {
    label: string;
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    pluginPageButton: string;
    cta: string;
  };
  providers: {
    label: string;
    title: string;
    subtitle: string;
    openSourceTitle: string;
    openSourceDesc: string;
    communityTitle: string;
    communityDesc: string;
    vendorTitle: string;
    vendorDesc: string;
    obsidianTitle: string;
    obsidianDesc: string;
    cardLabel: string;
    cardSubtitle: string;
    contextNote: string;
    bestValue: string;
    // Reframed "Bring your own AI" pillars — optional until other locales
    // are translated. Components fall back to English.
    noLockInTitle?: string;
    noLockInDesc?: string;
    privacyTitle?: string;
    privacyDesc?: string;
    affordableTitle?: string;
    affordableDesc?: string;
    localBadge?: string;
  };
  ecosystem: {
    label: string;
    title: string;
    subtitle: string;
    items: Array<{
      name: string;
      standalone: string;
      amplified: string;
    }>;
    cta: string;
  };
  footer: {
    emailUser: string;
    emailDomain: string;
    emailLabel: string;
    github: string;
    discussions: string;
    releases: string;
    obsidian: string;
    sponsorUs: string;
    about: string;
  };
  cta: {
    title: string;
    subtitle: string;
    button: string;
  };
  faq: {
    label: string;
    title: string;
    subtitle: string;
    items: Array<{ q: string; a: string }>;
  };
  /** Trust guarantees block — six hard-coded promises (optional, EN fallback) */
  trust?: {
    label: string;
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      desc: string;
      link?: string;
    }>;
  };
  /** Latest blog section (optional — falls back to English on non-EN/ZH locales) */
  latestBlog?: {
    label: string;
    title: string;
    subtitle: string;
    cta: string;
    readMore: string;
  };
}
