var myApp = angular.module("myApp", []);

myApp.controller("AppController", ["$scope", "$http" ,"$location", function($scope, $http, $location) {
  $http.get("/clients")
    .then(function(response) {
      // console.log("Data received from the server", response);
      $scope.clients = response.data;
    });

  $scope.addClient = function() {
    console.log("Adding new client...");
    $http.post("/clients", $scope.client)
      .then(function(response) {
        console.log("Client added");
        window.location.href = "/";
      });
  };

  $scope.editClient = function(id) {
    $("#addBtn").remove();
    $http.get("/clients/" + id)
      .then(function(response) {
        $scope.client = response.data;
      });
  };

  $scope.updateClient = function() {
    console.log("This is the client to update: ", $scope.client);
    // debugger
    console.log("Logging $scope.client: ", $scope.client);
    $http.put("/clients/" + $scope.client._id, $scope.client)
      .then(function(response) {
        console.log("Client updated after it returns from the backend", response);
        window.location.href = "/";
      });
  };

}]);
