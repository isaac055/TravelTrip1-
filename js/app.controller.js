import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.app = onGetLocs()
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
// window.onGetLocs = onGetLocs;
// window.onAddLoc = onAddLoc;
// window.onDeleteLoc = onDeleteLoc;
window.onGetUserPos = onGetUserPos;
window.onGetDesiredLoc = onGetDesiredLoc;

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'))
}

// This function provides a Promise API to the callback-based-api 
// of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
  
    console.log('Adding a marker');
    mapService.addMarker();
}



function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locations-table').innerHTML = locs.map(loc => {
                return ` <div class ="loc-card flex">
      <div class="loc-name"> name: ${loc.name}  </div>
      <div class="loc-lat"> lat:   ${loc.lat}  </div>
      <div class="loc-lng"> lng:  ${loc.lng}  </div>            
</div>
       `
            })
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
            return pos // used in onToPan
        })
        .catch(err => {
            console.log('err!!!', err);
        })
        .then(onPanTo)
}
function onPanTo(pos) {
    mapService.panTo(pos.coords.latitude,pos.coords.longitude);
}

function onGetDesiredLoc(ev){
    ev.preventDefault()
    let desiredLoc = document.querySelector('form input').value 
    
    
}
