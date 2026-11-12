// パパッとCook サービスワーカー: オフラインでもアプリを開けるようにする
// 更新の反映は「次にアプリを開いたとき」。使用中の画面を途中で切り替えない（Phase 1.13）
const CACHE = 'okazu-v30';
const ASSETS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];
self.addEventListener('install', e => {
  // skipWaiting はしない: 開いている画面がある間は新しいワーカーを待機させ、
  // アプリを閉じて次に開いたときに切り替える
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request)));
});
