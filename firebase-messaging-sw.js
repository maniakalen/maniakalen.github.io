
importScripts("https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js");
self.messaging = null;
self.addEventListener('activate', function(event) {
    event.waitUntil(new Promise((r, j) => {
        console.debug("Installing");
        fetch('messaging.json')
            .then(data => data.json())
            .then(data => firebase.initializeApp(data))
            .then(() => { self.messaging = firebase.messaging(); })
            //.then(() => { console.debug('request perm'); return messaging.requestPermission(); })
            .then(() => { return self.messaging.getToken(); })
            .then((currentToken) => {
                if (currentToken) {
                    console.debug("Token: " + currentToken);
                    self.registration.showNotification("Token",
                        {
                            body: currentToken
                        });
                    //Send token to server to match user with token.
                    self.messaging.setBackgroundMessageHandler(function(payload) {
                        console.log('[firebase-messaging-sw.js] Received background message ', payload);
                        // Customize notification here
                        const notificationTitle = 'Background Message Title';
                        const notificationOptions = {
                            body: 'Background Message body.',
                            icon: '/firebase-logo.png'
                        };

                        return self.registration.showNotification(notificationTitle,
                            notificationOptions);
                    });
                }
            });

        Promise.resolve(self.registration.showNotification("All registered", {"body": "Ready to receive push" +
                " notifications"}));
    }));
});


