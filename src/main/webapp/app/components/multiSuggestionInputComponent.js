sage.component("multiSuggestionInput", {
  templateUrl: "views/components/multiSuggestionInput.html",
  bindings: {
    suggestions: '=',
    model: '=',
    property: '@',
    optionproperty: '@',
    displayproperty: '@',
    name: '@',
    label: '@',
    placeholder: "@"
  },
  controller: function($scope, $element, $attrs, $timeout) {

    $ctrl = this;

    $scope.selectedIndex=0;

    var fs = [];

    $scope.processKeyDown = function($event, filteredSuggestion) {
      switch($event.which) {
        case 38: //Up Arrow
          $event.preventDefault();
          break;
        case 40: //Down Arrow
          $event.preventDefault();
          break;
        case 13: //Enter
        fs.length = 0;
          angular.extend(fs, filteredSuggestion);
          $event.preventDefault();
          break;
      }
    };

    $scope.processKeyUp = function($event, filteredSuggestion) {
      switch ($event.which) {
        case 13: //Enter
          addValue(fs[$scope.selectedIndex][$ctrl.optionproperty]);
          $timeout(function() {
            closeSuggestions();
          });
          $event.preventDefault();
          break;
        case 27: //ESC
          $event.preventDefault();
          break;
        case 37: //Left Arrow
          if(shouldOpen()) {
            openSuggestions();
          } else {
            closeSuggestions();
          }
          $event.preventDefault();
          break;
        case 38: //Up Arrow
          $scope.selectedIndex = $scope.selectedIndex === 0 ? filteredSuggestion.length - 1 : $scope.selectedIndex-1;
          $event.preventDefault();
          break;
        case 39: //Right Arrow
          if(shouldOpen()) {
            openSuggestions();
          } else {
            closeSuggestions();
          }
          $event.preventDefault();
          break;
        case 40: //Down Arrow
          $scope.selectedIndex = $scope.selectedIndex === filteredSuggestion.length - 1 ? 0: $scope.selectedIndex+1;
          $event.preventDefault();
          break;
        default:
          typing($event);
      }
    };

    $scope.curentValue = "";
    var curentValueStartPos = 0;

    var typing = function($event) {
      var elem = $element.find(".input").get(0);
      var cursorPos = getCursorPosition();

      var m = $scope.$ctrl.model[$scope.$ctrl.property];

      var nextChar = angular.copy(m.slice(cursorPos, cursorPos+1));

      if ($scope.open) {
        $scope.curentValue =  angular.copy(m.slice(curentValueStartPos, cursorPos));
        $scope.selectedIndex=0;
      } else {
        curentValueStartPos=cursorPos;
      }

      if (shouldOpen()) {
        openSuggestions();
        if(nextChar!=="}") {
          addValue("}}", true);
          $timeout(function() {
            setCursor(elem,cursorPos);
          });
        }
      } else {
        $timeout(function() {
          closeSuggestions();
        });
      }
    };

    var shouldOpen = function() {
      var cursorPos = getCursorPosition();
      var elem = $element.find(".input").get(0);
      var m = $scope.$ctrl.model[$scope.$ctrl.property];
      var lastTwoChars = angular.copy(m.slice(cursorPos-2-$scope.curentValue.length,cursorPos-$scope.curentValue.length));
      var nextChar = angular.copy(m.slice(cursorPos, cursorPos+1));
      return lastTwoChars==="{{" && (nextChar === '' || nextChar === " " || nextChar === "}");
    };

    $scope.addSelection = function(selection) {
      var elem = $element.find(".input").get(0);
      var cursorPos = getCursorPosition();
      addValue(selection);
      elem.focus();
      $timeout(function() {
        setCursor(elem, cursorPos + selection.length + 2);
        closeSuggestions();
      });
    };

    var openSuggestions = function() {
      $scope.open = true;
      angular.element("body").on("click", function($event) {
        var suggestionsElem = $element.find(".suggestions");
        $timeout(function() {
          if(suggestionsElem.get(0)!==$event.target) {
            closeSuggestions();
          }
        });
      });
    };

    var closeSuggestions = function() {
      $scope.open = false;
      angular.element("body").off();
      $scope.curentValue = "";
    };

    var addValue = function(value) {
      var cursorPos = getCursorPosition();
      var m = $scope.$ctrl.model[$scope.$ctrl.property];
      $scope.$ctrl.model[$scope.$ctrl.property] = m.slice(0, cursorPos - $scope.curentValue.length) + value + m.slice(cursorPos,m.length);
    };

    var getCursorPosition = function() {
      var elem = $element.find(".input").get(0);
      var startPos = elem.selectionStart;
      var endPos = elem.selectionEnd;
      return startPos === endPos ? startPos : elem.selectionEnd;
    };

    var setCursor = function(node,pos){

        node = (typeof node == "string" || node instanceof String) ? document.getElementById(node) : node;

        if(!node){
            return false;
        }else if(node.createTextRange){
            var textRange = node.createTextRange();
            textRange.collapse(true);
            textRange.moveEnd(pos);
            textRange.moveStart(pos);
            textRange.select();
            return true;
        } else if(node.setSelectionRange){
              node.setSelectionRange(pos,pos);

            return true;
        }

        return false;
    };

  }
});
