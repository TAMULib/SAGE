sage.model("Result", function () {
  return function Result() {
    var model = this;

    model.getValue = function(key) {
      return model.fields[key];
    };

    return this;
  };
});
