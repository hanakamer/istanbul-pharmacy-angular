
(function() {
  angular
      .module("weatherApp", [])
      .controller("MainController", MainController);

  MainController.$inject = [ "$http"];

  function MainController($http) {
    let self = this;
    let onComplete = function(response){
      self.city = response.data
      console.log(self.city)
    }
    let onError = function(reason){
      self.error = "error"
    }
    self.district = "sisli"

    $http.get("http://pharmacy.emre.sh/api/v1/istanbul/" + self.district)
          .then(onComplete)
  };
})();
