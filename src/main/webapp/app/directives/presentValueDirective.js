sage.directive('presentValue', function() {
  return {
    templateUrl: "views/directives/presentValue.html",
    link: function($scope, attr, elem) {
	  $scope.isUrl = function(value) {
	    var pattern = new RegExp('^(https?:\\/\\/)', 'i');
	    return pattern.test(value);
	  };
    }
  };
});
