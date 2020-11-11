// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
        .register("/service-worker.js")
        .then(function(registration) {
            console.log("Pendaftaran ServiceWorker berhasil");
            return registration;
        })
        .catch(function() {
            console.log("Pendaftaran ServiceWorker gagal");
        });
});
} else {
    console.log("ServiceWorker belum didukung browser ini.");
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
        console.log("Notifikasi diijinkan");
    });
}

function favoriteNotification() {
    const title = "Favorite Team";
    const options = {
        "body" : "Team ditambahkan ke Halaman Favorite Team",
    }
    if (Notification.permission === "granted") {
        navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(title, options);
        });
    } else {
        console.log("Fitur notifikasi tidak diijinkan");
    }
}

function deleteNotification() {
    const title = "Delete Team";
    const options = {
        "body" : "Team dihapus dari Halaman Favorite Team",
    }
    if (Notification.permission === "granted") {
        navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(title, options);
        });
    } else {
        console.log("Fitur notifikasi tidak diijinkan");
    }
}


document.addEventListener("DOMContentLoaded", function() {
    let urlParams = new URLSearchParams(window.location.search);
    let isFromFavorite = urlParams.get("favorite-team");
    let btnFavorite = document.getElementById("favorite");
    let item = getTeamById();
    let btnDelete = document.getElementById("delete");

    if (isFromFavorite) {
        btnFavorite.style.display = "none";
        btnDelete.style.display = "block";
        getFavoriteTeamById();
    } else {
        btnFavorite.style.display = "block";
        btnDelete.style.display = "none";
        item;
    }

    btnFavorite.onclick = function() {
        console.log('tombol fav di klik');
        item.then(function(data) {
            favoriteTeam(data);
            favoriteNotification();
        });
    }
    btnDelete.onclick = function() {
        item.then(function(data) {
            console.log(data);
            console.log("deleting team.....");
            deleteTeam(data);
            deleteNotification();
        });
    }
});