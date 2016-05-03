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

    self.map = { center: { latitude: 45, longitude:73 }, zoom: 8 };

    let onComplete = function(response){
      self.district = response.data.name
      self.pharmacies =response.data.pharmacies
    }
    let onError = function(reason){
      self.error = "error"
    }
    self.district = "sisli"

    $http.get("http://pharmacy.emre.sh/api/v1/istanbul/" + self.district)
          .then(onComplete)
  };
})();
