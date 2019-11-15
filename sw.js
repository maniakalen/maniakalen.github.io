
var CACHE_DATA_NAME = 'concatel_pwa_data_cache';

self.addEventListener('install', function(event) {
    console.log('Concatel SW install!');
    event.waitUntil(
        caches.open(CACHE_DATA_NAME)
            .then(function(cache) {
                console.log('Cache preparet for work');
            })
    );
    console.log('Concatel SW installed!');
});
self.addEventListener('activate', function(event) {
    console.log('SW activate!');
    console.log('clearing old cache');
    var cacheWhitelist = [];
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
    );


    console.log('SW activated!');
});