
export let app = angular.module("pharmApp",  ['nemLogging','uiGmapgoogle-maps', 'ngSanitize']);
app.config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
  GoogleMapApi.configure({
  //    key: 'your api key',
  // v: '3.20',
  libraries: 'weather,geometry,visualization'
});
}]);
