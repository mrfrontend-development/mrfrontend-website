(function() {

    'use strict';

    /**
     * Restaurants Factory
     */
	angular.module('invoiceApp')
		.factory('InvoiceFactory', function($http, API) {

			var urlBase = API.URL + '/invoice';
			var dataFactory = {};

			dataFactory.getInvoices = function() {
				return $http.get(urlBase).then(function successCallback(response) {
					// this callback will be called asynchronously
					// when the response is available
					console.log('response: ', response.data.data);
					return response.data.data;
				}, function errorCallback(error) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					console.log('error: ', error);
					return error;
				});
			};
			return dataFactory;
		});

})();
