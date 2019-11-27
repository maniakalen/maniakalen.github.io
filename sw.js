
let CACHE_DATA_NAME = 'concatel_pwa_data_cache';
let OFFLINE_URL = '/offline.html';
let pages = [
    '/index.html',
    '/styles.css',
    '/images/concatel.png',
    '/offline.html'
];
self.addEventListener('install', function(event) {
    var images = [];
    var offlineRequest = new Request('offline.html');
    fetch('/styles.css')
        .then(r => r.text())
        .then(r => r.match(/\w{1,}\.png/gi).forEach(i => images.push(i)));
    event.waitUntil(() => {
        fetch(offlineRequest).then(function(response) {
            console.log("WF caching offline");
            return caches.open('offline').then(function(cache) {
                return cache.put(offlineRequest, response.clone());
            });
        });
        caches.open(CACHE_DATA_NAME)
            .then(function (cache) {
                return cache.addAll(pages.concat(images));
            });
    });
});
self.addEventListener('activate', function(event) {
    /*var cacheWhitelist = [];
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );*/
});

self.addEventListener('fetch', (e) => {
    console.log(e.request.mode);
    if (e.request.mode === 'navigate') {
        e.respondWith(() => {
            fetch(e.request).catch(e => {
                console.debug('r');
                return caches.open('offline').then(function (cache) {
                    return cache.match('offline.html');
                });
            });
        });
    }

});
