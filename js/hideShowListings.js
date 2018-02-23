function showListings() {
  var bounds = new google.maps.LatLngBounds();

  markers.forEach(function(marker, index) {
    marker.setMap(map);
    bounds.extend(marker.position);
  });

  map.fitBounds(bounds);
};

function hideMarkers(markers) {
  markers.forEach(function(marker, index) {
    marker.setMap(null);
  });
};