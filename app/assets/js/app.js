'use strict';
angular.module('invoiceApp', [
    'ui.router'
])

    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider

        .state('home', {
            url: '/home',
            //controller: 'postsList',
            templateUrl: 'views/home/home-view.html',
            resolve: {
				auth: function(UserFactory) {
					var auth = UserFactory.auth();
					console.log('auth: ', auth);
					return auth;
				}
            }
        })
		// status
        .state('invoices', {
            url: '/invoices',
            controller: 'invoiceController',
            templateUrl: 'views/invoices/invoice.html',
            resolve: {
                status: function(UserFactory) {
					return UserFactory.status();
				},
				invoices: function(InvoiceFactory) {
					return InvoiceFactory.getInvoices();
				}
            }
        });
        //.state('posts.detail', {
        //    url: '/detail/:id',
        //    controller: 'postsList',
        //    templateUrl: 'views/posts/postsList.html',
        //    resolve: {
        //        post: function(postsFactory, $stateParams) {
        //            console.log('Post:', postsFactory.getById({id: $stateParams.id}));
        //            return postsFactory.getById({id: $stateParams.id});
        //        }
        //    }
        //})
    }]);
