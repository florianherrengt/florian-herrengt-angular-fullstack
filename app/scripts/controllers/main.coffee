'use strict'

angular.module('florianHerrengtApp')
	.controller 'MainCtrl', ($scope, $http, $resource, $timeout, ngTableParams) ->
		Api = $resource('/api/awesomeThings');
		$scope.tableParams = new ngTableParams
			page: 1
			count : 3
			sorting:
         	   name: 'asc'
		,
			filterDelay: 200
			total: 0
			getData: ($defer, params)->
				Api.get params.url(), (data)->
					$timeout ->
						params.total(data.total);
						$defer.resolve(data.result)
					500
