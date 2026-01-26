// Ruby3araby Service Worker
// Provides offline functionality and caching for the PWA

const CACHE_VERSION = 'v4';
const STATIC_CACHE = `ruby3araby-static-${CACHE_VERSION}`;
const PAGES_CACHE = `ruby3araby-pages-${CACHE_VERSION}`;
const FONTS_CACHE = `ruby3araby-fonts-${CACHE_VERSION}`;
const WASM_CACHE = 'ruby3araby-wasm-cache-v1';

// Core pages to precache
const CORE_PAGES = [
  '/',
  '/glossary',
  '/progress',
  '/offline.html',
];

// Static assets to precache on install
const PRECACHE_ASSETS = [
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/apple-touch-icon.png',
  '/course.json',
];

// Dynamically get all lesson URLs from course.json
async function getLessonUrls() {
  try {
    const response = await fetch('/course.json');
    const course = await response.json();
    const urls = [];

    for (const section of course.sections) {
      for (const lesson of section.lessons) {
        urls.push(`/lessons/${section.slug}/${lesson.slug}`);
      }
    }

    return urls;
  } catch (error) {
    console.warn('Failed to fetch course.json:', error);
    return [];
  }
}

// Install event - precache all content
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      // Cache static assets
      const staticCache = await caches.open(STATIC_CACHE);
      await staticCache.addAll(PRECACHE_ASSETS);

      // Get lesson URLs dynamically
      const lessonUrls = await getLessonUrls();
      const allPages = [...CORE_PAGES, ...lessonUrls];

      // Cache all pages
      const pagesCache = await caches.open(PAGES_CACHE);

      // Cache pages in parallel with error handling
      await Promise.all(
        allPages.map(async (url) => {
          try {
            const response = await fetch(url);
            if (response.ok) {
              await pagesCache.put(url, response);
            }
          } catch (error) {
            console.warn(`Failed to cache ${url}:`, error);
          }
        })
      );
    })()
  );
  // Don't call skipWaiting() here - let the user control when to update
  // via the "Update available" banner in PWAProvider
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            // Delete old versioned caches but keep WASM cache
            return (
              cacheName.startsWith('ruby3araby-') &&
              cacheName !== STATIC_CACHE &&
              cacheName !== PAGES_CACHE &&
              cacheName !== FONTS_CACHE &&
              cacheName !== WASM_CACHE
            );
          })
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
  // Take control of all pages immediately
  self.clients.claim();
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Handle different types of requests with appropriate strategies
  if (isWasmRequest(url)) {
    event.respondWith(cacheFirstStrategy(request, WASM_CACHE));
  } else if (isStaticAsset(url)) {
    event.respondWith(cacheFirstStrategy(request, STATIC_CACHE));
  } else if (isFontRequest(url)) {
    event.respondWith(cacheFirstStrategy(request, FONTS_CACHE));
  } else if (isNavigationRequest(request)) {
    event.respondWith(networkFirstWithOfflineFallback(request));
  } else if (isApiRequest(url)) {
    // Don't cache API requests
    return;
  } else {
    event.respondWith(staleWhileRevalidate(request, PAGES_CACHE));
  }
});

// Check if request is for WASM files
function isWasmRequest(url) {
  return url.pathname.endsWith('.wasm') ||
         (url.href.includes('ruby') && url.href.includes('wasm'));
}

// Check if request is for static assets
function isStaticAsset(url) {
  return url.pathname.startsWith('/_next/static/') ||
         url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|webp)$/);
}

// Check if request is for fonts
function isFontRequest(url) {
  return url.pathname.match(/\.(woff|woff2|ttf|otf|eot)$/) ||
         url.hostname === 'fonts.googleapis.com' ||
         url.hostname === 'fonts.gstatic.com';
}

// Check if request is a navigation request
function isNavigationRequest(request) {
  return request.mode === 'navigate';
}

// Check if request is an API request
function isApiRequest(url) {
  return url.pathname.startsWith('/api/');
}

// Cache-first strategy: Try cache, fall back to network
async function cacheFirstStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    // Cache successful responses
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Return a fallback or error response
    return new Response('Offline', { status: 503 });
  }
}

// Network-first with offline fallback for navigation
async function networkFirstWithOfflineFallback(request) {
  const pagesCache = await caches.open(PAGES_CACHE);

  try {
    const networkResponse = await fetch(request);
    // Cache successful navigation responses
    if (networkResponse.ok) {
      pagesCache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Try to return cached version from PAGES_CACHE first
    const cachedResponse = await pagesCache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Also check STATIC_CACHE (for precached pages like /)
    const staticCache = await caches.open(STATIC_CACHE);
    const staticCachedResponse = await staticCache.match(request);
    if (staticCachedResponse) {
      return staticCachedResponse;
    }

    // Return offline page as fallback
    const offlineResponse = await pagesCache.match('/offline.html');
    if (offlineResponse) {
      return offlineResponse;
    }

    return new Response('Offline', { status: 503 });
  }
}

// Stale-while-revalidate strategy
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  // Start fetch in background to update cache
  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch(() => null);

  // Return cached response immediately if available
  if (cachedResponse) {
    return cachedResponse;
  }

  // Otherwise wait for network response
  const networkResponse = await fetchPromise;
  if (networkResponse) {
    return networkResponse;
  }

  // Fallback to offline response
  return new Response('Offline', { status: 503 });
}

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
