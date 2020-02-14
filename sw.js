
self.addEventListener('install', (e) => {
  const idb = indexedDB.open('sii-tracker-app', 1);
  idb.onupgradeneeded = function(event) {
    let db = event.target.result;
    if (!db.objectStoreNames.contains('actions_sync')) {
      db.createObjectStore('actions_sync', {keyPath:'timestamp'});
    }
  };
  e.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
self.online = true;
self.visible = true;
self.addEventListener('fetch', (e) => {
  if (!self.online) {
    return e.respondWith(self.recordFetch(e));
  }
  return e.request.default;
});
self.addEventListener('message', function(event) {
  let data = event.data;
  if (data.command === "networkState") {
    self.online = data.message === 'online';
  } else if (data.command === 'visibility') {
    self.visible = data.message;
  }
});
let safeClone = function(obj) {
  let o = {}, temp;
  for (let i in obj) {
    temp = obj[i];
    if (typeof temp === 'object') {
      o[i] = safeClone(temp);
    } else if (typeof temp === 'function') {
    } else {
      o[i] = temp;
    }
  }
  return o;
};
self.recordFetch = function(fetch) {
  const stream = new ReadableStream({
    start(controller) {
      if (fetch.request.url.indexOf('/api1/') !== -1) {
        const req = new Request(fetch.request);
        const idb = indexedDB.open('sii-tracker-app', 1);
        idb.onsuccess = async function (event) {
          let db = event.target.result;
          const body = req.method === 'POST'?await req.json():null;
          let item = {
            timestamp: Date.now(),
            fetch: safeClone(fetch.request),
            body: body
          };
          let tx = db.transaction(['actions_sync'], 'readwrite');
          let store = tx.objectStore('actions_sync');
          await store.add(item);

          return tx.complete;
        };
      }


      const text = new Uint8Array(4);
      text[0] = 0;
      controller.enqueue(text);
    }
  });
  return new Response(stream);
};

self.syncActions = function() {
  return (new Promise((r, j) => {
    const idb = indexedDB.open('sii-tracker-app', 1);
    idb.onsuccess = function(event) {
      let db = event.target.result;
      let tx = db.transaction('actions_sync', 'readwrite');
      let store = tx.objectStore('actions_sync');
      let actions = store.getAll();
      actions.onsuccess = function(resp) {
        let actions = resp.target.result;
        actions.sort((a, b) => a.timestamp - b.timestamp);
        runActionsSync(actions, db).then(rs => {
          if (rs.length === 0) {
            return;
          }
          if (!self.visible) {
            self.registration.showNotification('Sync', {'body': 'Actions syncronized'});
          } else {
            self.clients.matchAll().then((clients) => {
              clients.forEach(c => {
                c.postMessage({
                  command: 'notification',
                  message: 'Syntonizando acciones'
                });
              });
            });
          }
        });
      };
      return tx.complete;
    };
    r();
  }));
};
const runActionsSync = function(actions, db) {
  let url, fetches = [];
  const trans = db.transaction('actions_sync', 'readwrite');
  let store = trans.objectStore('actions_sync');
  actions.forEach(async action => {
    url = action.fetch.url;
    fetches.push(fetch(url, {
      method: action.fetch.method,
      headers: action.fetch.headers,
      referrer: action.fetch.referrer,
      referrerPolicy: action.fetch.referrerPolicy,
      mode: action.fetch.mode,
      credentials: action.fetch.credentials,
      body: action.body
    }));
    await store.delete(action.timestamp);
  });

  return Promise.all(fetches);
};
self.addEventListener('sync', function (event) {
  if (event.tag === 'action-sync') {
    self.syncActions();
  }
});
importScripts('./ngsw-worker.js');
