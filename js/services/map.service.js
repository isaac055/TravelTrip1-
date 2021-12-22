

export const mapService = {
    initMap,
    addMarker,
    panTo,
}

var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');

    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap);
            gMap.addListener('click', function(event) {
                addMarker(event.latLng)
                console.log('event.latLng.lat(), event.latLng.lng(): '
                ,event.latLng.lat(), event.latLng.lng())
                
            })
        })

}

function addMarker(loc) {
   
   console.log('loc.lat', loc.lat);
    
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    console.log('marker: ',marker)
    
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}



function _connectGoogleApi() {
    console.log('wg',window.google);
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyCoKuRZKzh1SZICQhvXxX-6B9l1t_sR038'; //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}