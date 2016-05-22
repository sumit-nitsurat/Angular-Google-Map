/**
 * RoutesConfig.js
 *
 * @description :: Routing configuration to navigate. 
 */

angular.module('app')
	.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
			url: '/home'
        })
		.state('addAnimal', { 
			url: '/add-animal',
            templateUrl: './templates/AddAnimalForm.html',
            controller: 'AddAnimalMigrationCtrl',
            controllerAs: 'addAnimCtrl'
        })
		.state('showAnimal', {
    
			url: '/list-animal',
            templateUrl: './templates/ListAllAnimal.html',
            controller: 'ListAllAnimalMigrationCtrl',
            controllerAs: 'listAnimalCtrl'
        });
}]);