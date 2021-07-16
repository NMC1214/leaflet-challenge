// Create a map object
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
});

// Add a tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


d3.json(url).then(function (response) {
    // console.log(response);
    var locations = [];
    var magnitudes = [];
    var depths = [];
    var places = [];
    var colors = [];

    var features = response.features;
    // console.log(features)

    for (var i = 0; i < features.length; i++) {
        var properties = features[i].properties;
        // console.log(properties)

        magnitudes.push(properties.mag);
        places.push(properties.place);

        var geometry = features[i].geometry;
        // console.log(geometry)
        locations.push([geometry.coordinates[1],geometry.coordinates[0]]);
        depths.push(geometry.coordinates[2]);
                       
    }

    for (var i = 0; i < depths.length; i++) {
    
        if (depths[i] >= 90) {
            colors.push("#FF3333");
        }
        else if (depths[i] <= 89 && depths[i] >= 70) {
            colors.push("#FF6133");
        }
        else if (depths[i] <= 69 && depths[i] >= 50) {
            colors.push("#FF9F33");
        }
        else if (depths[i] <= 59 && depths[i] >= 30) {
            colors.push("#FFC433");
        }
        else if (depths[i] <= 29 && depths[i] >= 10) {
            colors.push("#FFFF33");
        }
        else {
            colors.push("#85FF33");
        }
    }
    // console.log(magnitudes)
    // console.log(places)
    // console.log(locations)
    // console.log(depths)
    // console.log(colors)

    for (var i = 0; i < locations.length; i++) {
        L.circleMarker(locations[i], {
        fillOpacity: 0.75,
        color: "black",
        fillColor: colors[i],
        // Adjust radius
        radius: magnitudes[i] * 7
      }).bindPopup("<h2>" + places[i] + "</h2> <hr> <h3>Magnitude: " + magnitudes[i] + "</h3><h3>Depth: " + depths[i] + "</h3>").addTo(myMap);
    }

});

