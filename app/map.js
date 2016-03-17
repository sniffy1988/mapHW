angular.module('myApp')
    .controller('mapCtrl', function ($q) {
        var mapC = this;
        mapC.mapProps = {
            lat: 51.508742,
            lng: -0.120850,
            zoom: 13
        }
        function _getCoords (){
            var defer = $q.defer();
            navigator.geolocation.getCurrentPosition(defer.resolve, defer.reject);
            return defer.promise;
        }
        mapC.getCoords = function(){
            var promice = _getCoords();
            promice.then(function(position){
                mapC.mapProps.lat = position.coords.latitude;
                mapC.mapProps.lng = position.coords.longitude;
            }).catch(function(err){
                alert(err);
            });
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
                    zoom: 5,
                };
                var map = new google.maps.Map(document.getElementById(attrs.id), mapProp);
                scope.$watchCollection('center', function(){
                    console.log(scope.zoom);
                    map.setCenter(new google.maps.LatLng(scope.center.lat,scope.center.lng));
                    map.setZoom(parseInt(scope.zoom));
                })
            }
        }
    });