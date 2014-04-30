'use strict'

angular.module('florianHerrengtApp')
	.directive('loadingContainer', () ->
		restrict: 'A'
		scope: false
		link: (scope, element, attrs) ->
			loadingLayer = angular.element('<div class="loading"></div>')
			element.append(loadingLayer);
			element.addClass('loading-container')
			scope.$watch(attrs.loadingContainer, (value)->
				console.log value
				loadingLayer.toggleClass('ng-hide', !value);
			)
	)
