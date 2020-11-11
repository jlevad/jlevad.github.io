let webPush = require("web-push");

const vapidKeys = {
    "publicKey" :  "BGgnzPHpnG8qZcBBilzNV9ewkvO2sgybHNd92iV-GWADYpYwHshvpbvi25ElfxUbr9cvEq84_Lb_fHGkhFJLOF4",
    "privateKey" : "H4ewTAoLSQv9t2Ax6Ne5HPTQYZRburuE2wQnSfoJqvw"
};

webPush.setVapidDetails(
    "mailto:smiftakhus@gmail.com",
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

let pushSubscription = {
    "endpoint" : "s://fcm.googleapis.com/fcm/send/fq9O-NjITSk:APA91bE25z6fqMnSAnoSg_bJDjZZruowYZPLRLUCaWqFwvlY6eskt5y6bDawHTYnARZK64PM1kGSj0tMFi2-CNzUvUfagyDWlCt_LIdjvwDwm20FbZ3Uk9WzSZFvCWRAKzTiUg5y6a2o",
    "keys" : {
        "p256dh" : "BEz3hbH/bbSt47PXn/MiuMP7xj853UZCmfE1Q2pwzQ2daWRObifVcLH45UwVYqxnREHqKMb/q3tgfTNcOhafn2Q=",
        "auth" : "Z4bM17Nm3I7Mp1KHTdUOaw=="
    }
};

let payload = "Welcome To Kene Sport Reader";

let options = {
    gcmAPIKey: "270558007731",
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
)