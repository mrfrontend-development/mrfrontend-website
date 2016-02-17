(function() {

	'use strict';

	/**
	 * Restaurants Factory
	 */
	angular.module('invoiceApp')
		.directive('pageHeader', function() {
			return {
				restrict: 'AE',
				scope: {
					data: '='
				},
				templateUrl: './views/header/page-header.html'
			};
		});

})();
