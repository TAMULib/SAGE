sage.directive("templatedinput", function ($q, $timeout) {
  return {
      template: 
        '<div class="form-group">' +
          '<label for="resourceThumbnailUriKey">Thumbnail Key</label>' +
          '<input '+
          'ng-model="model" ' +
          'name="resourceThumbnailUriKey" ' +
          'type="text" ' +
          'class="form-control" ' +
          'placeholder="Free type URL. Enclose Key in {{}}" ' +
          'ng-keyup="typing($event)"/> ' +
          '<div ng-show="open" ng-click="addValue(\'TEST_KEY\')">HERE</div>' +
        '</div>',
      restrict: 'E',
      scope: {
        options: "=",
        model: "="
      },
      link: function ($scope, element, attr) {

          $scope.typing = function($event) {
            var elem = $event.currentTarget;
            var startPos = elem.selectionStart;
            var endPos = elem.selectionEnd;
            var cursorPos = startPos === endPos ? startPos/ elem.value.length : 0;
            var lastTwoChars = elem.value.substring(startPos, startPos-2);
            var nextChar = elem.value.substring(startPos, startPos+1)
            if(lastTwoChars==="{{" && (nextChar === '' || nextChar === " ")) {
              $scope.open = true;
            } else {
              $scope.open = false;
            }
          };

      }
  };
});