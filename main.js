mapboxgl.accessToken = 'pk.eyJ1IjoiamlnbWUiLCJhIjoiY2tjOTM5a3EzMWhkMjJ5bWc0ZjRrazA4NyJ9.7gVQ-PWLYFWm7RSNcqj0gg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
    center: [0 , 0],// starting position [lng, lat]
    zoom: 1, // starting zoom
});
let geojson = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [0, 0],
        
      },
      properties: {
        title: "Position Of ISS: <br />",
        description: `The ISS is at the location:lat: 0 and long-$0<br><br>`,
      }
    }]
  };
  let el = document.createElement('div');
  el.className = 'marker';

var nav = new mapboxgl.NavigationControl({
    visualizePitch: true
  });

map.addControl(nav, 'bottom-right');

let url = 'https://api.wheretheiss.at/v1/satellites/25544';

async function getData(){
    try{
        let response = await fetch(url);
        let json = await response.json();
        const {latitude, longitude, visibility} = json;
        let bod = document.querySelector('.body');
        let card = document.querySelector('.contain-card');

        
        let p1 = document.querySelector('.hereName1');
        let p2 = document.querySelector('.hereName2');
        p1.innerHTML = latitude.toFixed(5);
        p2.innerHTML = longitude.toFixed(5);
        
        map.center = ([latitude,longitude]);
        geojson.features.forEach(marker =>{
            new mapboxgl.Marker(el)
            .setLngLat([longitude, latitude])
            .addTo(map);
        });
    }catch(err){
        console.log('Error Working with API, Contact the developer');
    }
}
getData();
setInterval(getData, 1000);

