const CACHE = "ng-associate-v1";
const SHELL = ["./", "./index.html", "./manifest.json"];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)));
  self.skipWaiting();
});
self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  // Never cache Supabase/API calls; attendance data must remain live.
  if (url.hostname.includes("supabase.co") || url.pathname.includes("/rest/v1/")) return;
  event.respondWith(
    fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE).then(cache => cache.put(event.request, copy)).catch(()=>{});
      return response;
    }).catch(() => caches.match(event.request).then(r => r || caches.match("./index.html")))
  );
});
