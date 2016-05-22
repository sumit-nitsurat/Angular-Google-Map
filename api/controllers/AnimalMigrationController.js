/**
 * AddAnimalMigrationController
 *
 * @description :: Server-side logic for managing Addanimalmigrations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    /* @func addAnimalMigration(req , res)
               	call animal migration service to run the database query 
            @param : req <object>, res<object>
            @return : on successs return the newly added animal migration info object promise  */
	 addAnimalMigration : function(req, res) {
        var animalInfo = (req.body.value) ? req.body.value : undefined
   
        AnimalMigrationService.addAnimalMigration(animalInfo, function(success) {
            res.json(success);
        });
    },
    	/* @func getAnimalMigration(req , res)
               	call animal migration service to run the  database query 
            @param : req <object>, res<object>
            @return : on successs return the animal migration info object promise  */
    getAnimalMigration : function(req , res) {
		var animalName = (req.param('data')) ? req.param('data') : undefined

        AnimalMigrationService.getAnimalMigration(animalName,function(animals) {
            res.json(animals);
        })
    },
     /* @func updateAnimalMigration(req , res)
               	call animal migration service to run the database query 
        @param : req <object>, res<object>
        @return : on successs return the updated animal migration info object promise  */
    updateAnimalMigration : function(req, res) {
         var animalInfo = (req.body.value) ? req.body.value : undefined
         var animalId = (req.body.id) ? req.body.id : undefined
        AnimalMigrationService.updateAnimalMigration(animalInfo, animalId, function(success) {
            res.json(success);
        });
    },
     /* @func removeAnimalMigration(req , res)
               	call animal migration service to run the database query 
        @param : req <object>, res<object>
        @return : on successs return the removed animal migration info object promise  */
    removeAnimalMigration : function(req, res) {
         var animalId = (req.body.id) ? req.body.id : undefined
        AnimalMigrationService.removeAnimalMigration(animalId, function(success) {
            res.json(success);
        });
    }
};

