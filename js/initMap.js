function initMap() {
  activeInfowindow = new google.maps.InfoWindow();

  var styles = [
    {
      featureType: 'water',
      stylers: [
        { color: '#19a0d8' }
      ]
    },
    {
      featureType: 'administrative',
      elementType: 'labels.text.stroke',
      stylers: [
        { color: '#fff' },
        { weight: 6 }
      ]
    },
    {
      featureType: 'administrative',
      elementType: 'labels.text.fill',
      stylers: [
        { color: '#e85113' }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        { color: '#efe9e4' },
        { lightness: -40 }
      ]
    },
    {
      featureType: 'transit.station',
      stylers: [
        { weight: 9 },
        { hue: '#e85113' }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.icons',
      stylers: [
        { visibility: 'off' }
      ]
    }
  ];

  //Cria novo mapa, sendo o centro dele o centro de SP
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -23.55052, lng: -46.633309},
    zoom: 10.7,
    styles: styles,
    mapTypeControl: false
  });

  //Cria os markers para cada location
  locations.forEach(function(location, index) {
    var position = location.location;
    var title = location.title;
    var id = location.id;

    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title,
      icon: defaultIcon,
      animation: google.maps.Animation.DROP,
      id: id
    });

    markers.push(marker);

    addMarkerListener(marker);
  });

  listLocations();
  //autocomplete();
};

var addMarkerListener = function(marker) {
  var largeInfoWindow = new google.maps.InfoWindow();

  marker.addListener('click', function(){
    resetMarkersIcons();
    clearInfowindow(marker);
    marker.setIcon(hihgLightedIcon);
    activeMarker = marker;
    populateInfoWindow(this, largeInfoWindow);
  });
};

function clearInfowindow(marker) {
  activeInfowindow.close();
  addMarkerListener(marker);
};

//adicionar o autocomplete para campos input dos formularios
function autocomplete() {
  var autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('autocomplete-box'));

  //definir as limitacoes do mapa para o autocomplete
  //autocomplete.bindTo('bounds', map);

  //Adiciona o listener ao autocomplete
  autocomplete.addListener('place_changed',
    function(){

      //Reseta o infowindow ativo e os markers
      resetMarkersIcons();

      markers.forEach(function(marker, index) {
        clearInfowindow(marker);
      });

      $('.fa-angle-up').trigger('click');

      var place = autocomplete.getPlace();
      var hasParkType = false;
      var isAtSP = false;

      //Verifica se o tipo do endereco digitado e um parque
      place.types.forEach(function(type, index) {

        if (type === 'park') {
          hasParkType = true;
        };
      });

      //Verifica se o endereco digitado esta no estado de SP
      place.address_components.forEach(function(add_component, index) {

        if (add_component.long_name === 'São Paulo'
        || add_component.short_name === 'São Paulo'
        || add_component.short_name === 'SP') {
          isAtSP = true;
        };
      });

      if (!hasParkType || !isAtSP) {
        window.alert('Por favor, pesquise somente parques em Sao Paulo');
        return;
      };


      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);

        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
          title: place.name,
          icon: hihgLightedIcon,
          animation: google.maps.Animation.DROP,
          id: place.place_id
        });

        markers.push(marker);

        var largeInfoWindow = new google.maps.InfoWindow();
        populateInfoWindow(marker, largeInfoWindow);
        addMarkerListener(marker);

      } else {
        window.alert('Nao foi possivel encontrar detalhes deste endereco')
      };
  });
};

//Popula a infowindow do marker selecionado
function populateInfoWindow(marker, infowindow) {

  if (infowindow.marker != marker) {

    infowindow.marker = marker;

    infowindow.setContent(
      '<div id="infowindow">' +
        '<h1>' + marker.title + '</h1>' +
        '<div id="infowindow-details" class="container"></div>'
    );

    //Obtem detalhes das locations
    var service = new google.maps.places.PlacesService(map);

    service.getDetails({placeId: marker.id}, function(place, status) {

      if (status === 'OK') {

        infowindow.marker = marker;

        var innerHTML = '<div>';

        if (place.formatted_address) {
          innerHTML += place.formatted_address;
        };

        if (place.opening_hours) {
          innerHTML += '<br><br><h2>Horários:</h2>' +
            place.opening_hours.weekday_text[0] + '<br>' +
            place.opening_hours.weekday_text[1] + '<br>' +
            place.opening_hours.weekday_text[2] + '<br>' +
            place.opening_hours.weekday_text[3] + '<br>' +
            place.opening_hours.weekday_text[4] + '<br>' +
            place.opening_hours.weekday_text[5] + '<br>' +
            place.opening_hours.weekday_text[6];
        };

        if (place.photos) {
          innerHTML += '<br><br>';
          innerHTML += '<img class="img-responsive" alt="foto do parque" src="' +
            place.photos[0].getUrl({maxHeight: 100, maxWidth: 120}) + '">';
          innerHTML += '<img class="img-responsive" alt="foto do parque" src="' +
            place.photos[1].getUrl({maxHeight: 100, maxWidth: 120}) + '">';
        };

        innerHTML += '</div></div>';

        infowindow.setContent(infowindow.content + innerHTML);

      } else {

        infowindow.setContent(infowindow.content + '<p>Não foi possível obter ' +
          'maiores detalhes no Google. Atualize a página para tentar novamente' +
          '</p></div>');
      };
    });

    infowindow.open(map, marker);

    infowindow.addListener('closeclick', function() {
      resetMarkersIcons();
      showMarkers();

      infowindow.marker = null;
    });

    activeInfowindow = infowindow;

  };
};

function resetMarkersIcons() {
  markers.forEach(function(marker, index) {
    marker.setIcon(defaultIcon);
  });
};

function centerMap(latLng) {
  map.setCenter(latLng);
};

function googleError() {
  window.alert("Desculpe. Houve um problema no site e não será possível " +
    "utilizá-lo no momento. Tente novamente mais tarde.");
};