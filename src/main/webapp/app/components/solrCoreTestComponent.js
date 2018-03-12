sage.component("solrCoreTest", {
  templateUrl: "views/components/solrCoreTestComponent.html",
  bindings: {
    solrCore: '='
  },
  controller: function($scope, $q) {

    var solrCoreTestController = this;

    var baseTests = [];

    solrCoreTestController.$onInit = function() {
      baseTests.push( {
        name: "Location",

        execute: solrCoreTestController.solrCore.testLocation
      });
    };

    solrCoreTestController.runTests = function() {

      solrCoreTestController.tests = angular.copy(baseTests);

      if(solrCoreTestController.solrCore.username && solrCoreTestController.password) {
        solrCoreTestController.tests.push({
          name: "Authorization",
          execute: solrCoreTestController.solrCore.testAuthorization
        });
      }

      var chain = $q.when();

      angular.forEach(solrCoreTestController.tests, function (test) {
        chain = chain.then(function() {
          return test.execute(solrCoreTestController.solrCore).then(function(res) {
            console.log(angular.fromJson(res.body));
            test.status = angular.fromJson(res.body).meta.status;
          });
        });
      });

      chain.then(function() {
        var status = "SUCCESS";
        for(var i in solrCoreTestController.tests) {
          var test = solrCoreTestController.tests[i];
          if(test.status!==status) {
            status=test.status;
            break;
          }
        }
        solrCoreTestController.testStatus = status;
      });
    };

  }
});