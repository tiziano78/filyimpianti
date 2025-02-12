/// <reference lib="webworker" />

const CACHE_NAME = 'fily-impianti-cache-v1'

const cacheFirst = async (request: Request) => {
  const cache = await caches.open(CACHE_NAME)
  const cached = await cache.match(request)
  
  if (cached) return cached
  
  const response = await fetch(request)
  await cache.put(request, response.clone())
  return response
}

self.addEventListener('fetch', function(e) {
  const event = e as FetchEvent
  if (event.request.url.includes('/images/')) {
    event.respondWith(cacheFirst(event.request))
  }
})

self.addEventListener('install', function(e) {
  const event = e as ExtendableEvent
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/images/',
        '/fonts/',
        '/icons/'
      ])
    })
  )
})

self.addEventListener('activate', function(e) {
  const event = e as ExtendableEvent
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    })
  )
}) 