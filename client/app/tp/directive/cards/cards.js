angular.module('formationAngularJsApp')
.config(function($routeProvider) {
	$routeProvider
	.when('/tp-directive-pinterest', {
		templateUrl: 'app/tp/directive/cards/cards.html'
	});
})
.controller('cardsController', function(){
	this.cards = [
		{
			title: 'Ploum!',
			text: 'A very simple text...'
		},
		{
			title: 'Baouh!',
			text: 'Wooo, new text here!'
		},
		{
			title: 'Agrougrouu',
			text: 'Another simple text.'
		}
	];
})
.directive('pinterest', function() {
	return {
		restrict: 'EA',
		transclude: true,
		templateUrl: 'app/tp/directive/cards/pinterestDirective.html',
		scope: {
			data: '='
		},
		require: 'pinterest',
		controller: [
			function() {
				this.transcludeFn = null;	
			}
		],
		link: function($scope, $element, $attrs, controller, $transclude) {
			controller.transcludeFn = $transclude;
		}
	};
})
.directive('pinterestInternal', function() {
	return {
		restrict: 'A',
		require: '^pinterest',
		link: function($scope, $element, $attrs, pinterestController) {
			pinterestController.transcludeFn($scope, function(clone) {
		      $element.empty();
		      $element.append(clone);
		    });
		}
	};
})
;