
    function initMap() {
    var map;
    var geoLatLng
    var marker;
    var lat = 0;
    var lng = 0;
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            // geoLatLng = {lat: position.coords.latitude, lng: position.coords.longitude};
            lat = position.coords.latitude;
            lng = position.coords.longitude;
            geoLatLng = new google.maps.LatLng(lat,lng);
            console.log(geoLatLng);
            marker = new google.maps.Marker({
                position: geoLatLng,
                map: map             
            });
            map = new google.maps.Map(document.getElementById('map'), {
            center: geoLatLng,
            zoom: 15
            });
            marker.setMap(map);
                var request = {
                    location: geoLatLng,
                    radius: '500',
                    types: ['restaurant']
                }
            service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, callback);
            var infowindow = new google.maps.InfoWindow();


            function callback(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    var place = (results[i]);
                    createMarker(results[i]);
                    service.getDetails({
                    placeId: place.place_id
                    }, function(place, status) {
                        if (status === google.maps.places.PlacesServiceStatus.OK) {
                            var marker = new google.maps.Marker({
                            map: map,
                            position: place.geometry.location
                            });
                            google.maps.event.addListener(marker, 'click', function() {
                            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                                'Place ID: ' + place.place_id + '<br>' +
                                place.formatted_address + '</div>')
                            infowindow.open(map, this);
                        });
                    }
                        });
                    }
                }
        }
             function createMarker(place) {
                 var placeLoc = place.geometry.location;
                 var marker = new google.maps.Marker({
                 map: map,
                position: place.geometry.location})
                 infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                 'Place ID: ' + place.place_id + '<br>' +
                 place.formatted_address + '</div>')
             }

            google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
            });










                //     window.eqfeed_callback = function(results) {
                //     for (var i = 0; i < results.features.length; i++) {
                //         var coords = results.features[i].geometry.coordinates;
                //         var latLng = new google.maps.LatLng(coords[1],coords[0]);
                //         var placeMarker = new google.maps.Marker({
                //             position: latLng,
                //             map: map
                //         });
                //         
                //     }
                // }
            //     if (status == google.maps.places.PlacesServiceStatus.OK) {
            //         for (var i = 0; i < results.length; i++) {
            //         var coords = results.features[i].geometry.coordinates;
            //         var latLng = new google.maps.LatLng(coords[1],coords[0]);
            //         var place = results[i];
            //         var placeMarker = new google.maps.Marker({
            //             position: latLng,
            //             map: map
            //         });
            //         console.log(results);
            //     }
            // }   

        } );    
    } else {
    /* geolocation IS NOT available */
    }
}
//places api  AIzaSyBAqu5hRF6HATAHQ65-FtTnjCS8q6G4A0c