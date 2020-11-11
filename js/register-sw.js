if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker.register("/service-worker.js")
        .then(function(registration) {
            console.log("Pendaftaran service worker berhasil");
            return registration;
        })
        .catch(function() {
            console.log("Pendaftaran service worker gagal");
        });
    });
} else {
    console.log("Service worker belum di dukung di browser ini");
}

if ("Notification" in window) {
    requestPermission();
} else {
    console.error("Browser tidak mendukung notifikasi.");
}
function requestPermission() {
    Notification.requestPermission().then(function(result) {
        if (result === "denied") {
            console.log("fitur notifikasi tidak diijinkan");
            return;
        } else if (result === "default") {
            console.error("Pengguna menutup kotak dialog permintaan ijin");
            return;
        }
        

        navigator.serviceWorker.ready.then(function () {
            if (("PushManager" in window)) {
                navigator.serviceWorker.getRegistration().then(function(registration) {
                    registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array("BGgnzPHpnG8qZcBBilzNV9ewkvO2sgybHNd92iV-GWADYpYwHshvpbvi25ElfxUbr9cvEq84_Lb_fHGkhFJLOF4")
                    }).then(function(subscribe) {
                        console.log("berhasil melakukan subscribe dengan endpoint : ", subscribe.endpoint);
                        console.log("berhasil melakukan subscribe dengan p256dh key : ", btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey("p256dh")))));
                        console.log("Berhasil melakukan subscribe dengan auth key: ", btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey("auth")))))
                    }).catch(function(e) {
                        console.log("tidak dapat melakukan subscribe ", e.message);
                    });
                });
            }
        });



    });
}

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for ( let i = 0; i < rawData.length; i++) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}

document.addEventListener("DOMContentLoaded", function() {
    getStandings();
    getMatches();
})