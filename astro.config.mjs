import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://charlespolart.com',
  output: 'static',
  trailingSlash: 'never',

  integrations: [react(), sitemap()],

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },

  build: {
    inlineStylesheets: 'auto',
    assets: '_assets',
  },

  vite: {
    ssr: {
      noExternal: ['gsap'],
    },
    build: {
      cssMinify: 'lightningcss',
    },
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
});
