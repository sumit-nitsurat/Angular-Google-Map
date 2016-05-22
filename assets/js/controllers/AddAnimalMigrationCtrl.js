/**
 * AddAnimalMigrationCtrl.js
 *
 * @description :: Clinet side logic to add new animal migration info. 
 */

angular.module('app')
	.controller('AddAnimalMigrationCtrl', ['$scope', '$state', 'AnimalMigrationService',
		function ($scope, $state, AnimalMigrationService) {
			var self = this;
			
			self.langitude = "";
			self.longitude = "";
			self.description = "";
			self.animalType = "Bird";
			self.formData = [];
			self.isLatitudeValid = true;
			self.isLongitudeValid = true;
			
			/* @func addAnimalMigration()
                add the new animal migration info
                @param : none
                @return : object of newly added animal migration info ;
							otherwise return if latitude and longitude are not valid  */
			self.addAnimalMigration = function () {
				self.isLongitudeValid = true;
				self.isLongitudeValid = true;
				//validate latitude 
				if (AnimalMigrationService.validateLatitude(self.latitude) !== true) {
					self.isLatitudeValid = false;
					return;
				}
				//validate longitude
				if (AnimalMigrationService.validateLongitude(self.longitude) !== true) {
					self.isLongitudeValid = false;
					return;
				}

				self.formData.push({
					name: self.animalType,
					latitude: self.latitude,
					longitude: self.longitude,
					description: self.description
				});

				AnimalMigrationService.addAnimalMigration(self.formData[0]).then(function (response) {
					self.formData = [];
					$scope.$emit('addMarker', { animalInfo: response });
					$state.go('showAnimal');
				});
			};
		}]);
