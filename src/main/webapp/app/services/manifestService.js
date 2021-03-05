sage.factory("ManifestService", function($http, $q) {
  var manifestService = this;

  var cache = {};

  manifestService.getManifest = function (url, ignoreCache) {
    return $q(function(resolve, reject) {
      if (!ignoreCache && cache[url]) {
        resolve(cache[url]);
      } else {
        $http({
          method: "GET",
          url: url
        }).then((response) => {
          cache[url] = response.data;
          resolve(cache[url]);
        })
        .catch((error) => {
          reject(error);
        });
      }
    });
  };

  manifestService.getThumbnailUrl = function(url, ignoreCache) {
    return $q(function(resolve, reject) {
      manifestService.getManifest(url, ignoreCache)
        .then(function(manifest) {
          if (manifest && manifest.thumbnail) {
            resolve(manifest.thumbnail['@id'].replace("!100,100","!200,200"));
          } else {
            reject('No manifest thumbnail found!');
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return manifestService;
});
