sage.filter('cantaloupeUrl', function () {
  return function (string) {
    if (string.indexOf(appConfig.fedoraPath) !== -1) {
        string = string.split(appConfig.fedoraPath,2)[1];
    }
    return appConfig.cantaloupeBaseUrl+btoa("fedora:"+string)+"/info.json";
  };
});