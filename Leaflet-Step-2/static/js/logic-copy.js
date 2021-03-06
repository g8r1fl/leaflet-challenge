// start with 17-1 Ex10 activity as template

// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl).then(function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createMap(data.features);
  // createMarkers(data.features);
  console.log(data.features);
});

// function createMarkers(earthquakeData) {
  
//   console.log(earthquakeData.length);
//   var quakeMarkers = [];
//   for (var i = 0; i < earthquakeData.length; i++) {
//     // console.log(earthquakeData[i].properties.mag);
//     quakeMarkers.push(
//       L.circle(earthquakeData[i].geometry.coordinates, {
//         // stroke: false,
//         fillOpacity: 0.75,
//         color: "red",
//         fillColor: "white",
//         radius: earthquakeData[i].geometry.coordinates[2]
//       }).bindPopup("<h3>" + earthquakeData[i].properties.place + "</h3><hr><p>" + new Date(earthquakeData[i].properties.time) + "<p/><p" + 
//       earthquakeData[i].properties.mag + "</p>")
//     )
    
//   }

//   var earthquakes = L.layerGroup(quakeMarkers);
//   console.log(earthquakes);
//   createMap(earthquakes);
// }
// function createFeatures(earthquakeData) {

//   var quakeMarkers = [];

//   for (var i = 0; i < data.features.length; i++) {
//     quakeMarkers.push(
//       L.circle(data.features.geometry.coordinates, {
//         stroke: false,
//         fillOpacity: 0.75,
//         color: "white",
//         fillColor: "white",
//         radius: data.features.geometry.coordinates[2]
//       }).bindPopup("<h3>" + data.features.properties.place + "</h3><hr><p>" + new Date(data.features.properties.time) + "<p/><p" + 
//       data.features.properties.mag + "</p>")
//     )
    
//   }

//   var earthquakes = L.layer(quakeMarkers);

//   // // Define a function we want to run once for each feature in the features array
//   // // Give each feature a popup describing the place and time of the earthquake
//   // function onEachFeature(feature, layer) {
//   //   // create circle markers based on magnitudes
//   //   // loop through features and create circle markers
//   //   L.circle(feature.geometry.coordinates, {
//   //     stroke: false,
//   //     fillOpacity: 0.75,
//   //     color: "yellow",
//   //     fillColor: "white",
//   //     radius: feature.properties.mag
//   //   }).bindPopup("<h3>" + feature.properties.place +
//   //   "</h3><hr><p>" + new Date(feature.properties.time) + "</p><p> Depth  " + feature.geometry.coordinates[2] + "</p>");
//   // };

//   // // Create a GeoJSON layer containing the features array on the earthquakeData object
//   // // Run the onEachFeature function once for each piece of data in the array
//   // var earthquakes = L.geoJSON(earthquakeData, {
//   //   onEachFeature: onEachFeature
//   // });
//   // console.log(earthquakes);

//   // Sending our earthquakes layer to the createMap function
//   createMap(earthquakes);
// }




function createMap(earthquakes) {

  console.log(earthquakes);

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "?? <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> ?? <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  });
  

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery ?? <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    "Dark Map": darkmap
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("mapid", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap]
    // layers: [streetmap, earthquakes]
  });


//  add circles to map
  for (var i = 0; i < earthquakes.length; i++) {
    console.log(earthquakes[i].geometry.coordinates[2]);
    
    L.circle(earthquakes[i].geometry.coordinates, {
      stroke: true,
      fillOpacity: 0.75,
      color: "red",
      fillColor: "white",
      radius: earthquakes[i].geometry.coordinates[2] * 2000
    }).bindPopup("<h3>" + earthquakes[i].properties.place + "</h3><hr><p>" + new Date(earthquakes[i].properties.time) + "<p/><p" + 
    earthquakes[i].properties.mag + "</p>").addTo(myMap);
  }

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}
