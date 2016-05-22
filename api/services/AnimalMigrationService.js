/**
 * AnimalMigrationService.js
 *
 * @description :: A server side helper service to perform logic calculation and data request. 
 */

module.exports = {
  	/* @func addAnimalMigration(animalInfo,next)
							database create query to add the new animal migration info
					@param : animalInfo<object>, callback
					@return : on successs return the newly added object promise  */
  addAnimalMigration: function(animalInfo, next) {
    AnimalMigration.create({name: animalInfo.name, latitude: animalInfo.latitude,
                                longitude:animalInfo.longitude, description: animalInfo.description }).exec(function(err, info) {
      if(err) throw err;
      next(info);
    });
  },
  	/* @func getAnimalMigration(next)
               	database find query to get the all animal migration info because no criteria has paased as param
						@param : animalName<string>, callback
						@return : on successs return the animal migration info object promise  */
  getAnimalMigration : function(animalName, next) {
	  if(animalName ==='undefined') {
			AnimalMigration.find().exec(function(err, animals) {
				if(err) throw err;
				next(animals);
			}); 
	  } else {
			AnimalMigration.find({name : animalName}).exec(function(err, animals) {
				if(err) throw err;
				next(animals);
			});
	  }
    
  },
  /* @func updateAnimalMigration(animalInfo , animalId , next)
               	database update query to update animal migration info of specific id
						@param : animalInfo<object> , animalId <number>, callback
						@return : on successs return the updated animal migration info object promise  */
  updateAnimalMigration : function(animalInfo , animalId , next) {
      AnimalMigration.update({id : animalId},{name: animalInfo.name, latitude: animalInfo.latitude,
                                longitude:animalInfo.longitude, description: animalInfo.description}).exec(function(err, animals) {
      if(err) throw err;
      next(animals);
    });
  },
    /* @func removeAnimalMigration(animalId , next)
               	database destroy query to remove animal migration info of specific id
						@param : animalId <number>, callback
						@return : on successs return the deleted animal migration info object promise  */
  removeAnimalMigration : function(animalId , next) {
      AnimalMigration.destroy({id: animalId}).exec(function(err, todo) {
      if(err) throw err;
      next(todo);
    });
  }
  
};