sage.directive("TypeaheadMultiSelect", function() {
    return {
      require: 'ngModel',
      link: function($scope, element, attrs, ctrl) {
        element.bind('focus', function() {
          ctrl.$setViewValue();
          $(element).trigger('input');
          $(element).trigger('change');
        });

        ctrl.$parsers.unshift(function(inputValue) {
          var value = (inputValue ? inputValue : '');
          ctrl.$viewValue = value;

          return value;
        });

        ctrl.$parsers.push(function(inputValue) {
          return inputValue === '' ? '' : inputValue;
        });
      }
    };
});