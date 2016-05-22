/**
 * AnimalConfig.js
 *
 * @description :: Constant for animals image url. 
 */

angular.module('app')
    .constant('ANIMALS', {
           "Bird" :  {"url" : "./images/bird.PNG" , "label" : "Bird"},
           "Bear" :  {"url" : "./images/bear.PNG" , "label" : "Bear"},
           "Rabbit" :  {"url" : "./images/rabbit.PNG" , "label" : "Rabbit"}
       }
    )
