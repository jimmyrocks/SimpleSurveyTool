// Create the map
var map = L.map('map').setView([39.739, -104.9847], 12);
var attributionTest = "Map data © OpenStreetMap contributors";

// Create the tile services
var baseMaps = {
    "OpenStreetMap" : L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 18,
attribution: attributionTest
}),
    "MapQuest Streets":  L.tileLayer(
            'http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
maxZoom: 18,
subdomains: '1234',
attribution: "Data, imagery and map information provided by MapQuest, Open Street Map <http://www.openstreetmap.org/> and contributors, CC-BY-SA <http://creativecommons.org/licenses/by-sa/2.0/> ."
}),
    "MapQuest Aerial":  L.tileLayer(
            'http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg', {
maxZoom: 18,
subdomains: '1234',
attribution: "Data, imagery and map information provided by MapQuest, Open Street Map <http://www.openstreetmap.org/> and contributors, CC-BY-SA <http://creativecommons.org/licenses/by-sa/2.0/> ."
})

};

baseMaps["OpenStreetMap"].addTo(map);


// Overlay maps
var overlayMaps = {
    "Denver Neighborhoods": L.geoJson(null)
};

// Add the map layers
L.control.layers(baseMaps, overlayMaps).addTo(map);

var marker;
// Click function
function onMapClick(e) {
    // Add the value to the secret boxes
    $("#latBox").attr("value", e.latlng.lat);
    $("#lonBox").attr("value", e.latlng.lng);
    //Add Pin
    if (marker) {map.removeLayer(marker)};
    marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map).bindPopup('Your Location is: <ul><li>Lat: ' + e.latlng.lat + '</li><li>Lng: ' + e.latlng.lng + '</li></ul>').openPopup();
}
map.on('click', onMapClick);

var latBox = document.createElement("input");
latBox.setAttribute("type", "hidden");
latBox.setAttribute("id", "latBox");
var lonBox = document.createElement("input");
lonBox.setAttribute("type", "hidden");
lonBox.setAttribute("id", "lonBox");
$("body").append(latBox);
$("body").append(lonBox);
