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

    this.$onInit = () => {

      const setSrcTimer = $interval(() => {
        if (this.result.resourceThumbnailUriKey !== 'temp' && !this.thumbnailSrc) {
          this.thumbnailSrc = this.result.resourceThumbnailUriKey;
          $interval.cancel(setSrcTimer);
        } 
      }, 10);

      const loadingTimer = $timeout(() => {
        this.imageStage = ImageStages.LOADING;
      }, 1000);
  
      const timeOutTimer = $timeout(() => {
        console.warn(`${this.result.resourceThumbnailUriKey} timed out while loading...`);
        this.imageStage = ImageStages.ERROR;
        $interval.cancel(setSrcTimer);
      }, 15000);

      const thumbnail = $element.children()[2];

      const loadHandler = () => {
        $timeout(() => {
          $timeout.cancel(loadingTimer);
          $timeout.cancel(timeOutTimer);
          this.imageStage = ImageStages.SUCCESS;
        });
      };

      const errorHandler = (e, e1) => {
        console.error(e1);
        $timeout(() => {
          if(this.imageStage === ImageStages.LOADING) {
            $timeout.cancel(loadingTimer);
            $timeout.cancel(timeOutTimer);
            this.imageStage = ImageStages.ERROR;
          }
        });
      };

      thumbnail.addEventListener('load', loadHandler);
      thumbnail.addEventListener('error', errorHandler);
      window.addEventListener('manifestError', errorHandler);

    };
  
  }
});