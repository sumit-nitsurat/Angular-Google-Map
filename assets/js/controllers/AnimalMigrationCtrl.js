/**
 * AnimalMigrationCtrl.js
 *
 * @description :: Clinet side logic to display map. 
 */

angular.module('app')
    .controller('AnimalMigrationCtrl', ['$scope', 'AnimalMigrationService', 'ANIMALS', 'uiGmapIsReady',
        function ($scope, AnimalMigrationService, ANIMALS, uiGmapIsReady) {
            var self = this;
			self.isLoader = true;
			
			 // this gets all (ready) map instances - defaults to 1 for the first map
			 // instances is an array object if only 1 map it's found at index 0 of array
			 // this function will only be applied on initial map load (once ready)
            uiGmapIsReady.promise()                    
				.then(function(instances) {                 
					var maps = instances[0].map;           
					self.isLoader=false;  			
				});
			
            self.map = {
                center: { latitude: 45, longitude: -73 },
                zoom: 4,
                drag: true
            };
            self.markerOptions = [];
            self.windowOptions;
			self.isBird = true, self.isBear = true, self.isRabbit = true;
            
            /* @func onClick(markerId)
                Show the popup window on marker
                @param : id <number>, marker id of the current clicked marker 
                @return : window option object */
                
            self.onClick = function (markerId) {
				//self.windowOptions = {};
                self.markerOptions.isPopup = true;
                self.markerOptions.forEach(function (animal) {
                    if (animal.id === markerId) {
                        self.windowOptions = angular.copy(animal);

                        self.windowOptions.windowCords = {
                            latitude: animal.latitude+4,
                            longitude: animal.longitude
                        };
                    }
                })
                $scope.$apply();
            }
            
             /* @func closeClick()
                Hide the popup window on marker
                @param : none*/          
            self.closeClick = function () {
                self.markerOptions.isPopup = false;
                $scope.$apply();
            }
            
            /* @func getAnimalMigration()
                get all the animal migration info from database
                @param : animalName<string>
                @return : object of all animal migration if called with no anguments*/
            self.getAnimalMigration = function (animalName) {
                AnimalMigrationService.getAnimalMigration(animalName).then(function (response) {
                    response.forEach(function (x) {

                        if (angular.isDefined(ANIMALS[x.name])) {
                            x.icon = ANIMALS[x.name].url;
                            x.isPopup = false;
                            self.markerOptions.push(x);
                        }
                    })
					if(response.length > 0) {
						self.updateMapCenter(response[0]);
					}
                });
            }

            self.getAnimalMigration();
			
			/* @func filterAnimalMigration(animalName , isTrue)
                Modify the animal migration info depending upon selected params.
                @param : animalName <string>, isTrue<boolean>
                @return : object of updated animal migration*/
			self.filterAnimalMigration = function(animalName , isTrue) {
				if(isTrue) {
					self.getAnimalMigration(animalName);
				} else {
					for(var i =self.markerOptions.length-1; i>=0 ; i--) {
						if (self.markerOptions[i].name === animalName) {
							self.markerOptions.splice(i, 1);
						}
					}
				}
			}
          
            /* @eventListener addMarker
                triggered when new animal miragtion added
                @param : markername<string> , callback
                @return : updated marker list and map center*/
                          
            $scope.$on('addMarker', function (event, args) {
                args.animalInfo.icon = ANIMALS[args.animalInfo.name].url;
                self.updateMapCenter(args.animalInfo);
                self.markerOptions.push(args.animalInfo);
            });
            
            /* @eventListener updateMarker
                triggered when the info of the existing animal miragtion updated
                @param : markername<string> , callback
                @return : updated marker list and map center*/

            $scope.$on('updateMarker', function (event, args) {
                args.animalInfo[0].icon = ANIMALS[args.animalInfo[0].name].url;

                for (var i = 0; i < self.markerOptions.length; i++) {

                    if (self.markerOptions[i].id === args.animalInfo[0].id) {
                        self.markerOptions[i] = angular.copy(args.animalInfo[0]);
                        self.updateMapCenter(args.animalInfo[0]);
                        break;
                    }
                }
            });
            
            /* @eventListener removeMarker
                triggered when a existing animal miragtion deleted
                @param : markername<string> , callback
                @return : updated marker list */
                
            $scope.$on('removeMarker', function (event, args) {
                self.markerOptions.forEach(function (d) {
                    if (d.id === args.animalInfo[0].id) {
                        self.markerOptions.splice(self.markerOptions.indexOf(d), 1);
                    }
                })
            });
            
			/* @func getAnimalMigration()
                recenter the map with the new co-ordinate
                @param : newCordsobj<object>
                @return : modified map centre*/
            self.updateMapCenter = function(newCordsobj) {
                self.map.center.latitude = newCordsobj.latitude;
                self.map.center.longitude = newCordsobj.longitude;
            }

        }]);


