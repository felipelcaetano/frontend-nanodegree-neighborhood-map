//Adiciona os listeners do botao de dropdown da lista de locations
faAngleDownListener();

function faAngleDownListener() {
    $('.fa-angle-down').click(function(){
        $('.fa-angle-down').addClass('fa-angle-up');
        $('.fa-angle-down').removeClass('fa-angle-down');

        faAngleUpListener();
    });
};

function faAngleUpListener() {
    $('.fa-angle-up').click(function(){
        $('.fa-angle-up').addClass('fa-angle-down');
        $('.fa-angle-up').removeClass('fa-angle-up');

        faAngleDownListener();
    });
};

function listLocations() {

    var locationsListNode = $('#locations-list');

    locations.forEach(function(location, index) {

        //Obtem detalhes das locations
        var service = new google.maps.places.PlacesService(map);

        service.getDetails({placeId: location.id}, function(place, status) {

            if (status === 'OK') {

                locationsListNode.append('<li class="list-group-item ' +
                    'bg-success" data-id="' + location.id + '"> ');

                if (place.photos) {
                    $('#locations-list li:last-of-type').append(
                        '<div class="row-fluid col-md-12 locations-list-li-div">' +
                        '<a href="#locations-list-div" data-toggle="collapse">' +
                        '<div class="col-6"><img class="img-responsive" src="' +
                        place.photos[0].getUrl({maxHeight: 100, maxWidth: 100}) +
                        '" alt="foto do ' + place.name + '"></div></a>');
                };


                if (place.formatted_address) {
                    $('#locations-list li:last-of-type .locations-list-li-div')
                    .append(
                        '<a href="#locations-list-div" data-toggle="collapse">' +
                        '<div class="col-6 text-right float-right"><address>' +
                        place.name + '</br>' + place.formatted_address +
                        '</address></div></a></div>');
                };

                $('#locations-list li:last-of-type').append(
                    '<div class="col-12 fs-description-div"><a ' +
                    'href="#locations-list-div" data-toggle="collapse">' +
                    '<p id="fs-description" class="col-12 float-left"><q></q>' +
                    '</p></a>' + spinner + '</div>'
                );

                $('#locations-list li:last-of-type').append(
                    '<div class="fs-likes-div">' +
                    '<span class="far fa-thumbs-up float-left"></span>'  +
                    '<span class="likes float-left"></span>' +
                    '<p id="likes-text" class="font-italic"> '+
                    'Pessoas curtiram via Foursquare</p>' +
                    '&reg<a id="fSUrl" href=" " target="_blank"><span ' +
                    'class="fab fa-foursquare"></span></a></div>'
                );


                $('#locations-list li:last-of-type').after('</div></li>');

                //Adiciona listener para click em cada item da lista
                $('#locations-list li:last-of-type').click(function(){
                    populateWindowByMarker(location)
                });

                obterDadosFS(location);

            } else {
                console.log('Erro Place Service:');
                console.log(status);
                window.alert('Ocorreu um erro ao tentar obter as informações. ' +
                    'Tente mais tarde.');
            };
        });
    });
};

//Popula a infowindow do local selecionado pela lista
function populateWindowByMarker(location) {

    //Verifica se existe infowindow em algum marcador aberto
    if (activeInfowindow.marker != null) {
        clearInfowindow(activeInfowindow.marker);
    };

    resetMarkersIcons();

    markers.forEach(function(marker, index) {

        if (marker.id === location.id) {
            var largeInfoWindow = new google.maps.InfoWindow();

            marker.setIcon(hihgLightedIcon);
            populateInfoWindow(marker, largeInfoWindow);

            map.setCenter(location.location);
        };
    });

    //Ativa novamente o listener da seta do inicio da pagina
    faAngleUpListener();
};

function obterDadosFS(location) {

    $.ajax({
        url: "https://api.foursquare.com/v2/venues/" + location.fS.id,
        method: 'GET',
        data: {
            client_id: 'I1BDRMAG35ELJQFQJWHGA50AEOTQSBQA2GC2UGJKM2530T0S',
            client_secret: 'KVUWRH2LHHPQWCAWEO4GYSDYSYD0CCSOFUXTINCSPAZW5JL0',
            v: '20182002'
        },
        success: function(result) {

            location.fS.likes = result.response.venue.likes.count;

            if (result.response.venue.name != null
                && result.response.venue.location.formattedAddress != null) {
                $('[data-id="'+location.id+'"] address').text(
                    result.response.venue.name + ' - ' +
                    result.response.venue.location.formattedAddress
                );
            };

            if (result.response.venue.likes.count != null
                && result.response.venue.likes.count > 0) {
                $('[data-id="'+location.id+'"] .likes').text(
                    result.response.venue.likes.count
                );
            } else {
                $('[data-id="'+location.id+'"] .fs-likes-div').hide();
            };

            if (result.response.venue.description != null) {
                $('[data-id="'+location.id+'"] p q').text(
                    result.response.venue.description
                );
            } else {
                $('[data-id="'+location.id+'"] .fs-description-div').hide();
            };

            if (result.response.venue.canonicalUrl != null) {
                $('[data-id="'+location.id+'"] #fSUrl').attr('href',
                    result.response.venue.canonicalUrl)
            };
        },
        error: function(result) {
            $('[data-id="'+location.id+'"] .fs-likes-div').hide();
            $('[data-id="'+location.id+'"] .fs-description-div').hide();
            console.log('Code: ' + result.responseJSON.meta.code + '. Msg: ' +
                result.responseJSON.meta.errorDetail);
        },
        complete: function(result) {
            $('[data-id="'+location.id+'"] .fa-spinner').detach();
        }
    });

};