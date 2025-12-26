const CACHE_NAME = 'monaco-financial-v2';
const OFFLINE_URL = '/offline';
const CACHEABLE_ASSETS = [
  '/',
  '/manifest.json',
  '/site.webmanifest',
  '/browserconfig.xml',
  // Core fonts
  '/_next/static/media/europa-regular.woff2',
  '/_next/static/media/europa-bold.woff2',
  // Critical images
  '/images/og-image.jpg',
  '/favicon.ico',
  // PWA assets
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/apple-touch-icon.png',
];

// Cache with network-first strategy
const CACHE_FIRST_URLS = [
  // Add paths that should be cached first (e.g., static assets)
  '/_next/static',
  '/images',
  '/icons',
];

// Network-first URLs (dynamic content)
const NETWORK_FIRST_URLS = [
  // Add API endpoints or dynamic content
  '/api',
];

// Install event - cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching core assets');
        return cache.addAll(CACHEABLE_ASSETS);
      })
      .catch((error) => {
        console.error('[Service Worker] Cache addAll error:', error);
      }),
  );
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

// Enhanced fetch handler with different strategies
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Skip non-GET and cross-origin requests
  if (
    event.request.method !== 'GET' ||
    !requestUrl.origin.startsWith(self.location.origin) ||
    requestUrl.protocol === 'chrome-extension:'
  ) {
    return;
  }

  // Handle navigation requests
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          // Try network first for navigation
          const networkResponse = await fetch(event.request);
          // Cache the page for offline use
          const cache = await caches.open(CACHE_NAME);
          await cache.put(event.request, networkResponse.clone());
          return networkResponse;
        } catch (error) {
          // Return cached version or offline page
          const cachedResponse = await caches.match(event.request);
          return cachedResponse || caches.match(OFFLINE_URL);
        }
      })(),
    );
    return;
  }

  // Check if URL matches cache-first pattern
  const shouldCacheFirst = CACHE_FIRST_URLS.some((url) => requestUrl.pathname.startsWith(url));

  // Check if URL matches network-first pattern
  const shouldNetworkFirst = NETWORK_FIRST_URLS.some((url) => requestUrl.pathname.startsWith(url));

  // Handle cache-first strategy
  if (shouldCacheFirst) {
    event.respondWith(
      (async () => {
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) return cachedResponse;

        const networkResponse = await fetch(event.request);
        if (networkResponse.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, networkResponse.clone());
        }
        return networkResponse;
      })(),
    );
    return;
  }

  // Handle network-first strategy (default for API calls)
  if (shouldNetworkFirst) {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(event.request);
          if (networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        } catch (error) {
          const cachedResponse = await caches.match(event.request);
          return (
            cachedResponse ||
            new Response(JSON.stringify({ error: 'Network error' }), {
              status: 408,
              headers: { 'Content-Type': 'application/json' },
            })
          );
        }
      })(),
    );
    return;
  }

  // Default: Cache falling back to network
  event.respondWith(
    (async () => {
      try {
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) return cachedResponse;

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
