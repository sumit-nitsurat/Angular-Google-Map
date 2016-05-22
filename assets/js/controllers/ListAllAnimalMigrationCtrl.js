/**
 * ListAllAnimalMigrationCtrl.js
 *
 * @description :: Clinet side logic for CRUD operation on animal migration info. 
 */

angular.module('app')
	.controller('ListAllAnimalMigrationCtrl', ['$scope', 'ANIMALS','AnimalMigrationService',
		function ($scope, ANIMALS,AnimalMigrationService) {
			var self = this;
			
			self.animalDetailData = [];
			self.ANIMAL = ANIMALS;
			/* @func getAllAnimalMigration()
                Get all animal migration list when clicked on the show all
                @param : none
                @return : animal information object */
			self.getAllAnimalMigration = function () {
				AnimalMigrationService.getAnimalMigration().then(function (response) {
					self.animalDetailData = response;
				});
			}
			self.getAllAnimalMigration();

			/* @func updateAnimal(data, id)
                update the existing animal migration info
                @param : data <object> , id<number>
                @return : object of updated animal migration info */	
			self.updateAnimal = function (data, id) {
				AnimalMigrationService.updateAnimalMigration(data, id).then(function (response) {
					$scope.$emit('updateMarker', { animalInfo: response });
				});
			}
			
			/* @func removeAnimal(id)
                remove the existing animal migration info
                @param : id<number>
                @return : object of deleted animal migration info */
			self.removeAnimal = function (id) {
				AnimalMigrationService.removeAnimalMigration(id).then(function (response) {
					self.animalDetailData.forEach(function (d) {
						if (d.id === id) {
							self.animalDetailData.splice(self.animalDetailData.indexOf(d), 1);
						}
					})
					$scope.$emit('removeMarker', { animalInfo: response });
				});
			}
			
			/* @func validateLatitude(data)
                validate the latitude of the updated animal migration info
                @param : data<object>
                @return : return true is latitude is valid */
			self.validateLatitude = function (data) {
				// debugger;
				// var latitude = /^[-+]?([1-8]\d(\.\d+)?|90(\.0+)?)/;
				return AnimalMigrationService.validateLatitude(data);
				// if(!latitude.test(data))
				// 	return 'enter a valid latitude';
			}
			
			/* @func validateLongitude(data)
                validate the longitude of the updated animal migration info
                @param : data<object>
                @return : return true is longitude is valid */
			self.validateLongitude = function (data) {
				return AnimalMigrationService.validateLongitude(data);
			}
		}]);
