//Variaveis globais
var map;
var markers = [];
var polygon = null;
var placeMarkers = [];
var locations = [];
var activeInfowindow = {
    marker: null
};
var activeMarker = null;
var defaultIcon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
var hihgLightedIcon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';

var spinner = '<span class="fas fa-spinner fa-spin"></span>';

var fsClientId = '';
var fsClientSecret = '';