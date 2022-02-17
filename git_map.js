mapboxgl.accessToken = 'pk.eyJ1IjoiaGFzdGkxOTk2IiwiYSI6ImNrejBqMXR6MzBldXUycWxkaHMycWhnaTMifQ.fNSz_V7qr26t5I9vrLo0cg';

var fmarker = [];

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.078786, 42.340253],
    zoom: 12
});

async function run(){
    const locations = await getBusLocations();
    fmarker.push(locations[0].attributes.longitude);
    fmarker.push(locations[0].attributes.latitude);

    fmarker.push(locations[1].attributes.longitude);
    fmarker.push(locations[1].attributes.latitude);
    
    var marker = new mapboxgl.Marker()
    .setLngLat([-71.092761,42.357575])
    .addTo(map);
    
    console.log(new Date());
    console.log(fmarker);

    setTimeout(run, 5000);
}

async function getBusLocations(){
    const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
    const response = await fetch(url);
    const json     = await response.json();
    return json.data;
}

run();

var counter = 0;

function move(){
    setTimeout(() => {
        if(counter > fmarker.length) return;
        marker.setLngLat(fmarker[counter]);
        counter++;
        move();
    }, 3000);
}
