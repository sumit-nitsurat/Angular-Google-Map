/**
 * app.js
 *
 * @description :: instantiate the angular app. 
 */
angular.module('app', ['uiGmapgoogle-maps', 'ui.router', 'xeditable'])
.config(['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
        GoogleMapApiProviders.configure({
			 v: '3.20',
            libraries: 'visualization'
        });
    }]);
    