import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://llmwiki.greenerai.top',
  output: 'static',
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', zh: 'zh', ja: 'ja', ko: 'ko', de: 'de', es: 'es' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh', 'ja', 'ko', 'de', 'es'],
    routing: {
      prefixDefaultLocale: false, // EN: /, ZH: /zh/
    },
  },
  server: {
    port: 3000,
  },
  build: {
    assets: 'assets',
  },
});
