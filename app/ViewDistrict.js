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
  MainController.$inject = [ "$http"];

  function MainController($http, uiGmapGoogleMapApi) {
    let self = this;

    self.todaysDate = new Date();

    self.map = {
      center: { latitude: 41.1, longitude:29 },
      zoom: 12,
    };
    let createMarker = function(info) {
      let marker = {
       id: info.id,
       coords: {
         latitude: info.coordinates[0],
         longitude: info.coordinates[1]
       },
       options: {
         title: info.name,
         labelContent: info.id,
         labelAnchor: "0 53",
         labelClass: "marker-labels"
       }
     };
     self.map.markers.push(marker);
    }

    let isUpToDate = function(date) {
      if (date == self.todaysDate) {
        return true;
      }
      return false
    }

    let addMarkers = function() {
      self.map.markers = [];
      for (let i in self.pharmacies) {
        self.pharmacies[i].id = parseInt(i) +1;
        createMarker(self.pharmacies[i])
      }
      self.map.center.latitude = self.pharmacies[0].coordinates[0]
      self.map.center.longitude = self.pharmacies[0].coordinates[1]
    }

    let onComplete = function(response){
      self.dataDate = response.data.date;
      self.district = response.data.name;
      self.pharmacies = response.data.pharmacies;
      addMarkers();
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
