angular.module('myApp')
    .controller('mapCtrl', function ($scope) {
        var mapC = this;
        mapC.zoom = 13;
        mapC.center = {
            lat: 51.508742,
            lng: -0.120850
        };
        mapC.getCoords = function(){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        }
        function showPosition(position){
            mapC.center.lat = position.coords.latitude;
            mapC.center.lng = position.coords.longitude;
        }
    })
    .directive('map', function () {
        return {
            restrict: 'E',
            template: '',
            scope: {
                center: '=',
                zoom: '='
            },
            link: function (scope, element, attrs) {
                var mapProp = {
                    zoom: scope.zoom,
                };
                var map = new google.maps.Map(document.getElementById(attrs.id), mapProp);
                var timeout = setInterval(function(){
                    map.setCenter(new google.maps.LatLng(scope.center.lat,scope.center.lng));
                }, 1000);


            }
        }
    });