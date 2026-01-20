self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("quiz-cache").then(cache => {
      return cache.addAll([
        "index.html",
        "style.css",
        "app.js"
      ]);
    })
  );
});
