import angular from 'angular';
import 'underscore';
import 'lodash';
import 'angular-simple-logger';
import 'angular-google-maps';
(function() {
  angular
      .module("weatherApp",  ['nemLogging','uiGmapgoogle-maps'])
      .config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
        GoogleMapApi.configure({
        //    key: 'your api key',
        // v: '3.20',
        libraries: 'weather,geometry,visualization'
      });
    }])
      .controller("MainController", MainController );

  MainController.$inject = [ "$http"];

  function MainController($http, uiGmapGoogleMapApi) {
    let self = this;

    self.map = {
      center: { latitude: 41.1, longitude:29 },
      zoom: 10,
      markers: []
    };
    let createMarker = function(info) {
      let marker = {
       id: info.id,
       coords: {
         latitude: info.coordinates[0],
         longitude: info.coordinates[1]
       }
     };
     self.map.markers.push(marker)
    }




    let onComplete = function(response){
      self.district = response.data.name;
      self.pharmacies =response.data.pharmacies;
      self.map.markers = [];
      for (let i in self.pharmacies) {
        self.pharmacies[i].id = i;
        createMarker(self.pharmacies[i])
      }
    }

    let onError = function(reason){
      self.error = "error"
    }

    self.district = "sisli"
    self.search = function(district) {
      $http.get("http://pharmacy.emre.sh/api/v1/istanbul/" +district)
            .then(onComplete)

    }



  };
})();
