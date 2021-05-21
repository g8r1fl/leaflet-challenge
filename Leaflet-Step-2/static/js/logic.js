// start with 17-1 Ex10 activity as template

// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl).then(function(data) {
  // Once we get a response, send the data.features object to the createFeatures function;
  console.log(data.features.length);
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
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
  
  var satelite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "satellite-streets-v11",
    accessToken: API_KEY
  });
  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Light Map": lightmap,
    "Dark Map": darkmap,
    "Satelite": satelite
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("mapid", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [lightmap]
  });
  console.log(data.features[0].geometry);
  console.log(data.features[0].geometry.coordinates.slice(0,2))

  //  add circles to map
  var depth = [];
  
  
  for (var i = 0; i < data.features.length; i++) {
    // console.log(data.features[i].geometry.coordinates.slice(0,2));
    var lat = data.features[i].geometry.coordinates[1];
    var lon = data.features[i].geometry.coordinates[0];
    var deep = data.features[i].geometry.coordinates[2];
    depth.push(data.features[i].geometry.coordinates[2]);
    // console.log(getColor(deep));
    L.circle([lat, lon], {
      stroke: false,
      fillOpacity: 0.75,
      color: "black",
      fillColor: getColor(data.features[i].geometry.coordinates[2]),
      radius: data.features[i].properties.mag * 20000
    }).bindPopup("<h3>" + data.features[i].properties.place + "</h3><hr><p>" + new Date(data.features[i].properties.time) + "<p/><p>" + 
    "Magnitude: " + data.features[i].properties.mag + "</p><p>" + "Depth: " + data.features[i].geometry.coordinates[2] + "</p>").addTo(myMap);
  }
  console.log(depth.length);
  console.log(Math.min(...depth));
  console.log(Math.max(...depth));
  console.log(depth.filter(x => x>10 && x <50).length);
  
  // check here for coloring the circles and legend build https://leafletjs.com/examples/choropleth/
  function getColor(d) {
    return d > 90 ? '#9E1213' : //dark red
           d > 70  ? '#F00030' : //bright red
           d > 50  ? '#FEB24C' ://orange 
           d > 30  ? '#f0fc2a' ://yellow 
           d > 10   ? '#1aabe3' ://light blue
           d > -10   ? '#c8eebc' : // light green 
                      '#48c921'; //bright green
};

// create legend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [-10, 10, 30, 50, 70, 90],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);

    // Pass our map layers into our layer control
  // Add the layer control to the map
  L.control.layers(baseMaps, {
    collapsed: false
  }).addTo(myMap);
});


