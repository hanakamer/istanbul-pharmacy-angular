import angular from 'angular';
import 'angular-sanitize';
import 'underscore';
import 'lodash';
import 'angular-simple-logger';
import 'angular-google-maps';


(function() {
  angular
      .module("pharmApp",  ['nemLogging','uiGmapgoogle-maps', 'ngSanitize'])
      .config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
        GoogleMapApi.configure({
        //    key: 'your api key',
        // v: '3.20',
        libraries: 'weather,geometry,visualization'
      });
    }])
      .controller("MainController", MainController )
  //     .filter('decodeURIComponent', function() {
  //     return function(input) {
  //      console.log('apply filter to: ', input);
  //      var output = window.decodeURIComponent(input);
  //      console.log('output: ', output);
  //      return output;
  //  }
   //
  //   });
  MainController.$inject = [ "$http"];

  function MainController($http, uiGmapGoogleMapApi) {
    let self = this;

    self.map = {
      center: { latitude: 41.1, longitude:29 },
      zoom: 13,
    };
    let createMarker = function(info) {
      let marker = {
       id: info.id,
       coords: {
         latitude: info.coordinates[0],
         longitude: info.coordinates[1]
       },
       markers: []
     };
     self.map.markers.push(marker);
    }

    let addMarkers = function() {
      self.map.markers = [];
      for (let i in self.pharmacies) {
        self.pharmacies[i].id = i;
        createMarker(self.pharmacies[i])
      }
      self.map.center.latitude = self.pharmacies[0].coordinates[0]
      self.map.center.longitude = self.pharmacies[0].coordinates[1]
    }


    let onComplete = function(response){
      self.district = response.data.name;
      self.pharmacies = response.data.pharmacies;
      addMarkers();
    }

    let onError = function(reason){
      self.error = "error"
    }

    self.district = "sisli"

    self.search = function(district) {
      $http.get("http://pharmacy.emre.sh/api/v1/istanbul/" +district,
    {
      transformResponse: function(rawInput) {
        let output = decodeURIComponent(rawInput);
        console.log(output)
        return JSON.parse(output); }
    })
    .then(onComplete)
    .catch(function(e) {
      console.log(e)
    })


    }
  };
})();
