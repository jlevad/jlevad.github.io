let dbPromised = idb.open("kene-sport", 1, function(upgradeDb) {
    let squadsObjectStore = upgradeDb.createObjectStore("squads", {
        keyPath: "id"
    });
    squadsObjectStore.createIndex("id_team", "id", {unique: false});
});

function favoriteTeam(team) {
    dbPromised
        .then(function(db) {
            let tx = db.transaction("squads", "readwrite");
            let store = tx.objectStore("squads");
            console.log(team);
            store.put(team);
            return tx.complete;
        })
        .then(function() {
            console.log("team Favorited");
            console.log(team);
        });
}

function getAll() {
    return new Promise(function(resolve, reject) {
        dbPromised
            .then(function(db) {
                let tx = db.transaction("squads", "readonly");
                let store = tx.objectStore("squads");
                return store.getAll();
            })
            .then(function(team) {
                resolve(team);
            });
    });
}

function getById(id) {
    return new Promise(function(resolve, reject) {
        dbPromised
            .then(function(db) {
                let tx = db.transaction("squads", "readonly");
                let store = tx.objectStore("squads");
                return store.get(parseInt(id));
            })
            .then(function(data) {
                resolve(data);
            });
    });
}

function deleteTeam(team) {
    return new Promise(function(resolve, reject) {
        dbPromised
            .then(function(db) {
                let tx = db.transaction("squads", "readwrite");
                let store = tx.objectStore("squads");
                console.log(team);   
                store.delete(team.id);
                return tx;
            })
            .then(function(tx) {
                if (tx.complete) {
                    console.log('team deleted');
                    resolve(true);
                } else {
                    reject(new Error(tx.onerror))
                }
                
            });
    });
}