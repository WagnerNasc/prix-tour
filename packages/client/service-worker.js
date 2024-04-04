self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('prix-tour-cache').then(function (cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/your-asset-path',
        '/public/favicon.ico',
        '/src/assets/logo.png',
      ])
    })
  )
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request)
    })
  )
})
