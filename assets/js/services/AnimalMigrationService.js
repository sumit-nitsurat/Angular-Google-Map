/**
 * AnimalMigrationService.js
 *
 * @description :: A helper service to perform logic calculation and data request. 
 */

angular.module('app')
	.service('AnimalMigrationService', ['$http', '$q', function ($http, $q) {

		return {
			/* @func addAnimalMigration(animalInfo)
							add the new animal migration info
					@param : animalInfo<object>
					@return : on successs return the newly added object promise  */
			'addAnimalMigration': function (animalInfo) {
				var defer = $q.defer();
				$http.post('/animalmigration/addAnimalMigration', { value: animalInfo }).success(function (resp) {
					defer.resolve(resp);
				}).error(function (err) {
					defer.reject(err);
				});
				return defer.promise;
			},
			
				/* @func getAnimalMigration()
               	place a get request to get the all animal migration info
						@param : animalName<string>
						@return : on successs return the animal migration info object promise  */
			'getAnimalMigration': function (animalName) {

				var defer = $q.defer();
				$http.get('/animalmigration/getAnimalMigration?data='+animalName).success(function (resp) {
					defer.resolve(resp);
				}).error(function (err) {
					defer.reject(err);
				});
				return defer.promise;
			},
			
				/* @func updateAnimalMigration(modifiedData, dataId)
               	place a post request to update the existing animal migration info with specific id
						@param : modifiedData<object>, dataId<number>
						@return : on successs return the modified animal migration info object promise  */
			'updateAnimalMigration': function (modifiedData, dataId) {
				var defer = $q.defer();
				$http.post('/animalmigration/updateAnimalMigration', { value: modifiedData, id: dataId }).success(function (resp) {
					defer.resolve(resp);
				}).error(function (err) {
					defer.reject(err);
				});
				return defer.promise;
			},
			
			/* @func removeAnimalMigration(dataId)
               	place a post request to delete the existing animal migration info with specific id
						@param : dataId<number>
						@return : on successs return the deleted animal migration info object promise  */
			'removeAnimalMigration': function (dataId) {
				var defer = $q.defer();
				$http.post('/animalmigration/removeAnimalMigration', { id: dataId }).success(function (resp) {
					defer.resolve(resp);
				}).error(function (err) {
					defer.reject(err);
				});
				return defer.promise;
			},

			/* @func validateLatitude(latitude)
               	ckeck the latitude limit
						@param : latitude<number>
						@return : on successs return true else error info  */
			'validateLatitude': function (latitude) {
				var regex = /^(\-?\d+(\.\d+)?)$/
				if(!regex.test(latitude))
					return "Enter a valid latitude";
				if (latitude > 90 || latitude < -90)
					return "Enter a valid latitude";
				else
					return true;
			},
			
			/* @func validateLongitude(latitude)
               	ckeck the longitude limit
						@param : longitude<number>
						@return : on successs return true else error info  */
			'validateLongitude': function (longitude) {
				var regex = /^(\-?\d+(\.\d+)?)$/
				if(!regex.test(longitude))
					return "Enter a valid longitude";
				if (longitude > 180 || longitude < -180)
					return "Enter a valid longitude";
				else
					return true;
			}
		}
	}]);