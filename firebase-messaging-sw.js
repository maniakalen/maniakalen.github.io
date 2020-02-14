importScripts('https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.7.0/firebase-messaging.js');
// importScripts('/__/firebase/init.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  "apiKey": "AIzaSyAWn9_i_HDskLOSPW7_z4QpHhmR3UyGqBk",
  "authDomain": "motherearth-1548070679223.firebaseapp.com",
  "databaseURL": "https://motherearth-1548070679223.firebaseio.com",
  "projectId": "motherearth-1548070679223",
  "storageBucket": "motherearth-1548070679223.appspot.com",
  "messagingSenderId": "741346420493",
  "appId": "1:741346420493:web:cca16914b061cf9a6a7244",
  "registrationToUse":false
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
self.messaging = firebase.messaging();
self.messaging.setBackgroundMessageHandler(function(payload) {
  console.debug(payload);
  const title = payload.data.title;
  const option = {
    body: payload.data.message,
    icon: 'Path'
  };
  return self.registration.showNotification(title,option);
});
