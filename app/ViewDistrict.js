(function() {
  angular
      .module("weatherApp", [])
      .controller("MainController", MainController);

  MainController.$inject = ["$scope"];

  function MainController($scope) {
    $scope.message = "hana"
  };
})();
