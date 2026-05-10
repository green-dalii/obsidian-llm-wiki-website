import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://llmwiki.greenerai.top',
  output: 'static',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
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
