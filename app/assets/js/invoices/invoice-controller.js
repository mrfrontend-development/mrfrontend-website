(function() {

	'use strict';

	/**
	 * Restaurants Factory
	 */
	angular.module('invoiceApp')
		.controller('invoiceController', function($scope, invoices, status) {
			console.log('invoices: ', invoices);
			$scope.invoices = invoices[status.uid];

			console.log('status: ', status);
			$scope.status = status;
		});

})();
