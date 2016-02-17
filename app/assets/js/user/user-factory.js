(function() {

	'use strict';

	/**
	 * Restaurants Factory
	 */
	angular.module('invoiceApp')
		.factory('UserFactory', function($http, API) {

			var urlBase = API.URL + '/user';
			var userFactory = {};

			userFactory.getUsers = function() {
				return $http.get(urlBase);
			};

			userFactory.auth = function() {
				return $http.post(urlBase + '/auth/login', JSON.stringify({
					userEmail: 'raymon@mrfrontend.nl',
					userPassword: 'Welkom24#'
				})).then(function successCallback(response) {
					// this callback will be called asynchronously
					// when the response is available
					//console.log('auth: ', response.data.data);
					return response.data.data;
				}, function errorCallback(error) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					console.log('error: ', error);
					return error;
				});
			};

			userFactory.status = function() {
				return $http.get(urlBase + '/auth/status').then(function successCallback(response) {
					// this callback will be called asynchronously
					// when the response is available
					//console.log('status: ', response.data.data);
					return response.data.data;
				}, function errorCallback(error) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					console.log('error: ', error);
					return error;
				});
			};
			return userFactory;
		});

})();
