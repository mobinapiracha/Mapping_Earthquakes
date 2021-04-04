// Add console.log to check to see if our code is working.
console.log("working");

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

let baseMaps = {
  Streets: streets,
  Dark: dark
};

// Create the map object with center and zoom level.
let map = L.map('mapid', {
  center: [30, 30],
  zoom: 2,
  layers: [streets]
})
L.control.layers(baseMaps).addTo(map);
// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/mobinapiracha/Mapping_Earthquakes/Mapping_GeoJSON_Points/majorAirports.json";

// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {
onEachFeature: function(feature, layer) {
console.log(layer)
layer.bindPopup("<h3>Airport code:" + feature.properties.faa + "</h3><hr><h3>Airport name:"
+ feature.properties.name + "</h3>");

    }
  }).addTo(map);
});