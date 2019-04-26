var appConfig = {

    'version': '1.0.x',

    'allowAnonymous': true,
    'anonymousRole': 'ROLE_ANONYMOUS',

    'authStrategies': ['emailRegistration'],

    'authService': window.location.protocol + '//' + window.location.host + window.location.base + '/auth',
    'webService': window.location.protocol + '//' + window.location.host + window.location.base,

    'storageType': 'session',

    'logging': {
        'log': true,
        'info': true,
        'warn': true,
        'error': true,
        'debug': true
    },

    'stompDebug': false,

    /*
      Determines the type of connection stomp will attempt to make with the service.
      TYPES:  websocket, xhr-streaming, xdr-streaming, eventsource, iframe-eventsource,
          htmlfile, iframe-htmlfile, xhr-polling, xdr-polling, iframe-xhr-polling,
          jsonp-polling
    */
    'sockJsConnectionType': ['websocket', 'xhr-polling'],

    // Set this to 'admin' or 'user' if using mock AuthService
    // otherwise set to null or false
    'mockRole': null,


    'contentMap': {"image": ["image/jpeg","image/png","image/gif", "text/html;charset=UTF-8", "jpg"],"seadragon": ["image/jp2","image/tiff"]},

    'cantaloupeBaseUrl': 'https://api-dev.library.tamu.edu/iiif/2/',

    'defaultThumbnailURI': "resources/images/default-thumbnail.jpg"

};
