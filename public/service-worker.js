const VERSION = '0.0.1-b001';
const CACHE_NAME = `BL-cache-${VERSION}`;

const ASSETS = [
  '/',
  '/favicon.ico',
  '/index.html',
  '/manifest.json',
  '/icons/android-chrome-192x192.png',
  '/icons/android-chrome-512x512.png',
  // '/thirdparty/joelcarrouche.com/troika-fontfacekit/web%20fonts/troika_regular_macroman/troika-webfont.woff',
  '/bundle.js',
];

self.addEventListener('install', (domEvent) => {
  console.log('[service-worker] install');

  domEvent.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }),
  );
});

self.addEventListener('fetch', (domEvent) => {
  console.log('[service-worker] fetch');

  domEvent.respondWith(
    caches.match(domEvent.request).then((response) => {
      return response || fetch(domEvent.request);
    }),
  );
});

self.addEventListener('activate', (event) => {
  console.log('[service-worker] activate');
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});
