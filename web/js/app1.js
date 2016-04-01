var app = angular.module('routeApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
    .when("/list", {
        templateUrl: "views1/list.html",
        controller: "DataController"
    })
    .when("/details/:id", {
        templateUrl: "views1/details.html",
        controller: "DataController"
    })
    .when("/new",{
        templateUrl: "views1/new.html",
        controller: "NewPersonController"
    })
    .otherwise({
        redirectTo: "/list"
    });
});

 var persons = [
        {id: 1, name: "Jens", age: 18}
        , {id: 2, name: "Peter", age: 23}
        , {id: 3, name: "Hanne", age: 23}
    ];


app.controller('DataController', function ($scope, $routeParams) {
    $scope.persons = persons;
    
    if(angular.isDefined($routeParams.id)){
        var id = $routeParams.id;
        $scope.person = $scope.persons[id];
    };

});

app.controller('NewPersonController', function ($scope) {
    $scope.persons = persons;
    
    $scope.nextId = persons.length+1;
    
    $scope.save = function(){
        
        $scope.newp.id = $scope.nextId++;
        $scope.persons.push($scope.newp);
        
        $scope.newp = {};
    };

});
