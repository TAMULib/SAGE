sage.constant('ImageStages', {
  START: 'START',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
});

sage.component("imgAsync", {
  templateUrl: "views/components/imgAsyncComponent.html",
  bindings: {
    result: "="
  },
  controller: function($scope, $timeout, $interval, $element, appConfig, ImageStages) {

    this.imageStages = ImageStages;
    this.imageStage = ImageStages.START;
    this.defaultThumbnailURI = appConfig.defaultThumbnailURI;
    this.defaultLoadingURI = appConfig.defaultLoadingThumbnailURI;

    let loadingTimer = $timeout(() => {
      $scope.$ctrl.imageStage = ImageStages.LOADING;
    }, 1000);

    const thumbnail = $element.children()[2];

    const loadHandler = () => {
      $timeout(() => {
        $scope.$ctrl.imageStage = ImageStages.SUCCESS;
        $timeout.cancel(loadingTimer);
      });
    };

    const errorHandler = (e, e1) => {
      console.log(e1);
      $timeout(() => {
        if($scope.$ctrl.imageStage === ImageStages.LOADING) {
          $scope.$ctrl.imageStage = ImageStages.ERROR;
          $timeout.cancel(loadingTimer);
        }
      });
    };

    thumbnail.addEventListener('load', loadHandler);
    thumbnail.addEventListener('error', errorHandler);
    window.addEventListener('manifestError', errorHandler);

    this.$onInit = () => {
      const timer = $interval(() => {
        if (this.result.resourceThumbnailUriKey !== 'temp' && !this.thumbnailSrc) {
          this.thumbnailSrc = this.result.resourceThumbnailUriKey;
          $interval.cancel(timer);
        } 
      }, 10);
    };
  
  }
});