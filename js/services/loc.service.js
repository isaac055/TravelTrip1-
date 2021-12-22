

export const locService = {
    getLocs,
    addLoc,
    deleteLoc
}


const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

function getLocs() {
    return new Promise((resolve, reject) => {
        resolve(locs);
    })
}

function createLoc(name, lat, lng) {
    return {
        id: utils.getRandomId(),
        name,
        lat,
        lng,
        createdAt: Date.now(),
        updatedAt: Date.now()
    }
}

function addLoc(name, lat, lng) {
    locs.push(createLoc(name, lat, lng));
}

function deleteLoc(locId) {
    const locIdx = locs.findIndex(loc => loc.id === locId);
    locs.splice(locIdx, 1);
}

