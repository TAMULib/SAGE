sage.model("Result", function () {
  return function Result() {
    var result = this;

    result.getValue = function(key) {
      return result.fields[key];
    };

    return this;
  };
});
