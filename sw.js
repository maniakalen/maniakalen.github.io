self.addEventListener('install', function(event) {

});
self.addEventListener('activate', function(event) {
    let interval, i = 0;
    event.waitUntil(interval = setInterval(() => {
            self.registration.showNotification("Testing", {
                "body": "Testing " + i
            });
            if (i++ > 10) {
                clearInterval(interval);
            }
        }, 30000)
    );
});
