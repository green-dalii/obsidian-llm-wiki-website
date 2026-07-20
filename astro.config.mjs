import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
import mermaid from 'astro-mermaid';
import fs from 'node:fs';
import path from 'node:path';

function buildBlogDateMap() {
  const map = new Map();
  for (const dir of ['./src/content/blog', './src/content/blog-zh']) {
    const abs = path.resolve(dir);
    if (!fs.existsSync(abs)) continue;
    for (const file of fs.readdirSync(abs)) {
      if (!file.endsWith('.md')) continue;
      const text = fs.readFileSync(path.join(abs, file), 'utf8');
      const dateMatch = text.match(/^date:\s*(.+)$/m);
      if (dateMatch) {
        const slug = file.replace(/\.md$/, '');
        const date = new Date(dateMatch[1].trim()).toISOString().split('T')[0];
        map.set(slug, date);
      }
    }
  }
  return map;
}

const blogDateMap = buildBlogDateMap();

// https://astro.build/config
export default defineConfig({
  site: 'https://llmwiki.greenerai.top',
  output: 'static',
  integrations: [
    mermaid({
      theme: 'dark',
    }),
    mdx(),
    react(),
    icon(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', zh: 'zh', ja: 'ja', ko: 'ko', de: 'de', es: 'es', fr: 'fr', pt: 'pt', it: 'it', ru: 'ru', 'zh-tw': 'zh-TW' },
      },
      serialize(item) {
        const url = item.url;
        if (url) {
          const m = url.match(/\/blog\/posts\/([^/]+)\/?$/);
          if (m) {
            const date = blogDateMap.get(m[1]);
            if (date) return { ...item, lastmod: date };
          }
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh', 'ja', 'ko', 'de', 'es', 'fr', 'pt', 'it', 'ru', 'zh-tw'],
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
