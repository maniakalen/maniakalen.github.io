
importScripts("https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js");
self.messaging = null;
self.broadcasting = null;
self.addEventListener('activate', function(event) {
    event.waitUntil(new Promise((r, j) => {
        fetch('messaging.json')
            .then(data => data.json())
            .then(data => firebase.initializeApp(data))
            .then(() => { self.messaging = firebase.messaging(); })
            .then(() => { return self.messaging.getToken(); })
            .then((currentToken) => {
                if (currentToken) {
                    //Send token to server to match user with token.
                    self.messaging.setBackgroundMessageHandler(function(payload) {
                        const notificationTitle = 'Background Message Title';
                        const notificationOptions = {
                            body: 'Background Message body.',
                            icon: '/firebase-logo.png'
                        };

                        return self.registration.showNotification(notificationTitle,
                            notificationOptions);
                    });

                    self.broadcasting = new BroadcastChannel("tracker-sw-broadcast");
                    self.broadcasting.postMessage({"token": currentToken});
                }
            });
    }));
});


