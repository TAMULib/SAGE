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
    }

    $scope.processKeyUp = function($event, filteredSuggestion) {
      switch($event.which) {
        case 13: //Enter
          console.log($event.which, "Enter");
          console.log(fs.length);
          addValue(fs[$scope.selectedIndex][$ctrl.optionproperty]);
          $timeout(function() {
            closeSuggestions();
          });
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
          $scope.selectedIndex = $scope.selectedIndex === 0 ? filteredSuggestion.length - 1 : $scope.selectedIndex-1;
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
      var cursorPos = getCaretPosition();
      
      var nextChar = angular.copy($ctrl.model[$attrs.property]).slice(cursorPos, cursorPos+1);

      if($scope.open) {
        $scope.curentValue =  angular.copy($ctrl.model[$attrs.property]).slice(curentValueStartPos, cursorPos);
        $scope.selectedIndex=0
      } else {
        curentValueStartPos=cursorPos;
      }

      if(shouldOpen()) {
        openSuggestions();
        if(nextChar!=="}") {
          addValue("}}", true);
          $timeout(function() {
            setCaretPosition(cursorPos);
          });
        }  
      } else {
        $timeout(function() {
          closeSuggestions();
        });
      }
    };

    var shouldOpen = function() {
      var cursorPos = getCaretPosition();
      var elem = $element.find(".input").get(0);
      var lastTwoChars = angular.copy($ctrl.model[$attrs.property]).slice(cursorPos-2-$scope.curentValue.length,cursorPos-$scope.curentValue.length);
      var nextChar = angular.copy($ctrl.model[$attrs.property]).slice(cursorPos, cursorPos+1);
      console.log(cursorPos);
      return lastTwoChars==="{{" && (nextChar === '' || nextChar === " " || nextChar === "}");
    };

    $scope.addSelection = function(selection) {
      var elem = $element.find(".input").get(0);
      var cursorPos = getCaretPosition();
      addValue(selection);
      elem.focus();
      $timeout(function() {
        setCaretPosition(cursorPos + selection.length + 2);
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
      var cursorPos = getCaretPosition();
      console.log($attrs);
      $ctrl.model[$attrs.property] = $ctrl.model[$attrs.property].slice(0, cursorPos - $scope.curentValue.length) + value + $ctrl.model[$attrs.property].slice(cursorPos,$ctrl.model[$attrs.property].length);
    };

    // var getCaretPosition = function() {
    //   var elem = $element.find(".input").get(0);
    //   var startPos = elem.selectionStart;
    //   var endPos = elem.selectionEnd;
    //   return startPos === endPos ? startPos : elem.selectionEnd;
    // };

    var setCaretPosition = function(pos){

        // node = (typeof node == "string" || node instanceof String) ? document.getElementById(node) : node;

        var range = angular.element("document").createRange();
        var sel = window.getSelection();
        range.setStart($element.find(".input").childNodes[2], pos);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    
        // if(!node){
        //     return false;
        // }else if(node.createTextRange){
        //     var textRange = node.createTextRange();
        //     textRange.collapse(true);
        //     textRange.moveEnd(pos);
        //     textRange.moveStart(pos);
        //     textRange.select();
        //     return true;
        // } else if(node.setSelectionRange){
        //       node.setSelectionRange(pos,pos);
            
        //     return true;
        // }
    
        return false;
    };

    var getCaretPosition = function() {
      if (window.getSelection && window.getSelection().getRangeAt) {
        var range = window.getSelection().getRangeAt(0);
        var selectedObj = window.getSelection();
        var rangeCount = 0;
        var childNodes = selectedObj.anchorNode.parentNode.childNodes;
        for (var i = 0; i < childNodes.length; i++) {
          if (childNodes[i] == selectedObj.anchorNode) {
            break;
          }
          if (childNodes[i].outerHTML)
            rangeCount += childNodes[i].outerHTML.length;
          else if (childNodes[i].nodeType == 3) {
            rangeCount += childNodes[i].textContent.length;
          }
        }
        return range.startOffset + rangeCount;
      }
      return -1;
    }

  }
});