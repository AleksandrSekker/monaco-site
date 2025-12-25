const CACHE_NAME = 'monaco-financial-v1';
const OFFLINE_URL = '/offline';
const ASSETS_TO_CACHE = [
  '/',
  '/_next/static/css/app/layout.css',
  '/_next/static/media/hero-image.avif',
  '/_next/static/media/europa-regular.woff2',
  '/_next/static/media/europa-bold.woff2',
  '/images/og-image.jpg',
  '/favicon.ico',
  '/manifest.json',
  '/site.webmanifest',
  '/browserconfig.xml',
  // Add PWA icons
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/apple-touch-icon.png',
  // Add other critical assets
];

// Install event - cache all static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching all: app shell and content');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .catch((error) => {
        console.error('[Service Worker] Cache addAll error:', error);
      }),
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name)));
      })
      .then(() => {
        // Enable navigation preload if it's supported
        if (self.registration.navigationPreload) {
          return self.registration.navigationPreload.enable();
        }
      })
      .then(() => self.clients.claim()),
  );
});

// Fetch event - network first, then cache
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);

  // Skip cross-origin requests and chrome-extension://
  if (!requestUrl.origin.startsWith(self.location.origin) || requestUrl.protocol === 'chrome-extension:') {
    return;
  }

  // Handle navigation requests
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          // Try network first
          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch (error) {
          // If offline or network fails, return cached version or offline page
          const cachedResponse = await caches.match(event.request);
          return cachedResponse || caches.match(OFFLINE_URL);
        }
      })(),
    );
    return;
  }

  // For other requests, try cache first, then network
  event.respondWith(
    (async () => {
      try {
        // Try to get from cache first
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) return cachedResponse;

        // If not in cache, try network
        const networkResponse = await fetch(event.request);

        // If the response is valid, cache it
        if (networkResponse && networkResponse.status === 200) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, networkResponse.clone());
        }

        return networkResponse;
      } catch (error) {
        // If both fail, return offline page for document requests
        if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match(OFFLINE_URL);
        }
        // For other requests, return a placeholder or nothing
        return new Response('', { status: 408, statusText: 'Offline' });
      }
    })(),
  );
});

// Push notification event
self.addEventListener('push', (event) => {
  const data = event.data?.json() || { title: 'New Notification', body: 'You have a new notification' };

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-192x192.png',
      vibrate: [200, 100, 200, 100, 200, 100, 200],
      tag: 'notification',
    }),
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    }),
  );
});
