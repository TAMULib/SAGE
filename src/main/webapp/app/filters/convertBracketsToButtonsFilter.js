sage.filter('convertBracketsToButtons', function() {
  return function(input) {
    var out = "";
    if (input) {
      out += input.split("{{").join("<span class='btn btn-small btn-default'>").split("}}").join("</span>");
    }
    return out;
  };
});
