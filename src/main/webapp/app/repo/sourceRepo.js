// This managers "Cores", to represent a "Source", the readOnly property of a "Core" needs to be set to TRUE.
sage.repo("SourceRepo", function (Source, WsApi) {
  var sourceRepo = this;

  sourceRepo.scaffold = new Source({
    name: "Local Solr",
    uri: "http://localhost:8983/solr/sage-discovery",
    readOnly: true,
    requiresFilter: true,
    username: "",
    password: ""
  });

  sourceRepo.getAvailableFields = function (uri, filter) {
    var fieldsPromise = new Promise((resolve, reject) => {
      var getAvailableFieldsPromise = WsApi.fetch(sourceRepo.mapping.getAvailableFields, {
        query: {
          uri: uri,
          filter: filter
        }
      });
      getAvailableFieldsPromise.then(function (response) {
        var apiRes = angular.fromJson(response.body);
        if (apiRes.meta.status === 'SUCCESS') {
          resolve(apiRes.payload['ArrayList<SolrField>']);
        }
      });
    });

    return fieldsPromise;
  };

  sourceRepo.getIndexedFields = function (uri, filter) {
    var fields = [];
    var getIndexedFieldsPromise = WsApi.fetch(sourceRepo.mapping.getIndexedFields, {
      query: {
        uri: uri,
        filter: filter
      }
    });
    getIndexedFieldsPromise.then(function (response) {
      var apiRes = angular.fromJson(response.body);
      if (apiRes.meta.status === 'SUCCESS') {
        angular.extend(fields, apiRes.payload['ArrayList<SolrField>']);
      }
    });
    return fields;
  };

  sourceRepo.getApplicationTypes = function () {
    var applicationTypes = [];
    var getApplicationTypesPromise = WsApi.fetch(sourceRepo.mapping.getApplicationTypes);
    getApplicationTypesPromise.then(function (response) {
      var apiRes = angular.fromJson(response.body);
      if (apiRes.meta.status === 'SUCCESS') {
        angular.extend(applicationTypes, apiRes.payload['ArrayList<ApplicationType>']);
      }
    });
    return applicationTypes;
  };

  sourceRepo.getReadable = function () {
    var readableSources = [];
    var readablePromise = WsApi.fetch(sourceRepo.mapping.readable);
    readablePromise.then(function (res) {
      angular.extend(readableSources, angular.fromJson(res.body).payload['ArrayList<Source>']);
    });
    return readableSources;
  };

  sourceRepo.getWriteable = function () {
    var writeableSources = [];
    var writeablePromise = WsApi.fetch(sourceRepo.mapping.writeable);
    writeablePromise.then(function (res) {
      angular.extend(writeableSources, angular.fromJson(res.body).payload['ArrayList<Source>']);
    });
    return writeableSources;
  };

  return sourceRepo;
});
