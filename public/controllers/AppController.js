var myApp = angular.module("myApp", []);

myApp.controller("AppController", ["$scope", "$http" ,"$location", function($scope, $http, $location) {
  $http.get("/clients")
    .then(function(response) {
      console.log("Data received from the server", response);
      $scope.clients = response.data;
    });
}]);
