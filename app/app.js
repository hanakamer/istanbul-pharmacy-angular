import angular from 'angular';
import 'angular-route';
import 'angular-sanitize';
import 'lodash';
import 'angular-simple-logger';
import 'angular-google-maps';

export let app = angular.module("pharmApp", ['nemLogging', 'uiGmapgoogle-maps',
                                              'ngSanitize', 'ngRoute' ]);
app.config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
    GoogleMapApi.configure({
    //    key: 'your api key',
    // v: '3.20',
    libraries: 'weather,geometry,visualization'
  });
}]);

app.config(function($routeProvider){
  $routeProvider
      .when("/main",{
          templateUrl: "main.html",
          controller: "MainController",
          controllerAs: "self"
      })
      .when("/ilce/:district", {
        templateUrl: "pharmacies.html",
        controller: "PharmaciesController",
        controllerAs: "self"
      })
      .otherwise({redirectTo: "/main"});
})
