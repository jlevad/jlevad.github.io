importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
    console.log('workbox berhasil dimuat');
else
    console.log('workbox gagal dimuat');

workbox.precaching.precacheAndRoute([
        { url: '/index.html', revision: '2' },
        { url: '/nav.html', revision: '2' },
        { url: '/squad.html', revision: '2' },
        { url: '/favicon.ico', revision: '2' },
        { url: '/manifest.json', revision: '2' },
        { url: '/img/icon-72x72.png', revision: '2' },
        { url: '/img/icon-96x96.png', revision: '2' },
        { url: '/img/icon-144x144.png', revision: '2' },
        { url: '/img/icon-192x192.png', revision: '2' },
        { url: '/img/icon-512x512.png', revision: '2' },
        { url: '/img/mifta.jpeg', revision: '2' },
        { url: '/css/materialize.css', revision: '2' },
        { url: '/css/materialize.min.css', revision: '2' },
        { url: '/js/api.js', revision: '2' },
        { url: '/js/materialize.js', revision: '2' },
        { url: '/js/materialize.min.js', revision: '2' },
        { url: '/js/nav.js', revision: '2' },
        { url: '/js/idb.js', revision: '2' },
        { url: '/js/db.js', revision: '2' },
        { url: '/js/register-sw.js', revision: '2' },
        { url: '/js/squad.js', revision: '2' },
        { url: '/pages/about.html', revision: '2' },
        { url: '/pages/favorite-team.html', revision: '2' },
        { url: '/pages/home.html', revision: '2' },
        { url: '/pages/standings.html', revision: '2' }
    ],
    { ignoreUrlParametersMatching: [/.*/],}
);
    
workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'Kene-SR',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 *365,
                maxEntries: 30,
            }),
        ]
    })
);

workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);


workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'image-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 30, //30 hari
                maxEntries:60,
            }),
        ],
    })
);



// Menyimpan cache dari CSS Google Fonts
workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    })
);
   
// Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
        new workbox.cacheableResponse.Plugin({
            statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
            maxAgeSeconds: 60 * 60 * 24 * 365,
            maxEntries: 30,
        }),
        ],
    })
);


self.addEventListener("push", function(event) {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = "Push message no payload";
    }

    let options = {
        body: body,
        icon: "img/icon-72x72.png",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey : 1
        }
    };

    event.waitUntil(
        self.registration.showNotification("Push notification", options)
    );
})


// {"publicKey":"BGgnzPHpnG8qZcBBilzNV9ewkvO2sgybHNd92iV-GWADYpYwHshvpbvi25ElfxUbr9cvEq84_Lb_fHGkhFJLOF4","privateKey":"H4ewTAoLSQv9t2Ax6Ne5HPTQYZRburuE2wQnSfoJqvw"}

