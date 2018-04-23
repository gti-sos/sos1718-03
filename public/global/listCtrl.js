 /* global angular */
 angular.module("globalApp").controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
  console.log("List Ctrl initialited");
  var api = "/api/v2/global-warmings";
  
   function getGlobalWarmings(){
      $http.get(api).then(function(response) {
       $scope.solarPlants = response.data;
      });
   }
  
  getGlobalWarmings();
  $scope.status = "Status : (Data have been loaded correctly)";


  $scope.addGlobal = function() {
   $http.post(api, $scope.newGlobal).then(function successCallback(response) {
    $scope.status = "Status : " + response.status + "(New solar plant has been added )";
    window.alert("El recurso se ha creado con exito!");
    getGlobalWarmings();
   }, function errorCallback(response) {
    console.log(response.status);
    if (response.status == 400) {
     $scope.status = "Status : " + response.status + "( FAIL: solar plant does not have expected fields)";
    }
    if (response.status == 409) {
     $scope.status = "Status : " + response.status + "( FAIL: solar plant already exists!!!)";
    }
   });
   getGlobalWarmings();

  };

  $scope.deleteGlobal = function(solarPlant) {
   //console.log("Global to be deleted: " + station);
   $http.delete(api + "/" + solarPlant).then(function(response) {
    //$scope.status = "Status : " + response.status + "( solar Plant deleted correctly)";
    //console.log(JSON.stringify(response, null, 2))
   window.alert("El dato se ha borrado con exito");

    getGlobalWarmings();
   });
  };

  $scope.deleteAllGlobal = function() {
   $http.delete(api).then(function(response) {
    //$scope.status = "Status : " + response.status + "(All Globals deleted correctly)";
    window.alert("Los datos se han borrado con exito");
    getGlobalWarmings();

   });
  };



 

  



 }]);
 