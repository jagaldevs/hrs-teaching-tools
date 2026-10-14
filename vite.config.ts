import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      /**
       * IMPORTANT: keep the service worker OFF in `npm run dev`.
       *
       * Otherwise the SW installed by a previous `npm run preview` or
       * production visit will keep serving cached JS even when Vite's
       * dev server delivers fresh source. This burned us multiple times
       * during the class-filter rework — see WORKLOG §5.6.
       */
      devOptions: { enabled: false },
      manifest: {
        name: 'HRS Brain Breaks',
        short_name: 'Brain Breaks',
        description: 'AC V9-aligned brain-break games for Haileybury Rendall School classrooms. Projector-ready, with a Teacher Tools section for everyday classroom utilities.',
        theme_color: '#0A0A0B',
        background_color: '#0A0A0B',
        display: 'standalone',
        orientation: 'any',
        scope: '/',
        start_url: '/',
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        /**
         * `skipWaiting` + `clientsClaim` collapse SW activation to a
         * single reload after a deploy. Without these, autoUpdate needs
         * TWO reloads (install on reload 1, activate on reload 2) and
         * teachers see stale UI in between.
         */
        skipWaiting: true,
        clientsClaim: true,
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === 'https://fonts.googleapis.com',
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'google-fonts-stylesheets' },
          },
          {
            urlPattern: ({ url }) => url.origin === 'https://fonts.gstatic.com',
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
    }),
  ],
  server: { port: 5173, host: true },
});
