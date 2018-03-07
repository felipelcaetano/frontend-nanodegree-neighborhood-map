function Location(title, location, id, fS) {
    this.title = title;
    this.location = location;
    this.id = id;
    this.fS = fS;
    this.photoUrl = null;
    this.name = null;
    this.formatted_address = null;
};

Location.prototype.obterDadosGoogle = function(cb) {
    var service = new google.maps.places.PlacesService(map);

    service.getDetails({placeId: this.id}, function(place, status) {

        if (status === 'OK') {
            this.name = place.name;

            if(place.photos) {
                this.photoUrl = place.photos[0]
                .getUrl({maxHeight: 100, maxWidth: 100});
            };

            if (place.formatted_address) {
                this.formatted_address = place.formatted_address;
            };

            cb({status: 'OK'});

        } else {
            console.log('Erro Place Service:');
            console.log(status);
            window.alert('Ocorreu um erro ao tentar obter as informações. ' +
                'Tente mais tarde.');
            cb({status: 'ERROR'});
        };
    });
};

//Popula a infowindow do local selecionado pela lista
Location.prototype.populateWindowByMarker = function() {
    console.log('chamando');

    atualizarSetaMenu();
    hideLocations(this);
    //Verifica se existe infowindow em algum marcador aberto
    if (activeInfowindow.marker != null) {
        clearInfowindow(activeInfowindow.marker);
    };

    resetMarkersIcons();
    hideMarkers();

    markers.forEach(function(marker, index) {

        if (marker.id === this.id) {
            var largeInfoWindow = new google.maps.InfoWindow();

            marker.setIcon(hihgLightedIcon);
            marker.setVisible(true);
            populateInfoWindow(marker, largeInfoWindow);

            map.setCenter(this.location);
        };
    });
};

var doCarmo = new Location(
    'Parque do Carmo',
    {lat:  -23.581743, lng:-46.462333},
    'ChIJLV_w3EBmzpQR6vhaUW-n6oE',
    {
        id: '4c922c4db641236ab9868779',
        address: '',
        likes: 0
    }
);

var ibirapuera = new Location(
    'Parque Ibirapuera',
    {lat:  -23.584843, lng:-46.655913},
    'ChIJoyYcqfFZzpQRWi4itrx_1V8',
    {
        id: '4b0588c7f964a520d9d922e3',
        address: '',
        likes: 0
    }
);

var doPovo = new Location(
    'Parque do Povo',
    {lat:  -23.588037, lng:-46.68873},
    'ChIJubUPZ0BXzpQRACod7iNucDE',
    {
        id: '4b23d4ddf964a520b75a24e3',
        address: '',
        likes: 0
    }
);

var daJuventude = new Location(
    'Parque da Juventude',
    {lat:  -23.5072, lng:-46.620408},
    'ChIJ7QRNOyf2zpQRCDpCF99XpJ4',
    {
        id: '4ba6c93df964a520966f39e3',
        address: '',
        likes: 0
    }
);

var ceret = new Location(
    'CERET',
    {lat:  -23.556052, lng:-46.559332},
    'ChIJOUPLL4BezpQR9KUzQawAvpo',
    {
        id: '4b8ae47bf964a5209a8732e3',
        address: '',
        likes: 0
    }
);

var villaLobos = new Location(
    'Parque Villa-Lobos',
    {lat:  -23.545783, lng:-46.720578},
    'ChIJfV4al_pWzpQR0a3ayQ6Oa28',
    {
        id: '4d440dad14aa8cfaf0e1613d',
        address: '',
        likes: 0
    }
);

var piqueri = new Location(
    'Parque Piqueri',
    {lat:  -23.529612, lng:-46.575581},
    'ChIJT4t6sd9ezpQRI3XzArVFOsg',
    {
        id: '4c38b93d0a71c9b6412d41c9',
        address: '',
        likes: 0
    }
);

var hortoFlorestal = new Location(
    'Horto Florestal',
    {lat:  -23.456003, lng:-46.629819},
    'ChIJZ-Ygoh33zpQRel7Y6UK0iF0',
    {
        id: '4b284eb3f964a520529224e3',
        address: '',
        likes: 0
    }
);

var model = {

    locations: []
};

locations.push(doCarmo);
locations.push(ibirapuera);
locations.push(hortoFlorestal);
locations.push(ceret);
locations.push(doPovo);
locations.push(piqueri);
locations.push(daJuventude);

var ViewModel = function() {
    var self = this;

    self.vMLocations = ko.observableArray();

    locations.forEach(function(location, index) {
        self.vMLocations.push(location);
    });

    self.query = ko.observable('');

    self.search = function(value) {
        self.vMLocations.removeAll();
    };

    limparFiltro = function() {
        resetMarkersIcons();
        showMarkers();

        markers.forEach(function(marker, index) {
            clearInfowindow(marker);
        });

        showLocations();
        centerMap({lat: -23.55052, lng: -46.633309});
    };

    atualizarSetaMenu = function() {
        if($('#seta-menu').hasClass('fa-angle-down')) {
            $('#seta-menu').addClass('fa-angle-up');
            $('#seta-menu').removeClass('fa-angle-down');
        } else {
            $('#seta-menu').addClass('fa-angle-down');
            $('#seta-menu').removeClass('fa-angle-up');
        };
    };

    showMarkers = function() {
        markers.forEach(function(marker,index) {
            marker.setVisible(true);
        });
    };

    hideMarkers = function() {
        markers.forEach(function(marker,index) {
            marker.setVisible(false);
        });
    };
};

ko.applyBindings(new ViewModel());