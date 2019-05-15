sage.component("facetWidget", {
  templateUrl: "views/components/solrCoreTestComponent.html",
  bindings: {
    type: '='
  },
  controller: function($scope) {
    console.log($scope);
  }
});