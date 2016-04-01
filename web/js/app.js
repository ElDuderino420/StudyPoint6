var myApp = angular.module('DemoApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
    $routeProvider
            .when("/list", {
                templateUrl: "views2/list.html",
                controller: "CarController",
                controllerAs: "ctrl"
            })
            .when("/new", {
                templateUrl: "views2/new.html",
                controller: "NewCarController",
                controllerAs: "nctrl"
            })
            .when("/new/:id", {
                templateUrl: "views2/new.html",
                controller: "NewCarController",
                controllerAs: "nctrl"
            })
            .otherwise({
                redirectTo: "/list"
            });
});



myApp.factory('CarFactory', function () {
    var cars = [
        {id: 1, year: 1997, registered: new Date(1999, 3, 15), make: 'Ford', model: 'E350', description: 'ac, abs, moon', price: 3000}
        , {id: 2, year: 1999, registered: new Date(1996, 3, 12), make: 'Chevy', model: 'Venture', description: 'None', price: 4900}
        , {id: 3, year: 2000, registered: new Date(199, 12, 22), make: 'Chevy', model: 'Venture', description: '', price: 5000}
        , {id: 4, year: 1996, registered: new Date(2002, 3, 15), make: 'Jeep', model: 'Grand Cherokee', description: 'Moon roof', price: 4799}]
    var nextId = 5;
    var getCars = function () {
        return cars;
    }
    var deleteCar = function (id) {
        for (var i = 0; i < cars.length; i++) {
            if (cars[i].id === id) {
                cars.splice(i, 1);
                return;
            }
        }
    }
    var addEditCar = function (newcar) {
        if (newcar.id == null) {
            newcar.id = nextId++;
            cars.push(newcar);
        }
        else {
            for (var i = 0; i < cars.length; i++) {
                if (cars[i].id === newcar.id) {
                    cars[i] = newcar;
                    break;
                }
            }
        }
    }
    return {
        getCars: getCars,
        deleteCar: deleteCar,
        addEditCar: addEditCar,
    };
});


myApp.controller('CarController', ['CarFactory', function (CarFactory) {
        var cars = CarFactory.getCars();
        var self = this;
        self.cars = cars;
        self.title = "Cars App";
        self.predicate = "id";
        self.reverse = false;
        self.nextId = 5;

        self.save = function () {
            if (self.newcar.id == null) {
                self.newcar.id = self.nextId++;
                self.cars.push(self.newcar);
            } else {
                for (var i in self.cars) {
                    if (self.cars[i].id == self.newcar.id) {
                        self.cars[i] = self.newcar;
                    }
                }
            }
            self.newcar = {};
            self.formtext = "New Car";
        }

        self.edit = function (id) {
            self.formtext = "Edit Car"
            for (var i in self.cars) {
                if (self.cars[i].id == id) {
                    self.newcar = angular.copy(self.cars[i]);
                }
            }
        }

        self.delete = function (id) {
            CarFactory.deleteCar(id);
        }

    }]);

myApp.controller('NewCarController', ['CarFactory', '$routeParams', function (CarFactory, $routeParams) {
        var cars = CarFactory.getCars();
        var self = this;
        self.cars = cars;
        self.title = "Cars App";
        self.predicate = "id";
        self.reverse = false;
        self.nextId = 5;
        self.formtext = "New Car";

        self.save = function () {
            CarFactory.addEditCar(self.newcar);
            self.newcar = {};
            self.formtext = "New Car";
        }

        self.edit = function (id) {
            self.formtext = "Edit Car"
            for (var i in self.cars) {
                if (self.cars[i].id == id) {
                    self.newcar = angular.copy(self.cars[i]);
                }
            }
        }

        if (angular.isDefined($routeParams.id)) {
            var id = $routeParams.id;
            self.formtext = "Edit Car";
            self.newcar = self.cars[id];
        }
        ;

    }]);

