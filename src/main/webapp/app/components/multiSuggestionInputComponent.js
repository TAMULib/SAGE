sage.component("multiSuggestionInput", {
  templateUrl: "views/components/multiSuggestionInput.html",
  bindings: {
    suggestions: '=',
    model: '=',
    property: '@',
    name: '@',
    label: '@',
    placeholder: "@"
  },
  controller: function($scope, $element, $timeout) {

    $ctrl = this;

    $scope.selectedIndex=0;

    $scope.processKeyDown = function($event) {
      switch($event.which) {
        case 38: //Up Arrow 
          $event.preventDefault();
          break;
        case 40: //Down Arrow
          $event.preventDefault();
          break;
      }
    }

    $scope.processKeyUp = function($event) {
      switch($event.which) {
        case 13: //Enter
          console.log($event.which, "Enter");
          console.log($scope.filteredSuggestions);
          addValue($scope.filteredSuggestions[$scope.selectedIndex][$ctrl.property]);
          closeSuggestions();
          $event.preventDefault();
          break;
        case 27: //ESC
        console.log($event.which, "Esc");
          $event.preventDefault();
          break;
        case 37: //Left Arrow
          console.log($event.which, "Left Arrow");
          if(shouldOpen()) {
            openSuggestions(); 
          } else {
            closeSuggestions();
          }
          $event.preventDefault();
          break;
        case 38: //Up Arrow
          console.log($event.which, "Up Arrow");
          $scope.selectedIndex = $ctrl.selectedIndex === 0 ? $ctrl.suggestions.length : $scope.selectedIndex-1;
          $event.preventDefault();
          break;
        case 39: //Right Arrow
          console.log($event.which, "Right Arrow");
          if(shouldOpen()) {
            openSuggestions(); 
          } else {
            closeSuggestions();
          }
          $event.preventDefault();
          break;
        case 40: //Down Arrow
          console.log($event.which, "Down Arrow");
          $scope.selectedIndex = $ctrl.selectedIndex === $ctrl.suggestions.length ? 0: $scope.selectedIndex+1;
          $event.preventDefault();
          break;  
        default:
          typing($event);
      }
    }

    $scope.curentValue = "";
    var curentValueStartPos = 0;

    var typing = function($event) {
      var elem = $element.find(".input").get(0);
      var cursorPos = getCursorPosition();
      var nextChar = elem.value.slice(cursorPos, cursorPos+1);

      if($scope.open) {
        $scope.curentValue =  elem.value.slice(curentValueStartPos, cursorPos);
        $scope.selectedIndex=0
      } else {
        curentValueStartPos=cursorPos;
      }

      if(shouldOpen()) {
        openSuggestions();
        if(nextChar!=="}") {
          addValue("}}", true);
          $timeout(function() {
            setCursor(elem,cursorPos);
          });
        }  
      } else {
        closeSuggestions();
      }
    };

    var shouldOpen = function() {
      var cursorPos = getCursorPosition();
      var elem = $element.find(".input").get(0);
      var lastTwoChars = elem.value.slice(cursorPos-2-$scope.curentValue.length,cursorPos-$scope.curentValue.length);
      var nextChar = elem.value.slice(cursorPos, cursorPos+1);
      return lastTwoChars==="{{" && (nextChar === '' || nextChar === " " || nextChar === "}");
    }

    $scope.addSelection = function(selection) {
      var elem = $element.find(".input").get(0);
      var cursorPos = getCursorPosition();
      addValue(selection);
      elem.focus();
      $timeout(function() {
        setCursor(elem, cursorPos + selection.length + 2);
        closeSuggestions();
      });
    }

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
      $scope.model = $scope.model.slice(0, cursorPos - $scope.curentValue.length) + value + $scope.model.slice(cursorPos,$scope.model.length);
    };

    var getCursorPosition = function() {
      var elem = $element.find(".input").get(0);
      var startPos = elem.selectionStart;
      var endPos = elem.selectionEnd;
      return startPos === endPos ? startPos : elem.selectionEnd;
    }

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
    }

  }
});