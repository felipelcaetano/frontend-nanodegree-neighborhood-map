var ViewModel = function() {
    var self = this;

    self.locations = ko.observableArray();

    locations.forEach(function(location, index) {
        self.locations.push(location);
    });

    self.query = ko.observable('');

    self.search = function(value) {
        self.locations.removeAll();
    };

    limparFiltro = function() {
        resetMarkersIcons();
        showMarkers();

        markers.forEach(function(marker, index) {
            clearInfowindow(marker);
        });

        showLocations();
        centerMap();
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