// start with 17-1 Ex10 activity as template

// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl).then(function(data) {
  // Once we get a response, send the data.features object to the createFeatures function;
  console.log(data.features);
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  });
  

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };
  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("mapid", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap]
  });

  //  add circles to map
  for (var i = 0; i < features.length; i++) {
    console.log(features[i].geometry.coordinates[2]);
    
    L.circle(features[i].geometry.coordinates, {
      stroke: true,
      fillOpacity: 0.75,
      color: "red",
      fillColor: "white",
      radius: features[i].geometry.coordinates[2] * 2000
    }).bindPopup("<h3>" + features[i].properties.place + "</h3><hr><p>" + new Date(features[i].properties.time) + "<p/><p" + 
    features[i].properties.mag + "</p>").addTo(myMap);
  }


    // Pass our map layers into our layer control
  // Add the layer control to the map
  // L.control.layers(baseMaps, {
  //   collapsed: false
  // }).addTo(myMap);
});


