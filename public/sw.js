// SKL does not use a service worker. This tombstone replaces and unregisters
// any worker previously installed for this origin so it cannot serve stale
// Next.js runtime or application chunks during local development.
self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.registration.unregister().then(() =>
      self.clients.matchAll({ type: 'window' }).then((clients) => {
        for (const client of clients) client.navigate(client.url)
      }),
    ),
  )
})
